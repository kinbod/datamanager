/***********************************************************
 *(该类的功能及其特点描述)
 *
 *@see(与该类相关联的类)
 *
 *广联达
 *
 *版权：本文件版权归属北京广联达软件股份有限公司
 *
 *
 *@author:quanbq
 *
 *@since:jdk1.5
 *
 *
 *@version:1.0
 *
 *@date:2014年12月8日
 *
 *最后更改日期：
 *
 *
 *修改人：
 *
 *
 ********************************************************/

package com.gcj.utils;

import org.springframework.web.context.request.WebRequest;

public final class AjaxUtils {

	public static boolean isAjaxRequest(WebRequest webRequest) {
		String requestedWith = webRequest.getHeader("X-Requested-With");
		return requestedWith != null ? "XMLHttpRequest".equals(requestedWith)
				: false;
	}

	public static boolean isAjaxUploadRequest(WebRequest webRequest) {
		return webRequest.getParameter("ajaxUpload") != null;
	}

	/*
	 * 防止对该对象进行new操作 该对象只提供静态的方法
	 */
	private AjaxUtils() {
	}
}
