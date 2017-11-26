package com.elorating.service;

import com.elorating.model.Match;
import com.elorating.repository.MatchRepository;
import com.elorating.utils.DateUtils;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;

@Service("matchService")
public class MatchServiceImpl implements MatchService {

    @Resource
    MatchRepository matchRepository;

    private DateUtils dateUtils = new DateUtils();

    @Override
    public List<Match> rescheduleMatchesInLeague(String leagueId, int minutes, Sort sort) {
        List<Match> matchesToReschedule = matchRepository.findByLeagueIdAndCompletedIsFalse(leagueId, sort);

        Date now = new Date();
        Date rescheduleTime = new DateUtils().adjustTimeByMinutes(now, minutes, true);
        for (int i = 0; i < matchesToReschedule.size(); i++) {
            Match match = matchesToReschedule.get(i);
            if (match.getDate().getTime() < rescheduleTime.getTime()) {
                match.setDate(dateUtils.adjustTimeByMinutes(match.getDate(), minutes, false));
            }
            matchesToReschedule.set(i, match);
        }

        for (Match match : matchesToReschedule) {
            this.matchRepository.save(match);
        }

        List<Match> rescheduledMatches = matchRepository.findByLeagueIdAndCompletedIsFalse(leagueId, sort);
        return rescheduledMatches;
    }
}
