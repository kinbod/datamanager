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
 *@date:2014-6-21
 *
 *最后更改日期：
 *
 *
 *修改人：
 *
 *
 ********************************************************/

package com.gcj.entity.vo;

public class Page {
	public static final int DEFAULT_PAGE_SIZE = 20;
	private int pageNumber = 1;// 当前页
	private int totalCount;// 总记录数
	private int pageSize = DEFAULT_PAGE_SIZE;
	public Page(){
		
	}
	public Page(int pageNumber, int pageSize){
		this.pageNumber = pageNumber;
		this.pageSize = pageSize;
	}
	/**
	 * @return 总页数
	 */
	public int getTotal() {
		int i = getTotalCount() / getPageSize();
		return getTotalCount() % getPageSize() == 0 ? i : i + 1;
	}

	/**
	 * @return 前一页
	 */
	public int getPrev() {
		return this.getPageNumber() > 1 ? this.getPageNumber() - 1 : 1;
	}

	/**
	 * @return 当前页
	 */
	public int getPageNumber() {
		return this.pageNumber;
	}

	/**
	 * @param 设置当前页
	 *            页面调用
	 */
	public void setPageNumber(int currentPage) {
		this.pageNumber = currentPage > 0 ? currentPage : 1;
	}

	/**
	 * @return 后一页 页面调用
	 */
	public int getNext() {
		return this.getPageNumber() + 1;
	}

	/**
	 * @return 起始条数  
	 */
	public int getStartIndex() {
		return ((this.pageNumber - 1) * this.getPageSize());
	}

	/**
	 * @return 总条数 页面调用
	 */
	public int getTotalCount() {
		return totalCount;
	}

	/**
	 * @param 设置总条数
	 *            *DaoImpl 中调用
	 */
	public void setTotalCount(int totalCount) {
		this.totalCount = totalCount > 0 ? totalCount : 0;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize > 0 ? pageSize : 20;
	}
}
