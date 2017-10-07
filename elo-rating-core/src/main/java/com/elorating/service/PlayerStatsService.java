package com.elorating.service;

import com.elorating.model.OpponentStats;
import com.elorating.model.PlayerStats;

import java.util.List;

/**
 * Created by pokor on 10.06.2017.
 */
public interface PlayerStatsService {

    public List<PlayerStats> getAllPlayerStatsByLeague(String leagueId);
    public PlayerStats getPlayerStats(String id);
    public OpponentStats getOpponentStats(String playerId, String opponentId);
}
