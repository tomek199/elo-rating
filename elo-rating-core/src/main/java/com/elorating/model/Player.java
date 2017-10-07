package com.elorating.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;

public class Player {

    @Id
    protected String id;
    protected String username;
    protected int rating;
    protected boolean active;
    @DBRef
    @JsonIgnoreProperties({"users", "players"})
    protected League league;
    @DBRef
    @JsonIgnoreProperties({"leagues", "players"})
    protected User user;

    public Player() {
        this.rating = 1000;
        this.active = true;
    }

    public Player(String username) {
        this();
        this.username = username;
    }

    public Player(String username, League league) {
        this(username);
        this.league = league;
    }

    public Player(String username, League league, int rating) {
        this(username, league);
        this.rating = rating;
    }

    public double getExpectedScore(Player opponent) {
        return 1 / (1 + Math.pow(10, ((double)(opponent.rating - rating)) / 400));
    }

    public int getKFactor() {
        if (rating < 2100) {
            return 32;
        } else if (rating >= 2100 && rating <= 2400) {
            return 24;
        } else {
            return 16;
        }
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public League getLeague() {
        return league;
    }

    public void setLeague(League league) {
        this.league = league;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
