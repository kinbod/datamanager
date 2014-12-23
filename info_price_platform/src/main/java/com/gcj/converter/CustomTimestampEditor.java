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
*@date:2014-4-22
*
*最后更改日期：
*
*
*修改人：
*
*
	********************************************************/

package com.gcj.converter;

import java.beans.PropertyEditorSupport;
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;

import org.springframework.util.StringUtils;

public class CustomTimestampEditor  extends PropertyEditorSupport {

	
	  private final SimpleDateFormat dateFormat;
	    private final boolean allowEmpty;
	    private final int exactDateLength;
	 
	    public CustomTimestampEditor(SimpleDateFormat dateFormat, boolean allowEmpty) {
	        this.dateFormat = dateFormat;
	        this.allowEmpty = allowEmpty;
	        this.exactDateLength = -1;
	    }
	 
	    public CustomTimestampEditor(SimpleDateFormat dateFormat,
	            boolean allowEmpty, int exactDateLength) {
	        this.dateFormat = dateFormat;
	        this.allowEmpty = allowEmpty;
	        this.exactDateLength = exactDateLength;
	    }
	 
	    public void setAsText(String text) throws IllegalArgumentException {
	        if ((this.allowEmpty) && (!(StringUtils.hasText(text)))) {
	            setValue(null);
	        } else {
	            if ((text != null) && (this.exactDateLength >= 0)
	                    && (text.length() != this.exactDateLength)) {
	                throw new IllegalArgumentException(
	                        "Could not parse date: it is not exactly"
	                                + this.exactDateLength + "characters long");
	            }
	            try {
	                setValue(new Timestamp(this.dateFormat.parse(text).getTime()));
	            } catch (ParseException ex) {
	                throw new IllegalArgumentException("Could not parse date: "
	                        + ex.getMessage(), ex);
	            }
	        }
	    }
	 
	    public String getAsText() {
	        Timestamp value = (Timestamp) getValue();
	        return ((value != null) ? this.dateFormat.format(value) : "");
	    }
}
