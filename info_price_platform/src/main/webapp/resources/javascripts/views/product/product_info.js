(function($) {
	$(function() {
		var bmt_edit = true;
		var referer_path = $("#referer_path_hidden").val();
		$.ajaxSetup({async:false,error:function(){
			alert("请求出错！");
		}});
		var pidwWidth = $("#product_img_div_wrapper").width();
		$("#product_img_div_wrapper").css("width",pidwWidth);
		var productImgHandler = {
				cloneNewImg : function(img_src,filePath) {
					var $newImg = $("#product_img_temp").clone(true).removeAttr(
							"id").addClass("product_img");
					$newImg.appendTo("#product_img_div").show();
					$newImg.css("display","inline-block");
					var $img = $("div>img",$newImg).load(function(){
						var pidW = $("#product_img_div").width();
						$("#product_img_div").width(pidW+$newImg.innerWidth()+1);
					}).attr("src",img_src);
					$("input",$newImg).val(filePath);
				},
				deleteImg:function(target){
					var $pi = $(target).parents("div.product_img"),
					piW = $pi.width(),
					pidW = $("#product_img_div").width();
					$pi.detach();
					$("#product_img_div").width(pidW - piW);
				}
			};
		$("#product_img_temp button").click(function(){
			productImgHandler.deleteImg(this);
		});
		var path = $("#path_hidden").val();
		$("#photo_upload").uploadify({
			auto : false,
			queueID : 'upload_queue',
			swf : path+"/javascripts/uploadify/uploadify.swf",
			uploader : "../upload;jsessionid=" + $("#session_id_hidden").val(),
			querySizeLimit:5,
			removeCompleted:false,
			removeTimeout:0,
			//buttonImage:'${contextPath}/javascripts/uploadify/img/browse-btn.png',
			buttonText : "选择文件",
			fileObjName : 'Filedata',
			fileSizeLimit : '5MB',
			fileTypeExts : '*.gif; *.jpg; *.png',
			onUploadSuccess : function(file, data, response) {
				productImgHandler.cloneNewImg(path + "/getImages?imagePath="+data,data);
			},
			onQueueComplete:function(queueData){
				if(!queueData.uploadsErrored){
					$("#upload_photo_modal").modal('hide');
				}
			},
			itemTemplate : '<div id="${fileID}" class="uploadify-queue-item">\<div class="cancel">\<a href="javascript:$(\'#${instanceID}\').uploadify(\'cancel\', \'${fileID}\')">X</a>\</div>\<span class="fileName">${fileName} (${fileSize})</span><span class="data"></span>\</div>' 
		});
		$('#upload_photo_modal').on('hide.bs.modal', function (e) {
			$("#photo_upload").uploadify('cancel','*');
		});
		$("#upload_photo_btn").click(function(){
			$("#photo_upload").uploadify('upload','*');
		});

		 	
		var priceAreaHandler = {
			addNewPrice : function() {
				var areaIds = $("#new_price_areaIds_hidden").val(), priceArea = $(
						"#new_price_area_input").val(), areaPrice = $(
						"#new_price_input").val();
				newPriceTr = null;
				
				if (!areaIds || !priceArea || !areaPrice || isNaN(areaPrice) || parseFloat(areaPrice) <= 0) {
					alert("请填写完整符合规格的信息！");
					return;
				}
				this.cloneNewPrice(areaPrice, priceArea, areaIds);
				$("#new_price_areaIds_hidden").val("");
				$("#new_price_area_input").val("");
				$("#new_price_input").val("");
			},
			cloneNewPrice : function(areaPrice, priceArea, areaIds) {
				var newPriceTr = $("#new_price_temple_tr").clone(true)
						.addClass("new_price_tr").removeAttr("id");
				$("input[name='new_area_price']", newPriceTr).val(areaPrice);
				$("input[name='new_price_area']", newPriceTr).val(priceArea);
				$("input[name='new_price_areaIds']", newPriceTr).val(areaIds);
				$("#add_price_tr").before(newPriceTr);
				newPriceTr.show();
				if (areaIds.indexOf(";")) {
					areaIds = areaIds.split(";");
					for (var i = 0, size = areaIds.length; i < size; i++) {
						$("#" + areaIds[i]).attr("checked",true).attr("disabled", true).parent()
								.addClass("checked").parent().addClass("disabled");
					}
				} else {
					$("#" + areaIds).attr("checked",true).attr("disabled", true).parent().addClass("checked").parent().addClass("disabled");
				}
			},
			deleteNewPrice : function(target) {
				var $parent = $(target).parents("tr.new_price_tr");
				var areaIds = $("input[name='new_price_areaIds']", $parent)
						.val();
				if (areaIds.indexOf(";")) {
					areaIds = areaIds.split(";");
					for (var i = 0, size = areaIds.length; i < size; i++) {
						$("#" + areaIds[i]).removeAttr("checked").removeAttr("disabled").parent()
								.removeClass("checked").parent().removeClass("disabled");
					}
				} else {
					$("#" + areaIds).removeAttr("checked").removeAttr("disabled").removeClass(
							"checked").parent().removeClass("disabled");
				}
				$parent.detach();
			},
			deletePrice : function(target) {
				var $parent = $(this).parents("tr.price_tr");
				$parent.hide();

			},
			showPriceAreaDialog : function() {
				$("#area_price_dialog").show();
			},
			surePriceArea : function() {
				var areaIds = [], areas = [], $priceAreaDialog = $("#area_price_dialog");
				$("input:enabled:checked", $priceAreaDialog).each(function() {
					areaIds.push(this.id);
					areas.push(this.value);
					$(this).removeAttr("checked");
				});
				if (areaIds.length > 0) {
					$("#new_price_area_input").val(areas.join(";"));
					$("#new_price_areaIds_hidden").val(areaIds.join(";"));
				} else {
					$("#new_price_area_input").val("");
					$("#new_price_areaIds_hidden").val("");
				}
				$priceAreaDialog.hide();
			},
			closePriceAreaDialog : function() {
				$("#area_price_dialog").hide();
			}
		};
		var productPropHandler = {
			addNewProp : function() {
				var newPropName = $("#new_prop_name_input").val(), newPropVal = $(
						"#new_prop_val_input").val(), $newPropTr = null;
				if (!newPropName || !newPropVal) {
					alert("请填写完整信息！");
					return;
				}
				this.cloneNewProp(newPropName, newPropVal);
				$("#new_prop_name_input").val("");
				$("#new_prop_val_input").val("");
			},
			cloneNewProp : function(newPropName, newPropVal) {
				var $newPropTr = $("#product_new_prop_temple_tr").clone(true)
						.removeAttr("id").addClass("product_new_prop_tr");
				$("input[name='new_prop_name']", $newPropTr).val(newPropName);
				$("input[name='new_prop_val']", $newPropTr).val(newPropVal);
				$("#add_new_prop_tr").after($newPropTr);
				$newPropTr.show();
			},
			deleteNewProp : function(target) {
				$(target).parents("tr.product_new_prop_tr").detach();
			},
			addPropVal : function() {
				var propId = $("#prop_select").val(), $propOption = $(
						"option[value='" + propId + "']", $("#prop_select")), propName = $propOption
						.html(), valId = $("#prop_val_select").val(), valName = $(
						"option[value='" + valId + "']", $("#prop_val_select"))
						.html(), dval = $("#new_val_input").val(), $propTr = null;
				if (!propId) {
					alert("请选择属性项！");
					return;
				}
				if (valId == -1 && !dval) {
					alert("请填写自定义值");
					return;
				}
				this.clonePropVal(propName, propId, valId, valName, dval);
				if ($("#prop_select").val()) {
					$("#prop_select").trigger('change');
				}
			},
			clonePropVal : function(propName, propId, propValId, propValName,
					customVal) {
				var $propTr = $("#product_prop_temple_tr").clone(true)
						.removeAttr("id").addClass("product_prop_tr");
				$("input[name='prop_name']", $propTr).val(propName);
				$("input[name='prop_id']", $propTr).val(propId);
				if (!propValId) {
					$("input[name='prop_val']", $propTr).val(customVal);
				} else {
					$("input[name='prop_val']", $propTr).val(propValName);
					$("input[name='prop_val_id']", $propTr).val(propValId);
				}
				$("#add_prop_tr").after($propTr);
				$propTr.show();
				$("option[value='" + propId + "']", $("#prop_select")).detach();
			},
			deletePropVal : function(target) {
				var $parent = $(target).parents("tr.product_prop_tr"), propName = $(
						"input[name='prop_name']", $parent).val(), propId = $(
						"input[name='prop_id']", $parent).val(), option = [];
				option.push("<option value='");
				option.push(propId);
				option.push("'>");
				option.push(propName);
				option.push("</option>");
				$("#prop_select").append(option.join(""));
				$(target).parents("tr.product_prop_tr").detach();
			},
			freshProp : function(bmtId) {
				$.getJSON("bmtPropJson", {
					bmtId : bmtId
				}, function(data) {
					if (!data) {
						return;
					}
					var selectInnerHtml = [];
					for (var i = 0, size = data.length; i < size; i++) {
						selectInnerHtml.push("<option value='");
						selectInnerHtml.push(data[i].id);
						selectInnerHtml.push("'>");
						selectInnerHtml.push(data[i].description);
						selectInnerHtml.push("</option>");
					}
					$("#prop_select").html(selectInnerHtml.join(""));
					$("#prop_select").trigger("change");
					$("#prop_table tr.product_prop_tr").detach();
				})
			},
			freshPropVal : function(propId) {
				$.getJSON("bmtPropValJson", {
					propId : propId
				}, function(data) {
					if (!data) {
						return;
					}
					var selectInnerHtml = [];
					for (var i = 0, size = data.length; i < size; i++) {
						selectInnerHtml.push("<option value='");
						selectInnerHtml.push(data[i].id);
						selectInnerHtml.push("'>");
						selectInnerHtml.push(data[i].value);
						selectInnerHtml.push("</option>");
					}
					selectInnerHtml.push("<option value='-1'>自定义</option>");
					$("#prop_val_select").html(selectInnerHtml.join(""));
				})
			}
		};
		var initProductInfo = function() {
			var productId = $("#productIdHidden").val();
			if (!productId) {
				return;
			}
			var firstBmtId = $("#productFirstBmtIdHidden").val().trim(), secondBmtId = $(
					"#productSecondbmtIdHidden").val().trim(), brandId = $(
					"#productBrandIdHidden").val().trim();
			$("#bmt_first_select").val(firstBmtId);
			$("#bmt_second_select").val(secondBmtId);
			$("#brandSelect").val(brandId);
			$.getJSON("productInfoJson", {
				productId : productId
			}, function(data) {
				var size = 0, i = 0, temp = null;
				if (data.props) {
					size = data.props.length;
					for (; i < size; i++) {
						temp = data.props[i];
						productPropHandler.clonePropVal(
								temp.baseMaterialTypeAttrName,
								temp.baseMaterialTypeAttrId,
								temp.baseMaterialTypeAttrValueId,
								temp.baseMaterialTypeAttrValue,
								temp.customAttrValue)
					}
					$("#prop_select").trigger("change");
				}
				if (data.customProps) {
					size = data.customProps.length;
					for (i = 0; i < size; i++) {
						temp = data.customProps[i];
						productPropHandler.cloneNewProp(temp.customAttr,
								temp.customAttrValue);
					}
				}
				if (data.prices) {
					size = data.prices.length;
					for (i = 0; i < size; i++) {
						priceAreaHandler.cloneNewPrice(data.prices[i],
								data.areaNames[i], data.areaIds[i])
					}
				}
				if(data.pictrues){
					size = data.pictrues.length;
					var  filePath = '';
					for(i=0;i<size;i++){
						filePath = data.pictrues[i].picPhysicalPath;
						productImgHandler.cloneNewImg(path + "/getImages?imagePath="+filePath,filePath);
					}
				}
			});
			
			if(referer_path.indexOf("company_e_product_edit") > 0){
				$("#bmt_first_select").attr('disabled','disabled');
				$("#bmt_second_select").attr('disabled','disabled');
				bmt_edit = false;
			}
		};
		var saveHandler = {
			getParam : function() {
				var param = {};
				param.id = $("#productIdHidden").val();
				param.companyId = $("#companyIdHidden").val();
				param.name = $("#productNameInput").val().trim();
				if (!param.name) {
					alert("请填写材料名称！");
					return null;
				}
				param.sepecification = $("#productSepecificationInput").val().trim();
				param.baseMaterialTypeId = $("#bmt_second_select").val();
				//类别 可编辑 而且不能为空
				if (bmt_edit && !param.baseMaterialTypeId) {
					alert("请选择材料类别！");
					return null;
				}
				param.brandId = $("#brandSelect").val();
				param.brandName = $("option[value='"+param.brandId+"']",$("#brandSelect")).html();
				// 新的品牌名
				param.newBrandName = $("#newBrandInput").val().trim();
				if (param.brandId < 0 && !param.newBrandName) {
					alert("请设置材料品牌！");
					return null;
				}
				param.unit = $("#product_unit_input").val().trim();
				if (!param.unit) {
					alert("请设置材料计价单位！");
					return null;
				}
				param.notes = $("#product_notes_area").val().trim();
				// 属性值
				param.propIds = [];
				param.propNames = [];
				param.propValIds = [];
				param.propVals = [];
				$("#prop_table>tr.product_prop_tr").each(
						function() {
							var $this = $(this);
							param.propIds.push($("input[name='prop_id']", $this).val().trim());
							param.propNames.push($("input[name='prop_name']", $this).val().trim());
							param.propValIds.push($("input[name='prop_val_id']", $this).val().trim());
							param.propVals.push($("input[name='prop_val']",$this).val().trim());
						});
				// 自定义属性值
				param.newPropNames = [];
				param.newPropVals = [];
				$("#new_prop_table>tr.product_new_prop_tr")
						.each(
								function() {
									var $this = $(this);
									param.newPropNames.push($(
											"input[name='new_prop_name']",
											$this).val().trim());
									param.newPropVals
											.push($(
													"input[name='new_prop_val']",
													$this).val().trim());
								});
				// 报价地区值
				param.priceAreas = [];
				param.prices = [];
				$("#area_price_table>tr.new_price_tr").each(
						function() {
							var $this = $(this);
							param.priceAreas.push($(
									"input[name='new_price_areaIds']", $this)
									.val().trim());
							param.prices.push($("input[name='new_area_price']",
									$this).val().trim());
						});
				if (param.prices.length <= 0) {
					alert("请设置报价地区！");
					return null;
				}
				//图片
				param.pictures = [];
				$("#product_img_div>div.product_img").each(
						function() {
							var $this = $(this);
							param.pictures.push($("input",$this).val());
						});
				return param;
			},
			save : function() {
				var param = this.getParam();
				if (!param) {
					return;
				}
				$("#save_product_btn").button("loading");
				$.post("productIsExistJson",param,function(data) {
					$("#save_product_btn").button("reset");
									if (data == 'yes') {
										alert("材料已经存在！");
										return;
									}
									if (data == 'no') {
										$("#save_product_btn").button("loading");
										$.post("addNewProduct",param,function(data) {
											$("#save_product_btn").button("reset");
															if (data && data == 'ok') {
																alert("保存成功！");
																location.href = referer_path;
															}
														},"json");
									}
								},"json");
			}
		};
		// product_prop
		$("#add_new_prop_btn").click(function() {
			productPropHandler.addNewProp();
		});
		$("#product_new_prop_temple_tr button").click(function() {
			productPropHandler.deleteNewProp(this);
		});
		$("#add_prop_val_btn").click(function() {
			productPropHandler.addPropVal();
		});
		$("#product_prop_temple_tr button").click(function() {
			productPropHandler.deletePropVal(this);
		});
		// area_price
		$("#new_price_temple_tr button").click(function() {
			priceAreaHandler.deleteNewPrice(this);
		});
		$("#new_price_temple_tr").hide();
		$("#add_price_btn").click(function() {
			priceAreaHandler.addNewPrice();
		});
		$("#select_area_btn").click(function() {
			priceAreaHandler.showPriceAreaDialog();
		});
		$("#apd_sure_btn").click(function() {
			priceAreaHandler.surePriceArea();
		});
		$("#apd_close_btn").click(function() {
			priceAreaHandler.closePriceAreaDialog();
		});
		$("tr.price_tr button.delet_price_btn").click(function() {
			priceAreaHandler.deletePrice(this);
		});
		$("#select_area_btn").parents("div.input-group").append(
				$("#area_price_dialog"));
		// 保存
		$("#save_product_btn").click(function() {
			saveHandler.save();
		});
		$("#save_product_btn").button();
		// 级联 分类
		$("#bmt_first_select").change(function() {
			bmtvalues(false, 'bmt_second_select', this);
		});
		$("#bmt_second_select").change(function() {
			var bmtId = $(this).val();
			if (bmtId < 0) {
				return;
			}
			productPropHandler.freshProp(bmtId);
		});
		if(!$("#productIdHidden").val()){
			$("#bmt_first_select").trigger("change");
		}
		// 属性级联
		$("#prop_select").change(function() {
			var propId = $(this).val();
			if(!propId){
				return;
			}
			productPropHandler.freshPropVal(propId);
			$("#prop_val_select").trigger("change");
		});
		// 品牌
		$("#brandSelect").change(function() {
			if ($(this).val() == -1) {
				$("#newBrandInput").show();
			} else {
				$("#newBrandInput").val("").hide();
			}
		});
		//材料 单位
		$("#product_unit_input").change(function() {
			$("#product_unit_span").html($(this).val());
		});
		$("#newBrandInput").hide();
		$("#prop_val_select").change(function() {
			if ($(this).val() == -1) {
				$("#new_val_input").show();
			} else {
				$("#new_val_input").val("").hide();
			}
		});
		//编辑页面初始化
		initProductInfo();
		$("#brandSelect").trigger("change");
		$("#product_notes_area").val($.trim($("#product_notes_area").val()));
	});
})(jQuery);