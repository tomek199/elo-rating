package com.elorating.scheduler;

import com.elorating.model.League;
import com.elorating.service.LeagueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class LeagueScheduler {

    @Autowired
    private LeagueService leagueService;

    @Scheduled(cron = "0 5 23 * * *")
    public void removeUnassignedLeagues() {
        List<League> leaguesToRemove = leagueService.findUnassignedLeagues();
        for (League league : leaguesToRemove) {
            String leagueId = league.getId();
            leagueService.deleteById(leagueId);
        }
    }
}
