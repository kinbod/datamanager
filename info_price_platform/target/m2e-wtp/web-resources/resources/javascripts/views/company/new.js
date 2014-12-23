$(document).ready(function() {
	$.ajaxSetup({
		timeout:30000,
		error:function(){
			alert("请求出错");
			handler.setSaveBtnStatus('reset');
		}
	});
	$.fn.form2obj = function(){
		var o = {};    
		var a = this.serializeArray();    
		$.each(a, function() {    
			if (o[this.name]) {    
				if (!o[this.name].push) {    
					o[this.name] = [o[this.name]];    
				}    
				o[this.name].push(this.value || '');    
			} else {    
				o[this.name] = this.value || '';    
			}    
		});    
		return o;    
	};
	var contextPath = $("#contextPath_hidden").val(),
		companyId = $("#com_id_hidden").val(),
	    userId = $("#user_id_hidden").val(),
	    referer_url = $("#referer_url_hidden").val(),
	    cooperationStatus = $("#com_cooperationStatus_hidden").val(),
	    companyName = $("#com_name_hidden").val(),
	    com_parentName = $("#com_parentName_hidden").val();
		comVal= null,
		company = {},
		userVal= null;
	var handler = {
			area_treeObj:null,
			locationTreeSetting:{
				check:{
					enable:true
				},
				data:{
					key:{
						name: "abbreviation"
					},
					simpleData: {
						enable: true,
						idKey: "areaCode",
						pIdKey: "parentAreaCode"
					}
				}
			},
			getCOA:function(){
				var  areas = handler.area_treeObj.getCheckedNodes(true);
				if(!areas || areas.length < 1){
					return false;
				}
				var coaArr =[];
				for(var i =0,size = areas.length;i<size;i++){
					if(areas[i].parentAreaCode){
						coaArr.push({locationAreaCode:areas[i].areaCode});
					}
				}
				return coaArr;
			},
			setSaveBtnStatus:function(status){
				$("#top_save_btn").button(status);
				$("#bottom_save_btn").button(status);
			},
			saveNewCompany:function(){
				var handler = this, 
				param = {},
				coas = [],
				comValid = false,
				userValid = false;
				handler.setSaveBtnStatus('loading');
				if(businessTypeChange()){
					var logo_hidden_url = $("#logo_hidden").val();
					if(logo_hidden_url==''){
						alert("生产型和驻外地办事处logo必填");
						handler.setSaveBtnStatus('reset');
						return ;
					}
				}
				
				//验证表单
				comValid = comVal.form();
				//填装供应商 信息
				if(comValid){
					$("#com_introduction_ta").val(CKEDITOR.instances.com_desc_ta.getData());
					param.companyJSON = JSON.stringify($("#company_form").form2obj());
					coas = handler.getCOA();
					if(coas){
						param.coasJSON = JSON.stringify(coas);
					}
				}else{
					alert("供应商信息填写不完整！");
					handler.setSaveBtnStatus('reset');
					return;
				}
				
				
				//如果 不存在用户id 并且设置了用户的信息 就进行表单验证
				if(!userId){
					if($("#user_loginName_input").val() || $("#user_mobilePhone_input").val() ||  $("#user_verification_code_input").val()){
						userValid = userVal.form();
						if(userValid){
							param.userJSON = JSON.stringify($("#user_form").form2obj());
						}else{
							alert("用户信息填写不完整！");
							handler.setSaveBtnStatus('reset');
							return;
						}
					}
				}	
				$.post("save_or_update_company",param,function(data){
					if(data){
						if(data == -1){
							alert("用户信息注册失败，请重新设置信息，再次保存");
							$("#fresh_v_code_btn").trigger('click');
							$("#user_verification_code_input").val('');
							$("#user_loginName_input").val('');
						}else if(!companyId){
							var b = window.confirm("操作成功，是否设置供应商联系人信息？");
							if(b){
								window.location.href = "/company/contacter_list?companyId="+data;
							}else{
								window.close();
							}
						}else{	
							alert("操作成功！当前页面将关闭！");
							//window.opener.location.reload();
							window.close();
						}
					}
					handler.setSaveBtnStatus('reset');
				});
			},
			initValidation:function(){
				jQuery.validator.addMethod("pattern", function(value, element, params) {
					if(!value){
						return true;
					}
					return params.test(value);
					}, "");
				jQuery.validator.addMethod("noEqualTo",function(value,element,params){
					var target = $(params).val();
					if(target && target == value){
						return false;
					}
					return true;
				});
				comVal = $("#company_form").validate({
					onsubmit:false,
					onkeyup:false,
					focusInvalid:false,
					errorPlacement:function(error,element){
						error.appendTo(element.next());
					},
					highlight:function(element, errorClass){
						$(element).parents("div.form-group").addClass("has-error");
					},
					unhighlight :function(element, errorClass){
						$(element).parents("div.form-group").removeClass("has-error");
					},
					rules:{
							expandAreaCode:'required',
							name:{required:true,remote:{
								url:'verify_companyName',
								type:'post',
								data:{
									companyName:companyName
								}
							},maxlength:50},
							website:'url',
							locationAreaCode:'required',
							phone:{pattern:/((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/},
							email:{email:true,maxlength:32},
							fax:{pattern:/^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/},
							parentName:{noEqualTo:"#com_name_input",remote:{
								url:'verify_parentName',
								type:'post',
								data:{oldParentName:com_parentName}
							}}
						},
						messages:{
							expandAreaCode:'请选择拓展地区',
							name:{required: '请设置公司名',remote:'公司名已经存在',maxlength:'公司名最多输入50位'},
							website:'请输入合法网址',
							locationAreaCode:'请输入公司所在地区',
							phone:'公司电话格式不正确',
							email:{email:'邮箱格式不正确',maxlength:'邮箱最多输入32位'},
							fax:'传真格式不正确',
							parentName:{noEqualTo:'上级公司名和公司名不能相同',remote:'上级公司不存在'}
						}});
				if(!userId){
					userVal = $("#user_form").validate({
						onsubmit:false,
						onkeyup:false,
						focusInvalid:false,
						errorPlacement:function(error,element){
							error.appendTo(element.next());
						},
						highlight:function(element, errorClass){
							$(element).parents("div.form-group").removeClass("has-success").addClass("has-error");
						},
						unhighlight :function(element, errorClass){
							$(element).parents("div.form-group").removeClass("has-error").addClass("has-success");
						},
						rules:{
							loginname:{pattern:/^[a-zA-Z][a-zA-Z0-9_]{5,63}$/,required:true,remote:{url:'../user/verify_login_name',type:'post'},maxlength:30},
							mobilePhone:{required:true,pattern:/^1[3|4|5|8][0-9]{9}$/},
							verificationCode:{required:true,pattern:/^[a-zA-Z0-9]{4}$/,remote:{url:'../user/verify_verification_code',type:'post'}}
						},
						messages:{
							loginname:{pattern:'用户名由字母开头的6~64个数字、字母或下划线组成',required:'请输入登录名',remote:'用户名已经存在',maxlength:'登录名最多输入30位！'},
							mobilePhone:{required:'请输入手机号',pattern:'手机号格式错误'},
							verificationCode:{required:'请输入验证码',pattern:'只能输入数字或字母',remote:'验证码错误'}
						}
					});
				}
				if(cooperationStatus && cooperationStatus =='cooperation'){
					//合作状态
					$("#com_phone_input").rules('add',{required:true,messages:{required:'请设置公司电话'}});
					$("#com_address_input").rules('add',{required:true,messages:{required:'请设置公司地址'}});
					$("#com_level_select").rules('add',{required:true,messages:{required:'请设置公司等级'}});
					$("#com_businessType_select").rules('add',{required:true,messages:{required:'请设置公司经营模式'}});
					$("#com_operateCategory_select").rules('add',{required:true,messages:{required:'请设置公司所属类别'}});
					$("#com_oper_area_hidden").rules('add',{required:function(){
						if(handler.area_treeObj){
							var  areas = handler.area_treeObj.getCheckedNodes(true);
							if(areas && areas.length > 0){
								return false;
							}
						}
						return true;
					},messages:{required:'请选择公司经营区域'}});
					$("#com_introduction_ta").rules('add',{required:function(){
						var taData = CKEDITOR.instances.com_desc_ta.getData();
						if(taData){
							return false;
						}
						return true;
					},messages:{required:'请设置公司简介'}})
				}else if(cooperationStatus=='pending'){//审核中
					alert("审核中的供应商不允许修改");
					return false;
				}
			},
			initLocation:function(){
				var handler = this;
				$.getJSON("../location/all",function(data){
					var coasCode = $("#com_coasCode_hidden").val(),checkedCode =[],areaMap = {};
					if(coasCode){
						checkedCode = coasCode.split(";");
						for(var i= 0,size = data.length;i<size;i++){
							areaMap[data[i].areaCode] = data[i];
						}
						for(i=0,size = checkedCode.length;i<size;i++){
							areaMap[checkedCode[i]].checked = true;
							areaMap[areaMap[checkedCode[i]].parentAreaCode].open = true;
							areaMap[areaMap[checkedCode[i]].parentAreaCode].checked = true;
						}
					}
					handler.area_treeObj = $.fn.zTree.init($("#locations_area_tree"), handler.locationTreeSetting, data);
					//handler.area_treeObj.expandAll(true);
				})
			},
			initCompanyInfo:function(){
				if(!companyId){
					return;
				}
				var e2sVal = $("#expand_area_code_hidden").val(),
				ca2sVal = $("#location_area_code_hidden").val();
				$("#expandArea_2_select").val(e2sVal);
				$("#expandArea_1_select").val(e2sVal.substring(0,e2sVal.length - 4)+"0000");
				$("#company_area_2_select").val(ca2sVal);
				$("#company_area_1_select").val(ca2sVal.substring(0,ca2sVal.length - 4)+"0000");
				$("#com_companyAttribute_select").val($("#com_companyAttribute_hidden").val());
				$("#com_level_select").val($("#com_level_hidden").val());
				$("#companyAttribute_select").val($("#com_companyAttribute_hidden").val());
				$("#com_businessType_select").val($("#com_businessType_hidden").val());
				$("#com_operateCategory_select").val($("#com_operateCategory_hidden").val());
				if(userId){
					$("#user_loginName_input").attr('disabled','disabled');
					$("#user_mobilePhone_input").attr('disabled','disabled');
					$("#user_email_input").attr('disabled','disabled');
				}
				/*company.name = $("#").val();
				company.expandAreaCode = $("#").val();
				company.locationAreaCode = $("#").val();
				company.address = $("#").val();
				company.companyAttribute = $("#").val();
				company.level = $("#").val();
				company.businessType = $("#").val();
				company.operateCategory = $("#").val();
				company.logo = $("#").val();
				company.phone = $("#").val();
				company.website = $("#").val();
				company.fax = $("#").val(); 
				company.parentName = $("#").val(); 
				company.introduction = $("#").val(); 
				company.priceNote = $("#").val(); */
			}
		};
		//上传 logo
		$("#logo_upload").uploadify({
			formData : {},
			auto : true,
			swf : contextPath+"/javascripts/uploadify/uploadify.swf",
			uploader : "../upload;jsessionid=" + $("#session_id_hidden").val(),
			buttonText : "选择文件",
			fileObjName : 'Filedata',
			fileSizeLimit : '5MB',
			fileTypeExts : '*.gif; *.jpg; *.png',
			onUploadSuccess : function(file, data, response) {
				$("#logo_img").attr("src", "../getImages?imagePath=" + data);
				$("#logo_hidden").val(data);
			},
			itemTemplate : '<div id="${fileID}" class="uploadify-queue-item">\<div class="cancel">\<a href="javascript:$(\'#${instanceID}\').uploadify(\'cancel\', \'${fileID}\')">X</a>\</div>\<span class="fileName">${fileName} (${fileSize})</span><span class="data"></span>\</div>' 
		});	
		//事件注册
		$("#top_save_btn").button();
		$("#top_save_btn").click(function(){
			handler.saveNewCompany();
		});
		$("#bottom_save_btn").button();
		$("#bottom_save_btn").click(function(){
			handler.saveNewCompany();
		});
		// ajax 加载数据
		$("#expandArea_1_select").change(function() {
			locations2($("#expandArea_2_select"),$(this).val(),"<option value=''>请选择</option>")
		});
		$("#company_area_1_select").change(function() {
			locations2($("#company_area_2_select"),$(this).val(),"<option value=''>请选择</option>")
		});
		function businessTypeChange(val){
			var businessTypeVal = $("#com_businessType_select").val();
			if(businessTypeVal&&(businessTypeVal=='001'||businessTypeVal=='003')){//生产型企业,驻外地办事处
				$("#logo_mark").css("display","");
				return true;
			}else{
				$("#logo_mark").css("display","none");
			}
			return false;
		}
		$("#com_businessType_select").change(function(){
			businessTypeChange();
		});
		//刷新验证码
		$("#fresh_v_code_btn").click(function(){
			var $parent = $("#v_code_img").parent();
			var newImg = document.createElement('img');
			newImg.src = $("#v_code_img").attr('src')+'?'+new Date().getTime()
			newImg.alt = '验证码加载中';
			newImg.id = 'v_code_img';
			$("#v_code_img").detach();
			$parent.append(newImg);
		});
		CKEDITOR.replace( 'com_desc_ta',{
			lanuage:'zh-cn',
			toolbar : 'Basic'
		} ); 
		handler.initLocation();
		handler.initCompanyInfo();
		handler.initValidation();
		businessTypeChange();
		fresh_v_code_img = function(){
			$("#fresh_v_code_btn").trigger("click");
			$('#user_verification_code_input').val('');
		};
		setInterval('fresh_v_code_img()',120000);
	});