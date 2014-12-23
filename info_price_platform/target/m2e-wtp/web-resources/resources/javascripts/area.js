function getLocArea(provinceId,cityId,url){
	$("#"+cityId).empty();
	var province = $("#"+provinceId).val();
	if(province=="1"){
		return;
	}
	$.ajax({
		url :url,
		data:"parentCode="+province,
		dataType:"json",
		success:function(result) {
			setArea(result,cityId); 
 	 	}
	});
}
// 清空下拉列表
function clearSel(oSelect){
	if(oSelect==null){
		return ;
	}
	while(oSelect.childNodes.length>1){
		oSelect.removeChild(oSelect.childNodes[1]);

	}	
}
//将地区显示在控件中
function setArea(result,selectId){
	var  city= document.getElementById(selectId);
	var option = new Option("全部 ",selectId+"All");
	city.options.add(option);
	jQuery.each(result, function(i, area){
	var value = area.areaCode;
	var text = area.name;
	var option = new Option(text,value);
	city.options.add(option);
	}); 
}
