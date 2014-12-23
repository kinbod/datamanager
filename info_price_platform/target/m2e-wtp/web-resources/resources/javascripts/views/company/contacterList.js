$(document).ready(function() {
	var contextPath = $("#contextPath_hidden").val(),
	    mobile_phone_pattern = /^1[3|4|5|8][0-9]{9}$/,
	    phone_pattern =  /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/,
	    main_contacter = null;
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
	var handler = {
			area_treeObj:null,
			 companyId : $("#companyId_hidden").val(),
			contacters:{},
			areas:{},
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
			validate:{
				sendForm:false,
				onBlur:true,
				eachValidField:function(){
					$(this).parents("div.form-group").addClass("has-success").removeClass("has-error");
				},
				eachInvalidField:function(){
					$(this).parents("div.form-group").addClass("has-error").removeClass("has-success");
				},
				valid:function(){
					$(this).removeClass("invalid").addClass("valid");
				},
				invalid:function(){
					$(this).removeClass("valid").addClass("invalid");
				}
			},
			initLocation:function(){
				var handler = this;
				$.getJSON("../location/company_operating_areas?companyId="+handler.companyId,function(data){
					var coasCode = $("#coasCode_input").val(),checkedCode =[],areaMap = {};
					handler.area_treeObj = $.fn.zTree.init($("#locations_area_tree"), handler.locationTreeSetting, data);
					handler.area_treeObj.expandAll(true);
					var nodes = handler.area_treeObj.transformToArray( handler.area_treeObj.getNodes());
					for(var i=0,l=nodes.length;i<l;i++){
						handler.areas[nodes[i].areaCode] = nodes[i];
					}
					handler.initContacterList();
				})
			},
			initContacterList:function(){
				var handler = this;
				$.getJSON("contacter_list_json",{companyId:handler.companyId},function(data){
					if(data){
						var contacter = null,areaCodes = null,i=0,n=0,size =0,l=0;
						for(i=0,size = data.length;i<size;i++){
							contacter = data[i];
							areaCodes = contacter.locationCodes;
							if(areaCodes){
								areaCodes = areaCodes.split(',');
								contacter.coas = [];
								for(n=0,l=areaCodes.length;n<l;n++){
									contacter.coas.push(handler.areas[areaCodes[n]]);
								}
							}
							if(contacter.isMain){
								main_contacter = contacter;
							}
							handler.addContacterDom(contacter);
						}
					}
				});
			},
			setContacterStr:function(contacter){
				var coaStr = [],coas;
				contacter.sexStr = contacter.sex == 1?'女':'男';
				contacter.isMainStr = contacter.isMain == 1 || contacter.isMain == true?'是':'否';
				contacter.isShowStr = contacter.isShow == 1 || contacter.isShow == true?'是':'否';
				if(contacter.coas){
					coas = contacter.coas;
					for(var i=0,size=coas.length;i<size;i++){
						coaStr.push(coas[i].abbreviation);
					}
					contacter.coaStr = coaStr.join(";");
				}
			},
			deleteContacter:function(button){
				var handler = this, $parent =  $(button).parents("li.list-group-item"),
				domid = $parent.attr('id'),
				id=domid.substring(0,domid.indexOf("_"));
				if(confirm("确认要删除该联系人？")){
					$.post("delete_contacter",{id:id},function(data){
						if(data){
							if(handler.contacters[id].isMain){
								main_contacter = null;
							}
							delete handler.contacters[id];
							$parent.detach();
						}
					});
				}
			},
			modifyContacter:function(button){
				var handler = this, $parent =  $(button).parents("li.list-group-item"),
				domid = $parent.attr('id'),
				id=domid.substring(0,domid.indexOf("_")),
				contacter = handler.contacters[id];
				$("#edit_contacter_modal").modal('show');
				$("#edit_contacter_modal h4.modal-title").html('修改联系人');
				$("#contacter_id_input").val(contacter.id);
				$("#name_input").val(contacter.name);
				$("#sex_select").val(contacter.sex);
				$("#position_input").val(contacter.position);
				if(contacter.address){
					$("#address_input").val(contacter.address);
				}
				if(contacter.mobilePhone){
					$("#mobile_phone_tags").importTags(contacter.mobilePhone);
				}
				if(contacter.phone){
					$("#phone_tags").importTags(contacter.phone);
				}
				if(contacter.qq){
					$("#qq_input").val(contacter.qq);
				}
				if(contacter.email){
					$("#email_input").val(contacter.email);
				}
				if(contacter.note){
					$("#note_ta").val(contacter.note);
				}
				if(contacter.coas){
					for (var i=0, l=contacter.coas.length; i < l; i++) {
					 handler.area_treeObj.checkNode(contacter.coas[i], true, true);
					}
				}
				if(contacter.isMain == true || contacter.isMain == '1'){
					$("#isMain_cb").attr("checked",'checked').parent().addClass("checked");
				}
				if(contacter.isShow == true || contacter.isShow == '1'){
					$("#isShow_cb").attr("checked",'checked').parent().addClass("checked");
				}
			},
			addContacterDom:function(contacter){
				var handler = this;
				handler.setContacterStr(contacter);
				handler.contacters[contacter.id] = null;
				handler.contacters[contacter.id] = contacter,
				$cantacter = $("#"+contacter.id+'_info');
				if($cantacter[0]){
					$cantacter.html(nano($("#contacter_temple").children().html(),contacter));
				}else{
					//添加 一条记录  到联系人列表中
					$cantacter = $(nano($("#contacter_temple").html(),contacter)).appendTo($("#contacter_ul")).attr('id',contacter.id+'_info');
				}
				$("button[name='modify_contacter_btn']",$cantacter).click(function(){
					handler.modifyContacter(this);
				});
				$("button[name='delete_contacter_btn']",$cantacter).click(function(){
					handler.deleteContacter(this);
				});
			}
		};
		//初始化 tags
		$("#phone_tags").tagsInput({height:'auto',width:'auto',removeWithBackspace:false,defaultText:'添加电话',onAddTag:function(tag){
			if(!phone_pattern.test(tag)){
				$("#phone_tags").removeTag(tag);
			}
		}});
		$("#mobile_phone_tags").tagsInput({height:'auto',width:'auto',removeWithBackspace:false,defaultText:'添加手机',onAddTag:function(tag){
			if(!mobile_phone_pattern.test(tag)){
				$("#mobile_phone_tags").removeTag(tag);
			}
		}});
		//编辑框隐藏
		$('#edit_contacter_modal').on('hidden.bs.modal', function (e) {
			$("#contact_form").removeClass("invalid").removeClass("valid")[0].reset();
			handler.area_treeObj.checkAllNodes(false);
			$("#phone_tags").importTags('');
			$("#mobile_phone_tags").importTags('');
			$("#contacter_id_input").val("");
			$("#isShow_cb").removeAttr("checked").parent().removeClass("checked");
			$("#isMain_cb").removeAttr("checked").parent().removeClass("checked");
			$("#save_contact_btn").button("reset");
			$("div.form-group",$("#contact_form")).removeClass("has-success").removeClass("has-error");
		});
		$("#save_contact_btn").button();
		$("#save_contact_btn").click(function(){
			var valid = $("#contact_form").submit().attr('class');
			if(valid && valid == 'valid'){
				//得到 表单所有数据
				var contacter = $("#contact_form").form2obj(),
				coas = handler.area_treeObj.getCheckedNodes(true) ,
				areaCodes = [];
				if(coas){
					for(var i=0,size = coas.length;i<size;i++){
						if(coas[i].parentAreaCode){
							areaCodes.push(coas[i].areaCode);
						}else{
							coas.splice(i,0);
						}
					}
					contacter.areaCodes = areaCodes;
				}
				if(!contacter.mobilePhone){
					alert("请输入至少一个手机号");
					return ;
				}
				contacter.resourceId = handler.companyId;
				if(!contacter.isMain){
					contacter.isMain = 0;
				}
				if(!contacter.isShow){
					contacter.isShow = 0;
				}
				if(contacter.isMain && main_contacter && contacter.id != main_contacter.id){
					var modify_main_contacter = confirm("已经存在常用联系人，确认要替换当前常用联系人？");
					if(!modify_main_contacter){
						return;
					}
				}
				$("#save_contact_btn").button("loading");
				$.post("add_or_update_contacter",contacter,function(data){
					if(data){
						contacter.id = data;
						contacter.coas = coas;
						handler.addContacterDom(contacter);
						if(modify_main_contacter){
							main_contacter.isMain = 0;
							main_contacter.isMainStr = '否';
							handler.addContacterDom(main_contacter);
						}
						if(main_contacter && contacter.id == main_contacter.id){
							main_contacter = null;
						}
						if(contacter.isMain){
							main_contacter = contacter;
						}
						alert("操作成功");
						$('#edit_contacter_modal').modal('hide');
					}
					$("#save_contact_btn").button("reset");
				});
			}
		});
		$("#show_new_contacter_btn").click(function(){
			$('#edit_contacter_modal').modal('show');
			$("#edit_contacter_modal h4.modal-title").html('新建联系人');
			if(!$("#contacter_ul>li[id]")[0]){
				$("#isMain_cb").attr("checked",'checked').parent().addClass("checked");
				$("#isShow_cb").attr("checked",'checked').parent().addClass("checked");
			}
		});
		//添加表单验证
		$("#contact_form").submit(function(){return false;}).validate(handler.validate)
		handler.initLocation();
	});