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
                {1496, 1150, 1, 0, 1500, 1146},
                {532, 326, 0, 1, 507, 351},
                {410, 320, 1, 1, 406, 324},
                {2169, 2281, 2, 0, 2193, 2257},
                {2122, 2228, 1, 3, 2109, 2241},
                {2260, 2287, 2, 2, 2261, 2286},
                {2452, 2878, 4, 1, 2478, 2852},
                {2836, 2924, 2, 5, 2825, 2935},
                {2761, 2713, 3, 3, 2760, 2714},
                {2523, 2631, 4, 0, 2543, 2611},
                {1486, 501, 2, 6, 1426, 561},
                {710, 587, 4, 4, 705, 592},
                {819, 1547, 7, 2, 882, 1484},
                {1437, 1053, 3, 8, 1379, 1111},
                {638, 217, 5, 5, 625, 230},
                {2016, 1522, 9, 3, 2020, 1518},
                {1652, 408, 0, 6, 1584, 476},
                {1510, 1866, 6, 6, 1522, 1854},
                {790, 679, 9, 2, 815, 654},
                {1954, 285, 3, 10, 1882, 357},
                {1536, 1914, 7, 7, 1549, 1901},
                {320, 1152, 10, 2, 395, 1077},
                {559, 372, 3, 11, 502, 429},
                {382, 165, 8, 8, 373, 174},
                {1962, 307, 11, 2, 1962, 307},
                {844, 865, 4, 13, 806, 903},
                {1712, 1489, 9, 9, 1703, 1498},
                {1341, 1758, 13, 3, 1418, 1681},
                {1402, 518, 0, 10, 1319, 601},
                {253, 1285, 10, 10, 269, 1269}
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