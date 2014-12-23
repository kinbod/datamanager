
function init(){
	
	//将地区和类别串清空
    $("#seldutyformType").val("");
	$("#seldutyformPro").val("");
	$("#dutyformCityDiv").html("");
	$("#dutyformTypeDiv").html("");
	
	$("#selengformType").val("");
	$("#selengformCity").val("");
	$("#engformCityDiv").html("");
	$("#engformTypeDiv").html("");
}
//点击设置运费税金/工程折扣初始化供应商经营省和类别
function getCompanyData(provinceId,typeId){
	$.ajax({
		url :pathHeader+"/dutyFre/getCompanyProType",
		data:"companyId="+companyId,
		dataType:"json",
		success:function(data) {
			//清空控件内容
			$("#"+provinceId).empty();
			$("#"+typeId).empty();
			//jquery解析map数据
	        $.each(data,function(key,value){
	        	if(key=="proList"){
	        		//添加省
	        		$("#"+provinceId).append("<option value='"+provinceId+"All'>全部</option>");
	    			jQuery.each(value,function(i,areaEach){
	    				var valueOption = areaEach.areaCode;
	    				var text = areaEach.name;
	    				$("#"+provinceId).append("<option value='"+valueOption+"'>"+text+"</option>");
	    			});
	        	}else{
	        		//添加经营类别
	        		$("#"+typeId).append("<option value='"+typeId+"All'>全部</option>");
	    			jQuery.each(value,function(i,typeEach){
	    				var valueOption = typeEach.id;
	    				var text = typeEach.description;
	    				$("#"+typeId).append("<option value='"+valueOption+"'>"+text+"</option>");
	    			});
	        	}
	        });
 	 	}
	});
}
function isShowEng(){
	var value =  $("input[name='isExistEng']:checked").val();
	if(value=='1'){
		$('#discountPercent').val("");
		$('#discountPercent').attr('disabled',true);
	}else{
		$('#discountPercent').attr('disabled',false);
	}
	
}
//按经营省ID取经营市
function getOperateArea(provinceId,cityId){
	$("#"+cityId).empty();
	var url ="";
	if(provinceId=="dutyformPro"||provinceId=="engformPro"){
	    url =pathHeader+"/dutyFre/setCity.do?companyId="+companyId;
	}
	getLocArea(provinceId,cityId,url);
}

//点击一键添加经营地区所触发的事件
function addAllArea(cityId){
	$("#"+cityId+"Div").show();
	var className=cityId+"cla";
	$.ajax({
		url :pathHeader+"/dutyFre/addAll",
		data:"companyId="+companyId,
		dataType:"json",
		success:function(data) {
			var optionHtml = "";
			jQuery.each(data,function(i,area){
				var value = area.areaCode;
				var text = area.name;
				optionHtml+="<lable class='"+className+"' id='"+value+"'>"+text+"<a href=javascript:void(0) onclick=delElement('"+value+"','"+className+"')>X</a> </lable>";
			});
			$("#"+cityId+"Div").html(optionHtml);
 	 	}
	});
}
//点击增加经营地区所触发的事件
function insertArea(firstId,secondId){
	var  provinceIndex = jQuery("#"+firstId+" option:selected").val();
	var  cityIndex = jQuery("#"+secondId+" option:selected").val();
	var  provinceValue = jQuery("#"+firstId+" option:selected").text();
	var  cityValue =jQuery("#"+secondId+" option:selected").text();
	if(provinceIndex==null||provinceIndex==firstId+"All"||cityIndex==null){
		alert("请选择经营地区！");
		return;
	}
	var className = secondId+"cla";
	$("#"+secondId+"Div").show();
	if(cityIndex==secondId+"All"){
		var i=1;
		$("#"+secondId+" option").each(function(){
			if(i==1){
				i++;
				return true;
			}
			var cityCode = $(this).val();
			if(isExit(cityCode,className)){
				$("#"+secondId+"Div").append("<lable class='"+className+"' id='"+cityCode+"'>"+provinceValue+"-"+$(this).text()+"<a href=javascript:void(0) onclick=delElement('"+cityCode+"','"+className+"')>x</a></lable>");
			}else{
				i++;
				return true;
			}
			i++;
		});
	}else{
		if(isExit(cityIndex,className)){
			$("#"+secondId+"Div").append("<lable class='"+className+"' id='"+cityIndex+"'>"+provinceValue+"-"+cityValue+"<a href=javascript:void(0) onclick=delElement('"+cityIndex+"','"+className+"')>x</a></lable>");
		}
	}
}
//判断编码是否重复
function isExit(cityCode,className){
	var proCity = $('.'+className);
	for(i=0;i<proCity.length;i++){
		if(cityCode==proCity.eq(i).attr("id")){
			return false;
		}
	}
	return true;
}
//选择含时text可编辑，选择不含的时 text不可编辑
function checkIsInclude(radioName,textName){
	var value =  $("input[name='"+radioName+"']:checked").val();
	if(value==0){
		$('#'+textName).val("");
		$('#'+textName).attr('disabled',true);
		if(radioName=='isDuty'){
			$('#dutyPoint').val("");
			$('#dutyPoint').attr('disabled',true);
		}
	}else{
		$('#'+textName).attr('disabled',false);
		if(radioName=='isDuty'){
			$('#dutyPoint').attr('disabled',false);
		}
	}
}
//点击增加经营类别所触发的事件
function addComType(typeId){
	var  comTpyeIndex = $("#"+typeId+" option:selected").val();
	var  comTpyeValue = $("#"+typeId+" option:selected").text();
	var typeDiv = typeId+"Div";
	var typeClass = typeId+"cla";
	$("#"+typeId+"Div").show();
	if(comTpyeIndex==typeId+"All"){
		$("#"+typeDiv).html("");
		var i=1;
		$("#"+typeId+" option").each(function(){
			if(i==1){
				i++;
				return true;
			}
			var typeCode = $(this).val();
			if(isExit(typeCode,typeClass)){
				$("#"+typeDiv).append("<lable  class='"+typeClass+"' id='"+typeCode+"'>"+$(this).text()+"<a href=javascript:void(0) onclick=delElement('"+typeCode+"','"+typeClass+"')>x</a></lable>");
			}else{
				i++;
				return true;
			}
			i++;
		});
	}else{
		if(isExit(comTpyeIndex,typeClass)){
			$("#"+typeDiv).append("<lable class='"+typeClass+"' id='"+comTpyeIndex+"'>"+comTpyeValue+"<a href=javascript:void(0) onclick=delElement('"+comTpyeIndex+"','"+typeClass+"')>x</a></lable>");
		}
		
	}
}
function getCityOrTypeStr(className){
	var proCity = $('.'+className);
	var str = "";
	for(i=0;i<proCity.length;i++){
		str+=proCity.eq(i).attr("id")+",";
	}
	return str;	
}
//设置运费税金 点击保存所触发的事件
function saveDutyFre(){
	if(!$("#dutyFreightForm").valid()){
		return ;
	}
	if($("#dutyformCityDiv").html()==""||$("#dutyformTypeDiv").html()==""){
		alert("请选择经营地区或经营类别！");
		return;
	}
	$("#seldutyformPro").val(getCityOrTypeStr("dutyformCitycla"));
	$("#seldutyformType").val(getCityOrTypeStr("dutyformTypecla"));
 	var dataStr =$("#dutyFreightForm").formSerialize();
 	$("#dutySave").text("正在保存...");
	$.ajax({
		type:"POST",
		url :pathHeader+"/dutyFre/saveDutyFre",
		data:dataStr,
		dataType:"json",
		success:function(flag) {
			$("#dutySave").text("保       存");
			if(flag==0){
				init();
				alert("保存失敗！");
			}else{
				init();
				alert("保存成功！");
			}
 	 	}
	});	
}
//设置工程折扣，点击保存所触发的事件
function saveEngDiscount(){
	
	if(!$("#engDiscountForm").valid()){
		return ;
	}
	if($("#engformCityDiv").html()==""||$("#engformTypeDiv").html()==""){
		alert("请选择经营地区或经营类别！");
		return;
	}
	$("#selengformPro").val(getCityOrTypeStr("engformCitycla"));
	$("#selengformType").val(getCityOrTypeStr("engformTypecla"));
 	var dataStr =$("#engDiscountForm").formSerialize();
 	$("#engSave").text("正在保存...");
	$.ajax({
		type:"POST",
		url :pathHeader+"/engDiscount/saveEngDiscount",
		data:dataStr,
		dataType:"json",  
		success:function(flag) {
			$("#engSave").text("保      存");
			if(flag==0){
				init();
				alert("保存失敗！");
			}else{
				init();
				alert("保存成功！");
			}
 	 	}
	});	
}
//删除元素  所触发事件
function delElement(cityCode,className){
	$('.'+className).remove("#"+cityCode);
}
 function initDutyProvince(areaId){
	 clearSel(document.getElementById(areaId));
	 $.ajax({
			url :pathHeader+"/dutyFre/initDutyProvince",
			data:"companyId="+companyId,
			dataType:"json",
			success:function(dutyPro) {
				setArea(dutyPro,areaId); 
	 	 	}
		});	
 }