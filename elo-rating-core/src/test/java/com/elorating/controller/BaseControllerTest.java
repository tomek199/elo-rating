package com.elorating.controller;

import com.elorating.CoreApplication;
import com.elorating.model.League;
import com.elorating.service.LeagueService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.context.WebApplicationContext;

import java.nio.charset.Charset;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = CoreApplication.class)
@TestPropertySource(locations = "classpath:application-test.properties")
@WebAppConfiguration
public abstract class BaseControllerTest {

    protected MediaType contentType = new MediaType(MediaType.APPLICATION_JSON.getType(),
            MediaType.APPLICATION_JSON.getSubtype(),
            Charset.forName("utf8"));

    protected MockMvc mockMvc;

    protected League league;

    protected ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    protected WebApplicationContext webApplicationContext;

    @Autowired
    protected LeagueService leagueService;
}
