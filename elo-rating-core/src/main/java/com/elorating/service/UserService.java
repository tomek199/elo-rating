package com.elorating.service;

import com.elorating.model.Player;
import com.elorating.model.User;

import java.util.List;
import java.util.TimeZone;

public interface UserService extends GenericService<User> {
    User findByEmail(String email);
    User findByInvitationToken(String token);
    List<User> findByNameLikeIgnoreCase(String name);
    User connectUserToLeagueAndPlayer(User user);
    User connectUserToLeague(User user);
    User connectUserToPlayer(User user);
    User checkForPendingInvitation(User userFromGoogle);
    User saveOrUpdateUser(User userFromGoogle);
    User saveOrUpdateUser(User userFromGoogle, TimeZone timeZone);
    User inviteNewUser(String currentUser, User userToInvite, String originUrl);
    User inviteExistingUser(String currentUser, User requestUser, String originUrl);
    User connectUserAndLeague(String userId, String leagueId);
    User connectUserAndPlayer(String userId, String playerId);
    Player createPlayerForUser(String userId, String leagueId);
}
