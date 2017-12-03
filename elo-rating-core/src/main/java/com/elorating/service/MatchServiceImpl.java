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

    // TODO: needs adjustments - handle range of minutes when match is rescheduled
    @Override
    public List<Match> rescheduleMatchesInLeague(String leagueId, int minutes, Sort sort) {
        List<Match> matchesToReschedule = matchRepository.findByLeagueIdAndCompletedIsFalse(leagueId, sort);

        Date rescheduleTime = new Date();
        for (int i = 0; i < matchesToReschedule.size(); i++) {
            Match match = matchesToReschedule.get(i);
            if (i == 0 && match.getDate().getTime() <= rescheduleTime.getTime()) {
                match.setDate(dateUtils.adjustTimeByMinutes(match.getDate(), minutes, false));
            } else {
                String previousMatchTime = dateUtils.getDateTime(matchesToReschedule.get(i - 1).getDate());
                String currentMatchTime = dateUtils.getDateTime(match.getDate());
                if (previousMatchTime.equals(currentMatchTime)) {
                    match.setDate(dateUtils.adjustTimeByMinutes(match.getDate(), minutes, false));
                }
            }

            matchesToReschedule.set(i, match);
        }

        saveMatches(matchesToReschedule);

        List<Match> rescheduledMatches = matchRepository.findByLeagueIdAndCompletedIsFalse(leagueId, sort);
        return rescheduledMatches;
    }

    private void saveMatches(List<Match> matches) {
        for (Match match : matches) {
            this.matchRepository.save(match);
        }
    }
}
