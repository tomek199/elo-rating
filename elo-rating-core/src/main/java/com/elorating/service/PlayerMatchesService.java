package com.elorating.service;

import com.elorating.model.Match;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import java.util.Date;
import java.util.List;

public interface PlayerMatchesService {

    List<Match> findByPlayerId(String playerId, Sort sort);
    List<Match> findScheduledByPlayerId(String playerId, Sort sort);
    Page<Match> findCompletedByPlayerId(String playerId, PageRequest pageRequest);
    List<Match> findCompletedByPlayerId(String playerId, Sort sort);
    List<Match> findCompletedByPlayerIds(String playerId, String opponentId, Sort sort);
    List<Match> findCompletedByPlayerIdAndDate(String playerId, Date from, Sort sort);
    List<Match> findCompletedByPlayerIdAndDate(String playerId, Date from, Date to, Sort sort);
    List<Match> getMatchForecast(String playerId, String opponentId);
}
