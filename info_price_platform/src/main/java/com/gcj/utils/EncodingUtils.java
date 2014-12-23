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
	*@author:衣腾
	*
	*@since:jdk1.5
	*
*
	*@version:1.0
	*
*@date:2014年5月14日
*
*最后更改日期：
*
*
*修改人：
*
*
	********************************************************/

package com.gcj.utils;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

import org.apache.commons.lang.StringUtils;

public class EncodingUtils {

	/**
	 * 字符串转码 UTF-8
	 *
	 * @param str
	 * @return
	 * @author 衣腾
	 */
	public static String encodeStr(String str) {
		try {
			return new String(str.getBytes("ISO-8859-1"), "UTF-8");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
			return null;
		}
	}

	public static String encode2Utf8(String str) throws Exception {
		if (StringUtils.isBlank(str)) {
			return str;
		}
		return URLEncoder.encode(str, "utf-8");

	}
}
