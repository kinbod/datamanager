package com.gcj.common;

/**
 * 静态常量类
 * 
 * @author zhangzq-a
 * 
 */
public class Constants {

	/**接口调用秘钥*/
	public final static String INITIAL_ACCESS_TOKEN = "RTZ4dHFaZGFNM0Qwbm8yakc5UTZwNXlpc2ZoNFdtSko6TGdzZW96ZEtyY3ROdXR0ckVGaDhtU0lpVEdqSFhUdGg=";
	/**接口调用请求头*/
	public final static String INITIAL_AUTHORIZATION = "Basic "+INITIAL_ACCESS_TOKEN;
	/** 重置密码          初始密码 : 888888 **/
	public final static String INITIAL_PASSWORD_VALUE = "88888888";
	/**重置密码           访问路径： http://sso-test.glodon.com//api/users **/
	public final static String INITIAL_PASSWORD_URL = "https://api.glodon.com/account/reset_password";
//	public final static String INITIAL_PASSWORD_URL = "http://sso.glodon.com/api/users";//正式网
	/** 验证用户信息 访问路径 **/
	public final static String INITIAL_PASSWORD_URL_SEARCH = "https://api.glodon.com/account/signup/captcha";//测试网

	
	public final static String COMPANY_USER_VERIFY_LOGIN_NAME_URL = "https://api.glodon.com/account/identity?identity=";
	public final static String COMPANY_USER_VERIFICATION_CODE_URL = "https://api.glodon.com/account/signup/captcha";
	public final static String COMPANY_USER_SING_UP_URL = "https://api.glodon.com/account/signup";
	
	
	
	/** 大数据平台材料自-分类接口地址   **/
	public final static String BIG_DATA_PRODUCT_AUTO_CLASSIFY_PORT_URL = "http://ml.gldjc.com/auto_classify_infos/classify_to_gldjc";
//	public final static String BIG_DATA_PRODUCT_AUTO_CLASSIFY_PORT_URL = "http://192.168.91.45:4000/auto_classify_infos/classify_to_gldjc";
	/** 大数据平台材料纠偏完成接口地址   **/
	public final static String BIG_DATA_PRODUCT_REDRESSED_PORT_URL = "http://ml.gldjc.com/auto_classify_infos/get_correction_classify_data";
	/** 大数据平台材料属性拆分接口地址   **/
	public final static String BIG_DATA_PRODUCT_ATTR_STRUCTURE_PORT_URL = "http://ml.gldjc.com/structures/structure_data";
	
	/** 是否判断 否 : 1 **/
	public final static String NO = "1";
	/** 是否判断 是 : 0 **/
	public final static String YES = "0";

	// 是否删除
	
	/** 是否删除对应值：是 **/
	public final static Boolean COMMON_IS_DELETE_VALUE_TRUE = true;
	/** 是否删除对应值：否 **/
	public final static Boolean COMMON_IS_DELETE_VALUE_FALSE = false;
	/** 是否删除创建时所对应的默认值 **/
	public final static Boolean COMMON_IS_DELETE_VALUE_CREATE = COMMON_IS_DELETE_VALUE_FALSE;
	
	// 供应商来源
	
	/** 供应商来源  -类型对应值：需求拓展 **/
	public final static String COMMON_ADDITIONAL_INFOS_ORIGINAL_CREATE = "register_manager";
	/** 供应商来源  -类型对应值：自主注册 ：register **/
	public final static String COMMON_ADDITIONAL_INFOS_ORIGINAL_REGISTER = "register";

	// 供应商日志类型
	
	/** 供应商操作日志 -类型对应值：系统日志 **/
	public final static String COMPANY_MODIFY_LOG_TYPE_SYSTEM = "system_log";
	/** 供应商操作日志 -类型对应值：用户日志 **/
	public final static String COMPANY_MODIFY_LOG_TYPE_USER = "user_log";

	// 供应商日志动作名称
	
	/** 供应商操作日志 -动作名称对应值：创建 **/
	public final static String COMPANY_MODIFY_ACTION_NAME_CREATE = "company_insert";
	/** 供应商操作日志 -动作名称对应值：修改 **/
	public final static String COMPANY_MODIFY_ACTION_NAME_UPDATE = "company_update";
	/** 供应商操作日志 -动作名称对应值：删除 **/
	public final static String COMPANY_MODIFY_ACTION_NAME_DELETE = "company_delete";
	/** 供应商操作日志 -动作名称对应值：审核 **/
	public final static String COMPANY_MODIFY_ACTION_NAME_REVIEW = "company_review";

	// 供应商日志业务状态
	
	/** 供应商操作日志 -业务状态对应值：注册供应商 **/
	public final static String COMPANY_MODIFY_BUSINESS_STATUS_REGISTRATION = "registration_supplier";
	/** 供应商操作日志 -业务状态对应值：运营供应商 **/
	public final static String COMPANY_MODIFY_BUSINESS_STATUS_OPERATIONS = "operations_supplier";
	/** 供应商操作日志 -业务状态对应值：重复厂商 **/
	public final static String COMPANY_MODIFY_BUSINESS_STATUS_repeat = "repeat";
	/** 供应商操作日志 -业务状态对应值：问题厂商 **/
	public final static String COMPANY_MODIFY_BUSINESS_STATUS_PROBLEM = "problem_supplier";
	/** 供应商操作日志 -业务状态对应值：重新拓展厂商 **/
	public final static String COMPANY_MODIFY_BUSINESS_STATUS_RE_EXPAND = "re_expand_supplier";
	/** 供应商操作日志 -业务状态对应值：采集供应商 **/
	public final static String COMPANY_MODIFY_BUSINESS_STATUS_COLLECT = "collect_supplier";
	/** 供应商操作日志 -业务状态对应值：E化供应商 **/
	public final static String COMPANY_MODIFY_BUSINESS_STATUS_COOPERATION = "cooperation_supplier";
	/** 供应商操作日志 -业务状态对应值：关系维护供应商 **/
	public final static String COMPANY_MODIFY_BUSINESS_STATUS_MAINTAIN = "maintain_supplier";
	/** 供应商操作日志 -业务状态对应值：非合作供应商 **/
	public final static String COMPANY_MODIFY_BUSINESS_STATUS_NO_COOPERATION = "no_cooperation_supplier";
	/** 供应商操作日志 -业务状态对应值：拓展中供应商 **/
	public final static String COMPANY_MODIFY_BUSINESS_STATUS_EXPANDING = "expanding_supplier";
	
	// 供应商日志处理状态
	
	/** 供应商操作日志 -处理状态对应值：拓展中  对应的未合作 **/
	public final static String COMPANY_MODIFY_PROCESS_STATUS_REGISTRATION = "expanding_supplier";
	/** 供应商操作日志 -处理状态对应值：正常维护 已合作**/
	public final static String COMPANY_MODIFY_PROCESS_STATUS_PROBLEM = "normal_maintain_supplier";
	/** 供应商操作日志 -处理状态对应值：异常维护 未合作**/
	public final static String COMPANY_MODIFY_PROCESS_STATUS_RE_EXPAND = "abnormal_maintain_supplier";
	
	// 拓展中 审核中 是拓展审核
	// 异常维护 审核中 是拓展审核
	
	// 正常维护 审核中 是关系维护审核
	
	/** 供应商操作日志 -处理状态对应值：审核中 **/
	public final static String COMPANY_MODIFY_PROCESS_STATUS_OPERATIONS = "1";
	/** 供应商操作日志 -处理状态对应值：E化中 对应待E化 **/
	public final static String COMPANY_MODIFY_PROCESS_STATUS_repeat = "cooperating_supplier";
	/** 供应商操作日志 -处理状态对应值：E化中 **/
	public final static String COMPANY_MODIFY_PROCESS_STATUS_MAINTAIN = "cooperating_supplier";
	
	/** 供应商操作日志 -处理状态对应值：审核通过 **/
	public final static String COMPANY_MODIFY_PROCESS_STATUS_THROUGH = "auditing_through";
	/** 供应商操作日志 -处理状态对应值：审核未通过 **/
	public final static String COMPANY_MODIFY_PROCESS_STATUS_NOT_THROUGH = "auditing_through";
	
	
	
	
	// 联系人类型

	/** 联系人 -类型对应默认值 **/
	public final static String CONTACT_RESOURCE_TYPE_CREATE = "Company";

	// 是否主要联系人
	
	/** 联系人-是否是主要联系人对应值：是 **/
	public final static Boolean CONTACT_IS_MAIN_VALUE_TRUE = true;
	/** 联系人-是否是主要联系人对应值：否 **/
	public final static Boolean CONTACT_IS_MAIN_VALUE_FALSE = false;
	/** 联系人-是否是主要联系人创建时所对应的默认值 **/
	public final static Boolean CONTACT_IS_MAIN_VALUE_CREATE = CONTACT_IS_MAIN_VALUE_FALSE;

	// 联系人是否显示
	
	/** 联系人-是否是显示对应值：是 **/
	public final static Boolean CONTACT_IS_SHOW_VALUE_TRUE = true;
	/** 联系人-是否是显示对应值：否 **/
	public final static Boolean CONTACT_IS_SHOW_VALUE_FALSE = false;
	/** 联系人-是否是显示创建时所对应的默认值 **/
	public final static Boolean CONTACT_IS_SHOW_VALUE_CREATE = CONTACT_IS_SHOW_VALUE_FALSE;

	// 品牌是否显示
	
	/** 品牌-是否可以显示对应值：是 **/
	public final static Boolean BRAND_CAN_DISPLAY_VALUE_TRUE = true;
	/** 品牌-是否可以显示对应值：否 **/
	public final static Boolean BRAND_CAN_DISPLAY_VALUE_FALSE = false;
	/** 品牌-创建时所对应的默认值 **/
	public final static Boolean BRAND_CAN_DISPLAY_VALUE_CREATE = BRAND_CAN_DISPLAY_VALUE_TRUE;

	/*****  ---------------价格保留位数---------------   ******/
	/** 价格保留位数 保留整数：zero_decimal **/
	public final static String ZERO_DECIMAL = "zero_decimal";
	/** 价格保留位数 保留两位小数：two_decimal **/
	public final static String TWO_DECIMAL = "two_decimal";
	/** 价格保留位数 保留一位小数：one_decimal **/
	public final static String ONE_DECIMAL = "one_decimal";
	
	/*****  ---------------价格修改方式---------------   ******/
	/** 价格修改方式 按比例上调：proportion_rise **/
	public final static String PROPORTION_RISE = "proportion_rise";
	/** 价格修改方式 按比例 下调：proportion_decline **/
	public final static String PROPORTION_DECLINE = "proportion_decline";
	/** 价格修改方式 按金额上调：money_rise **/
	public final static String MONEY_RISE = "money_rise";
	/** 价格修改方式 按金额下调：money_decline **/
	public final static String MONEY_DECLINE = "money_decline";

	/********************************设置运费税金和工程折扣 是否包含运费税金或折扣**********************************/
	/**运费税金和工程折扣:  包含   1*/
	public static final String INCLUDE ="1";
	/**运费税金和工程折扣:   不包含    2*/
	public static final String UN_INCLUDE ="2";
	
	
	/***************************************返回操作是否成功标识*********************************************/
	/***成功  */
	public static final String SUCCESS ="1";
	/**失敗*/
	public static final String FAIL ="0";
	
	
	/**********************************************供应商不存在哪种文件类型标识*******************************/
	/**供应商不存在合作登记表     标识 */
	public static final String NOEXIST_COOPERATION_REGISTER= "2";
	/**供应商不存在营业执照 标识 */
	public static final String NOEXIST_BUSINESS_LICENSE="3";
	/**供应商不存在报价文件 标识 */
	public static final String NOEXIST_OFFER_DOCUMENT="4";
	/**供应商不存在联系人 标识 */
	public static final String NOEXIST_CONTACT_PEOPLE="5";
    /***********************************************供应商审核类型*******************************************/
    /**供应商审核类型: 供应商拓展审核       audit_expend   */
    public static final String COMPANY_EXPAND_AUDIT= "audit_expend";
    /** 供应商审核类型: 供应商关系维护审核     audit_maintain*/
    public static final String COMPANY_MAINTAIN_AUDIT= "audit_maintain";
   
    
    /***********************************************供应商处理状态**************************************/
    /**供应商处理状态: 未处理状态      untreated*/
    public static final String COMPANY_PROCESS_STATUS_UNTREATED= "untreated";
    /**供应商处理状态: 待审核状态      pending_review*/
    public static final String COMPANY_PROCESS_STATUS_PENDING_REVIEW= "pending_review";
    /**供应商处理状态: 审核通过状态  through_review */
    public static final String COMPANY_PROCESS_STATUS_THROUGH_REVIEW= "through_review";
    /**供应商处理状态: 待E化状态        pending_e*/
    public static final String COMPANY_PROCESS_STATUS_PENDING_E= "pending_e";
    /**供应商处理状态: E化完成状态     e_completed*/
    public static final String COMPANY_PROCESS_STATUS_E_COMPLETED= "e_completed";
    /**供应商处理状态: 审核不通过状态    not_through_review */
    public static final String COMPANY_PROCESS_STATUS_NOT_THROUGH_REVIEW= "not_through_review";
    
    
    /***********************************************供应商修改日志-动作类型**************************************/
    /**供应商修改日志-动作类型: 返回审核    returnAudit */
    public static final String COMPANY_MODIFY_LOGS_ACTION_NAME_RETURN_AUDIT= "returnAudit";
    /**供应商修改日志-动作类型: 进入审核    intoAudit */
    public static final String COMPANY_MODIFY_LOGS_ACTION_NAME_INTO_AUDIT= "intoAudit";
    /**供应商修改日志-动作类型: 审核通过    auditThrough */
    public static final String COMPANY_MODIFY_LOGS_ACTION_NAME_AUDIT_THROUGH= "auditThrough";
    /**供应商修改日志-动作类型: 审核不通过    auditNotBy */
    public static final String COMPANY_MODIFY_LOGS_ACTION_NAME_AUDIT_NOTBY= "auditNotBy";
    
    
    /******************************************供应商文件类型：file-type *******************************/
    /**供应商合作登记表标识  6*/
    public static final Long COMPANY_FILE_COOPERATION_REGISTER= 6L;
    /**供应商营业执照标识  5*/
    public static final Long COMPANY_FILE_BUSINESS_LICENSE= 5L;
    /**供应商税务登记表标识   7*/
    public static final Long COMPANY_FILE_TAX_REGISTRATION= 7L;
    /**供应商文件类型  报价文件：11*/
    public static final Long COMPANY_FILE_TYPEID_OFFER= 11L;
    /**供应商文件类型  报价说明：14*/
    public static final Long COMPANY_FILE_QUOTE_DESCRIPTION= 14L;
    /**供应商文件类型  实景图片：13*/
    public static final Long COMPANY_FILE_VIRTUAL= 13L;
    /**供应商文件类型  关系维护记录：12*/
    public static final Long COMPANY_FILE_RECORD= 12L;
    
    
    /**********************************供应商修改日志类型**********************************/
    /**
     * 供应商修改日志类型：审核      日志标志
     */
    public static final String COMPANY_AUDIT_LOG= "audit";
    /**********************************供应商审核不通过原因   操作类型**********************************/
    /**供应商审核不通过原因   操作类型：   审核       1 */
    public static final String COMPANY_AUDIT_FLAG= "1";
    
    
    /*****************************************供应商紧急入库******************************************/
    /**供应商紧急入库标识  */
    public static final String COMPANY_URGENCY_FLAG= "1";
    
    
    /*****************************************系统用户是客户经理身份的标识 admin_user  position ***********/
    public static final String CHARGE_USER_TYPE= "1";
    
    
    /****************************材料状态*****************************************/
    /**材料状态        未处理：pending_review**/
    public static final String PRODUCT_STATUS_PENDING_REVIEW = "pending_review";
    /**材料状态        审核中：pending**/
     public static final String PRODUCT_STATUS_PENDING= "pending";
    /**材料状态        审核未通过：review_failed**/
    public static final String PRODUCT_STATUS_REVIEW_FAILED = "review_failed";
    /**材料状态        已发布：released**/
    public static final String PRODUCT_STATUS_RELEASED = "released";
    /**材料状态        已删除：deleted**/
    public static final String PRODUCT_STATUS_DELETED = "deleted";
    /**材料状态        有问题：error**/
    public static final String PRODUCT_STATUS_ERROR= "error";
    
    
    /****************************供应商状态*****************************************/
    /**供应商状态        未合作：no_cooperation**/
    public static final String COMPANY_STATUS_NO_COOPERATION = "no_cooperation";
    /**供应商状态        审核中：pending**/
    public static final String COMPANY_STATUS_PENDING = "pending";
    /**供应商状态        已合作：cooperation**/
    public static final String COMPANY_STATUS_COOPERATION = "cooperation";
    
    
    
    
    
    /****************************供应商所属阶段*****************************************/
    /**供应商所属阶段       拓展阶段：expand**/
    public static final String CONTACT_STATUS_EXPAND = "expand";
    /**供应商所属阶段        关系维护阶段：relationship**/
    public static final String CONTACT_STATUS_RELATIONSHIP = "relationship";
    
    
    /****************************供应商联系记录联系状态*****************************************/
    /**供应商联系记录联系状态     再跟踪：retrack**/
    public static final String CONSTACT_STATUS_RETRACK = "retrack";
    /**供应商联系记录联系状态     待维护：wait_contact**/
    public static final String CONSTACT_STATUS_WAIT_CONTACT = "wait_contact";
  
    /****************************材料修改类型*****************************************/
    /**修改材料名称类型  */
    public static final String MODIFY_PRODUCT_NAME_TYPE= "1";
    /**修改材料规格参数类型  */
    public static final String MODIFY_PRODUCT_SEPECIFICATION_TYPE= "2";
    /**修改材料类别 类型  */
    public static final String MODIFY_PRODUCT_TYPE_TYPE= "3";
    /**修改材料品牌  类型  */
    public static final String MODIFY_PRODUCT_BRAND_TYPE= "4";
    /**修改材料计价单位 类型  */
    public static final String MODIFY_PRODUCT_UNIT_TYPE= "5";
    /**修改材料材料描述  类型  */
    public static final String MODIFY_PRODUCT_NOTE_TYPE= "6";
    /**修改材料属性类型  */
    public static final String MODIFY_PRODUCT_PROPERTY_TYPE= "7";
    /**修改材料报价类型  */
    public static final String MODIFY_PRODUCT_PRICE_TYPE= "8";
    /**修改材料进入审核类型  */
    public static final String MODIFY_PRODUCT_AUDITING_TYPE= "9";
    /**修改材料审核通过类型  */
    public static final String MODIFY_PRODUCT_AUDIT_SUC_TYPE= "10";
    /**修改材料审核不通过类型  */
    public static final String MODIFY_PRODUCT_AUDIT_FAIL_TYPE= "11";
    
    /**修改材料图片类型  暂时不考虑*/
    public static final String MODIFY_PRODUCT_PICTURE_TYPE= "12";
    
    
    /****************************材料修改的操作类型*****************************************/
    /**修改材料信息类型  */
    public static final String MODIFY_PRODUCT_INFO_TYPE= "1";
    /**审核材料信息类型  */
    public static final String MODIFY_PRODUCT_AUDIT_TYPE= "2";
	
    
    /****************************材料纠偏状态*****************************************/
    /**材料纠偏状态：  开始分类     pending*/
    public static final String HANDLE_STATUS_PENDING = "pending";
    /**材料纠偏状态：  未纠偏/分类完成     no_correction*/
    public static final String HANDLE_STATUS_NO_CORRECTION= "classified";
    /**材料纠偏状态：  无法分类/分类失败     not_classified*/
    public static final String HANDLE_STATUS_NOT_CLASSIFIED= "classify_fail";
    /**材料纠偏状态：  已纠偏     have_correction*/
    public static final String HANDLE_STATUS_HAVE_CORRECTION= "have_correction";
    
    
    
    /****************************图片类型*****************************************/
    /**材料图片    类型  */
    public static final String PICTURE_PRODUCT_TYPE= "1";
	
    
    /********************************材料导出列数*********************************/
    public static final int PRODUCT_EXPORT_COL= 12;
    
    
    /********************************供应商导出列数*********************************/
    public static final int COMPANY_EXPORT_COL= 11;
    
    /********************************品牌库导出列数*********************************/
    public static final int CORE_BRAND_EXPORT_COL= 7;
    
    /********************************审核未通过材料导出列数*********************************/
    public static final int PRODUCT_AUDIT_FAIL_EXPORT_COL= 10;
    
    /********************************材料来源类型*********************************/
    /**材料来源类型：  导入     import*/
    public static final String PRODUCT_SOURCE_WAY_IMPORT= "import";
    public static final String PRODUCT_SOURCE_WAY_NEW= "new";
    
    
    
    /**设定协会认定企业*/
    public static final String ASS_CERT_ENTERPRISE = "1";
    
    
    /********************************文件导入记录类型*********************************/
    /**文件导入记录类型     导入材料：import_product**/
    public static final String FILE_IMPORT_RECORD_TYPE_IMPORT_PRODUCT= "import_product";
    /**文件导入记录类型     E化问题报价**/
    public static final String FILE_IMPORT_RECORD_TYPE_E_QUOTATION_ISSUE= "e-quotation-issue";
    /**文件导入记录类型     E化修改报价**/
    public static final String FILE_IMPORT_RECORD_TYPE_E_QUOTATION_MODIFIED= "e-quotation-modified";
    /**文件导入记录类型     品牌库**/
    public static final String FILE_IMPORT_RECORD_TYPE_CORE_BRAND= "core_brand";
    /**
     * 文件导入记录类型   审核未通材料过导入
     */
    public static final String FILE_IMPORT_RECORD_TYPE_IMPORT_PORDUCT_WITH_QUESTION= "import_porduct_with_question";
    
    
    /********************************材料报价文件所处状态*********************************/
    /**材料报价文件所处状态     未处理状态        untreated**/
    public static final String PRODUCT_OFFER_FILE_STATUS_UNTREATED= "untreated";
    /**材料报价文件所处状态     待审核状态        pending**/
    public static final String PRODUCT_OFFER_FILE_STATUS_PENDING= "pending";
    /**材料报价文件所处状态     待E化状态        pending_e**/
    public static final String PRODUCT_OFFER_FILE_STATUS_PENDING_E= "pending_e";
    /**材料报价文件所处状态     审核通过状态        through_review**/
    public static final String PRODUCT_OFFER_FILE_STATUS_THROUGH_REVIEW= "through_review";
    /**材料报价文件所处状态     E化完成状态        e_completed**/
    public static final String PRODUCT_OFFER_FILE_STATUS_E_COMPLETED= "e_completed";
    
    
    /********************************供应商材料报价文件类型   电子报价   纸质报价*********************************/
    /**供应商材料报价文件类型    电子报价        2**/
    public static final String QUOTED_PRICE_TYPE_ELECTRONIC= "2";
    /**供应商材料报价文件类型    纸质报价        1**/
    public static final String QUOTED_PRICE_TYPE_PAPER= "1";
    /**供应商材料报价文件类型    全部       3**/
    public static final String QUOTED_PRICE_TYPE_ALL= "3";
    
    /********************************系统用户身份*********************************/
    /**系统用户身份  客户经理 **/
    public static final String ADMIN_USER_POSITION_CUSTOMER_MANAGER= "customer_manager";
    /**系统用户身份  E化人**/
    public static final String ADMIN_USER_POSITION_E_USER= "e_user";
    /**系统用户身份  供应商审核人**/
    public static final String ADMIN_USER_POSITION_COMPANY_AUDIT_USER= "company_audit_user";
    /**系统用户身份  数据审核人**/
    public static final String ADMIN_USER_POSITION_DATA_AUDIT_USER= "data_audit_user";
    /**系统用户身份  系统管理员**/
    public static final String ADMIN_USER_POSITION_SYSTEM_MANAGER= "system_manager";
    /**系统用户身份  运营中心主管**/
    public static final String ADMIN_USER_POSITION_OPERATE_CENTER_MANAGER= "operate_center_manager";
    /**系统用户身份  E化中心主管**/
    public static final String ADMIN_USER_POSITION_E_CENTER_MANAGER= "e_center_manager";
    /**系统用户身份  审核中心主管**/
    public static final String ADMIN_USER_POSITION_AUDIT_CENTER_MANAGER= "audit_center_manager";
    /**
     * 1 首次下发， 2 再次下发
     */
    public static final Integer PRODUCT_AUDIT_LOG_DATA_TYPE_NEW = 1,  PRODUCT_AUDIT_LOG_DATA_TYPE_AGAIN = 2;
    public static final String USER_TYPE_SYSTEM_USER = "1", USER_TYPE_NETWORK_USER = "2";
    
    /**
     * 材料默认导出行数
     */
    public static final  int PRODUCT_DEFALUT_EXPORT_PAGE_SIZE=500;
    
    /**
     * 供应商默认导出行数
     */
    public static  final  int COMPANY_DEFALUT_EXPORT_PAGE_SIZE=3000;
    
    
    /********************************接口类型*********************************/
    /**接口类型  自动分类：auto_classify **/
    public static final String INTERFACE_LOG_TYPE_AUTO_CLASSIFY= "auto_classify";
    /**接口类型  纠偏完成:classified **/
    public static final String INTERFACE_LOG_TYPE_CLASSIFIED= "classified";
    /**接口类型  属性拆分：structures **/
    public static final String INTERFACE_LOG_TYPE_STRUCTURES= "structures";
    
    /**日志类型  品牌库供应商数量:corebrandcompancount **/
    public static final String LOG_CORE_BRAND_COMPANY_COUNT= "corebrandcompancount";
    /**日志类型  供应商品牌:companybrand **/
    public static final String LOG_COMPANY_BRAND= "companybrand";
    /**日志类型 供应商经营 类别: corebrandcompancount **/
    public static final String LOG_COMPANY_MATERIAL_TYPE= "companymaterialtype";
    
    
    
    
    /**审核未通过材料导出文件夹 **/
    public static final String PRODUCT_AUDIT_FAIL_FOLDER = "productAuditFail";
    
    //zhanggy-b
    /**需E化供应商-问题标记-未标记 **/
    public static final String E_COMPANY_PROBLEM_MARK_TYPE_NO_MARK = "no_mark";
    /**需E化供应商-问题标记-已标记 **/
    public static final String E_COMPANY_PROBLEM_MARK_TYPE_MARKED = "marked";
    /**需E化供应商-问题标记-已返回 **/
    public static final String E_COMPANY_PROBLEM_MARK_TYPE_RETURNED = "returned";
    
    
    /********************************公共参数*********************************/
    /**批量插入数量  ：20 **/
    public static final int BATCH_DEAL_NUM= 20;
    
    /**
     * 区分插入或修改价格的用户（广材商机）
     */
    public static final String UPLOAD_TYPE_NEW_SUPPLIER="new_supplier";
    
}
