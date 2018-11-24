package com.elorating.utils;

import com.elorating.model.League;

import java.util.ArrayList;
import java.util.List;

public class LeagueTestUtils {

    public static League generateLeague() {
        return new League();
    }

    public static League generateLeague(String name) {
        League league = new League();
        league.setName(name);
        return new League();
    }

    public static List<League> generateLeagues(int amount, String name) {
        ArrayList<League> arrayList = new ArrayList<>();
        for (int i = 0; i < amount; i++) {
            League league = new League();
            league.setName(name + "" + i);
            arrayList.add(league);
        }

        return arrayList;
    }
}
