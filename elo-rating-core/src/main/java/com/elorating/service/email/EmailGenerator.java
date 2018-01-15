package com.elorating.service.email;


import com.elorating.model.Match;

import java.util.Set;

public interface EmailGenerator {

    public final String SCHEDULE_MATCH = "SCHEDULE";
    public final String CANCEL_MATCH = "CANCEL";
    public final String EDIT_MATCH = "EDIT";

    public Set<EmailBuilder> generateEmails(Match match, String emailType, String originUrl);
}
