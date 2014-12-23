MessageTemplateJS=function(){};
MessageTemplateJS.prototype={
		
		init : function () {
			alert("messageTemplateJS");
		},
		
		edit : function(){
				$.post("/messageTemplate/edit",$("#messageTemplateForm").serialize(),function(msg){
					if(msg.messageStatus == "999999"){
						alert("修改失败！");
					}else if(msg.messageStatus == "000000"){
						alert("修改成功！");
						window.location.href="/messageTemplate/all/list";
					}
				});
		},
		backList : function (){
			window.location.href="/messageTemplate/all/list";
		},
		deleteMessageTemplate : function (data){
			if(window.confirm("确定要删除模板")){
				$.post("/messageTemplate/deleteMessageTemplate",{id:data},function(msg){
					if(msg.messageStatus == "999999"){
						alert("修改失败！");
					}else if(msg.messageStatus == "000000"){
						alert("删除成功！");
						window.location.href="/messageTemplate/all/list";
					}
				});
			}
		},checkMessageTemplateMtNameAndSave : function(){
			$.post("/messageTemplate/checkMessageTemplateMtName",{mtName:$("#mtName").attr("value"),id:$("#id").val()},function(msg){
				if(msg.messageStatus == "999999"){
					alert("网络通信异常！");
				}else if(msg.messageStatus == "000000"){
						//return msg.counts;
						if(msg.counts== 0){
							messageTemplateJS.edit();
						}
				}
			});
		},
		resetSearchForm:function(){
			$("#mtNameSearchForm").val("");
		},
		onSubmitTrimSearchValue : function(){
			$("#mtNameSearchForm").val($("#mtNameSearchForm").val().trim());
		}
		
};


var messageTemplateJS=new MessageTemplateJS();


