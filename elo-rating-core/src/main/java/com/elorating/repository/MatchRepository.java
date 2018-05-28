package com.elorating.repository;

import com.elorating.model.Match;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface MatchRepository extends MongoRepository<Match, String> {
    List<Match> findByLeagueId(String id, Sort sort);

    Page<Match> findByLeagueIdAndCompletedIsTrue(String id, Pageable pageable);

    List<Match> findByLeagueIdAndCompletedIsFalse(String id, Sort sort);

    Match findByIdAndCompletedIsTrue(String id);

    List<Match> findByCompletedIsFalse();

    @Query(value = "{'$or': [{'playerOne.id': ?0}, {'playerTwo.id': ?0}]}")
    List<Match> findByPlayerId(String playerId, Sort sort);

    @Query(value = "{'$or': [{'playerOne.id': ?0}, {'playerTwo.id': ?0}]}")
    List<Match> findByPlayerId(String playerId);

    @Query(value =
            "{'$and': [" +
                "{'completed': true}," +
                "{'$or': [{'playerOne.id': ?0}, {'playerTwo.id': ?0}]}" +
            "]}")
    Page<Match> findCompletedByPlayerId(String playerId, Pageable pageable);

    @Query(value =
            "{'$and': [" +
                "{'completed': true}," +
                "{'$or': [{'playerOne.id': ?0}, {'playerTwo.id': ?0}]}" +
            "]}")
    List<Match> findCompletedByPlayerId(String playerId);

    @Query(value =
            "{'$and': [" +
                "{'completed': true}," +
                "{'$or': [{'playerOne.id': ?0}, {'playerTwo.id': ?0}]}" +
            "]}")
    List<Match> findCompletedByPlayerId(String playerId, Sort sort);

    @Query(value =
            "{'$and': [" +
                "{'completed': true}," +
                "{'$or': [{'playerOne.id': ?0}, {'playerTwo.id': ?0}]}," +
                "{'date': {$gte: ?1}}" +
            "]}")
    List<Match> findCompletedByPlayerIdAndDate(String playerId, Date from, Sort sort);

    @Query(value =
            "{'$and': [" +
                "{'completed': true}," +
                "{'$or': [{'playerOne.id': ?0}, {'playerTwo.id': ?0}]}," +
                "{'date': {$gte: ?1, $lte: ?2}}" +
            "]}")
    List<Match> findCompletedByPlayerIdAndDate(String playerId, Date from, Date to, Sort sort);

    @Query(value =
            "{'$and': [" +
                "{'completed': false}," +
                "{'$or': [{'playerOne.id': ?0}, {'playerTwo.id': ?0}]}" +
            "]}")
    List<Match> findScheduledByPlayerId(String playerId, Sort sort);

    @Query(value =
            "{'$and' : [" +
                "{'completed': true}," +
                "{'$or' : [" +
                    "{'$and': [{'playerOne.id': ?0}, {'playerTwo.id': ?1}]}," +
                    "{'$and': [{'playerOne.id': ?1}, {'playerTwo.id': ?0}]}" +
                "]}" +
            "]}")
    List<Match> findCompletedByPlayerIds(String playerOneId, String playerTwoId);

    @Query(value =
            "{'$and' : [" +
                "{'completed': true}," +
                "{'$or' : [" +
                    "{'$and': [{'playerOne.id': ?0}, {'playerTwo.id': ?1}]}," +
                    "{'$and': [{'playerOne.id': ?1}, {'playerTwo.id': ?0}]}" +
                "]}" +
            "]}")
    List<Match> findCompletedByPlayerIds(String playerOneId, String playerTwoId, Sort sort);

    @Query(value =
            "{'$and' : [" +
                "{'completed': true}," +
                "{'$or' : [" +
                    "{'$and': [{'playerOne.id': ?0}, {'playerTwo.id': ?1}]}," +
                    "{'$and': [{'playerOne.id': ?1}, {'playerTwo.id': ?0}]}" +
                "]}" +
            "]}")
    Page<Match> findCompletedByPlayerIds(String playerOneId, String playerTwoId, Pageable pageable);

    void deleteByLeagueId(String leagueId);
}
