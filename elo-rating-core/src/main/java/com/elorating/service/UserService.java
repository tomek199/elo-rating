package com.elorating.service;

import com.elorating.model.Player;
import com.elorating.model.User;

public interface UserService extends GenericService<User> {
    User connectUserToLeagueAndPlayer(User user);
    User connectUserToLeague(User user);
    User connectUserToPlayer(User user);
    User checkForPendingInvitation(User userFromGoogle);
    User saveOrUpdateUser(User userFromGoogle);
    User inviteNewUser(String currentUser, User userToInvite, String originUrl);
    User inviteExistingUser(String currentUser, User requestUser, String originUrl);
    User connectUserAndLeague(String userId, String leagueId);
    User connectUserAndPlayer(String userId, String playerId);
    Player createPlayerForUser(String userId, String leagueId);
}
