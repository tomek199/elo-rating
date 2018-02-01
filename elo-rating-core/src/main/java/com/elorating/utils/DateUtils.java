package com.elorating.utils;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;

public class DateUtils {

    public final static long ONE_MINUTE_IN_MILLIS = 60000;
    public final static String HOURS_MINUTES_TIMEZONE = "HH:mmZ";

    private static Date adjustTimeByMinutes(Date date, int minutes, boolean back) {
        long currentTime = date.getTime();
        Date newDate = null;
        if (back) {
            newDate = new Date(currentTime - (minutes * ONE_MINUTE_IN_MILLIS));
        } else {
            newDate = new Date(currentTime + (minutes * ONE_MINUTE_IN_MILLIS));
        }
        return newDate;
    }

    public static Date adjustTimeByMinutesIntoFuture(Date date, int minutes) {
        return adjustTimeByMinutes(date, minutes, false);
    }

    public static Date adjustTimeByMinutesIntoPast(Date date, int minutes) {
        return adjustTimeByMinutes(date, minutes, true);
    }

    public static String getDateString(Date date) {
        return new SimpleDateFormat("dd-MM-yyyy HH:mm:ss").format(date);
    }

    public static String getDateTime(Date date) {
        return new SimpleDateFormat(HOURS_MINUTES_TIMEZONE).format(date);
    }

    public static String getDateTime(Date date, String timezone) {
        if (timezone == null) {
            return getDateTime(date);
        }
        SimpleDateFormat sdf = new SimpleDateFormat(HOURS_MINUTES_TIMEZONE);
        sdf.setTimeZone(TimeZone.getTimeZone(timezone));
        return sdf.format(date);
    }
}
