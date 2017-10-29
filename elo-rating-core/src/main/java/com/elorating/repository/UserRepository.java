package com.elorating.repository;

import com.elorating.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("userRepository")
public interface UserRepository extends MongoRepository<User, String> {
    User findByGoogleId(String googleId);
    User findByEmail(String email);
    List<User> findByNameLikeIgnoreCase(String name);
    User findByInvitationToken(String token);
    @Query(value = "" +
            "{" +
                "'email': ?0, " +
                "'invitationToken': {'$exists': true, '$ne': ''}" +
            "}")
    User findByEmailAndInvitationTokenExists(String email);
}
