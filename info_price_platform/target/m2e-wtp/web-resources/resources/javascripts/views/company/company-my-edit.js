
$(function(){
	
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
				var optionHtml = "<option value='0' selected='true'></option>";
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
	
	 // 所属分类
	 $("#operateCategory").find("option[value='" + $("#operateCategory").attr("typeName") + "']").attr("selected",true);
	 
	/**
	 * 初始化地区选择
	 */
	initLocationSelect($("#expandAreaCode").val(), "location_all_0");
	initLocationSelect($("#locationAreaCode").val(), "location_all_1");
	
	/**
	 * 初始化经营地区选择
	 */
	var locations = locationJson.locations;
	var provinces = provinceJson.provinces;
	$.each(locations, function(index, loc) {
		
		// 遍历不重复就添加到Json
		var errcont = 0;
		$.each(provinces, function(index, pro){
			if (pro.provinceCode == loc.provinceCode)
				errcont++;
		});
		if (errcont > 0)
			return true;
			
		// 追加到最后一行
		var province = { 
				province:loc.province,
				provinceCode:loc.provinceCode
		}; 
		provinceJson.provinces.push(province); 
	});
	// 遍历到经营地区DIV中显示
	locationToDiv(locations);
	locationToContactDiv(provinces, locations);
	
	/**
	 * 初始化联系人手机、电话、地区
	 */
	$(".contact-location").each(function(index) {
		var cNum = index;
		
		// 遍历联系人手机
		var cMobilePhone = $("#contactPeoplesMobilePhone"+ cNum);
		var cmpStr = new Array();
		cmpStr = cMobilePhone.val().split(",");
		$.each(cmpStr, function(index, str) {
			var htmlStr = "<input type='text' name='addCMobilePhone" + cNum + "' class='form-control' value='" + str + "' placeholder=''>";
			cMobilePhone.after(htmlStr);
		});
		
		// 遍历联系人电话
		var cPhone = $("#contactPeoplesPhone" + cNum);
		var cpStr = new Array();
		cpStr = cPhone.val().split(",");
		$.each(cpStr, function(index, str) {
			var htmlStr = "<input type='text' name='addCPhone" + cNum + "' class='form-control' value='" + str + "' placeholder=''>";
			cPhone.after(htmlStr);
		});
		
		//alert($("#contactLocationsCodes" + cNum).val());
		// 遍历联系人地区信息
		var clCodes = $("#contactLocationsCodes" + cNum);
		var clcStr = new Array();
		clcStr = clCodes.val().split(",");
		
		$("input[name='contactlocCbox" + cNum + "']").each(function() {
			var cBox = $(this);
			var count = 0;
			$.each(clcStr, function(index, str) {
				if (cBox.val() == str) {
					cBox.attr("checked","checked");
					count++;
				}
			});
			if(count == clcStr.length) {
				$(".contact-loc-cbox-all").eq(cNum).attr("checked","checked");
			}
		});
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
	 * 联系人地区全选
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
	 * 
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
	  * 
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
	 * 
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
		 
		 var locations = locationJson.locations; 
		 var provinces = provinceJson.provinces;
		 // 遍历到DIV
		 locationToDiv(locations);
		 locationToContactDiv(provinces, locations);
		 
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
		if ($("#globalId").val() == "" || $("#globalId").val() == "0") {
			verifyUserLoginInfo();
		}
	 });
	 
	 /**
	  * 失去焦点：帐号信息邮箱
	  * 
	  */
	 $("#userEmail").live("blur", function() {
		if ($("#globalId").val() == "" || $("#globalId").val() == "0") {
			verifyUserLoginInfo();
		} else {
			verifyUserLoginInfo2();
		}
	 });
	 
	 /**
	  * 失去焦点：帐号信息邮箱
	  * 
	  */
	 $("#userMobilePhone").live("blur", function() {
		if ($("#globalId").val() == "" || $("#globalId").val() == "0") {
			verifyUserLoginInfo();
		} else {
			verifyUserLoginInfo2();
		}
	 });
	 
	/*
	 * Submit From
	 * 
	 */
	$("#saveBtn").click(function() {
		var isSubmit = 0;
		
		if (cooperationStatus == "no_cooperation") { // 未合作
			// 供应商名称验证
			isSubmit += verifyName();
			
		} else {
			if ($("#location_all_0_0").val() == null) {
				verifyHasError("#location_all_0_0", "您必须选择拓展地区");
				isSubmit += 1;
			} 
			
			if ($("#location_all_1_0").val() == null) {
				verifyHasError("#location_all_1_0", "您必须选择所在地区");
				isSubmit += 1;
			} 
			
			// 供应商名称验证
			isSubmit += verifyName();
			
			// 验证地址
			isSubmit += verifyAddress();

			//经营模式
			isSubmit += verifyIndentType();

			// 所属类别
			isSubmit += verifyMaterialType();
			
			// 经营区域
			isSubmit += verifyOperatingAreas();

			//供应商等级
			isSubmit += verifyLevel();

			// 验证电话
			isSubmit += verifyPhone();
			
		}
		
		// 上级公司验证
		isSubmit += verifyParentName();
		
		// 公司邮箱验证
		isSubmit += verifyFrom("#email", /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, true, "", "公司邮箱格式错误");
		
		// 联系人信息验证
		isSubmit += verifyContactPeoplesInfo();
		
		
		// 帐号信息验证
		if ($("#globalId").val() == "" || $("#globalId").val() == "0") {
			isSubmit += verifyUserLoginInfo();
		} else {
			isSubmit += verifyUserLoginInfo2();
		}
		
		// 拓展地区
		$("#expandAreaCode").val($("#location_all_0_0").val());
		// 所在地区
		$("#locationAreaCode").val($("#location_all_1_0").val());
		// 经营地区
		$("#operatingAreas").val(JSON.stringify(locationJson));
		
		if (isSubmit != 0)
			alert("您填写的信息还未完善或者填写有误，请检查后再进行保存");
		else 
			$("#form_sample_3").submit(); // 提交
	});
	
});

/**
 * 初始化地区选择框里的值
 * 
 * @param cityCode 市Code
 * @param selectId 省选择框Id
 */
function initLocationSelect(cityCode, selectId) {
	if (cityCode == null || cityCode=="")
		return;
	$.ajax({
		async: true,
	    cache: false,
		url : pathHeader + "/location/queryLocationByCityCode",
		data:{ "cityCode" : cityCode },
		dataType:"json",
		success:function(data) {
			var optionHtml = "";
			var locations = data.locations;
			var parentAreaCode = data.parentAreaCode;
			for(var i = 0;i < locations.length; i++) {
				optionHtml += "<option value='" + locations[i].areaCode + "' >" + locations[i].name + "</option>";
			}
			$("#" + selectId).find("option[value='" + parentAreaCode + "']").attr("selected",true);
			$("#" + selectId + "_0").html(optionHtml);
			$("#" + selectId + "_0").find("option[value='" + cityCode + "']").attr("selected",true);
 	 	}
	});
}

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
 * 遍历地区JSON到DIV中显示 
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
			data:{ "name" : $("#name").val(), "id" : $("#cId").val() },
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
		var emailVerify = verifyFrom("#userEmail", /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/, true, "", "帐户邮箱格式错误");
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
		verifyFrom("#userEmail", /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, true, "", "帐户邮箱格式错误");
		verifyFrom("#userMobilePhone", /^((\(\d{2,3}\))|(\d{3}\-))?13\d{9}$/, true, "", "帐户手机格式错误，长度为11位数字");
	}
	return isSubmit;
}

function verifyUserLoginInfo2() {
	// 帐户邮箱
	var isSubmit = 0;
	if (!textValueIsEmpty("#userLoginName") && !textValueIsEmpty("#userMobilePhone") && textValueIsEmpty("#userEmail")) { 
		// 帐户邮箱
		var emailVerify = verifyFrom("#userEmail", /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/, true, "", "帐户邮箱格式错误");
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
	} else if (!textValueIsEmpty("#userLoginName") && !textValueIsEmpty("#userEmail")&& textValueIsEmpty("#userMobilePhone")) { 
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
	}
	return isSubmit;
}

// 验证地址
function verifyAddress() {
	var isSubmit = 0;
	if (textValueIsEmpty("#address")) {
		verifyHasError("#address", "您必须填写公司地址");
		isSubmit += 1;
	} else {
		verifyHasSuccess("#address", "");
	}
	return isSubmit;
}

// 验证电话
function verifyPhone() {
	var isSubmit = 0;
	if (textValueIsEmpty("#phone")) {
		verifyHasError("#phone", "您必须填写公司电话");
		isSubmit += 1;
	} else {
		verifyHasSuccess("#phone", "");
	}
	return isSubmit;
}

//经营模式
function verifyIndentType() {
	var isSubmit = 0;
	if ($("#businessType").val() == null && $("#businessType").val() == "") {
		verifyHasError("#businessType", "您必选择经营模式");
		isSubmit += 1;
	} else {
		verifyHasSuccess("#businessType", "");
	}
	return isSubmit;
}

//供应商等级
function verifyLevel() {
	var isSubmit = 0;
	if ($("#level").val() == null && $("#level").val() == "") {
		verifyHasError("#level", "您必选择供应商等级");
		isSubmit += 1;
	} else {
		verifyHasSuccess("#level", "");
	}
	return isSubmit;
}

// 所属类别
function verifyMaterialType() {
	var isSubmit = 0;
	if ($("#materialType").val() == null && $("#materialType").val() == "0") {
		verifyHasError("#materialType", "您必选择所属类别");
		isSubmit += 1;
	} else {
		verifyHasSuccess("#materialType", "");
	}
	return isSubmit;
}

// 经营区域
function verifyOperatingAreas() { 
	var isSubmit = 0;
	var locations = locationJson.locations;
	if(locations.length == 0) {
		verifyHasError("#operatingAreas", "您必须择经营地区");
		isSubmit += 1;
	} else {
		verifyHasSuccess("#operatingAreas", "");
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
