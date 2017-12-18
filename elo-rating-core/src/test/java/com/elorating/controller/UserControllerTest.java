package com.elorating.controller;

import com.elorating.model.League;
import com.elorating.model.Player;
import com.elorating.model.User;
import com.elorating.repository.PlayerRepository;
import com.elorating.repository.UserRepository;
import org.hamcrest.Matchers;
import org.junit.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.UUID;

import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.isEmptyOrNullString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

public class UserControllerTest extends BaseControllerTest {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PlayerRepository playerRepository;

    @Before
    public void setUp() throws Exception {
        mockMvc = webAppContextSetup(webApplicationContext).build();
        this.league = leagueRepository.save(new League(null, "Test league"));
    }

    @After
    public void tearDown() throws Exception {
        userRepository.deleteAll();
        playerRepository.deleteAll();
        leagueRepository.deleteAll();
    }

    @Ignore
    @Test
    public void testSignIn() throws Exception {
        // TODO mock GoogleIdTokenVerifier to return fake User
        String token = "example_token";
        mockMvc.perform(post("/users/sign-in")
                .contentType(contentType)
                .content(token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email", Matchers.is("test@mail.com")));
    }

    @Test
    public void testAssignLeague() throws Exception {
        User user = new User("Test user");
        user.addLeague(league);
        userRepository.save(user);
        League leagueToAssign = leagueRepository.save(new League(null, "To assign"));
        String url = "/api/leagues/" + leagueToAssign.getId() + "/users/" + user.getId() + "/assign-league/";
        mockMvc.perform(post(url)
                .contentType(contentType))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.leagues", Matchers.hasSize(2)));
        League updatedLeague = leagueRepository.findOne(leagueToAssign.getId());
        Assert.assertTrue(updatedLeague.getUsers().size() == 1);
    }

    @Test
    public void testInviteNewUser() throws Exception {
        User user = userRepository.save(new User("User who invite"));
        User userToInvite = new User("User to invite", "t.morek@gmail.com");
        userToInvite.addLeague(league);
        String url = "/api/leagues/" + league.getId() + "/users/" + user.getId() + "/invite";
        mockMvc.perform(post(url)
                .contentType(contentType)
                .header("Origin", "http://elo.com")
                .content(objectMapper.writeValueAsString(userToInvite)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").exists())
                .andExpect(jsonPath("$.email", is(userToInvite.getEmail())))
                .andExpect(jsonPath("$.googleId", isEmptyOrNullString()))
                .andExpect(jsonPath("$.invitationToken", isEmptyOrNullString()))
                .andExpect(jsonPath("$.leagues", Matchers.hasSize(1)));
    }

    @Test
    public void testInviteExistingUser() throws Exception {
        User user = userRepository.save(new User("User who invite"));
        User userToInvite = userRepository.save(new User("User to invite", "t.morek@gmail.com"));
        userToInvite.addLeague(league);
        String url = "/api/leagues/" + league.getId() + "/users/" + user.getId() + "/invite";
        mockMvc.perform(post(url)
                .contentType(contentType)
                .header("Origin", "http://elo.com")
                .content(objectMapper.writeValueAsString(userToInvite)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(userToInvite.getId())))
                .andExpect(jsonPath("$.email", is(userToInvite.getEmail())))
                .andExpect(jsonPath("$.leagues[0].id", is(league.getId())));
        League updatedLeague = leagueRepository.findOne(league.getId());
        Assert.assertEquals(updatedLeague.getUsers().size(), 1);
    }

    @Test
    public void testInviteNewUserWithPlayer() throws Exception {
        User user = userRepository.save(new User("User who invite"));
        User userToInvite = new User("User to invite", "t.morek@gmail.com");
        Player player = playerRepository.save(new Player("Player to connect", league));
        userToInvite.addPlayer(player);
        userToInvite.addLeague(league);
        String url = "/api/leagues/" + league.getId() + "/users/" + user.getId() + "/invite";
        mockMvc.perform(post(url)
                .contentType(contentType)
                .header("Origin", "http://elo.com")
                .content(objectMapper.writeValueAsString(userToInvite)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").exists())
                .andExpect(jsonPath("$.email", is(userToInvite.getEmail())))
                .andExpect(jsonPath("$.googleId", isEmptyOrNullString()))
                .andExpect(jsonPath("$.invitationToken", isEmptyOrNullString()))
                .andExpect(jsonPath("$.leagues", Matchers.hasSize(1)))
                .andExpect(jsonPath("$.players[0].id", is(player.getId())));
    }

    @Test
    public void testInviteExistingUserWithPlayer() throws Exception {
        User user = userRepository.save(new User("User who invite"));
        User userToInvite = userRepository.save(new User("User to invite", "t.morek@gmail.com"));
        Player player = playerRepository.save(new Player("Player to connect", league));
        userToInvite.addPlayer(player);
        userToInvite.addLeague(league);
        String url = "/api/leagues/" + league.getId() + "/users/" + user.getId() + "/invite";
        mockMvc.perform(post(url)
                .contentType(contentType)
                .header("Origin", "http://elo.com")
                .content(objectMapper.writeValueAsString(userToInvite)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(userToInvite.getId())))
                .andExpect(jsonPath("$.email", is(userToInvite.getEmail())))
                .andExpect(jsonPath("$.leagues[0].id", is(league.getId())))
                .andExpect(jsonPath("$.players[0].id", is(player.getId())));
        League updatedLeague = leagueRepository.findOne(league.getId());
        Player updatedPlayer = playerRepository.findOne(player.getId());
        Assert.assertEquals(updatedLeague.getUsers().size(), 1);
        Assert.assertEquals(updatedPlayer.getUser().getId(), userToInvite.getId());
    }

    @Test
    public void testFindByUsername() throws Exception {
        userRepository.save(new User("Name111"));
        userRepository.save(new User("name112"));
        userRepository.save(new User("name222"));
        String url = "/api/users/find-by-name" + "?name=name1";
        mockMvc.perform(get(url)
                .contentType(contentType))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", Matchers.hasSize(2)));
    }

    @Test
    public void testFindByUsernameEmptyResult() throws Exception {
        userRepository.save(new User("user123"));
        String url = "/api/users/find-by-name" + "?name=name";
        mockMvc.perform(get(url)
                .contentType(contentType))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", Matchers.hasSize(0)));
    }

    @Test
    public void testVerifySecurityToken() throws Exception {
        String token = UUID.randomUUID().toString();
        User user = new User();
        user.setInvitationToken(token);
        userRepository.save(user);
        String url = "/api/users/verify-security-token";
        mockMvc.perform(post(url)
                .contentType(contentType)
                .content(token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is(true)));
        mockMvc.perform(post(url)
                .contentType(contentType)
                .content("fake_token"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is(false)));
    }

    @Test
    public void testCreatePlayer() throws Exception {
        User user = userRepository.save(new User("Test user"));
        String url = "/api/leagues/" + league.getId() + "/users/" + user.getId() + "/create-player";
        mockMvc.perform(post(url)
                .contentType(contentType)
                .content(league.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.players[0].username", is(user.getName())))
                .andExpect(jsonPath("$.players[0].rating", is(1000)));
    }
}