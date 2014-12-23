function start(id){
		if(!confirm("确定要开启任务？")){
			return ;
		}
		$.ajax({
			   type: "GET",
			   url: "/job/start?da="+new Date(),
			   data: "id="+id,
			   success: function(msg){
				   if(msg=="true"){
					   alert("启动成功");
					   search(1);
				   }else{
					   alert(msg);
				   }
				}
		 });
		
	}
	function stop(id){
		if(!confirm("确定要禁用任务？")){
			return ;
		}
		$.ajax({
			   type: "GET",
			   url: "/job/stop?da="+new Date(),
			   data: "id="+id,
			   success: function(msg){
				   if(msg=="true"){
					   alert("禁用成功");
					   search(1);
				   }else{
					   alert(msg);
				   }
				}
		 });
	}
	function deleteJob(id){
		if(!confirm("确定要删除任务？")){
			return ;
		}
		$.ajax({
			   type: "GET",
			   url: "/job/delete?da="+new Date(),
			   data: "id="+id,
			   success: function(msg){
				   if(msg=="true"){
					   alert("删除成功");
					   search(1);
				   }else{
					   alert(msg);
				   }
				}
		 });
	}
	$("#newJobButton").click(function(index){
		$("#newJobForm")[0].reset();
		$("#jobModalTitle").html("新建任务");
		$("#newJobDiv").modal("show");
	});
	
	
	$("#saveJob").click(function(index){
		if(!$("#newJobForm").valid()){
			return ;
		}
		$.ajax({
			   type: "POST",
			   url: "/job/edit?da="+new Date(),
			   data: $("#newJobForm").serialize(),
			   success: function(msg){
				   if(msg=="true"){
					   alert("编辑成功");
					   search(1);
				   }else{
					   alert(msg);
				   }
				}
		 });
	});
	
	function editJob(id){
		$("#newJobForm")[0].reset();
		$("#jobModalTitle").html("编辑任务");
		$.ajax({
			   type: "get",
			   url: "/job/get?da="+new Date(),
			   data: "id="+id,
			   success: function(msg){
				   $("#newJobForm input[name='id']").val(msg.id);
				   $("#newJobForm input[name='jobName']").val(msg.jobName);
				   $("#newJobForm select[name='jobGroup'] option[value='"+msg.jobGroup+"']").attr("selected","jobGroup");
				   $("#newJobForm input[name='cronExpression']").val(msg.cronExpression);
				   $("#newJobForm input[name='cronClass']").val(msg.cronClass);
				   $("#newJobForm select[name='jobStatus'] option[value='"+msg.jobStatus+"']").attr("selected","selected");
				   $("#newJobForm input[name='descs']").val(msg.descs);
				}
		 });
		$("#newJobDiv").modal("show");
	}
 $("#newJobForm").validate({ 
			rules:{ 
				jobName:{
					required:true
				},
				jobGroup:{
					required:true
				},
				cronExpression:{
					required:true
				},
				cronClass:{
					required:true
				},
				jobStatus:{
					required:true
				}
			},
			messages: {
				jobName:{
			  		required:"<font class='warns' color='red'>请输入任务名称</font>"
			  	},
			  	jobGroup:{
			  		required:"<font class='warns' color='red'>请选择任务组</font>"
				},
				cronExpression:{
			  		required:"<font class='warns' color='red'>请输入任务表达式</font>"
			  	},
			  	cronClass:{
					required:"<font class='warns' color='red'>请输入任务类</font>"
				},
				jobStatus:{
					required:"<font class='warns' color='red'>请选择任务状态</font>"
				}
			  }
		});

	
	
	
	
	