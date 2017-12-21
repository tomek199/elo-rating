package com.elorating.service;

import com.elorating.model.OpponentStats;

/**
 * Created by pokor on 10.06.2017.
 */
public interface PlayerStatsService {

    public OpponentStats getOpponentStats(String playerId, String opponentId);
}
