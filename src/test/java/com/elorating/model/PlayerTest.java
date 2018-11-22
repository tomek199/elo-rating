package com.elorating.model;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;

import java.util.Arrays;
import java.util.Collection;

@RunWith(Parameterized.class)
public class PlayerTest {
    private int playerRating;
    private int opponentRating;
    private double playerExpected;
    private Player player;
    private Player opponent;

    @Parameterized.Parameters
    public static Collection<Object[]> setParameters() {
        return Arrays.asList(new Number[][] {
                {1496, 1150, 0.879926688},
                {532,326, 0.7659946708},
                {1063, 1338, 0.1703671766},
                {410, 320, 0.6266990817},
                {2169, 2281, 0.3441794941},
                {2122, 2228, 0.3520169867},
                {2149, 2146, 0.5043172398},
                {2260, 2287, 0.4612219079},
                {2452, 2878, 0.0792739386},
                {2836, 2924, 0.3759982414},
                {2761, 2713, 0.5686413919},
                {2523, 2631, 0.3493953721}
        });
    }

    public PlayerTest(double playerRating, double opponentRating, double playerExpected) {
        this.playerRating = (int) playerRating;
        this.opponentRating = (int) opponentRating;
        this.playerExpected = playerExpected;
    }

    @Before
    public void setUp() throws Exception {
        player = new Player("Player one");
        player.setRating(playerRating);
        opponent = new Player("Player two");
        opponent.setRating(opponentRating);
    }

    @Test
    public void testGetEstimatedRate() throws Exception {
        Assert.assertEquals(playerExpected, player.getExpectedScore(opponent), 0.000001);
    }
}