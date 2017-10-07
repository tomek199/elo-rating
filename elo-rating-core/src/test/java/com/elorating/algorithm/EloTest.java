package com.elorating.algorithm;

import com.elorating.model.Match;
import com.elorating.model.Player;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;

import java.util.Arrays;
import java.util.Collection;

@RunWith(Parameterized.class)
public class EloTest {
    private int playerOneRating;
    private int playerTwoRating;
    private int playerOneScore;
    private int playerTwoScore;
    private int playerOneExpectedRating;
    private int playerTwoExpectedRating;
    private Elo elo;

    @Parameterized.Parameters
    public static Collection<Object[]> setParameters() {
        return Arrays.asList(new Integer[][] {
                {1496, 1150, 2, 1, 1500, 1146},
                {532, 326, 1, 2, 507, 351},
                {1063, 1338, 2, 0, 1103, 1298},
                {410, 320, 0, 2, 380, 350},
                {2169, 2281, 2, 1, 2185, 2265},
                {2122, 2228, 1, 2, 2114, 2236},
                {2149, 2146, 2, 0, 2167, 2128},
                {2260, 2287, 0, 2, 2243, 2304},
                {2452, 2878, 2, 1, 2467, 2863},
                {2836, 2924, 1, 2, 2830, 2930},
                {2761, 2713, 2, 0, 2771, 2703},
                {2523, 2631, 0, 2, 2515, 2639},
                {1000, 1000, 2, 0, 1024, 976}
        });
    }

    public EloTest(int playerOneRating, int playerTwoRating, int playerOneScore,
                   int playerTwoScore, int playerOneExpectedRating, int playerTwoExpectedRating) {
        this.playerOneRating = playerOneRating;
        this.playerTwoRating = playerTwoRating;
        this.playerOneScore = playerOneScore;
        this.playerTwoScore = playerTwoScore;
        this.playerOneExpectedRating = playerOneExpectedRating;
        this.playerTwoExpectedRating = playerTwoExpectedRating;
    }

    @Before
    public void setUp() throws Exception {
        Player playerOne = new Player("Player one");
        playerOne.setId("1234");
        playerOne.setRating(playerOneRating);
        Player playerTwo = new Player("Player two");
        playerTwo.setId("5678");
        playerTwo.setRating(playerTwoRating);
        Match match = new Match(playerOne, playerTwo, playerOneScore, playerTwoScore);
        elo = new Elo(match);
    }

    @After
    public void tearDown() throws Exception {
    }

    @Test
    public void getPlayersRating() throws Exception {
        Assert.assertEquals(playerOneExpectedRating, elo.getPlayerOneRating());
        elo.getMatch().getPlayerOne().setRating(elo.getPlayerOneRating());
        Assert.assertEquals(playerTwoExpectedRating, elo.getPlayerTwoRating());
    }
}