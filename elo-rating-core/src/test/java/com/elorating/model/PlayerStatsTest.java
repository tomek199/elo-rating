package com.elorating.model;

import com.elorating.utils.PlayerTestUtils;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by pokor on 09.06.2017.
 */
public class PlayerStatsTest {

    private Player playerOne;
    private Player playerTwo;

    private List<Match> matches;

    @Before
    public void setup() {
        playerOne = new Player("testPlayer1", null);
        playerOne.setId("1");
        playerTwo = new Player("testPlayer2", null);
        playerTwo.setId("2");

        Match matchOne = new Match(playerOne, playerTwo);
        matchOne.setScore(playerOne, 2);
        matchOne.setScore(playerTwo, 0);

        Match matchTwo = new Match(playerOne, playerTwo);
        matchTwo.setScore(playerOne, 0);
        matchTwo.setScore(playerTwo, 2);

        Match matchThree = new Match(playerOne, playerTwo);
        matchThree.setScore(playerOne, 2);
        matchThree.setScore(playerTwo, 0);

        Player playerThree = PlayerTestUtils.generatePlayer(null);
        playerThree.setId("test");
        Match matchFour = new Match(playerTwo, playerThree);
        matchFour.setScore(playerTwo, 2);
        matchFour.setScore(playerThree, 0);
        matchFour.removePlayerId(playerThree.getId());

        matches = new ArrayList<Match>();

        matches.add(matchOne);
        matches.add(matchTwo);
        matches.add(matchThree);
        matches.add(matchFour);
    }

    @Test
    public void test_checkPlayerStats() throws Exception {
        PlayerStats playerOneStats = new PlayerStats(playerOne);
        playerOneStats.setStats(matches);
        Assert.assertTrue("PlayerOne wins should equal 2", playerOneStats.getWins() == 2);
        Assert.assertTrue("PlayerOne loses should equal 1",playerOneStats.getLoses() == 1);
    }
}
