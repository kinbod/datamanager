CompanyUncheckedList = function(){};
CompanyUncheckedList.prototype={
		//TODO 没有用户的id
		initMessageTemplateMenu:function(){
			$("#messageTemplateSelet").empty();
			$.post("/messageTemplate/getMessageTemplateMenu",{userId:$("#userId").val()},function(msg){
				if(msg.messageStatus == "999999"){
					alert("获取模板列表失败！");
				}else if(msg.messageStatus == "000000"){
					for(var messageTemplate in msg.messageTemplates){
						$("#messageTemplateSelet").append("<option value="+msg.messageTemplates[messageTemplate].id+">"+msg.messageTemplates[messageTemplate].mtName+"</option>");
						
					}
				}
				//刷新，conent  内容
				companyUncheckedListJS.getMessageTemplateContent();
				companyUncheckedListJS.checkMessageTemplateCount();
			});
		},
		getMessageTemplateContent : function (){
			if($("#messageTemplateSelet").attr("value")!=null&&$("#messageTemplateSelet").attr("value")!=""){$.post("/messageTemplate/getMessageTemplateContent",{id:$("#messageTemplateSelet").attr("value")},function(msg){
			if(msg.messageStatus == "999999"){
				alert("获取模板内容失败！");
			}else if(msg.messageStatus == "000000"){
				$("#messageTemplateContent").attr("value",msg.messageTemplates.content);
			}
		});
	}},
		sendMessage : function(){
			
			
			if($("#sendMessageForm").valid()){
				var ids=companyUncheckedListJS.getSelectCompanyTelNum();
				if(ids.split(",").length>1){
						if($("#messageTemplateContent").attr("value").length>150){
							alert("文字内容不能超过150字！");
						}else{
							$("#sendMessageBtn").attr("disabled","true");
							$.post("/company/sendMessage",{"ids":ids,content:$("#messageTemplateContent").attr("value")},function(msg){
								$("#showMessageStatusDialog").click();
								if(msg.messageStatus == "999999"){
									$("#contentMessageStatue").html("<font color='red'>&nbsp;&nbsp;发送失败!</font>");
								}else if(msg.messageStatus == "000000"){
									if(msg.errorMobilePhoneNum!=""){
										$("#contentMessageStatue").html("<font color='red'>&nbsp;&nbsp;发送成功! 部分失败的号码为"+msg.errorMobilePhoneNum+"</font>");
									}else{
										$("#contentMessageStatue").html("<font color='red'>&nbsp;&nbsp;发送成功!</font>");
									}
								}
								companyUncheckedListJS.checkMessageTemplateCount();
								$("#sendMessageBtn").attr("disabled","false");
							});
						}
				}else{
					alert("请选择供应商！");
				}
			}
		},
		toMessageTemplate:function(){
			window.location.href="/messageTemplate/all/list";
		},
		addMessageTemplate : function(){
			
			if($("#messageTemplateAddForm").valid()){
				$("#btnSaveMessageTemplate").attr("disabled",true);
				$.post("/messageTemplate/addMessageTemplate",{mtName:$("#messageTemplateName").attr("value"),content:$("#addMessageTemplateContent").attr("value"),userId:$("#userId").val()},function(msg){
					
					if(msg.messageStatus == "999999"){
						alert("保存失败！");
					}else if(msg.messageStatus == "000000"){
						alert("保存成功！");
						$("#messageTemplateCancel").click();
					}
					//刷新 模板列表select
					companyUncheckedListJS.initMessageTemplateMenu();
					companyUncheckedListJS.messageTemplateDialogHide();
					companyUncheckedListJS.checkMessageTemplateCount();
					
					$("#btnSaveMessageTemplate").attr("disabled",false);
				});
			}
		},checkMesssageTemplateToSave:function(){
			if($("#messageTemplateAddForm").valid()){
				$.post("/messageTemplate/checkMessageTemplateMtName",{mtName:$("#messageTemplateName").attr("value")},function(msg){
					if(msg.messageStatus == "999999"){
						alert("网络通信异常！");
					}else if(msg.messageStatus == "000000"){
						if(msg.counts != null && msg.counts > 0){
							$("#messageTemplateNameDiv").html("<font color='red'>不可重复</font>");
						}else{
							$("#messageTemplateNameDiv").html("");
							companyUncheckedListJS.addMessageTemplate();
						}
					}
				});
			}
		},
		checkMessageTemplateMtName : function(){
			$.post("/messageTemplate/checkMessageTemplateMtName",{mtName:$("#messageTemplateName").attr("value")},function(msg){
				if(msg.messageStatus == "999999"){
					alert("网络通信异常！");
				}else if(msg.messageStatus == "000000"){
					if(msg.counts != null && msg.counts > 0){
						$("#messageTemplateNameDiv").html("<font color='red'>不可重复</font>");
					}else{
						$("#messageTemplateNameDiv").html("");
					}
				}
			});
		},checkMessageTemplateCount : function(){
			$.post("/messageTemplate/checkMessageTemplateCount",{userId:$("#userId").val()},function(msg){
				if(msg.messageStatus == "999999"){
					alert("网络通信异常！");
				}else if(msg.messageStatus == "000000"){
					if(msg.counts != null && msg.counts >= 10){
						$("#btnOpenMessageTemplateAddAlter").attr("title","短信模板数量已经超过10个,不能添加了！");
						$("#btnOpenMessageTemplateAdd").attr("disabled",true);
						$("#commonTemplateButtonId").attr("disabled",true);
					}
				}
			});
		},
		getMessageTemlateMenu:function(){
			var isCommon=$("#messageTemplateType").val();
			if(isCommon==1){
				companyUncheckedListJS.getmessageCommon();
			}else{
				companyUncheckedListJS.initMessageTemplateMenu();
			}
		},
		getSelectCompanyTelNum : function(){
			var ids='';
			$("[name='id']:checked").each(function(){
				
				ids=ids+$(this).val()+",";
				
			});
			return ids;
		},
		toUploadFile : function(id){
			window.location.href="/company/company-my-file-upload?id="+id+"&pageSource=1";
		},
		messageTemplateDialogHide : function(){
			$("#sendMessageCancelBtn").click();
			$("#messageTemplateCancel").click();
			$("#commonMessageTemplateCancelBtn").click();
		},getmessageCommon : function(){
			$("#messageTemplateSelet").empty();
			$.post("/messageTemplate/getMessageTemplataCommon",{userId:$("#userId").val()},function(msg){
				if(msg.messageStatus == "999999"){
					alert("获取模板列表失败！");
				}else if(msg.messageStatus == "000000"){
					for(var messageTemplate in msg.messageTemplates){
						$("#messageTemplateSelet").append("<option value="+msg.messageTemplates[messageTemplate].id+">"+msg.messageTemplates[messageTemplate].mtName+"</option>");
					}
				}
				//刷新，conent  内容
				companyUncheckedListJS.getMessageTemplateContent();
			});
		},saveCommonMessageTemplate:function(){
			
			if($("#commonMessageTemplateForm").valid()){
				
				$("#commonMessageTemplateSaveBtn").attr("disabled",true);
				$.post("/messageTemplate/addMessageTemplate",{mtName:$("#commonMessageTemplateName").attr("value"),content:$("#messageTemplateContent").attr("value"),userId:$("#userId").val()},function(msg){
					if(msg.messageStatus == "999999"){
						alert("保存失败！");
					}else if(msg.messageStatus == "000000"){
						alert("保存成功！");
						$("#messageTemplateCancel").click();
					}
					//刷新 模板列表select
					companyUncheckedListJS.initMessageTemplateMenu();
					companyUncheckedListJS.messageTemplateDialogHide();
					companyUncheckedListJS.checkMessageTemplateCount();
					$("#commonMessageTemplateSaveBtn").attr("disabled",false);
					
				});
			}
		},checkCommonMessageTemplateMtName : function(){
			$.post("/messageTemplate/checkMessageTemplateMtName",{mtName:$("#commonMessageTemplateName").attr("value")},function(msg){
				if(msg.messageStatus == "999999"){
					alert("网络通信异常！");
				}else if(msg.messageStatus == "000000"){
					if(msg.counts != null && msg.counts > 0){
						$("#commonMessageTemplateNameDiv").html("<font color='red'>不可重复</font>");
					}else{
						$("#commonMessageTemplateNameDiv").html("");
					}
				}
			});
		},checkCommonMessageTemplateMtNameToSaveCommonMessageTemplate : function(){
			$.post("/messageTemplate/checkMessageTemplateMtName",{mtName:$("#commonMessageTemplateName").attr("value")},function(msg){
				if(msg.messageStatus == "999999"){
					alert("网络通信异常！");
				}else if(msg.messageStatus == "000000"){
					if(msg.counts != null && msg.counts > 0){
						$("#messageTemplateNameDiv").html("<font color='red'>不可重复</font>");
					}else{
						companyUncheckedListJS.saveCommonMessageTemplate();
					}
				}
			});
		}
		
};

var companyUncheckedListJS=new CompanyUncheckedList();
$(document).ready(function(){
	
	companyUncheckedListJS.getMessageTemlateMenu();
	companyUncheckedListJS.checkMessageTemplateCount();
	
	$("#sendMessageForm").validate({
		 rules: {
			 messageTemplateContent:{
				 required:true,
				 rangelength:[2,150]
			 }
		 },
		 messages:{
			 messageTemplateContent:{
			  		required:"<font color='red'>请输入信息内容</font>",
			  		rangelength:"<font color='red'>请输入2--150 个字符！</font>"
			  	}
		 }, debug:true
		
	});
	$("#commonMessageTemplateForm").validate({
		rules: {
			commonMessageTemplateName:{
				required:true,
				rangelength:[2,15]
			}
		},
		messages:{
			commonMessageTemplateName:{
				required:"<font color='red'>请输入内容</font>",
				rangelength:"<font color='red'>请输入2--15 个字符！</font>"
			}
		},
		debug:true
	});
});
	$("#messageTemplateAddForm").validate({
		rules: {
			addMessageTemplateContent:{
				required:true,
				rangelength:[2,150]
			},
			messageTemplateName:{
				required:true,
				rangelength:[2,15]
			}
		},
		messages:{
			addMessageTemplateContent:{
				required:"<font color='red'>请输入内容</font>",
				rangelength:"<font color='red'>请输入2--150 个字符！</font>"
			},
			messageTemplateName:{
				required:"<font color='red'>请输入内容</font>",
				rangelength:"<font color='red'>请输入2--15 个字符！</font>"
			}
		}, debug:true
		
	});
	






function returnAudit(){
	
	$.ajax({
		type:"POST",
		url :pathHeader+"/companyAudit/returnAudit",
		data:"companyId="+$("#companyId").val(),
		success:function(result) {
			if(result=='0'){
				alert("保存失败！");
			}else if(result=='1'){
				alert("保存成功！");
				window.location.href=pathHeader+"/company/unchecked/list";
			}else{
				alert(result);
			}
 	 	}
	});
}

function showReturnAudit(companyId,companyName){
	$("#companyId").val(companyId);
	$("#companyName").html(companyName);
}
