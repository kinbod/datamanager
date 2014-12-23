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
*@date:2014-5-8
*
*最后更改日期：
*
*
*修改人：
*
*
	********************************************************/

package com.gcj.entity.from;


public class FilesForm {
	private String fileName;
	private String filePhysicalPath;
	private String fileMappingPath;
	private String fileType;
	private String fileSize;
	private String companyId;
	private String ownGroupId;
	private String paId;
	
	private int    userId;
	public String getFileName() {
		return fileName;
	}
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	public String getFilePhysicalPath() {
		return filePhysicalPath;
	}
	public void setFilePhysicalPath(String filePhysicalPath) {
		this.filePhysicalPath = filePhysicalPath;
	}
	public String getFileMappingPath() {
		return fileMappingPath;
	}
	public void setFileMappingPath(String fileMappingPath) {
		this.fileMappingPath = fileMappingPath;
	}
	public String getFileType() {
		return fileType;
	}
	public void setFileType(String fileType) {
		this.fileType = fileType;
	}
	public String getFileSize() {
		return fileSize;
	}
	public void setFileSize(String fileSize) {
		this.fileSize = fileSize;
	}
	public String getCompanyId() {
		return companyId;
	}
	public void setCompanyId(String companyId) {
		this.companyId = companyId;
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public String getOwnGroupId() {
		return ownGroupId;
	}
	public void setOwnGroupId(String ownGroupId) {
		this.ownGroupId = ownGroupId;
	}
	public String getPaId() {
		return paId;
	}
	public void setPaId(String paId) {
		this.paId = paId;
	}
}
