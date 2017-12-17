package com.elorating.scheduler;

import com.elorating.model.League;
import com.elorating.repository.LeagueRepository;
import com.elorating.repository.MatchRepository;
import com.elorating.repository.PlayerRepository;
import com.elorating.service.GenericService;
import com.elorating.service.LeagueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class LeagueScheduler {

    @Autowired
    private MatchRepository matchRepository;

    @Autowired
    private PlayerRepository playerRepository;

    @Autowired
    private GenericService<League> leagueService;

    @Scheduled(cron = "0 5 23 * * *")
    public void removeUnassignedLeagues() {
        List<League> leaguesToRemove = ((LeagueService) leagueService).findUnassignedLeagues();
        for (League league : leaguesToRemove) {
            String leagueId = league.getId();
            matchRepository.deleteByLeagueId(leagueId);
            playerRepository.deleteByLeagueId(leagueId);
            leagueService.deleteById(leagueId);
        }
    }
}
