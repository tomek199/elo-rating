package com.elorating.utils;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Date;

public class DateUtils {

    public final static long ONE_MINUTE_IN_MILLIS = 60000;

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

    public static String getDateTime(Date date) {
        ZonedDateTime zonedDateTime = convertDateToZonedDateTime(date, null);
        return zonedDateTime.getHour() + ":" + zonedDateTime.getMinute();
    }

    public static String getDateTime(Date date, String timezone) {
        if (timezone == null) {
            return getDateTime(date);
        }
        ZonedDateTime zonedDateTime = convertDateToZonedDateTime(date, timezone);
        return zonedDateTime.getHour() + ":" + zonedDateTime.getMinute();
    }

    private static ZonedDateTime convertDateToZonedDateTime(Date date, String timezone) {
        if (timezone == null || timezone.equals("")) {
            return date.toInstant().atZone(ZoneId.systemDefault());
        }
        return date.toInstant().atZone(ZoneId.of(timezone));
    }

}
