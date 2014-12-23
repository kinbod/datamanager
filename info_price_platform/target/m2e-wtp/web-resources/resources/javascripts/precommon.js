	/**
	 * 时间对象的格式化;
	 */
	Date.prototype.format = function(format) {
	    /*
	     * eg:format="YYYY-MM-dd hh:mm:ss";
	     */
	    var o = {
	        "M+" :this.getMonth() + 1, // month
	        "d+" :this.getDate(), // day
	        "h+" :this.getHours(), // hour
	        "m+" :this.getMinutes(), // minute
	        "s+" :this.getSeconds(), // second
	        "q+" :Math.floor((this.getMonth() + 3) / 3), // quarter
	        "S" :this.getMilliseconds()
	    // millisecond
	    }
	 
	    if (/(y+)/.test(format)) {
	        format = format.replace(RegExp.$1, (this.getFullYear() + "")
	                .substr(4 - RegExp.$1.length));
	    }
	 
	    for ( var k in o) {
	        if (new RegExp("(" + k + ")").test(format)) {
	            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
	                    : ("00" + o[k]).substr(("" + o[k]).length));
	        }
	    }
	    return format;
	}


//分页form提交 	
function search(current_page,pageSize){
			$("#search").append($('<input type="hidden" name="currentPage"   value="1" />'));
			if(current_page&&current_page!=''){
				$("#search input[name='currentPage']").val(current_page);
			}
			if(pageSize&&pageSize!=''){
					$("#search  select[name='pageSize']").val(pageSize);
			}
			$("#search").submit();
		}
	 	/**
	 	 * 将js中不存在的属性，或者值为undefined，null转换为空字符""
	 	 */
	 	function converterUndefined2null(par){
	 		if(!par||par=="undefined"||par=="null"||par==''){
	 			return "";
	 		}
	 		return par;
	 	}
	 	//地区异步获取
		function locations(boo,selectId,tag,parentCode){
			var sl_1 ="";
			if(tag){
				sl_1 = $("option:selected",tag).val();
			}
			if(parentCode&&parentCode!=''){
				sl_1 = parentCode;
			}
			var val = $("#"+selectId).attr("value");
			$("#"+selectId).empty();
			if(boo||(sl_1&&sl_1!='')){
				if(!sl_1||sl_1==''){
					sl_1="";
				}
				if(sl_1=='1'){
					return ;
				}
				$.ajax({
					   type: "GET",
					   url: "/common/locationlist?da="+new Date(),
					   data: "parentAreaCode="+sl_1,
					   success: function(msg){
						   if(!boo){
							   $("#"+selectId).append("<option value=''>全部</option>");
						   }
						     $(msg).each(function(index){
						    	 if(val&&val==msg[index].areaCode){
						    		 $("#"+selectId).append("<option selected='selected' value="+msg[index].areaCode+">"+msg[index].name+"</option>"); 
						    	 }else{
						    		 $("#"+selectId).append("<option value="+msg[index].areaCode+">"+msg[index].name+"</option>"); 
						    	 }
						     });
						     
						}
				 });
			}
		}
		//地区异步获取
		function locations2($target,parentCode,firstOptionStr){
			if(!parentCode){
				return;
			}
			var options = [];
			if(firstOptionStr){
				options.push(firstOptionStr);
			}
				$.ajax({
					   type: "GET",
					   url: "/common/locationlist?da="+new Date(),
					   data: "parentAreaCode="+parentCode,
					   success: function(msg){
						     $(msg).each(function(index){
						    	 options.push("<option value='");
						    	 options.push(msg[index].areaCode);
						    	 options.push("'>");
						    	 options.push(msg[index].name);
						    	 options.push("</option>");
						    	 $target.html(options.join(""));
						     });
						     
						}
				 });
			
		}
		//字典信息异步获取
		function dicvalues(selectId,tag){
			var sl_2 ="";
			if(tag){
				sl_2 = $("option:selected",tag).val();
			}
			var val = $("#"+selectId).attr("value");
			$("#"+selectId).empty();
			if(sl_2&&sl_2!=''){
				$.ajax({
					   type: "GET",
					   url: "/common/dictionarylist?da="+new Date(),
					   data: "typeCode="+sl_2,
					   success: function(msg){
						   $("#"+selectId).append("<option value=''>全部</option>"); 
						     $(msg).each(function(index){
						    	 if(val&&val==msg[index].code){
						    		 $("#"+selectId).append("<option selected='selected' value="+msg[index].code+">"+msg[index].name+"</option>"); 
						    	 }else{
						    		 $("#"+selectId).append("<option value="+msg[index].code+">"+msg[index].name+"</option>"); 
						    	 }
						    	 });
						}
				 });
			}
		}
		//材料类别异步获取
		function bmtvalues(boo,selectId,tag,parentCode){
			var sl_3 ="";
			if(tag){
				sl_3 = $("option:selected",tag).val();
			}
			if(parentCode&&parentCode!=''){
				sl_3 = parentCode;
			}
			var val = $("#"+selectId).attr("value");
			$("#"+selectId).empty();
				if(boo||(sl_3&&sl_3!='')){
					if(!sl_3||sl_3==''){
						sl_3="";
					}
				$.ajax({
					   type: "GET",
					   url: "/common/bmtlist?da="+new Date(),
					   data: "parentId="+sl_3,
					   success: function(msg){
						   $("#"+selectId).append("<option value=''>全部</option>"); 
						     $(msg).each(function(index){
						    	 if(val&&val==msg[index].id){
						    		 $("#"+selectId).append("<option selected='selected' value="+msg[index].id+">"+msg[index].description+"</option>"); 
						    	 }else{
						    		 $("#"+selectId).append("<option value="+msg[index].id+">"+msg[index].description+"</option>"); 
						    	 }
						    	 });
						}
				 });
			}
		}
		
		//E化人信息异步获取(张光勇)
		function euservalues(selectId){
			var sl_4 = $("#"+selectId+" option:selected").val();
			var val = $("#"+selectId+" option:selected").attr("value");
			$("#"+selectId).empty();
			$.ajax({
				   type: "GET",
				   url: "/common/euserlist?da="+new Date(),
				   data: "typeCode="+sl_4,
				   success: function(msg){
					   $("#"+selectId).append("<option value=''>全部</option>"); 
					     $(msg).each(function(index){
					    	 if(val&&val==msg[index].id){
					    		 $("#"+selectId).append("<option selected='selected' value="+msg[index].id+">"+msg[index].name+"</option>"); 
					    	 }else{
					    		 $("#"+selectId).append("<option value="+msg[index].id+">"+msg[index].name+"</option>"); 
					    	 }
					    	 });
					}
			 });
		}
		
		//将jsong格式的时间装换为对应的(2014-01-02 12:23:34)yyyy-MM-dd HH:mm:ss
		function getLocalTime(nS){ 
			if(!nS||nS==''){
				return "";
			}
			if(isNaN(nS)){
				return "";
			}
			   return new Date(parseInt(nS)).format("yyyy-MM-dd hh:mm:ss");//.toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");      
			} 
		function getDate(nS){ 
			if(!nS||nS==''){
				return "";
			}
			if(isNaN(nS)){
				return "";
			}
			   return new Date(parseInt(nS)).format("yyyy-MM-dd");//.toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");      
			} 
		  //修改 timeStamp格式为 yyyy-MM-dd HH:mm:ss
		function timeStampString(time){
				    var datetime = new Date();
				    /*datetime.setTime(time);
				    var year = datetime.getFullYear();
				    var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
				    var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
				    var hour = datetime.getHours()< 10 ? "0" + datetime.getHours() : datetime.getHours();
				    var minute = datetime.getMinutes()< 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
				    var second = datetime.getSeconds()< 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
				    return year + "-" + month + "-" + date+" "+hour+":"+minute+":"+second;*/
				    return new Date().format("yyyy-MM-dd hh:mm:ss");
		}
		//获取form下勾选框数据
		function getCheckedIds(formtag){
			var chs ="";
			$("input[type='checkbox'][name='id']:checked",formtag).each(function(){
				if(chs==""){
					chs="id="+$(this).val();
				}else{
					chs=chs+"&id="+$(this).val();
				}
			});
			return chs;
		}
		//校验时间格式2013-09-09
		function checkDate(dateVal){
			var a = /^(\d{4})-(\d{2})-(\d{2})$/
			if (!a.test(dateVal)) { 
				return false 
			} 
			else {
				return true 
			}
	   }
		
function adminUser(boo,selectId,tag,ptcode){
			var sl_5='';
			if(tag&&tag=='00'){
				sl_5 =ptcode;
			}else if(tag){
				sl_5= $("option:selected",tag).val();
			}
			var val = $("#"+selectId).attr("value");
			$("#"+selectId).empty();
			if(boo||(sl_5&&sl_5!='')){
				if(!sl_5||sl_5==''){
					sl_5="";
			}
			var htmlStr="<option value=''>请选择...</option>";
			$.ajax({
				   type: "GET",
				   url: "/companyAudit/setUser",
				   data: "parentCode="+sl_5,
				   success: function(msg){
					     $(msg).each(function(index){
					    	 if(val&&val==msg[index].id){
					    		 htmlStr+="<option selected='selected' value="+msg[index].id+">"+msg[index].name+"</option>"; 
					    	 }else{
					    		 htmlStr+="<option value="+msg[index].id+">"+msg[index].name+"</option>"; 
					    	 }
					     });
					     $("#"+selectId).html(htmlStr);
					}
			 });
			}
		}
//获取当前时间 2013:-01-09
function getCurrentDate(){
	var myDate = new Date();
	return myDate.getFullYear()+"-"+((myDate.getMonth()+1)>9?(myDate.getMonth()+1):'0'+(myDate.getMonth()+1))
				+"-"+(myDate.getDate()>9?myDate.getDate():'0'+myDate.getDate());
	
}
//获取选中复选框的id值
//function checks(_tab){
//	var chs ="";
//	$(_tab +" input[type='checkbox'][name='id']:checked").each(function(){
//		chs=chs+"&id="+$(this).val();
//	});
//	return chs;
//}

//全选，反选实现
function boxAll() {
	$("input:checkbox").getValueF();
}
$.fn.getValueF = function () {
	var flag = $(this).attr("checked");
	$("[name=id]:checkbox").each(function () {
		if(flag=="checked")
		   $(this).attr("checked", true);
		else
			$(this).removeAttr("checked");
	});
};
//下载文件
function downLoadFile(fileName,filePath){
	  $.get("/common/checkFileExists?filePath="+filePath, function(data){
		  if(data=="success"){
			  window.location.href="/common/downFiles?fileName="+fileName+"&filePath="+filePath;
		  }
		  else{
			  alert(data);
		  }
});
}

//字符处理;
//去左右空格; 
function trim(s){
	return rtrim(ltrim(s)); 
}
//去左空格; 
function ltrim(s){
	return s.replace( /^\s*/, ""); 
} 
//去右空格; 
function rtrim(s){ 
	return s.replace( /\s*$/, ""); 
}
//去掉文本框左右空格
function dealQ(obj) {
	obj.value = trim(obj.value);
}
//只能输入正整数
function getNumber(obj){
	
	var re =/[^0-9]/g;
    var nubmer = obj.value;
    
     if (re.test(nubmer))
    {
    	 obj.value = "";
     }
}
//只能输入正整数》0
function getNumber0(obj){
	var re =/[^0-9]/g;
    var nubmer = obj.value;
    
     if (re.test(nubmer))
    {
    	 obj.value = "";
     }
     if(nubmer<=0){
    	 obj.value = "";
     }
}


/**
 * 给<tr>注册点击事件
 * zhanggy-b
 */
function trClick(){
	$('tbody tr').click(function(){
		var $this = $(this);
		var cb = $this.children('td').first().children(':checkbox');
		var isSelected = cb[0].checked;
		var parentCheckboxWithSpan = $this.parents('table').children('thead').children('tr').children('th').first().find(':checkbox').parent('span');
		if(isSelected){
			parentCheckboxWithSpan.removeClass('checked');
		}else{
			//检查所有同辈元素是否选中
			var trs = $this.siblings('tr');
			var selectedAll = true;
			$.each(trs, function(){
				var $tr = $(this);
				var tempCb = $tr.children('td').first().children('input[type="checkbox"]:enabled')[0];
				if(tempCb && !tempCb.checked){
					selectedAll = false;
					return false;
				}
			});
			if(selectedAll){
				parentCheckboxWithSpan.addClass('checked');
			}else{
				parentCheckboxWithSpan.removeClass('checked');
			}
		}
	});
}