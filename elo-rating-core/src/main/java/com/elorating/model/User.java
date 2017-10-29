package com.elorating.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class User {
    @Id
    private String id;
    private String googleId;
    private String name;
    private String givenName;
    private String familyName;
    private String email;
    private String pictureUrl;
    private Date lastSignIn;
    private String invitationToken;
    @DBRef(lazy = true)
    @JsonIgnoreProperties("users")
    private List<League> leagues;
    @DBRef(lazy = true)
    @JsonIgnoreProperties({"user"})
    private List<Player> players;

    public User() { }

    public User(String name) {
        this.name = name;
    }

    public User(Payload payload) {
        this.googleId = payload.getSubject();
        this.name = (String) payload.get("name");
        this.givenName = (String) payload.get("given_name");
        this.familyName = (String) payload.get("family_name");
        this.email = payload.getEmail();
        this.pictureUrl = (String) payload.get("picture");
        this.lastSignIn = new Date();
    }

    public User(String name, String email) {
        this(name);
        this.email = email;
    }

    public void update(User user) {
        this.name = user.name;
        this.givenName = user.givenName;
        this.familyName = user.familyName;
        this.email = user.email;
        this.pictureUrl = user.pictureUrl;
        this.lastSignIn = new Date();
    }

    public String getId() {
        return id;
    }

    public String getGoogleId() {
        return this.googleId;
    }

    public String getName() {
        return name;
    }

    public String getGivenName() {
        return givenName;
    }

    public String getFamilyName() {
        return familyName;
    }

    public String getEmail() {
        return email;
    }

    public String getPictureUrl() {
        return pictureUrl;
    }

    public Date getLastSignIn() {
        return lastSignIn;
    }

    public List<League> getLeagues() {
        return leagues;
    }

    public void addLeague(League league) {
        if (leagues == null)
            leagues = new ArrayList<>();
        leagues.add(league);
    }

    public void setGoogleId(String googleId) {
        this.googleId = googleId;
    }

    public List<Player> getPlayers() {
        return players;
    }

    public void addPlayer(Player player) {
        if (players == null)
            players = new ArrayList<>();
        players.add(player);
    }

    public void setInvitationToken(String invitationToken) {
        this.invitationToken = invitationToken;
    }

    public String getInvitationToken() {
        return invitationToken;
    }

    public void clearInvitationToken() {
        invitationToken = null;
    }
}
