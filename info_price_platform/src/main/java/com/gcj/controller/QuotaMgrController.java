package com.gcj.controller;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.commons.CommonsMultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.gcj.entity.Locations;
import com.gcj.entity.NormSeries;
import com.gcj.entity.vo.Pagination;
import com.gcj.service.LocationsFacade;
import com.gcj.service.NormSeriesFacade;

@RestController
@RequestMapping("/quota")
public class QuotaMgrController {

	@Autowired
	private NormSeriesFacade normSeriesFacade;

	@Autowired
	private LocationsFacade locationsFacade;

	// 部署目录，修改为自己的
	private @Value("${deploy.path}") String deployPath;

	// 上传目录，修改为自己的 保存文件的路径
	private @Value("${upload.path}") String uploadPath;

	// 域名，修改为自己的
	private @Value("${javaniu.domain}") String javaniuDomain;

	// 测试代码
	@RequestMapping(value = { "test" }, method = { RequestMethod.GET })
	public ModelAndView upload(HttpSession session) {
		System.out.println("test get:" + session.getId());
		ModelAndView modelAndView = new ModelAndView("common/test");
		return modelAndView;
	}

	/**
	 * 请求合适的定额数据显示在表格中
	 * 
	 * @param qName
	 * @param qArea
	 * @param page
	 * @return
	 */
	@RequestMapping("/commdata")
	public Pagination<NormSeries> retriveData(
			@RequestParam("qName") String qName,
			@RequestParam("qArea") String qArea, Pagination<NormSeries> page) {
		Map<String, Object> param = new HashMap<String, Object>();
		try {
			qName = new String(qName.getBytes("ISO-8859-1"), "UTF-8");
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		param.put("qName", qName);
		param.put("qArea", qArea);
		param.put("locId", qArea);
		List<NormSeries> list = normSeriesFacade
				.fetchNormSeriesByAdditions(param);
		page.setiTotalRecords(list.size());
		page.setiTotalDisplayRecords(list.size());
		page.setAaData(list);
		return page;
	}

	/**
	 * 获取地区信息显示在下拉框中
	 * 
	 * @return
	 */
	@RequestMapping("/locations")
	public List<Locations> retriveLocations() {
		return locationsFacade.normLocations();
	}

	/**
	 * 通过apache commons.fileupload接收上传
	 *
	 * @param file
	 * @param response
	 */
	@RequestMapping(value = { "/quotaFileUpload" }, method = { RequestMethod.POST })
	public String uploadQuotaFile(
			@RequestParam("file") CommonsMultipartFile file,
			HttpSession session, HttpServletResponse response) {
		System.out.println("upload post:" + session.getId());
		// 将该file放到session中以便客户端定时可以从session中获取到该对象的上传进度,不支持单客户端多文件上传，session会覆盖掉file
		// 要想支持多文件可以给客户端分配一个唯一标识即可,然后客户端请求时带上该标识从session中获取对应的对象即可，即：session.getAttribute(唯一标识)
		session.setAttribute("file", file);
		response.setContentType("text/html;charset=UTF-8");
		File uploadDir = new File(deployPath + uploadPath);
		if (!uploadDir.exists()) {// 不存在则创建
			uploadDir.mkdirs();
		}
		String name = System.currentTimeMillis() + ".jpg";
		String localPath = deployPath + uploadPath + name;
		String url = javaniuDomain + uploadPath + name;
		try {
			file.transferTo(new File(localPath));
			PrintWriter writer = response.getWriter();
			writer.print(url);
			writer.close();
		} catch (IllegalStateException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return "";
	}

	/**
	 * 获取上传进度
	 *
	 * @param file
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/process")
	public void process(HttpSession session, HttpServletResponse response) {
		System.out.println("process get:" + session.getId());
		// 上传进度百分比
		long processPercent = 0;
		CommonsMultipartFile file = (CommonsMultipartFile) session
				.getAttribute("file");
		if (file == null) {
			return;
		}
		long totalFileSize = file.getSize();
		long readedFileSize = file.getFileItem().getSize();

		System.out.println("totalFileSize:" + totalFileSize
				+ ",readedFileSize:" + readedFileSize);

		if (totalFileSize != 0) {
			processPercent = Math.round(readedFileSize / totalFileSize) * 100;
		}

		response.setContentType("text/html;charset=UTF-8");
		PrintWriter writer;
		try {
			writer = response.getWriter();
			writer.print(processPercent);
			writer.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
