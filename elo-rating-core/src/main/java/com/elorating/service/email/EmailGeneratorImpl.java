package com.elorating.service.email;

import com.elorating.model.Match;
import com.elorating.utils.DateUtils;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@Component("emailGenerator")
public class EmailGeneratorImpl implements EmailGenerator {

    public Set<EmailBuilder> generateEmails(Match match, String emailType, String originUrl) {
        Set emailSet = null;

        if (emailType.equals(SCHEDULE_MATCH)) {
            emailSet = generateScheduleEmails(match, originUrl);
        } else if (emailType.equals(CANCEL_MATCH)) {
            emailSet = generateCancelEmails(match, originUrl);
        } else if (emailType.equals(EDIT_MATCH)) {
            emailSet = generateEditEmails(match, originUrl);
        }

        return emailSet;
    }

    private Set<ScheduledMatchEmail> generateScheduleEmails(Match match, String originUrl) {
        Set emailSet = new HashSet();

        if (match.getPlayerOne().getUser() != null && match.getPlayerOne().getUser().getEmailsNotifications().isScheduledMatchNotification()) {
            emailSet.add(new ScheduledMatchEmail(match.getPlayerTwo().getUsername(),
                    match.getPlayerOne().getUser().getEmail(),
                    DateUtils.getDateTime(match.getDate(), match.getPlayerOne().getUser().getTimezoneID()), originUrl, match.getLeague()));
        }

        if (match.getPlayerTwo().getUser() != null && match.getPlayerTwo().getUser().getEmailsNotifications().isScheduledMatchNotification()) {
            emailSet.add(new ScheduledMatchEmail(match.getPlayerOne().getUsername(),
                    match.getPlayerTwo().getUser().getEmail(),
                    DateUtils.getDateTime(match.getDate(), match.getPlayerTwo().getUser().getTimezoneID()), originUrl, match.getLeague()));
        }

        return emailSet;
    }

    private Set<ScheduledMatchEmail> generateCancelEmails(Match match, String originUrl) {
        Set emailSet = new HashSet();

        if (match.getPlayerOne().getUser() != null && match.getPlayerOne().getUser().getEmailsNotifications().isCancelledMatchNotification()) {
            emailSet.add(new CancelledMatchEmail(match.getPlayerTwo().getUsername(),
                    match.getPlayerOne().getUser().getEmail(), originUrl, match.getLeague()));
        }

        if (match.getPlayerTwo().getUser() != null && match.getPlayerTwo().getUser().getEmailsNotifications().isCancelledMatchNotification()) {
            emailSet.add(new CancelledMatchEmail(match.getPlayerOne().getUsername(),
                    match.getPlayerTwo().getUser().getEmail(), originUrl, match.getLeague()));
        }
        return emailSet;
    }

    private Set<ScheduledMatchEmail> generateEditEmails(Match match, String originUrl) {
        Set emailSet = new HashSet();

        if (match.getPlayerOne().getUser() != null && match.getPlayerOne().getUser().getEmailsNotifications().isEditedMatchNotification()) {
            emailSet.add(new EditMatchEmail(match.getPlayerTwo().getUsername(),
                    match.getPlayerOne().getUser().getEmail(),
                    DateUtils.getDateTime(match.getDate(), match.getPlayerOne().getUser().getTimezoneID()), originUrl, match.getLeague()));
        }

        if (match.getPlayerTwo().getUser() != null && match.getPlayerTwo().getUser().getEmailsNotifications().isEditedMatchNotification()) {
            emailSet.add(new EditMatchEmail(match.getPlayerOne().getUsername(),
                    match.getPlayerTwo().getUser().getEmail(),
                    DateUtils.getDateTime(match.getDate(), match.getPlayerTwo().getUser().getTimezoneID()), originUrl, match.getLeague()));
        }

        return emailSet;
    }

}
