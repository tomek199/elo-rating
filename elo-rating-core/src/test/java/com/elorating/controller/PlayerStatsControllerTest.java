package com.elorating.controller;

import com.elorating.model.League;
import com.elorating.model.Match;
import com.elorating.model.Player;
import com.elorating.service.MatchService;
import com.elorating.service.PlayerService;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.web.servlet.MvcResult;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;

import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

public class PlayerStatsControllerTest extends BaseControllerTest {

    private static final int RETRIES = 3;

    @Autowired
    private PlayerService playerService;

    @Autowired
    private MatchService matchService;

    private Player player;

    private List<Player> opponents;

    @Before
    public void setUp() throws Exception {
        mockMvc = webAppContextSetup(webApplicationContext).build();
        league = leagueService.save(new League(null, "League"));
        player = playerService.save(new Player("Player", league));
        opponents = new ArrayList<>();
        for (int i = 0; i < RETRIES; i++) {
            opponents.add(playerService.save(new Player("Opponent" + i, league)));
            for (int j = 0; j < RETRIES; j++) {
                matchService.save(new Match(player, opponents.get(i), 2, 0, league));
                matchService.save(new Match(player, opponents.get(i), 2, 2, league));
                matchService.save(new Match(player, opponents.get(i), 0, 2, league));
            }
        }
    }

    @After
    public void tearDown() throws Exception {
        matchService.deleteAll();
        playerService.deleteAll();
        leagueService.deleteAll();
    }

    @Test
    public void testGetPlayerStatsAgainstOpponent() throws Exception {
        String opponentId = opponents.get(0).getId();
        String url = "/api/players/" + player.getId() + "/opponents/" + opponentId;
        mockMvc.perform(get(url)
                .contentType(contentType))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.won", is(RETRIES)))
                .andExpect(jsonPath("$.lost", is(RETRIES)))
                .andExpect(jsonPath("$.draw", is(RETRIES)))
                .andExpect(jsonPath("$.streak", is(-1)));
    }

    @Test
    public void testGetPlayerStatsAgainstOpponents() throws Exception {
        String url = "/api/players/" + player.getId() + "/opponents";
        MvcResult mvcResult = mockMvc.perform(get(url)
                .contentType(contentType))
                .andExpect(status().isOk())
                .andReturn();
        String jsonResult = mvcResult.getResponse().getContentAsString();
        List<LinkedHashMap> stats = objectMapper.readValue(jsonResult, List.class);
        for (LinkedHashMap stat : stats) {
            Assert.assertEquals(RETRIES, stat.get("won"));
            Assert.assertEquals(RETRIES, stat.get("lost"));
            Assert.assertEquals(RETRIES, stat.get("draw"));
            Assert.assertEquals(-1, stat.get("streak"));
        }
    }
}