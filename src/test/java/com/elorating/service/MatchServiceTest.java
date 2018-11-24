package com.elorating.service;

import com.elorating.model.League;
import com.elorating.model.Match;
import com.elorating.model.Player;
import com.elorating.repository.LeagueRepository;
import com.elorating.repository.MatchRepository;
import com.elorating.repository.PlayerRepository;
import com.elorating.utils.DateUtils;
import com.elorating.utils.MatchTestUtils;
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
    final int MINUTES = 10;
    final Sort SORT_BY_DATE = SortUtils.getSortAscending();

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
    private List<Match> matchList = new ArrayList<>();

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
        this.matchList = MatchTestUtils.setupMatches(this.players.get(0), this.players.get(1), this.league, 4);
        saveMatches();
        setMatchesDateForRescheduling(MATCHES_TO_DELAY);
        List<Match> matchesBeforeRescheduling = this.matchRepository.findByLeagueIdAndCompletedIsFalse(this.league.getId(), SORT_BY_DATE);
        this.matchList = this.matchService.rescheduleMatchesInLeague(this.league.getId(), MINUTES, SORT_BY_DATE, "https://elo.com");
        for (int i = 0; i < this.matchList.size(); i++) {
            Match oldMatch = matchesBeforeRescheduling.get(i);
            Match newMatch = this.matchList.get(i);
            logger.info("Match ID: " + newMatch.getId());
            logger.info(DateUtils.getDateTime(oldMatch.getDate()) + " => " + DateUtils.getDateTime(newMatch.getDate()));
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
        this.matchList = this.matchService.rescheduleMatchesInLeague(this.league.getId(), MINUTES, SORT_BY_DATE, "https://elo.com");
        Date now = new Date();
        logger.info("Current Time: " + DateUtils.getDateTime(now));
        for (int i = 0; i < this.matchList.size(); i++) {
            Match oldMatch = matchesBeforeRescheduling.get(i);
            Match newMatch = this.matchList.get(i);
            logger.info("Match " + i + " ID: " + newMatch.getId());
            logger.info(DateUtils.getDateTime(oldMatch.getDate()) + " => " + DateUtils.getDateTime(newMatch.getDate()));

            if ((i + 1) < this.matchList.size()) {
                Match nextMatch = this.matchList.get(i + 1);
                logger.info("Next match time: " + DateUtils.getDateTime(nextMatch.getDate()));
                Assert.assertTrue(
                        "Matches should not have the same time, " + DateUtils.getDateTime(newMatch.getDate()) + " | " + DateUtils.getDateTime(nextMatch.getDate()),
                        !DateUtils.getDateTime(newMatch.getDate()).equals(DateUtils.getDateTime(nextMatch.getDate())));
                Assert.assertTrue(
                        "Next Match should have date in the future",
                        nextMatch.getDate().getTime() > newMatch.getDate().getTime());
                Date nextMatchExpectedDate = DateUtils.adjustTimeByMinutesIntoFuture(newMatch.getDate(), MINUTES);
                Assert.assertTrue(
                        "Next match should have date: " + DateUtils.getDateTime(nextMatchExpectedDate),
                        DateUtils.getDateTime(nextMatch.getDate()).equals(DateUtils.getDateTime(nextMatchExpectedDate)));
            }
        }
    }

    @Test
    public void test_rescheduleMatchesWithGapBellowSpecifiedTime() {
        Match match1 = new Match(this.players.get(0), this.players.get(1), this.league);
        match1.setDate(DateUtils.adjustTimeByMinutesIntoPast(match1.getDate(), 10));
        Match match2 = new Match(this.players.get(0), this.players.get(1), this.league);
        match2.setDate(DateUtils.adjustTimeByMinutesIntoPast(match2.getDate(), 5));
        Match match3 = new Match(this.players.get(0), this.players.get(1), this.league);

        this.matchList.add(match1);
        this.matchList.add(match2);
        this.matchList.add(match3);

        saveMatches();

        List<Match> matchesBeforeRescheduling = this.matchRepository.findByLeagueIdAndCompletedIsFalse(this.league.getId(), SORT_BY_DATE);
        this.matchList = this.matchService.rescheduleMatchesInLeague(this.league.getId(), MINUTES, SORT_BY_DATE, "https://elo.com");
        Date now = new Date();
        logger.info("Current Time: " + DateUtils.getDateTime(now));
        for (int i = 0; i < this.matchList.size(); i++) {
            Match oldMatch = matchesBeforeRescheduling.get(i);
            Match newMatch = this.matchList.get(i);
            logger.info("Match " + i + " ID: " + newMatch.getId());
            logger.info(DateUtils.getDateTime(oldMatch.getDate()) + " => " + DateUtils.getDateTime(newMatch.getDate()));
            if (i == 0) {
                Assert.assertTrue(
                        "New match day should be " + MINUTES + " into the future",
                        DateUtils.getDateTime(newMatch.getDate()).equals(DateUtils.getDateTime(DateUtils.adjustTimeByMinutesIntoFuture(oldMatch.getDate(), MINUTES))));
            } else {
                Date previousMatchDate = this.matchList.get(i - 1).getDate();
                Assert.assertTrue(
                        "New match time should be: " + DateUtils.getDateTime(DateUtils.adjustTimeByMinutesIntoFuture(previousMatchDate, MINUTES)) + ", is: " + DateUtils.getDateTime(newMatch.getDate()),
                        DateUtils.getDateTime(newMatch.getDate()).equals(DateUtils.getDateTime(DateUtils.adjustTimeByMinutesIntoFuture(previousMatchDate, MINUTES))));
            }
        }

    }

    private void setupCustomMatches() {
        this.matchList.clear();

        Match match1 = new Match(this.players.get(0), this.players.get(1), this.league);
        match1.setDate(DateUtils.adjustTimeByMinutesIntoPast(match1.getDate(), 20));
        Match match2 = new Match(this.players.get(0), this.players.get(1), this.league);
        match2.setDate(DateUtils.adjustTimeByMinutesIntoPast(match2.getDate(), 10));
        Match match3 = new Match(this.players.get(0), this.players.get(1), this.league);
        Match match4 = new Match(this.players.get(0), this.players.get(1), this.league);
        match4.setDate(DateUtils.adjustTimeByMinutesIntoFuture(match4.getDate(), 10));
        Match match5 = new Match(this.players.get(0), this.players.get(1), this.league);
        match5.setDate(DateUtils.adjustTimeByMinutesIntoFuture(match5.getDate(), 20));

        this.matchList.add(match1);
        this.matchList.add(match2);
        this.matchList.add(match3);
        this.matchList.add(match4);
        this.matchList.add(match5);

        saveMatches();
    }

    void setMatchesDateForRescheduling(int matchesToDelay) {
        for (int i = 0; i < this.matchList.size(); i++) {
            Match match = this.matchList.get(i);
            if (i < matchesToDelay) {
                match.setDate(DateUtils.adjustTimeByMinutesIntoPast(match.getDate(), (i + 1) * MINUTES));
            } else {
                match.setDate(DateUtils.adjustTimeByMinutesIntoFuture(match.getDate(), i * (MINUTES * 2)));
            }
            this.matchList.set(i, match);
        }

        saveMatches();
    }

    private void saveMatches() {
        this.matchList.forEach(match -> this.matchRepository.save(match));
    }

}
