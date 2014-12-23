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
*@date:2014年12月5日
*
*最后更改日期：
*
*
*修改人：
*
*
	********************************************************/

package com.gcj.excepiton;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HandleExceptionCodeController {

	@RequestMapping("/404")
	public String handle404(){
		return "404";
	}
	
}
