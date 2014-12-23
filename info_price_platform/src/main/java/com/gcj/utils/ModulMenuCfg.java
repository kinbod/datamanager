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

import java.io.FileNotFoundException;
import java.io.FileReader;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;

import com.gcj.xml.entity.MainCatalog;

public class ModulMenuCfg {

	private JAXBContext context = null;

	public MainCatalog getConfig() throws JAXBException, FileNotFoundException {
		context = JAXBContext.newInstance(MainCatalog.class);
		String path = this.getClass().getClassLoader().getResource("").getPath();
		FileReader fr = new FileReader(path+"configuration/MainCatalog.xml");
		Unmarshaller um = context.createUnmarshaller();
		MainCatalog mc = (MainCatalog) um.unmarshal(fr);
		return mc;
	}
}
