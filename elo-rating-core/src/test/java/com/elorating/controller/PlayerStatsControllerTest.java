package com.elorating.controller;

import com.elorating.model.League;
import com.elorating.model.Match;
import com.elorating.model.Player;
import com.elorating.service.MatchService;
import com.elorating.service.PlayerService;
import org.hamcrest.Matchers;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.web.servlet.MvcResult;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Calendar;
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
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.DATE, - (RETRIES * 10 + 10));
        calendar.set(Calendar.HOUR, 8);
        for (int i = 0; i < RETRIES; i++) {
            opponents.add(playerService.save(new Player("Opponent" + i, league)));
            calendar.add(Calendar.DATE, 10);
            for (int j = 0; j < RETRIES; j++) {
                calendar.add(Calendar.HOUR,1);
                matchService.save(new Match(player, opponents.get(i), 2, 0, calendar.getTime()));
                calendar.add(Calendar.HOUR,1);
                matchService.save(new Match(player, opponents.get(i), 2, 2, calendar.getTime()));
                calendar.add(Calendar.HOUR,1);
                matchService.save(new Match(player, opponents.get(i), 0, 2, calendar.getTime()));
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

    @Test
    public void testGetRatingHistory() throws Exception {
        LocalDate localDate = LocalDate.now();
        String dateFrom = localDate.minusDays(21).format(DateTimeFormatter.ISO_DATE);
        String dateTo = localDate.minusDays(11).format(DateTimeFormatter.ISO_DATE);
        String url = "/api/players/" + player.getId() + "/rating-history"
                + "?from=" + dateFrom + "&to=" + dateTo;
        mockMvc.perform(get(url)
                .contentType(contentType))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", Matchers.hasSize(9)));
        dateFrom = localDate.minusDays(21).format(DateTimeFormatter.ISO_DATE);
        url = "/api/players/" + player.getId() + "/rating-history"
                + "?from=" + dateFrom;
        mockMvc.perform(get(url)
                .contentType(contentType))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", Matchers.hasSize(18)));
        url = "/api/players/" + player.getId() + "/rating-history";
        mockMvc.perform(get(url)
                .contentType(contentType))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", Matchers.hasSize(27)));
    }

    @Test
    public void testGetPlayerMatchesStats() throws Exception {
        String url = "/api/players/" + player.getId() + "/matches-stats";
        mockMvc.perform(get(url)
                .contentType(contentType))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.won", is(9)))
                .andExpect(jsonPath("$.lost", is(9)))
                .andExpect(jsonPath("$.setsWon", is(36)))
                .andExpect(jsonPath("$.setsLost", is(36)));
    }
}