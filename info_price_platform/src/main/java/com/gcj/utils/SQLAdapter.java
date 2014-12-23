package com.gcj.utils;
/**
 * 
 * mybatis执行传入sql适配器
 * 张作强
 */
public class SQLAdapter {
	private String sql;

	public SQLAdapter(String sql) {
		super();
		this.sql = sql;
	}

	public String getSql() {
		return sql;
	}

	public void setSql(String sql) {
		this.sql = sql;
	}
	
	

}
