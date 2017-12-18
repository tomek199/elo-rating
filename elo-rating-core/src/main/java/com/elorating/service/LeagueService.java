package com.elorating.service;

import com.elorating.model.League;
import com.elorating.model.User;

import java.util.List;

public interface LeagueService extends GenericService<League> {

    List<League> findByName(String leagueName);
    List<League> findUnassignedLeagues();
    League findLeagueByIdAndUser(String leagueId, User user);
}
