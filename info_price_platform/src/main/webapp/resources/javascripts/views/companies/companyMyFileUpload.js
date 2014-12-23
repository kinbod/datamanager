CompanyMyFileUploadJS=function(){};
CompanyMyFileUploadJS.prototype={
		
		onCheckIsHadUploadedFile : function (){
			if($("input[name='fileName']").size()>0){
				return true;
			}
			alert("请上传文件！");
			return false;
		},
		uploadFileAndSubmit :function(){
			swfu.startUpload();
		},
		backToMyCompanyList : function(){
			if($("#pageSource").val()==0){
				window.location.href="/company/my/list";
			}else{
				window.location.href="/company/unchecked/list";
			}
		},
	    reloadUploadFilePage:function(){
			window.location.href="/company/company-my-file-upload?id="+$("#companyId").val()+"&pageSource="+$("#pageSource").val();
		},
		isWantUploadFile:function(isWant){
			if(isWant){
				companyMyFileUploadJS.reloadUploadFilePage();
			}else{
				companyMyFileUploadJS.backToMyCompanyList();
			}
		},
		submitForm:function(){
			$.post("/company/saveFile",$("#companyMyFileUploadForm").serialize(),function(msg){
				if(msg.messageStatus == "999999"){
					alert("上传出现问题！");
				}else if(msg.messageStatus == "000000"){
					$("#isWantUploadFileDialog").show();
				}
			});
		},
		isShowUploadFileDialog:function(data){
			if(data){
				$("#isWantUploadFileDialog").show();
			}else{
				$("#isWantUploadFileDialog").hide();
			}
		},
		checkPhotoAlbumName: function(){
			$.post("/company/checkPhotoAlbumName",{paName:$("#photoAlbumName").attr("value"),companyId:$("#companyId").attr("value")},function(msg){
				if(msg.messageStatus == "999999"){
					alert("网络通信异常！");
				}else if(msg.messageStatus == "000000"){
					if(msg.counts != null && msg.counts > 0){
						$("#photoAlbumNameDiv").html("<font color='red'>不可重复</font>");
					}else{
						$("#photoAlbumNameDiv").empty("");
					}
				}
			});
		},
		submitNewPhotoAlbumsIng:false,
		submitNewPhotoAlbums:function() {
			if(CompanyMyFileUploadJS.submitNewPhotoAlbumsIng == true){
				return;
			}
			if($("#newPhotoAlbumForm").valid()){
				CompanyMyFileUploadJS.submitNewPhotoAlbumsIng = true;
					var data={paName:$("#photoAlbumName").val(),dataDicId:10,companyId:$("#companyId").val()};
					$.ajax({
						url:"/company/addPhotoAlbums",
						dataType:"json",
						type:"post",
						data:data,
						success:function(data){
							if (data.messageStatus == "000000") {
								alert("新增成功");
								$("#photoAlbumNameCancel").click();
								window.location.href="/company/company-my-file-upload?pageSource="+$("#pageSource").val()+"&id="+$("#companyId").val();
							} else if(data.messageStatus == "999999"){
								alert(data.message);
							}
							CompanyMyFileUploadJS.submitNewPhotoAlbumsIng = false;
						},
						error:function(){
							alert("操作失败，请重试！");
							CompanyMyFileUploadJS.submitNewPhotoAlbumsIng = false;
						}
					});
				}
			},getQuestionContent : function (){
				if($("#photoAlbumName").attr("value")!=null&&$("#photoAlbumName").attr("value")!=""){
					$.post("/company/getPhotoAlbumByPaId",{paName:$("#photoAlbumName").attr("value")},function(msg){
						if(msg.messageStatus == "999999"){
							alert("请输入");
						}else if(msg.messageStatus == "000000"){
							$("#questionReasonsEdit").attr("value",msg.questions.content);
						}
					});	
				}
			}
};


var companyMyFileUploadJS=new CompanyMyFileUploadJS();

var $topLoader;
$().ready(function(){

	
    $("#newPhotoAlbumForm").validate({
		 rules: {
	   		photoAlbumName: {
						 required:true
					 }
		 },
		 messages:{
			 photoAlbumName:{
			  		required:"<font color='red'>请输入内容</font>"
			  	 }
		 },
		 debug:false	
	});
   
	
	
	
	  $topLoader = $("#topLoader").percentageLoader({width: 150, height: 150, controllable : true, progress : 0, onProgressUpdate : function(val) {
	        //$topLoader.setValue(Math.round(val * 100.0));
	      }});

	   
	    var topLoaderRunning = false;
	    $("#animateButton").click(function() {
	      if (topLoaderRunning) {
	        return;
	      }
	      topLoaderRunning = true;
	      $topLoader.setProgress(0);
	      $topLoader.setValue('0kb');
	      var kb = 0;
	      var totalKb = 999;
	      
	      var animateFunc = function() {
	        kb += 17;
	        $topLoader.setProgress(kb / totalKb);
	        $topLoader.setValue(kb.toString() + 'kb');
	        
	        if (kb < totalKb) {
	          setTimeout(animateFunc, 25);
	        } else {
	          topLoaderRunning = false;
	        }
	      };
	      
	      setTimeout(animateFunc, 25);
	    });
	    
	    

});

