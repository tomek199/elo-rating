package com.elorating.utils;

import java.sql.Time;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Arrays;
import java.util.Date;
import java.util.TimeZone;
import java.util.concurrent.TimeUnit;

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

    public static boolean validateTimezone(String timezoneString) {
        int whitespaceIndex = timezoneString.indexOf(" ");
        if (whitespaceIndex != -1) {
            timezoneString = StringUtils.removeWhitespaces(timezoneString.substring(whitespaceIndex));
        }

        String[] ids = TimeZone.getAvailableIDs();
        Arrays.sort(ids);
        int searchResult = Arrays.binarySearch(ids, timezoneString);

        return searchResult > 0 ? true : false;
    }

    public static String getTimezoneOffset(TimeZone timeZone) {
        long hours = TimeUnit.MILLISECONDS.toHours(timeZone.getRawOffset());
        long minutes = TimeUnit.MILLISECONDS.toMinutes(timeZone.getRawOffset()) - TimeUnit.HOURS.toMinutes(hours);

        minutes = Math.abs(minutes);

        String result = "";

        if (hours > 0) {
            result = String.format("GMT+%d:%02d %s", hours, minutes, timeZone.getID());
        } else {
            result = String.format("GMT%d:%02d %s", hours, minutes, timeZone.getID());
        }

        return result;
    }

}
