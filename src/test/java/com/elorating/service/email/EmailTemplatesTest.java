package com.elorating.service.email;

import com.elorating.model.League;
import com.elorating.service.BaseServiceTest;
import com.elorating.service.EmailService;
import org.junit.Ignore;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * Class to test email templates.
 * It doesn't check anything - just to see email's look
 */
@Ignore
public class EmailTemplatesTest extends BaseServiceTest {

    private static final String RECIPIENT = "put@mail.here";

    @Autowired
    private EmailService emailService;

    private EmailDirector director = new EmailDirector();

    @Test
    public void testFeedback() throws Exception {
        String text = "some feedback text";
        EmailBuilder builder = new FeedbackEmail("test@mail.com", RECIPIENT, text);
        director.setBuilder(builder);
        emailService.send(director.build());
    }

    @Test
    public void testFeedbackConfirmation() throws Exception {
        String text = "some feedback text";
        EmailBuilder builder = new FeedbackConfirmationEmail(RECIPIENT, text);
        director.setBuilder(builder);
        emailService.send(director.build());
    }

    @Test
    public void testInviteNew() throws Exception {
        EmailBuilder builder = new InviteNewUserEmail(RECIPIENT, "Some user",
                "https://elo-rating.herokuapp.com", "aq12wsde34rf");
        director.setBuilder(builder);
        emailService.send(director.build());
    }

    @Test
    public void testInviteExisting() throws Exception {
        EmailBuilder builder = new InviteExistingUserEmail(RECIPIENT, "Some user",
                "https://elo-rating.herokuapp.com",
                new League("123", "League naem"));
        director.setBuilder(builder);
        emailService.send(director.build());
    }

    @Test
    public void testScheduledMatch() throws Exception {
        EmailBuilder builder = new ScheduledMatchEmail("Opponent", RECIPIENT,
                "16:30", "https://elo-rating.herokuapp.com",
                new League("123", "League naem"));
        director.setBuilder(builder);
        emailService.send(director.build());
    }

    @Test
    public void testEditedMatch() throws Exception {
        EmailBuilder builder = new EditMatchEmail("Opponent", RECIPIENT,
                "16:30", "https://elo-rating.herokuapp.com",
                new League("123", "League naem"));
        director.setBuilder(builder);
        emailService.send(director.build());
    }

    @Test
    public void testCancelledMatch() throws Exception {
        EmailBuilder builder = new CancelledMatchEmail("Opponent", RECIPIENT,
                "https://elo-rating.herokuapp.com",
                new League("123", "League naem"));
        director.setBuilder(builder);
        emailService.send(director.build());
    }
}
