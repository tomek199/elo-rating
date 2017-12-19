package com.elorating.service;

import com.elorating.algorithm.Elo;
import com.elorating.model.Match;
import com.elorating.model.Player;
import com.elorating.repository.MatchRepository;
import com.elorating.repository.PlayerRepository;
import com.elorating.utils.DateUtils;
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

    @Resource
    private MatchRepository matchRepository;

    @Resource
    private PlayerRepository playerRepository;

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
    public List<Match> save(Iterable<Match> matches) {
        return matchRepository.save(matches);
    }

    @Override
    public void deleteById(String id) {
        matchRepository.delete(id);
    }

    @Override
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
        Player playerToUpdate = playerRepository.findOne(player.getId());
        playerToUpdate.setRating(player.getRating());
        playerToUpdate.updateStatistics(winnerId);
        playerRepository.save(playerToUpdate);
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
}
