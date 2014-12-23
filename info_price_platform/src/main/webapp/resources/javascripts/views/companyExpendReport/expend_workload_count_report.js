	
$(function(){
	$('#input_startDate').val('2013-04-01');
	$('#input_endDate').val(new Date().format('yyyy-MM-dd'));
	//submitForm();
});

function submitForm(){
	//起始日期和结束日期
	var startDate = $('#input_startDate').val().trim();
	var endDate = $('#input_endDate').val().trim();
	//组和负责人
	var opersGroupId = $('#select_user_group').val();
	var chargeUserId = $('#select_user').val();
	
	var params = {};
	if(startDate && startDate != null){
		params.startDate = startDate + ' 00:00:00';
	}
	if(endDate && endDate != null){
		params.endDate = endDate + ' 23:59:59';
	}
	if(opersGroupId && opersGroupId != null){
		params.opersGroupId = opersGroupId;
	}
	if(chargeUserId && chargeUserId != null){
		params.chargeUserId = chargeUserId;
	}
	
	if( params.startDate || params.endDate ){
		//设置时间
		$('#span_start_date').html(startDate);
		$('#span_end_date').html(endDate);
		
		$("#maskDiv").show();
		$.ajax({
			url: pathHeader +  '/company_expend_report/expandWorkloadCountReportList',
			type:'POST',
			dataType:'JSON',
			data: params,
			success: function(result){
				var tbody = $('#tbody');
				var tbodyHtml = '';
				if(result){
					var count = 0;
					for(key in result){
						var values = result[key];
						tbodyHtml += '<tr>';
						tbodyHtml += '<td rowspan='+values.length+' >'+key+'</td>';
						
						$.each(values, function(){
							if(count++ != 0){
								tbodyHtml += '<tr>';
							}
							/*tbodyHtml += '<td>'+this.chargeUser.name+'</td>';
							
							tbodyHtml += '<td>'+this.newCompanyCount.length+'</td>';
							tbodyHtml += '<td>'+this.entryAuditCompany.length+'</td>';
							tbodyHtml += '<td>'+this.waitingAuditCompany.length+'</td>';
							tbodyHtml += '<td>'+this.passAuditCompany.length+'</td>';
							tbodyHtml += '<td>'+this.notPassAuditCompany.length+'</td>';
							tbodyHtml += '<td>'+ (this.firstPassRate == null ? '0' : this.firstPassRate) +'</td>';*/
							
							tbodyHtml += '<td>'+this.chargeUserName+'</td>';
							tbodyHtml += '<td>'+this.newTotal+'</td>';
							tbodyHtml += '<td>'+this.intoAuditTotal+'</td>';
							tbodyHtml += '<td>'+this.waitAuditTotal+'</td>';
							tbodyHtml += '<td>'+this.auditThroughTotal+'</td>';
							tbodyHtml += '<td>'+this.onePassTotal+'</td>';
							tbodyHtml += '<td>'+this.auditNotByTotal+'</td>';
							tbodyHtml += '<td>'+this.firstPassRate+'</td>';
							
							tbodyHtml += '</tr>';
						});
						
						count = 0;
					}
					//$('#tmpl_operate_expand_data_progress_report').tmpl(list).appendTo(  $('#tbody_operate_expand_data_progress_report') ).html("");
				}
				tbody.empty().html(tbodyHtml);
				$("#maskDiv").hide();
			},
			error: function(xhr){
				//alert('请求错误:' + xhr.status);
				$("#maskDiv").hide();
			}
		});	
	}else{
		alert('请选择时间后再进行搜索');
	}
	
}
	
