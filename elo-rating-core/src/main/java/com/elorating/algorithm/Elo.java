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
        float matchResult = getMatchResult(player, opponent);
        double ratingDelta = kFactor * scoreRatio * (matchResult - expectedScore);
        return (int) Math.round(ratingDelta);
    }

    private double calculateScoreRatio() {
        int scoreDifference = Math.abs(match.getScore(match.getPlayerOne()) - match.getScore(match.getPlayerTwo()));
        if (scoreDifference < 2)
            return 1;
        else if (scoreDifference < 3)
            return 1.5;
        else
            return (11.0 + scoreDifference) / 8;
    }

    private float getMatchResult(Player player, Player opponent) {
        int playerScore = match.getScores().get(player.getId());
        int opponentScore = match.getScores().get(opponent.getId());
        if (playerScore > opponentScore)
            return 1;
        else if (playerScore < opponentScore)
            return 0;
        else
            return 0.5f;
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
