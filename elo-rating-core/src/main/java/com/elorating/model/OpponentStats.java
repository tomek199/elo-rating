package com.elorating.model;

import io.swagger.annotations.ApiModel;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.util.List;

//TODO: extend PlayerStats?
@ApiModel("Player's opponent statistics")
public class OpponentStats {

    @Id
    private String id;

    @DBRef
    private Player player;

    @DBRef
    private Player opponent;

    private int won;

    private int lost;

    private int pointsGained;

    private int streak;

    public OpponentStats(Player player, Player opponent) {
        this.player = player;
        this.opponent = opponent;
    }

    public int getPointsGained() {
        return pointsGained;
    }

    public void setPointsGained(int pointsGained) {
        this.pointsGained = pointsGained;
    }

    public Player getPlayer() {
        return player;
    }

    public Player getOpponent() {
        return opponent;
    }

    public int getWon() {
        return won;
    }

    public void setWon(int won) {
        this.won = won;
    }

    public int getLost() {
        return lost;
    }

    public void setLost(int lost) {
        this.lost = lost;
    }

    public int getStreak() {
        return streak;
    }

    public void setStreak(int streak) {
        this.streak = streak;
    }

    public int getTotal() {
        return this.won + this.lost;
    }

    public void setStats(List<Match> matches) {
        streak = 0;
        boolean stopStreak = false;
        for (Match match : matches) {
            if (match.isPlayerInMatch(this.player.getId())) {
                if (match.getWinnerId().equals(this.player.getId())) {
                    won++;
                    if (!stopStreak) {
                        if (streak >= 0) streak++;
                        else stopStreak = true;
                    }
                } else {
                    lost++;
                    if (!stopStreak) {
                        if (streak <= 0) streak--;
                        else stopStreak = true;
                    }
                }
                pointsGained += match.getRatingDelta(player);
            }
        }
    }
}
