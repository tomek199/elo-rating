package com.elorating.service.email;

import com.elorating.model.League;
import org.thymeleaf.context.Context;

public class CancelledMatchEmail extends EmailBuilder {

    private String opponent;
    private League league;

    public CancelledMatchEmail(String opponent, String recipient, String originUrl, League league) {
        this.opponent = opponent;
        this.recipient = recipient;
        this.originUrl = originUrl;
        this.league = league;
    }

    @Override
    public void buildRecipient() {
        email.setRecipient(recipient);
    }

    @Override
    public void buildSubject() {
        email.setSubject(EmailStrings.CANCELLED_MATCH);
    }

    @Override
    public void buildTemplateName() {
        email.setTemplateName(EmailStrings.CANCELLED_MATCH_TEMPLATE);
    }

    @Override
    public void buildContext() {
        Context context = email.getContext();
        String redirectUrl = originUrl + "/leagues/" + this.league.getId() + "/matches";
        context.setVariable("redirectUrl", redirectUrl);
        context.setVariable("opponent", opponent);
    }
}
