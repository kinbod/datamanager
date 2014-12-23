/*
	A simple class for displaying file information and progress
	Note: This is a demonstration only and not part of SWFUpload.
	Note: Some have had problems adapting this class in IE7. It may not be suitable for your application.
*/

// Constructor
// file is a SWFUpload file object
// targetID is the HTML element id attribute that the FileProgress HTML structure will be added to.
// Instantiating a new FileProgress object with an existing file will reuse/update the existing DOM elements

	var tab=null;

function FileProgress(file, targetID) {
	this.fileProgressID = file.id;

	this.opacity = 100;
	this.height = 0;
	

	this.fileProgressWrapper = document.getElementById(this.fileProgressID);
	if (!this.fileProgressWrapper) {
		this.fileProgressWrapper = document.createElement("div");
		this.fileProgressWrapper.className = "progressWrapper";
		this.fileProgressWrapper.id = this.fileProgressID;

		this.fileProgressElement = document.createElement("div");
		this.fileProgressElement.className = "progressContainer";

		var progressCancel = document.createElement("a");
		progressCancel.className = "progressCancel";
		progressCancel.href = "#";
		progressCancel.style.visibility = "hidden";
		progressCancel.appendChild(document.createTextNode(" "));

		var progressText = document.createElement("div");
		progressText.className = "progressName";
		progressText.appendChild(document.createTextNode(file.name));

		var progressBar = document.createElement("div");
		progressBar.className = "progressBarInProgress";

		var progressStatus = document.createElement("div");
		progressStatus.className = "progressBarStatus";
		progressStatus.innerHTML = "&nbsp;";

		this.fileProgressElement.appendChild(progressCancel);
		this.fileProgressElement.appendChild(progressText);
		this.fileProgressElement.appendChild(progressStatus);
		this.fileProgressElement.appendChild(progressBar);

		this.fileProgressWrapper.appendChild(this.fileProgressElement);
		
		if(tab == null){
			tab=document.createElement("table");
			tab.setAttribute("id", "fileTab");
			tab.setAttribute("height","100%");
			tab.setAttribute("weight","100%");
			tab.setAttribute("style","border:1px solid #336699");
			var trTh="<tr><th style='border:1px solid #336699'>文件名称</th>" +
					"<th style='border:1px solid #336699'>文件大小</th>" +
					"<th style='border:1px solid #336699'>文件类型</th>" +
					"<th style='border:1px solid #336699'>所属分类</th>"+
					"<th style='border:1px soled #336699'>上传状态</th>" +
					"<th style='border:1px solid #336699' >操作</th></tr>";
			$(tab).append(trTh);
			$("#"+targetID).append(tab);
			this.fileProgressWrapper=tab;
		}
		
//		var fileNameTd=document.createElement("td");
//		fileNameTd.setAttribute("id",file.id+"fileNameTd");
//		fileNameTd.setAttribute("innerText", file.name);
//		fileNameTd.setAttribute("height","20px");
//		fileNameTd.setAttribute("width","30px");
//		
//		var fileTypeTd=document.createElement("td");
//		fileTypeTd.setAttribute("id",file.id+"fileTypeTd");
//		fileTypeTd.setAttribute("innerText", file.type);
//		fileTypeTd.setAttribute("height","20px");
//		fileTypeTd.setAttribute("width","30px");
//		
//		var fileSizeTd=document.createElement("td");
//		fileSizeTd.setAttribute("id",file.id+"fileSizeTd");
//		fileSizeTd.setAttribute("innerText", file.size);
//		fileSizeTd.setAttribute("height","20px");
//		fileSizeTd.setAttribute("width","30px");
//		fileSizeTd.nodeValue="eeee";
//		var fileDeleteTd=document.createElement("td");
//		fileDeleteTd.setAttribute("id",file.id+"fileDeleteTd");
//		fileDeleteTd.setAttribute("innerText", "删除");
//		fileDeleteTd.setAttribute("height","20px");
//		fileDeleteTd.setAttribute("width","30px");
		
		
		//fileDeleteTd.attachEvent("onblur", deleteFileForUpload());
		
	
//		
//		fileTr.appendChild(fileNameTd);
//		fileTr.appendChild(fileTypeTd);
//		fileTr.appendChild(fileSizeTd);
//		fileTr.appendChild(fileDeleteTd);
//		
//		tab.appendChild(fileTr);
		
		var trSrc=document.getElementById(file.id+"Tr");
		if(null ==trSrc){
			
			var checkVal=$('input:radio[name="dataDicId"]:checked').val();
			var text=$('input:radio[name="dataDicId"]:checked').attr("outerText");
			var paid="";
			var opname="";
			if(null !=$("#paId")){
				opname=$("#paId").find("option:selected").text();
				paid=$("#paId").find("option:selected").val();
			}
			
			var fileTr=document.createElement("tr");
			fileTr.setAttribute("id",file.id+"Tr");
			var fileSize=(file.size/1024/1024);
			var fileNameTd="  <td style='border:1px solid #336699' id='"+file.id+"fileNameTd'>"+file.name+"</td>";
			var fileSizeTd="  <td style='border:1px solid #336699' id='"+file.id+"fileSizeTd'>"+fileSize.toString().substring(0,6)+"MB</td>";
			var fileTypeTd="  <td style='border:1px solid #336699' id='"+file.id+"fileTypeTd'>"+file.type+"</td>";
			var fileOwnGroupTd="";
			if(checkVal == 10 && opname !=""){
				 fileOwnGroupTd="  <td style='border:1px solid #336699' id='"+file.id+"fileOwnGroupTd'>"+text+"&gt;&gt;"+opname+"<input type='hidden' name='ownGroupId' value='"+checkVal+"'/><input type='hidden' name='paId' value='"+paid+"'/></td>";
					var fileUploadTypeTd="  <td style='border:1px solid #336699' id='"+file.id+"fileUploadTypeTd'>已经添加到上传队列</td>";
					var fileDeleteTd="<td style='border:1px solid  #336699' id='"+file.id+"fileDeleteTd' ><a class='btn default btn-xs black' onclick=deleteFileForUpload('"+file.id+"','"+file.id+"Tr')><i class='fa fa-trash-o'></i> 删除</a></td>";
					$(fileTr).append(fileNameTd+fileSizeTd+fileTypeTd+fileOwnGroupTd+fileUploadTypeTd+fileDeleteTd);
					$("#fileTab").append(fileTr);
			}else if(checkVal != 10){
				 fileOwnGroupTd="  <td style='border:1px solid #336699' id='"+file.id+"fileOwnGroupTd'>"+text+"<input type='hidden' name='ownGroupId' value='"+checkVal+"'/><input type='hidden' name='paId' value='0'/></td>";
					var fileUploadTypeTd="  <td style='border:1px solid #336699' id='"+file.id+"fileUploadTypeTd'>已经添加到上传队列</td>";
					var fileDeleteTd="<td style='border:1px solid  #336699' id='"+file.id+"fileDeleteTd' ><a class='btn default btn-xs black' onclick=deleteFileForUpload('"+file.id+"','"+file.id+"Tr')><i class='fa fa-trash-o'></i> 删除</a></td>";
					$(fileTr).append(fileNameTd+fileSizeTd+fileTypeTd+fileOwnGroupTd+fileUploadTypeTd+fileDeleteTd);
					$("#fileTab").append(fileTr);
			}else{
				alert("请确定是不是，应该添加个相册了？");
			}
			

		}
	
		
		
	} else {
		//this.fileProgressElement = this.fileProgressWrapper.firstChild;
		this.fileProgressElement = this.fileProgressWrapper.firstChild;
		this.reset();
	}

	this.height = this.fileProgressWrapper.offsetHeight;
	this.setTimer(null);


}


FileProgress.prototype.setTimer = function (timer) {
	this.fileProgressElement["FP_TIMER"] = timer;
};
FileProgress.prototype.getTimer = function (timer) {
	return this.fileProgressElement["FP_TIMER"] || null;
};

FileProgress.prototype.reset = function () {
	this.fileProgressElement.className = "progressContainer";

	this.fileProgressElement.childNodes[2].innerHTML = "&nbsp;";
	this.fileProgressElement.childNodes[2].className = "progressBarStatus";
	
	this.fileProgressElement.childNodes[3].className = "progressBarInProgress";
	this.fileProgressElement.childNodes[3].style.width = "0%";
	
	this.appear();	
};

FileProgress.prototype.setProgress = function (percentage) {
	this.fileProgressElement.className = "progressContainer green";
	this.fileProgressElement.childNodes[3].className = "progressBarInProgress";
	this.fileProgressElement.childNodes[3].style.width = percentage + "%";

	this.appear();	
};
FileProgress.prototype.setComplete = function () {
	this.fileProgressElement.className = "progressContainer blue";
	this.fileProgressElement.childNodes[3].className = "progressBarComplete";
	this.fileProgressElement.childNodes[3].style.width = "";

	var oSelf = this;
	this.setTimer(setTimeout(function () {
		oSelf.disappear();
	}, 10000));
};
//FileProgress.prototype.setError = function () {
//	this.fileProgressElement.className = "progressContainer red";
//	this.fileProgressElement.childNodes[3].className = "progressBarError";
//	this.fileProgressElement.childNodes[3].style.width = "";
//
//	var oSelf = this;
//	this.setTimer(setTimeout(function () {
//		oSelf.disappear();
//	}, 5000));
//};
FileProgress.prototype.setError = function (file,error) {
	$("#"+file.id+"fileUploadTypeTd").empty();
	$("#"+file.id+"fileUploadTypeTd").append("<font color='red'>文件选择有问题</font>");
};
FileProgress.prototype.setCancelled = function () {
	this.fileProgressElement.className = "progressContainer";
	this.fileProgressElement.childNodes[3].className = "progressBarError";
	this.fileProgressElement.childNodes[3].style.width = "";

	var oSelf = this;
	this.setTimer(setTimeout(function () {
		oSelf.disappear();
	}, 2000));
};
//FileProgress.prototype.setStatus = function (status) {
//	this.fileProgressElement.childNodes[2].innerHTML = status;
//};
FileProgress.prototype.setStatus = function (file,status) {
//	this.fileProgressElement.childNodes[2].innerHTML = status;
	$("#"+file.id+"fileUploadTypeTd").append("<font color='red'>"+status+"</font>");
};

// Show/Hide the cancel button
FileProgress.prototype.toggleCancel = function (show, swfUploadInstance) {
	this.fileProgressElement.childNodes[0].style.visibility = show ? "visible" : "hidden";
	if (swfUploadInstance) {
		var fileID = this.fileProgressID;
		this.fileProgressElement.childNodes[0].onclick = function () {
			swfUploadInstance.cancelUpload(fileID);
			return false;
		};
	}
};

FileProgress.prototype.appear = function () {
	if (this.getTimer() !== null) {
		clearTimeout(this.getTimer());
		this.setTimer(null);
	}
	
	if (this.fileProgressWrapper.filters) {
		try {
			this.fileProgressWrapper.filters.item("DXImageTransform.Microsoft.Alpha").opacity = 100;
		} catch (e) {
			// If it is not set initially, the browser will throw an error.  This will set it if it is not set yet.
			this.fileProgressWrapper.style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity=100)";
		}
	} else {
		this.fileProgressWrapper.style.opacity = 1;
	}
		
	this.fileProgressWrapper.style.height = "";
	
	this.height = this.fileProgressWrapper.offsetHeight;
	this.opacity = 100;
	this.fileProgressWrapper.style.display = "";
	
};

// Fades out and clips away the FileProgress box.
FileProgress.prototype.disappear = function () {

	var reduceOpacityBy = 15;
	var reduceHeightBy = 4;
	var rate = 30;	// 15 fps

	if (this.opacity > 0) {
		this.opacity -= reduceOpacityBy;
		if (this.opacity < 0) {
			this.opacity = 0;
		}

		if (this.fileProgressWrapper.filters) {
			try {
				this.fileProgressWrapper.filters.item("DXImageTransform.Microsoft.Alpha").opacity = this.opacity;
			} catch (e) {
				// If it is not set initially, the browser will throw an error.  This will set it if it is not set yet.
				this.fileProgressWrapper.style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity=" + this.opacity + ")";
			}
		} else {
			this.fileProgressWrapper.style.opacity = this.opacity / 100;
		}
	}

	if (this.height > 0) {
		this.height -= reduceHeightBy;
		if (this.height < 0) {
			this.height = 0;
		}

		this.fileProgressWrapper.style.height = this.height + "px";
	}

	if (this.height > 0 || this.opacity > 0) {
		var oSelf = this;
		this.setTimer(setTimeout(function () {
			oSelf.disappear();
		}, rate));
	} else {
		this.fileProgressWrapper.style.display = "none";
		this.setTimer(null);
	}
};