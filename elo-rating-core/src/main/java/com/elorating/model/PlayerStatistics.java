package com.elorating.model;

public class PlayerStatistics {

    private int wins;
    private int looses;

    public int getWins() {
        return wins;
    }

    public int getLooses() {
        return looses;
    }

    public PlayerStatistics() {
        this.wins = 0;
        this.looses = 0;
    }

    public void addWin() {
        wins++;
    }

    public void addLoss() {
        looses++;
    }

    public void setWins(int wins) {
        this.wins = wins;
    }

    public void setLooses(int looses) {
        this.looses = looses;
    }
}
