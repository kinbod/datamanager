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

package com.gcj.xml.entity;

import java.util.List;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlRootElement(name = "MainCatalog")
public class MainCatalog {

	@XmlElementWrapper(name = "sys_modules")
	@XmlElement(name = "sys_module")
	private List<Sysmodule> Sysmodules;

	@XmlElementWrapper(name = "sys_menus")
	@XmlElement(name = "sys_menu")
	private List<Sysmenu> Sysmenus;

	public List<Sysmodule> getSysmodules() {
		return Sysmodules;
	}

	public List<Sysmenu> getSysmenus() {
		return Sysmenus;
	}

	public static class Sysmodule {

		@XmlElement
		int id;
		@XmlElement
		int code;
		@XmlElement
		String name;

		public int getId() {
			return id;
		}

		public int getCode() {
			return code;
		}

		public String getName() {
			return name;
		}

	}

	public static class Sysmenu {

		@XmlElement
		int code;
		@XmlElement
		String name;
		@XmlElement
		String controllerName;
		@XmlElement
		int sysModuleId;
		@XmlElement
		String view;

		public int getCode() {
			return code;
		}

		public String getName() {
			return name;
		}

		public String getControllerName() {
			return controllerName;
		}

		public int getSysModuleId() {
			return sysModuleId;
		}

		public String getView() {
			return view;
		}

	}

}
