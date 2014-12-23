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
*@date:2014-5-21
*
*最后更改日期：
*
*
*修改人：
*
*
	********************************************************/

package com.gcj.utils;

import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

public class TimeUtils {
	
	public static String FORMATyyyy_MM_dd = "yyyy-MM-dd";
	public static final String PATTERN_DEFAULT = "yyyy-MM-dd";
	public static final String PATTERN_WITH_TIME = "yyyy-MM-dd HH:mm:ss";
	
	/**
	 * 时间天数加减
	 * @param timestamp
	 * @param addDays
	 * @return
	 * @author 张作强
	 */
	public static Timestamp addDays(Timestamp timestamp,int addDay){
		Long amount =  timestamp.getTime()+(1000l*24*60*60*addDay)	;
		return  new  Timestamp(amount);
	}
	
	
	/**
	 * 时间格式化
	 * @param timestamp
	 * @param addDays
	 * @return
	 * @author 张作强
	 */
	public static Timestamp fromatyyyyMMdd(String timestamp){
		return Timestamp.valueOf(timestamp);
	}
	
	/**
	 * 时间格式化
	 * @param timestamp
	 * @param addDays
	 * @return
	 * @author 张作强
	 */
	public static Timestamp fromatyyyyMMdd(Timestamp timestamp,String format){
		SimpleDateFormat df = new SimpleDateFormat(format);
		Date date = timestamp;
		String str = df.format(date);
		return Timestamp.valueOf(str+" 00:00:00");
	}
	
	
	/**
	 * 时间比较
	 * @param time1
	 * @param time2
	 * @return	如果time1大于time2返回正数，相等返回0，否则返回负数
	 * @author 张作强
	 */
	public static long compareTime(Timestamp time1,Timestamp time2){
		 long count1 = time1.getTime();
		 long count2 = time2.getTime();
		 return count1-count2;
		/* Calendar cal1 = Calendar.getInstance();
	     Calendar cal2 = Calendar.getInstance();
	     cal1.setTimeInMillis(time1.getTime());
	     cal2.setTimeInMillis(time2.getTime());
	     return cal1.getTime().compareTo(cal2.getTime());*/
	}
	/**
	 * 根据 时间格式   转换字符串时间为 毫秒值
	 *描述该方法的作用
	 *
	 * @param dateStr
	 * @param pattern
	 * @return
	 * @author zhangxl-d
	 */
	public static Long strDateToTimes(String dateStr,String pattern){
		if(dateStr == null || pattern == null){
			return null;
		}
		SimpleDateFormat sdf = new SimpleDateFormat(pattern);
		try {
			return sdf.parse(dateStr).getTime();
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return null;
	}
	
	//===================zhanggy-b=======================//
	//日期格式
	static String YMD = "yyyy-MM-dd";
	static String hms = "HH:mm:ss";
	static String hmsS = hms + " SSS";
	static String YMDhms = YMD + " " + hms;
	static String YMDhmsS = YMD + " " + hmsS;
	
	//日期解析对象(单例)
	private static SimpleDateFormat sdf = null;
	public static SimpleDateFormat singleSDF(){
		synchronized (TimeUtils.class) {
			if( sdf == null ){
				sdf = new SimpleDateFormat();
			}
			return sdf;
		}
	}
	
	/** ---------------------- 当前日期时间处理 ：开始------------------------ **/
	
	//格式化日期时间 根据日期时间的格式模式
	public static String format(Date date, String pattern){
		SimpleDateFormat singleSDF = singleSDF();
		singleSDF.applyPattern(pattern);
		return singleSDF.format(date);
	}
	
	//格式化日期时间 yyyy-MM-dd HH:mm:ss
	public static String formatDateTime(Date date){
		return format(date, YMDhms);
	}
	
	//格式化日期时间 yyyy-MM-dd
	public static String formatDate(Date date){
		return format(date, YMD);
	}
	
	//格式化日期时间 HH:mm:ss
	public static String formatTime(Date date){
		return format(date, hms);
	}
	
	//格式化日期时间 yyyy-MM-dd HH:mm:ss SSS
	public static String formatDateTimeFull(Date date){
		return format(date, YMDhmsS);
	}
	
	//格式化日期时间  HH:mm:ss SSS
	public static String formatTimeFull(Date date){
		return format(date, hmsS);
	}
	
	//当前日期时间(根据传入的日期模式进行匹配)
	public static String currDateTime(String pattern){
		return format(Calendar.getInstance().getTime(), pattern);
	}
	
	//当前的日期时间(使用默认的日期时间格式) yyyy-MM-dd HH:mm:ss
	public static String currDateTime(){
		return currDateTime(YMDhms);
	}
	
	//当前的日期(使用默认的日期格式) yyyy-MM-dd
	public static String currDate(){
		return currDateTime(YMD);
	}
	
	//当前的时间(使用默认的时间格式) HH:mm:ss
	public static String currTime(){
		return currDateTime(hms);
	}
	
	//当前的日期时间全模式(使用默认的日期时间格式) yyyy-MM-dd HH:mm:ss SSS
	public static String currDateTimeFull(){
		return currDateTime(YMDhmsS);
	}
	
	//当前的时间全模式(使用默认的时间格式) HH:mm:ss SSS
	public static String currTimeFull(){
		return currDateTime(hmsS);
	}
	/** ---------------------- 当前日期时间处理：结束 ------------------------ **/
	
	
	/** ---------------------- 日期时间字符串处理：开始 ------------------------ **/
	//解析为指定的日期模式
	public static Date parse(String source, String pattern){
		try {
			SimpleDateFormat sdf = singleSDF();
			sdf.applyPattern(pattern);
			return sdf.parse(source);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	//解析 yyyy-MM-dd HH:mm:ss
	public static Date parseDateTime(String source){
		return parse(source, YMDhms);
	}
	
	//解析 yyyy-MM-dd
	public static Date parseDate(String source){
		return parse(source, YMD);
	}
	
	//解析 HH:mm:ss
	public static Date parseTime(String source){
		return parse(currDate() + " " + source, YMDhms);
	}
	
	//解析 yyyy-MM-dd HH:mm:ss SSS
	public static Date parseDateTimeFull(String source){
		return parse(source, YMDhmsS);
	}
	
	//解析 HH:mm:ss SSS
	public static Date parseTimeFull(String source){
		return parse(currDate() + " " + source, YMDhmsS);
	}
	/** ---------------------- 日期时间字符串处理：结束 ------------------------ **/
	
	
    private static int weeks = 0;
    
    // 获得当前日期与本周一相差的天数
    private static int getMondayPlus() {
        Calendar cd = Calendar.getInstance();
        // 获得今天是一周的第几天，星期日是第一天，星期二是第二天......
        int dayOfWeek = cd.get(Calendar.DAY_OF_WEEK);
        if (dayOfWeek == 1) {
            return -6;
        } else {
            return 2 - dayOfWeek;
        }
    }

    // 获得上周星期一的日期
    public static String getPreviousMonday() {
        int mondayPlus = getMondayPlus();
        GregorianCalendar currentDate = new GregorianCalendar();
        currentDate.add(GregorianCalendar.DATE, mondayPlus -7);
        Date monday = currentDate.getTime();
        String preMonday = formatDate(monday);
        return preMonday;
    }
    
    // 获得上周星期天的日期
    public static String getPreviousSunday() {
        int mondayPlus = getMondayPlus();
        GregorianCalendar currentDate = new GregorianCalendar();
        currentDate.add(GregorianCalendar.DATE, mondayPlus -1);
        Date monday = currentDate.getTime();
        String preMonday = formatDate(monday);
        return preMonday;
    }

    // 获得本周星期一的日期
    public static String getCurrentMonday() {
        weeks = 0;
        int mondayPlus = getMondayPlus();
        GregorianCalendar currentDate = new GregorianCalendar();
        currentDate.add(GregorianCalendar.DATE, mondayPlus);
        Date monday = currentDate.getTime();
        DateFormat df = DateFormat.getDateInstance();
        String preMonday = df.format(monday);
        return preMonday;
    }

    // 获得下周星期一的日期
    public static String getNextMonday() {
        weeks++;
        int mondayPlus = getMondayPlus();
        GregorianCalendar currentDate = new GregorianCalendar();
        currentDate.add(GregorianCalendar.DATE, mondayPlus + 7 * weeks);
        Date monday = currentDate.getTime();
        DateFormat df = DateFormat.getDateInstance();
        String preMonday = df.format(monday);
        return preMonday;
    }

    // 获得相应周的周日的日期
    public static  String getSunday() {
        int mondayPlus = getMondayPlus();
        GregorianCalendar currentDate = new GregorianCalendar();
        currentDate.add(GregorianCalendar.DATE, mondayPlus + 7 * weeks + 6);
        Date monday = currentDate.getTime();
        DateFormat df = DateFormat.getDateInstance();
        String preMonday = df.format(monday);
        return preMonday;
    } 
    
    public static void main(String[] args) {
    	System.out.println(getPreviousMonday());
    	System.out.println(getPreviousSunday());
	}
	
	
}