package com.elorating.service;

import com.elorating.model.League;
import com.elorating.model.Match;
import com.elorating.model.Player;
import com.elorating.repository.LeagueRepository;
import com.elorating.repository.MatchRepository;
import com.elorating.repository.PlayerRepository;
import com.elorating.utils.DateUtils;
import com.elorating.utils.PlayerTestUtils;
import com.elorating.utils.SortUtils;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class MatchServiceTest extends BaseServiceTest {

    private static final Logger logger = LoggerFactory.getLogger(MatchServiceTest.class);

    final int MATCHES_TO_DELAY = 2;
    final Sort SORT_BY_DATE = SortUtils.getSort("asc");

    @Autowired
    private MatchService matchService;

    @Autowired
    private MatchRepository matchRepository;

    @Autowired
    private PlayerRepository playerRepository;

    @Autowired
    private LeagueRepository leagueRepository;

    private League league;
    private List<Player> players = new ArrayList<>();
    private List<Match> matchList= new ArrayList<>();
    private DateUtils dateUtils = new DateUtils();

    @Before
    public void setup() {
        this.league = new League("rescheduleTestLeague");
        this.league = this.leagueRepository.save(this.league);
        this.players = PlayerTestUtils.generatePlayerList(2, this.league);
        for (int i = 0; i < players.size(); i++) {
            players.set(i, playerRepository.save(players.get(i)));
        }
    }

    @After
    public void tearDown() {
        leagueRepository.deleteAll();
        playerRepository.deleteAll();
        matchRepository.deleteAll();
    }

    @Test
    public void test_rescheduleMatchesByTenMinutes() {
        setupMatches(4);
        setMatchesDateForRescheduling(MATCHES_TO_DELAY);
        List<Match> matchesBeforeRescheduling = this.matchRepository.findByLeagueIdAndCompletedIsFalse(this.league.getId(), SORT_BY_DATE);
        this.matchList = this.matchService.rescheduleMatchesInLeague(this.league.getId(), 10, SORT_BY_DATE);
        for (int i = 0; i < this.matchList.size(); i++) {
            Match oldMatch = matchesBeforeRescheduling.get(i);
            Match newMatch = this.matchList.get(i);
            logger.info("Match ID: " + newMatch.getId());
            logger.info(dateUtils.getDateTime(oldMatch.getDate()) + " => " + dateUtils.getDateTime(newMatch.getDate()));
            if (i < MATCHES_TO_DELAY) {
                Assert.assertFalse("Matches should not have same date", oldMatch.getDate().getTime() == newMatch.getDate().getTime());
            } else {
                Assert.assertTrue(oldMatch.getDate().getTime() == newMatch.getDate().getTime());
            }
        }
    }

    @Test
    public void test_rescheduleMatchesWithMatchAtCurrentTime() {
        setupCustomMatches();
        List<Match> matchesBeforeRescheduling = this.matchRepository.findByLeagueIdAndCompletedIsFalse(this.league.getId(), SORT_BY_DATE);
        this.matchList = this.matchService.rescheduleMatchesInLeague(this.league.getId(), 10, SORT_BY_DATE);
        Date now = new Date();
        logger.info("Current Time: " + dateUtils.getDateTime(now));
        for (int i = 0; i < this.matchList.size(); i++) {
            Match oldMatch = matchesBeforeRescheduling.get(i);
            Match newMatch = this.matchList.get(i);
            logger.info("Match " + i + " ID: " + newMatch.getId());
            logger.info(dateUtils.getDateTime(oldMatch.getDate()) + " => " + dateUtils.getDateTime(newMatch.getDate()));

            if ((i + 1) < this.matchList.size()) {
                Match nextMatch = this.matchList.get(i + 1);
                logger.info("Next match time: " + dateUtils.getDateTime(nextMatch.getDate()));
                Assert.assertTrue(
                        "Matches should not have the same time, " + dateUtils.getDateTime(newMatch.getDate()) + " | " + dateUtils.getDateTime(nextMatch.getDate()),
                        !dateUtils.getDateTime(newMatch.getDate()).equals(dateUtils.getDateTime(nextMatch.getDate())));
                Assert.assertTrue(
                        "Next Match should have date in the future",
                        nextMatch.getDate().getTime() > newMatch.getDate().getTime());
                Date nextMatchExpectedDate = dateUtils.adjustTimeByMinutes(newMatch.getDate(), 10, false);
                Assert.assertTrue(
                        "Next match should have date: " + dateUtils.getDateTime(nextMatchExpectedDate),
                        dateUtils.getDateTime(nextMatch.getDate()).equals(dateUtils.getDateTime(nextMatchExpectedDate)));
            }
        }
    }

    private void setupCustomMatches() {
        this.matchList.clear();

        Match match1 = new Match(this.players.get(0), this.players.get(1), this.league);
        match1.setDate(dateUtils.adjustTimeByMinutes(match1.getDate(), 20, true));
        Match match2 = new Match(this.players.get(0), this.players.get(1), this.league);
        match2.setDate(dateUtils.adjustTimeByMinutes(match2.getDate(), 10, true));
        Match match3 = new Match(this.players.get(0), this.players.get(1), this.league);
        Match match4 = new Match(this.players.get(0), this.players.get(1), this.league);
        match4.setDate(dateUtils.adjustTimeByMinutes(match4.getDate(), 10, false));
        Match match5 = new Match(this.players.get(0), this.players.get(1), this.league);
        match5.setDate(dateUtils.adjustTimeByMinutes(match5.getDate(), 20, false));

        this.matchList.add(match1);
        this.matchList.add(match2);
        this.matchList.add(match3);
        this.matchList.add(match4);
        this.matchList.add(match5);

        saveMatches();
    }

    private void setupMatches(int amount) {
        this.matchList.clear();
        for (int i = 0; i < amount; i++) {
            Match match = new Match(this.players.get(0), this.players.get(1), this.league);
            this.matchList.add(match);
        }

        saveMatches();
    }

    void setMatchesDateForRescheduling(int matchesToDelay) {
        for (int i = 0; i < this.matchList.size(); i++) {
            Match match = this.matchList.get(i);
            if (i < matchesToDelay) {
                match.setDate(new DateUtils().adjustTimeByMinutes(match.getDate(), (i + 1) * 10, true));
            } else {
                match.setDate(new DateUtils().adjustTimeByMinutes(match.getDate(), i * 20, false));
            }
            this.matchList.set(i, match);
        }

        saveMatches();
    }

    private void saveMatches() {
        for (int i = 0; i < matchList.size(); i++) {
            matchList.set(i, matchRepository.save(matchList.get(i)));
        }
    }

}
