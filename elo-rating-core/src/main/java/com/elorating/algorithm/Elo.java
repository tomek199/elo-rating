package com.elorating.algorithm;

import com.elorating.model.Match;
import com.elorating.model.Player;

public class Elo {
    private Match match;

    public Elo(Match match) {
        this.match = match;
        calculateRatings();
    }

    private void calculateRatings() {
        int delta = calculateRatingDelta(match.getPlayerOne(), match.getPlayerTwo());
        this.match.updateRatingsWithDelta(delta);
    }

    private int calculateRatingDelta(Player player, Player opponent) {
        double expectedScore = player.getExpectedScore(opponent);
        double kFactor = player.getKFactor();
        double scoreRatio = calculateScoreRatio();
        int matchResult = isWinner(player);
        double ratingDelta = kFactor * scoreRatio * (matchResult - expectedScore);
        return (int) Math.round(ratingDelta);
    }

    private double calculateScoreRatio() {
        int scoreSum = match.getScore(match.getPlayerOne()) + match.getScore(match.getPlayerTwo());
        return -0.5 * scoreSum + 2.5;
    }

    private int isWinner(Player player) {
        if (match.getScores().get(player.getId()).equals(2))
            return 1;
        else
            return 0;
    }

    public int getPlayerOneRating() {
        return match.getRating(match.getPlayerOne());
    }

    public int getPlayerTwoRating() {
        return match.getRating(match.getPlayerTwo());
    }

    public Match getMatch() {
        return match;
    }
}
