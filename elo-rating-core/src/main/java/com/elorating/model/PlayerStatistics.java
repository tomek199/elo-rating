package com.elorating.model;

public class PlayerStatistics {

    private int won;
    private int lost;

    public int getWon() {
        return won;
    }

    public int getLost() {
        return lost;
    }

    public PlayerStatistics() {
        this.won = 0;
        this.lost = 0;
    }

    public void addWon() {
        won++;
    }

    public void addLost() {
        lost++;
    }

    public void setWon(int won) {
        this.won = won;
    }

    public void setLost(int lost) {
        this.lost = lost;
    }
}
