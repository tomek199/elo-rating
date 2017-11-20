package com.elorating.controller;

import com.elorating.model.Invitation;
import com.elorating.model.League;
import com.elorating.model.Player;
import com.elorating.model.User;
import com.elorating.repository.LeagueRepository;
import com.elorating.repository.PlayerRepository;
import com.elorating.repository.UserRepository;
import com.elorating.service.EmailService;
import com.elorating.service.GoogleAuthService;
import com.elorating.service.email.*;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api")
@Api(value = "users", description = "Users API")
public class UserController {
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LeagueRepository leagueRepository;

    @Autowired
    private PlayerRepository playerRepository;

    @Autowired
    private GoogleAuthService googleAuthService;

    @Autowired
    private EmailService emailService;

    @CrossOrigin
    @RequestMapping(value = "/users/sign-in", method = RequestMethod.POST)
    @ApiOperation(value = "Sign in", notes = "Verify Google's id token")
    public ResponseEntity<User> signIn(@RequestBody String token) {
        User userFromGoogle = googleAuthService.getUserFromToken(token);
        if (userFromGoogle != null) {
            User user = checkForPendingInvitation(userFromGoogle);
            if (user == null)
                user = saveOrUpdateUser(userFromGoogle);
            return new ResponseEntity<>(user, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @CrossOrigin
    @RequestMapping(value = "/users/verify-security-token", method = RequestMethod.POST)
    @ApiOperation(value = "Verify security token", notes = "Verify security token")
    public ResponseEntity<Boolean> verifySecurityToken(@RequestBody String token) {
        User user = userRepository.findByInvitationToken(token);
        Boolean tokenVerified = (user != null);
        return new ResponseEntity<>(tokenVerified, HttpStatus.OK);
    }

    @CrossOrigin
    @RequestMapping(value = "/users/confirm-invitation", method = RequestMethod.POST)
    @ApiOperation(value = "Confirm invitation",
            notes = "Confirm invitation to application, assign user to league and sign in")
    public ResponseEntity<User> confirmInvitation(@RequestBody Invitation invitation) {
        User userFromGoogle = googleAuthService.getUserFromToken(invitation.getGoogleIdToken());
        if (userFromGoogle != null) {
            User userFromDB = userRepository.findByInvitationToken(invitation.getSecurityToken());
            userFromDB.update(userFromGoogle);
            userFromDB.setGoogleId(userFromGoogle.getGoogleId());
            userFromDB.clearInvitationToken();
            userRepository.save(userFromDB);
            connectUserToLeagueAndPlayer(userFromDB);
            return new ResponseEntity<>(userFromDB, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    private User connectUserToLeagueAndPlayer(User user) {
        connectUserToLeague(user);
        if (user.getPlayers() != null && user.getPlayers().size() > 0)
            connectUserToPlayer(user);
        return user;
    }

    private User connectUserToLeague(User user) {
        String leagueId = user.getLeagues().get(0).getId();
        League league = leagueRepository.findOne(leagueId);
        league.getUsers().add(user);
        leagueRepository.save(league);
        return user;
    }

    private User connectUserToPlayer(User user) {
        String playerId = user.getPlayers().get(0).getId();
        Player player = playerRepository.findOne(playerId);
        player.setUser(user);
        playerRepository.save(player);
        return user;
    }

    private User checkForPendingInvitation(User userFromGoogle) {
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

    private User saveOrUpdateUser(User userFromGoogle) {
        User savedUser = userRepository.findByGoogleId(userFromGoogle.getGoogleId());
        if (savedUser != null) {
            savedUser.update(userFromGoogle);
            savedUser = userRepository.save(savedUser);
        } else {
            savedUser = userRepository.save(userFromGoogle);
        }
        return savedUser;
    }

    @CrossOrigin
    @RequestMapping(value = "/users/{id}/assign-league/{leagueId}", method = RequestMethod.POST)
    @ApiOperation(value = "Assign league", notes = "Assign league to user")
    public ResponseEntity<User> assignLeague(@PathVariable String id,
                                             @PathVariable String leagueId) {
        User user = connectUserAndLeague(id, leagueId);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @CrossOrigin
    @RequestMapping(value = "/users/find-by-name", method = RequestMethod.GET)
    @ApiOperation(value = "Find by name", notes = "Find user by name")
    public ResponseEntity<List<User>> findByName(@RequestParam String name) {
        List<User> users = userRepository.findByNameLikeIgnoreCase(name);
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @CrossOrigin
    @RequestMapping(value = "/users/{id}/create-player", method = RequestMethod.POST)
    @ApiOperation(value = "Create player",
                    notes =  "Create new player and connect it with user")
    public ResponseEntity<User> createPlayer(@PathVariable String id,
                                             @RequestBody String leagueId) {
        User currentUser = userRepository.findOne(id);
        League league = new League(leagueId);
        Player player = new Player(currentUser.getName(), league);
        player = playerRepository.save(player);
        currentUser = connectUserAndPlayer(currentUser.getId(), player.getId());
        return new ResponseEntity<>(currentUser, HttpStatus.OK);
    }

    @CrossOrigin
    @RequestMapping(value = "users/{id}/invite-user", method = RequestMethod.POST)
    @ApiOperation(value = "Invite user", notes = "Invite user and assign to league")
    public ResponseEntity<User> inviteUser(HttpServletRequest request,
                                           @PathVariable String id,
                                           @RequestBody User requestUser) {
        User currentUser = userRepository.findOne(id);
        String originUrl = request.getHeader("Origin");
        User userFromDB = userRepository.findByEmail(requestUser.getEmail());
        if (userFromDB == null)
            requestUser = inviteNewUser(currentUser.getName(), requestUser, originUrl);
        else
            requestUser = inviteExistingUser(currentUser.getName(), requestUser, originUrl);
        return new ResponseEntity<>(requestUser, HttpStatus.OK);
    }

    private User inviteNewUser(String currentUser, User userToInvite, String originUrl) {
        String token = UUID.randomUUID().toString();
        userToInvite.setInvitationToken(token);
        userRepository.save(userToInvite);
        EmailBuilder emailBuilder = new InviteNewUserEmail(userToInvite.getEmail(), currentUser, originUrl, token);
        sendEmail(emailBuilder);
        userToInvite.clearInvitationToken();
        return userToInvite;
    }

    private User inviteExistingUser(String currentUser, User requestUser, String originUrl) {
        League league = requestUser.getLeagues().get(0);
        User userFromDB = userRepository.findByEmail(requestUser.getEmail());
        User invitedUser = connectUserAndLeague(userFromDB.getId(), league.getId());
        if (requestUser.getPlayers() != null && requestUser.getPlayers().size() > 0)
            invitedUser = connectUserAndPlayer(userFromDB.getId(), requestUser.getPlayers().get(0).getId());
        EmailBuilder emailBuilder = new InviteExistingUserEmail(invitedUser.getEmail(), currentUser, originUrl, league);
        sendEmail(emailBuilder);
        return invitedUser;
    }

    private User connectUserAndLeague(String userId, String leagueId) {
        User user = userRepository.findOne(userId);
        League league = leagueRepository.findOne(leagueId);
        user.addLeague(league);
        userRepository.save(user);
        league.addUser(user);
        leagueRepository.save(league);
        return user;
    }

    private User connectUserAndPlayer(String userId, String playerId) {
        User user = userRepository.findOne(userId);
        Player player = playerRepository.findOne(playerId);
        user.addPlayer(player);
        userRepository.save(user);
        player.setUser(user);
        playerRepository.save(player);
        return user;
    }

    private void sendEmail(EmailBuilder emailBuilder) {
        EmailDirector emailDirector = new EmailDirector();
        emailDirector.setBuilder(emailBuilder);
        Email email = emailDirector.build();
        emailService.send(email);
    }
}
