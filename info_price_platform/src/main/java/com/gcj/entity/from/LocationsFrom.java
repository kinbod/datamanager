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
 *@author:衣腾
 *
 *@since:jdk1.5
 *
 *
 *@version:1.0
 *
 *@date:2014年4月25日
 *
 *最后更改日期：
 *
 *
 *修改人：
 *
 *
 ********************************************************/

package com.gcj.entity.from;

public class LocationsFrom {

	// 省名称
	private String province; 
	// 省Code
	private String provinceCode;
	// 城市名称
	private String city;
	// 城市Code
	private String cityCode;

	public String getProvince() {
		return province;
	}

	public void setProvince(String province) {
		this.province = province;
	}

	public String getProvinceCode() {
		return provinceCode;
	}

	public void setProvinceCode(String provinceCode) {
		this.provinceCode = provinceCode;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getCityCode() {
		return cityCode;
	}

	public void setCityCode(String cityCode) {
		this.cityCode = cityCode;
	}

	@Override
	public String toString() {
		return "Locations [province=" + province + ", provinceCode=" + provinceCode + ", city=" + city + ", cityCode="
				+ cityCode + "]";
	}

}
