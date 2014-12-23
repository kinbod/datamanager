package com.gcj.entity;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Map;

import com.gcj.entity.from.LocationsFrom;

public class Company {
	// 主键
	private Long 		id;                    
	// 公司名称                                
	private String 		name;                  
	// 公司地址                                
	private String 		address;               
	// 联系人                                  
	private String 		contactPerson;         
	// 联系电话                                
	private String 		contactPhone;          
	// 商标                                    
	private String 		trademark;             
	// 企业类型                                
	private String 		businessType;          
	// 法人代表                                
	private String 		legalRepresentative;   
	// 公司网址                                
	private String 		website;               
	// 传真                                    
	private String 		fax;                   
	// 邮编                                    
	private String 		postcode;              
	// 创建时间                                
	private Timestamp 	createdAt;             
	private String 		createdAtStr;             
	// 修改时间                                
	private Timestamp 	updatedAt;             
	// 供应商合作状态                          
	private String 		cooperationStatus;     
	// 邮箱                                    
	private String 		email;                 
	// QQ号码                                  
	private String 		qq;                    
	// 手机号                                  
	private String 		mobilePhone;           
	// 地区编码                                
	private String 		locationAreaCode;      
	// 主管范围                                
	private String 		mainCategories;        
	// 主管类别                                
	private Long 		operateCategory;       
	// 拓展地区                                
	private String 		expandAreaCode;        
	// 上级公司                                
	private Long 		parentId;              
	// 供应商级别                              
	private String 		level;                 
	// liuzx-c                   
	private String 		levelStr;                 
	// 供应商属性                              
	private String 		companyAttribute;      
	// liuzx-c                         
	private String 		companyAttributeStr;      
	// 公司电话                                
	private String 		phone;                 
	// 是否删除                                
	private Boolean 	isDelete;              
	// 经度                                    
	private Double 		longitude;             
	// 纬度                                    
	private Double 		latitude;              
	// 质量等级                                
	private Long 		qualityGrade;          
	// logo                                    
	private String 		logo;         
	// 所在地区
	private String locationArea;
	//设定协会认定企业
	private String assCertEnterprise;
	
	/**
	 * 以下属性跟数据库没对应
	 */
	// 所属区域：省
	private String parentLocationAreaCode;
	// 品牌
	private String brandName;
	// 材料类别：一级类别
	private String firstMaterialTypes;
	// 材料类别：二级类别
	private String secondMaterialTypes;
	// 联系状态
	private String contactStatus;
	// 联系类型
	private String contactType;
	// 负责人
	private Long userId;
	// 负责人所属组
	private Long userGroupId;
	// 拓展地区
	private String parentExpandAreaCode;
	// 材料数量
	private Integer productCount = 0;
	// 来源
	private String original;
	// 开始时间
	private String startTime;
	// 结束时间
	private String endTime;

	//处理状态
	private String processStatus;

	//上级公司名称
	private String parentName;
	

	// 描述说明
	private String introduction;
	// 价格说明
	private String priceNote;

	// 以下表单中使用
	// 经营地区, 用于前台接收读取
	private String operatingAreas;

	
	//供应商进入审核时间
	private String auditStartTime;
	private String auditEndTime;
	//供应商审核状态标识  关系审核   拓展审核
	private String auditStatus;
	//拓展地区名称
	private String expandAreaName;
	//审核不通过原因
	private String  reason;
	
	private String mainTypeName;
	//负责人名称
	private String chargeName;
	//主营类别名称
	private String categoryName;
	//E化人ID
	private String eUserId;
	//e化人名称
	private String eUserName;
	//材料统计信息
	private Map<String,Object> productAmount;
	//处理状态
	private String indentType;
	
	//供应商的经营区域
	private List<LocationsFrom> operationAreas;
	//供应商合作时间
	private Timestamp cooperationTime;

	//周期数
	private Integer cycleDays;
	
	private Timestamp beginCycleTime;
	private Timestamp endCycleTime;
	//审核时间
	private Timestamp auditTime;
	//返回审核时间
	private Timestamp returnTime;
	//供应商上次处理状态
	private String lastProcessStatus;
	//供应商紧急任务标识
	private Boolean isUrgency;
	private Integer residualMaintainDays;
	

	
	private String operateType;
	
	// 企业类型显示                       
	private String 		businessTypeStr;  

	public String getBusinessTypeStr() {
		return businessTypeStr;
	}

	public void setBusinessTypeStr(String businessTypeStr) {
		this.businessTypeStr = businessTypeStr;
	}

	public String getOperateType() {
		return operateType;
	}

	public void setOperateType(String operateType) {
		this.operateType = operateType;
	}


	/* zhanggy-b start */
	private String eStartDate;		//进入E化时间查询条件的开始时间
	private String eEndDate;		//进入E化时间查询条件的结束时间
	private String pStartDate;		//E化问题标记开始时间
	private String pEndDate;		//E化问题标记结束时间
	
	private String quotedPriceType;	//报价类型
	
	private Long hasReleasedCount;		//已发布材料数量
	private Long haveCorrectionCount;	//已纠偏材料数量
	private Long noCorrectionCount;		//未纠偏材料数量
	private Long notClassifiedCount;	//无法分类材料数量
	//liuzx-c
	private Long haveNoClassifiedCount;	//未分类材料数量
	
	/* zhanggy-b end */
	
	private Integer contacterNum;//联系人数目
	private String rangeStr;//是否是指定范围供应商
	private String operGroupName;//运营组名称
	

	public Long getHaveNoClassifiedCount() {
		return haveNoClassifiedCount;
	}

	public void setHaveNoClassifiedCount(Long haveNoClassifiedCount) {
		this.haveNoClassifiedCount = haveNoClassifiedCount;
	}
	

	public String getCreatedAtStr() {
		return createdAtStr;
	}

	public void setCreatedAtStr(String createdAtStr) {
		this.createdAtStr = createdAtStr;
	}

	public String getLevelStr() {
		return levelStr;
	}

	public void setLevelStr(String levelStr) {
		this.levelStr = levelStr;
	}

	public String getOperGroupName() {
		return operGroupName;
	}

	public void setOperGroupName(String operGroupName) {
		this.operGroupName = operGroupName;
	}

	public Integer getContacterNum() {
		return contacterNum;
	}

	public void setContacterNum(Integer contacterNum) {
		this.contacterNum = contacterNum;
	}

	public String getRangeStr() {
		return rangeStr;
	}

	public void setRangeStr(String rangeStr) {
		this.rangeStr = rangeStr;
	}

	public Boolean getIsUrgency() {
		return isUrgency;
	}

	public void setIsUrgency(Boolean isUrgency) {
		this.isUrgency = isUrgency;
	}

	public Timestamp getAuditTime() {
		return auditTime;
	}

	public void setAuditTime(Timestamp auditTime) {
		this.auditTime = auditTime;
	}

	public Timestamp getBeginCycleTime() {
		return beginCycleTime;
	}

	public void setBeginCycleTime(Timestamp beginCycleTime) {
		this.beginCycleTime = beginCycleTime;
	}

    public Timestamp getEndCycleTime() {
        return endCycleTime;
    }

    public void setEndCycleTime(Timestamp endCycleTime) {
        this.endCycleTime = endCycleTime;
    }

	public Integer getCycleDays() {
		return cycleDays;
	}

	public void setCycleDays(Integer cycleDays) {
		this.cycleDays = cycleDays;
	}


	public String getMainTypeName() {
		return mainTypeName;
	}

	public void setMainTypeName(String mainTypeName) {
		this.mainTypeName = mainTypeName;
	}

	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name == null ? null : name.trim();
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address == null ? null : address.trim();
	}

	

	public String getTrademark() {
		return trademark;
	}

	public void setTrademark(String trademark) {
		this.trademark = trademark == null ? null : trademark.trim();
	}

	

	public String getWebsite() {
		return website;
	}

	public void setWebsite(String website) {
		this.website = website == null ? null : website.trim();
	}

	public String getFax() {
		return fax;
	}

	public void setFax(String fax) {
		this.fax = fax == null ? null : fax.trim();
	}

	public String getPostcode() {
		return postcode;
	}

	public void setPostcode(String postcode) {
		this.postcode = postcode == null ? null : postcode.trim();
	}

	
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email == null ? null : email.trim();
	}

	public String getQq() {
		return qq;
	}

	public void setQq(String qq) {
		this.qq = qq == null ? null : qq.trim();
	}

	

	public String getOriginal() {
		return original;
	}

	public void setOriginal(String original) {
		this.original = original == null ? null : original.trim();
	}



	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone == null ? null : phone.trim();
	}

	

	public Double getLongitude() {
		return longitude;
	}

	public void setLongitude(Double longitude) {
		this.longitude = longitude;
	}

	public Double getLatitude() {
		return latitude;
	}

	public void setLatitude(Double latitude) {
		this.latitude = latitude;
	}

	public String getStartTime() {
		return startTime;
	}

	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}

	public String getEndTime() {
		return endTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}

	public String getIntroduction() {
		return introduction;
	}

	public void setIntroduction(String introduction) {
		this.introduction = introduction;
	}


	public String getOperatingAreas() {
		return operatingAreas;
	}

	public void setOperatingAreas(String operatingAreas) {
		this.operatingAreas = operatingAreas;
	}


	public String getAuditStartTime() {
		return auditStartTime;
	}

	public void setAuditStartTime(String auditStartTime) {
		this.auditStartTime = auditStartTime;
	}

	public String getAuditEndTime() {
		return auditEndTime;
	}

	public void setAuditEndTime(String auditEndTime) {
		this.auditEndTime = auditEndTime;
	}

	public String getAuditStatus() {
		return auditStatus;
	}

	public void setAuditStatus(String auditStatus) {
		this.auditStatus = auditStatus;
	}

	public String getExpandAreaName() {
		return expandAreaName;
	}

	public void setExpandAreaName(String expandAreaName) {
		this.expandAreaName = expandAreaName;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	public String getChargeName() {
		return chargeName;
	}

	public void setChargeName(String chargeName) {
		this.chargeName = chargeName;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public String geteUserId() {
		return eUserId;
	}

	public void seteUserId(String eUserId) {
		this.eUserId = eUserId;
	}

	

	public Map<String, Object> getProductAmount() {
		return productAmount;
	}

	public void setProductAmount(Map<String, Object> productAmount) {
		this.productAmount = productAmount;
	}
	

	public String getParentName() {
		return parentName;
	}

	public void setParentName(String parentName) {
		this.parentName = parentName;
	}

	public List<LocationsFrom> getOperationAreas() {
		return operationAreas;
	}

	public void setOperationAreas(List<LocationsFrom> operationAreas) {
		this.operationAreas = operationAreas;
	}

	public String getLogo() {
		return logo;
	}

	public void setLogo(String logo) {
		this.logo = logo;
	}

	public String getContactPerson() {
		return contactPerson;
	}

	public void setContactPerson(String contactPerson) {
		this.contactPerson = contactPerson;
	}

	public String getContactPhone() {
		return contactPhone;
	}

	public void setContactPhone(String contactPhone) {
		this.contactPhone = contactPhone;
	}

	public String getBusinessType() {
		return businessType;
	}
	//gld:getDicName('indent_type',company.businessType)
	public void setBusinessType(String businessType) {
		this.businessType = businessType;
		
	}

	public String getLegalRepresentative() {
		return legalRepresentative;
	}

	public void setLegalRepresentative(String legalRepresentative) {
		this.legalRepresentative = legalRepresentative;
	}

	public Timestamp getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Timestamp createdAt) {
		this.createdAt = createdAt;
		//yyyy-MM-dd HH:mm:ss
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		this.createdAtStr = format.format(createdAt);
	}

	public Timestamp getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(Timestamp updatedAt) {
		this.updatedAt = updatedAt;
	}

	public String getCooperationStatus() {
		return cooperationStatus;
	}

	public void setCooperationStatus(String cooperationStatus) {
		this.cooperationStatus = cooperationStatus;
	}

	public String getMobilePhone() {
		return mobilePhone;
	}

	public void setMobilePhone(String mobilePhone) {
		this.mobilePhone = mobilePhone;
	}

	public String getLocationAreaCode() {
		return locationAreaCode;
	}

	public void setLocationAreaCode(String locationAreaCode) {
		this.locationAreaCode = locationAreaCode;
	}

	public String getMainCategories() {
		return mainCategories;
	}

	public void setMainCategories(String mainCategories) {
		this.mainCategories = mainCategories;
	}

	public Long getOperateCategory() {
		return operateCategory;
	}

	public void setOperateCategory(Long operateCategory) {
		this.operateCategory = operateCategory;
	}

	public String getExpandAreaCode() {
		return expandAreaCode;
	}

	public void setExpandAreaCode(String expandAreaCode) {
		this.expandAreaCode = expandAreaCode;
	}

	public Long getParentId() {
		return parentId;
	}

	public void setParentId(Long parentId) {
		this.parentId = parentId;
	}



	public String getCompanyAttribute() {
		return companyAttribute;
	}



	public String getCompanyAttributeStr() {
		return companyAttributeStr;
	}

	public void setCompanyAttributeStr(String companyAttributeStr) {
		this.companyAttributeStr = companyAttributeStr;
	}

	public Boolean getIsDelete() {
		return isDelete;
	}

	public void setIsDelete(Boolean isDelete) {
		this.isDelete = isDelete;
	}

	public Long getQualityGrade() {
		return qualityGrade;
	}

	public void setQualityGrade(Long qualityGrade) {
		this.qualityGrade = qualityGrade;
	}

	public String getParentLocationAreaCode() {
		return parentLocationAreaCode;
	}

	public void setParentLocationAreaCode(String parentLocationAreaCode) {
		this.parentLocationAreaCode = parentLocationAreaCode;
	}

	public String getBrandName() {
		return brandName;
	}

	public void setBrandName(String brandName) {
		this.brandName = brandName;
	}

	public String getFirstMaterialTypes() {
		return firstMaterialTypes;
	}

	public void setFirstMaterialTypes(String firstMaterialTypes) {
		this.firstMaterialTypes = firstMaterialTypes;
	}

	public String getSecondMaterialTypes() {
		return secondMaterialTypes;
	}

	public void setSecondMaterialTypes(String secondMaterialTypes) {
		this.secondMaterialTypes = secondMaterialTypes;
	}

	public String getContactStatus() {
		return contactStatus;
	}

	public void setContactStatus(String contactStatus) {
		this.contactStatus = contactStatus;
	}

	public String getContactType() {
		return contactType;
	}

	public void setContactType(String contactType) {
		this.contactType = contactType;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public Long getUserGroupId() {
		return userGroupId;
	}

	public void setUserGroupId(Long userGroupId) {
		this.userGroupId = userGroupId;
	}

	public String getParentExpandAreaCode() {
		return parentExpandAreaCode;
	}

	public void setParentExpandAreaCode(String parentExpandAreaCode) {
		this.parentExpandAreaCode = parentExpandAreaCode;
	}

	public Integer getProductCount() {
		return productCount;
	}

	public void setProductCount(Integer productCount) {
		this.productCount = productCount;
	}

	public String getProcessStatus() {
		return processStatus;
	}

	public void setProcessStatus(String processStatus) {
		this.processStatus = processStatus;
	}

	public String getPriceNote() {
		return priceNote;
	}

	public void setPriceNote(String priceNote) {
		this.priceNote = priceNote;
	}

	public String getIndentType() {
		return indentType;
	}

	public void setIndentType(String indentType) {
		this.indentType = indentType;
	}

	public String getLocationArea() {
		return locationArea;
	}

	public void setLocationArea(String locationArea) {
		this.locationArea = locationArea;
	}

	public String geteUserName() {
		return eUserName;
	}

	public void seteUserName(String eUserName) {
		this.eUserName = eUserName;
	}

	public Timestamp getCooperationTime() {
		return cooperationTime;
	}

	public void setCooperationTime(Timestamp cooperationTime) {
		this.cooperationTime = cooperationTime;
	}

	public String getAssCertEnterprise() {
		return assCertEnterprise;
	}

	public void setAssCertEnterprise(String assCertEnterprise) {
		this.assCertEnterprise = assCertEnterprise;
	}


	public String geteStartDate() {
		return eStartDate;
	}

	public String geteEndDate() {
		return eEndDate;
	}

	public void seteStartDate(String eStartDate) {
		this.eStartDate = eStartDate;
	}

	public void seteEndDate(String eEndDate) {
		this.eEndDate = eEndDate;
	}

	public String getQuotedPriceType() {
		return quotedPriceType;
	}

	public void setQuotedPriceType(String quotedPriceType) {
		this.quotedPriceType = quotedPriceType;
	}

	public Long getHasReleasedCount() {
		return hasReleasedCount;
	}

	public Long getNoCorrectionCount() {
		return noCorrectionCount;
	}

	public Long getNotClassifiedCount() {
		return notClassifiedCount;
	}

	public Long getHaveCorrectionCount() {
		return haveCorrectionCount;
	}

	public void setHasReleasedCount(Long hasReleasedCount) {
		this.hasReleasedCount = hasReleasedCount;
	}

	public void setNoCorrectionCount(Long noCorrectionCount) {
		this.noCorrectionCount = noCorrectionCount;
	}

	public void setNotClassifiedCount(Long notClassifiedCount) {
		this.notClassifiedCount = notClassifiedCount;
	}

	public void setHaveCorrectionCount(Long haveCorrectionCount) {
		this.haveCorrectionCount = haveCorrectionCount;
	}

	public String getpStartDate() {
		return pStartDate;
	}

	public String getpEndDate() {
		return pEndDate;
	}

	public void setpStartDate(String pStartDate) {
		this.pStartDate = pStartDate;
	}

	public void setpEndDate(String pEndDate) {
		this.pEndDate = pEndDate;
	}

	public String getLastProcessStatus() {
		return lastProcessStatus;
	}

	public void setLastProcessStatus(String lastProcessStatus) {
		this.lastProcessStatus = lastProcessStatus;
	}

	public Integer getResidualMaintainDays() {
		return residualMaintainDays;
	}

	public void setResidualMaintainDays(Integer residualMaintainDays) {
		this.residualMaintainDays = residualMaintainDays;
	}

	public Timestamp getReturnTime() {
		return returnTime;
	}

	public void setReturnTime(Timestamp returnTime) {
		this.returnTime = returnTime;
	}
	
}