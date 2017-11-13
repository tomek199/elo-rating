package com.elorating.service;

import com.elorating.model.Match;
import com.elorating.repository.MatchRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service("matchService")
public class MatchServiceImpl implements MatchService {

    @Resource
    MatchRepository matchRepository;

    @Override
    public List<Match> rescheduleMatchesInLeague(String leagueId, int minutes, Sort sort) {
        // TODO: Implement rescheduling matches in Queue
        List<Match> rescheduledMatches = matchRepository.findByLeagueIdAndCompletedIsFalse(leagueId, sort);
        return rescheduledMatches;
    }
}
