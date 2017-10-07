package com.elorating.controller;

import com.elorating.model.League;
import com.elorating.repository.LeagueRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
@Api(value = "Leagues", description = "Leagues API")
public class LeagueController {

    private static final Logger logger = LoggerFactory.getLogger(LeagueController.class);

    @Autowired
    private LeagueRepository repository;

    @CrossOrigin
    @RequestMapping(value = "/leagues/{id}", method = RequestMethod.GET)
    @ApiOperation(value = "Get league", notes = "Return league by league id")
    public ResponseEntity<League> get(@PathVariable String id) {
        League league = repository.findOne(id);
        return new ResponseEntity<>(league, HttpStatus.OK);
    }

    @CrossOrigin
    @RequestMapping(value = "/leagues", method = RequestMethod.GET)
    @ApiOperation(value = "Get leagues list", notes = "Get all leagues list")
    public ResponseEntity<ArrayList<League>> getAllLeagues() {
        ArrayList<League> leaguesList = (ArrayList<League>) repository.findAll();

        if (leaguesList.isEmpty()) {
            logger.error("No leagues found");
            return new ResponseEntity<ArrayList<League>>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<ArrayList<League>>(leaguesList, HttpStatus.OK);
    }

    @CrossOrigin
    @RequestMapping(value = "/leagues/find-by-name", method = RequestMethod.GET)
    @ApiOperation(value = "Find leagues by name",
                notes = "Return leagues list filtered by league name")
    public ResponseEntity<List<League>> findByName(@RequestParam String name) {
        List<League> leagues = repository.findByNameLikeIgnoreCase(name);
        if (leagues.isEmpty()) {
            return new ResponseEntity<List<League>>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<List<League>>(leagues, HttpStatus.OK);
    }

    @CrossOrigin
    @RequestMapping(value = "/leagues", method = RequestMethod.POST)
    @ApiOperation(value = "Create league", notes = "Create new league")
    public ResponseEntity<League> create(@RequestBody League league) {
        League createdLeague = repository.save(league);
        if (createdLeague == null) {
            logger.error("League '" + createdLeague.getName() + "' not created");
            return new ResponseEntity<League>(HttpStatus.UNPROCESSABLE_ENTITY);
        }

        return new ResponseEntity<League>(createdLeague, HttpStatus.OK);
    }

    @CrossOrigin
    @RequestMapping(value = "/leagues/delete/{id}", method = RequestMethod.DELETE)
    @ApiOperation(value = "Delete league", notes = "Delete league by league id")
    public ResponseEntity<League> deleteLeague(@PathVariable("id") String id) {
        repository.delete(id);
        return new ResponseEntity<League>(HttpStatus.OK);
    }


}
