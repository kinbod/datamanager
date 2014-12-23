CompanyAllListJS = function(){};
CompanyAllListJS.prototype={
		//TODO 没有用户的id
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
				companyAllListJS.getMessageTemplateContent();
				companyAllListJS.checkMessageTemplateCount();
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
		getMessageTemplateContent : function (){
			if($("#messageTemplateSelet").attr("value")!=null&&$("#messageTemplateSelet").attr("value")!=""){
				$.post("/messageTemplate/getMessageTemplateContent",{id:$("#messageTemplateSelet").attr("value")},function(msg){
				
				if(msg.messageStatus == "999999"){
					alert("获取模板内容失败！");
				}else if(msg.messageStatus == "000000"){
					$("#messageTemplateContent").attr("value",msg.messageTemplates.content);
				}
			});
		}}
			,
		sendMessage : function(){
			if($("#sendMessageForm").valid()){
				var ids=companyAllListJS.getSelectCompanyTelNum();
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
									companyAllListJS.checkMessageTemplateCount();
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
					}
					//刷新 模板列表select
					//companyAllListJS.messageTemplateDialogHide();
					$("#messageTemplateCancel").click();
					companyAllListJS.initMessageTemplateMenu();
					companyAllListJS.checkMessageTemplateCount();
					$("#btnSaveMessageTemplate").attr("disabled",false);
					
				});
			}
		},cleanAddMessageTemplateDiv:function(){
			$("#addMessageTemplateContent").val("");
			$("#messageTemplateName").val("");
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
							companyAllListJS.addMessageTemplate();
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
		},
		checkMessageTemplateCount : function(){
			$.post("/messageTemplate/checkMessageTemplateCount",{userId:$("#userId").val()},function(msg){
				if(msg.messageStatus == "999999"){
					alert("网络通信异常！");
				}else if(msg.messageStatus == "000000"){
					if(msg.counts != null && msg.counts >= 10){
						$("#btnOpenMessageTemplateAddAlter").attr("title","短信模板数量已经超过10个,不能添加了！");
						$("#btnOpenMessageTemplateAdd").attr("disabled",true);
					}
				}
			});
		},
		getSelectCompanyTelNum : function(){
			var ids='';
			$("[name='id']:checked").each(function(){
				
				ids=ids+$(this).val()+",";
				
			});
			return ids;
		},
		toUploadFile : function(id){
			window.location.href="/company/company-my-file-upload?id="+id;
		},
		messageTemplateDialogHide : function(){
			$("#sendMessageCancelBtn").click();
			$("#messageTemplateCancel").click();
			$("#commonMessageTemplateCancelBtn").click();
		},
		getmessageCommon : function(){
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
				companyAllListJS.getMessageTemplateContent();
			});
		},
		getMessageTemlateMenu:function(){
			var isCommon=$("#messageTemplateType").val();
			if(isCommon==1){
				companyAllListJS.getmessageCommon();
			}else{
				companyAllListJS.initMessageTemplateMenu();
			}
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
					companyAllListJS.initMessageTemplateMenu();
					companyAllListJS.messageTemplateDialogHide();
					companyAllListJS.checkMessageTemplateCount();
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
		},
		checkCommonMessageTemplateMtNameToSaveCommonMessageTemplate : function(){
			$.post("/messageTemplate/checkMessageTemplateMtName",{mtName:$("#commonMessageTemplateName").attr("value")},function(msg){
				if(msg.messageStatus == "999999"){
					alert("网络通信异常！");
				}else if(msg.messageStatus == "000000"){
					if(msg.counts != null && msg.counts > 0){
						$("#messageTemplateNameDiv").html("<font color='red'>不可重复</font>");
					}else{
						companyAllListJS.saveCommonMessageTemplate();
					}
				}
			});
		}
		
};
var validator ;
var companyAllListJS=new CompanyAllListJS();
$(document).ready(function(){
	companyAllListJS.getMessageTemlateMenu();
	companyAllListJS.checkMessageTemplateCount();
	
	validator=$("#sendMessageForm").validate({
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
		 }
		
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
	
	/** ========================= 张光勇：开始 ============================= */
	$("#form_batch_setting_user").validate({
		rules: {
			/*dia_group_name:{
				required:true
			},*/
			dia_user_name: {
				required:true
			}
		},
		messages:{
			/*dia_group_name:{
				required:"<font color='red'>请选择负责人</font>"
			},*/
			dia_user_name:{
				required:"<font color='red'>请选择要设置负责人的用户</font>"
			}
		},
		debug:true
	});
	
});
	
