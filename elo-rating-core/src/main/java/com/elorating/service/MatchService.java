package com.elorating.service;

import com.elorating.model.Match;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.Date;
import java.util.List;

public interface MatchService extends GenericService<Match> {

    Match saveMatchWithPlayers(Match match);
    List<Match> findByLeagueId(String leagueId, Sort sortByDate);
    Page<Match> findByLeagueIdAndCompletedIsTrue(String leagueId, Pageable pageRequest);
    List<Match> findByLeagueIdAndCompletedIsFalse(String leagueId, Sort sortByDate);
    List<Match> findByPlayerId(String playerId);
    List<Match> findByPlayerId(String playerId, Sort sort);
    List<Match> findByCompletedIsFalse();
    List<Match> findScheduledByPlayerId(String playerId, Sort sort);
    Page<Match> findCompletedByPlayerId(String playerId, PageRequest pageRequest);
    List<Match> findCompletedByPlayerId(String playerId, Sort sort);
    List<Match> findCompletedByPlayerIds(String playerId, String opponentId, Sort sort);
    List<Match> findCompletedByPlayerIdAndDate(String playerId, Date from, Sort sort);
    List<Match> findCompletedByPlayerIdAndDate(String playerId, Date from, Date to, Sort sort);
    List<Match> rescheduleMatchesInLeague(String leagueId, int minutes, Sort sort);
}
