package com.elorating.model;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import java.util.List;

/**
 * Created by pokor on 09.06.2017.
 */
@ApiModel("Player statistics")
public class PlayerStats extends Player {

    @ApiModelProperty("Player wins")
    private int wins;

    @ApiModelProperty("Player loses")
    private int loses;

    public PlayerStats(Player player) {
        this.id = player.id;
        this.username = player.username;
        this.rating = player.rating;
        this.active = player.active;
        this.league = player.league;
        this.wins = 0;
        this.loses = 0;
    }

    public int getWins() {
        return wins;
    }

    public void setWins(int wins) {
        this.wins = wins;
    }

    public int getLoses() {
        return loses;
    }

    public void setLoses(int loses) {
        this.loses = loses;
    }

    public void setStats(List<Match> matches) {
        for (Match match : matches) {
            if (match.isPlayerInMatch(this.id)) {
                if (match.winner().getId().equals(this.id)) {
                    wins++;
                } else {
                    loses++;
                }
            }
        }
    }
}
