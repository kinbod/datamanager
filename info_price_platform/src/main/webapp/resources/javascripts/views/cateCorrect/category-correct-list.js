function typeDivShow(){
	var typeDivId = arguments[0];
	var adivId = arguments[1];
	var typeCodeId = arguments[2];
	var typeCodeValue = arguments[3];
	$("#"+typeCodeId).val(typeCodeValue);
	$("#"+typeDivId).show();
	$("#"+adivId).hide();
}
function typeDivHide(typeDivId,adivId){
	$("#"+typeDivId).hide();
	$("#"+adivId).show();
}
$(function(){
	//材料类别
	bmtvalues(true, 'first_material_types');
	if ($("#first_material_types").attr("value") != '') {
		bmtvalues(false, 'first_material_types_1', $("#first_material_types"),
				$("#first_material_types").attr("value"));
	}
	searchTypeSubmit($("#handleStatus").val());
	
});

/**
根据纠偏类型搜索材料
*/
function searchTypeSubmit(type) {
	//classified(未纠偏/分类完成)  classify_fail(无法分类/分类失败)  have_correction(已纠偏)
	if(type == 'classified'){
		$('#finishBtn').show();
	}else{
		$('#finishBtn').hide();
	}
	$("#handleStatus").val(type);
	var companyId= $("#companyId").val();
	if(companyId==null || companyId==""){
		searchSubmit(1,1);//第一个参数是当前页数     第二个参数是操作类型    1：点击检索触发      2：点击进入纠偏页面进入
	}else{
		$("#handleStatusParam").val(type);
		searchSubmit(1,2);
	}
	
}
/**
点击搜索,提交表单
*/
function searchSubmit() {
	$("#maskDiv").show();
	$(".group-checkable").parent("span").removeAttr("class");
	$(".group-checkable").removeAttr("checked");
	var  currentPage =arguments[0];//当前页数
	var operType =arguments[1];//操作类型
	var pageSize =$("select[name=pageSize]").val();//显示个数
	var datas = "";
	if(operType==2){
		datas += $("#paramForm").formSerialize();
	}else{
		if($("#paramHideDiv").length>0){
			$("#paramHideDiv").remove();
		}
		datas += $("#productForm").formSerialize();
	}
	if(pageSize!=undefined){
		datas +="&pageSize="+pageSize;
	}
	datas +="&currentPage="+currentPage+"&operType="+operType;
	$.ajax({
		url:pathHeader+'/categoryCorrect/getCorrectList',
		type:'POST',
		dataType:'json',
		data:datas,
		success: function(dataPro){
			// products
			var list = dataPro.products;
			var status= $("#handleStatus").val();
			if(status=="classify_fail"){
				$("#notClassifiedLi").attr("class","active");
				$("#tab_1").attr("class","tab-pane active");
				$("#notClassifiedDataTmp").tmpl(list).appendTo($("#notClassifiedData").html(""));
				$("#noCorrectionData").empty();
				$("#haveCorrectionData").empty();
			}else if (status=="classified"){
				$("#noCorrectionLi").attr("class","active");
				$("#tab_0").attr("class","tab-pane active");
				$("#correctProDataTmp").tmpl(list).appendTo($("#noCorrectionData").html(""));
				$("#notClassifiedData").empty();
				$("#haveCorrectionData").empty();
			}else if (status=="have_correction"){
				$("#haveCorrectionLi").attr("class","active");
				$("#tab_2").attr("class","tab-pane active");
				$("#correctProDataTmp").tmpl(list).appendTo($("#haveCorrectionData").html(""));
				$("#noCorrectionData").empty();
				$("#notClassifiedData").empty();
			}
			// page
			var pageHtml = dataPro.pageHtml;
			$("#pageDiv").html(pageHtml);
			$("#maskDiv").hide();
			getProductAttr();
		}
	});
}

function getProductAttr(){
	
	//加载材料属性
	 $.each($(".product_property"), function(n, obj){
		 
	      var id = $(obj).attr("product_id");
	      $.ajax({
	  		url:pathHeader+'/categoryCorrect/productAttr',
	  		type:'POST',
	  		data:{id:id},
	  		success: function(data){
	  			$("#product_property_"+id).html(data);
	  		}
	  	});
     });
}

function getTypeName(){
	var typeCodeId = arguments[0];
	var typeNameLabId = arguments[1];
	var inputText=$("#"+typeCodeId).val().replace(/\D/g,'');
	$("#"+typeCodeId).val(inputText);
	if(inputText.length==4){
		$.ajax({
			type:'POST',
			url:pathHeader+'/categoryCorrect/getTypeName',
			data:"typeCode="+inputText,
			success: function(name){
				$("#"+typeNameLabId).html(name);
			}
		});
	}
}

/**
 * 在列表内操作单个纠偏和同名纠偏
 */
function updateBaseType(){
	var operType = arguments[3];
	var productIdName = arguments[0];
	var typeName = $("#"+arguments[2]).html();
	var handleStatus = $("#handleStatus").val();
	var typeCode = $("#"+arguments[1]).val();
	if(typeCode==null ||typeCode=="" || typeCode.length<4){
		alert("类别编码错误，请重新输入!");
		return ;
	}
	if(typeName==null ||typeName=="" ){
		alert("类别编码错误，请重新输入!");
		return ;
	}
	var datas = "typeCode="+typeCode+"&handleStatus="+handleStatus;
	
	if(operType=="all"){
		datas+="&name="+productIdName;
	}else{
		datas+="&id="+productIdName;
	}
	$.ajax({
		type:'POST',
		url:pathHeader+'/categoryCorrect/updateBaseType',
		data:datas,
		success: function(result){
			if(result>0){
				alert("分类纠偏成功！");
				searchTypeSubmit(handleStatus);
			}else{
				alert("分类纠偏失败！");
			}
		}
	});
}
function showBatchCorrect(){
	var _tab = $("#tabDiv li.active a").attr("href");
	var box = $(_tab +" input[type='checkbox'][name='id']:checked");
	if(box.length==0){
		alert("请选择需要批量纠偏的材料！");
		return;
	}
	$("#batchCorrectDiv").modal("show");
	$("#typeCodeBatch").val("");
	$("#typeNameLabBatch").html("");
}

function correctComplete(){
	var _tab = $("#tabDiv li.active a").attr("href");
	var box = $(_tab +" input[type='checkbox'][name='id']:checked");
	if(box.length==0){
		alert("请选择需要批量纠偏的材料！");
		return;
	}
	$("#correctCompleteDiv").modal("show");
}
/**
 * 批量纠偏和批量同名纠偏
 */
function updateBaseTypeBatch(){
	var operType = arguments[0];
	var typeName = $("#typeNameLabBatch").html();
	var typeCode = $("#typeCodeBatch").val();
	if(typeCode==null ||typeCode==""|| typeCode.length<4){
		alert("类别编码为空，请输入！");
		return ;
	}
	if(typeName==null ||typeName==""){
		alert("类别编码错误，请重新输入！");
		return ;
	}
	var _tab = $("#tabDiv li.active a").attr("href");
	var ids ="";
	var names = "";
	var box = $(_tab +" input[type='checkbox'][name='id']:checked");
	
	if(box.length==0){
		alert("请选择需要批量纠偏的材料！");
		return;
	}
	box.each(function(){
		var id = $(this).val();
		ids+="&ids="+id;
		names+="&name="+$("#proName"+id).text();
	});
	var handleStatus = $("#handleStatus").val();
	var datas = "typeCode="+typeCode+"&handleStatus="+handleStatus;
	if(operType=="all"){
		datas+=names;
	}else{
		datas+=ids;
	}
	$.ajax({
		type:'POST',
		url:pathHeader+'/categoryCorrect/updateBaseTypeBatch',
		data:datas,
		success: function(result){
			if(result>0){
				alert("分类纠偏成功！");
				$("#btn_cancel").click();
				searchTypeSubmit(handleStatus);
			}else{
				alert("分类纠偏失败！");
				return ;
			}
		}
	});
}
//验证同名材料是否有多个不同类别
function checkProductType(){
	var ids ="";
	var names = "";
	var _tab = $("#tabDiv li.active a").attr("href");
	var box = $(_tab +" input[type='checkbox'][name='id']:checked");
	box.each(function(){
		var id = $(this).val();
		ids+="&ids="+id;
		names+="&name="+$("#proName"+id).text();
	});
	var handleStatus = $("#handleStatus").val();
	var datas ="handleStatus="+handleStatus+names;
	$.ajax({
		type:'POST',
		url:pathHeader+'/categoryCorrect/checkProductType',
		data:datas,
		success: function(result){
			if(result==null || result=="" ){
				updateTypeComplete("all");
			}else{
				alert(result+"存在不同的材料类别！");
			}
		}
	});
	
	
}

//纠偏完成
function updateTypeComplete(){
	var operType = arguments[0];
	var ids ="";
	var names = "";
	var _tab = $("#tabDiv li.active a").attr("href");
	var box = $(_tab +" input[type='checkbox'][name='id']:checked");
	box.each(function(){
		var id = $(this).val();
		ids+="&ids="+id;
		names+="&name="+$("#proName"+id).text();
	});
	
	var handleStatus = $("#handleStatus").val();
	var datas ="handleStatus="+handleStatus;
	if(operType=="all"){
		datas+=names;
	}else{
		datas+=ids;
	}
	$.ajax({
		type:'POST',
		url:pathHeader+'/categoryCorrect/updateBaseTypeBatch',
		data:datas,
		success: function(result){
			if(result>0){
				alert("分类纠偏成功！");
				$("#btn_cancelC").click();
				searchTypeSubmit(handleStatus);
			}else{
				alert("分类纠偏失败！");
			}
		}
	});
}


