package com.elorating.model;

public class LeagueSettings {
    private int maxScore;
    private boolean allowDraws;

    public LeagueSettings() {
        this.maxScore = 2;
        this.allowDraws = false;
    }

    public int getMaxScore() {
        return maxScore;
    }

    public void setMaxScore(int maxScore) {
        this.maxScore = maxScore;
    }

    public boolean isAllowDraws() {
        return allowDraws;
    }

    public void setAllowDraws(boolean allowDraws) {
        this.allowDraws = allowDraws;
    }
}
