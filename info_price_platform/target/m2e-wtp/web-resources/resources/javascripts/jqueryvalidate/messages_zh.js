/*
 * Translated default messages for the jQuery validation plugin.
 * Locale: ZH (Chinese, 中文 (Zhōngwén), 汉语, 漢語)
 */
(function ($) {
	$.extend($.validator.messages, {
		required: "<font style='color:red'>必填</font>",
		remote: "<font style='color:red'>请修正</font>",
		email: "<font style='color:red'>邮件格式不正确</font>",
		url: "<font style='color:red'>网址格式不正确</font>",
		date: "<font style='color:red'>日期格式不正确</font>",
		dateISO: "<font style='color:red'>日期格式不正确</font>",
		number: "<font style='color:red'>请输入合法的数字</font>",
		digits: "<font style='color:red'>只能输入整数</font>",
		creditcard: "<font style='color:red'>请输入合法的信用卡号</font>",
		equalTo: "<font style='color:red'>请再次输入相同的值</font>",
		accept: "<font style='color:red'>请输入拥有合法后缀名的字符串</font>",
		maxlength: $.validator.format("<font style='color:red'>请输入一个长度最多是 {0} 的字符串</font>"),
		minlength: $.validator.format("<font style='color:red'>请输入一个长度最少是 {0} 的字符串</font>"),
		rangelength: $.validator.format("<font style='color:red'>请输入一个长度介于 {0} 和 {1} 之间的字符串</font>"),
		range: $.validator.format("<font style='color:red'>请输入一个介于 {0} 和 {1} 之间的值</font>"),
		max: $.validator.format("<font style='color:red'>请输入一个最大为 {0} 的值</font>"),
		min: $.validator.format("<font style='color:red'>请输入一个最小为 {0} 的值</font>")
	});
}(jQuery));