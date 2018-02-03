package com.elorating.controller;

import com.elorating.model.OpponentStats;
import com.elorating.model.Player;
import com.elorating.service.PlayerService;
import com.elorating.service.PlayerStatsService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
@Api(value = "player statistics", description = "Players statistics API")
public class PlayerStatsController {

    @Autowired
    private PlayerService playerService;

    @Autowired
    private PlayerStatsService playerStatsService;

    @CrossOrigin
    @RequestMapping(value = "/players/{playerId}/opponents/{opponentId}", method = RequestMethod.GET)
    @ApiOperation(value = "Get player stats against a specific opponent", notes = "Returns player stats for player id against opponent id")
    public ResponseEntity<OpponentStats> getPlayerStatsAgainstOpponent(@PathVariable("playerId") String playerId,
                                                                       @PathVariable("opponentId") String opponentId) {
        OpponentStats opponentStats = playerStatsService.getOpponentStats(playerId, opponentId);

        if (opponentStats == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(opponentStats, HttpStatus.OK);
    }

    @CrossOrigin
    @RequestMapping(value = "/players/{playerId}/opponents", method = RequestMethod.GET)
    @ApiOperation(value = "Get player stats against all opponents", notes = "Returns player stats for player id against all opponents")
    public ResponseEntity<List<OpponentStats>> getPlayerStatsAgainstOpponents(@PathVariable("playerId") String playerId) {
        Player player = playerService.getById(playerId);
        List<Player> opponents = playerService.findByLeagueId(player.getLeague().getId());

        ArrayList<OpponentStats> opponentStatsList = new ArrayList<>(opponents.size());
        for (Player opponent : opponents) {
            if (!opponent.getId().equals(player.getId())) {
                opponentStatsList.add(playerStatsService.getOpponentStats(playerId, opponent.getId()));
            }
        }

        return new ResponseEntity<>(opponentStatsList, HttpStatus.OK);
    }
}
