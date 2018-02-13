package com.elorating.service;

import com.elorating.model.OpponentStats;

import java.util.List;

/**
 * Created by pokor on 10.06.2017.
 */
public interface PlayerStatsService {

    OpponentStats getOpponentStats(String playerId, String opponentId);
    List<OpponentStats> getOpponentsStats(String playerId);
}
