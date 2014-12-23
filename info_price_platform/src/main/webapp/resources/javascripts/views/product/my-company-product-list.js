$(document).ready(function(){
	
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
				var optionHtml = "<option value=''>全部</option>";
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
	 * 点击复制到剪切板
	 */
	$('a#clickOnTheCopy').zclip({   
	    path : pathHeader + '/javascripts/zclip/ZeroClipboard.swf',   
	    copy : function(){ 
	    	return $("#clickOnTheCopyText").val();
	    } 
	});
	
	/**
	 * 到添加材料页面
	 */
	$("#addProductBtn").click(function() {
		 window.location.href = pathHeader + "/product/create?companyId=" + $("#companyId").val();
	});
	/**
	 * 导出材料
	 */
	$("#expProduct").click(function() {
		var productStatus = $("#status").val();
		
		if(productStatus=="pending"){
			alert("审核中的材料不能导出！");
			return;
		}
		 $.ajax({
			    type:"POST",
				url : pathHeader + "/product/isCheckExport",
				data:{
					baseMaterialTypeId: $('#baseMaterialType_Id').val(),
					name: $('#product_name').val(),
					sepecification : $('#product_sepecification').val(),
					brandName: $('#product_brandName').val(),
					propertyValue: $('#product_propertyValue').val(),
					updateStartDate: $('#product_updateStartDate').val(),
					updateEndDate: $('#product_updateEndDate').val(),
					status:productStatus,
					companyId: $('#input_company_id').val()
				},
				dataType:"json",
				success:function(count) {
					if(count==0){
						alert("您检索的条件不存在材料，请重新选择检索条件！");
						return;
					}
					if(count>30000){
						alert("您检索的数据超过30000条，请重新选择检索条件！");
						return;
					}
					$('#searchForm').attr('action', pathHeader+'/product/exportProduct');
					$('#searchForm').submit(); 
					$('#searchForm').attr('action', pathHeader+'/product/searchProduct');
		 	 	}
			});
	});
	
	//进入页面初始化已发布的材料表格
	
	
});

/* zhanggy-b : start*/

var globalVar = {
	input_current_page : 'input_current_page',	
	input_page_size : 'input_page_size',
	pageDiv : 'pageDiv',
	defaultPNo : '1',
	defaultPSize : '20'
};

/**
 * 清空tab
 */
function clearTabs(){
	$("#hasReleasedData").html("");
	$("#pendingReviewData").html("");
	$("#notThroughReviewData").html("");
	jObj(globalVar.pageDiv).html('');
};

//复选框处理
function checkboxHandle(parent, childrens){
	parent.click(function(){
		childrens.attr('checked', $(this).parent('span').hasClass('checked'));
	});
	/*childrens.click(function(){
		return false;
		var isAllChecked = true;
		$.each(childrens, function(){
			if(! this.checked){
				isAllChecked = false;
				return false;
			}
		});
		if(isAllChecked){
			parent.parent('span').addClass('checked');
		}else{
			parent.parent('span').removeClass('checked');
		}
	});*/
};

//初始化复选框功能
function initCheckbox(){
	var gcb1 = $('#groupcheckbox-1');
	var gcb2 = $('#groupcheckbox-2');
	var gcb3 = $('#groupcheckbox-3');
	
	gcb1.parent('span').removeClass('checked');
	gcb2.parent('span').removeClass('checked');
	gcb3.parent('span').removeClass('checked');
	
	checkboxHandle(gcb1, $('.checkboxes-1'));
	checkboxHandle(gcb2, $('.checkboxes-2'));
	checkboxHandle(gcb3, $('.checkboxes-3'));
};

//获取选中的checkbox
function getCheckeds(){
	var ret = [];
	$.each( $( '.' + $('#nav_tab_ul > li.active').attr('cb') ), function(){
		if(this.checked && this.value != null && this.value != ''){
			ret.push(this.value);
		}
	});
	return ret;
};

function checks(_tab){
	var chs ="";
	$.each( $( '.' + $('#nav_tab_ul > li.active').attr('cb') ), function(){
		if(this.checked && this.value != null && this.value != ''){
			chs=chs+"&id="+this.value;
		}
	});
	return chs;
}

/**
 * 点击搜索,提交表单
 */
function searchSubmit() {
	$("#maskDiv").show();
	var currentPage = arguments.length > 0 ? arguments[0] : pNo() ? pNo() : globalVar.defaultPNo;
	var pageSize = arguments.length > 1 ? arguments[1] : pSize() ? pSize() : globalVar.defaultPSize;
	
	var updateStartDate = $('#product_updateStartDate').val();
	var updateEndDate = $('#product_updateEndDate').val();
	
	var params = {
		baseMaterialTypeId: $('#baseMaterialType_Id').val(),
		name: $('#product_name').val(),
		sepecification : $('#product_sepecification').val(),
		brandName: $('#product_brandName').val(),
		propertyValue: $('#product_propertyValue').val(),
		status: $("#status").val(),
		companyId: $('#input_company_id').val(),
		currentPage: currentPage,
		pageSize: pageSize
	};
	
	if(updateStartDate && updateStartDate != ''){
		params.updateStartDate = updateStartDate + ' 00:00:00';
	};
	
	if(updateEndDate && updateEndDate != ''){
		params.updateEndDate = updateEndDate + ' 23:59:59';
	};
	
	
	var hiddenBmtId = $('#hidden_baseMaterialTypeId').val();
	var hiddenBrandId = $('#hidden_brandId').val();
	var hiddenCompanyId = $('#hidden_companyId').val();
	
	//品牌库点击产品数量跳转
	if(hiddenBmtId && hiddenBmtId != ''){
		params.baseMaterialTypeId = hiddenBmtId;
	}
	if(hiddenBrandId && hiddenBrandId != ''){
		params.brandId = hiddenBrandId;
	}
	if(hiddenCompanyId && hiddenCompanyId != ''){
		params.companyId = hiddenCompanyId;
	}
	
	
	
	$.ajax({
		url:pathHeader + '/product/searchProduct?dat='+new Date(),
		type:'POST',
		dataType:'json',
		data:params,
		success: function(data){
			// products
			clearTabs();	//清空Tab
			if(data && data.products && data.products.length > 0){
				var list = data.products;
				$(".list-count").html(list.length);
				var status = data.product.status;
				if (status == "released") {
					$("#hasReleasedDataTmp").tmpl(list).appendTo($("#hasReleasedData").html(""));
				} else if (status == "pending") {
					$("#pendingReviewDataTmp").tmpl(list).appendTo($("#pendingReviewData").html(""));
				} else if (status == "review_failed") {
					$("#notThroughReviewDataTmp").tmpl(list).appendTo($("#notThroughReviewData").html(""));
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
				//初始化提示层tip
				initTip();
				//checkbox
				initCheckbox();
				//trClick();
			}else{
				//jObj(globalVar.pageDiv).html('');	清空分页栏
			}
			$("#maskDiv").hide();
		},
		error: function(xhr, msg, err){
			//alert(xhr.status + ' - ' + xhr.responseText + ' ' + msg + ' ' + err);
			$("#maskDiv").hide();
		}
	});
};
  
/**
 * 根据类型搜索表单
 * @param type
 */
function searchTypeSubmit(type) {
	//released(已发布) pending(审核中) review_failed(审核未通过)
	var status = $("#status").val();
	if(status == '' || (type != status) ){	//判断是否在重复点击tab选项
		jObj(globalVar.pageDiv).html('');	//清空分页栏
		if(type == 'released'){
			$('#p_opera_btn').show();
			$('#p_opera_btn').children().show();
			$('#p_opera_upd_price').show();
			$('#p_opera_upd_price').children().show();
		}else if(type == 'pending'){
			$('#p_opera_btn').hide();
			$('#p_opera_upd_price').hide();
		}else if(type == 'review_failed'){
			$('#p_opera_upd_price').show();
			$('#p_opera_upd_price').children().show();
			$('#p_opera_btn').show();
			$('#p_opera_btn').children().hide();
			$('#p_opera_btn').children('.review_failed').show();
		}
		$("#status").val(type);
		searchSubmit();
	}
};

//用于进入审核之后调用，刷新当前页面
function searchTypeSubmit1(type){
	$("#status").val(type);
	searchSubmit();
}

/**
 * 初始化页面的提示层
 */
function initTip(){
	var tips = $('.div_tip').each(function() {
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
}

//给<tr>注册点击事件,放在percommon.js文件中了
/*function trClick(){
	$('tbody tr').click(function(){
		var $this = $(this);
		var cb = $this.children('td').first().children(':checkbox');
		var isSelected = cb[0].checked;
		var parentCheckboxWithSpan = $this.parents('table').children('thead').children('tr').children('th').first().find(':checkbox').parent('span');
		if(isSelected){
			parentCheckboxWithSpan.removeClass('checked');
		}else{
			//检查所有同辈元素是否选中
			var trs = $this.siblings('tr');
			var selectedAll = true;
			$.each(trs, function(){
				var $tr = $(this);
				var tempCb = $tr.children('td').first().children('input[type="checkbox"]:enabled')[0];
				if(tempCb && !tempCb.checked){
					selectedAll = false;
					return false;
				}
			});
			if(selectedAll){
				parentCheckboxWithSpan.addClass('checked');
			}else{
				parentCheckboxWithSpan.removeClass('checked');
			}
		}
	});
}*/

/* zhanggy-b : end*/




