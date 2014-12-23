/**
 * json工具
 */
var JsonUtil = (function(){
	return {
		/**
		 * 获取json中的单个值
		 */
		getValue:function(jsonObject,name){
			var value = "";
			$.each(jsonObject,function(n,v){
				if(name == n){
					value = v;
					return false;
				}
			});
			return value;
		},
		/**
		 * 获取json中的name 以数组形式返回
		 */
		getNames:function(jsonObject){
			var names = [];
			$.each(jsonObject,function(n,v){
				names.push(n);
			});
			return names;
		},
		/**
		 * 创建json对象
		 */
		createJsonObject:function(){
			this.jsonObectArr = [];
		}
		
	}
	
})();

/**
 * 创建json的nam和value的名值对字符串
 */
JsonUtil.createJsonObject.prototype.createJsonStr = function (name,value){
	if (typeof value  == 'string'){
		this.jsonObectArr.push("\""+name+"\":"+"\""+value+"\"");
	}else{
		this.jsonObectArr.push("\""+name+"\":"+value);
	}
}

/**
 * 获取json对象
 */
JsonUtil.createJsonObject.prototype.getJson = function (){
	var str = "{"+this.jsonObectArr.join(',')+"}";
	return $.parseJSON(str);
}