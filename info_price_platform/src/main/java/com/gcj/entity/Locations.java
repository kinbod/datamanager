/**
 * 
 */
package com.gcj.entity;

import java.io.Serializable;

/**
 * 获取现存的定额信息的区域信息
 * 
 * @author quanbq
 *
 */
public class Locations implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -2466673729910725445L;

	private int area_code;
	private String name;

	public int getArea_code() {
		return area_code;
	}

	public void setArea_code(int area_code) {
		this.area_code = area_code;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}
