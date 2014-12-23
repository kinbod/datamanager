/**
 * 已经导入的定额的记录模型
 */
package com.gcj.entity;

import java.io.Serializable;
import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;

/**
 * @author quanbq
 *
 */
public class NormSeries implements Serializable {

	/**
	 * 序列化方便缓存和转换处理
	 */
	private static final long serialVersionUID = -1297734129970473401L;

	private String name;

	// location name
	private String locName;

	private int normCount;

	@DateTimeFormat(iso=ISO.DATE_TIME)
	private Date updated_at;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLocName() {
		return locName;
	}

	public void setLocName(String locName) {
		this.locName = locName;
	}

	public int getNormCount() {
		return normCount;
	}

	public void setNormCount(int normCount) {
		this.normCount = normCount;
	}

	public Date getUpdated_at() {
		return updated_at;
	}

	public void setUpdated_at(Date updated_at) {
		this.updated_at = updated_at;
	}

}
