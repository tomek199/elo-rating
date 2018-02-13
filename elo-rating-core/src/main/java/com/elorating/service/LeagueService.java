package com.elorating.service;

import com.elorating.model.League;
import com.elorating.model.LeagueSettings;
import com.elorating.model.User;

import java.util.List;

public interface LeagueService extends GenericService<League> {

    List<League> findByName(String leagueName);
    League update(League league);
    List<League> findUnassignedLeagues();
    League findLeagueByIdAndUser(String leagueId, User user);
    LeagueSettings getLeagueSettings(String id);
}
