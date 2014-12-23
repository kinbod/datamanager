package com.gcj.controller;

import java.io.FileNotFoundException;

import javax.xml.bind.JAXBException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.gcj.utils.ModulMenuCfg;
import com.gcj.xml.entity.MainCatalog;

//import com.gcj.jms.MessageSender;

@Controller
public class HomeController extends BaseController {

	@Autowired
	private ModulMenuCfg modulemenucfg;

	@RequestMapping(value = "/home", method = RequestMethod.GET)
	public ModelAndView home(
			@RequestParam(value = "module_code", required = false) String module_code,
			@RequestParam(value = "menu_code", required = false) String menu_code) {
		ModelAndView mv = new ModelAndView();
		MainCatalog mc = null;
		try {
			mc = modulemenucfg.getConfig();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (JAXBException e) {
			e.printStackTrace();
		}
		
		if (mc != null) {
			mv.addObject("module_code", module_code);
			mv.addObject("menu_code", menu_code);
			mv.addObject("sys_modules", mc.getSysmodules());
			mv.addObject("sys_menus", mc.getSysmenus());
		}
		mv.setViewName(menu_code == null ? "index" : mc.getSysmenus()
				.get(Integer.parseInt(menu_code)).getView());
		
		return mv;
	}

	/**
	 * 获取 需要维护的供应商列表（当前维护周期剩余7天内，而且没有联系记录） 描述该方法的作用
	 *
	 * @param model
	 * @author zhangxl-d
	 */
	/*
	 * private void getNoContactCompanyList(ModelMap model){ if(getCurrentUser()
	 * != null){ model.addAttribute("nccList",
	 * companyService.getNoContactCompanyList(getCurrentUser().getId())); } }
	 */
}
