	
$(function(){
	$('#input_startDate').val('2013-04-01');
	$('#input_endDate').val(new Date().format('yyyy-MM-dd'));
	submitForm();
});

function submitForm(){
	var startDate = $('#input_startDate').val().trim();
	var endDate = $('#input_endDate').val().trim();
	var params = {};
	if(startDate && startDate != null){
		params.startDate = startDate + ' 00:00:00';
	}
	if(endDate && endDate != null){
		params.endDate = endDate + ' 23:59:59';
	}
	if( params.startDate || params.endDate ){
		//设置时间
		$('#span_start_date').html(startDate);
		$('#span_end_date').html(endDate);
		
		$("#maskDiv").show();
		$.ajax({
			url: pathHeader +  '/company_expend_report/operateExpandDataProgressReportList',
			type:'POST',
			dataType:'JSON',
			data: params,
			success: function(result){
				var list = result.list;
				var tbody = $('#tbody_operate_expand_data_progress_report');
				var tbodyHtml = '';
				if(list && list.length > 0){
					//$('#tmpl_operate_expand_data_progress_report').tmpl(list).appendTo(  $('#tbody_operate_expand_data_progress_report') ).html("");
					var sum_intoAuditTotal = 0;
					var sum_waitAuditTotal = 0;
					var sum_auditThroughTotal = 0;
					var sum_auditNotByTotal = 0;
					var sum_cityAuditTotal = 0;
					var sum_pendingETotal = 0;
					var sum_productPendingTotal = 0;
					var sum_productReviewFailedTotal = 0;
					var sum_productReleasedTotal = 0;
					var sum_productReleasedNumTotal = 0;
					
					$.each(list, function(){
						/*tbodyHtml += '<tr>';
						
						tbodyHtml += '<td>'+this.opersGroup.groupName+'</td>';
						
						tbodyHtml += '<td>'+this.countExpendSubmit.length+'</td>';
						
						tbodyHtml += '<td>'+this.countCompanyOfAuditWaiting.length+'</td>';
						tbodyHtml += '<td>'+this.countCompanyOfAuditPass.length+'</td>';
						tbodyHtml += '<td>'+this.countCompanyOfAuditNoPass.length+'</td>';
						
						tbodyHtml += '<td>'+this.countCityExpendSubmit.length+'</td>';
						
						tbodyHtml += '<td style="border-width: 0px;" ></td>';
						tbodyHtml += '<td>'+this.countCompanyOfEWaiting.length+'</td>';
						
						tbodyHtml += '<td>'+this.countCompanyOfProductNotReleasedWithAuditWaiting.length+'</td>';
						tbodyHtml += '<td>'+this.countCompanyOfProductNotReleasedWithAuditNoPass.length+'</td>';
						
						tbodyHtml += '<td>'+this.countCompanyOfProductReleased.length+'</td>';
						tbodyHtml += '<td>'+this.countProductOfProductReleased.length+'</td>';
						
						tbodyHtml += '</tr>';*/
						
						sum_intoAuditTotal += this.intoAuditTotal;
						sum_waitAuditTotal += (this.intoAuditTotal - this.auditThroughTotal - this.auditNotByTotal) ;
						sum_auditThroughTotal += this.auditThroughTotal;
						sum_auditNotByTotal += this.auditNotByTotal;
						sum_cityAuditTotal += this.cityAuditTotal;
						sum_pendingETotal += this.pendingETotal;
						sum_productPendingTotal += this.productPendingTotal;
						sum_productReviewFailedTotal += this.productReviewFailedTotal;
						sum_productReleasedTotal += this.productReleasedTotal;
						sum_productReleasedNumTotal += this.productReleasedNumTotal;
						
						tbodyHtml += '<tr>';
						
						tbodyHtml += '<td>'+this.groupName+'</td>';
						
						tbodyHtml += '<td>'+this.intoAuditTotal+'</td>';
						
						tbodyHtml += '<td>'+ (this.intoAuditTotal - this.auditThroughTotal - this.auditNotByTotal) +'</td>';
						tbodyHtml += '<td>'+this.auditThroughTotal+'</td>';
						tbodyHtml += '<td>'+this.auditNotByTotal+'</td>';
						
						tbodyHtml += '<td>'+this.cityAuditTotal+'</td>';
						
						tbodyHtml += '<td style="border-width: 0px;" ></td>';
						tbodyHtml += '<td>'+this.pendingETotal+'</td>';
						
						tbodyHtml += '<td>'+this.productPendingTotal+'</td>';
						tbodyHtml += '<td>'+this.productReviewFailedTotal+'</td>';
						
						tbodyHtml += '<td>'+this.productReleasedTotal+'</td>';
						tbodyHtml += '<td>'+this.productReleasedNumTotal+'</td>';
						
						tbodyHtml += '</tr>';
						
					});
					
					//合计行
					tbodyHtml += '<tr>';
					
					tbodyHtml += '<td>合计</td>';
					
					tbodyHtml += '<td>'+sum_intoAuditTotal+'</td>';
					
					tbodyHtml += '<td>'+ sum_waitAuditTotal +'</td>';
					tbodyHtml += '<td>'+sum_auditThroughTotal+'</td>';
					tbodyHtml += '<td>'+sum_auditNotByTotal+'</td>';
					
					tbodyHtml += '<td>'+sum_cityAuditTotal+'</td>';
					
					tbodyHtml += '<td style="border-width: 0px;" ></td>';
					tbodyHtml += '<td>'+sum_pendingETotal+'</td>';
					
					tbodyHtml += '<td>'+sum_productPendingTotal+'</td>';
					tbodyHtml += '<td>'+sum_productReviewFailedTotal+'</td>';
					
					tbodyHtml += '<td>'+sum_productReleasedTotal+'</td>';
					tbodyHtml += '<td>'+sum_productReleasedNumTotal+'</td>';
					
					tbodyHtml += '</tr>';
					
					
				}
				
				
				
				tbody.empty().html(tbodyHtml);
				$("#maskDiv").hide();
			},
			error: function(xhr){
			//	alert('请求错误:' + xhr.status);
				$("#maskDiv").hide();
			}
		});	
	}else{
		alert('请选择时间后再进行搜索');
	}
	
}
	
