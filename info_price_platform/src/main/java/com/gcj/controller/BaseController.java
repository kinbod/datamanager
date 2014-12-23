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
	*@author:郭冲
	*
	*@since:jdk1.5
	*
*
	*@version:1.0
	*
*@date:2014-4-21
*
*最后更改日期：
*
*
*修改人：
*
*
	********************************************************/

package com.gcj.controller;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.context.ServletContextAware;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.context.request.WebRequest;

import com.gcj.dao.page.PageParameter;


public class BaseController implements ServletContextAware{
	
	private ServletContext servletContext;
	
	public static String AJAX_SUCCESS = "1";
	public static String AJAX_FAILURE = "0";
	
	public Map<String,Object> getMap(HttpServletRequest request,Object object){
		Map<String,Object> map = new HashMap<String, Object>();
		initMap(object,map);
		PageParameter page = initPage(request);
		map.put("page",page);
		return new HashMap<String,Object>();
	}
	
	public Map<String,Object> initMap(Object object,Map<String,Object> map){
		String objectName = toFirstLowerCase(object.getClass().getSimpleName());
		System.out.println(objectName);
		map.put(objectName, object);
		return map;
	}
	
	public String toFirstLowerCase(String str){
		char[] chars=new char[1];  
        chars[0]=str.charAt(0);  
        String temp=new String(chars);  
        if(chars[0]>='A'  &&  chars[0]<='Z')  
        {  
            return str.replaceFirst(temp,temp.toLowerCase());  
        }  
        return str;
	}
	
	
	/**
	 * 
	 * 获取分页参数 
	 *
	 * @param request
	 * @return
	 * @author 张作强
	 */
	public PageParameter initPage(HttpServletRequest request){
		Integer pageNow =1;
		String currentPage = request.getParameter("currentPage");
		if (StringUtils.isNotBlank(currentPage)){
			pageNow = Integer.parseInt(currentPage);
		}
		Integer pageSize = request.getParameter("pageSize")==null?null:
								Integer.parseInt(request.getParameter("pageSize"));
		PageParameter page = new PageParameter();
		if(pageSize!=null){
			page.setPageSize(pageSize);
		}else{
			page.setPageSize(PageParameter.DEFAULT_PAGE_SIZE);
		}
		page.setCurrentPage(pageNow);
		return page;
	}

	@Override
	public void setServletContext(ServletContext servletContext) {
		this.servletContext=servletContext;
	}
	
	/**
	 * 获取项目路径
	 *描述该方法的作用
	 *
	 * @return
	 * @author 
	 */
	public String getServletContext() {
		return servletContext.getRealPath("/");
	}
	
	
    
    /**
     * 文件下载公共方法
     * @param fileName
     * @param file
     * @return
     * @author 张作强
     * @throws IOException 
     */
    protected  ResponseEntity<byte[]> download(String fileName,File file) throws IOException{
    	 String dfileName = new String(fileName.getBytes("gb2312"), "iso8859-1");
    	 HttpHeaders headers = new HttpHeaders();  
         headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);  
         headers.setContentDispositionFormData("attachment",dfileName); 
         return new ResponseEntity<byte[]>(FileUtils.readFileToByteArray(file),  
	                headers, HttpStatus.CREATED); 
    }
    protected  ResponseEntity<byte[]> download(String fileName,byte[] bs) throws IOException{
    	String dfileName = new String(fileName.getBytes("gb2312"), "iso8859-1");
    	HttpHeaders headers = new HttpHeaders();  
    	headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);  
    	headers.setContentDispositionFormData("attachment",dfileName); 
    	return new ResponseEntity<byte[]>(bs,  
    			headers, HttpStatus.CREATED); 
    }
	
    

    /**
     *	获取Session
     * @return
     * @author 张作强
     */
    public static HttpSession getSession() {
	    HttpSession session = null;
	    try {
	        session = getRequest().getSession();
	    } catch (Exception e) {}
	        return session;
    }

    /**
     *
     * @return
     * @author zhangzq-a
     */
    public static HttpServletRequest getRequest() {
	    ServletRequestAttributes attrs = (ServletRequestAttributes) RequestContextHolder
	    .getRequestAttributes();
	    return attrs.getRequest();
    } 

    /**
     * 将request参数放到一个map里面
     *
     * @param request
     * @return
     * @author 朱宇航
     */
    public Map<String, Object> getParams(WebRequest request){
		Map<String, Object> result = new HashMap<String, Object>();
		Map<String, String[]> params = request.getParameterMap();
		if(params!=null&&params.size()>0){
			for(Entry<String, String[]> obj:params.entrySet()){
				String k = obj.getKey();
				String[] v = obj.getValue();
				if(v.length == 1){
					result.put(k, StringUtils.isBlank(v[0]) ? null : v[0]);
				}else{
					result.put(k, v);
				}
			}
		}
		return result;
	}
}
