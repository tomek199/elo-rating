package com.elorating.service;

import com.elorating.model.*;
import com.elorating.repository.MatchRepository;
import com.elorating.repository.PlayerRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

/**
 * Created by pokor on 10.06.2017.
 */
@Service
public class PlayerStatsService {

    @Resource
    private PlayerRepository playerRepository;

    @Resource
    private MatchRepository matchRepository;

    public OpponentStats getOpponentStats(String playerId, String opponentId) {
        Sort sortByDate = new Sort(Sort.Direction.DESC, "date");
        Optional<Player> player = playerRepository.findById(playerId);
        Optional<Player> opponent = playerRepository.findById(opponentId);
        if (player.isPresent() && opponent.isPresent()) {
            List<Match> matches = matchRepository.findCompletedByPlayerIds(playerId, opponentId, sortByDate);
            OpponentStats opponentStats = new OpponentStats(player.get(), opponent.get());
            opponentStats.setStats(matches);
            return opponentStats;
        }
        return null;
    }

    public List<OpponentStats> getOpponentsStats(String playerId) {
        return playerRepository.findById(playerId).map(player -> {
            List<Player> opponents = playerRepository.findByIdNotAndLeagueId(playerId, player.getLeague().getId());
            ArrayList<OpponentStats> opponentStats = new ArrayList<>(opponents.size());
            for (Player opponent : opponents) {
                opponentStats.add(getOpponentStats(playerId, opponent.getId()));
            }
            return opponentStats;
        }).orElseGet(ArrayList::new);
    }

    public List<RatingHistory> getRatingHistory(String playerId, Date from, Date to, Sort sort) {
        List<Match> matches = matchRepository.findCompletedByPlayerIdAndDate(playerId, from, to, sort);
        return buildRatingHistory(matches, playerId);
    }

    public List<RatingHistory> getRatingHistory(String playerId, Date from, Sort sort) {
        List<Match> matches = matchRepository.findCompletedByPlayerIdAndDate(playerId, from, sort);
        return buildRatingHistory(matches, playerId);
    }

    public List<RatingHistory> getRatingHistory(String playerId, Sort sort) {
        List<Match> matches = matchRepository.findCompletedByPlayerId(playerId, sort);
        return buildRatingHistory(matches, playerId);
    }

    private List<RatingHistory> buildRatingHistory(List<Match> matches, String playerId) {
        List<RatingHistory> history = new ArrayList<>();
        for (Match match : matches) {
            history.add(new RatingHistory(match, playerId));
        }
        return history;
    }

    public PlayerMatchesStats getPlayerMatchesStats(String playerId) {
        PlayerMatchesStats statistics = new PlayerMatchesStats();
        List<Match> matches = matchRepository.findCompletedByPlayerId(playerId);
        for (Match match : matches) {
            getMatchRatio(playerId, statistics, match);
            getSetsRatio(playerId, statistics, match);
            setMinMaxRating(playerId, statistics, match);
        }
        return statistics;
    }

    private void getMatchRatio(String playerId, PlayerMatchesStats statistics, Match match) {
        if (match.isDraw())
            statistics.addDraw();
        else if (playerId.equals(match.getWinnerId()))
            statistics.addWon();
        else
            statistics.addLost();
    }

    private void getSetsRatio(String playerId, PlayerMatchesStats statistics, Match match) {
        for (String key : match.getScores().keySet()) {
            int sets = match.getScores().get(key);
            if (playerId.equals(key))
                statistics.addSetsWon(sets);
            else
                statistics.addSetsLost(sets);
        }
    }

    private void setMinMaxRating(String playerId, PlayerMatchesStats statistics, Match match) {
        Player player = new Player();
        player.setId(playerId);
        int rating = match.getRating(player);
        if (rating > statistics.getMaxRating()) {
            statistics.setMaxRating(rating);
            statistics.setMaxRatingDate(match.getDate());
        }
        if (rating < statistics.getMinRating()) {
            statistics.setMinRating(rating);
            statistics.setMinRatingDate(match.getDate());
        }
    }
}
