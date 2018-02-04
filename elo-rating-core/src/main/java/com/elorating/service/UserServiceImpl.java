package com.elorating.service;

import com.elorating.model.League;
import com.elorating.model.Player;
import com.elorating.model.User;
import com.elorating.repository.LeagueRepository;
import com.elorating.repository.PlayerRepository;
import com.elorating.repository.UserRepository;
import com.elorating.service.email.*;
import com.elorating.utils.DateUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.TimeZone;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {

    @Resource
    private LeagueRepository leagueRepository;

    @Resource
    private UserRepository userRepository;

    @Resource
    private PlayerRepository playerRepository;

    @Resource
    private EmailService emailService;

    @Override
    public User getById(String id) {
        return userRepository.findOne(id);
    }

    @Override
    public List<User> getAll() {
        return userRepository.findAll();
    }

    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    @Override
    public List<User> save(Iterable<User> users) {
        return userRepository.save(users);
    }

    @Override
    public void deleteById(String id) {
        userRepository.delete(id);
    }

    @Override
    public void deleteAll() {
        userRepository.deleteAll();
    }

    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public User findByInvitationToken(String token) {
        return userRepository.findByInvitationToken(token);
    }

    @Override
    public List<User> findByNameLikeIgnoreCase(String name) {
        return userRepository.findByNameLikeIgnoreCase(name);
    }

    @Override
    public User connectUserToLeagueAndPlayer(User user) {
        connectUserToLeague(user);
        if (user.getPlayers() != null && user.getPlayers().size() > 0)
            connectUserToPlayer(user);
        return user;
    }

    @Override
    public User connectUserToLeague(User user) {
        String leagueId = user.getLeagues().get(0).getId();
        League league = leagueRepository.findOne(leagueId);
        league.getUsers().add(user);
        leagueRepository.save(league);
        return user;
    }

    @Override
    public User connectUserToPlayer(User user) {
        String playerId = user.getPlayers().get(0).getId();
        Player player = playerRepository.findOne(playerId);
        player.setUser(user);
        playerRepository.save(player);
        return user;
    }

    @Override
    public User checkForPendingInvitation(User userFromGoogle) {
        User user = userRepository.findByEmailAndInvitationTokenExists(userFromGoogle.getEmail());
        if (user != null) {
            user.clearInvitationToken();
            user.update(userFromGoogle);
            user.setGoogleId(userFromGoogle.getGoogleId());
            userRepository.save(user);
            user = connectUserToLeagueAndPlayer(user);
        }
        return user;
    }

    @Override
    public User saveOrUpdateUser(User userFromGoogle) {
        User savedUser = userRepository.findByGoogleId(userFromGoogle.getGoogleId());
        if (savedUser != null) {
            savedUser.update(userFromGoogle);
            savedUser = userRepository.save(savedUser);
        } else {
            savedUser = userRepository.save(userFromGoogle);
        }
        return savedUser;
    }

    @Override
    public User saveOrUpdateUser(User userFromGoogle, TimeZone timeZone) {
        User savedUser = userRepository.findByGoogleId(userFromGoogle.getGoogleId());
        if (savedUser != null) {
            savedUser.update(userFromGoogle);
            savedUser = setUserTimezone(savedUser, timeZone);
            savedUser = userRepository.save(savedUser);
        } else {
            userFromGoogle = setUserTimezone(userFromGoogle, timeZone);
            savedUser = userRepository.save(userFromGoogle);
        }
        return savedUser;
    }

    @Override
    public User inviteNewUser(String currentUser, User userToInvite, String originUrl) {
        String token = UUID.randomUUID().toString();
        userToInvite.setInvitationToken(token);
        userRepository.save(userToInvite);
        EmailBuilder emailBuilder = new InviteNewUserEmail(userToInvite.getEmail(), currentUser, originUrl, token);
        sendEmail(emailBuilder);
        userToInvite.clearInvitationToken();
        return userToInvite;
    }

    @Override
    public User inviteExistingUser(String currentUser, User requestUser, String originUrl) {
        League league = requestUser.getLeagues().get(0);
        User userFromDB = userRepository.findByEmail(requestUser.getEmail());
        User invitedUser = connectUserAndLeague(userFromDB.getId(), league.getId());
        if (requestUser.getPlayers() != null && requestUser.getPlayers().size() > 0)
            invitedUser = connectUserAndPlayer(userFromDB.getId(), requestUser.getPlayers().get(0).getId());
        EmailBuilder emailBuilder = new InviteExistingUserEmail(invitedUser.getEmail(), currentUser, originUrl, league);
        sendEmail(emailBuilder);
        return invitedUser;
    }

    @Override
    public User connectUserAndLeague(String userId, String leagueId) {
        User user = userRepository.findOne(userId);
        League league = leagueRepository.findOne(leagueId);
        user.addLeague(league);
        userRepository.save(user);
        league.addUser(user);
        leagueRepository.save(league);
        return user;
    }

    @Override
    public User connectUserAndPlayer(String userId, String playerId) {
        User user = userRepository.findOne(userId);
        Player player = playerRepository.findOne(playerId);
        user.addPlayer(player);
        userRepository.save(user);
        player.setUser(user);
        playerRepository.save(player);
        return user;
    }

    @Override
    public Player createPlayerForUser(String userId, String leagueId) {
        User currentUser = userRepository.findOne(userId);
        League league = new League(leagueId);
        Player player = new Player(currentUser.getName(), league);
        playerRepository.save(player);
        return player;
    }

    private void sendEmail(EmailBuilder emailBuilder) {
        EmailDirector emailDirector = new EmailDirector();
        emailDirector.setBuilder(emailBuilder);
        Email email = emailDirector.build();
        emailService.send(email);
    }

    private User setUserTimezone(User user, TimeZone timeZone) {
        if (user.getTimezone() == null) {
            user.setTimezone(DateUtils.getTimezoneOffset(timeZone));
        }
        return user;
    }
}
