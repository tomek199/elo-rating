package com.elorating.controller;

import com.elorating.model.*;
import com.elorating.repository.MatchRepository;
import com.elorating.repository.PlayerRepository;
import com.elorating.service.PlayerStatsService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
@Api(value = "players", description = "Players API")
public class PlayerController {

    @Autowired
    private PlayerRepository playerRepository;

    @Autowired
    private MatchRepository matchRepository;

    @Autowired
    private PlayerStatsService playerStatsService;

    @CrossOrigin
    @RequestMapping(value = "/leagues/{leagueId}/players", method = RequestMethod.GET)
    @ApiOperation(value = "Get players list", notes = "Return players list by league id")
    public ResponseEntity<List<Player>> get(@PathVariable String leagueId) {
        List<Player> player = playerRepository.findByLeagueId(leagueId);
        return new ResponseEntity<>(player, HttpStatus.OK);
    }

    @CrossOrigin
    @RequestMapping(value = "/players/{id}", method = RequestMethod.GET)
    @ApiOperation(value = "Get player", notes = "Return player by player id")
    public ResponseEntity<Player> getById(@PathVariable String id) {
        Player player = playerRepository.findOne(id);
        return new ResponseEntity<>(player, HttpStatus.OK);
    }

    @CrossOrigin
    @RequestMapping(value = "/leagues/{leagueId}/players/ranking", method = RequestMethod.GET)
    @ApiOperation(value = "Get players ranking", notes = "Return active players list by league id")
    public ResponseEntity<List<Player>> getRanking(@PathVariable String leagueId) {
        Sort sortByRating = new Sort(Sort.Direction.DESC, "rating");
        List<Player> ranking = playerRepository.getRanking(leagueId, sortByRating);
        return new ResponseEntity<>(ranking, HttpStatus.OK);
    }

    @CrossOrigin
    @RequestMapping(value = "/leagues/{leagueId}/players", method = RequestMethod.POST)
    @ApiOperation(value = "Create player", notes = "Create player")
    public ResponseEntity<Player> create(@PathVariable String leagueId, @RequestBody Player player) {
        player.setLeague(new League(leagueId));
        player = playerRepository.save(player);
        return new ResponseEntity<>(player, HttpStatus.OK);
    }

    @CrossOrigin
    @RequestMapping(value = "/players/{id}", method = RequestMethod.PUT)
    @ApiOperation(value = "Edit player", notes = "Edit player by player id")
    public ResponseEntity<Player> edit(@PathVariable String id, @RequestBody Player player) {
        Player currentPlayer = playerRepository.findOne(id);
        player.setLeague(currentPlayer.getLeague());
        player = playerRepository.save(player);
        return new ResponseEntity<>(player, HttpStatus.OK);
    }

    @CrossOrigin
    @RequestMapping(value = "/players/{id}", method = RequestMethod.DELETE)
    @ApiOperation(value = "Remove player", notes = "Remove player by player id")
    public ResponseEntity<Player> delete(@PathVariable String id) {
        removePlayerFromMatches(id);
        playerRepository.delete(id);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    private void removePlayerFromMatches(String playerId) {
        List<Match> matches = matchRepository.findByPlayerId(playerId);
        for (Match match : matches) {
            match.removePlayerId(playerId);
        }

        matchRepository.save(matches);
    }

    @CrossOrigin
    @RequestMapping(value = "/leagues/{leagueId}/players/find-by-username", method = RequestMethod.GET)
    @ApiOperation(value = "Find by username", notes = "Find player by username and league")
    public ResponseEntity<List<Player>> findByUsernameAndLeague(@PathVariable String leagueId,
                                                                @RequestParam String username) {
        List<Player> players = playerRepository.findByLeagueIdAndUsernameLikeIgnoreCase(leagueId, username);
        return new ResponseEntity<>(players, HttpStatus.OK);
    }

    @CrossOrigin
    @RequestMapping(value = "/leagues/{leagueId}/players/ranking/stats", method = RequestMethod.GET)
    @ApiOperation(value = "Get players stats", notes = "Returns active players stats list by league id")
    public ResponseEntity<List<PlayerStats>> getPlayersStats(@PathVariable("leagueId") String leagueId) {
        List<PlayerStats> playerStatsList = playerStatsService.getAllPlayerStatsByLeague(leagueId);

        if (playerStatsList == null || playerStatsList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(playerStatsList, HttpStatus.OK);
    }

    @CrossOrigin
    @RequestMapping(value = "/players/{playerId}/stats", method = RequestMethod.GET)
    @ApiOperation(value = "Get player stats", notes = "Returns player stats for player id")
    public ResponseEntity<PlayerStats> getPlayerStats(@PathVariable("playerId") String playerId) {
        PlayerStats playerStats = playerStatsService.getPlayerStats(playerId);

        if (playerStats == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(playerStats, HttpStatus.OK);
    }

    @CrossOrigin
    @RequestMapping(value = "/players/{playerId}/opponents/{opponentId}", method = RequestMethod.GET)
    @ApiOperation(value = "Get player stats against a specific opponent", notes = "Returns player stats for player id against opponent id")
    public ResponseEntity<OpponentStats> getPlayerStatsAgainstOpponent(@PathVariable("playerId") String playerId, @PathVariable("opponentId") String opponentId) {
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
        Player player = playerRepository.findOne(playerId);
        List<Player> opponents = playerRepository.findByLeagueId(player.getLeague().getId());

        ArrayList<OpponentStats> opponentStatsList = new ArrayList<>(opponents.size());
        for (Player opponent : opponents) {
            if (!opponent.getId().equals(player.getId())) {
                opponentStatsList.add(playerStatsService.getOpponentStats(playerId, opponent.getId()));
            }
        }

        return new ResponseEntity<>(opponentStatsList, HttpStatus.OK);
    }
}
