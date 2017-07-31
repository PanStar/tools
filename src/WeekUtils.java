/**
 * Created by PanStar on 2017/7/31.
 */

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class WeekUtils {
    public final static int ISO8601 = 1; //第一个星期四所在周为第一周
    public final static int MSEXCEL = 2; //1月1日所在周为第一周
    private static int WEEK_METHOD = ISO8601;
    private static SimpleDateFormat SDF = new SimpleDateFormat("yyyy-MM-dd");

    /**
     * 获取星期计算方法
     * @return
     */
    public static int getWeekMethod(){
        return WEEK_METHOD;
    }
    /**
     * 设置星期计算方法
     * @param method
     */
    public static void setWeekMethod(int method){
        if(ISO8601 == method || MSEXCEL == method)
            WEEK_METHOD = method;
    }
    /**
     * 得到某年某周的第一天
     * @param year
     * @param week
     * @return
     */
    public static Date getFirstDayOfWeek(int year, int week) {
        Calendar calendar = Calendar.getInstance();
        if(getWeekMethod() == ISO8601){
            calendar.setFirstDayOfWeek(Calendar.MONDAY); //设置星期一为第一天 默认为星期天
            calendar.set(year,0,1);
            int w = calendar.get(Calendar.DAY_OF_WEEK);
            boolean b =  w <= Calendar.THURSDAY && w != Calendar.SUNDAY;//第一个星期四
            calendar.setWeekDate(year, b ? week : week + 1, calendar.getFirstDayOfWeek());
        }else if(getWeekMethod() == MSEXCEL){
            calendar.setWeekDate(year, week, calendar.getFirstDayOfWeek());
        }
//        System.out.println(calendar.getTime());
//        System.out.println(dateToStr(calendar.getTime()));
//        System.out.println(calendar.get(calendar.WEEK_OF_YEAR));
        return calendar.getTime();
    }

    /**
     * 取得指定日期所在周的第一天
     * @param date
     * @return
     */
    public static Date getFirstDayOfWeek(Date date) {
        Calendar calendar = Calendar.getInstance();
        if(getWeekMethod() == ISO8601) {
            calendar.setFirstDayOfWeek(Calendar.MONDAY);
        }
        calendar.setTime(date);
        calendar.set(Calendar.DAY_OF_WEEK, calendar.getFirstDayOfWeek()); // Monday
        return calendar.getTime();
    }

    /**
     * 得到某年某周的最后一天
     * @param year
     * @param week
     * @return
     */
    public static Date getLastDayOfWeek(int year, int week) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(getFirstDayOfWeek(year, week)); //第一天
        calendar.add(Calendar.DAY_OF_YEAR, 6); //第七天
        return calendar.getTime();
    }

    /**
     * 取得指定日期所在周的最后一天
     * @param date
     * @return
     */
    public static Date getLastDayOfWeek(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(getFirstDayOfWeek(date)); //第一天
        calendar.add(Calendar.DAY_OF_YEAR, 6); //第七天
        return calendar.getTime();
    }

    /**
     * 格式化时间
     * @param date
     * @return
     */
    public static String dateToStr(Date date) {
        if (date == null) {
            return null;
        }
        return SDF.format(date);
    }

    /**
     * test
     * @param args
     */
    public static void main(String[] args) {
        int year = 2017;
        int week = 26;

        Calendar calendar = Calendar.getInstance();
        calendar.set(2017, 0, 2);
        Date date = calendar.getTime();
        System.out.println("ISO8601："+dateToStr(getFirstDayOfWeek(year,week))+"~"+dateToStr(getLastDayOfWeek(year,week)));
        System.out.println("ISO8601："+dateToStr(getFirstDayOfWeek(date))+"~"+dateToStr(getLastDayOfWeek(date)));
        setWeekMethod(WeekUtils.MSEXCEL);
        System.out.println("MSEXCEL："+dateToStr(getFirstDayOfWeek(year,week))+"~"+dateToStr(getLastDayOfWeek(year,week)));
        System.out.println("MSEXCEL："+dateToStr(getFirstDayOfWeek(date))+"~"+dateToStr(getLastDayOfWeek(date)));
    }
}
