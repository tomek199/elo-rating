package com.elorating.service;

import com.elorating.model.Match;
import org.springframework.data.domain.Sort;

import java.util.List;

public interface MatchService {

    List<Match> rescheduleMatchesInLeague(String leagueId, int minutes, Sort sort);
}
