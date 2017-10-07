package com.elorating.service;

import com.elorating.model.Match;
import com.elorating.model.OpponentStats;
import com.elorating.model.Player;
import com.elorating.model.PlayerStats;
import com.elorating.repository.MatchRepository;
import com.elorating.repository.PlayerRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by pokor on 10.06.2017.
 */
@Service("playerStatsService")
public class PlayerStatsServiceImpl implements PlayerStatsService {

    @Resource
    PlayerRepository playerRepository;

    @Resource
    MatchRepository matchRepository;

    @Override
    public List<PlayerStats> getAllPlayerStatsByLeague(String leagueId) {
        Sort sortByRating = new Sort(Sort.Direction.DESC, "rating");
        List<Player> leaguePlayers = playerRepository.getRanking(leagueId, sortByRating);
        List<PlayerStats> leaguePlayerStats = new ArrayList<>();
        for (Player player : leaguePlayers) {
            PlayerStats playerStats = getPlayerStats(player.getId());
            leaguePlayerStats.add(playerStats);
        }

        return leaguePlayerStats;
    }

    @Override
    public PlayerStats getPlayerStats(String id) {
        Player player = playerRepository.findOne(id);
        List<Match> matches = matchRepository.findCompletedByPlayerId(player.getId());
        PlayerStats playerStats = new PlayerStats(player);
        playerStats.setStats(matches);
        return playerStats;
    }

    @Override
    public OpponentStats getOpponentStats(String playerId, String opponentId) {
        Sort sortByDate = new Sort(Sort.Direction.DESC, "date");
        Player player = playerRepository.findOne(playerId);
        Player opponent = playerRepository.findOne(opponentId);
        List<Match> matches = matchRepository.findCompletedByPlayerIds(playerId, opponentId, sortByDate);
        OpponentStats opponentStats = new OpponentStats(player, opponent);
        opponentStats.setStats(matches);
        return opponentStats;
    }
}
