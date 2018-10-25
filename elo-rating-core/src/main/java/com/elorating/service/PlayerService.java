package com.elorating.service;

import com.elorating.model.Match;
import com.elorating.model.Player;
import com.elorating.repository.PlayerRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PlayerService implements RepositoryService<Player> {

    @Resource
    private PlayerRepository playerRepository;

    @Override
    public Optional<Player> getById(String id) {
        return playerRepository.findById(id);
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
        return playerRepository.saveAll(players);
    }

    @Override
    public void deleteById(String id) {
        playerRepository.deleteById(id);
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

    public List<Player> findByLeagueIdAndUsername(String leagueId, String username) {
        if (username.length() == 2) {
            String regex = buildInitialsRegex(username);
            System.out.println(regex);
            return playerRepository.findByLeagueIdAndUsernameRegex(leagueId, regex);
        } else if (username.length() > 2) {
            return playerRepository.findByLeagueIdAndUsernameLikeIgnoreCase(leagueId, username);
        }
        return new ArrayList<>();
    }

    public List<Player> findActiveByLeagueIdAndUsername(String leagueId, String username) {
        if (username.length() == 2) {
            String regex = buildInitialsRegex(username);
            return playerRepository.findByLeagueIdAndActiveIsTrueAndUsernameRegex(leagueId, regex);
        } else if (username.length() > 2) {
            return playerRepository.findByLeagueIdAndActiveIsTrueAndUsernameLikeIgnoreCase(leagueId, username);
        }
        return new ArrayList<>();
    }

    private String buildInitialsRegex(String username) {
        StringBuilder regex = new StringBuilder("(?i)^");
        String[] split = username.split("");
        regex.append(split[0]).append(".*\\s");
        regex.append(split[1]).append(".*");
        return regex.toString();
    }

    public void restorePlayers(Match match) {
        getById(match.getPlayerOne().getId()).ifPresent(playerOne -> {
            playerOne.restore(match.getRatingDelta(), match.isDraw());
            playerRepository.save(playerOne);
        });
        getById(match.getPlayerTwo().getId()).ifPresent(playerTwo -> {
            playerTwo.restore(-match.getRatingDelta(), match.isDraw());
            playerRepository.save(playerTwo);
        });
    }
}
