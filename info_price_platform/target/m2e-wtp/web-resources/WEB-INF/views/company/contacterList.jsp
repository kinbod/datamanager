<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="gld" uri="/WEB-INF/tld/gld.tld"%>
<link rel="stylesheet" type="text/css"
	href="${contextPath}/assets/plugins/jquery-tags-input/jquery.tagsinput.css">
<link rel="stylesheet" type="text/css"
	href="${contextPath}/javascripts/uploadify/uploadify.css">
<link rel="stylesheet" type="text/css"
	href="${contextPath}/javascripts/zTree/zTreeStyle/zTreeStyle.css">
<input id="contextPath_hidden" type="hidden" value="${contextPth}">
<input id="referer_url_hidden" type="hidden" value="${header.referer}">
<input type="hidden" id="companyId_hidden" value="${param.companyId}">
<style>
#mobile_phone_tags_tag{width: 90px!important;}
#phone_tags_tag{width: 90px!important;}
</style>
<div class="row">
	<div class="col-md-12">
		<!-- BEGIN PAGE TITLE & BREADCRUMB-->
		<h3 class="page-title">供应商联系人列表</h3>
		<!-- END PAGE TITLE & BREADCRUMB-->
	</div>
</div>
<div class="row">
	<div class="col-md-12">
		<div class="portlet">
			<div class="portlet-title blue">
				<div class="caption">
					<i class="fa fa-reorder"></i>联系人列表
				</div>
					<a id="show_new_contacter_btn" href="javascript:void(0);" 
						class="btn btn-sm blue pull-right">新建联系人 <i
						class="fa fa-plus"></i></a>
			</div>
			<div class="portlet-body">
				<ul id='contacter_ul' class="list-group">
				</ul>
			</div>
		</div>
	</div>
</div>

<div id="edit_contacter_modal" class="modal fade in" tabindex="-1"
	role="basic" aria-hidden="false" style="display: none;">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true"></button>
				<h4 class="modal-title"></h4>
			</div>
			<div class="modal-body" style="height: 450px; overflow: auto;">
				<form id="contact_form" action="" role="form">
					<input type="hidden" id="contacter_id_input" name="id" value="">
					<div class="row">
						<label class="checkbox-inline"> <input id="isMain_cb" name="isMain"
							type="checkbox" value="1"> 常用联系人
						</label> <label class="checkbox-inline"> <input id="isShow_cb" name="isShow"
							type="checkbox" value="1"> 信息公开
						</label>
						<hr />
					</div>
					<div class="row">
						<div class="col-md-6">
							<div class="form-group">
								<label for="name">姓名<font color="red">*</font></label> <input
									data-required='true' id="name_input" name="name" type="text"
									class="form-control input-sm" /> <span class="help-block">姓名必填</span>
							</div>
						</div>
						<div class="col-md-6">
							<div class="form-group">
								<label for="name">性别</label> <select id="sex_select" name="sex"
									class="form-control">
									<option value="0">男</option>
									<option value="1">女</option>
								</select> <span class="help-block"></span>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-6">
							<div class="form-group">
								<label for="name">职务<font color="red">*</font></label> <input
									data-required='true'id="position_input" name="position" type="text"
									class="form-control input-sm" /> <span class="help-block">必填</span>
							</div>
						</div>
						<div class="col-md-6">
							<div class="form-group">
								<label for="name">地址</label> <input id="address_input" name="address" type="text"
									class="form-control input-sm tags" /> <span class="help-block"></span>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-6">
							<div class="form-group">
								<label for="name">手机号<font color="red">*</font></label> <input
									id="mobile_phone_tags" data-requried='true' name="mobilePhone"
									type="hidden" class="form-control input-sm tags" /> <span
									class="help-block">手机号必填</span>
							</div>
						</div>
						<div class="col-md-6">
							<div class="form-group">
								<label for="name">电话</label> <input id="phone_tags" name="phone"
									type="hidden" class="form-control input-sm tags" />
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-6">
							<div class="form-group">
								<label for="name">QQ</label> <input id="qq_input" name="qq" type="text"
									data-pattern = '^\d{5,10}$'
									class="form-control input-sm" /> <span class="help-block"></span>
							</div>
						</div>
						<div class="col-md-6">
							<div class="form-group">
								<label for="name">邮箱</label> <input 
								 data-pattern='^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$'
								id="email_input" name="email" type="text"
									class="form-control input-sm" /> <span class="help-block"></span>
							</div>
						</div>
					</div>
					<div class="row"></div>
					<div class="row">
						<div class="col-md-6">
							<div class="form-group">
								<label for="name">地区</label>
								<div style="height: 100px; overflow: auto;" class="well well-sm">
									<div id="locations_area_tree" class="ztree"></div>
								</div>  
							</div>
						</div>
						<div class="col-md-6">
							<div class="form-group">
								<label for="name">备注</label>
								<textarea id="note_ta" name='note' class="form-control" rows="3"></textarea>
								<span class="help-block"></span>
							</div>
						</div>
					</div>
				</form>
			</div>
			<div class="modal-footer">
				<button id="save_contact_btn" data-loading-text="正在保存..." type="button" class="btn blue">确定</button>
				<button type="button" class="btn default" data-dismiss="modal">关闭</button>
			</div>
		</div>
		<!-- /.modal-content -->
	</div>
	<!-- /.modal-dialog -->
</div>
<div id="contacter_temple" style="display: none;">
	<li class="list-group-item">
		<div class="row">
			<div class="col-md-4">
				<p>姓名：{name}</p>
				<p>性别：{sexStr}</p>
				<p>职务：{position}</p>
				<p>常用联系人：{isMainStr}</p>
				<p>信息公开：{isShowStr}</p>
				<p>地址：{address}</p>
			</div>
			<div class="col-md-4">
				<p>手机号：</p>
				<p>{mobilePhone}</p>
				<p>电话：</p>
				<p>{phone}</p>
				<p>QQ：{qq}</p>
				<p>邮箱：{email}</p>
			</div>
			<div class="col-md-4">
				<p>
					<button name='modify_contacter_btn' class="btn btn-primary">修改</button>
					<button name='delete_contacter_btn' class="btn btn-primary">删除</button>
				</p>
				<p>管理地区：</p>
				<p>{coaStr}</p>
				<p>备注：</p>
				<p>{note}</p>
			</div>
		</div>
	</li>
</div>
<script
	src="${contextPath}/javascripts/uploadify/jquery.uploadify.min.js"
	type="text/javascript"></script>
<script
	src="${contextPath}/assets/plugins/jquery-tags-input/jquery.tagsinput.min.js"
	type="text/javascript"></script>
<script type="text/javascript"
	src="${contextPath}/javascripts/jqueryvalidate/jquery-validate.min.js"></script>
<script type="text/javascript"
	src="${contextPath}/javascripts/jqueryTemple/nano.js"></script>
<script type="text/javascript"
	src="${contextPath}/javascripts/zTree/jquery.ztree.all-3.5.min.js"></script>
<script type="text/javascript"
	src="${contextPath}/javascripts/views/company/contacterList.js">
	
</script>