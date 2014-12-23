/**
 * 
 */

var TableAjax = function () {

    return {

        // main function to initiate the module
        init: function () {
            
            if (!jQuery().dataTable) {
                return;
            }

            // begin first table
            $('#example').dataTable({
                "bProcessing": true,
                "bServerSide": false,
                "bRetrieve": true,
                //"sAjaxSource": "/quota/commdata",
                // set the initial value
                "iDisplayLength": 10,
                "sAjaxDataProp": "aaData",
                "sPaginationType": "bootstrap",
                "bPaginate" : true,
                "bStateSave" : false,
                "oLanguage": {
                    "sProcessing": '<i class="fa fa-coffee"></i>&nbsp;Please wait...',
                    "sLengthMenu": "_MENU_ records",
                    "oPaginate": {
                        "sPrevious": "Prev",
                        "sNext": "Next"
                    }
                },
                "aoColumnDefs": [
                                 {
                                   "mData": null,
                                   "sTitle": "#",
                                   "sDefaultContent": "index",
                                   "bSortable": false,
                                   "bSearchable": false,
                                   "aTargets": [ 0 ]
                                 },
                                 {
                                	 "mData": null,
                                	 "sTitle": "Edit",
                                	 "sDefaultContent": "编辑",
                                	 "bSortable": false,
                                	 "bSearchable": false,
                                	 "aTargets": [ 5 ]
                                 },
                                 {
                                	 "mData": null,
                                	 "sTitle": "view",
                                	 "sDefaultContent": "查看材料",
                                	 "bSortable": false,
                                	 "bSearchable": false,
                                	 "aTargets": [ 6 ]
                                 },
                                 {
                                	 "mData": null,
                                	 "sTitle": "oprt",
                                	 "sDefaultContent": "删除",
                                	 "bSortable": false,
                                	 "bSearchable": false,
                                	 "aTargets": [ 7 ]
                                 },
                                 {
                                	 "mData": null,
                                	 "sTitle": "hide",
                                	 "sDefaultContent": "隐藏",
                                	 "bSortable": false,
                                	 "bSearchable": false,
                                	 "aTargets": [ 8 ]
                                 },
                               ],
                               
                "aoColumns": [
                            { "mData": "index" },
                            { "mData": "name" },
                            { "mData": "locName" },
                            { "mData": "normCount" },
                            { "mData": "updated_at" },
                            { "mData": "edit"},
                            { "mData": "view"},
                            { "mData": "oprt"},
                            { "mData": "hide"}
                             ],
                 "fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
                	 
                              $('td:eq(0)', nRow).html( iDisplayIndexFull );
                              
                          }
            });
            
        },
        //重新获取数据表的引用
        retriveTable:function(){
        	return $('#example').dataTable();
        }
    };
      
}();


var areaData = function() {
	var dropdata = [];
	$.ajax({
		type : "GET",
		url : "/quota/locations",
		dataType : "json",
		async : false,
		success : function(data) {
			$.each( data, function(i, n){
				dropdata.push({id:n.area_code,text:n.name});
				});
		}
	});
	return dropdata;
}();

var DropdownUpload = function() {
	
	return {
		init : function() {
			$("#normareaforupload").select2({
		        placeholder: "请选择地区",
		        data: areaData
		    });
			$("#normareaforlook").select2({
				placeholder: "请选择地区",
				data: areaData
			});
		},
		retriveUpload : function() {
			return $("#normareaforupload").select2();
		},
		retriveLook:function(){
			return $("#normareaforlook").select2();
		},
		getUploadvalue:function(){
			return $("#normareaforupload").select2("val");
		},
		setUploadvalue:function(val){
			//val is the id of the dropdown data.
			$("#normareaforupload").select2("val",val);
		},
		getLookvalue:function(){
			return $("#normareaforlook").select2("val");
		},
		setLookvalue:function(val){
			$("#normareaforlook").select2("val",val);
		}
	}
}();

$(document).ready(function(){
	
	
	//init datatable
	TableAjax.init();
	DropdownUpload.init();
	//DropdownUpload.setUploadvalue("北京市");
	
	//$("#normareaforupload").select2("val","北京市");
	
	
	//reload table by ajax
	$("#lookup").click(function(){
		
		//retrive the datatable's reffer
		var table = TableAjax.retriveTable();
		
		//get the user inputing quotaName
		var qName = $("#quotaName").val();
	
		//get the user selected quota area
		var qArea = DropdownUpload.getLookvalue();
		if (!qName && !qArea) {
			return;
		}
		// reload table with ajax
		var reloadUrl = "/quota/commdata?qName=" + qName + "&qArea=" + qArea;
		reloadUrl = encodeURI(reloadUrl);
		table.fnReloadAjax(reloadUrl);
	});
});