package com.elorating.service;

import com.elorating.model.League;
import com.elorating.model.Match;
import com.elorating.model.Player;
import com.elorating.model.PlayerStats;
import com.elorating.repository.LeagueRepository;
import com.elorating.repository.MatchRepository;
import com.elorating.repository.PlayerRepository;
import com.elorating.utils.MatchTestUtils;
import com.elorating.utils.PlayerTestUtils;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by pokor on 10.06.2017.
 */
public class PlayerStatsServiceTest extends BaseServiceTest {

    @Autowired
    private PlayerStatsService playerStatsService;

    @Autowired
    private PlayerRepository playerRepository;

    @Autowired
    private MatchRepository matchRepository;

    @Autowired
    private LeagueRepository leagueRepository;

    private League league;
    private List<Player> players = new ArrayList<>();
    private List<Match> matches = new ArrayList<>();

    @Before
    public void setUp() {
        league = new League("TestLeague");
        league = leagueRepository.save(league);
        players = PlayerTestUtils.generatePlayerList(3, league);
        for (int i = 0; i < players.size(); i++) {
            players.set(i, playerRepository.save(players.get(i)));
        }

        Match matchOne = MatchTestUtils.generateMatch(league, players.get(0), players.get(1), true);

        Match matchTwo = MatchTestUtils.generateMatch(league, players.get(1), players.get(0), true);

        Match matchThree = MatchTestUtils.generateMatch(league, players.get(0), players.get(1), true);

        matches.add(matchOne);
        matches.add(matchTwo);
        matches.add(matchThree);

        for (int i = 0; i < matches.size(); i++) {
            matches.set(i, matchRepository.save(matches.get(i)));
        }
    }

    @After
    public void tearDown() {
        leagueRepository.deleteAll();
        playerRepository.deleteAll();
        matchRepository.deleteAll();
    }

    @Test
    public void test_playerOneStats() throws Exception {
        PlayerStats playerOneStats = playerStatsService.getPlayerStats(players.get(0).getId());
        Assert.assertTrue(playerOneStats.getWins() == 2);
        Assert.assertTrue(playerOneStats.getLoses() == 1);
    }

    @Test
    public void test_playerStatsWinnerIsNullLoserIsPlayer() throws Exception {
        Player testPlayerWinner = PlayerTestUtils.generatePlayer("testPlayerWinner", league);
        Player testPlayerLoser = PlayerTestUtils.generatePlayer("testPlayerLoser", league);

        testPlayerWinner = playerRepository.save(testPlayerWinner);
        testPlayerLoser = playerRepository.save(testPlayerLoser);

        Match testMatch = MatchTestUtils.generateMatch(league, testPlayerWinner, testPlayerLoser, true);
        testMatch.removePlayerId(testPlayerWinner.getId());

        testMatch = matchRepository.save(testMatch);

        PlayerStats playerStatsLoser = playerStatsService.getPlayerStats(testPlayerLoser.getId());
        Assert.assertTrue(playerStatsLoser.getLoses() == 1);
        Assert.assertTrue(playerStatsLoser.getWins() == 0);
    }
}
