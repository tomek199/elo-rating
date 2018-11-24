package com.elorating.utils;

import com.elorating.model.League;
import com.elorating.model.Player;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by pokor on 10.06.2017.
 */
public class PlayerTestUtils {

    public static List<Player> generatePlayerList(int size, League league) {
        List<Player> players = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            players.add(generatePlayer(String.valueOf(i), league));
        }

        return players;
    }

    public static Player generatePlayer(League league) {
        return generatePlayer("1", league);
    }

    public static Player generatePlayer(String id, League league)  {
        return new Player("Player" + id, league);
    }
}
