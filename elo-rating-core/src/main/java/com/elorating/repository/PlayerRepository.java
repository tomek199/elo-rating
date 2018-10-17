package com.elorating.repository;

import com.elorating.model.Player;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("playerRepository")
public interface PlayerRepository extends MongoRepository<Player, String> {
    List<Player> findByLeagueId(String id);

    List<Player> findByIdNotAndLeagueId(String id, String leagueId);

    Long countByLeagueIdAndActiveIsTrue(String leagueId);

    @Query(value = "{'league.id': ?0, 'active': true}")
    List<Player> getRanking(String id, Sort sort);

    List<Player> findByLeagueIdAndUsernameLikeIgnoreCase(String leagueId, String username);

    List<Player> findByLeagueIdAndActiveIsTrueAndUsernameLikeIgnoreCase(String leagueId, String username);

    List<Player> findByLeagueIdAndUsernameRegex(String leagueId, String username);

    List<Player> findByLeagueIdAndActiveIsTrueAndUsernameRegex(String leagueId, String username);

    void deleteByLeagueId(String leagueId);
}
