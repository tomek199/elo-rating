package com.elorating.model;

import io.swagger.annotations.ApiModel;

import java.util.List;

@ApiModel("Player's opponent statistics")
public class OpponentStats extends PlayerStats {

    private String id;
    private Player player;
    private Player opponent;
    private int pointsGained;
    private int streak;

    public OpponentStats(Player player, Player opponent) {
        super();
        this.player = player;
        this.opponent = opponent;
    }

    public void setStats(List<Match> matches) {
        streak = 0;
        boolean stopStreak = false;
        for (Match match : matches) {
            if (match.isDraw()) {
                draw++;
                stopStreak = true;
            } else if (this.player.getId().equals(match.getWinnerId())) {
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

    public int getStreak() {
        return streak;
    }

    public void setStreak(int streak) {
        this.streak = streak;
    }

    public int getTotal() {
        return this.won + this.lost;
    }
}
