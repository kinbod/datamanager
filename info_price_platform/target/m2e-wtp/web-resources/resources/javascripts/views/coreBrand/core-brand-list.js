$(document).ready(function() {
				$("#core_file_import").uploadify({
					formData : {},
					auto : false,
					//queueID : 'upload_queue',
					swf :"/javascripts/uploadify/uploadify.swf",
					uploader : "/upload;jsessionid="+$("#sessionId").val(),
					removeCompleted:true,
					//buttonImage:'${contextPath}/javascripts/uploadify/img/browse-btn.png',
					buttonText : "选择文件",
					fileObjName : 'Filedata',
					fileSizeLimit : '100MB',
					fileTypeExts : '*.xlsx;*.xls',
					queueSizeLimit : 1,
					multi:false,
					onUploadSuccess : function(file, data, response) {
						$("#importCoreBrandForm input[name='name']").val(file.name);
						$("#importCoreBrandForm input[name='fileSize']").val(file.size);
						$("#importCoreBrandForm input[name='fileType']").val(file.type);
						$("#importCoreBrandForm input[name='importFilePath']").val(data);
						$("#saveImportCoreBrand").html("正在导入品牌，请稍后");
						$("#saveImportCoreBrand").attr("disabled","disabled");
						$.ajax({
							   type: "POST",
							   url: "/corebrand/import/corebrand?da="+new Date(),
							   data: $("#importCoreBrandForm").serialize(),
							   success: function(msg){
								   $("#saveImportCoreBrand").html("导入品牌 ");
								   $("#saveImportCoreBrand").removeAttr("disabled");
								   if(msg.result=="true"){
										   alert("导入成功");
										   search(1);
								   }else if(msg.result=="false"){
									   window.location.href="/download/downResuleFiles?fileName="+msg.name+"&id="+msg.id;
								   }else{
									   alert(msg.result);
								   }
								 
								}
						 });
					}
				});
			});
function getCoreBrandCompany(coreBrandId,brandId,typeId){
	var bussineType = $("#business_type").val();
	var hrefStr="/corebrand/getCoreBrandCompany?id="+coreBrandId+"&brandId="+brandId+"&baseMaterialTypeId="+typeId;
	if(bussineType!=undefined && bussineType!=""){
		hrefStr+="&bussineType="+bussineType;
	}
//	window.location.href=hrefStr;
	window.open(hrefStr,'_blank');
}

function showBrandDiv(brandId){
	$("font").remove('.warns'); 
	$("#newBrandForm input[name=id]").val("");
	$("#newBrandForm input[name=brandName]").val("");
	$("#newBrandForm [name='isCommon']").removeAttr("checked");
	$("#newBrandForm [name='isCommon']").parent("span").removeAttr("class");
	$("#newBrandForm [name='isFamous']").removeAttr("checked");
	$("#newBrandForm [name='isFamous']").parent("span").removeAttr("class");
	if(brandId!=null){
		$.ajax({
			type:"POST",
			url :pathHeader+"/corebrand/getCoreBrand",
			data:{id:brandId},
			dataType:"json",
			success:function(data) {
			  var brand = data.coreBrand;
			  $("#newBrandForm input[name=id]").val(brand.id);
			  $("#newBrandForm input[name=brandName]").val(brand.brandName);
			  insertSelect(data.proList,"parent_area_code_1",brand.parentAreaCode);
			  insertSelect(data.cityList,"area_code_1",brand.areaCode);
			  insertSelectType(data.firstType,"parent_type_id_1",brand.parentTypeId);
			  insertSelectType(data.secondType,"base_material_type_id_1",brand.baseMaterialTypeId);
			  if(brand.isCommon==1){
				  $("#newBrandForm [name='isCommon']").attr("checked","checked");
				  $("#newBrandForm [name='isCommon']").parent("span").attr("class","checked");
			  }
			  if(brand.isFamous==1){
				  $("#newBrandForm [name='isFamous']").attr("checked","checked");
				  $("#newBrandForm [name='isFamous']").parent("span").attr("class","checked");
			  }
			  $("#saveContinue").hide();
			  $("#newBrand").modal("show");
	 	 	}
		});
	}else{
		$("#parent_area_code_1").empty();
		$("#area_code_1").empty();
		$("#parent_type_id_1").empty();
		$("#base_material_type_id_1").empty();
		locations(true, "parent_area_code_1");
		bmtvalues(true, 'parent_type_id_1');
		$("#saveContinue").show();
	}
}


//所在区域
$("#parent_area_code_1").change(function() {
	var coreId = $("#newBrandForm input[name=id]").val();
	if(coreId!=null && coreId!=""){
		locations(true, 'area_code_1', this);
	}else{
		locations(false, 'area_code_1', this);
	}
	
});

//材料类别
$("#parent_type_id_1").change(function() {
	bmtvalues(false, 'base_material_type_id_1', this);
});	
//重新计算
$("#btn_amount_company_count").click(function() {
	$("#btn_amount_company_count").html("执行中，请稍后...");
	$.ajax({
		type:"GET",
		url :pathHeader+"/corebrand/resetcomanycount",
		success:function(flag) {
			search(1);
			$("#btn_amount_company_count").html("重新计算");
			
 	 	}
	});
	
	
});	

function insertSelect(datas,selectId,selectValue){
	$("#"+selectId).empty();
	$.each(datas, function(i, data){
		   var value =data.areaCode; 
			var text =data.name;
			if(selectValue==value){
				$("#"+selectId).append("<option value='"+value+"' selected='selected'>"+text+"</option>"); 
			}else if(value!="1"){
				$("#"+selectId).append("<option value='"+value+"'>"+text+"</option>"); 
			}
	 }); 
}
function insertSelectType(datas,selectId,selectValue){
	$("#"+selectId).empty();
	$.each(datas, function(i, data){
		   var value =data.id; 
			var text =data.description;
			if(selectValue==value){
				$("#"+selectId).append("<option value='"+value+"' selected='selected'>"+text+"</option>"); 
			}else{
				$("#"+selectId).append("<option value='"+value+"'>"+text+"</option>"); 
			}
	 }); 
	
}
function updateValidate(){
	   $("#newBrandForm").validate({ 
			rules:{ 
				brandName:{
				required:true
				},
				parentAreaCode:{
					min:2
				},
				areaCode:{
				required:true
				},
				parentTypeId:{
					required:true
				},
				baseMaterialTypeId:{
					required:true
				}
			},
			messages: {
				brandName:{
			  		required:"<font class='warns' color='red'>请输入品牌名称</font>"
			  	},
			  	parentAreaCode:{
					min:"<font class='warns' color='red'>请选择省</font>"
				},
			  	areaCode:{
			  		required:"<font class='warns' color='red'>请选择市</font>"
			  	},
			  	parentTypeId:{
					required:"<font class='warns' color='red'>请选择一级类别</font>"
				},
				baseMaterialTypeId:{
					required:"<font class='warns' color='red'>请选择二级类别</font>"
				}
			  }
		});
}
function addValidate(){
	   $("#newBrandForm").validate({ 
			rules:{ 
				brandName:{
				required:true
				},
				parentTypeId:{
					required:true
				},
				baseMaterialTypeId:{
					required:true
				}
			},
			messages: {
				brandName:{
			  		required:"<font class='warns' color='red'>请输入品牌名称</font>"
			  	},
			  	parentTypeId:{
					required:"<font class='warns' color='red'>请选择一级类别</font>"
				},
				baseMaterialTypeId:{
					required:"<font class='warns' color='red'>请选择二级类别</font>"
				}
			  }
		});
}

function saveBrand(flagOper){
	var id = $("#newBrandForm input[name=id]").val();
	if(id!=null && id!=""){
		updateValidate();
	}else{
		addValidate();
	}
	if(!$("#newBrandForm").valid()){
		return ;
	}
	var dataStr = $("#newBrandForm").formSerialize();
	$.ajax({
		type:"POST",
		url :pathHeader+"/corebrand/saveCoreBrand",
		data:dataStr,
		success:function(flag) {
			if(flag=="0"){
				alert("出现错误，保存失败！");
			}else if (flag=="1"){
				alert("保存成功！");
				if(flagOper==null || flagOper==""){
					search(1);
				}
			}else{
				alert(flag);
			}
			
 	 	}
	});
	
}

function delCoreBrand(id){
	var chs= "";
	if(id==null){
		chs = getIds();
		if(chs==null||chs==''){
			alert("请选择需要删除的品牌库！");
			return;
		}
	}else{
		chs="id="+id;
	}
	if(confirm("确定要删除选定的记录吗？\n")){
		$.ajax({
			type:"POST",
			url :pathHeader+"/corebrand/delCoreBrand",
			data:chs,
			dataType:"json",
			success:function(flag) {
				if(flag==0){
					alert("删除失敗！");
				}else{
					alert("删除成功！");
					search(1);
				}
	 	 	}
		});
	}
}
function getIds(){
	var chs="";
	$("input[type='checkbox'][name='id']:checked").each(function(){
		chs=chs+"&id="+$(this).val();
	});
	return chs;
}
 function  update(flagOper,id){
	 var chs= "";
		if(id==null){
			chs = getIds();
			if(chs==null||chs==''){
				alert("请选择需要修改的品牌库！");
				return;
			}
		}else{
			chs="id="+id;
		}
		var urlStr = "";
		var aId = aId = "fam_"+id;
		if(flagOper=="isCommon"){
			urlStr = pathHeader+"/corebrand/updateIsCommon";
			if(id!=null){
				aId = "com_"+id;
			}
		}else {
			urlStr = pathHeader+"/corebrand/updateIsFamous";
		}
		$.ajax({
			type:"POST",
			url :urlStr,
			data:chs,
			dataType:"json",
			success:function(flag) {
				if(flag==0){
					alert("修改失敗！");
				}else{
					if(id!=null){
						if($("#"+aId).text()=="是"){
							$("#"+aId).text("否");
						}
						else{
							$("#"+aId).text("是");
						}
					}else{
						alert("修改成功！");
						search(1);
					}
					
				}
	 	 	}
		});
 }
 
	/**
	 * 导出品牌库
	 */
	$("#expCoreBrand").click(function() {
		$('#search').attr('action', pathHeader+'/corebrand/exportCoreBrand');
		$('#search').submit(); 
		$('#search').attr('action', pathHeader+'/corebrand/getCoreBrandList');
	});
