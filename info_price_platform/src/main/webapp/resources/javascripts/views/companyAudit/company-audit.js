//按地区组加载负责人
function getUser(roleId,userId,selectedId){
	var parentCode = $("#"+roleId).val();
	if(parentCode==null || parentCode == "" ) return;
	var url ="/companyAudit/setUser.do?parentCode="+parentCode;
	$.ajax({
		type:"POST",
		url :url,
		dataType:"json",
		success:function(result) {
			setUser(result,userId,selectedId); 
 	 	}
	});

}
//将负责人显示在控件中
function setUser(result,selectId,selectedId){
	$("#"+selectId).empty();
	var htmlStr="<option value=''>请选择... </option>";
	jQuery.each(result, function(i, user){
		var value =user.id; 
		var text =user.name;
		if(selectedId==value){
			htmlStr+="<option value='"+value+"' selected='selected'>"+text+"</option>";
		}else{
			htmlStr+="<option value='"+value+"'>"+text+"</option>";
		}
	}); 
	$("#"+selectId).html(htmlStr);
}
function getCity(){
	var url ="/companyAudit/setCity";
	getLocArea('province','city',url);
}

function auditThrough(operType){
	if($("#auditUserId").val()=="" || $("#auditUserId").val()==null){
		alert("请选择负责人！");
		return;
	}
	if(!$("#EPeopleDiv").is(":hidden")){
		if($("#ePeople").val()=="" || $("#ePeople").val()==null){
			alert("请选择E化人！");
			return;
		}
		var length = $("input[name='companyAdditionalInfo.quotedPriceType']:checked").length;
		if(length==0){
			alert("请选择报价文件类型！");
			return;
		}
	}
	$("#saveThrough").text("审核中...");
	var dataStr =$("#comAuditSuc").formSerialize();
	$.ajax({
		type:"POST",
		url :pathHeader+"/companyAudit/through",
		data:dataStr,
		dataType:"json",
		success:function(result) {
			$("#saveThrough").text("确定");
			if(result=='0'){
				alert("保存失败！");
			}else{
				alert("保存成功！");
				if(operType=="detail"){
					var cuIndex = $("#currentIndex").val();
					nextCompany(cuIndex,'audit');
					$("#throughCancel").click();
				}else{
					searchCompany();
				}
				
			}
 	 	}
	});
}
function auditThroughCheck(companyId,companyName,userId,expandAreaCode){
	$("#companyId").val(companyId);
	$("#companyName").html(companyName);
	$("#ePeople").empty();
	 $("#qualityGrade  option[value='0'] ").attr("selected",true)
	$("#quotedPrice1").removeAttr("checked");
	$("#quotedPrice1").parent("span").removeAttr("class");
	$("#quotedPrice2").removeAttr("checked");
	$("#quotedPrice2").parent("span").removeAttr("class");
	var  epeople= document.getElementById("ePeople");
	$.ajax({
		type:"POST",
		url :pathHeader+"/companyAudit/auditCheck",
		data:{
			id:companyId,
			userId:userId,
			expandAreaCode:expandAreaCode
		},
		dataType:"json",
		success:function(msg) {
			 var charUser =  msg.user;
			 $("#auditGroupId").val(charUser.groupUserId);
			 getUser('auditGroupId','auditUserId',charUser.id);	
			 if(msg.flag){
				 var list = msg.eUserList;
				jQuery.each(list, function(i, eUser){
					var value = eUser.id;
					var text = eUser.name;
					var option = new Option(text,value);
					epeople.options.add(option);
			 }); 
			$("#EPeopleDiv").show();
			}else{
			   $("#EPeopleDiv").hide();
			}
 	 	}
	});
}
function auditNotCheck(companyId,companyName,userId,expandAreaCode){
	$("#companyFailId").val(companyId);
	$("#cName").html(companyName);
	$.ajax({
		type:"POST",
		url :pathHeader+"/companyAudit/auditNotCheck",
		data:{
			id:companyId,
			userId:userId,
			expandAreaCode:expandAreaCode
		},
		dataType:"json",
		success:function(msg) {
			 $("#auditNotGroupId").val(msg.groupUserId);
			 getUser('auditNotGroupId','auditNotUserId',msg.id);
 	 	}
	});
}
function auditNotBy(operType){
	
	if($("#auditNotUserId").val()=="" || $("#auditNotUserId").val()==null){
		alert("请选择负责人！");
		return;
	}
	if($("input[name='reasonType']:checked").length==0){
		alert("请选择问题类型！");
		return;
	}
	if(!$("#content").is(":disabled") && $("#content").val()==""){
		alert("请填写原因！");
		return;
	}
	$("#saveNotBy").text("审核中...");
	var dataStr =$("#comAuditFail").formSerialize();
	$.ajax({
		type:"POST",
		url :pathHeader+"/companyAudit/auditNotBy",
		data:dataStr,
		dataType:"json",
		success:function(result) {
			$("#saveNotBy").text("确定");
			if(result=='0'){
				alert("保存失败！");
			}else{
				alert("保存成功！");
				if(operType=="detail"){
					var cuIndex = $("#currentIndex").val();
					nextCompany(cuIndex,'audit');
					$("#notCancel").click();
				}else{
					searchCompany();
				}
				
			}
 	 	}
	});
	
}
function searchCompany(){
	if($("#city").val()=="cityAll"){
		$("#city").val("");
	}
	search(0);
}
//选中其他时text显示，否则置灰
function IsTextShow(){
	var ele = $("input[name='reasonType']:checked");
	if(ele.length==0){
		$('#content').attr('disabled',true);
	}
	ele.each(function(){
	    if($(this).val()=='7'){
	    	$('#content').attr('disabled',false);
	    }else{
	    	$('#content').val("");
	    	$('#content').attr('disabled',true);
	    }
	  });
}

function viewCompanyInfo(id,currentIndex,formTag){
	window.open("/companyAudit/viewCompany/"+id+"?currentIndex="+currentIndex+"&"+$("#search").serialize()); 
}

function auditThroughBatch(){
	var box = $(" input[type='checkbox'][name='id']:checked");
	if(box.length==0){
		alert("请选择需要审核通过的供应商！");
		return;
	}
	var ids="";
	box.each(function(){
		var id = $(this).val();
		ids+="&id="+id;
	});
	if(confirm("是否确定将所选供应商均审核通过?\n")){
		$.ajax({
			type:'POST',
			url:pathHeader+'/companyAudit/batchThrough',
			data:ids,
			success: function(result){
				alert(result);
				searchCompany();
			}
		});
	}
}
