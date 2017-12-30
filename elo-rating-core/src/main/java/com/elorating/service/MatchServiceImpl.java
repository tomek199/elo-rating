package com.elorating.service;

import com.elorating.model.Match;
import com.elorating.repository.MatchRepository;
import com.elorating.service.email.CancelledMatchEmail;
import com.elorating.service.email.EmailBuilder;
import com.elorating.service.email.EmailDirector;
import com.elorating.service.email.ScheduledMatchEmail;
import com.elorating.utils.DateUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;

@Service("matchService")
public class MatchServiceImpl implements MatchService {

    private static final Logger logger = LoggerFactory.getLogger(MatchServiceImpl.class);

    @Resource
    private MatchRepository matchRepository;

    @Autowired
    private EmailService emailService;

    @Override
    public Match getById(String id) {
        return matchRepository.findOne(id);
    }

    @Override
    public List<Match> getAll() {
        return matchRepository.findAll();
    }

    @Override
    public Match save(Match match) {
        return matchRepository.save(match);
    }

    @Override
    public Match saveAndNotify(Match match, String originUrl) {
        match = save(match);
        sendEmail(new ScheduledMatchEmail(matchRepository.findOne(match.getId()), originUrl));
        return match;
    }

    @Override
    public List<Match> save(Iterable<Match> matches) {
        return matchRepository.save(matches);
    }

    @Override
    public void deleteById(String id) {
        matchRepository.delete(id);
    }

    @Override
    public void deleteByIdWithNotification(String id, String originUrl) {
        Match matchToDelete = matchRepository.findOne(id);
        matchRepository.delete(id);
        if (matchRepository.findOne(id) == null) {
            sendCancellationEmails(generateCancellationEmails(matchToDelete, originUrl));
        }
    }

    @Override
    public List<Match> findByLeagueId(String leagueId, Sort sortByDate) {
        return matchRepository.findByLeagueId(leagueId, sortByDate);
    }

    @Override
    public Page<Match> findByLeagueIdAndCompletedIsTrue(String leagueId, Pageable pageRequest) {
        return matchRepository.findByLeagueIdAndCompletedIsTrue(leagueId, pageRequest);
    }

    @Override
    public List<Match> findByLeagueIdAndCompletedIsFalse(String leagueId, Sort sortByDate) {
        return matchRepository.findByLeagueIdAndCompletedIsFalse(leagueId, sortByDate);
    }

    @Override
    public List<Match> findByPlayerId(String playerId) {
        return matchRepository.findByPlayerId(playerId);
    }

    @Override
    public List<Match> findByPlayerId(String playerId, Sort sort) {
        return matchRepository.findByPlayerId(playerId, sort);
    }

    @Override
    public List<Match> findByCompletedIsFalse() {
        return matchRepository.findByCompletedIsFalse();
    }

    @Override
    public List<Match> findScheduledByPlayerId(String playerId, Sort sort) {
        return matchRepository.findScheduledByPlayerId(playerId, sort);
    }

    @Override
    public Page<Match> findCompletedByPlayerId(String playerId, PageRequest pageRequest) {
        return matchRepository.findCompletedByPlayerId(playerId, pageRequest);
    }

    @Override
    public List<Match> findCompletedByPlayerId(String playerId, Sort sort) {
        return matchRepository.findCompletedByPlayerId(playerId, sort);
    }

    @Override
    public List<Match> findCompletedByPlayerIds(String playerId, String opponentId, Sort sort) {
        return matchRepository.findCompletedByPlayerIds(playerId, opponentId, sort);
    }

    @Override
    public List<Match> findCompletedByPlayerIdAndDate(String playerId, Date from, Sort sort) {
        return matchRepository.findCompletedByPlayerIdAndDate(playerId, from, sort);
    }

    @Override
    public List<Match> findCompletedByPlayerIdAndDate(String playerId, Date from, Date to, Sort sort) {
        return matchRepository.findCompletedByPlayerIdAndDate(playerId, from, to, sort);
    }

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

    @Override
    public void deleteAll() {
        matchRepository.deleteAll();
    }

    private CancelledMatchEmail[] generateCancellationEmails(Match match, String originUrl) {
        CancelledMatchEmail[] cancelledMatchEmails = {
                new CancelledMatchEmail(match.getPlayerOne().getUsername(), match.getPlayerTwo().getUser() != null ? match.getPlayerTwo().getUser().getEmail() : "" , originUrl, match.getLeague()),
                new CancelledMatchEmail(match.getPlayerTwo().getUsername(), match.getPlayerOne().getUser() != null ? match.getPlayerOne().getUser().getEmail() : "", originUrl, match.getLeague())
        };
        return cancelledMatchEmails;
    }

    private void sendCancellationEmails(CancelledMatchEmail[] cancelledMatchEmails) {
        try {
            for (EmailBuilder emailBuilder: cancelledMatchEmails) {
                sendEmail(emailBuilder);
            }
        } catch (Exception e) {
            logger.error("Error while sending cancellation emails");
        }
    }

    private boolean sendEmail(EmailBuilder emailBuilder) {
        EmailDirector emailDirector = new EmailDirector();
        emailDirector.setBuilder(emailBuilder);
        return emailService.send(emailDirector.build());
    }
}
