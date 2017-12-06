package com.elorating.utils;

import java.text.SimpleDateFormat;
import java.util.Date;

public class DateUtils {

    public final static long ONE_MINUTE_IN_MILLIS = 60000;

    private Date adjustTimeByMinutes(Date date, int minutes, boolean back) {
        long currentTime = date.getTime();
        Date newDate = null;
        if (back) {
            newDate = new Date(currentTime - (minutes * ONE_MINUTE_IN_MILLIS));
        } else {
            newDate = new Date(currentTime + (minutes * ONE_MINUTE_IN_MILLIS));
        }
        return newDate;
    }

    public Date adjustTimeByMinutesIntoFuture(Date date, int minutes) {
        return adjustTimeByMinutes(date, minutes, false);
    }

    public Date adjustTimeByMinutesIntoPast(Date date, int minutes) {
        return adjustTimeByMinutes(date, minutes, true);
    }

    public String getDateString(Date date) {
        return new SimpleDateFormat("dd-MM-yyyy HH:mm:ss").format(date);
    }

    public String getDateTime(Date date) {
        return new SimpleDateFormat("HH:mm").format(date);
    }
}
