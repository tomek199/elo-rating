package com.elorating.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.TimeZone;
import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("/api")
@Api(value = "common", description = "Utilities controller")
public class UtilitiesController {

    private static final Logger logger = LoggerFactory.getLogger(UtilitiesController.class);

    @CrossOrigin
    @RequestMapping(value = "/common/timezones", method = RequestMethod.GET)
    @ApiOperation(value = "Get timezones", notes = "Returns all timezones")
    public ResponseEntity<String[]> getTimezonesArray() {
        String[] ids = TimeZone.getAvailableIDs();
        String[] timezones = new String[ids.length];
        for (int i = 0; i < ids.length; i++) {
            timezones[i] = getTimezoneOffset(TimeZone.getTimeZone(ids[i]));
        }
        Arrays.sort(timezones);

        return new ResponseEntity<>(timezones, HttpStatus.OK);
    }

    private String getTimezoneOffset(TimeZone timeZone) {
        long hours = TimeUnit.MILLISECONDS.toHours(timeZone.getRawOffset());
        long minutes = TimeUnit.MILLISECONDS.toMinutes(timeZone.getRawOffset()) - TimeUnit.HOURS.toMinutes(hours);

        minutes = Math.abs(minutes);

        String result = "";

        if (hours > 0) {
            result = String.format("GMT+%d:%02d  %s", hours, minutes, timeZone.getID());
        } else {
            result = String.format("GMT%d:%02d %s", hours, minutes, timeZone.getID());
        }

        return result;
    }
}
