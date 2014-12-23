<%@ page contentType="text/html; charset=utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<title>定额管理</title>
<div class="row">
	<div class="col-md-12">
		<!-- BEGIN PORTLET-->
		<div class="portlet box blue">
			<div class="portlet-title">
				<div class="caption">
					<i class="fa fa-reorder"></i>定额管理
				</div>
			</div>
			<div class="portlet-body">
				<!-- BEGIN FORM 1-->
				<div class="form-inline">
					<div class="form-group">
						<form class="form-inline" action="#">
							<div class="form-body">
								<div class="form-group">
									<div style="padding-top: 10px;">
										<div class="fileupload fileupload-new"
											data-provides="fileupload">
											<span class="btn default btn-file"> <span
												class="fileupload-new"><i class="fa fa-paper-clip">
												</i>选择定额文件</span> <span class="fileupload-exists"><i
													class="fa fa-undo"></i>重新选择</span> <input type="file"
												class="default" />
											</span> <span class="fileupload-preview" style="margin-left: 5px;"></span>
											<a href="#" class="close fileupload-exists"
												data-dismiss="fileupload"
												style="float: none; margin-left: 5px;"></a>
										</div>
									</div>
								</div>
								<div class="form-group">
									<input type="hidden" id="normareaforupload"
										style="width: 150px;" class="form-control select2">
								</div>
								<div class="form-group">
									<button class="btn purple" type="submit">
										<i class="fa fa-check"></i> 上传
									</button>
								</div>
							</div>
						</form>
						<!-- END FORM 1-->
					</div>

					<div class="form-group">
						<form class="form-inline">
							<div class="form-body">
								<label>查找</label>
								<div class="form-group">
									<input type="hidden" id="normareaforlook" style="width: 150px;"
										class="form-control select2">
								</div>
								<div class="form-group">
									<div class="input-group input-medium">
										<input id="quotaName" class="form-control" type="text"
											placeholder="请输入定额名称来查找"> <span
											class="input-group-btn">
											<button id="lookup" class="btn blue" type="button">搜索</button>
										</span>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- END PORTLET-->


<!-- BEGIN PAGE CONTENT-->
<div class="row">
	<div class="col-md-12">
		<!-- BEGIN EXAMPLE TABLE PORTLET-->
		<div class="portlet box blue">
			<div class="portlet-title">
				<div class="caption">
					<i class="fa fa-edit"></i>定额数据
				</div>
				<!-- 					<div class="tools"> -->
				<!-- 						<a href="javascript:;" class="collapse"></a> <a -->
				<!-- 							href="#portlet-config" data-toggle="modal" class="config"></a> <a -->
				<!-- 							href="javascript:;" class="reload"></a> <a href="javascript:;" -->
				<!-- 							class="remove"></a> -->
				<!-- 					</div> -->
			</div>
			<div class="portlet-body">
				<!-- 					<div class="table-toolbar"> -->
				<!-- 						<div class="btn-group"> -->
				<!-- 							<button id="sample_editable_1_new" class="btn green"> -->
				<!-- 								Add New <i class="fa fa-plus"></i> -->
				<!-- 							</button> -->
				<!-- 						</div> -->
				<!-- 						<div class="btn-group pull-right"> -->
				<!-- 							<button class="btn dropdown-toggle" data-toggle="dropdown"> -->
				<!-- 								Tools <i class="fa fa-angle-down"></i> -->
				<!-- 							</button> -->
				<!-- 							<ul class="dropdown-menu pull-right"> -->
				<!-- 								<li><a href="#">Print</a></li> -->
				<!-- 								<li><a href="#">Save as PDF</a></li> -->
				<!-- 								<li><a href="#">Export to Excel</a></li> -->
				<!-- 							</ul> -->
				<!-- 						</div> -->
				<!-- 					</div> -->
				<table class="table table-striped table-hover table-bordered"
					id="example">
					<thead>
						<tr>
							<th></th>
							<th>name</th>
							<th>locName</th>
							<th>normCount</th>
							<th>updated_at</th>
							<th></th>
							<th></th>
							<th></th>
							<th></th>
						</tr>
					</thead>
				</table>
			</div>
		</div>
		<!-- END EXAMPLE TABLE PORTLET-->
	</div>
</div>
<!-- END PAGE CONTENT -->

<!-- BEGIN PAGE LEVEL STYLES -->
<link rel="stylesheet" type="text/css"
	href="${contextPath }/resources/assets/plugins/select2/select2_metro.css" />
<link rel="stylesheet"
	href="${contextPath }/resources/assets/plugins/data-tables/DT_bootstrap.css" />
<link
	href="${contextPath }/resources/assets/plugins/bootstrap-fileupload/bootstrap-fileupload.css"
	rel="stylesheet" type="text/css" />
<!-- END PAGE LEVEL STYLES -->

<!-- BEGIN PAGE LEVEL PLUGINS -->
<script type="text/javascript"
	src="${contextPath }/resources/assets/plugins/select2/select2.min.js"></script>
<script type="text/javascript"
	src="${contextPath }/resources/assets/plugins/data-tables/jquery.dataTables.js"></script>
<script type="text/javascript"
	src="${contextPath }/resources/assets/plugins/data-tables/DT_bootstrap.js"></script>
<script type="text/javascript"
	src="${contextPath }/resources/assets/plugins/bootstrap-fileupload/bootstrap-fileupload.js"></script>
<!-- END PAGE LEVEL PLUGINS -->
<!-- BEGIN PAGE LEVEL SCRIPTS -->
<script type="text/javascript"
	src="${contextPath }/resources/javascripts/views/quotaMgr/quotaMgr.js"></script>
<!-- END PAGE LEVEL PLUGINS -->
<!-- END PAGE LEVEL PLUGINS -->
