<%@ page contentType="text/html; charset=utf-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>  
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%> 
<%@ taglib uri="http://www.opensymphony.com/sitemesh/decorator" prefix="decorator"%>
<%@ taglib uri="http://www.opensymphony.com/sitemesh/page" prefix="page"%>
<c:set property="application" var="contextPath" value="${pageContext.request.contextPath }" ></c:set>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <title><decorator:title/></title>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8"></meta>
    <decorator:head />
    <link rel="shortcut icon" href="/favicon.ico" />
    	<!-- BEGIN GLOBAL MANDATORY STYLES -->       
	<link href="${contextPath }/resources/assets/plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css"/>
	<link href="${contextPath }/resources/assets/plugins/bootstrap/css/bootstrap.css" rel="stylesheet" type="text/css"/>
	<link href="${contextPath }/resources/assets/plugins/uniform/css/uniform.default.css" rel="stylesheet" type="text/css"/>
	<!-- END GLOBAL MANDATORY STYLES -->
	<!-- BEGIN PAGE LEVEL PLUGIN STYLES --> 
	<link rel="stylesheet" type="text/css" href="${contextPath }/resources/assets/plugins/bootstrap-datepicker/css/datepicker.css" />
	<!-- END PAGE LEVEL PLUGIN STYLES -->
	<!-- BEGIN THEME STYLES --> 
	<link href="${contextPath }/resources/assets/css/style-metronic.css" rel="stylesheet" type="text/css"/>
	<link href="${contextPath }/resources/assets/css/style.css" rel="stylesheet" type="text/css"/>
	<link href="${contextPath }/resources/assets/css/style-responsive.css" rel="stylesheet" type="text/css"/>
	<link href="${contextPath }/resources/assets/css/plugins.css" rel="stylesheet" type="text/css"/>
	<link href="${contextPath }/resources/assets/css/pages/tasks.css" rel="stylesheet" type="text/css"/>
	<link href="${contextPath }/resources/assets/css/themes/default.css" rel="stylesheet" type="text/css" id="style_color"/>
	<link href="${contextPath }/resources/assets/css/custom.css" rel="stylesheet" type="text/css"/>
	<!-- END THEME STYLES -->
	<script src="${contextPath }/resources/assets/plugins/jquery-1.10.2.min.js" type="text/javascript"></script>
	<script src="${contextPath }/resources/javascripts/jqueryvalidate/jquery.validate.js" type="text/javascript"></script>
	<script src="${contextPath }/resources/javascripts/jqueryvalidate/messages_zh.js" type="text/javascript"></script>
	<script type="text/javascript">
	 	var pathHeader = "${contextPath }";
	</script>
	<!-- 前置公共js -->
	<script src="${contextPath }/resources/javascripts/precommon.js" type="text/javascript"></script>
	<!-- 下拉框js(zhanggy-b) -->
	<script type="text/javascript" src="${contextPath }/resources/javascripts/jquery-select.js"></script>
  </head>
    
  <body class="page-header-fixed page-sidebar-fixed">
	<!-- BEGIN HEADER -->   
	<div class="header navbar navbar-inverse navbar-fixed-top ">
		<!-- BEGIN TOP NAVIGATION BAR -->
		<div class="header-inner">
			<!-- BEGIN LOGO -->  
			<a class="navbar-brand" href="/home">
			<b>广材运营平台系统</b>
			</a>
			<!-- END LOGO -->
			<!-- BEGIN RESPONSIVE MENU TOGGLER --> 
			<a href="javascript:;" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
			<img src="${contextPath }/resources/assets/img/menu-toggler.png" alt="收起左边栏" />
			</a> 
			<!-- END RESPONSIVE MENU TOGGLER -->
			<!-- BEGIN TOP NAVIGATION MENU -->
			<ul class="nav navbar-nav pull-right">
						<li class="dropdown" id="header_task_bar">
					<a href="#" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
					<i class="fa fa-tasks"></i>
					<span class="badge no_contact_company_list_count_span"></span>
					</a>
					<ul class="dropdown-menu extended tasks">
						<li>
							<p class="no_contact_company_list_count"></p>
						</li>
						<li>
							<ul class="dropdown-menu-list scroller no_contact_company_list" style="height: 250px;">
							</ul>
						</li>
						<li class="external">   
							<a target="_blank" href="${contextPath}/company/my/list?cycles=unconnected">查看所有待维护供应商 <i class="m-icon-swapright"></i></a>
						</li>
					</ul>
				</li>			
				<!-- BEGIN USER LOGIN DROPDOWN -->
				<li class="dropdown user">
					<a href="#" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
					<span class="username">${current_user.name}</span>
					<i class="fa fa-angle-down"></i>
					</a>
					<ul class="dropdown-menu">
						<li class="divider"></li>
						<li><a href="javascript:void(0)" id="update_password_button"><i class="fa  fa-edit"></i>修改密码</a></li>
						<li><a href="javascript:;" id="trigger_fullscreen"><i class="fa fa-move"></i>全屏</a></li>
						<li><a href="/logout.jsp"><i class="fa fa-key"></i>退出</a></li>
					</ul>
				</li>
				<!-- END USER LOGIN DROPDOWN -->
			</ul>
			<!-- END TOP NAVIGATION MENU -->
		</div>
		<!-- END TOP NAVIGATION BAR -->
	</div>
	<!-- END HEADER -->
	<div class="clearfix"></div>
	<!-- BEGIN CONTAINER -->
	<div class="page-container">
		<!-- BEGIN SIDEBAR -->
		<div class="page-sidebar navbar-collapse collapse">
			<!-- BEGIN SIDEBAR MENU -->        
			<ul class="page-sidebar-menu">
				<li>
					<!-- BEGIN SIDEBAR TOGGLER BUTTON -->
					<div class="sidebar-toggler hidden-phone"></div>
					<!-- BEGIN SIDEBAR TOGGLER BUTTON -->
				</li>
				<li <c:if test="${sys_module.code==module_code}">class="active"</c:if><c:if test="${sys_module.code!=module_code}">class=""</c:if>>
					<a class="menu_item"  href="${contextPath }/home">
					<i class="fa fa-home"></i> 
					<span class="title">首页</span>
					<span class="selected"></span>
					</a>
				</li>
				
				<c:forEach items="${sys_modules}" var="sys_module">
				<li <c:if test="${sys_module.code==module_code}">class="active"</c:if><c:if test="${sys_module.code!=module_code}">class=""</c:if>>
					<a href="#">
						<i class="fa fa-home"></i> 
						<span class="title">${sys_module.name}</span>
						<span class="arrow "></span>
					</a>
					<ul class="sub-menu">
					<c:forEach items="${sys_menus}" var="sys_menu">
					<c:if test="${sys_menu.sysModuleId==sys_module.id}">
						<li <c:if test="${sys_menu.code==menu_code}">class="active"</c:if><c:if test="${sys_menu.code!=menu_code}">class=""</c:if>>
							<a href="${contextPath}${sys_menu.controllerName}">
							${sys_menu.name}</a>
						</li>
					</c:if>
					</c:forEach>
					</ul>
				</li>
				</c:forEach>

			</ul>
			<!-- END SIDEBAR MENU -->
		</div>
		</div>
		<!-- END SIDEBAR -->
		<!-- BEGIN PAGE -->
		
		<div class="page-content">
		<decorator:body />
			
		<!-- END PAGE -->
	</div>
	<!-- END CONTAINER -->
	
	<!-- BEGIN FOOTER -->
	<div class="footer">
		<div class="footer-inner">
			2014 &copy; 广联达软件股份有限公司 版权所有 2010-2015 京ICP经营许可证010052号.
		</div>
	</div>
	<!-- END FOOTER -->
	<!-- 
		<div style="position: fixed;right: 0;bottom: 0;" >
						<div class="alert alert-danger" id="need_contact_company_list_alert" style=" display:none; width: 360px;">
							<a class="close" data-dismiss="alert" href="#"  aria-hidden="true">&times;</a>
							<h3>供应商周期维护提示 <a class="pull-right" style="font-size:16px; " href="${contextPath}/company/my/list?cycles=unconnected">维护</a></h3>
							<table class="table" style="color: black;">
								<tbody id="no_contact_com_tbody">
								</tbody>
							</table>
						</div>
	 -->
	<!-- END FOOTER -->
	
	<!-- BEGIN JAVASCRIPTS(Load javascripts at bottom, this will reduce page load time) -->
	<!-- BEGIN CORE PLUGINS -->   
	<!--[if lt IE 9]>
	<script src="assets/plugins/respond.min.js"></script>
	<script src="assets/plugins/excanvas.min.js"></script> 
	<![endif]-->   
	<script src="${contextPath }/resources/assets/plugins/jquery-migrate-1.2.1.min.js" type="text/javascript"></script>   
	<!-- IMPORTANT! Load jquery-ui-1.10.3.custom.min.js before bootstrap.min.js to fix bootstrap tooltip conflict with jquery ui tooltip -->
	<script src="${contextPath }/resources/assets/plugins/jquery-ui/jquery-ui-1.10.3.custom.min.js" type="text/javascript"></script>
	<script src="${contextPath }/resources/assets/plugins/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
	<script src="${contextPath }/resources/assets/plugins/bootstrap-hover-dropdown/twitter-bootstrap-hover-dropdown.min.js" type="text/javascript" ></script>
	<script src="${contextPath }/resources/assets/plugins/jquery-slimscroll/jquery.slimscroll.min.js" type="text/javascript"></script>
	<script src="${contextPath }/resources/assets/plugins/jquery.blockui.min.js" type="text/javascript"></script>  
	<script src="${contextPath }/resources/assets/plugins/jquery.cookie.min.js" type="text/javascript"></script>
	<script src="${contextPath }/resources/assets/plugins/uniform/jquery.uniform.min.js" type="text/javascript" ></script>
	<!-- END CORE PLUGINS -->
	<!-- BEGIN PAGE LEVEL PLUGINS -->
	
	<script src="${contextPath }/resources/assets/plugins/flot/jquery.flot.js" type="text/javascript"></script>
	<script src="${contextPath }/resources/assets/plugins/flot/jquery.flot.resize.js" type="text/javascript"></script>
	
<%-- 	<script src="${contextPath }/resources/assets/plugins/bootstrap-daterangepicker/moment.min.js" type="text/javascript"></script> --%>
<%-- 	<script src="${contextPath }/resources/assets/plugins/bootstrap-daterangepicker/daterangepicker.js" type="text/javascript"></script>      --%>

	<!-- IMPORTANT! fullcalendar depends on jquery-ui-1.10.3.custom.min.js for drag & drop support -->
<%-- 	<script src="${contextPath }/resources/assets/plugins/fullcalendar/fullcalendar/fullcalendar.min.js" type="text/javascript"></script> --%>
<%--    <script type="text/javascript" src="${contextPath }/resources/assets/plugins/bootstrap-datepicker/js/bootstrap-datepicker.js"></script> --%>
<%--    <script type="text/javascript" src="${contextPath }/resources/assets/plugins/bootstrap-datepicker/js/locales/bootstrap-datepicker.zh-CN.js"></script> --%>
	<!-- END PAGE LEVEL PLUGINS -->
	 

<%-- 	<script src="${contextPath }/resources/assets/plugins/bootstrap-markdown/js/bootstrap-markdown.js" type="text/javascript" ></script> --%>
<%-- 	<script src="${contextPath }/resources/assets/plugins/bootstrap-markdown/lib/markdown.js" type="text/javascript" ></script> --%>
<%-- 	<script src="${contextPath }/resources/assets/plugins/bootstrap-maxlength/bootstrap-maxlength.min.js" type="text/javascript" ></script> --%>
<%-- 	<script src="${contextPath }/resources/assets/plugins/bootstrap-touchspin/bootstrap.touchspin.js" type="text/javascript" ></script> --%>
	
	<!-- BEGIN PAGE LEVEL SCRIPTS -->
	<script src="${contextPath }/resources/assets/scripts/app.js" type="text/javascript"></script>
	<script src="${contextPath }/resources/assets/scripts/index.js" type="text/javascript"></script>
	<script src="${contextPath }/resources/assets/scripts/tasks.js" type="text/javascript"></script>        
<%-- 	<script src="${contextPath }/resources/javascripts/form-date-pickers.js" type="text/javascript"></script>    --%>
	<!-- END PAGE LEVEL SCRIPTS -->  
<%-- 	<script src="${contextPath }/resources/javascripts/time/WdatePicker.js" type="text/javascript"></script> --%>
	<script>
		jQuery(document).ready(function() {    
		   App.init(); // initlayout and core plugins
		   //Index.init();
		   //Index.initCalendar(); // init index page's custom scripts
		   //Index.initDashboardDaterange();
		   //Index.initIntro();
		   //FormDatePickers.init();
// 		   function showNoContactCompanyList(){
// 			   $.ajax({
// 				   type: "POST",
// 				   url: "/company/nocontact/list",
// 				   success: function(msg){
// 					   if(!msg||msg.length<1){
// 						   $(".no_contact_company_list_count").html("没有需要维护的供应商");
// 						   return;
// 					   }
// 					   $(".no_contact_company_list_count_span").html(msg.length);
// 					   $(".no_contact_company_list_count").html("你当前有"+msg.length+"家供应商需要维护");
// 				     $(msg).each(function(index){
// 				    	 var $li = $("<li></li>");
// 								var $span1 = $("<a target='_blank' href='${contextPath}/company/my/list?cycles=unconnected&name="+msg[index].name+"'><span class='label label-sm label-icon label-warning'><i class='fa fa-bell-o'></i></span>"
// 																		+ msg[index].name
// 																		+ "<span class='time'>&nbsp;&nbsp;&nbsp;剩余天数："
// 																		+ msg[index].residualMaintainDays
// 																		+ "</span></a>");
// 																$li
// 																		.append($span1);
// 																$(
// 																		".no_contact_company_list")
// 																		.append(
// 																				$li);
// 															});
// 										}
// 									});
// 						}
// 						//showNoContactCompanyList();
// // 					var showDia = '${sessionScope.showNoContact}';
// // 					if(!showDia||showDia==''||showDia!='1'){
// // 						$("#header_task_bar").toggleClass("open");
// // 						setTimeout("$('#header_task_bar').removeClass('open')",3000);
// // 						getIsShow();
// // 					}
						
// 						function getIsShow(){
// 							 $.ajax({
// 								   type: "POST",
// 								   url: "/company/isShow",
// 								   success: function(msg){
// 								 		if(msg=="true"){
								 		
// 								 		}
// 														}
// 													});
							
// 						}
// 					});
		
// 		$("#update_password_button").click(function(index){
// 			$("#newPassordForm")[0].reset();
// 			$("#updatePasswordDiv").modal("show");
// 		});
// 	 	function updatePassword(){
// 	 		var oldPassword = $("#newPassordForm input[name='oldPassword']").val();
// 	 		if(oldPassword.length<1){
// 	 			alert("原密码不能为空!");
// 	 			return ;
// 	 		}
// 	 		var password = $("#newPassordForm input[name='password']").val();
// 	 		if(password.length<8||password.length>16){
// 	 			alert("新密码必须为8-16位!");
// 	 			return ;
// 	 		}
// 	 		var confirmPassword = $("#newPassordForm input[name='confirmPassword']").val();
// 	 		if(confirmPassword!=password){
// 	 			alert("两次输入密码不一致!");
// 	 			return ;
// 	 		}
// 			$.ajax({
// 				   type: "POST",
// 				   url: "/common/updmypassword?da="+new Date(),
// 				   data: $("#newPassordForm").serialize(),
// 				   success: function(msg){
// 					   if(msg=="true"){
// 						   alert("修改成功,下次登录有效");
// 						   $("#updatePasswordDiv").modal("hide");
// 					   }else{
// 						   alert(msg);
// 					   }
// 					}
// 			 });
			
		});
</script>
	<!-- 后置公共js -->
		<script src="${contextPath }/resources/javascripts/postcommon.js" type="text/javascript"></script>   
	<!-- END JAVASCRIPTS -->
	<div id="updatePasswordDiv" class="modal fade" tabindex="-1" data-width="700">
	<div class="portlet box blue modal-dialog">
		<div class="portlet-title">
			<div class="caption">
				<i class="fa fa-reorder"></i><span id="jobModalTitle">修改密码</span>
			</div>
			<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
		</div>
		<div class="portlet-body">
				<div class="form-body">
				<form id="newPassordForm"  action="" method="post"> 
					<div class="row">
						<div class="form-group">
							<label class="col-md-4 control-label">
								输入原密码
							</label>
							<div class="col-md-6">
							<input type="password" class="form-control" name="oldPassword" placeholder="原密码" />
							</div>
						</div>
					</div>
					<div class="row">
						<div class="form-group">
							<label class="col-md-4 control-label">
								输入新密码
							</label>
							<div class="col-md-6">
							<input type="password" class="form-control" name="password" placeholder="新密码" />
							</div>
						</div>
					</div>
					<div class="row">
						<div class="form-group">
							<label class="col-md-4 control-label">
								再次输入新密码
							</label>
							<div class="col-md-6">
							<input type="password" class="form-control" name="confirmPassword" placeholder="重新输入" />
							</div>
						</div>
					</div>
	
					<div class="form-group col-md-12">
						<label class="col-md-5 control-label"></label>
						<button type="button" id="update_password" onclick="updatePassword()" class="btn red">
							确定
						</button>
						<button id="btn_cancel" type="button" data-dismiss="modal" class="btn">
							取消
						</button>
						
					</div>
					</form>
				</div>
		</div>
	</div>
</div>	
</body>
</html>