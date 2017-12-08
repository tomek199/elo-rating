package com.elorating.controller;

import com.elorating.algorithm.Elo;
import com.elorating.model.League;
import com.elorating.model.Match;
import com.elorating.model.Player;
import com.elorating.repository.MatchRepository;
import com.elorating.repository.PlayerRepository;
import com.elorating.service.MatchService;
import com.elorating.utils.SortUtils;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api")
@Api(value = "Matches", description = "Matches API")
public class MatchController {

    @Autowired
    private MatchRepository matchRepository;

    @Autowired
    private PlayerRepository playerRepository;

    @Autowired
    private MatchService matchService;

    @CrossOrigin
    @RequestMapping(value = "/matches/{matchId}", method = RequestMethod.GET)
    @ApiOperation(value = "Get match", notes = "Return match by match id")
    public ResponseEntity<Match> getMatch(@PathVariable("matchId") String matchId) {
        Match match = matchRepository.findOne(matchId);
        return new ResponseEntity<Match>(match, HttpStatus.OK);
    }

    @CrossOrigin
    @RequestMapping(value = "/leagues/{leagueId}/matches", method = RequestMethod.GET)
    @ApiOperation(value = "Get matches list", notes = "Return all matches list by league id")
    public ResponseEntity<List<Match>> get(@PathVariable String leagueId) {
        Sort sortByDate = SortUtils.getSortDescending();
        List<Match> matches = matchRepository.findByLeagueId(leagueId, sortByDate);
        return new ResponseEntity<List<Match>>(matches, HttpStatus.OK);
    }

    @CrossOrigin
    @RequestMapping(value = "/leagues/{leagueId}/completed-matches", method = RequestMethod.GET)
    @ApiOperation(value = "Get completed matches page",
                notes = "Return page with completed matches")
    public ResponseEntity<Page<Match>> getCompleted(@PathVariable String leagueId,
                                                    @RequestParam int page,
                                                    @RequestParam(defaultValue = "10") int pageSize,
                                                    @RequestParam(required = false) String sort) {
        Sort sortByDate = SortUtils.getSort(sort);
        PageRequest pageRequest = new PageRequest(page, pageSize, sortByDate);
        Page<Match> matches = matchRepository.findByLeagueIdAndCompletedIsTrue(leagueId, pageRequest);
        return new ResponseEntity<>(matches, HttpStatus.OK);
    }

    @CrossOrigin
    @RequestMapping(value = "/leagues/{leagueId}/scheduled-matches", method = RequestMethod.GET)
    @ApiOperation(value = "Get scheduled matches page",
                notes = "Return page with scheduled matches")
    public ResponseEntity<List<Match>> getScheduled(@PathVariable String leagueId,
                                                    @RequestParam(required = false) String sort) {
        Sort sortByDate = SortUtils.getSort(sort);
        List<Match> matches = matchRepository.findByLeagueIdAndCompletedIsFalse(leagueId, sortByDate);
        return new ResponseEntity<List<Match>>(matches, HttpStatus.OK);
    }

    @CrossOrigin
    @RequestMapping(value = "/league/{leagueId}/reschedule-matches/{minutes}", method = RequestMethod.POST)
    @ApiOperation(value = "Reschedule scheduled matches by {minutes} defined in request",
        notes = "Return page with rescheduled matches")
    public ResponseEntity<List<Match>> rescheduleMatches(@PathVariable String leagueId,
                                                         @PathVariable int minutes,
                                                         @RequestParam(required = false) String sort) {
        Sort sortByDate = SortUtils.getSort(sort);
        List<Match> matches = matchService.rescheduleMatchesInLeague(leagueId, minutes, sortByDate);
        return new ResponseEntity<List<Match>>(matches, HttpStatus.OK);
    }


    @CrossOrigin
    @RequestMapping(value = "/leagues/{leagueId}/matches", method = RequestMethod.POST)
    @ApiOperation(value = "Create match", notes = "Create new match")
    public ResponseEntity<Match> create(@PathVariable String leagueId, @RequestBody Match match) {
        match.setLeague(new League(leagueId));
        if (match.isCompleted()) {
            match.setDate(new Date());
            match = saveMatchWithRatings(match);
        }
        else {
            match = matchRepository.save(match);
        }
        return new ResponseEntity<Match>(match, HttpStatus.OK);
    }

    private Match saveMatchWithRatings(Match match) {
        Elo elo = new Elo(match);
        match.getPlayerOne().setRating(elo.getPlayerOneRating());
        match.getPlayerTwo().setRating(elo.getPlayerTwoRating());
        match.setRatingDelta(elo.getMatch().getRatingDelta());
        updatePlayerRating(match.getPlayerOne());
        updatePlayerRating(match.getPlayerTwo());
        match.setCompleted();
        return matchRepository.save(match);
    }

    private void updatePlayerRating(Player player) {
        Player playerToUpdate = playerRepository.findOne(player.getId());
        playerToUpdate.setRating(player.getRating());
        playerRepository.save(playerToUpdate);
    }

    @CrossOrigin
    @RequestMapping(value = "/leagues/{leagueId}/matches/{id}", method = RequestMethod.DELETE)
    @ApiOperation(value = "Delete match", notes = "Delete match by match id")
    public ResponseEntity<Match> delete(@PathVariable String id) {
        matchRepository.delete(id);
        return new ResponseEntity<Match>(HttpStatus.OK);
    }

    @CrossOrigin
    @RequestMapping(value = "/leagues/{leagueId}/matches/{id}/revert", method = RequestMethod.POST)
    @ApiOperation(value = "Revert match",
                notes = "Delete match and revert players rating to previous state")
    public ResponseEntity<Match> revert(@PathVariable String id) {
        Match match = matchRepository.findOne(id);
        if (restorePlayersRatings(match))
            matchRepository.delete(match.getId());
        return new ResponseEntity<>(match, HttpStatus.OK);
    }

    private boolean restorePlayersRatings(Match match) {
        if (match.getPlayerOne() != null && match.getPlayerTwo() != null) {
            match.restorePlayersRating();
            updatePlayerRating(match.getPlayerOne());
            updatePlayerRating(match.getPlayerTwo());
            return true;
        } else {
            return false;
        }
    }
}
