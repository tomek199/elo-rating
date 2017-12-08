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

    @Override
    public List<Match> rescheduleMatchesInLeague(String leagueId, int minutes, Sort sort) {
        List<Match> matchesToReschedule = matchRepository.findByLeagueIdAndCompletedIsFalse(leagueId, sort);

        Date rescheduleTime = new Date();
        for (int i = 0; i < matchesToReschedule.size(); i++) {
            Match match = matchesToReschedule.get(i);
            if (i == 0 && match.getDate().getTime() <= rescheduleTime.getTime()) {
                match.setDate(DateUtils.adjustTimeByMinutesIntoFuture(match.getDate(), minutes));
            } else {
                rescheduleTime = DateUtils.adjustTimeByMinutesIntoFuture(matchesToReschedule.get(i - 1).getDate(), minutes);
                if (match.getDate().getTime() < rescheduleTime.getTime()) {
                    match.setDate(rescheduleTime);
                }
            }

            matchesToReschedule.set(i, match);
        }

        saveMatches(matchesToReschedule);

        return matchRepository.findByLeagueIdAndCompletedIsFalse(leagueId, sort);
    }

    private void saveMatches(List<Match> matches) {
        for (Match match : matches) {
            this.matchRepository.save(match);
        }
    }
}
