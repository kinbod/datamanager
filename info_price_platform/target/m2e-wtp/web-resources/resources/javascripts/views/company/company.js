/**
 * 下载供应商文件
 * @param formtag 所在的form对象
 */	
function downChecked(dataDicId,formtag,companyId,single){
		var ids="";
		if(companyId&&companyId!=''){
			ids="id="+companyId;
		}else{
			ids= getCheckedIds(formtag);
			if(!ids||ids==""){
				alert("请选择要下载的的供应商");
				return;
			}
		}
		$.ajax({
			   type: "POST",
			   url: "/company/download/companyfiles",
			   data: ids+"&single="+single+"&dataDicId="+dataDicId,
			   success: function(data){
				   if(data.result=="true"){
					   window.location.href="/common/downFiles?fileName="+data.fileName+"&filePath="+data.filePath;
				   }else{
					   alert(data.result);
				   }
			   }
			});
}
/**
 * 供应商详情文件的下载
 * @param formtag
 */
function downFiles(formtag,fileId){
	var ids="";
	if(fileId&&fileId!=''){
		ids="type=nozip&id="+fileId;
	}else{
		ids = getCheckedIds(formtag);
		if(!ids||ids==""){
			alert("请选择要下载的文件");
			return;
		}
	}
	$.ajax({
		   type: "POST",
		   url: "/company/download/single",
		   data: ids,
		   success: function(data){
			   if(data.result=="true"){
				   window.location.href="/common/downFiles?fileName="+data.fileName+"&filePath="+data.filePath;
			   }else{
				   alert(data.result);
			   }
		   }
		});
}

/**
 * 供应商详情文件的下载(不根据类型打包)
 * @param formtag
 */
function downFilesNoType(formtag,fileId){
	var ids="";
	if(fileId&&fileId!=''){
		ids="type=nozip&id="+fileId;
	}else{
		ids = getCheckedIds(formtag);
		if(!ids||ids==""){
			alert("请选择要下载的文件");
			return;
		}
	}
	$.ajax({
		   type: "POST",
		   url: "/company/download/notype",
		   data: ids,
		   success: function(data){
			   if(data.result=="true"){
				   window.location.href="/common/downFiles?fileName="+data.fileName+"&filePath="+data.filePath;
			   }else{
				   alert(data.result);
			   }
		   }
	});
}

/**
 * 供应商详情文件的下载
 * @param formtag
 */
function down_file(formtag,fileId){
	var ids="";
	if(fileId&&fileId!=''){
		ids="id="+fileId;
	}else{
		ids = getCheckedIds(formtag);
		if(!ids||ids==""){
			alert("请选择要下载的文件");
			return;
		}
	}
	$.ajax({
		   type: "POST",
		   url: "/company/download/single",
		   data: ids,
		   success: function(data){
			   if(data.result=="true"){
				   window.location.href="/common/downFiles?fileName="+data.fileName+"&filePath="+data.filePath;
			   }else{
				   alert(data.result);
			   }
		   }
		});
}

/**
 *  下载fileImportRecord记录中的文件
 * @param formtag
 */
function downFilesRecords(companyName,formtag,fileId){
	var ids="";
	if(fileId&&fileId!=''){
		ids="id="+fileId;
	}else{
		ids = getCheckedIds(formtag);
		if(!ids||ids==""){
			alert("请选择要下载的文件");
			return;
		}
	}
	$.ajax({
		type: "POST",
		url: "/download/importfiles",
		data: ids+"&companyName="+companyName,
		success: function(data){
			if(data.result=="true"){
				window.location.href="/common/downFiles?fileName="+data.fileName+"&filePath="+data.filePath;
			}else{
				alert(data.result);
			}
		}
	});
	
	
}
/**
 * 供应商重置密码
 * @param companyId
 */
function resetPassword(companyId){
	$.ajax({
		   type: "POST",
		   url: "/company/password/reset",
		   data: "companyId="+companyId,
		   success: function(msg){
			   if(msg=="true"){
				   alert("重置成功!");
			   }else{
				   alert(msg);
			   }
		   }
		});
}
function expCompany(type){
	if(totalCount>30000){
		alert("您检索的数据超过规定的个数，请重新选择检索条件！");
		return;
	}
	$("#search").attr("action","/company/expCompany?type="+type);
	$("#search").submit();
	if('all'==type){
		$("#search").attr("action","/company/all/list");
	}else{
		$("#search").attr("action","/company/my/list");
	}
	
}

//获取供应商材料数量
function  getCompanyProductCount(companyId){
	$.ajax({
		   type: "GET",
		   url: "/company/password/reset",
		   data: "companyId="+companyId,
		   success: function(msg){
			   if(msg=="true"){
				   alert("重置成功!");
			   }else{
				   alert(msg);
			   }
		   }
		});
	
}

/**
 * 下载供应商文件
 * @param formtag 所在的form对象
 */	
function download_EFile(formtag,companyId){
		var ids="";
		if(companyId&&companyId!=''){
			ids="id="+companyId;
		}else{
			ids= getCheckedIds(formtag);
			if(!ids||ids==""){
				alert("请选择要下载的的供应商");
				return;
			}
		}
		$.ajax({
			   type: "POST",
			   url: "/download/companyEFileByBatch",
			   data: ids,
			   success: function(data){
				   if(data.result=="true"){
					   window.location.href="/common/downFiles?fileName="+data.fileName+"&filePath="+data.filePath;
				   }else{
					   alert(data.result);
				   }
			   }
			});
}