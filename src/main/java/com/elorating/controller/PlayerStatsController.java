package com.elorating.controller;

import com.elorating.model.OpponentStats;
import com.elorating.model.PlayerMatchesStats;
import com.elorating.model.RatingHistory;
import com.elorating.service.PlayerStatsService;
import com.elorating.utils.SortUtils;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api")
@Api(value = "player statistics", description = "Players statistics API")
public class PlayerStatsController {

    @Autowired
    private PlayerStatsService playerStatsService;

    @CrossOrigin
    @RequestMapping(value = "/players/{playerId}/opponents/{opponentId}", method = RequestMethod.GET)
    @ApiOperation(value = "Get player stats against a specific opponent", notes = "Returns player stats for player id against opponent id")
    public ResponseEntity<OpponentStats> getPlayerStatsAgainstOpponent(@PathVariable("playerId") String playerId,
                                                                       @PathVariable("opponentId") String opponentId) {
        OpponentStats opponentStats = playerStatsService.getOpponentStats(playerId, opponentId);
        if (opponentStats == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(opponentStats, HttpStatus.OK);
    }

    @CrossOrigin
    @RequestMapping(value = "/players/{playerId}/opponents", method = RequestMethod.GET)
    @ApiOperation(value = "Get player stats against all opponents", notes = "Returns player stats for player id against all opponents")
    public ResponseEntity<List<OpponentStats>> getPlayerStatsAgainstOpponents(@PathVariable("playerId") String playerId) {
        List<OpponentStats> opponentStats = playerStatsService.getOpponentsStats(playerId);
        if (opponentStats.size() == 0) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(opponentStats, HttpStatus.OK);
    }

    @CrossOrigin
    @RequestMapping(value = "/players/{playerId}/rating-history", method = RequestMethod.GET)
    @ApiOperation(value = "Get player rating history filtered by date",
            notes = "Return list with player's rating history by player id and date")
    public ResponseEntity<List<RatingHistory>> getPlayerRatingHistory(
            @PathVariable String playerId,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date from,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date to) {
        List<RatingHistory> history;
        Sort sort = SortUtils.getSortAscending();
        if (from != null && to != null)
            history = playerStatsService.getRatingHistory(playerId, from, to, sort);
        else if (from != null)
            history = playerStatsService.getRatingHistory(playerId, from, sort);
        else
            history = playerStatsService.getRatingHistory(playerId, sort);

        return new ResponseEntity<>(history, HttpStatus.OK);
    }

    @CrossOrigin
    @RequestMapping(value = "/players/{playerId}/matches-stats", method = RequestMethod.GET)
    @ApiOperation(value = "Get player matches statistics",
            notes = "Return player matches statistics")
    public ResponseEntity<PlayerMatchesStats> getPlayerMatchesStats(@PathVariable String playerId) {
        PlayerMatchesStats statistics = playerStatsService.getPlayerMatchesStats(playerId);
        return new ResponseEntity<>(statistics, HttpStatus.OK);
    }
}
