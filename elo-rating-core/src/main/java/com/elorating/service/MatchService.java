package com.elorating.service;

import com.elorating.model.Match;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;

public interface MatchService extends GenericService<Match> {

    List<Match> findByLeagueId(String leagueId, Sort sortByDate);
    Page<Match> findByLeagueIdAndCompletedIsTrue(String leagueId, Pageable pageRequest);
    List<Match> findByLeagueIdAndCompletedIsFalse(String leagueId, Sort sortByDate);
    List<Match> findByPlayerId(String playerId);
    List<Match> rescheduleMatchesInLeague(String leagueId, int minutes, Sort sort);
}
