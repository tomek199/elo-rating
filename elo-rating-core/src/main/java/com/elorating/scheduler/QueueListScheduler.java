package com.elorating.scheduler;

import com.elorating.model.Match;
import com.elorating.repository.MatchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by pokor on 16.05.2017.
 */
@Component
public class QueueListScheduler {

    private static final Logger logger = LoggerFactory.getLogger(QueueListScheduler.class);

    @Autowired
    private MatchRepository matchRepository;

    @Scheduled(cron = "0 0 23 * * *")
    //@Scheduled(fixedRate = 5000)
    public void removeNotPlayedMatches() {
        logger.info("Remove not finished matches: start");
        List<Match> matches = matchRepository.findByCompletedIsFalse();
        for (Match match : matches) {
            matchRepository.delete(match.getId());
        }
        logger.info("Queues scheduler: stop");
    }
}
