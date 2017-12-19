package com.elorating.controller;

import com.elorating.model.League;
import com.elorating.model.Match;
import com.elorating.service.MatchService;
import com.elorating.service.PlayerService;
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

import java.util.List;

@RestController
@RequestMapping("/api")
@Api(value = "Matches", description = "Matches API")
public class MatchController {

    @Autowired
    private MatchService matchService;

    @Autowired
    private PlayerService playerService;

    @CrossOrigin
    @RequestMapping(value = "/matches/{matchId}", method = RequestMethod.GET)
    @ApiOperation(value = "Get match", notes = "Return match by match id")
    public ResponseEntity<Match> getMatch(@PathVariable("matchId") String matchId) {
        Match match = matchService.getById(matchId);
        return new ResponseEntity<Match>(match, HttpStatus.OK);
    }

    @CrossOrigin
    @RequestMapping(value = "/leagues/{leagueId}/matches", method = RequestMethod.GET)
    @ApiOperation(value = "Get matches list", notes = "Return all matches list by league id")
    public ResponseEntity<List<Match>> get(@PathVariable String leagueId) {
        Sort sortByDate = SortUtils.getSortDescending();
        List<Match> matches = ((MatchService) matchService).findByLeagueId(leagueId, sortByDate);
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
        Page<Match> matches = ((MatchService) matchService).findByLeagueIdAndCompletedIsTrue(leagueId, pageRequest);
        return new ResponseEntity<>(matches, HttpStatus.OK);
    }

    @CrossOrigin
    @RequestMapping(value = "/leagues/{leagueId}/scheduled-matches", method = RequestMethod.GET)
    @ApiOperation(value = "Get scheduled matches page",
                notes = "Return page with scheduled matches")
    public ResponseEntity<List<Match>> getScheduled(@PathVariable String leagueId,
                                                    @RequestParam(required = false) String sort) {
        Sort sortByDate = SortUtils.getSort(sort);
        List<Match> matches = ((MatchService) matchService).findByLeagueIdAndCompletedIsFalse(leagueId, sortByDate);
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
        List<Match> matches = ((MatchService)matchService).rescheduleMatchesInLeague(leagueId, minutes, sortByDate);
        return new ResponseEntity<List<Match>>(matches, HttpStatus.OK);
    }


    @CrossOrigin
    @RequestMapping(value = "/leagues/{leagueId}/matches", method = RequestMethod.POST)
    @ApiOperation(value = "Create match", notes = "Create new match")
    public ResponseEntity<Match> save(@PathVariable String leagueId, @RequestBody Match match) {
        match.setLeague(new League(leagueId));
        if (match.isCompleted()) {
            match = matchService.saveMatchWithPlayers(match);
        }
        else {
            match = matchService.save(match);
        }
        return new ResponseEntity<Match>(match, HttpStatus.OK);
    }

    @CrossOrigin
    @RequestMapping(value = "/leagues/{leagueId}/matches/{id}", method = RequestMethod.DELETE)
    @ApiOperation(value = "Delete match", notes = "Delete match by match id")
    public ResponseEntity<Match> delete(@PathVariable String id) {
        matchService.deleteById(id);
        return new ResponseEntity<Match>(HttpStatus.OK);
    }

    @CrossOrigin
    @RequestMapping(value = "/leagues/{leagueId}/matches/{id}/revert", method = RequestMethod.POST)
    @ApiOperation(value = "Revert match",
                notes = "Delete match and revert players rating to previous state")
    public ResponseEntity<Match> revert(@PathVariable String id) {
        Match match = matchService.getById(id);
        if (matchService.restorePlayers(match))
            matchService.deleteById(match.getId());
        return new ResponseEntity<>(match, HttpStatus.OK);
    }
}
