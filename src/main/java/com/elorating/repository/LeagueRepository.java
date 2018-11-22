package com.elorating.repository;

import com.elorating.model.League;
import com.elorating.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LeagueRepository extends MongoRepository<League, String> {
    List<League> findByNameLikeIgnoreCase(String name);
    List<League> findByUsersNull();
    League findByIdAndUsers(String id, User user);
}
