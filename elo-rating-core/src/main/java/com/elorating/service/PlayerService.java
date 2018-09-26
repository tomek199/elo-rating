package com.elorating.service;

import com.elorating.model.Match;
import com.elorating.model.Player;
import com.elorating.repository.PlayerRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

@Service
public class PlayerService implements RepositoryService<Player> {

    @Resource
    private PlayerRepository playerRepository;

    @Override
    public Player getById(String id) {
        return playerRepository.findOne(id);
    }

    @Override
    public List<Player> getAll() {
        return playerRepository.findAll();
    }

    @Override
    public Player save(Player player) {
        return playerRepository.save(player);
    }

    @Override
    public List<Player> save(Iterable<Player> players) {
        return playerRepository.save(players);
    }

    @Override
    public void deleteById(String id) {
        playerRepository.delete(id);
    }

    @Override
    public void deleteAll() {
        playerRepository.deleteAll();
    }

    public List<Player> findByLeagueId(String id) {
        return playerRepository.findByLeagueId(id);
    }

    public Long getActivePlayersCountByLeague(String leaugeId) {
        return playerRepository.countByLeagueIdAndActiveIsTrue(leaugeId);
    }

    public List<Player> getRanking(String id, Sort sort) {
        return playerRepository.getRanking(id, sort);
    }

    public List<Player> findByLeagueIdAndUsernameLikeIgnoreCase(String leagueId, String username) {
        return playerRepository.findByLeagueIdAndUsernameLikeIgnoreCase(leagueId, username);
    }

    public List<Player> findByLeagueIdAndUsernameRegex(String leagueId, String username) {
        if (username.length() > 1) {
            StringBuilder regex = new StringBuilder("(?i).*");
            for (int i = 0; i < username.length(); i++) {
                regex.append(username.charAt(i)).append(".*");
            }
            return playerRepository.findByLeagueIdAndUsernameRegex(leagueId, regex.toString());
        }
        return new ArrayList<>();
    }

    public void restorePlayers(Match match) {
        Player playerOne = playerRepository.findOne(match.getPlayerOne().getId());
        playerOne.restore(match.getRatingDelta(), match.isDraw());
        playerRepository.save(playerOne);
        Player playerTwo = playerRepository.findOne(match.getPlayerTwo().getId());
        playerTwo.restore(-match.getRatingDelta(), match.isDraw());
        playerRepository.save(playerTwo);
    }
}
