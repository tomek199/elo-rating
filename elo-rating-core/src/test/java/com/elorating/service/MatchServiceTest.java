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

        Match matchOne = new Match(players.get(0), players.get(1), this.league);
        Match matchTwo = new Match(players.get(0), players.get(1), this.league);
        Match matchThree = new Match(players.get(0), players.get(1), this.league);
        Match matchFour = new Match(players.get(0), players.get(1), this.league);

        matchList.add(matchOne);
        matchList.add(matchTwo);
        matchList.add(matchThree);
        matchList.add(matchFour);

        for (int i = 0; i < matchList.size(); i++) {
            matchList.set(i, matchRepository.save(matchList.get(i)));
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
        setMatchesDateForRescheduling(MATCHES_TO_DELAY);
        List<Match> matchesBeforeRescheduling = this.matchRepository.findByLeagueIdAndCompletedIsFalse(this.league.getId(), SORT_BY_DATE);
        this.matchList = this.matchService.rescheduleMatchesInLeague(this.league.getId(), 10, SORT_BY_DATE);
        for (int i = 0; i < this.matchList.size(); i++) {
            Match oldMatch = matchesBeforeRescheduling.get(i);
            Match newMatch = this.matchList.get(i);
            logger.info("Match ID: " + newMatch.getId());
            logger.info("Match date: " + dateUtils.getDateString(oldMatch.getDate()));
            logger.info("Match date after reschedule: " + dateUtils.getDateString(newMatch.getDate()));
            if (i < MATCHES_TO_DELAY) {
                Assert.assertFalse("Matches should not have same date", oldMatch.getDate().getTime() == newMatch.getDate().getTime());
            } else {
                Assert.assertTrue(oldMatch.getDate().getTime() == newMatch.getDate().getTime());
            }
        }
    }

    void setMatchesDateForRescheduling(int matchesToDelay) {
        for (int i = 0; i < this.matchList.size(); i++) {
            Match match = this.matchList.get(i);
            if (i < matchesToDelay) {
                match.setDate(new DateUtils().adjustTimeByMinutes(match.getDate(), (i + 1) * 11, true));
            } else {
                match.setDate(new DateUtils().adjustTimeByMinutes(match.getDate(), i * 20, false));
            }
            this.matchList.set(i, match);
        }

        for (int i = 0; i < this.matchList.size(); i++) {
            this.matchList.set(i, this.matchRepository.save(this.matchList.get(i)));
        }
    }


}
