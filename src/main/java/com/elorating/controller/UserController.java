package com.elorating.controller;

import com.elorating.model.EmailsNotifications;
import com.elorating.model.Invitation;
import com.elorating.model.Player;
import com.elorating.model.User;
import com.elorating.service.GoogleAuthService;
import com.elorating.service.UserService;
import com.elorating.utils.DateUtils;
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
import java.util.Optional;
import java.util.TimeZone;

@RestController
@RequestMapping("/api")
@Api(value = "users", description = "Users API")
public class UserController {
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private GoogleAuthService googleAuthService;

    @Autowired
    private UserService userService;

    @CrossOrigin
    @RequestMapping(value = "/users/{id}", method = RequestMethod.GET)
    @ApiOperation(value = "Get user", notes = "Get user by id")
    public ResponseEntity<User> get(@PathVariable String id) {
        User user = userService.getById(id).orElse(null);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @CrossOrigin
    @RequestMapping(value = "/users/sign-in", method = RequestMethod.POST)
    @ApiOperation(value = "Sign in", notes = "Verify Google's id token")
    public ResponseEntity<User> signIn(@RequestBody String token, TimeZone timeZone) {
        User userFromGoogle = googleAuthService.getUserFromToken(token);
        if (userFromGoogle != null) {
            User user = userService.checkForPendingInvitation(userFromGoogle);
            if (user == null)
                user = userService.saveOrUpdateUser(userFromGoogle, timeZone);
            return new ResponseEntity<>(user, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @CrossOrigin
    @RequestMapping(value = "/users/emails-notifications", method = RequestMethod.POST)
    @ApiOperation(value = "Update user", notes = "Update user settings")
    public ResponseEntity<User> updateEmailNotifications(@RequestParam("user_id") String id, @RequestBody EmailsNotifications emailsNotifications) {
        User userToUpdate = userService.getById(id).map(user -> {
            user.setEmailNotifications(emailsNotifications);
            return userService.saveOrUpdateUser(user);
        }).orElse(null);
        return new ResponseEntity<>(userToUpdate, HttpStatus.OK);
    }

    @CrossOrigin
    @RequestMapping(value = "/users/verify-security-token", method = RequestMethod.POST)
    @ApiOperation(value = "Verify security token", notes = "Verify security token")
    public ResponseEntity<Boolean> verifySecurityToken(@RequestBody String token) {
        User user = userService.findByInvitationToken(token);
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
            User userFromDB = userService.findByInvitationToken(invitation.getSecurityToken());
            userFromDB.update(userFromGoogle);
            userFromDB.setGoogleId(userFromGoogle.getGoogleId());
            userFromDB.clearInvitationToken();
            userService.save(userFromDB);
            userService.connectUserToLeagueAndPlayer(userFromDB);
            return new ResponseEntity<>(userFromDB, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @CrossOrigin
    @RequestMapping(value = "/leagues/{leagueId}/users/{id}/assign-league", method = RequestMethod.POST)
    @ApiOperation(value = "Assign league", notes = "Assign league to user")
    public ResponseEntity<User> assignLeague(@PathVariable String leagueId,
                                             @PathVariable String id) {
        User user = userService.connectUserAndLeague(id, leagueId);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @CrossOrigin
    @RequestMapping(value = "/users/find-by-name", method = RequestMethod.GET)
    @ApiOperation(value = "Find by name", notes = "Find user by name")
    public ResponseEntity<List<User>> findByName(@RequestParam String name) {
        List<User> users = userService.findByNameLikeIgnoreCase(name);
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @CrossOrigin
    @RequestMapping(value = "/leagues/{leagueId}/users/{id}/create-player", method = RequestMethod.POST)
    @ApiOperation(value = "Create player",
                    notes =  "Create new player and connect it with user")
    public ResponseEntity<User> createPlayer(@PathVariable String leagueId,
                                             @PathVariable String id) {
        Player player = userService.createPlayerForUser(id, leagueId);
        User currentUser = userService.connectUserAndPlayer(id, player.getId());
        return new ResponseEntity<>(currentUser, HttpStatus.OK);
    }

    @CrossOrigin
    @RequestMapping(value = "/leagues/{leagueId}/users/{id}/invite", method = RequestMethod.POST)
    @ApiOperation(value = "Invite user", notes = "Invite user and assign to league")
    public ResponseEntity<User> inviteUser(HttpServletRequest request,
                                           @PathVariable String id,
                                           @RequestBody User requestUser) {
        Optional<User> currentUser = userService.getById(id);
        if (currentUser.isPresent()) {
            String originUrl = request.getHeader("Origin");
            User userFromDB = userService.findByEmail(requestUser.getEmail());
            if (userFromDB == null)
                requestUser = userService.inviteNewUser(currentUser.get().getName(), requestUser, originUrl);
            else
                requestUser = userService.inviteExistingUser(currentUser.get().getName(), requestUser, originUrl);
        }
        return new ResponseEntity<>(requestUser, HttpStatus.OK);
    }

    @CrossOrigin
    @RequestMapping(value = "/users/timezone", method = RequestMethod.POST)
    @ApiOperation(value = "Update user timezone", notes = "Update user timezone")
    public ResponseEntity<User> updateUserTimezone(@RequestParam("user_id") String id, @RequestBody String timezone) {
        if (!DateUtils.validateTimezone(timezone)) {
            return new ResponseEntity<>(HttpStatus.UNPROCESSABLE_ENTITY);
        }
        User user = userService.getById(id).map(userToUpdate -> {
            userToUpdate.setTimezone(timezone);
            return userService.saveOrUpdateUser(userToUpdate);

        }).orElse(null);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
}
