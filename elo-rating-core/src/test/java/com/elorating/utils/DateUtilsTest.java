package com.elorating.utils;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import java.time.ZoneId;
import java.util.Calendar;
import java.util.Date;
import java.util.TimeZone;

public class DateUtilsTest {

    private final int HOURS = 16;
    private final int MINUTES = 30;

    private final String GMT_TIMEZONE = "Europe/London";
    private final String GMT1_TIMEZONE = "Europe/Warsaw";

    private Date dateGMT;
    private String expectedDateString;

    @Before
    public void setup() {
        Calendar calendar = Calendar.getInstance(TimeZone.getTimeZone(GMT_TIMEZONE));
        TimeZone timeZone = calendar.getTimeZone();
        ZoneId.getAvailableZoneIds();
        calendar.set(2018, 2, 1, HOURS, MINUTES);
        dateGMT = calendar.getTime();

        setExpectedDateString(HOURS, MINUTES);
    }

    private void setExpectedDateString(int hours, int minutes) {
        this.expectedDateString = hours + ":" + minutes;
    }

    @Test
    public void test_getDateTimeGMTString() {
        String dateString = DateUtils.getDateTime(dateGMT, GMT_TIMEZONE);
        Assert.assertTrue(dateString.contains(expectedDateString));
    }

    @Test
    public void test_getDateTimeGMTtoGMT1String() {
        String dateString = DateUtils.getDateTime(dateGMT, GMT1_TIMEZONE);
        setExpectedDateString(HOURS + 1, MINUTES);
        Assert.assertTrue(dateString.contains(expectedDateString));
    }

    @Test
    public void test_validateTimezone_success() {
        String correctTimezone = "GMT+1:00 " + GMT1_TIMEZONE;
        Assert.assertTrue(DateUtils.validateTimezone(correctTimezone));

        correctTimezone = GMT1_TIMEZONE;
        Assert.assertTrue(DateUtils.validateTimezone(correctTimezone));
    }

    @Test
    public void test_validateIncorrectTimezone_success() {
        String correctTimezone = "GMT0:00 Incorrect/Timezone";
        Assert.assertFalse(DateUtils.validateTimezone(correctTimezone));
    }

    @Test
    public void test_parseTimezoneStringToTimezoneID_success() {
        String timezone = "GMT+1:00 " + GMT1_TIMEZONE;
        Assert.assertTrue(DateUtils.parseTimezoneStringToTimezoneID(timezone).equals(GMT1_TIMEZONE));
        Assert.assertTrue(DateUtils.parseTimezoneStringToTimezoneID(timezone).indexOf(" ") == -1);
    }
}

