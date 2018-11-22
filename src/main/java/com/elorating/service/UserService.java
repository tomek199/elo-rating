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
import java.util.Optional;
import java.util.TimeZone;
import java.util.UUID;

@Service
public class UserService implements RepositoryService<User> {

    @Resource
    private LeagueRepository leagueRepository;

    @Resource
    private UserRepository userRepository;

    @Resource
    private PlayerRepository playerRepository;

    @Resource
    private EmailService emailService;

    @Override
    public Optional<User> getById(String id) {
        return userRepository.findById(id);
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
        return userRepository.saveAll(users);
    }

    @Override
    public void deleteById(String id) {
        userRepository.deleteById(id);
    }

    @Override
    public void deleteAll() {
        userRepository.deleteAll();
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User findByInvitationToken(String token) {
        return userRepository.findByInvitationToken(token);
    }

    public List<User> findByNameLikeIgnoreCase(String name) {
        return userRepository.findByNameLikeIgnoreCase(name);
    }

    public User connectUserToLeagueAndPlayer(User user) {
        connectUserToLeague(user);
        if (user.getPlayers() != null && user.getPlayers().size() > 0)
            connectUserToPlayer(user);
        return user;
    }

    public User connectUserToLeague(User user) {
        String leagueId = user.getLeagues().get(0).getId();
        leagueRepository.findById(leagueId).ifPresent(league -> {
            league.getUsers().add(user);
            leagueRepository.save(league);
        });
        return user;
    }

    public User connectUserToPlayer(User user) {
        String playerId = user.getPlayers().get(0).getId();
        playerRepository.findById(playerId).ifPresent(player -> {
            player.setUser(user);
            playerRepository.save(player);
        });
        return user;
    }

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

    public User inviteNewUser(String currentUser, User userToInvite, String originUrl) {
        String token = UUID.randomUUID().toString();
        userToInvite.setInvitationToken(token);
        userRepository.save(userToInvite);
        EmailBuilder emailBuilder = new InviteNewUserEmail(userToInvite.getEmail(), currentUser, originUrl, token);
        sendEmail(emailBuilder);
        userToInvite.clearInvitationToken();
        return userToInvite;
    }

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

    public User connectUserAndLeague(String userId, String leagueId) {
        Optional<User> user = userRepository.findById(userId);
        Optional<League> league = leagueRepository.findById(leagueId);
        if (user.isPresent() && league.isPresent()) {
            user.get().addLeague(league.get());
            userRepository.save(user.get());
            league.get().addUser(user.get());
            leagueRepository.save(league.get());
        }
        return user.orElse(null);
    }

    public User connectUserAndPlayer(String userId, String playerId) {
        Optional<User> user = userRepository.findById(userId);
        Optional<Player> player = playerRepository.findById(playerId);
        if (user.isPresent() && player.isPresent()) {
            user.get().addPlayer(player.get());
            userRepository.save(user.get());
            player.get().setUser(user.get());
            playerRepository.save(player.get());
        }
        return user.orElse(null);
    }

    public Player createPlayerForUser(String userId, String leagueId) {
        return userRepository.findById(userId).map(currentUser -> {
            League league = new League(leagueId);
            Player player = new Player(currentUser.getName(), league);
            playerRepository.save(player);
            return player;
        }).orElse(null);
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
