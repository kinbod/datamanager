<%@ page contentType="text/html; charset=utf-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>  
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%> 
<%@ taglib uri="http://www.opensymphony.com/sitemesh/decorator" prefix="decorator"%>
<%@ taglib uri="http://www.opensymphony.com/sitemesh/page" prefix="page"%>
<!DOCTYPE html>
<!-- 
Template Name: Metronic - Responsive Admin Dashboard Template build with Twitter Bootstrap 3.0.2
Version: 1.5.4
Author: KeenThemes
Website: http://www.keenthemes.com/
Purchase: http://themeforest.net/item/metronic-responsive-admin-dashboard-template/4021469?ref=keenthemes
-->
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!--> <html lang="en" class="no-js"> <!--<![endif]-->
<!-- BEGIN HEAD -->
<head>
	<meta charset="utf-8" />
	<title><decorator:title/></title>
	<decorator:head />
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta content="width=device-width, initial-scale=1.0" name="viewport" />
	<meta content="" name="description" />
	<meta content="" name="author" />
	<meta name="MobileOptimized" content="320">
	<!-- BEGIN GLOBAL MANDATORY STYLES -->          
	<link href="${contextPath }/resources/assets/plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css"/>
	<link href="${contextPath }/resources/assets/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
	<link href="${contextPath }/resources/assets/plugins/uniform/css/uniform.default.css" rel="stylesheet" type="text/css"/>
	<!-- END GLOBAL MANDATORY STYLES -->
	<!-- BEGIN THEME STYLES --> 
	<link href="${contextPath }/resources/assets/css/style-metronic.css" rel="stylesheet" type="text/css"/>
	<link href="${contextPath }/resources/assets/css/style.css" rel="stylesheet" type="text/css"/>
	<link href="${contextPath }/resources/assets/css/style-responsive.css" rel="stylesheet" type="text/css"/>
	<link href="${contextPath }/resources/assets/css/plugins.css" rel="stylesheet" type="text/css"/>
	<link href="${contextPath }/resources/assets/css/themes/default.css" rel="stylesheet" type="text/css" id="style_color"/>
	<link href="${contextPath }/resources/assets/css/custom.css" rel="stylesheet" type="text/css"/>
	<!-- END THEME STYLES -->
	<link rel="shortcut icon" href="favicon.ico" />

	<!-- put top  -->
	<script src="${contextPath }/resources/assets/plugins/jquery-1.10.2.min.js" type="text/javascript"></script>
</head>
<!-- END HEAD -->
<!-- BEGIN BODY -->
<body class="page-header-fixed">
	<!-- BEGIN HEADER -->   
	<div class="header navbar navbar-inverse navbar-fixed-top">
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
<!-- 				BEGIN NOTIFICATION DROPDOWN -->
<!-- 				<li class="dropdown" id="header_notification_bar"> -->
<!-- 					<a href="#" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" -->
<!-- 						data-close-others="true"> -->
<!-- 					<i class="fa fa-warning"></i> -->
<!-- 					<span class="badge">6</span> -->
<!-- 					</a> -->
<!-- 					<ul class="dropdown-menu extended notification"> -->
<!-- 						<li> -->
<!-- 							<p>You have 14 new notifications</p> -->
<!-- 						</li> -->
<!-- 						<li> -->
<!-- 							<ul class="dropdown-menu-list scroller" style="height: 250px;"> -->
<!-- 								<li>   -->
<!-- 									<a href="#"> -->
<!-- 									<span class="label label-icon label-success"><i class="fa fa-plus"></i></span> -->
<!-- 									New user registered.  -->
<!-- 									<span class="time">Just now</span> -->
<!-- 									</a> -->
<!-- 								</li> -->
<!-- 								<li>   -->
<!-- 									<a href="#"> -->
<!-- 									<span class="label label-icon label-danger"><i class="fa fa-bolt"></i></span> -->
<!-- 									Server #12 overloaded.  -->
<!-- 									<span class="time">15 mins</span> -->
<!-- 									</a> -->
<!-- 								</li> -->
<!-- 								<li>   -->
<!-- 									<a href="#"> -->
<!-- 									<span class="label label-icon label-warning"><i class="fa fa-bell-o"></i></span> -->
<!-- 									Server #2 not responding. -->
<!-- 									<span class="time">22 mins</span> -->
<!-- 									</a> -->
<!-- 								</li> -->
<!-- 								<li>   -->
<!-- 									<a href="#"> -->
<!-- 									<span class="label label-icon label-info"><i class="fa fa-bullhorn"></i></span> -->
<!-- 									Application error. -->
<!-- 									<span class="time">40 mins</span> -->
<!-- 									</a> -->
<!-- 								</li> -->
<!-- 								<li>   -->
<!-- 									<a href="#"> -->
<!-- 									<span class="label label-icon label-danger"><i class="fa fa-bolt"></i></span> -->
<!-- 									Database overloaded 68%.  -->
<!-- 									<span class="time">2 hrs</span> -->
<!-- 									</a> -->
<!-- 								</li> -->
<!-- 								<li>   -->
<!-- 									<a href="#"> -->
<!-- 									<span class="label label-icon label-danger"><i class="fa fa-bolt"></i></span> -->
<!-- 									2 user IP blocked. -->
<!-- 									<span class="time">5 hrs</span> -->
<!-- 									</a> -->
<!-- 								</li> -->
<!-- 								<li>   -->
<!-- 									<a href="#"> -->
<!-- 									<span class="label label-icon label-warning"><i class="fa fa-bell-o"></i></span> -->
<!-- 									Storage Server #4 not responding. -->
<!-- 									<span class="time">45 mins</span> -->
<!-- 									</a> -->
<!-- 								</li> -->
<!-- 								<li>   -->
<!-- 									<a href="#"> -->
<!-- 									<span class="label label-icon label-info"><i class="fa fa-bullhorn"></i></span> -->
<!-- 									System Error. -->
<!-- 									<span class="time">55 mins</span> -->
<!-- 									</a> -->
<!-- 								</li> -->
<!-- 								<li>   -->
<!-- 									<a href="#"> -->
<!-- 									<span class="label label-icon label-danger"><i class="fa fa-bolt"></i></span> -->
<!-- 									Database overloaded 68%.  -->
<!-- 									<span class="time">2 hrs</span> -->
<!-- 									</a> -->
<!-- 								</li> -->
<!-- 							</ul> -->
<!-- 						</li> -->
<!-- 						<li class="external">    -->
<!-- 							<a href="#">See all notifications <i class="m-icon-swapright"></i></a> -->
<!-- 						</li> -->
<!-- 					</ul> -->
<!-- 				</li> -->
<!-- 				END NOTIFICATION DROPDOWN -->
<!-- 				BEGIN INBOX DROPDOWN -->
<!-- 				<li class="dropdown" id="header_inbox_bar"> -->
<!-- 					<a href="#" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" -->
<!-- 						data-close-others="true"> -->
<!-- 					<i class="fa fa-envelope"></i> -->
<!-- 					<span class="badge">5</span> -->
<!-- 					</a> -->
<!-- 					<ul class="dropdown-menu extended inbox"> -->
<!-- 						<li> -->
<!-- 							<p>You have 12 new messages</p> -->
<!-- 						</li> -->
<!-- 						<li> -->
<!-- 							<ul class="dropdown-menu-list scroller" style="height: 250px;"> -->
<!-- 								<li>   -->
<!-- 									<a href="inbox.html?a=view"> -->
<%-- 									<span class="photo"><img src="${contextPath }/resources/assets/img/avatar2.jpg" alt=""/></span> --%>
<!-- 									<span class="subject"> -->
<!-- 									<span class="from">Lisa Wong</span> -->
<!-- 									<span class="time">Just Now</span> -->
<!-- 									</span> -->
<!-- 									<span class="message"> -->
<!-- 									Vivamus sed auctor nibh congue nibh. auctor nibh -->
<!-- 									auctor nibh... -->
<!-- 									</span>   -->
<!-- 									</a> -->
<!-- 								</li> -->
<!-- 								<li>   -->
<!-- 									<a href="inbox.html?a=view"> -->
<%-- 									<span class="photo"><img src="${contextPath }/resources/assets/img/avatar3.jpg" alt=""/></span> --%>
<!-- 									<span class="subject"> -->
<!-- 									<span class="from">Richard Doe</span> -->
<!-- 									<span class="time">16 mins</span> -->
<!-- 									</span> -->
<!-- 									<span class="message"> -->
<!-- 									Vivamus sed congue nibh auctor nibh congue nibh. auctor nibh -->
<!-- 									auctor nibh... -->
<!-- 									</span>   -->
<!-- 									</a> -->
<!-- 								</li> -->
<!-- 								<li>   -->
<!-- 									<a href="inbox.html?a=view"> -->
<%-- 									<span class="photo"><img src="${contextPath }/resources/assets/img/avatar1.jpg" alt=""/></span> --%>
<!-- 									<span class="subject"> -->
<!-- 									<span class="from">Bob Nilson</span> -->
<!-- 									<span class="time">2 hrs</span> -->
<!-- 									</span> -->
<!-- 									<span class="message"> -->
<!-- 									Vivamus sed nibh auctor nibh congue nibh. auctor nibh -->
<!-- 									auctor nibh... -->
<!-- 									</span>   -->
<!-- 									</a> -->
<!-- 								</li> -->
<!-- 								<li>   -->
<!-- 									<a href="inbox.html?a=view"> -->
<%-- 									<span class="photo"><img src="${contextPath }/resources/assets/img/avatar2.jpg" alt=""/></span> --%>
<!-- 									<span class="subject"> -->
<!-- 									<span class="from">Lisa Wong</span> -->
<!-- 									<span class="time">40 mins</span> -->
<!-- 									</span> -->
<!-- 									<span class="message"> -->
<!-- 									Vivamus sed auctor 40% nibh congue nibh... -->
<!-- 									</span>   -->
<!-- 									</a> -->
<!-- 								</li> -->
<!-- 								<li>   -->
<!-- 									<a href="inbox.html?a=view"> -->
<%-- 									<span class="photo"><img src="${contextPath }/resources/assets/img/avatar3.jpg" alt=""/></span> --%>
<!-- 									<span class="subject"> -->
<!-- 									<span class="from">Richard Doe</span> -->
<!-- 									<span class="time">46 mins</span> -->
<!-- 									</span> -->
<!-- 									<span class="message"> -->
<!-- 									Vivamus sed congue nibh auctor nibh congue nibh. auctor nibh -->
<!-- 									auctor nibh... -->
<!-- 									</span>   -->
<!-- 									</a> -->
<!-- 								</li> -->
<!-- 							</ul> -->
<!-- 						</li> -->
<!-- 						<li class="external">    -->
<!-- 							<a href="inbox.html">See all messages <i class="m-icon-swapright"></i></a> -->
<!-- 						</li> -->
<!-- 					</ul> -->
<!-- 				</li> -->
<!-- 				END INBOX DROPDOWN -->
<!-- 				BEGIN TODO DROPDOWN -->
<!-- 				<li class="dropdown" id="header_task_bar"> -->
<!-- 					<a href="#" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true"> -->
<!-- 					<i class="fa fa-tasks"></i> -->
<!-- 					<span class="badge">5</span> -->
<!-- 					</a> -->
<!-- 					<ul class="dropdown-menu extended tasks"> -->
<!-- 						<li> -->
<!-- 							<p>You have 12 pending tasks</p> -->
<!-- 						</li> -->
<!-- 						<li> -->
<!-- 							<ul class="dropdown-menu-list scroller" style="height: 250px;"> -->
<!-- 								<li>   -->
<!-- 									<a href="#"> -->
<!-- 									<span class="task"> -->
<!-- 									<span class="desc">New release v1.2</span> -->
<!-- 									<span class="percent">30%</span> -->
<!-- 									</span> -->
<!-- 									<span class="progress"> -->
<!-- 									<span style="width: 40%;" class="progress-bar progress-bar-success" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"> -->
<!-- 									<span class="sr-only">40% Complete</span> -->
<!-- 									</span> -->
<!-- 									</span> -->
<!-- 									</a> -->
<!-- 								</li> -->
<!-- 								<li>   -->
<!-- 									<a href="#"> -->
<!-- 									<span class="task"> -->
<!-- 									<span class="desc">Application deployment</span> -->
<!-- 									<span class="percent">65%</span> -->
<!-- 									</span> -->
<!-- 									<span class="progress progress-striped"> -->
<!-- 									<span style="width: 65%;" class="progress-bar progress-bar-danger" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100"> -->
<!-- 									<span class="sr-only">65% Complete</span> -->
<!-- 									</span> -->
<!-- 									</span> -->
<!-- 									</a> -->
<!-- 								</li> -->
<!-- 								<li>   -->
<!-- 									<a href="#"> -->
<!-- 									<span class="task"> -->
<!-- 									<span class="desc">Mobile app release</span> -->
<!-- 									<span class="percent">98%</span> -->
<!-- 									</span> -->
<!-- 									<span class="progress"> -->
<!-- 									<span style="width: 98%;" class="progress-bar progress-bar-success" aria-valuenow="98" aria-valuemin="0" aria-valuemax="100"> -->
<!-- 									<span class="sr-only">98% Complete</span> -->
<!-- 									</span> -->
<!-- 									</span> -->
<!-- 									</a> -->
<!-- 								</li> -->
<!-- 								<li>   -->
<!-- 									<a href="#"> -->
<!-- 									<span class="task"> -->
<!-- 									<span class="desc">Database migration</span> -->
<!-- 									<span class="percent">10%</span> -->
<!-- 									</span> -->
<!-- 									<span class="progress progress-striped"> -->
<!-- 									<span style="width: 10%;" class="progress-bar progress-bar-warning" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"> -->
<!-- 									<span class="sr-only">10% Complete</span> -->
<!-- 									</span> -->
<!-- 									</span> -->
<!-- 									</a> -->
<!-- 								</li> -->
<!-- 								<li>   -->
<!-- 									<a href="#"> -->
<!-- 									<span class="task"> -->
<!-- 									<span class="desc">Web server upgrade</span> -->
<!-- 									<span class="percent">58%</span> -->
<!-- 									</span> -->
<!-- 									<span class="progress progress-striped"> -->
<!-- 									<span style="width: 58%;" class="progress-bar progress-bar-info" aria-valuenow="58" aria-valuemin="0" aria-valuemax="100"> -->
<!-- 									<span class="sr-only">58% Complete</span> -->
<!-- 									</span> -->
<!-- 									</span> -->
<!-- 									</a> -->
<!-- 								</li> -->
<!-- 								<li>   -->
<!-- 									<a href="#"> -->
<!-- 									<span class="task"> -->
<!-- 									<span class="desc">Mobile development</span> -->
<!-- 									<span class="percent">85%</span> -->
<!-- 									</span> -->
<!-- 									<span class="progress progress-striped"> -->
<!-- 									<span style="width: 85%;" class="progress-bar progress-bar-success" aria-valuenow="85" aria-valuemin="0" aria-valuemax="100"> -->
<!-- 									<span class="sr-only">85% Complete</span> -->
<!-- 									</span> -->
<!-- 									</span> -->
<!-- 									</a> -->
<!-- 								</li> -->
<!-- 								<li>   -->
<!-- 									<a href="#"> -->
<!-- 									<span class="task"> -->
<!-- 									<span class="desc">New UI release</span> -->
<!-- 									<span class="percent">18%</span> -->
<!-- 									</span> -->
<!-- 									<span class="progress progress-striped"> -->
<!-- 									<span style="width: 18%;" class="progress-bar progress-bar-important" aria-valuenow="18" aria-valuemin="0" aria-valuemax="100"> -->
<!-- 									<span class="sr-only">18% Complete</span> -->
<!-- 									</span> -->
<!-- 									</span> -->
<!-- 									</a> -->
<!-- 								</li> -->
<!-- 							</ul> -->
<!-- 						</li> -->
<!-- 						<li class="external">    -->
<!-- 							<a href="#">See all tasks <i class="m-icon-swapright"></i></a> -->
<!-- 						</li> -->
<!-- 					</ul> -->
<!-- 				</li> -->
<!-- 				END TODO DROPDOWN -->
             <!-- BEGIN USER LOGIN DROPDOWN -->
				<li class="dropdown user">
					<a href="#" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
					<img alt="" src="${contextPath }/resources/assets/img/avatar1_small.jpg"/>
					<span class="username">Bob Nilson</span>
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
		<div class="footer-tools">
			<span class="go-top">
			<i class="fa fa-angle-up"></i>
			</span>
		</div>
	</div>
	<!-- END FOOTER -->
	<!-- BEGIN JAVASCRIPTS(Load javascripts at bottom, this will reduce page load time) -->
	<!-- BEGIN CORE PLUGINS -->   
	<!--[if lt IE 9]>
	<script src="${contextPath }/resources/assets/plugins/respond.min.js"></script>
	<script src="${contextPath }/resources/assets/plugins/excanvas.min.js"></script>
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
	<script src="${contextPath }/resources/assets/scripts/custom.js"></script>
	<!-- END CORE PLUGINS -->
	<script src="${contextPath }/resources/assets/scripts/app.js"></script>
	<script>
		jQuery(document).ready(function() {    
		   App.init();
		});
	</script>
	<!-- END JAVASCRIPTS -->
</body>
<!-- END BODY -->
</html>