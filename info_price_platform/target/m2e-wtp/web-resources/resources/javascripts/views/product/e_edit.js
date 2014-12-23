$(document).ready(function() {
	//公用方法 和 数据
	var handler = {
			searchListParam:{handleStatus:$("#handleStatus_hidden").val(),companyId:$("#companyId_input").val()},
			editProductParam:{id:-1,editPropName:'',companyId: $("#companyId_input").val()},
			pageInit:function(){
				var handler = this;
				handler.searchListParam.currentPage = parseInt( $("#currentPage_span").html());
				$("#pageSize_select").val($("#pageSize_input").val());
				handler.searchListParam.totalPage =  parseInt($("#totalPage_span").html());
				$("ul.pager li>a").click(function(){
					if(this.id =="firstPage_btn"){
						//alert(handler.searchListParam.currentPage);
						if(handler.searchListParam.currentPage == 1){
							return;
						}
						handler.searchListParam.currentPage = 1;
						//alert(handler.searchListParam.currentPage);
					}
					if(this.id =="prevPage_btn"){
						if(handler.searchListParam.currentPage == 1){
							return;
						}
						handler.searchListParam.currentPage -= 1;				
					}
					if(this.id =="nextPage_btn"){
						if(handler.searchListParam.currentPage == handler.searchListParam.totalPage){
							return;
						}
						handler.searchListParam.currentPage += 1;	
					}
					if(this.id =="lastPage_btn"){
						if(handler.searchListParam.currentPage == handler.searchListParam.totalPage){
							return;
						}
						handler.searchListParam.currentPage = handler.searchListParam.totalPage;	
					}
					handler.loadList();
				});
				$("#pageSize_select").change(function(){
					handler.searchListParam.currentPage = 1;
					handler.searchListParam.pageSize = $(this).val();
					handler.loadList();
				});
			},
			editInit:function(){
				var handler = this;
				$("#e_list_tab>table td[class^='product']").dblclick(function(){
					var $this = $(this),
						trId = $this.parent().attr("id"),
						className = $this.attr("class"),
						$ei = $("#edit_input_temple").clone(true).removeAttr("id");
					if(handler.searchListParam.handleStatus == 'pending' || $('input',$this)[0]){//不是未分类 不能编辑 或者已经有编辑框了
						return;
					}
					//设置编辑 需要的参数 材料id 要修改的属性名
					handler.editProductParam.id = trId.substring(trId.indexOf("_")+1,trId.length);
					handler.editProductParam.editPropName = className.substring(className.indexOf("-")+1,className.length);
					//显示编辑框 
					$this.append($ei);
					$ei.attr('placeholder',$this.children("span").hide().html()).show()[0].focus();
				});
			},
			initSearchListParam:function(){
				var $searchForm = $("#search_form");
				this.searchListParam.importUserId = $("#importUserId_input").val();
				if($("#begainCreatedAtStr_input").val()){
					this.searchListParam.begainCreatedAtStr = $.trim($("#begainCreatedAtStr_input").val());
				}
				if($("#endCreatedAtStr_input").val()){
					this.searchListParam.endCreatedAtStr = $.trim($("#endCreatedAtStr_input").val())+' 23:59:59';
				}
				this.searchListParam.name = $("#name_input").val();
				this.searchListParam.sepecification = $("#sepecification_input").val();
				this.searchListParam.pageSize = $("#pageSize_select").val();
				this.searchListParam.baseMaterialTypeId = $("#bmt_second_select").val();
				this.searchListParam.parentTypeId = $("#bmt_first_select").val();
			},
			loadList:function(){
				var hander = this;
				handler.initSearchListParam();
				$("#e_list_tab").load("company_e_product_list",handler.searchListParam,function(){
					hander.editInit();
					hander.pageInit();
				});
			}
	};
	//标签页点击 刷新列表
	$("#e_list_tabs ul.nav a").click(function(){
		//更改状态
		handler.searchListParam.handleStatus = this.id;
		if(this.id == 'pending'){
			$("#to_correct_page_btn").hide();
			$("#batch_edit_btn").hide();
		}else{
			$("#to_correct_page_btn").show();
			$("#batch_edit_btn").show();
		}
		handler.searchListParam.currentPage = 1;
		//加载列表
		handler.loadList();
	});
	// 级联 分类
	$("#bmt_first_select").change(function() {
		bmtvalues(false, 'bmt_second_select', this);
	});
	//检索
	$("#search_btn").click(function(){
		handler.loadList();
		return false;
	})
	//编辑框失去焦点 保存
	$("#edit_input_temple").blur(function(){
		var $this = $(this),$span = $this.prev(),val = $this.val();
		//没有数据 不修改
		if(!val || val == $.trim($span.html())){
			$this.detach();
			$span.show();
			return;
		}
		//有数据 修改
		handler.editProductParam[handler.editProductParam.editPropName] = val;
		$.ajax({
			url:'edit_product_prop',
			data:handler.editProductParam,
			dataType:'json',
			type:'post',
			success:function(data){
				if(!data){
					alert("该数据修改后会和其他材料重复，请到编辑页面编辑！");
					$span.show().html();
				}else{
					$span.show().html(val);
				}
				$this.detach();
			},
			error:function(){
				alert("修改失败,程序出现错误！");
				$span.show();
				$this.detach();
			}
		});
	});
	$("#to_correct_page_btn").click(function(){
		handler.initSearchListParam();
		location.href = "../categoryCorrect/returnList?"+$.param(handler.searchListParam);
	});
	//init
	handler.editInit();
	handler.pageInit();
	var tabType = $("#tab_type_hidden").val();
	if(tabType){
		$("#"+tabType).trigger("click");
	}
});


