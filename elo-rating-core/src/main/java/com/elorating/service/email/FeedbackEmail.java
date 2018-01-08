package com.elorating.service.email;

import org.thymeleaf.context.Context;

public class FeedbackEmail extends EmailBuilder {

    private String sender;
    private String text;

    public FeedbackEmail(String sender, String recipient, String text) {
        this.sender = sender;
        this.recipient = recipient;
        this.text = text;
    }

    @Override
    public void buildRecipient() {
        email.setRecipient(recipient);
    }

    @Override
    public void buildSubject() {
        email.setSubject("EloRating feedback");
    }

    @Override
    public void buildTemplateName() {
        email.setTemplateName("feedback");
    }

    @Override
    public void buildContext() {
        Context context = email.getContext();
        context.setVariable("sender", sender);
        context.setVariable("text", text);
    }
}
