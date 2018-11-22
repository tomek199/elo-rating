package com.elorating.model;

import java.util.Date;

public class PlayerMatchesStats extends PlayerStats {

    private int setsWon;
    private int setsLost;
    private int maxRating;
    private int minRating;
    private Date maxRatingDate;
    private Date minRatingDate;

    public PlayerMatchesStats() {
        super();
        this.setsWon = 0;
        this.setsLost = 0;
        this.maxRating = 1000;
        this.minRating = 1000;
        this.maxRatingDate = new Date();
        this.minRatingDate = new Date();
    }

    public int getSetsWon() {
        return setsWon;
    }

    public void addSetsWon(int sets) {
        this.setsWon += sets;
    }

    public int getSetsLost() {
        return setsLost;
    }

    public void addSetsLost(int sets) {
        this.setsLost += sets;
    }

    public int getMaxRating() {
        return maxRating;
    }

    public void setMaxRating(int maxRating) {
        this.maxRating = maxRating;
    }

    public int getMinRating() {
        return minRating;
    }

    public void setMinRating(int minRating) {
        this.minRating = minRating;
    }

    public Date getMaxRatingDate() {
        return maxRatingDate;
    }

    public void setMaxRatingDate(Date maxRatingDate) {
        this.maxRatingDate = maxRatingDate;
    }

    public Date getMinRatingDate() {
        return minRatingDate;
    }

    public void setMinRatingDate(Date minRatingDate) {
        this.minRatingDate = minRatingDate;
    }
}
