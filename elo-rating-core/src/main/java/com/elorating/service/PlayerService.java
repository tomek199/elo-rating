package com.elorating.service;

import com.elorating.model.Match;
import com.elorating.model.Player;
import org.springframework.data.domain.Sort;

import java.util.List;

public interface PlayerService extends GenericService<Player> {

    List<Player> findByLeagueId(String id);
    List<Player> getRanking(String id, Sort sort);
    List<Player> findByLeagueIdAndUsernameLikeIgnoreCase(String leagueId, String username);
    void restorePlayers(Match match);
}
