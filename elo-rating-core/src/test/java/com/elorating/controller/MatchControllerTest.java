package com.elorating.controller;

import com.elorating.model.League;
import com.elorating.model.Match;
import com.elorating.model.Player;
import com.elorating.service.MatchService;
import com.elorating.service.PlayerService;
import com.elorating.utils.MatchTestUtils;
import com.fasterxml.jackson.databind.JsonNode;
import org.hamcrest.Matchers;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.web.servlet.MvcResult;

import java.util.List;

import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

public class MatchControllerTest extends BaseControllerTest {

    private static final int RETRIES = 6;

    @Autowired
    private MatchService matchService;

    @Autowired
    private PlayerService playerService;

    @Before
    public void setUp() throws Exception {
        mockMvc = webAppContextSetup(webApplicationContext).build();
        league = leagueService.save(new League(null, "League"));
        Player playerOne = playerService.save(new Player("Player 1", league));
        Player playerTwo = playerService.save(new Player("Player 2", league));
        for (int i = 0; i < RETRIES; i++) {
            matchService.save(new Match(playerOne, playerTwo, 2, 1, league));
        }
        for (int i = 0; i < RETRIES; i++) {
            matchService.save(new Match(playerOne, playerTwo, league));
        }
    }

    @After
    public void tearDown() throws Exception {
        matchService.deleteAll();
        playerService.deleteAll();
        leagueService.deleteAll();
    }

    @Test
    public void testGet() throws Exception {
        mockMvc.perform(get("/api/leagues/" + league.getId() + "/matches")
                .contentType(contentType))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", Matchers.hasSize(RETRIES * 2)));
    }

    @Test
    public void testGetCompleted() throws Exception {
        mockMvc.perform(get("/api/leagues/" + league.getId() + "/completed-matches?page=0")
                .contentType(contentType))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content", Matchers.hasSize(6)))
                .andExpect(jsonPath("$.totalElements", is(6)));
        mockMvc.perform(get("/api/leagues/" + league.getId() + "/completed-matches?page=1")
                .contentType(contentType))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content", Matchers.hasSize(0)))
                .andExpect(jsonPath("$.totalElements", is(6)));
        mockMvc.perform(get("/api/leagues/" + league.getId() + "/completed-matches?page=0&pageSize=2")
                .contentType(contentType))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content", Matchers.hasSize(2)))
                .andExpect(jsonPath("$.totalElements", is(6)));
    }

    @Test
    public void testGetScheduled() throws Exception {
        mockMvc.perform(get("/api/leagues/" + league.getId() + "/scheduled-matches")
                .contentType(contentType))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", Matchers.hasSize(RETRIES)));
        mockMvc.perform(get("/api/leagues/" + league.getId() + "/scheduled-matches?sort=asc")
                .contentType(contentType))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", Matchers.hasSize(RETRIES)));
    }

    @Test
    public void testSave() throws Exception {
        Player playerOne = playerService.save(new Player("PlayerOne", league));
        Player playerTwo = playerService.save(new Player("PlayerTwo", league));
        Match match = new Match(playerOne, playerTwo, 2, 0);
        match.setLeague(league);
        String matchJson = objectMapper.writeValueAsString(match);
        mockMvc.perform(post("/api/leagues/" + league.getId() + "/matches")
            .content(matchJson)
            .contentType(contentType))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.league.id", is(league.getId())))
            .andExpect(jsonPath("$.playerOne.username", is("PlayerOne")))
            .andExpect(jsonPath("$.playerTwo.username", is("PlayerTwo")))
            .andExpect(jsonPath("$.scores['" + playerOne.getId() + "']", is(2)))
            .andExpect(jsonPath("$.scores['" + playerTwo.getId() + "']", is(0)))
            .andExpect(jsonPath("$.ratings['" + playerOne.getId() + "']", is(1024)))
            .andExpect(jsonPath("$.ratings['" + playerTwo.getId() + "']", is(976)))
            .andExpect(jsonPath("$.date").exists());
        playerOne = playerService.getById(playerOne.getId()).get();
        playerTwo = playerService.getById(playerTwo.getId()).get();
        Assert.assertEquals(1024, playerOne.getRating());
        Assert.assertEquals(976, playerTwo.getRating());
        Assert.assertEquals(1, playerOne.getStatistics().getWon());
        Assert.assertEquals(0, playerOne.getStatistics().getLost());
        Assert.assertEquals(0, playerTwo.getStatistics().getWon());
        Assert.assertEquals(1, playerTwo.getStatistics().getLost());
    }

    @Test
    public void testSaveWithDraw() throws Exception {
        Player playerOne = playerService.save(new Player("PlayerOne", league));
        Player playerTwo = playerService.save(new Player("PlayerTwo", league));
        Match match = new Match(playerOne, playerTwo, 5, 5);
        match.setLeague(league);
        String matchJson = objectMapper.writeValueAsString(match);
        mockMvc.perform(post("/api/leagues/" + league.getId() + "/matches")
                .content(matchJson)
                .contentType(contentType))
                .andExpect(status().isOk());
        playerOne = playerService.getById(playerOne.getId()).get();
        playerTwo = playerService.getById(playerTwo.getId()).get();
        Assert.assertEquals(1000, playerOne.getRating());
        Assert.assertEquals(1000, playerTwo.getRating());
        Assert.assertEquals(0, playerOne.getStatistics().getWon());
        Assert.assertEquals(0, playerOne.getStatistics().getLost());
        Assert.assertEquals(0, playerTwo.getStatistics().getWon());
        Assert.assertEquals(0, playerTwo.getStatistics().getLost());
        Assert.assertEquals(1, playerOne.getStatistics().getDraw());
        Assert.assertEquals(1, playerTwo.getStatistics().getDraw());
    }

    @Test
    public void testSaveAlreadyCompleted() throws Exception {
        Player playerOne = playerService.save(new Player("PlayerOne", league));
        Player playerTwo = playerService.save(new Player("PlayerTwo", league));
        Match match = new Match(playerOne, playerTwo, 2, 0, league);
        match.setCompleted();
        matchService.save(match);
        String matchJson = objectMapper.writeValueAsString(match);
        mockMvc.perform(post("/api/leagues/" + league.getId() + "/matches")
                .content(matchJson)
                .contentType(contentType))
                .andExpect(status().isNoContent());
    }

    @Test
    public void testDelete() throws Exception {
        Player playerOne = playerService.save(new Player("PlayerOne", league));
        Player playerTwo = playerService.save(new Player("PlayerOne", league));
        Match match = new Match(playerOne, playerTwo);
        match.setLeague(league);
        match = matchService.save(match);
        String url = "/api/leagues/" + league.getId() + "/matches/" + match.getId();
        mockMvc.perform(delete(url)
                .contentType(contentType))
                .andExpect(status().isOk());
        Assert.assertFalse(matchService.getById(match.getId()).isPresent());
    }

    @Test
    public void testGetMatchByMatchId() throws Exception {
        Player playerOne = playerService.save(new Player("PlayerOne", league));
        Player playerTwo = playerService.save(new Player("PlayerOne", league));
        Match match = matchService.save(new Match(playerOne, playerTwo));
        mockMvc.perform(get("/api/matches/" + match.getId())
            .contentType(contentType))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(match.getId())));
    }

    @Test
    public void testRevertFirstWon() throws Exception {
        revert(2, 0);
    }

    @Test
    public void testRevertSecondWon() throws Exception {
        revert(2, 1);
    }

    @Test
    public void testRevertDraw() throws Exception {
        revert(2, 2);
    }

    private void revert(int playerOneScore, int playerTwoScore) throws Exception {
        Player playerOne = playerService.save(new Player("PlayerOne", league, 1200));
        Player playerTwo = playerService.save(new Player("PlayerTwo", league, 800));
        Match match = new Match(playerOne, playerTwo, playerOneScore, playerTwoScore, league);
        String matchJson = objectMapper.writeValueAsString(match);
        MvcResult result = mockMvc.perform(post("/api/leagues/" + league.getId() + "/matches")
                .content(matchJson)
                .contentType(contentType))
                .andExpect(status().isOk())
                .andReturn();
        JsonNode jsonResult = objectMapper.readTree(result.getResponse().getContentAsString());
        String matchId = jsonResult.get("id").asText();
        String revertUrl = "/api/leagues/" + league.getId() + "/matches/" + matchId + "/revert";
        mockMvc.perform(post(revertUrl)
                .contentType(contentType))
                .andExpect(status().isOk());
        Assert.assertFalse(matchService.getById(matchId).isPresent());
        playerOne = playerService.getById(playerOne.getId()).get();
        Assert.assertEquals(1200, playerOne.getRating());
        playerTwo = playerService.getById(playerTwo.getId()).get();
        Assert.assertEquals(0, playerOne.getStatistics().getWon());
        Assert.assertEquals(0, playerOne.getStatistics().getLost());
        Assert.assertEquals(0, playerOne.getStatistics().getDraw());
        playerTwo = playerService.getById(playerTwo.getId()).get();
        Assert.assertEquals(800, playerTwo.getRating());
        Assert.assertEquals(0, playerTwo.getStatistics().getWon());
        Assert.assertEquals(0, playerTwo.getStatistics().getLost());
        Assert.assertEquals(0, playerTwo.getStatistics().getDraw());
    }

    @Test
    public void test_rescheduleMatches() throws Exception {
        int matchesAmount = 4;
        int minutes = 10;
        Player playerOne = playerService.save(new Player("PlayerOne", league, 1200));
        Player playerTwo = playerService.save(new Player("PlayerTwo", league, 800));
        List<Match> matchList = MatchTestUtils.setupMatches(playerOne, playerTwo, league, matchesAmount);
        matchList.forEach(match -> matchService.save(match));
        mockMvc.perform(post("/api/league/" + this.league.getId() + "/reschedule-matches/" + minutes)
            .contentType(contentType))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray());
    }
}