package com.elorating.service.email;

import com.elorating.model.League;
import com.elorating.model.Match;
import com.elorating.model.Player;
import com.elorating.model.User;
import com.elorating.service.BaseServiceTest;
import com.elorating.utils.MatchTestUtils;
import com.elorating.utils.PlayerTestUtils;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Set;

public class EmailGeneratorTest extends BaseServiceTest {

    @Autowired
    EmailGenerator emailGenerator;

    League league;
    List<Player> players = PlayerTestUtils.generatePlayerList(2, league);
    Match match = MatchTestUtils.generateMatch(league, players.get(0), players.get(1), false);
    String originUrl = "originUrl";

    @Before
    public void setup() {
        league = new League("test");
        players = PlayerTestUtils.generatePlayerList(2, league);
        User user = new User("testUser", "test@email.com");
        for (int i = 0; i < players.size(); i++) {
            Player player = players.get(i);
            player.setUser(user);
            players.set(i, player);
        }
        match = MatchTestUtils.generateMatch(league, players.get(0), players.get(1), false);
    }

    @Test
    public void test_generateScheduleMatches_shouldReturnTwoEmails_success() throws Exception {
        Set<EmailBuilder> scheduleMatchEmails = emailGenerator.generateEmails(match, emailGenerator.SCHEDULE_MATCH, originUrl);

        Assert.assertNotNull(scheduleMatchEmails);
        Assert.assertTrue(scheduleMatchEmails.size() == 2);
        for (EmailBuilder email : scheduleMatchEmails) {
            Assert.assertTrue(email.getClass() == ScheduledMatchEmail.class);
        }
    }

    @Test
    public void test_generateEditMatches_shouldReturnTwoEmails_success() throws Exception {
        Set<EmailBuilder> scheduleMatchEmails = emailGenerator.generateEmails(match, emailGenerator.EDIT_MATCH, originUrl);

        Assert.assertNotNull(scheduleMatchEmails);
        Assert.assertTrue(scheduleMatchEmails.size() == 2);
        for (EmailBuilder email : scheduleMatchEmails) {
            Assert.assertTrue(email.getClass() == EditMatchEmail.class);
        }
    }

    @Test
    public void test_generateCancelMatches_shouldReturnTwoEmails_success() throws Exception {
        Set<EmailBuilder> scheduleMatchEmails = emailGenerator.generateEmails(match, emailGenerator.CANCEL_MATCH, originUrl);

        Assert.assertNotNull(scheduleMatchEmails);
        Assert.assertTrue(scheduleMatchEmails.size() == 2);
        for (EmailBuilder email : scheduleMatchEmails) {
            Assert.assertTrue(email.getClass() == CancelledMatchEmail.class);
        }
    }
}
