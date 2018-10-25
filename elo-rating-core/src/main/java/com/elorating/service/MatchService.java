package com.elorating.service;

import com.elorating.algorithm.Elo;
import com.elorating.model.Match;
import com.elorating.model.Player;
import com.elorating.repository.MatchRepository;
import com.elorating.repository.PlayerRepository;
import com.elorating.service.email.EmailGenerator;
import com.elorating.utils.DateUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class MatchService implements RepositoryService<Match> {

    private static final Logger logger = LoggerFactory.getLogger(MatchService.class);

    @Resource
    private MatchRepository matchRepository;

    @Resource
    private PlayerRepository playerRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private EmailGenerator emailGenerator;

    @Override
    public Optional<Match> getById(String id) {
        return matchRepository.findById(id);
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
    public List<Match> save(Iterable<Match> matches) {
        return matchRepository.saveAll(matches);
    }

    @Override
    public void deleteById(String id) {
        matchRepository.deleteById(id);
    }

    @Override
    public void deleteAll() {
        matchRepository.deleteAll();
    }

    public List<Match> saveAndNotify(List<Match> matches, String originUrl) {
        for (Match match : matches) {
            saveAndNotify(match, originUrl);
        }
        return matches;
    }

    public Match saveAndNotify(Match match, String originUrl) {
        boolean update = checkIfMatchToUpdate(match);
        match = save(match);
        match = fulfillPlayersInfo(match);
        if (update) {
            this.emailService.sendEmails(emailGenerator.generateEmails(match, emailGenerator.EDIT_MATCH, originUrl));
        } else {
            this.emailService.sendEmails(emailGenerator.generateEmails(match, emailGenerator.SCHEDULE_MATCH, originUrl));
        }
        return match;
    }

    public void deleteByIdWithNotification(String id, String originUrl) {
        matchRepository.findById(id).ifPresent(matchToDelete -> {
            matchRepository.deleteById(id);
            matchToDelete = fulfillPlayersInfo(matchToDelete);
            if (!matchRepository.findById(id).isPresent()) {
                this.emailService.sendEmails(emailGenerator.generateEmails(matchToDelete, emailGenerator.CANCEL_MATCH, originUrl));
            }
        });
    }

    public Match saveMatchWithPlayers(Match match) {
        Elo elo = new Elo(match);
        match.getPlayerOne().setRating(elo.getPlayerOneRating());
        match.getPlayerTwo().setRating(elo.getPlayerTwoRating());
        match.setRatingDelta(elo.getMatch().getRatingDelta());
        updatePlayer(match.getPlayerOne(), match.getWinnerId());
        updatePlayer(match.getPlayerTwo(), match.getWinnerId());
        match.setCompleted();
        match.setDate(new Date());
        return save(match);
    }

    private void updatePlayer(Player player, String winnerId) {
        playerRepository.findById(player.getId()).ifPresent(playerToUpdate -> {
            playerToUpdate.setRating(player.getRating());
            playerToUpdate.updateStatistics(winnerId);
            playerRepository.save(playerToUpdate);
        });
    }

    public List<Match> findByLeagueId(String leagueId, Sort sortByDate) {
        return matchRepository.findByLeagueId(leagueId, sortByDate);
    }

    public Page<Match> findByLeagueIdAndCompletedIsTrue(String leagueId, Pageable pageRequest) {
        return matchRepository.findByLeagueIdAndCompletedIsTrue(leagueId, pageRequest);
    }

    public List<Match> findByLeagueIdAndCompletedIsFalse(String leagueId, Sort sortByDate) {
        return matchRepository.findByLeagueIdAndCompletedIsFalse(leagueId, sortByDate);
    }

    public List<Match> findByPlayerId(String playerId) {
        return matchRepository.findByPlayerId(playerId);
    }

    public List<Match> findByCompletedIsFalse() {
        return matchRepository.findByCompletedIsFalse();
    }

    public List<Match> rescheduleMatchesInLeague(String leagueId, int minutes,
                                                 Sort sort, String originUrl) {
        List<Match> matchesInQueue = matchRepository.findByLeagueIdAndCompletedIsFalse(leagueId, sort);
        List<Match> matchesToReschedule = new ArrayList<>(matchesInQueue.size());

        Date rescheduleTime = new Date();
        for (int i = 0; i < matchesInQueue.size(); i++) {
            Match match = matchesInQueue.get(i);
            if (i == 0 && match.getDate().getTime() <= rescheduleTime.getTime()) {
                match.setDate(DateUtils.adjustTimeByMinutesIntoFuture(match.getDate(), minutes));
                matchesToReschedule.add(match);
            } else {
                rescheduleTime = DateUtils.adjustTimeByMinutesIntoFuture(matchesInQueue.get(i - 1).getDate(), minutes);
                if (match.getDate().getTime() < rescheduleTime.getTime()) {
                    match.setDate(rescheduleTime);
                    matchesToReschedule.add(match);
                }
            }
        }

        saveAndNotify(matchesToReschedule, originUrl);
        return matchRepository.findByLeagueIdAndCompletedIsFalse(leagueId, sort);
    }

    public boolean checkIfCompleted(Match match) {
        if (match.getId() != null && match.getId().length() > 0) {
            Match matchToCheck = matchRepository.findByIdAndCompletedIsTrue(match.getId());
            return (matchToCheck != null) ? true : false;
        }
        return false;
    }

    private boolean checkIfMatchToUpdate(Match match) {
        return match.getId() != null ? true : false;
    }

    private Match fulfillPlayersInfo(Match match) {
        Optional<Player> playerOne = playerRepository.findById(match.getPlayerOne().getId());
        match.setPlayerOne(playerOne.orElseGet(Player::new));
        Optional<Player> playerTwo = playerRepository.findById(match.getPlayerTwo().getId());
        match.setPlayerTwo(playerTwo.orElseGet(Player::new));
        return match;
    }
}
