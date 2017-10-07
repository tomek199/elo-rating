package com.elorating.utils;

import com.elorating.model.League;
import com.elorating.model.Match;
import com.elorating.model.Player;

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
}
