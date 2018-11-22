package com.elorating.utils;

import com.elorating.model.League;
import com.elorating.model.Match;
import com.elorating.model.Player;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by pokor on 10.06.2017.
 */
public class MatchTestUtils {

    public static Match generateMatch(League league, Player winner, Player loser, boolean completed) {
        Match match = new Match(winner, loser, league);
        match.setScore(winner, 2);
        match.setScore(loser, 0);
        if (completed) {
            match.setCompleted();
        }

        return match;
    }

    public static List<Match> setupMatches(Player playerOne, Player playerTwo, League league, int amount) {
        List<Match> matchList = new ArrayList<>();
        for (int i = 0; i < amount; i++) {
            Match match = new Match(playerOne, playerTwo, league);
            matchList.add(match);
        }

        return matchList;
    }

}
