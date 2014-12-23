/*
jQuery.fn.selectCity = function(targetId) {
	var _seft = this;
	var targetId = $(targetId);
 
	this.click(function(){
		var A_top = $(this).offset().top + $(this).outerHeight(true);  //  1
		var A_left =  $(this).offset().left;
		targetId.bgiframe();
		targetId.show().css({"position":"absolute","top":A_top+"px" ,"left":A_left+"px"});
	});
 
	targetId.find("#selectItemClose").click(function(){
		targetId.hide();
	});
 
	targetId.find("#selectSub :checkbox").click(function(){		
		//targetId.find(":checkbox").attr("checked",false);
		//$(this).attr("checked",true);	
		//_seft.val( $(this).val() );
		//targetId.hide();
	});
	
	targetId.find(".province-cbox").click(function() {
		//test(pCode);
		 var pCbox = $(this);
		 var pCode = pCbox.val();
		 
		 
		 targetId.find(".location-cbox").each(function(){
				// if ( $(this).attr("pCode") == pCode)
					// if (pCbox.attr("checked") == '' || pCbox.attr("checked") == null)
					//	 $(this).attr("checked", false);
					// else
					//	 $(this).attr("checked", pCbox.attr("checked"));
					 alert($(this).attr("pCode"));
					 $(this).attr("checked", true);
				// alert($(this).attr("checked"));
			 });
		
	});

	$(document).click(function(event){
		if(event.target.id!=_seft.selector.substring(1)){
			targetId.hide();	
		}
	});
 
	targetId.click(function(e){
		e.stopPropagation(); //  2
	});
 
    return this;
}
*/
$(document).ready(function(){
	
	//示例6，使用遮罩
	new PopupLayer({trigger:".ele6",popupBlk:"#blk6",closeBtn:"#close6",useOverlay:true});
	
	/**
	 * 初始化其它品牌输入框
	 */
	$("#otherBrandText").hide(); 
	
	/**
	 * 初始化地区选择框
	 */
	// 编辑市JSON数据
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
	locationToSelectItemCount(provinces, locations);
	//var myjsonobj =  JSON.stringify(provinceJson); 
	//alert(myjsonobj);
	
	
	/**
	 * 初始化分类选择联动
	 *
	 */
	 $.ajax({
			async: true,
		    cache: false,
			url : pathHeader + "/baseMaterialType/queryBaseMaterialTypes",
			data:{ "parentId" : null },
			dataType:"json",
			success:function(data) {
				var optionHtml = "<option value='N/A'>请选择</option>";
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
	 * 触发分类选择联动
	 *
	 */
	$(".material-type").change(function() {
		var id1 = $(this).attr("id");
		var id2 = id1 + "_0";
		var parentId = $(this).val();
			$.ajax({
				async: true,
			    cache: false,
				url : pathHeader + "/baseMaterialType/queryBaseMaterialTypes",
				data:{ "parentId" : parentId },
				dataType:"json",
				success:function(data) {
					var optionHtml = "";
					var baseMaterialTypes = data.baseMaterialTypes;
					for(var i = 0; i < baseMaterialTypes.length; i++) {
						optionHtml += "<option value='" + baseMaterialTypes[i].id + "' >" 
							+ baseMaterialTypes[i].description + "</option>";
					}
					$("#" + id2).html(optionHtml);
		 	 	}
			});
		});
	
	/**
	 * 下拉框选择，若有其它选项的 class 中添加加 “other-select” 设置自定义文本框ID “otherTextId=‘某某’”
	 * 
	 */
	$(".other-select").change(function() {
		var otherText = $("#" + $(this).attr("otherTextId"));
		if ($(this).val() == "0") {
			otherText.val("");
			otherText.show();
		} else {
			otherText.hide();
		}
	});
	
	/**
	 * 计量单位失去焦点事件，将文本域的值赋到价格中
	 * 
	 */
	$("#unitText").blur(function() {
		var str = $(this).val().trim();
		$(this).val(str);
		$("#unitSpan").html(str);
	});
	
	/**
	 * 地区选择
	 * 
	 */
	//$("#locationText").selectCity("#selectItem");
	
	/**
	 * 地区全选
	 *
	 */
	 $(".province-cbox").live("click", function() {
		 
		 var pCbox = $(this);
		 var pCode = pCbox.val();
		 $(".location-cbox").each(function(){
			 if ( $(this).attr("pCode") == pCode)
				 if (pCbox.attr("checked") == '' || pCbox.attr("checked") == null)
					 $(this).attr("checked", false);
				 else
					 $(this).attr("checked", pCbox.attr("checked"));
		 });
	 });

});


/**
 * 遍历地区JSON到联系人DIV中显示 
 
 * 这里有个小BUG 更改经营地区后联系人所选地区会丢失，有空会改进的
 */
function locationToSelectItemCount(provinces, locations) {
	var provincesDivStr = "";
	// 遍历选择地区列表
	$.each(provinces, function(index, pro) {
		// 添加省
		var pCode = pro.provinceCode;
		provincesDivStr += "<div><input type='checkbox' class='province-cbox' value='" + pCode + "'>" + pro.province + "</div>"; 
		// 添加市
		$.each(locations, function(index, loc) {
			if (pCode == loc.provinceCode) {
				provincesDivStr += "<input type='checkbox' class='location-cbox' pcode='" + pCode + "' value='" + loc.cityCode + "'";
				/*
				$("input[name='locationCbox']:checked").each(function() {
					if ($(this).val() == loc.cityCode) {
						provincesDivStr += " checked='checked' ";
					}
				});
				*/
				provincesDivStr += ">" + loc.city + "</label>&nbsp;&nbsp;";
			}
				
		});
		provincesDivStr += "<BR /><BR />";
	});
	$("#selectItemCount").html(provincesDivStr);
	
}
  





