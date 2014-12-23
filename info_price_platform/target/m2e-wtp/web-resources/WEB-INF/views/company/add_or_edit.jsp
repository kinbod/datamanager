<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="gld" uri="/WEB-INF/tld/gld.tld"%>
<c:choose>
	<c:when test="${requestScope.editable == null}">
		<link rel="stylesheet" type="text/css"
			href="${contextPath}/assets/plugins/jquery-tags-input/jquery.tagsinput.css">
		<link rel="stylesheet" type="text/css"
			href="${contextPath}/javascripts/uploadify/uploadify.css">
		<link rel="stylesheet" type="text/css"
			href="${contextPath}/javascripts/zTree/zTreeStyle/zTreeStyle.css">
		<input id="contextPath_hidden" type="hidden" value="${contextPth}">
		<input id="session_id_hidden" type="hidden"
			value="${pageContext.session.id}">
		<input type="hidden" id="expand_area_code_hidden"
			value="${company.expandAreaCode}" />
		<input type="hidden" id="location_area_code_hidden"
			value="${company.locationAreaCode}" />
		<input type="hidden" id="com_level_hidden" value="${company.level}" />
		<input type="hidden" id="com_companyAttribute_hidden"
			value="${company.companyAttribute}" />
		<input type="hidden" id="com_businessType_hidden"
			value="${company.businessType}" />
		<input type="hidden" id="com_operateCategory_hidden"
			value="${company.operateCategory}" />
		<input type="hidden" id="com_cooperationStatus_hidden"
			value="${company.cooperationStatus}" />
		<input type="hidden" id="com_coasCode_hidden"
			value="${requestScope.coasCode}">
		<input type="hidden" id="com_name_hidden" value="${company.name}" />
		<input type="hidden" id="com_id_hidden" value="${company.id}" />
		<input type="hidden" id="user_id_hidden" name="id"
			value="${requestScope.user.id}">
		<input type="hidden" id="com_parentName_hidden"
			value="${requestScope.parentCompanyName}" />
		<div class="row">
			<div class="col-md-12">
				<h3 class="page-title">
					<c:choose>
						<c:when test="${param.companyId == null }">
				新建供应商
			</c:when>
						<c:when test="${param.companyId != null }">
				编辑供应商
			</c:when>
					</c:choose>
					<button id="top_save_btn" data-loading-text="正在保存..." type="button"
						class="btn blue pull-right">保存</button>
				</h3>
			</div>
		</div>
		<div class="row">
			<form id="company_form" class="form-horizontal" role="form"
				style="text-align: left;">
				<input type="hidden" name="id" value="${requestScope.company.id}" />
				<div class="row">

					<div class="col-md-6">
						<div class="form-group">
							<label class="control-label col-md-4">拓展地区<font
								color="red">*</font></label>
							<div class="col-md-4">
								<select id="expandArea_1_select" class="form-control"><option
										value="">请选择</option>
									<c:forEach items="${requestScope.provinceList}" var="pro">
										<option value="${pro.areaCode}">${pro.abbreviation }</option>
									</c:forEach>
								</select>
							</div>
							<div class="col-md-4">
								<select id="expandArea_2_select" name="expandAreaCode"
									class="form-control">
									<option value="">请选择</option>
									<c:forEach items="${requestScope.eaLocation}" var="lo">
										<option value="${lo.areaCode}">${lo.abbreviation }</option>
									</c:forEach>
								</select> <span class="help-block help-verify"></span>
							</div>
						</div>
						<div class="form-group">
							<label class="control-label col-md-4">公司名称<font
								color="red">*</font></label>
							<div class="col-md-8">
								<input type="text" id="com_name_input" name="name"
									class="form-control input-sm" placeholder=""
									value="${company.name }"> <span
									class="help-block help-verify"></span>
							</div>
						</div>
						<div class="form-group">
							<label class="control-label col-md-4">所在地区<font
								color="red">*</font></label>
							<div class="col-md-4">
								<select id="company_area_1_select" class=" form-control">
									<option value="">请选择</option>
									<c:forEach items="${requestScope.provinceList}" var="pro">
										<option value="${pro.areaCode}">${pro.abbreviation }</option>
									</c:forEach>
								</select>
							</div>
							<div class="col-md-4">
								<select id="company_area_2_select" name='locationAreaCode'
									class="form-control">
									<option value="">请选择</option>
									<c:forEach items="${requestScope.laLocation}" var="lo">
										<option value="${lo.areaCode}">${lo.abbreviation }</option>
									</c:forEach>
								</select> <span class="help-block help-verify"></span>
							</div>
						</div>
						<div class="form-group">
							<label class="control-label col-md-4">详细地址<font
								color="red">*</font>
							</label>
							<div class="col-md-8">
								<input id='com_address_input' type="text" name="address"
									class="form-control" placeholder=""
									value="${requestScope.company.address}"> <span
									class="help-block help-verify"></span>
							</div>
						</div>
						<div class="form-group">
							<label class="control-label col-md-4">公司电话<font
								color="red">*</font></label>
							<div class="col-md-8">
								<input id='com_phone_input' type="text" name="phone"
									class="form-control" placeholder=""
									value="${requestScope.company.phone}"> <span
									class="help-block help-verify"></span>
							</div>
						</div>
						<div class="form-group">
							<label class="control-label col-md-4">上级公司</label>
							<div class="col-md-8">
								<input type="text" id="parentName_input" name="parentName"
									class="form-control" value="${requestScope.parentCompanyName}">
								<span class="help-block help-verify"></span>
							</div>
						</div>
						<div class="form-group">
							<label class="control-label col-md-4">公司网址</label>
							<div class="col-md-8">
								<input type="text" name="website" class="form-control"
									placeholder="" value="${request.company.website}"> <span
									class="help-block help-verify"></span>
							</div>
						</div>
						<div class="form-group">
							<label class="control-label col-md-4">公司邮箱</label>
							<div class="col-md-8">
								<input type="text" name="email" class="form-control"
									value="${requestScope.company.email}"> <span
									class="help-block help-verify"></span>
							</div>
						</div>
						<div class="form-group">
							<label class="control-label col-md-4">公司传真</label>
							<div class="col-md-8">
								<input type="text" name="fax" class="form-control"
									value="${requestScope.company.fax}"> <span
									class="help-block help-verify"></span>
							</div>
						</div>
					</div>
					<div class="col-md-6">
						<div class="form-group">
							<label class="control-label col-md-4">公司LOGO<font
								color="red"  id="logo_mark">*</font></label>
							<div class="col-md-4">
								<input id="logo_hidden" name='logo' type="hidden"
									value="${requestScope.company.logo}" /> <img id="logo_img"
									class="img-thumbnail" style="height: 80px;" alt="LOGO图片"
									src="${contextPaht}/getImages?imagePath=${requestScope.company.logo}">
							</div>
							<div class="col-md-4">
								<input id="logo_upload" name="file_upload" type="file">
								<div id="upload_queue" style="display: inline-block;"></div>
							</div>
						</div>
						<div class="form-group">
							<label class="control-label col-md-4">供应商属性</label>
							<div class="col-md-8">
								<c:set scope="page" var="dics"
									value="${gld:getDicValues('company_attribute') }"></c:set>
								<select id="com_companyAttribute_select" name="companyAttribute"
									class="form-control">
									<option value="" selected="selected">请选择</option>
									<c:forEach items="${dics }" var="dic">
										<option value="${dic.code }">${dic.name }</option>
									</c:forEach>
								</select> <span class="help-block help-verify"></span>
							</div>
						</div>
						<div class="form-group">
							<label class="control-label col-md-4">供应商等级<font
								color="red">*</font>
							</label>
							<div class="col-md-8">
								<c:set scope="page" var="dics"
									value="${gld:getDicValues('level') }"></c:set>
								<select id="com_level_select" name="level" class="form-control">
									<option value="">请选择</option>
									<c:forEach items="${dics }" var="dic">
										<option value="${dic.code }">${dic.name }</option>
									</c:forEach>
								</select> <span class="help-block help-verify"></span>
							</div>
						</div>
						<div class="form-group">
							<label class="control-label col-md-4">经营模式<font
								color="red">*</font></label>
							<div class="col-md-8">
								<c:set scope="page" var="dics"
									value="${gld:getDicValues('indent_type') }"></c:set>
								<select id="com_businessType_select"  name="businessType"
									class="form-control">
									<option value="">请选择</option>
									<c:forEach items="${dics }" var="dic">
										<option value="${dic.code }">${dic.name }</option>
									</c:forEach>
								</select> <span class="help-block help-verify"></span>
							</div>
						</div>
						<div class="form-group">
							<label class="control-label col-md-4">所属类别<font
								color="red">*</font>
							</label>
							<div class="col-md-8">
								<select id="com_operateCategory_select" name="operateCategory"
									class="form-control">
									<option value="">请选择</option>
									<c:forEach items="${requestScope.bmtList}" var="bmt">
										<option value="${bmt.id}">${bmt.description }</option>
									</c:forEach>
								</select> <span class="help-block help-verify"></span>
							</div>
						</div>
						<div class="form-group">
							<label class="control-label col-md-4">经营区域<font
								color="red">*</font></label>
							<div class="col-md-8">
								<input type="text" id="com_oper_area_hidden" name="comOperArea"
									value=""
									style="height: 1px;; width: 0; padding: 0; margin: 0; border: none;" />
								<span class="help-block help-verify"></span>
								<div style="height: 130px; overflow: auto;" class="well well-sm">
									<div id="locations_area_tree" class="ztree"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-md-9">
						<div class="form-group">
							<label class="control-label col-md-2">公司简介<font
								color="red">*</font></label>
							<div class="col-md-8">
								<textarea id="com_desc_ta" rows="8" cols="80">
							${requestScope.company.introduction}
						</textarea>
							</div>
							<textarea id="com_introduction_ta" name="introduction" id=""
								cols="0" rows="0"
								style="height: 1px;; width: 0; padding: 0; margin: 0; border: none;"></textarea>
							<span class="help-block help-verify"></span>
						</div>
					</div>
				</div>
			</form>
		</div>
		<hr />
		<div class="row">
			<form id="user_form" class="form-horizontal" role="form">
				<input type="hidden" id="userId_hidden" value="">
				<div class="row">
					<div class="col-md-6">
						<div class="form-group">
							<label class="control-label col-md-4">登录名称<font
								color="red">*</font></label>
							<div class="col-md-8">
								<input id="user_loginName_input" type="text" name="loginname"
									class="form-control" value="${requestScope.user.loginname}">
								<span class="help-block"></span>
							</div>
						</div>
						<div class="form-group">
							<label class="control-label col-md-4">手机号<font
								color="red">*</font></label>
							<div class="col-md-8">
								<input id="user_mobilePhone_input" type="text"
									name="mobilePhone" class="form-control" placeholder=""
									value="${requestScope.user.mobilePhone}"> <span
									class="help-block help-verify"></span>
							</div>
						</div>
						<c:if test="${requestScope.user.id == null}">
							<div class="form-group">
								<label class="control-label col-md-4">验证码<font
									color="red">*</font></label>
								<div class="col-md-2">
									<input id="user_verification_code_input" type="text"
										name="verificationCode" class="form-control" placeholder="">
									<span class="help-block help-verify"></span>
								</div>
								<div class="col-md-5">
									<img id="v_code_img" alt="验证码加载中"
										src="${contextPath}/user/getToken">
								</div>
								<div class="col-md-1">
									<a id="fresh_v_code_btn" class="btn" href="javascript:void(0);"><i
										class="fa fa-refresh"></i></a>
								</div>
							</div>
						</c:if>
					</div>
				</div>
			</form>
		</div>
		<hr />
		<div class="row">
			<div class="col-md-12">
				<button id="bottom_save_btn" data-loading-text="正在保存..."
					type="button" class="btn blue pull-right">保存</button>
			</div>
		</div>
		<script
			src="${contextPath}/javascripts/uploadify/jquery.uploadify.min.js"
			type="text/javascript"></script>
		<script
			src="${contextPath}/assets/plugins/jquery-tags-input/jquery.tagsinput.min.js"
			type="text/javascript"></script>
		<script type="text/javascript"
			src="${contextPath}/javascripts/jquery-validation/jquery.validate.min.js"></script>
		<script type="text/javascript"
			src="${contextPath}/javascripts/jqueryTemple/nano.js"></script>
		<script type="text/javascript"
			src="${contextPath}/javascripts/zTree/jquery.ztree.all-3.5.min.js"></script>
		<script src="${contextPath}/assets/plugins/ckeditor/ckeditor.js"
			type="text/javascript"></script>
		<script type="text/javascript"
			src="${contextPath}/javascripts/views/company/new.js"></script>
	</c:when>
	<c:when test="${requestScope.editable == false }">
		<div class="row">
			<h4 style="text-align: center;">供应商处于待审核状态，不能进行编辑！</h4>
		</div>
	</c:when>
</c:choose>