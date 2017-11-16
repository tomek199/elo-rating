package com.elorating.service;

import com.elorating.repository.MatchRepository;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

public class MatchServiceTest extends BaseServiceTest {

    @Autowired
    private MatchService matchService;

    @Autowired
    private MatchRepository matchRepository;

    @Before
    public void setup() {

    }


    @After
    public void tearDown() {
        matchRepository.deleteAll();
    }

    @Test
    public void test_rescheduleMatchesByTenMinutes() {
        // TODO: write test for rescheduled matches in MatchService
    }
}
