
// 联系人数量
var contactNum = 0;

// 地区Json参数
var provinceJson = {provinces:[]};
var locationJson = {locations:[]};

$(function(){
	var path = $("#path_hidden").val(),
	swfu = null,
	swfu_settings = {
			flash_url : path+"/javascripts/swfupload/swfupload.swf",
			upload_url: path+"/upload",
			post_params: {"isWm" : true},
			file_size_limit : "100 MB",
			file_types : "*.jpg",
			file_types_description : "All Files",
			file_upload_limit : 100,
			file_queue_limit : 0,
			custom_settings : {
				progressTarget : "fsUploadProgress",
				cancelButtonId : "btnCancel"
			},
			debug: false,

			// Button settings
			button_image_url: path+"/javascripts/swfupload/images/TestImageNoText_65x29.png",
			button_width: "65",
			button_height: "29",
			button_placeholder_id: "spanButtonPlaceHolder",
			button_text: '<span class="theFont">上传</span>',
			button_text_style: ".theFont { font-size: 16; }",
			button_text_left_padding: 12,
			button_text_top_padding: 3,
			
			// The event handler functions are defined in handlers.js
			file_queued_handler : null,
			file_queue_error_handler : fileQueueError,
			file_dialog_complete_handler : fileDialogComplete,
			upload_start_handler : uploadStart,
			upload_progress_handler : uploadProgress,
			upload_error_handler : uploadError,
			upload_complete_handler : uploadComplete,
			queue_complete_handler : queueComplete,	// Queue plugin event
			upload_success_handler:function(file,url){
				try {
					$("#logoImg").attr("src",path + "/getImages?imagePath="+url);
					$("#logo_url_hidden").val(url);
				} catch (e) {
					this.debug(e);
				}
			}
		}; 
	 	swfu = new SWFUpload(swfu_settings);
		$("#upload_btn").click(function(){
			swfu.startUpload();
		});
	/**
	 * 初始化分类
	 *
	 */
	 $.ajax({
			async: true,
		    cache: false,
			url : pathHeader + "/baseMaterialType/queryBaseMaterialTypes",
			data:{ "parentId" : null },
			dataType:"json",
			success:function(data) {
				var optionHtml = "<option value='0' selected='true'>请选择</option>";
				var baseMaterialTypes = data.baseMaterialTypes;
				for(var i = 0;i < baseMaterialTypes.length; i++) {
					optionHtml += "<option value='" + baseMaterialTypes[i].id + "' >" 
						+ baseMaterialTypes[i].description + "</option>";
				}
				$(".material-type").each(function() {
					$(this).html(optionHtml);
				});
	 	 	}
		});
	
	/**
	 * 地区选择
	 *
	 */
	 $.ajax({
			async: true,
		    cache: false,
			url : pathHeader + "/location/queryLocationByParentId",
			data:{ "parentAreaCode" : "" },
			dataType:"json",
			success:function(data) {
				var optionHtml = "<option value='N/A'>请选择</option>";
				var locations = data.locations;
				for(var i = 0;i < locations.length; i++) {
					if (locations[i].areaCode != "1")
						optionHtml += "<option value='" + locations[i].areaCode + "' >" + locations[i].name + "</option>";
				}
				$(".location-all").each(function() {
					$(this).html(optionHtml);
				});
	 	 	}
		});
	
	 
	/**
	 * 触发地区选择联动
	 *
	 */
	$(".location-all").change(function() {
		var id1 = $(this).attr("id");
		var id2 = id1 + "_0";
		var code = $(this).val();
			$.ajax({
				async: true,
			    cache: false,
				url : pathHeader + "/location/queryLocationByParentId",
				data:{ "parentAreaCode" : code },
				dataType:"json",
				success:function(data) {
					var optionHtml = "";
					if (id1 == "location_all_2") 
						optionHtml = "<option value='ALL'>全部</option>";
					var locations = data.locations;
					for(var i = 0;i < locations.length; i++) {
						optionHtml += "<option value='" + locations[i].areaCode + "' >" + locations[i].name + "</option>";
					}
					$("#" + id2).html(optionHtml);
		 	 	}
			});
		});
	
	/**
	 * 触发添加经营地区按钮
	 *
	 */
	$("#addLocationBtn").click(function() {
		var provinceSel = $("#location_all_2 option:selected"); // 省
		var citySel = $("#location_all_2_0 option:selected"); // 市
		
		if (provinceSel.val() == "1") {
			alert("经营地区不可以选择全国！");
			return false;
		}
		
		// 编辑省JSON数据
		if (provinceSel.val() == "N/A" || provinceSel.val() == "") {
			return false;
		} else {
			var provinces = provinceJson.provinces;
			var province = { 
					province:provinceSel.text(),
					provinceCode:provinceSel.val()
			}; 
			// 遍历不重复就添加到Json
			var errcont = 0;
			$.each(provinces, function(index, pro){
				if (pro.provinceCode == provinceSel.val())
					errcont++;
			});
			if (errcont == 0)
				provinceJson.provinces.push(province); // 追加到最后一行
		}
		
		// 编辑市JSON数据
		var locations = locationJson.locations; 
		if (citySel.val() != "ALL") {
			var location = { 
					province:provinceSel.text(),
					provinceCode:provinceSel.val(),
					city:citySel.text(),
					cityCode:citySel.val() 
			}; 
			// 遍历不重复就添加到Json
			var errcont = 0;
			$.each(locations, function(index, loc){
				if (loc.cityCode == citySel.val())
					errcont++;
			});
			if (errcont == 0)
				locationJson.locations.push(location); // 追加到最后一行
		} else {
			$("#location_all_2_0 option").each(function() {
				if ($(this).val() == "ALL")
					return true;
					
				var location = { 
						province:provinceSel.text(),
						provinceCode:provinceSel.val(),
						city:$(this).text(),
						cityCode:$(this).val() 
				}; 
				// 遍历不重复就添加到Json
				var errcont = 0;
				var cityCode = $(this).val();
				$.each(locations, function(index, loc){
					if (loc.cityCode == cityCode)
						errcont++;
				});
				if (errcont == 0)
					locationJson.locations.push(location); // 追加到最后一行
			});
		}
		
		// 遍历到经营地区DIV中显示
		locationToDiv(locations);
		locationToContactDiv(provinces, locations);
		locationAllIsChecked();
		//var myjsonobj =  JSON.stringify(locationJson); 
	});
	
	/**
	 * 删除经营地区
	 *
	 */
	$(".dle-location-btn").live("click",function(){
		var lId = $(this).attr("lId");
		var locations = locationJson.locations; 
		var provinces = provinceJson.provinces;
		locationJson.locations.splice(lId, 1);
		
		// 遍历不重复就添加到Json
		var errcont = 0;
		$.each(provinces, function(index, pro) {
			var pCode = pro.provinceCode;
			$.each(locations, function(index, loc) {
				if (pCode == loc.provinceCode)
				errcont++;
			});
			if (errcont == 0)
				provinceJson.provinces.splice(index, 1); // 删除省一行
		});
		
		// 遍历到DIV
		locationToDiv(locations);
		locationToContactDiv(provinces, locations);
		locationAllIsChecked();
	});
	
	/**
	 * 联系人省地区全选
	 *
	 */
	 $(".contact-loc-cbox-all").live("click", function() {
		 var pCbox = $(this);
		 var pCode = pCbox.val();
		 var cName = pCbox.attr("cNum");
		 $("input[name='contactlocCbox" + cName + "']").each(function(){
			 if ( $(this).attr("pCode") == pCode)
				 if (pCbox.attr("checked") == '' || pCbox.attr("checked") == null)
					 $(this).attr("checked", false);
				 else
					 $(this).attr("checked", pCbox.attr("checked"));
		 });
	 });
	 
	 /**
	  * 联系人市地区
	  * 
	  */
	 $(".contact-loc-cbox").live("click", function() {
		 locationAllIsChecked();
	 });
	
	/**
	 * 添加联系人
	 *
	 * 这个功能就霸气了， 困扰我许久的问题了,来打算用JQuery模板做，没有时间研究了　Ｔ—Ｔ　只好先拼字符串了。
	 */
	 $("#addContactBtn").live("click", function() {
		 contactNum++;
		 $(this).attr("cNum", contactNum);
		 
		 // 追加新的联系人表单到最后一个联系人
		 var addContactDiv =  $(".add-contact-div:last");
		 var addContactStr = addContact_Model(contactNum);
		 addContactDiv.after(addContactStr);
		 
		 // 单独生成地区
		 var provinces = provinceJson.provinces;
		 var locations = locationJson.locations; 
		 $(".contact-location:last").each(function(index) {
				var provincesDivStr = "";
				var cNum = contactNum;
				$.each(provinces, function(index, pro) {
					var pCode = pro.provinceCode;
					provincesDivStr += "<div><input type='checkbox' class='contact-loc-cbox-all' cNum='" + cNum 
						+ "' value='" + pCode + "'>" + pro.province + "</div>"; 
					$.each(locations, function(index, loc) {
						if (pCode == loc.provinceCode)
							provincesDivStr += "<input type='checkbox' name='contactlocCbox" + cNum + "' "
							+ "class='contact-loc-cbox loc-cbox-" + cNum + "-" + pCode + "' "
							+ "pcode='" + pCode ;
								+ "' value='" + loc.cityCode + "'>" + loc.city + "</label>&nbsp;&nbsp;"
					});
					provincesDivStr += "<BR /><BR />";
				});
				$(this).html(provincesDivStr);
			});
		 locationAllIsChecked();
		 locationToContactDiv(provinces, locations)
	 });
	 
	 /**
	  * 添加联系人电话
	  *
	  * 这里木有删除操作，心情好在写吧
	  */
	 $(".add-cphone-btn").live("click", function() {
		 var cNum = $(this).attr("cNum");
		 var phoneText = $("input[name='addCPhone" + cNum + "']:last");
		 var phoneStr = "<input type='text' name='addCPhone" + cNum + "' class='form-control' placeholder=''>";
		 phoneText.after(phoneStr);
	 });
	
	/**
	 * 添加联系人手机
	 *
	 * 这里木有删除操作，心情好在写吧
	 */
	 $(".add-cmobile-phone-btn").live("click", function() {
		 var cNum = $(this).attr("cNum");
		 var mPhoneText = $("input[name='addCMobilePhone" + cNum + "']:last");
		 var mPhoneStr = "<input type='text' name='addCMobilePhone" + cNum + "' class='form-control' placeholder=''>";
		 mPhoneText.after(mPhoneStr);
	 });
	 
	 /**
	  * 显示&&隐藏地区
	  * 
	  */
	 $(".show-contact-location").live("click", function() {
		 var cNum = $(this).attr("cNum");
		 var locDiv =  $(".contact-location").eq(cNum);
		 if (locDiv.css("display") == "none")
			 locDiv.show();
		 else
			 locDiv.hide();
		 locationAllIsChecked();
	 });
	 
	 /**
	  * 删除联系人
	  * 
	  */
	 $(".delete-contact").live("click", function() {
		 var cCont = $(".add-contact-div").length;
		 if (cCont <= 1) {
			 alert("已经是最后的一个了，你真的忍心删除吗！");
			 return false;
		 } else {
			 contactNum--;
		 }
		 var cId = $(this).attr("cId");
		 $("#addContactDiv_" + cId).remove();
	 });
	 
	 /**
	  * 失去焦点：供应商名称验证
	  * 
	  */
	 $("#name").live("blur", function() { 
		 verifyName();
	 });
	 
	 /**
	  * 失去焦点：上级公司名称查询
	  * 
	  */
	 $("#parentName").live("blur", function() { 
		 verifyParentName();
	 });
	 
	 /**
	  * 失去焦点：公司邮箱格式验证
	  * 
	  */
	 $("#email").live("blur", function() { 
		 isSubmit += verifyFrom("#email", /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, true, "", "公司邮箱格式错误");
	 });
	 
	 /**
	  * 失去焦点：帐号信息登陆名
	  * 
	  */
	 $("#userLoginName").live("blur", function() {
		 verifyUserLoginInfo();
	 });
	 
	 /**
	  * 失去焦点：帐号信息邮箱
	  * 
	  */
	 $("#userEmail").live("blur", function() {
		 verifyUserLoginInfo();
	 });
	 
	 /**
	  * 失去焦点：帐号信息邮箱
	  * 
	  */
	 $("#userMobilePhone").live("blur", function() {
		 verifyUserLoginInfo();
	 });
	 
	
	/**
	 * Submit From
	 * 
	 */
	$("#saveBtn").click(function() {
		var isSubmit = 0;
		
			// 供应商名称验证
			isSubmit += verifyName();
			
			// 上级公司验证
			isSubmit += verifyParentName();
			
			// 公司邮箱验证
			isSubmit += verifyFrom("#email", /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, true, "", "公司邮箱格式错误");
			
			// 联系人信息验证
			isSubmit += verifyContactPeoplesInfo();
				
			// 帐号信息验证
			isSubmit += verifyUserLoginInfo();
		
		// 拓展地区
		$("#expandAreaCode").val($("#location_all_0_0").val());
		// 所在地区
		$("#locationAreaCode").val($("#location_all_1_0").val());
		// 经营地区
		$("#operatingAreas").val(JSON.stringify(locationJson));
		
		if (isSubmit != 0){
			alert("您填写的信息还未完善或者填写有误，请检查后再进行保存");
		}else {
			$("#form_sample_3").submit(); // 提交
		}
	});
	
});

/**
 * 遍历地区JSON到经营地区DIV中显示 
 *
 */
function locationToDiv(locations) {
	var str = "";
	$.each(locations, function(index, loc) {
		str += loc.province + " - " + loc.city
			+ "&nbsp;&nbsp;<a href='javascript:void(0)' class='dle-location-btn' lId='" + index 
			+ "' title='删除该地区'>x</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"; 
	});
	$("#addLocationDiv").html(str);
}

/**
 * 遍历地区JSON到联系人DIV中显示 
 *
 */
function locationToContactDiv(provinces, locations) {
	// 遍历联系人地区列表
	$(".contact-location").each(function(index) {
		var provincesDivStr = "";
		var cNum = index;
		if (provinces.length > 0) {
			$.each(provinces, function(index, pro) {
				// 添加省
				var pCode = pro.provinceCode;
				provincesDivStr += "<div><input type='checkbox' class='contact-loc-cbox-all' cNum='" + cNum 
					+ "' value='" + pCode + "'>" + pro.province + "</div>"; 
				// 添加市
				$.each(locations, function(index, loc) {
					if (pCode == loc.provinceCode) {
						provincesDivStr += "<input type='checkbox' name='contactlocCbox" + cNum + "' pcode='" + pCode 
						+ "' value='" + loc.cityCode + "'"
						+ "class='contact-loc-cbox loc-cbox-" + cNum + "-" + pCode + "' ";
						$("input[name='contactlocCbox" + cNum + "']:checked").each(function() {
							if ($(this).val() == loc.cityCode) {
								provincesDivStr += " checked='checked' ";
							}
						});
						provincesDivStr += ">" + loc.city + "</label>&nbsp;&nbsp;";
					}
						
				});
			});
		} else {
			provincesDivStr += "<div>您还未选择供应商的经营地区</div>";
		}
		provincesDivStr += "<BR />";
		provincesDivStr += "<BR />";
		provincesDivStr += "<div style='float:right'><a href='javascript:void(0)' class='show-contact-location' cnum='" + cNum + "'>确定</a></div>";
		$(this).html(provincesDivStr);
	});
}

/**
 * 设置地区省选择状态
 *
 */
function locationAllIsChecked () {
	$(".contact-location").each(function(index) {
		var cNum = index;
		$(this).find(".contact-loc-cbox-all").each(function() {
			var pCbox = $(this);
			var pCode = $(this).val();
			var count = $(".loc-cbox-" + cNum + "-" + pCode + "").not("input:checked").length;
			if (count == 0) 
				$(this).attr("checked", true);
			else 
				$(this).attr("checked", false);
		});
	});
}

/**
 * 添加联系人模板
 * 
 * @param contactNum
 * @returns {String}
 */
function addContact_Model(contactNum) {
	 var str = "<div  id='addContactDiv_" + contactNum + "' class='add-contact-div'>";
	 		// 按钮
	 		str += "<h3 class='form-section'>";
	 			str += "<div class='form-inline'><small></small>";
	 					str += "<div class='checkbox'><label><input name='contactPeoples[" + contactNum + "].isMain' value='1' type='checkbox'> 常用联系人 </label></div>";
	 					str += "<div class='checkbox'><label><input name='contactPeoples[" + contactNum + "].isShow' value='1' type='checkbox'> 信息公开 </label></div>";
	 					str += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button type='button' class='btn btn-danger delete-contact' cId='" + contactNum + "'>删除</button>";
	 		str += "</div></h3>";
 			// 第一行
 			str += "<div class='row'>";
				// 姓名
				str += "<div class='col-md-6'><div class='form-group'><label class='control-label col-md-3'>姓名<font color='red'>*</font></label><div class='col-md-9'>"
				 		+ "<input type='text' id='contactPeoplesName" + contactNum + "' name='contactPeoples[" + contactNum + "].name' class='form-control'placeholder=''>"
				 		+ "<span class='help-block help-verify'></span></div></div></div>";
				// 性别
				str += "<div class='col-md-6'><div class='form-group'><label class='control-label col-md-3'>性别</label><div class='col-md-9'>"
				 		+ "<select name='contactPeoples[" + contactNum + "].sex' class=' form-control' style='width:130px'>"
				 		+ "<option value='0'>男</option><option value='1'>女</option></select>"
				 		+ "<span class='help-block help-verify'></span></div></div></div>";
			str += "</div>";
			// 第二行
 			str += "<div class='row'>";
 				// 手机
 			 	str += "<div class='col-md-6'><div class='form-group'><label class='control-label col-md-3'>手机<font color='red'>*</font></label><div class='col-md-9'>"
 			 		+ "<input type='hidden' id='contactPeoplesMobilePhone" + contactNum + "' name='contactPeoples[" + contactNum + "].mobilePhone'>"
 			 		+ "<input type='text' name='addCMobilePhone" + contactNum + "' class='form-control' placeholder=''>"
 			 		+ "<button class='btn btn-primary btn-sm add-cmobile-phone-btn' cNum='" + contactNum + "' type='button'>添加手机</button>" 
 			 		+ "<span class='help-block help-verify'></span></div></div></div>";
 			 	// 职务
 				str += "<div class='col-md-6'><div class='form-group'><label class='control-label col-md-3'>职务<font color='red'>*</font></label><div class='col-md-9'>" 
 				 		+ "<input type='text' id='contactPeoplesPosition" + contactNum + "' name='contactPeoples[" + contactNum + "].position' class='form-control' placeholder=''>"
 				 		+ "<span class='help-block help-verify'></span></div></div></div>";
 			str += "</div>";
 			// 第三行
 			str += "<div class='row'>";
 				// 电话
 				str += "<div class='col-md-6'><div class='form-group'><label class='control-label col-md-3'>电话</label><div class='col-md-9'><div class='form-inline'>"
 					+ "<input type='hidden' id='contactPeoplesPhone" + contactNum + "' name='contactPeoples[" + contactNum + "].phone'>"
 			 		+ "<input type='text' name='addCPhone" + contactNum + "' class='form-control' placeholder=''>"
 			 		+ "<button class='btn btn-primary btn-sm add-cphone-btn' cNum='" + contactNum + "' type='button'>添加电话</button>"
 			 		+ "</div><span class='help-block help-verify'></span></div></div></div>";
 				// QQ
 				str += "<div class='col-md-6'><div class='form-group '><label class='control-label col-md-3'>QQ</label><div class='col-md-9'>" 
 			 		+ "<input type='text' name='contactPeoples[" + contactNum + "].qq' class='form-control'placeholder=''>"
 			 		+ "<span class='help-block help-verify'></span></div></div></div>";
 			str += "</div>";
 			// 第四行
 			str += "<div class='row'>";
 				// 邮箱
 				str += "<div class='col-md-6'><div class='form-group'><label class='control-label col-md-3'>邮箱</label><div class='col-md-9'><div class='form-inline'>" 
 					+ "<input name='contactPeoples[" + contactNum + "].email' type='text' class='form-control'placeholder=''></div>"
 					+ "<span class='help-block help-verify'></span></div></div></div>";
 				//地址
 				str += "<div class='col-md-6'><div class='form-group '><label class='control-label col-md-3'>地址</label><div class='col-md-9'>"
 		       		+ "<input type='text' name='contactPeoples[" + contactNum + "].address' class='form-control'placeholder=''>"
 		       		+ "<span class='help-block help-verify'></span></div></div></div>";
 			str += "</div>";
 			// 第五行
 			str += "<div class='row'>";
 				//地区
 			 	str += "<div class='col-md-6'><div class='form-group'><label class='control-label col-md-3'>地区</label><div class='col-md-9'>"
 			 		+ "<input type='hidden' id='contactLocations" + contactNum + "' name='contactPeoples[" + contactNum + "].locationNames'>"
 			 		+ "<a href='javascript:void(0)' class='show-contact-location' cNum='" + contactNum + "'>选择地区</a>"
 			 		+ "<div class='contact-location form-actions' style='display: none;'></div><span class='help-block help-verify'></span></div></div></div>";
 			 	str += "<div class='col-md-6'><div class='form-group'><label class='control-label col-md-3'>备注</label><div class='col-md-9'>"
 		     		+ "<input type='text' name='contactPeoples[" + contactNum + "].note' class='form-control' placeholder=''>" 
 		     		+ "<span class='help-block help-verify'></span></div></div></div>";
 			str += "</div>";
 			str += "<h3></h3>"
	 	str += "</div>"

	 return str;	
}


function verifyFrom(obj, re, isEmpty, successText, errorText) {
	
//	if (obj.length == 0) {
//		return 0;
//	}
//	
//	var type = obj.substring(0, 1);
//	alert(type);
//	if (type = "#") {
		var val = $(obj).val().trim();
		$(obj).val(val);
		
		if (isEmpty && val.length == 0) {
			verifyHasSuccess(obj, successText);
			return 0;
		}
		
		if (re.test($(obj).val())) {
			verifyHasSuccess(obj, successText);
			return 0;
		} else {
			verifyHasError(obj, errorText);
			return 1;
		}
//	} else if (type = ".") {
//		var count = 0;
//		$(obj).each(function(index, o) {
//			var val = o.val().trim();
//			o.val(val);
//			if (isEmpty && val.length == 0) {
//				var parentDiv = o.parent();
//				parentDiv.removeClass("has-error");
//				parentDiv.find(".help-verify").html(successText);
//				count += 0;
//			}
//			
//			if (re.test(val) {
//				var parentDiv = o.parent();
//				parentDiv.removeClass("has-error");
//				parentDiv.find(".help-verify").html(successText);
//				count += 0;
//			} else {
//				var parentDiv = o.parent();
//				parentDiv.addClass("has-error");
//				parentDiv.find(".help-verify").html(errorText);
//				count += 1;
//			}
//		});
//		return count;
//	} else {
//		return 0;
//	}
	
}

function verifyHasSuccess(id, successText) {
	var parentDiv = $(id).parent();
	parentDiv.removeClass("has-error");
	parentDiv.find(".help-verify").html(successText);
}

function verifyHasError(id, errorText) {
	var parentDiv = $(id).parent();
	parentDiv.addClass("has-error");
	parentDiv.find(".help-verify").html(errorText);
}

function textValueIsEmpty(id) {
	var text = $(id);
	text.val(text.val().trim());
	if (text.val().length == 0) {
		return true;
	} else {
		return false;
	}
}

function verifyName() {
	var isSubmit = 0;
	// 供应商名称验证
//	var nameVerify = verifyFrom("#name", /^[a-zA-Z0-9\u0391-\uFFE5]{1,50}$/, false, "", "公司名称格式不正确，只能由中文数字字符组成");
//	if (nameVerify != 0 ) {
//		isSubmit += 1;
	if (textValueIsEmpty("#name")) {
		verifyHasError("#name", "您必须填写一个公司名称");
		isSubmit += 1;
	} else {
		$.ajax({
			async: false,
			cache: false,
			url : pathHeader + "/company/my/verifyCompanyName",
			data:{ "name" : $("#name").val() },
			dataType:"json",
			success:function(data) {
				var sus = data.success;
				if (!sus) {
					verifyHasError("#name", "已有的公司名称，不能保存");
					isSubmit += 1;
				} else {
					verifyHasSuccess("#name", "公司名称可用");
				}
		 	}
		});
	}
	return isSubmit;
}

function verifyParentName() {
	var isSubmit = 0;
//	var parentNameVerify = verifyFrom("#parentName", /^[a-zA-Z0-9\u0391-\uFFE5]{1,50}$/, true, "", "公司名称格式错误");
//	if (parentNameVerify != 0 ) {
//		isSubmit += 1;
//	} else {
		if (!textValueIsEmpty("#parentName")) {
			$.ajax({
				async: false,
				cache: false,
				url : pathHeader + "/company/my/searchCpmpanyByName",
				data:{ "name" : $("#parentName").val() },
				dataType:"json",
				success:function(data) {
					var sus = data.success;
					var id = data.id;
					if (!sus) {
						verifyHasError("#parentName", "无效的公司名称");
						isSubmit += 1;
					} else {
						verifyHasSuccess("#parentName", "公司名称可用，ID：" + id);
						$("#parentId").val(id);
					}
				}
			});
		} else {
			verifyHasSuccess("#parentName", "");
			$("#parentId").val("");
		}
//	}
	return isSubmit;
}



function verifyUserLoginInfo() {
	var isSubmit = 0;
	if (!textValueIsEmpty("#userLoginName") || !textValueIsEmpty("#userMobilePhone") || !textValueIsEmpty("#userEmail")) {
		// 登陆名称 ^(?![0-9]+$)|^[a-zA-Z_]{1,30}$
		var loginNameVerify = verifyFrom("#userLoginName", /^[a-zA-Z]+[a-zA-Z0-9_]{5,49}$/, false, "登录名一旦保存将不可修改", "格式错误，长度为6~50位字符，不能包含纯数字");
//		var loginNameVerify = verifyFrom("#userLoginName", /^(?![0-9]+$)|^[0-9a-zA-Z_]{6,50}$/, false, "登录名一旦保存将不可修改", "格式错误，长度为6~50位字符，");
		if (loginNameVerify != 0) {
			isSubmit += loginNameVerify;
		} else {
			$.ajax({
				async: false,
				cache: false,
				url : pathHeader + "/user/verifyLoginName",
				data:{ "loginName" : $("#userLoginName").val() },
				dataType:"json",
				success:function(data) {
					var sus = data.success;
					if (!sus) {
						verifyHasError("#userLoginName", "用户名不能重复");
						isSubmit += 1;
					}
			 	}
			});
		}
		
		// 帐户邮箱
		var emailVerify = verifyFrom("#userEmail", /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/, true, "", "帐户邮箱格式错误，登录名和邮箱都不为空才能创建帐号");
		if (emailVerify != 0) {
			isSubmit += emailVerify;
		} else {
			if (!textValueIsEmpty("#userEmail")) {
				$.ajax({
					async: false,
					cache: false,
					url : pathHeader + "/user/verifyEmail",
					data:{ "email" : $("#userEmail").val() },
					dataType:"json",
					success:function(data) {
						var sus = data.success;
						if (!sus) {
							verifyHasError("#userEmail", "帐户邮箱不能重复");
							isSubmit += 1;
						}
				 	}
				});
			}
		}
		// 帐户手机
		var mobilePhoneVerify = verifyFrom("#userMobilePhone", /^[\d]{11}$/, true, "", "帐户手机格式错误，长度为11位数字");
		if (mobilePhoneVerify != 0) {
			isSubmit += mobilePhoneVerify;
		} else {
			if (!textValueIsEmpty("#userMobilePhone")) {
				$.ajax({
					async: false,
					cache: false,
					url : pathHeader + "/user/verifyMobilePhone",
					data:{ "mobilePhone" : $("#userMobilePhone").val() },
					dataType:"json",
					success:function(data) {
						var sus = data.success;
						if (!sus) {
							verifyHasError("#userMobilePhone", "帐户手机号码不能重复");
							isSubmit += 1;
						}
					}
				});
			}
		}
		
		// 验证邮箱或手机号码是否有一个必填
		if (textValueIsEmpty("#userMobilePhone") && textValueIsEmpty("#userEmail")) {
			verifyHasError("#userMobilePhone", "您需要填写一个手机号码或者邮箱才可以创建帐户");
			verifyHasError("#userEmail", "您需要填写一个手机号码或者邮箱才可以创建帐户");
			isSubmit += 1;
		}
	} else {
		verifyFrom("#userLoginName", /^[a-zA-Z]{6,50}$/, true, "", "登录名格式错误，长度为6~50位字符，登录名一旦保存将不可修改");
		verifyFrom("#userEmail", /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/, true, "", "帐户邮箱格式错误，登录名和邮箱都不为空才能创建帐号");
		verifyFrom("#userMobilePhone", /^((\(\d{2,3}\))|(\d{3}\-))?13\d{9}$/, true, "", "帐户手机格式错误，长度为11位数字");
	}
	return isSubmit;
}

function verifyContactPeoplesInfo() {
	var isSubmit = 0;
	// 出联系人信息数据    这个好恶心哦~
	$(".contact-location").each(function(index) {
		var cNum = index;
		// 遍历联系人手机
		var cMobilePhone = "";
		$("input[name='addCMobilePhone" + cNum + "']").each(function() {
			if ($(this).val() != "")
				cMobilePhone += $(this).val() + ",";
		});
		if (cMobilePhone.length > 0)
			cMobilePhone = cMobilePhone.substring(0, cMobilePhone.length - 1);
		$("#contactPeoplesMobilePhone"+ cNum).val(cMobilePhone);
		// 验证手机
		if (textValueIsEmpty("#contactPeoplesMobilePhone" + cNum)) {
			verifyHasError("#contactPeoplesMobilePhone" + cNum, "您必须填写一个联系人的手机");
			isSubmit += 1;
		} else {
			verifyHasSuccess("#contactPeoplesMobilePhone" + cNum, "")
		}
		
		// 遍历联系人电话
		var cPhone = "";
		$("input[name='addCPhone" + cNum + "']").each(function() {
			if ($(this).val() != "")
				cPhone += $(this).val() + ",";
		});
		if (cPhone.length > 0)
			cPhone = cPhone.substring(0, cPhone.length - 1);
		$("#contactPeoplesPhone" + cNum).val(cPhone);
		// 验证电话
//		if (textValueIsEmpty("#contactPeoplesPhone" + cNum)) {
//			verifyHasError("#contactPeoplesPhone" + cNum, "您必须填写一个联系人的手机");
//			isSubmit += 1;
//		} else {
//			verifyHasSuccess("#contactPeoplesPhone" + cNum, "")
//		}
		
		// 验证名称
		if (textValueIsEmpty("#contactPeoplesName" + cNum)) {
			verifyHasError("#contactPeoplesName" + cNum, "您必须填写一个联系人的名字");
			isSubmit += 1;
		} else {
			verifyHasSuccess("#contactPeoplesName" + cNum, "")
		}
		
		// 验证职位
		if (textValueIsEmpty("#contactPeoplesPosition" + cNum)) {
			verifyHasError("#contactPeoplesPosition" + cNum, "您必须填写一个联系人的职位");
			isSubmit += 1;
		} else {
			verifyHasSuccess("#contactPeoplesPosition" + cNum, "")
		}
		
		// 遍历联系人地区
		var clocations = "";
		var clocationsCods = "";
		$("input[name='contactlocCbox" + cNum + "']:checked").each(function() {
			if ($(this).val() != "") {
				clocations += $(this).text() + ",";
				clocationsCods += $(this).val() + ",";
			}
		});
		if (clocations.length > 0)
			clocations = clocations.substring(0, clocations.length - 1)
		$("#contactLocations"+ cNum).val(clocations);
		if (clocationsCods.length > 0)
			clocationsCods = clocationsCods.substring(0, clocationsCods.length - 1)
		$("#contactLocationsCodes"+ cNum).val(clocationsCods);
	}); 
	return isSubmit;
}


function ajaxFileUpload(){
	
	$.ajax({
		async: false,
		cache: false,
		secureuri : false,
		url : pathHeader + "/fileUpload/companyLogo",
		fileElementId : "logoImage",
		data:{ },
		dataType:"json",
		success:function(data) {
			var sus = data.success;
			if (!sus) {
				verifyHasError("#userEmail", "帐户邮箱不能重复");
				isSubmit += 1;
			}
	 	}
	});
	
	
	
	
//	//开始上传文件时显示一个图片,文件上传完成将图片隐藏
//	//$("#loading").ajaxStart(function(){$(this).show();}).ajaxComplete(function(){$(this).hide();});
//	//执行上传文件操作的函数
//	$.ajaxFileUpload({
//		//处理文件上传操作的服务器端地址(可以传参数,已亲测可用)
//		url:pathHeader + "/fileUpload/companyLogo",
//		secureuri:false,                       //是否启用安全提交,默认为false 
//		fileElementId:'logoImage',           //文件选择框的id属性
//		dataType:'text',                       //服务器返回的格式,可以是json或xml等
//		success:function(data, status){        //服务器响应成功时的处理函数
//			data = data.replace("<PRE>", '');  //ajaxFileUpload会对服务器响应回来的text内容加上<pre>text</pre>前后缀
//			data = data.replace("</PRE>", '');
//			data = data.replace("<pre>", '');
//			data = data.replace("</pre>", ''); //本例中设定上传文件完毕后,服务端会返回给前台[0`filepath]
//			if(data.substring(0, 1) == 0){     //0表示上传成功(后跟上传后的文件路径),1表示失败(后跟失败描述)
//				$("img[id='uploadImage']").attr("src", data.substring(2));
//				$('#result').html("图片上传成功<br/>");
//			}else{
//				$('#result').html('图片上传失败，请重试！！');
//			}
//		},
//		error:function(data, status, e){ //服务器响应失败时的处理函数
//			$('#result').html('图片上传失败，请重试！！');
//		}
//	});
}


//var swfu;
//
//window.onload = function() {
//	var settings = {
//		flash_url : pathHeader + "/javascripts/swfupload/swfupload.swf",
//		upload_url: pathHeader + "/upload",
//		post_params: {"PHPSESSID" : "Sdfsdf"},
//		file_size_limit : "5 MB",
//		file_types : "*.*",
//		file_types_description : "All Files",
//		file_upload_limit : 100,
//		file_queue_limit : 0,
//		custom_settings : {
//			progressTarget : "fsUploadProgress",
//			cancelButtonId : "btnCancel"
//		},
//		debug: false,
//
//		// Button settings
//		button_image_url: pathHeader + "/javascripts/swfupload/images/TestImageNoText_65x29.png",
//		button_width: "125",
//		button_height: "29",
//		button_placeholder_id: "spanButtonPlaceHolder",
//		button_text: '<span class="theFont">浏览</span>',
//		button_text_style: ".theFont { font-size: 16; }",
//		button_text_left_padding: 12,
//		button_text_top_padding: 3,
//		
//		// The event handler functions are defined in handlers.js
//		file_queued_handler : fileQueued,
//		file_queue_error_handler : fileQueueError,
//		file_dialog_complete_handler : fileDialogComplete,
//		upload_start_handler : uploadStart,
//		upload_progress_handler : uploadProgress,
//		upload_error_handler : uploadError,
//		upload_success_handler : uploadSuccess,
//		upload_complete_handler : uploadComplete,
//		queue_complete_handler : queueComplete,	// Queue plugin event
//		
//						
//		custom_settings : {
//			tdFilesQueued : document.getElementById("tdFilesQueued"),
//			tdFilesUploaded : document.getElementById("tdFilesUploaded"),
//			tdErrors : document.getElementById("tdErrors"),
//			tdCurrentSpeed : document.getElementById("tdCurrentSpeed"),
//			tdAverageSpeed : document.getElementById("tdAverageSpeed"),
//			tdMovingAverageSpeed : document.getElementById("tdMovingAverageSpeed"),
//			tdTimeRemaining : document.getElementById("tdTimeRemaining"),
//			tdTimeElapsed : document.getElementById("tdTimeElapsed"),
//			tdPercentUploaded : document.getElementById("tdPercentUploaded"),
//			tdSizeUploaded : document.getElementById("tdSizeUploaded"),
//			tdProgressEventCount : document.getElementById("tdProgressEventCount"),
//			progressTarget : "fsUploadProgress2",
//			cancelButtonId : "btnCancel2"
//		}
//	};
//
//	swfu = new SWFUpload(settings);
// };
 
// function uploadSuccess(file, serverData) {
//	try {
//		//alert(progress.setComplete());
////			var progress = new FileProgress(file, this.customSettings.progressTarget);
////			progress.setComplete();
////			progress.setStatus("Complete.");
////			progress.toggleCancel(false);
////		$("#"+file.id+"fileUploadTypeTd").attr("innerText","上传成功！");
////		$("#companyMyFileUploadForm").append("<input type='hidden' name='fileName' value="+file.name+">");
////		$("#companyMyFileUploadForm").append("<input type='hidden' name='fileSize' value="+file.size+">");
////		$("#companyMyFileUploadForm").append("<input type='hidden' name='fileType' value="+file.type+">");
////		$("#companyMyFileUploadForm").append("<input type='hidden' name='filePhysicalPath' value="+serverData+">");
//		
//		alert(serverData);
//		$("#logo").val(serverData);
//		var parentDiv = $("#logo").parent();
//		parentDiv.find(".help-verify").html("上传成功");
//	} catch (ex) {
//		alert(ex);
//		this.debug(ex);
//	}
//}
 
// function deleteFileForUpload(fileId,trId){
//		
//	 swfu.cancelUpload(fileId,false);
//	 $("#"+trId).detach();
//}