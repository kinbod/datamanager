//定义当前js的全局变量
var globalVar = {
	//下拉框ID	
	select_operate_category: 'select_operate_category',
	select_euser: 'select_euser',
	select_user_group: 'select_user_group',
	select_user: 'select_user',
	select_problem_mark_type: 'select_problem_mark_type',
	
	//表单ID
	form_problem_mark: 'form_problem_mark',
	
	//问题表单属性ID
	input_companyId: 'input_companyId',
	input_companyName: 'input_companyName',
	
	input_create_user_id: 'input_create_user_id',
	
	input_attachmentFileType: 'input_attachmentFileType',
	input_problemType: 'input_problemType',
	input_createAt: 'input_createAt',
	input_typeCode: 'input_typeCode',
	
	input_eStartDate: 'input_eStartDate',
	input_eEndDate: 'input_eEndDate',
	input_pStartDate: 'input_pStartDate',
	input_pEndDate: 'input_pEndDate',
	
	textarea_note: 'textarea_note',
	input_upload_file_path: 'input_upload_file_path',
	file_type_code_e_quotation_issue: 'e-quotation-issue',		//E化问题报价
	file_type_code_e_quotation_modified: 'e-quotation-modified',//E化修改报价
	//分页ID
	pageDiv: 'pageDiv',
	input_current_page: 'input_current_page',
	input_page_size: 'input_page_size',
	defaultPNo : '1',
	defaultPSize : '20',
	
	//按钮ID
	button_problem_mark_form_no: 'button_problem_mark_form_no',
	button_problem_mark_form_yes: 'button_problem_mark_form_yes',
	button_problem_mark_form_reset: 'button_problem_mark_form_reset',
	button_upload_file: 'button_upload_file',
	
	//表格ID
	tbody_company_e_List: 'tbody_company_e_List',
	tbody_company_e_problemLog_list: 'tbody_company_e_problemLog_list',
	
	tmpl_company_e_List: 'tmpl_company_e_List',
	tmpl_company_e_problemLog_list: 'tmpl_company_e_problemLog_list',
	
	//日期格式
	date_ymd : 'ymd',
	date_hm : 'hm',
	date_hms : 'hms',
	date_hmss : 'hmss',
	date_ymdhm: 'ymdhm',
	date_ymdhms: 'ymdhms',
	date_ymdhmss: 'ymdhmss'
		
};

//初始化页面
$(function(){
	globalVar.eUrl = $('#input_e_url').val();
	globalVar.pageFlag = $('#page_flag').val();
	initPage();
});

function initPage(){
	initSelect();		//下拉框
	initInput();		//输入框
	
	if(globalVar.pageFlag == '1'){
		initFormValidate();				//需要E化供应商问题表单验证
	}else{
		initFormValidateOfProblem();	//需E化问题供应商问题表单验证
	}
	
	initFileUpload1();	//文件上传
	initButtonEvent();	//问题表单按钮
	searchSubmit();		//查询
	ecomplete();//E化完成
};
//E化完成
var loadingECompleteResult = false;
function ecomplete(){
	$('#button_ecomplete').click(function(){
		if(loadingECompleteResult){
			return;
		}
		loadingECompleteResult = true;
		var text = $(this).text();
		$(this).text("正在E化...");
		$.ajax({
			url: pathHeader +  '/company/ecomplete',
			type:'POST',
			dataType:'JSON',
			success: function(data){
				//创建成功,关闭窗口,刷新页面
				if(data.companies == 0){
					alert("对不起，没有符合E化完成条件的商家。");
				}else{
					alert('本次E化完成操作共E化供应商：' + data.companies + '家， E化材料：' + data.products + '条。');
				}
				loadingECompleteResult = false;
				$("#button_ecomplete").text(text);
				searchSubmit();
			},
			error: function(){
				alert('页面js错误');
				loadingECompleteResult = false;
				$("#button_ecomplete").text(text);
				searchSubmit();
			}
		});
	});
}
/**
 * 点击搜索,提交表单
 */
function searchSubmit() {
	$("#maskDiv").show();
	
	var params = {};
	
	params.currentPage = arguments.length > 0 ? arguments[0] : pNo() ? pNo() : globalVar.defaultPNo;
	params.pageSize = arguments.length > 1 ? arguments[1] : pSize() ? pSize() : globalVar.defaultPSize;
	
	var cb1 = $("#checkbox_quotedPriceTypes_1").attr("checked");
	var cb2 = $("#checkbox_quotedPriceTypes_2").attr("checked");
	var quotedPriceType = null; 
	if(cb1 && cb2){
		params.quotedPriceType = 3;
	}else if(cb1){
		params.quotedPriceType = 1;
	}else if(cb2){
		params.quotedPriceType = 2;
	}
	
	params.operateCategory = jVal(globalVar.select_operate_category);
	params.eUserId = jVal(globalVar.select_euser);
	params.userGroupId = jVal(globalVar.select_user_group);
	params.userId = jVal(globalVar.select_user);
	params.name = jVal(globalVar.input_companyName);
	//问题标记类型(新添加的查询条件)
	params.problemMarkType = jVal(globalVar.select_problem_mark_type);
	
	if(jVal(globalVar.input_eStartDate) != ''){
		params.eStartDate = jVal(globalVar.input_eStartDate) + ' 00:00:00';
	}
	if(jVal(globalVar.input_eEndDate) != ''){
		params.eEndDate = jVal(globalVar.input_eEndDate) + ' 23:59:59';
	}
	
	if(jVal(globalVar.input_pStartDate) != ''){
		params.pStartDate = jVal(globalVar.input_pStartDate) + ' 00:00:00';
	}
	if(jVal(globalVar.input_pEndDate) != ''){
		params.pEndDate = jVal(globalVar.input_pEndDate) + ' 23:59:59';
	}
	$.ajax({
		url: globalVar.eUrl,
		type:'POST',
		dataType:'json',
		data: params,
		success: function(data){
			var list = data.list;
			if(list == null){
				jObj(globalVar.tbody_company_e_List).html("");
			}else{
				jObj(globalVar.tmpl_company_e_List).tmpl(list).appendTo(jObj(globalVar.tbody_company_e_List).html(""));
				$('.is_urgency_true').each(function(){
					$(this).html('<font color=red >*</font>' + $(this).html());
				});
				initProblemMarkClickEvent();
			}
			// page
			var pageHtml = data.pageHtml;
			jObj(globalVar.pageDiv).html(pageHtml);
			jObj(globalVar.input_current_page).val(data.page.currentPage);
			jObj(globalVar.input_page_size).val(data.page.pageSize);
			initAjaxPageEvent();
			// time
			$(".fmt-date").each(function() {
				$(this).html(getLocalTime($(this).text()));
			}); 
			// tip
			initTip('div_tip');
			$("#maskDiv").hide();
			//选中E化人
			var $options = $('#select_euser option');
			$.each($options, function(){
				if(this.value == data.company.eUserId){
					$(this).prop('selected', true);
					return false;
				}
			});
			//parentCheckbox取消选中,禁止勾选单个复选框
			$('.group-checkable').parent('span').removeClass('checked');	//去除父复选框的选中样式
			//disableCheckbox();	//禁止勾选子复选框
			//trClick();			//给所有表格的行注册点击事件,使其与父复选框关联
			
		},
		error: function(xhr, msg, err){
			//alert(msg);
			$("#maskDiv").hide();
		}
	});
};

//设置勾选复选框无效
function disableCheckbox(){
	$('tbody tr').find('input[type="checkbox"]:enabled').click(function(){
		return false;
	});
};

function initFileUpload1(){
	var currSelectFiles = 0;
	var jsessionid = $('#input_session_id').val();
	
	globalVar.swfu = $("#input_file_upload").uploadify({
		auto : false,
		queueID : 'div_upload_queue',
		swf : pathHeader + "/javascripts/uploadify/uploadify.swf",
		uploader : pathHeader + "/upload;jsessionid=" + jsessionid,
		querySizeLimit:1,
		multi : false,
		removeCompleted:true,	//自动移除队列中已经完成上传的项目
		removeTimeout:0,
		//buttonImage:'${contextPath}/javascripts/uploadify/img/browse-btn.png',
		buttonText : "选择文件",
		cancelImg: '',
		fileObjName : 'Filedata',
		fileSizeLimit : '256MB',
		fileTypeExts : '*.xls; *.xlsx;',
		
		//在单文件或多文件上传时，选择文件时触发	
		onSelect: function(fileObj){
			if( $('.uploadify-queue-item').length > 1 ){
				globalVar.swfu.uploadify('cancel');
			}
			$('#upload_file_path').val(fileObj.name);
        },
		
		onUploadSuccess: function(file, serverFilePath, response){
			try {
				var data = {
					companyId: jVal(globalVar.input_companyId),
					createUserId: jVal(globalVar.input_create_user_id),
					attachmentFileType: jVal(globalVar.input_attachmentFileType),
					problemType: jVal(globalVar.input_problemType),
					createTime: jVal(globalVar.input_createAt),
					note: jVal(globalVar.textarea_note),
					fileJson: file2Json(file, serverFilePath, jVal(globalVar.input_typeCode))
				};
				
				//提交表单
				$.ajax({
					url:pathHeader + '/company/e/createProblemLog',
					type:'POST',
					dataType:'JSON',
					data: data,
					success: function(data){
						//创建成功,关闭窗口,刷新页面
						if(data == '1'){
							jObj(globalVar.button_problem_mark_form_no).trigger('click');
							searchSubmit(pNo(), pSize());
						}else{
							alert('创建失败...');
						}
					},
					error: function(){
						alert('页面js错误');
					}
				});
			} catch (e) {
				this.debug(e);
			};
		},
		
		itemTemplate : '<div id="${fileID}" style="display: none;" class="uploadify-queue-item">\<div class="cancel">\<a href="javascript:$(\'#${instanceID}\').uploadify(\'cancel\', \'${fileID}\')">X</a>\</div>\<span class="fileName">${fileName} (${fileSize})</span><span class="data"></span>\</div>' 
		//itemTemplate: '<input id="${fileID}" type="hidden" class="uploadify-queue-item" value="${fileName}" />' 
	});
};

/**
 * 创建问题标记(用于需要E化问题供应商创建问题的时候可以不上传E化修改报价文件)
 */
function createProblemLog(file, serverFilePath){
	var data = {
			companyId: jVal(globalVar.input_companyId),
			createUserId: jVal(globalVar.input_create_user_id),
			attachmentFileType: jVal(globalVar.input_attachmentFileType),
			problemType: jVal(globalVar.input_problemType),
			createTime: jVal(globalVar.input_createAt),
			note: jVal(globalVar.textarea_note)
			//fileJson: file2Json(file, serverFilePath, jVal(globalVar.input_typeCode))
		};
		if(file && serverFilePath){
			data.fileJson = file2Json(file, serverFilePath, jVal(globalVar.input_typeCode));
		}
	
		//提交表单
		$.ajax({
			url:pathHeader + '/company/e/createProblemLog',
			type:'POST',
			dataType:'JSON',
			data: data,
			success: function(data){
				//创建成功,关闭窗口,刷新页面
				if(data == '1'){
					jObj(globalVar.button_problem_mark_form_no).trigger('click');
					searchSubmit(pNo(), pSize());
				}else{
					alert('创建失败...');
				}
			},
			error: function(){
				alert('页面js错误');
			}
		});
}

//初始化文件上传控件
function initFileUpload(){
	globalVar.swfu_settings = {
		flash_url : pathHeader + "/javascripts/swfupload/swfupload.swf",
		upload_url: pathHeader + "/upload",
		post_params: {},
		file_size_limit : "100 MB",
		file_types : "*.xls;*.xlsx",
		file_types_description : "All Files",
		file_upload_limit : 100,
		file_queue_limit : 0,
		custom_settings : {
			progressTarget : "fsUploadProgress",
			cancelButtonId : "btnCancel"
		},
		debug: false,
		// Button settings
		button_image_url: pathHeader+"/javascripts/swfupload/images/TestImageNoText_65x29.png",
		button_width: "100",
		button_height: "29",
		button_placeholder_id: "spanButtonPlaceHolder",
		button_text: '<span class="theFont">选择文件</span>',
		button_text_style: ".theFont { font-size: 12; }",
		button_text_left_padding: 6,
		button_text_top_padding: 6,
		
		// The event handler functions are defined in handlers.js
		file_queued_handler : file_queued_function,
		file_queue_error_handler : fileQueueError,
		file_dialog_complete_handler : file_dialog_complete_function,
		upload_start_handler : uploadStart,
		upload_progress_handler : uploadProgress,
		upload_error_handler : uploadError,
		upload_complete_handler : uploadComplete,
		queue_complete_handler : queueComplete,	// Queue plugin event
		upload_success_handler : upload_success_function
	};
	globalVar.swfu = new SWFUpload(globalVar.swfu_settings);
	$("#upload_btn").click(function(){
		globalVar.swfu.startUpload();
	});
};
//当关闭文件选择框触发
function file_dialog_complete_function(filesTheSelected, filesTheQueued, filesOfQueued){
	if(filesOfQueued > 1){	//如果队列中的文件数量大于1,就删除上一次放入到队列中的文件
		globalVar.swfu.cancelUpload();
	}
}
//当文件添加到队列触发
function file_queued_function(file) {
	jObj(globalVar.input_upload_file_path).val(file.name);
}
//当文件上传成功触发(创建问题)
function upload_success_function(file,url){
	try {
		var data = {
			companyId: jVal(globalVar.input_companyId),
			createUserId: jVal(globalVar.input_create_user_id),
			attachmentFileType: jVal(globalVar.input_attachmentFileType),
			problemType: jVal(globalVar.input_problemType),
			createTime: jVal(globalVar.input_createAt),
			note: jVal(globalVar.textarea_note),
			fileJson: file2Json(file, url, jVal(globalVar.input_typeCode))
		};
		
		//提交表单
		$.ajax({
			url:pathHeader + '/company/e/createProblemLog',
			type:'POST',
			dataType:'JSON',
			data: data,
			success: function(data){
				//创建成功,关闭窗口,刷新页面
				if(data == '1'){
					jObj(globalVar.button_problem_mark_form_no).trigger('click');
					searchSubmit(pNo(), pSize());
				}else{
					alert('创建失败...');
				}
			},
			error: function(){
				alert('页面js错误');
			}
		});
	} catch (e) {
		this.debug(e);
	}
};


//封装上传的文件属性作为一个json字符串
function file2Json(file, downloadPath, fileTypeCode){
	return JSON.stringify({
		name: file.name,
		fileType: file.type,
		fileSize: file.size,
		importFilePath: downloadPath,
		resultFilePath: downloadPath,
		typeCode: fileTypeCode
	});
};


/**
 * 初始化页面的下拉框
 */
function initSelect(){
	/*//供应商类别
	bmtvalues(true, globalVar.operateCategory);
	//E化人
	euservalues(globalVar.select_euser);
	//负责人
	adminUser(true, globalVar.select_user_group);
	jObj(globalVar.select_user_group).change(function() {
		adminUser(false, globalVar.select_user, this);
	});
	var userGroupVal = jObj(globalVar.select_user_group).attr("value");
	if (userGroupVal != '') {
		adminUser(false, globalVar.select_user, '00', userGroupVal);
	};*/
};

/**
 * 初始化页面的输入框
 */
function initInput(){
	//jObj(globalVar.input_createAt).val(formatDate());
};

/**
 * 表单验证控件(需E化供应商)
 */
function initFormValidate(){
	jObj(globalVar.form_problem_mark).validate({
		rules: {
			createAt: {required:true},
			uploadFilePath: {required:true},
			note: {required:true}
		},
		messages:{
			createAt:{required:"<font color='red'>问题标记时间不能为空</font>"},
			uploadFilePath:{required:"<font color='red'>上传附件不能为空</font>"},
			note:{required:"<font color='red'>问题描述不能为空</font>"}
		},
		debug:true
	});
};

/**
 * 表单验证控件(需E化问题供应商)
 */
function initFormValidateOfProblem(){
	jObj(globalVar.form_problem_mark).validate({
		rules: {
			createAt: {required:true}
		},
		messages:{
			createAt:{required:"<font color='red'>问题标记时间不能为空</font>"}
		},
		debug:true
	});
};

/**
 * 初始化页面按钮事件
 */
function initButtonEvent(){
	//问题确认按钮事件(获取表单值，提交到后台)
	var yesButton = jObj(globalVar.button_problem_mark_form_yes);
	jObj(globalVar.button_problem_mark_form_yes).on('click', function(){
		//触发文件上传按钮事件,首先进行表单验证
		if( jObj(globalVar.form_problem_mark).validate().form() ){
			if(globalVar.pageFlag == '1'){	//需要E化供应商问题表单
				yesButton.text('加载中...').prop('disabled', true);
				globalVar.swfu.uploadify('upload');
			}else{							//需要E化问题供应商问题表单
				//判断是上传了E化修改报价文件,如果没有上传那么就需要判断问题描述是否为空。
				var filePath = $('#upload_file_path').val();
				if(filePath == null || filePath == ''){	//没有上传E化修改报价文件
					var note = $('#textarea_note').val().trim();
					if(note == null || note == ''){
						alert('若无附件上传,备注信息必填');
						return;
					}else{
						yesButton.text('加载中...').prop('disabled', true);
						createProblemLog();
					}
				}else{
					yesButton.text('加载中...').prop('disabled', true);
					globalVar.swfu.uploadify('upload');
				}
			}
			
		}
	});
	//问题取消按钮事件(清空表单)
	jObj(globalVar.button_problem_mark_form_no).on('click', function(){
		//销毁控件中的内容
		globalVar.swfu.uploadify('cancel', '*');
		//重置表单
		jObj(globalVar.button_problem_mark_form_reset).trigger('click');
		//清楚提示信息
		$('label[class="error"]').css('display', 'none');
		recoverOfYesButton();
	});
};


//恢复确定按钮
function recoverOfYesButton(){
	jObj(globalVar.button_problem_mark_form_yes).text('确定').prop('disabled', false);
};

/**
 * 初始化问题标记按钮点击事件(弹出问题标记框)
 */
function initProblemMarkClickEvent(){
	$('a[name="problemMark"]').on('click', function(){
		jObj(globalVar.input_createAt).val(formatDate());	//问题标记时间默认为当前时间
		var hasproplem = $(this).attr('hasproplem');
		var companyid = $(this).attr('companyid');
		var euserid = $(this).attr('euserid');
		var chargeuserid = $(this).attr('chargeuserid');
		var createuserid = $(this).attr('createuserid');
		
		if(hasproplem == '1'){
			$.ajax({
				url: pathHeader + '/company/e/problemLog/list',
				type:'POST',
				dataType:'json',
				data: {
					companyId: companyid
				},
				success: function(data){
					var list = data.list;
					if(list == null){
						jObj(globalVar.tbody_company_e_problemLog_list).html("");
					}else{
						jObj(globalVar.tmpl_company_e_problemLog_list).tmpl(list).appendTo(jObj(globalVar.tbody_company_e_problemLog_list).html(""));
					}
					// time
					$(".fmt-date1").each(function() {
						$(this).html(getLocalTime($(this).text()));
					}); 
					// tip
					initTip('div_tip1');
					//down
					initFileDownEvent();
				}
			});
		}else{
			jObj(globalVar.tbody_company_e_problemLog_list).html("");
		}
		
		//供应商ID、E化人ID、负责人ID
		jObj(globalVar.input_companyId).val(companyid);
		jObj(globalVar.input_create_user_id).val(createuserid);
	});
};

/**
 * 初始化页面的提示层
 */
function initTip(eleCls){
	var tips = $('.' + eleCls).each(function() {
		$(this).qtip({
			content : {
				text : $(this).next('div')
			},
			position : {
				my : 'bottom left',
				at : 'top center'
			},
			hide: {
	            fixed: true
			}
		});
	});
};

//公共接口

/**
 * 格式化日期
 */
function formatDate(settings){
	settings = $.extend({
		time: new Date().getTime(),
		pattern: globalVar.date_ymd
	}, settings);
	
	var date = new Date();
	date.setTime(settings.time);
	var pattern = settings.pattern;
	
	var year = date.getFullYear();
	var month = formatDateChar(date.getMonth() + 1);
	var day = formatDateChar(date.getDate());
	var hours = formatDateChar(date.getHours());
	var minutes = formatDateChar(date.getMinutes());
	var seconds = formatDateChar(date.getSeconds());
	var milliseconds = date.getMilliseconds();
	
	var ret = '';
	if(pattern == globalVar.date_hm){
		ret = hours + ':' + minutes;
	}else if (pattern == globalVar.date_hms) {
		ret = hours + ':' + minutes + ':' + seconds;
	}else if (pattern == globalVar.date_hmss) {
		ret = hours + ':' + minutes + ':' + seconds + ' ' + milliseconds;
	}else if (pattern == globalVar.date_ymd) {
		ret = year + '-' + month + '-' + day;
	}else if (pattern == globalVar.date_ymdhms) {
		ret = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
	}else if (pattern == globalVar.date_ymdhmss) {
		ret = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds + ' ' + milliseconds;
	}
	return ret;
}

/**
 * 格式化日期段格式
 * @param date
 * @returns
 */
function formatDateChar(date){
	return date > 9 ? date : '0' + date;
}

/**
 * 参数连接
 */
function paramJoin(){
	if(arguments.length > 1){
		var joinChar = arguments[arguments.length - 1];
		var ret = '';
		for ( var i = 0; i < arguments.length-1; i++) {
			ret += arguments[i] + joinChar;
		}
	}
};

//ajax分页事件
function initAjaxPageEvent(){
	$('select[name="cu_pa"]').on('change', function(){
		searchSubmit($(this).val(), pSize());
	});
	
	$('select[name="pageSize"]').on('change', function(){
		searchSubmit('1', $(this).val());
	});
};

function pNo(){
	return jVal(globalVar.input_current_page);
}

function pSize(){
	return jVal(globalVar.input_page_size);
}

//根据元素ID获取元素的Jquery对象
function jObj(eleId){
	return $('#' + eleId);
};

function jVal(eleId){
	return jObj(eleId).val();
};

function jText(eleId){
	return jObj(eleId).text();
};

function jHtml(eleId){
	return jObj(eleId).html();
};

//文件下载
function downResultFile(fileId,fileName,filePath){
	 $.get(pathHeader + "/common/checkFileExists?filePath="+filePath, function(data){
		  if(data=="success"){
			  window.location.href= pathHeader + "/download/downResuleFiles?fileName="+fileName+"&id="+fileId;
		  }
		  else{
			  alert(data);
		  }
	 });
};

//文件下载事件
function initFileDownEvent(){
	$('.problem-file-down').click(function(){
		var fileId = $(this).attr('fileid');
		var fileName = $(this).attr('filename');
		var filePath = $(this).attr('filepath');
		downResultFile(fileId,fileName,filePath);
	});
}
