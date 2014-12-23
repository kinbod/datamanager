(function($) {

	$.fn.select = function(options) {

		return this.each(function() {
			var $this = $(this);
			// 初始化配置信息,与默认的配置进行合并
			var opts = options ? options : $.parseJSON($this
					.attr('select_options'));
			opts = methods.init(opts);
			if (!opts.upper_id) { // 如果当前下拉框没有上级ID，那么就进行数据的加载
				// 请求数据
				$this.data('data', opts); // 保存下拉框的数据状态
				methods.requestData($this, opts);
			}
		});
	};

	// 功能
	var methods = {
		// 初始化配置参数
		init : function(options) {
			return $.extend({}, $.fn.select.defaults, options);
		},

		// 请求数据
		requestData : function(sel, options) {
			if (sel && options && options.url) {
				$
						.ajax({
							type : 'POST',
							dataType : 'JSON',
							async : options.async,
							data : options.params,
							url : options.url,
							success : function(result) {
								methods.renderSelect(sel, result, options);
							},
							error : function(xhr) {
								// alert('error: jQuery plugin select' + ' '+ xhr.status);
							}
						});
			}
		},

		// 渲染控件(下拉框)
		renderSelect : function(sel, data, options) {
			sel.empty();
			if (data && data.length > 0) {
				// 级联设置
				sel.on('change', options.selectChange); // 绑定onChange事件
				
				//设置选中值
				var selectedValue = $.parseJSON(sel.attr('select_options'))[options.selected_field]
				
				// 填充option标签
				var code, name, props; // option的value，text和后台对象的所有属性props
				$.each(data, function() {
					props = {};
					for ( var p in this) {
						props[p] = this[p];
						if (p == options.value_field) {
							code = this[p];
						}
						if (p == options.text_field) {
							name = this[p];
						}
					}
					// 向下拉框中填充option
					var $optino = $('<option></option>').val(code).text(name).data(options.other_field, props);
					if(selectedValue && selectedValue == code ){
						$optino.attr('selected', 'selected');
					}
					sel.append($optino);
				});

				// 设置默认值
				if (options.has_default) {
					var $defaultOption = $('<option></option>').val(options.default_option_value).text(options.default_option_text);
					if( !selectedValue ){
						$defaultOption.attr('selected', 'selected');
					}
					sel.prepend($defaultOption);
				}
				
				//触发onchange事件
				if(options.tigger_change){
					sel.trigger('change');
				}
				
			}
		},

		// 选择事件
		selectChange : function() {
			var $sel = $(this);
			// 拿到所有需要级联的下级-下拉框
			$.each($('select[select_options]'), function() {
				var $this = $(this);
				var opts = methods.init($.parseJSON($this
						.attr('select_options')));
				if ($sel.attr('id') == opts.upper_id) { // 判断是有上下级关系
					$this.empty(); // 清空下拉框
					// 参数合并,选择上级下拉框的时候需要把选中的option的所有属性都当做参数传递到后台去
					var optProps = $sel.children(
							'option[value=' + $sel.val() + ']').data(
							$sel.data('data').other_field);
					opts.params = $.extend({}, optProps, opts.params);

					// 请求数据
					$this.data('data', opts); // 保存下拉框的数据状态
					methods.requestData($this, opts);
				}
			});

		}
	};

	// 默认配置参数
	$.fn.select.defaults = {
		// 请求数据的路径
		url : null,
		// 是否是同步请求
		async : true,
		// 请求的时候准备的参数
		params : {},

		// 当前下拉框的上级ID
		upper_id : null,

		// option标签的text字段对应后台传过来的属性名称
		text_field : 'name',
		// option标签的value字段对应后台传递过来的属性名称
		value_field : 'id',
		// option标签的其他属性,这是一个对象的名称使用的是jQuery中的data进行封装的
		other_field : 'props',
		// 选中的值的属性名称
		selected_field : 'value',

		// 默认选中
		has_default : true,
		default_option_value : '',
		default_option_text : '全部',

		// 绑定事件
		selectChange : methods.selectChange,
		
		//是否第一次初始化的时候就触发onchange事件
		tigger_change: false
	};

	// 初始化加载页面的下拉框
	$(function() {
		$('select[select_options]').select();
	});

})(jQuery);