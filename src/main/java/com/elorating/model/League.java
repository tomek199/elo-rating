package com.elorating.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.util.ArrayList;
import java.util.List;

public class League {

    @Id
    private String id;

    private String name;

    @DBRef(lazy = true)
    @JsonIgnoreProperties({"leagues", "player"})
    private List<User> users;

    private LeagueSettings settings;

    public League() {
        this.settings = new LeagueSettings();
    }

    public League(String id) {
        this();
        this.id = id;
    }

    public League(String id, String name) {
        this(id);
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<User> getUsers() {
        return users;
    }

    public void addUser(User user) {
        if (users == null)
            users = new ArrayList<>();
        users.add(user);
    }

    public boolean isAssigned() {
        return users != null && users.size() > 0;
    }

    public LeagueSettings getSettings() {
        return settings;
    }

    public void setSettings(LeagueSettings settings) {
        this.settings = settings;
    }
}
