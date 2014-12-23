$(document).ready(function() {
				$("#logo_upload").uploadify({
					formData : {},
					auto : true,
					//queueID : 'upload_queue',
					swf :"/javascripts/uploadify/uploadify.swf",
					uploader : "/upload",
					removeCompleted:false,
					//buttonImage:'${contextPath}/javascripts/uploadify/img/browse-btn.png',
					buttonText : "选择文件",
					fileObjName : 'Filedata',
					fileSizeLimit : '100MB',
					fileTypeExts : '*.xlsx',
					queueSizeLimit : 30,
					onUploadSuccess : function(file, data, response) {
						
					},
					 itemTemplate : '<div id="${fileID}" class="uploadify-queue-item">\<div class="cancel">\<a href="javascript:$(\'#${instanceID}\').uploadify(\'cancel\', \'${fileID}\')">X</a>\</div>\<span class="fileName">${fileName} (${fileSize})</span><span class="data"></span>\</div>' 
				});
			});