package com.gcj.common;
/**
 * 事务层异常处理类
 * @author 张作强
 *
 */
@SuppressWarnings("serial")
public class BusinessException extends RuntimeException {

	public BusinessException() {
		super();
	}

	public BusinessException(String message, Throwable cause) {
		super(message, cause);
	}

	public BusinessException(String message) {
		super(message);
	}

	public BusinessException(Throwable cause) {
		super(cause);
	}
	
	

}
