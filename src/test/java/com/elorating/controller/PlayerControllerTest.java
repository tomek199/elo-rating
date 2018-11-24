package com.elorating.controller;

import com.elorating.model.League;
import com.elorating.model.Player;
import com.elorating.service.MatchService;
import com.elorating.service.PlayerService;
import org.hamcrest.Matchers;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

public class PlayerControllerTest extends BaseControllerTest {

    private static final int RETRIES = 5;

    @Autowired
    private PlayerService playerService;

    @Autowired
    private MatchService matchService;

    @Before
    public void setUp() throws Exception {
        mockMvc = webAppContextSetup(webApplicationContext).build();
        league = leagueService.save(new League(null, "League"));
        for (int i = 0; i < RETRIES; i++) {
            playerService.save(new Player("Player_" + i, league, 1000 + 100 * i));
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
        mockMvc.perform(get("/api/leagues/" + league.getId() + "/players")
                .contentType(contentType))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", Matchers.hasSize(RETRIES)));
    }

    @Test
    public void testGetById() throws Exception {
        Player player = new Player("playerToFind", league);
        playerService.save(player);
        mockMvc.perform(get("/api/players/" + player.getId())
                .contentType(contentType))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username", is("playerToFind")))
                .andExpect(jsonPath("$.rating", is(1000)))
                .andExpect(jsonPath("$.active").exists());
    }

    @Test
    public void testGetActiveCount() throws Exception {
        Player inactivePlayer = new Player("Not active player", league);
        inactivePlayer.setActive(false);
        playerService.save(inactivePlayer);
        String url = "/api/leagues/" + league.getId() + "/active-players-count";
        mockMvc.perform(get(url)
                .contentType(contentType))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is(RETRIES)));
    }

    @Test
    public void testGetRanking() throws Exception {
        Player inactivePlayer = new Player("InactivePlayer", league);
        inactivePlayer.setActive(false);
        playerService.save(inactivePlayer);
        mockMvc.perform(get("/api/leagues/" + league.getId() + "/players/ranking")
                .contentType(contentType))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", Matchers.hasSize(RETRIES)))
                .andExpect(jsonPath("$[0].rating", is(1400)))
                .andExpect(jsonPath("$[1].rating", is(1300)))
                .andExpect(jsonPath("$[2].rating", is(1200)));
    }

    @Test
    public void testCreate() throws Exception {
        Player player = new Player("testplayer");
        String playerJson = objectMapper.writeValueAsString(player);
        mockMvc.perform(post("/api/leagues/" + league.getId() + "/players")
                .content(playerJson)
                .contentType(contentType))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username", is("testplayer")))
                .andExpect(jsonPath("$.active", is(true)));
    }

    @Test
    public void testEdit() throws Exception {
        Player player = new Player("playerToEdit", league);
        playerService.save(player);
        player.setUsername("editedUsername");
        player.setRating(2000);
        player.setLeague(null);
        player.setActive(false);
        String editedPlayerJson = objectMapper.writeValueAsString(player);
        String url = "/api/leagues/" + league.getId() + "/players/" + player.getId();
        mockMvc.perform(put(url)
                .contentType(contentType)
                .content(editedPlayerJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username", is("editedUsername")))
                .andExpect(jsonPath("$.rating", is(2000)))
                .andExpect(jsonPath("$.league.name", is(league.getName())))
                .andExpect(jsonPath("$.active", is(false)));
    }

    @Test
    public void testDelete() throws Exception {
        Player player = playerService.save(new Player("PlayerToDelete", league));
        String url = "/api/leagues/" + league.getId() + "/players/" + player.getId();
        mockMvc.perform(delete(url)
                .contentType(contentType))
                .andExpect(status().isOk());
        Assert.assertFalse(playerService.getById(player.getId()).isPresent());
    }

    @Test
    public void testFindByUsername() throws Exception {
        playerService.save(new Player("Other", league));
        League otherLeague = leagueService.save(new League(null, "Other league"));
        playerService.save(new Player("Player_20", otherLeague));
        String url = "/api/leagues/" + league.getId() + "/players/find-by-username?username=yer";
        mockMvc.perform(get(url)
                .contentType(contentType))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", Matchers.hasSize(RETRIES)));
    }

    @Test
    public void testFindByUsernameInitials() throws Exception {
        playerService.save(new Player("Player Initials", league));
        String url = "/api/leagues/" + league.getId() + "/players/find-by-username?username=pi";
        mockMvc.perform(get(url)
                .contentType(contentType))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", Matchers.hasSize(1)));
    }

    @Test
    public void testFindByUsernameInitialsIncorrectPattern() throws Exception {
        String url = "/api/leagues/" + league.getId() + "/players/find-by-username?username=..";
        mockMvc.perform(get(url)
                .contentType(contentType))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.error[0]", is("Incorrect username pattern")));
    }

    @Test
    public void testFindActiveByUsername() throws Exception {
        String playerName = "Player ToFind";
        Player playerToFind = new Player(playerName, league);
        playerService.save(playerToFind);
        Player inactivePlayer = new Player(playerName, league);
        inactivePlayer.setActive(false);
        playerService.save(inactivePlayer);
        String url = "/api/leagues/" + league.getId() + "/players/find-active-by-username?username=tofi";
        mockMvc.perform(get(url)
                .contentType(contentType))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", Matchers.hasSize(1)))
                .andExpect(jsonPath("$[0].username", is(playerName)));
    }

    @Test
    public void testFindActiveByUsernameInitials() throws Exception {
        String playerName = "Player ToFind";
        playerService.save(new Player(playerName, league));
        String url = "/api/leagues/" + league.getId() + "/players/find-active-by-username?username=pt";
        mockMvc.perform(get(url)
                .contentType(contentType))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", Matchers.hasSize(1)))
                .andExpect(jsonPath("$[0].username", is(playerName)));
    }

    @Test
    public void testFindActiveByUsernameInitialsIncorrectPattern() throws Exception {
        String url = "/api/leagues/" + league.getId() + "/players/find-active-by-username?username=..";
        mockMvc.perform(get(url)
                .contentType(contentType))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.error[0]", is("Incorrect username pattern")));
    }
}