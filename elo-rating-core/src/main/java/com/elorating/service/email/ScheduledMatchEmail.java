package com.elorating.service.email;

import com.elorating.model.League;
import org.thymeleaf.context.Context;

public class ScheduledMatchEmail extends EmailBuilder {

    private String opponent;
    private String recipient;
    private String matchtime;
    private League league;

    public ScheduledMatchEmail(String opponent, String recipient, String matchtime, String originUrl, League league) {
        this.opponent = opponent;
        this.recipient = recipient;
        this.matchtime = matchtime;
        this.originUrl = originUrl;
        this.league = league;
    }

    @Override
    public void buildRecipient() {
        email.setRecipient(recipient);
    }

    @Override
    public void buildSubject() {
        email.setSubject(EmailStrings.SCHEDULED_MATCH);
    }

    @Override
    public void buildTemplateName() {
        email.setTemplateName(EmailStrings.SCHEDULED_MATCH_TEMPLATE);
    }

    @Override
    public void buildContext() {
        Context context = email.getContext();
        String redirectUrl = originUrl + "/leagues/" + this.league.getId() + "/matches";
        context.setVariable("redirectUrl", redirectUrl);
        context.setVariable("username", this.opponent);
        context.setVariable("matchtime", matchtime);
    }
}
