<%@ page contentType="text/html; charset=utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="/WEB-INF/tld/gld.tld" prefix="gld"%>

<script type="text/javascript">
	var cooperationStatus = "${company.cooperationStatus}";
	// 联系人数量
	var contactNum = -1;
	// 经营地区
	var provinceJson = {provinces:[]};
	var locationJson = {locations:${jsonArray}};
	//var myjsonobj =  JSON.stringify(locationJson); 
	//alert(myjsonobj);
</script>
<script type="text/javascript" src="${contextPath}/javascripts/JSON-js-master/json2.js"></script> 
<script type="text/javascript" src="${contextPath}/javascripts/views/company/company-my-edit.js"></script>

<!-- BEGIN PAGE HEADER-->
<div class="row">
  <div class="col-md-12"> 
    <!-- BEGIN PAGE TITLE & BREADCRUMB-->
    <h3 class="page-title"> 供应商管理 <small></small> </h3>
    <ul class="page-breadcrumb breadcrumb">
      <li><i class="fa fa-home"></i> <a href="index.html">Home</a> <i class="fa fa-angle-right"></i></li>
      <li><a href="${contextPath }/company/my/list">我的供应商</a> <i class="fa fa-angle-right"></i> </li>
      <li>编辑供应商</li>
    </ul>
    <!-- END PAGE TITLE & BREADCRUMB--> 
  </div>
</div>
<!-- END PAGE HEADER--> 
<!-- BEGIN PAGE CONTENT-->
<div class="row">
  <div class="col-md-12"> 
    <!-- BEGIN VALIDATION STATES-->
    <div class="portlet box green">
      <div class="portlet-title">
        <div class="caption"><i class="fa fa-reorder"></i>编辑供应商</div>
      </div>
      <div class="portlet-body form"> 
        <!-- BEGIN FORM-->
        <form action="/company/my/doEdit" id="form_sample_3" class="" novalidate="novalidate" method="post" >
          <!-- BEGIN FORM-->
          <input type="hidden" id="cId" name="id" value="${company.id}">
          <input type="hidden" name="companyAdditionalInfo.id" value="${company.companyAdditionalInfo.id}">
          <input type="hidden" id="userId" name="user.id" value="${company.user.id}">
          <div class="col-md-12">
            <div class="tabbable tabbable-custom boxless">
              <ul class="nav nav-tabs">
                <li class="active"><a href="#tab_0" data-toggle="tab">供应商信息</a></li>
                <li><a href="#tab_1" data-toggle="tab">联系人信息</a></li>
                <li><a href="#tab_2" data-toggle="tab">帐号信息</a></li>
              </ul>
              <div class="tab-content"> 
                <!--BEGIN tab_0-->
                <div class="tab-pane active" id="tab_0">
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label class="control-label col-md-2">拓展地区<font color="red">*</font></label>
                        <div class="col-md-9">
                          <div class="form-inline">
                            <select id="location_all_0" class="form-control location-all" style="width:130px">
                            </select>
                            <select id="location_all_0_0" class="select2me form-control location-city" style="width:130px">
                            </select>
                            <input type="hidden" id="expandAreaCode" name="expandAreaCode" value="${company.expandAreaCode}">
                          <span class="help-block help-verify"></span> </div>
                          </div>
                      </div>
                    </div>
                    <!--/span-->
                    <div class="col-md-6">
                      <div class="form-group">
                        <label class="control-label col-md-2">公司名称<font color="red">*</font></label>
                        <div class="col-md-9">
                          <input type="text" id="name" name="name" class="form-control" value="${company.name}" placeholder="">
                          <span class="help-block help-verify"></span> </div>
                      </div>
                    </div>
                    <!--/span--> 
                  </div>
                  <!--/row-->
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label class="control-label col-md-2">所在地区<font color="red">*</font></label>
                        <div class="col-md-9">
                          <div class="form-inline">
                            <select id="location_all_1" class="location-all form-control" style="width:130px">
                            </select>
                            <select id="location_all_1_0" class="select2me form-control location-city" style="width:130px">
                            </select>
                            <input type="hidden" id="locationAreaCode" name="locationAreaCode" value="${company.locationAreaCode}">
                          	<span class="help-block help-verify"></span> </div>
                          </div>
                      </div>
                    </div>
                    <!--/span-->
                    <div class="col-md-6">
                      <div class="form-group">
                        <label class="control-label col-md-2">公司地址<font color="red">*</font></label>
                        <div class="col-md-9">
                          <input type="text" id="address" name="address" class="form-control" value="${company.address}" placeholder="">
                          <span class="help-block help-verify"></span> </div>
                      </div>
                    </div>
                    <!--/span--> 
                  </div>
                  <!--/row-->
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label class="control-label col-md-2">公司网址</label>
                        <div class="col-md-9">
                          <input type="text" id="website" name="website" class="form-control" value="${company.website}" placeholder="">
                          <span class="help-block help-verify"></span> </div>
                      </div>
                    </div>
                    <!--/span-->
                    <div class="col-md-6">
                      <div class="form-group">
                        <label class="control-label col-md-2">公司Logo</label>
                        <div class="col-md-9">
                          <div class="form-inline">
                            <!-- <input type="file" id="exampleInputFile">
                            &nbsp;
                            <div>
                              <button type="button" class="btn btn-primary btn-sm">上传</button>
                            </div>
                             --><button type="button" class="btn btn-primary btn-sm" onclick="upImage();">上传图片</button>
                          </div>
                          <span class="help-block help-verify"></span> </div>
                      </div>
                    </div>
                    <!--/span--> 
                  </div>
                  <!--/row-->
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label class="control-label col-md-2">上级公司</label>
                        <div class="col-md-9">
                          <input type="hidden" id="parentId" name="parentId" value="${company.parentId}">
                          <input type="text" id="parentName" name="parentName" class="form-control" placeholder="请输入上级公司的名称">
                          <span class="help-block help-verify"></span> </div>
                      </div>
                    </div>
                    <!--/span-->
                    <div class="col-md-6">
                      <div class="form-group">
                        <label class="control-label col-md-2">经营模式<font color="red">*</font></label>
                        <div class="col-md-9">
                          <c:set scope="page" var="dics" value="${gld:getDicValues('indent_type') }"></c:set>
                          <select id="businessType" name="businessType" class="select2me form-control">
                            <option value=""></option>
                            <c:forEach items="${dics}" var="dic">
							  <option value="${dic.code}" <c:if test="${company.businessType==dic.code}"> selected="selected" </c:if> >${dic.name }</option>
							</c:forEach>
                          </select>
                          <span class="help-block help-verify"></span> </div>
                      </div>
                    </div>
                    <!--/span--> 
                  </div>
                  <!--/row-->
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label class="control-label col-md-2">经营类别</label>
                        <div class="col-md-9"> <span class="help-block help-verify">
                        	<c:forEach var="materialType" items="${companyMaterialTypes}"> ${materialType.name} </c:forEach></span> </div>
                      </div>
                    </div>
                    <!--/span-->
                    <div class="col-md-6">
                      <div class="form-group">
                        <label class="control-label col-md-2">所属类别<font color="red">*</font></label>
                        <div class="col-md-9">
                          <select id="operateCategory" name="operateCategory" class="form-control material-type" typeName="${company.operateCategory}">
                          </select>
                          <span class="help-block help-verify"></span> </div>
                      </div>
                    </div>
                    <!--/span--> 
                  </div>
                  <!--/row-->
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label class="control-label col-md-2">经营区域<font color="red">*</font></label>
                        <div class="col-md-9">
                          <div id="addLocationDiv" class="form-actions"></div>
                          <div class="form-inline">
                            <select id="location_all_2" class="location-all form-control" style="width:130px">
                            </select>
                            <select id="location_all_2_0" class="select2me form-control" style="width:130px">
                            </select>
                            <button id="addLocationBtn" type="button" class="btn btn-primary btn-sm">+ 添加经营区域</button>
                            <input type="hidden" id="operatingAreas" name="operatingAreas">
                            <span class="help-block help-verify"></span> 
                          </div>
                          </div>
                      </div>
                    </div>
                    <!--/span-->
                    <div class="col-md-6">
                      <div class="form-group">
                        <label class="control-label col-md-2">经营品牌</label>
                        <div class="col-md-9"> <span class="help-block help-verify">
                        	<c:forEach var="brand" items="${companyBrands}"> ${brand.brandName} </c:forEach></span> </div>
                      </div>
                    </div>
                    <!--/span--> 
                  </div>
                  <!--/row-->
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label class="control-label col-md-2">供应商属性</label>
                        <div class="col-md-9">
                          <c:set scope="page" var="dics" value="${gld:getDicValues('company_attribute') }"></c:set>
                          <select id="companyAttribute" name="companyAttribute" class="select2me form-control">
                            <option value="" selected="selected"></option>
                            <c:forEach items="${dics }" var="dic">
							  <option value="${dic.code }" <c:if test="${company.companyAttribute==dic.code}"> selected="selected" </c:if> >${dic.name }</option>
						    </c:forEach>
                          </select>
                          <span class="help-block help-verify"></span> </div>
                      </div>
                    </div>
                    <!--/span-->
                    <div class="col-md-6">
                      <div class="form-group">
                        <label class="control-label col-md-2">供应商等级<font color="red">*</font></label>
                        <div class="col-md-9">
                          <c:set scope="page" var="dics" value="${gld:getDicValues('level') }"></c:set>
                          <select id="level" name="level" class="select2me form-control">
                          	<option value="" selected="selected"></option>
                            <c:forEach items="${dics }" var="dic">
							  <option value="${dic.code }" <c:if test="${company.level==dic.code}"> selected="selected" </c:if> >${dic.name }</option>
						    </c:forEach>
                          </select>
                          <span class="help-block help-verify"></span> </div>
                      </div>
                    </div>
                    <!--/span--> 
                  </div>
                  <!--/row-->
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label class="control-label col-md-2">公司邮箱</label>
                        <div class="col-md-9">
                          <input type="text" id="email" name="email" class="form-control" value="${company.email}" placeholder="">
                          <span class="help-block help-verify"></span> </div>
                      </div>
                    </div>
                    <!--/span-->
                    <div class="col-md-6">
                      <div class="form-group">
                        <label class="control-label col-md-2">公司传真</label>
                        <div class="col-md-9">
                          <input type="text" id="fax" name="fax" class="form-control" value="${company.fax}" placeholder="">
                          <span class="help-block help-verify"></span> </div>
                      </div>
                    </div>
                    <!--/span--> 
                  </div>
                  <!--/row-->
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label class="control-label col-md-2">公司电话<font color="red">*</font></label>
                        <div class="col-md-9">
                          <input type="text" id="phone" name="phone" class="form-control" value="${company.phone}" placeholder="">
                          <span class="help-block help-verify"></span> </div>
                      </div>
                    </div>
                    <!--/span-->
                    <div class="col-md-6">
                      <div class="form-group has-error">
                        <div class="col-md-9"> <span class="help-block help-verify"></span> </div>
                      </div>
                    </div>
                    <!--/span--> 
                  </div>
                  <hr>
                  <!--/row-->
                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group">
                        <label class="control-label col-md-2">公司简介</label>
                        <div class="col-md-9">
                          <textarea id="introduction" name="introduction" class="form-control" rows="3">${company.introduction}</textarea>
                          <span class="help-block help-verify"></span> </div>
                      </div>
                    </div>
                    <!--/span-->
                  </div>
                  <!--/row-->
                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group">
                        <label class="control-label col-md-2">报价说明</label>
                        <div class="col-md-9">
                          <textarea id="priceNote" name="priceNote" class="form-control" rows="3">${company.priceNote}</textarea>
                          <span class="help-block help-verify"></span> </div>
                      </div>
                    </div>
                    <!--/span-->
                  </div>
                  <!--/row-->
                </div>
                <!-- END tab_0--> 
                
                <!-- BEGIN tab_1-->
                <div class="tab-pane" id="tab_1">
                
                <!-- BEGIN 联系人列表 -->
                  <c:forEach var="contacts" varStatus="status" items="${company.contactPeopleList}" >
                  	<script type="text/javascript">
                  		contactNum ++;
                  	</script>
	                <div id="addContactDiv_0" class="add-contact-div">
	                  <h3 class="form-section">
	                    <div class="form-inline">
	                      <div class="checkbox">
	                        <label>
	                          <input type="checkbox" name="contactPeoples[${status.index}].isMain"
	                          		 value="1" <c:if test="${contacts.isMain == true}">checked="checked"</c:if>>
	                          常用联系人 </label>
	                      </div>
	                      <div class="checkbox">
	                        <label>
	                          <input type="checkbox" name="contactPeoples[${status.index}].isShow" 
	                          		value="1" <c:if test="${contacts.isShow == true}">checked="checked"</c:if>>
	                          信息公开 </label>
	                      </div>
	                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	                      <button type="button" class="btn btn-danger delete-contact" cId="${status.index}">删除</button>
	                    </div>
	                  </h3>
	                  <div class="row">
	                    <div class="col-md-6">
	                      <div class="form-group">
	                        <label class="control-label col-md-2">姓名<font color="red">*</font></label>
	                        <div class="col-md-9">
	                          <input type="text" id="contactPeoplesName${status.index}" name="contactPeoples[${status.index}].name" class="form-control" value="${contacts.name}" placeholder="">
	                          <span class="help-block help-verify"></span> </div>
	                      </div>
	                    </div>
	                    <!--/span-->
	                    <div class="col-md-6">
	                      <div class="form-group">
	                        <label class="control-label col-md-2">性别</label>
	                        <div class="col-md-9">
	                          <select name="contactPeoples[${status.index}].sex" class=" form-control" style="width:130px">
	                            <option value="0">男</option>
	                            <option value="1">女</option>
	                          </select>
	                          <span class="help-block help-verify"></span> </div>
	                      </div>
	                    </div>
	                    <!--/span--> 
	                  </div>
	                  <!--/row-->
	                  <div class="row">
	                    <div class="col-md-6">
	                      <div class="form-group">
	                        <label class="control-label col-md-2">手机<font color="red">*</font></label>
	                        <div class="col-md-9">
	                          <input type="hidden" id="contactPeoplesMobilePhone${status.index}" name="contactPeoples[${status.index}].mobilePhone" value="${contacts.mobilePhone}" >
	                          <button class="btn btn-primary btn-sm add-cmobile-phone-btn" cNum="${status.index}" type="button">添加手机</button>
	                          <span class="help-block help-verify"></span> </div>
	                      </div>
	                    </div>
	                    <!--/span-->
	                    <div class="col-md-6">
	                      <div class="form-group">
	                        <label class="control-label col-md-2">职务<font color="red">*</font></label>
	                        <div class="col-md-9">
	                          <input type="text" id="contactPeoplesPosition${status.index}" name="contactPeoples[${status.index}].position" class="form-control" value="${contacts.position}" placeholder="">
	                          <span class="help-block help-verify"></span> </div>
	                      </div>
	                    </div>
	                    <!--/span--> 
	                  </div>
	                  <!--/row-->
	                  <div class="row">
	                    <div class="col-md-6">
	                      <div class="form-group">
	                        <label class="control-label col-md-2">电话</label>
	                        <div class="col-md-9">
	                          <div class="form-inline">
	                          	<input type="hidden" id="contactPeoplesPhone${status.index}" name="contactPeoples[${status.index}].phone" value="${contacts.phone}">
	                            <button class="btn btn-primary btn-sm add-cphone-btn" cNum="${status.index}" type="button">添加电话</button>
	                          </div>
	                          <span class="help-block help-verify"></span> </div>
	                      </div>
	                    </div>
	                    <!--/span-->
	                    <div class="col-md-6">
	                      <div class="form-group ">
	                        <label class="control-label col-md-2">QQ</label>
	                        <div class="col-md-9">
	                          <input type="text" name="contactPeoples[${status.index}].qq" class="form-control" value="${contacts.qq}" placeholder="">
	                          <span class="help-block help-verify"></span> </div>
	                      </div>
	                    </div>
	                    <!--/span--> 
	                  </div>
	                  <!--/row-->
	                  <div class="row">
	                    <div class="col-md-6">
	                      <div class="form-group">
	                        <label class="control-label col-md-2">邮箱</label>
	                        <div class="col-md-9">
	                          <div class="form-inline">
	                            <input type="text" name="contactPeoples[${status.index}].email" class="form-control" value="${contacts.email}" placeholder="">
	                          </div>
	                          <span class="help-block help-verify"></span> </div>
	                      </div>
	                    </div>
	                    <!--/span-->
	                    <div class="col-md-6">
	                      <div class="form-group ">
	                        <label class="control-label col-md-2">地址</label>
	                        <div class="col-md-9">
	                          <input type="text" name="contactPeoples[${status.index}].address" class="form-control" value="${contacts.address}" placeholder="">
	                          <span class="help-block help-verify"></span> </div>
	                      </div>
	                    </div>
	                    <!--/span--> 
	                  </div>
	                  <!--/row-->
	                  <div class="row">
	                    <div class="col-md-6">
	                      <div class="form-group">
	                        <label class="control-label col-md-2">地区</label>
	                        <div class="col-md-9"> 
	                          <input type="hidden" id="contactLocations${status.index}" name="contactPeoples[${status.index}].locationNames">
	                          <input type="hidden" id="contactLocationsCodes${status.index}" name="contactPeoples[${status.index}].locationCodes" 
	                          	value="${contacts.locationCodes}" >
	                          <a href='javascript:void(0)' class='show-contact-location' cNum='${status.index}'>选择地区</a>
	                          <div class="contact-location form-actions" style="display: none;">
	                          	<div>您还未选择供应商的经营地区</div>
	                          	<br />
	                          	<br />
	                          	<div style="float:right"><a href='javascript:void(0)' class='show-contact-location' cnum='0'>确定</a></div>
	                          </div>
	                          <span class="help-block help-verify"></span> </div>
	                      </div>
	                    </div>
	                    <!--/span-->
	                    <div class="col-md-6">
	                      <div class="form-group">
	                        <label class="control-label col-md-2">备注</label>
	                        <div class="col-md-9">
	                          <input type="text" name="contactPeoples[${status.index}].note" class="form-control" value="${contacts.note}" placeholder="">
	                          <span class="help-block help-verify"></span> </div>
	                      </div>
	                    </div>
	                    <!--/span--> 
	                  </div>
	                  <!--/row-->
	                  <h3></h3>
	                </div>
                  </c:forEach>
                <!-- END 联系人列表 -->
                  <button id="addContactBtn" cNum="0" class="btn btn-primary btn-sm" type="button" value="添加联系人">添加联系人</button>
                </div>
                <!-- END tab_1--> 
                
                <!-- BEGIN tab_2 -->
                <div class="tab-pane" id="tab_2">
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label class="control-label col-md-2">登录名</label>
                        <div class="col-md-9">
                          <input type="text" id="userLoginName" name="user.loginname" class="form-control" value="${company.user.loginname}"
                          	<c:if test="${company.user.globalId!=0 &&company.user.loginname!=null && company.user.loginname!='' }">Readonly</c:if> placeholder="">
                          <input type="hidden" id="globalId" name="user.globalId" value="${company.user.globalId}">
                          <span class="help-block help-verify"></span></div>
                      </div>
                    </div>
                    <!--/span-->
                    <div class="col-md-6">
                      <div class="form-group">
                        <label class="control-label col-md-2">手机</label>
                        <div class="col-md-9">
                          <input type="text" id="userMobilePhone" name="user.mobilePhone" class="form-control" value="${company.user.mobilePhone}" 
                          	<c:if test="${company.user.globalId!=0 &&company.user.mobilePhone!=null && company.user.mobilePhone!='' }">Readonly</c:if> placeholder="">
                          <span class="help-block help-verify"></span> </div>
                      </div>
                    </div>
                    <!--/span--> 
                  </div>
                  <!--/row-->
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label class="control-label col-md-2">邮箱</label>
                        <div class="col-md-9">
                          <input type="text" id="userEmail" name="user.email" class="form-control" value="${company.user.email}" 
                            <c:if test="${company.user.globalId!=0 &&company.user.email!=null && company.user.email!='' }">Readonly</c:if> placeholder="">
                          <span class="help-block help-verify"></span></div>
                      </div>
                    </div>
                    <!--/span-->
                    <div class="col-md-6">
                      <div class="form-group has-error">
                        <div class="col-md-9"><span class="help-block help-verify"></span></div>
                      </div>
                    </div>
                    <!--/span--> 
                  </div>
                  <!--/row--> 
                </div>
                <!-- END tab_2 --> 
              </div>
            </div>
          </div>
          <div class="form-actions ">
            <div class="col-md-offset-3 col-md-9">
              <button id="saveBtn" type="button" class="btn green">保存信息</button>
              <!-- <button type="button" class="btn default">Cancel</button> --> 
            </div>
          </div>
        </form>
        <!-- END FORM--> 
      </div>
      <!-- END VALIDATION STATES--> 
    </div>
  </div>
</div>
<!-- END PAGE CONTENT-->
