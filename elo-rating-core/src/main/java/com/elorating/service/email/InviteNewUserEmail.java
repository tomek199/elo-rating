package com.elorating.service.email;

import org.thymeleaf.context.Context;

public class InviteNewUserEmail extends EmailBuilder {

    private String currentUser;
    private String token;

    public InviteNewUserEmail(String recipient, String currentUser,
                              String originUrl, String token) {
        this.recipient = recipient;
        this.currentUser = currentUser;
        this.originUrl = originUrl;
        this.token = token;
    }

    @Override
    public void buildRecipient() {
        email.setRecipient(recipient);
    }

    @Override
    public void buildSubject() {
        email.setSubject("EloRating invitation");
    }

    @Override
    public void buildTemplateName() {
        email.setTemplateName("inviteNew");
    }

    @Override
    public void buildContext() {
        Context context = email.getContext();
        String redirectUrl = originUrl + "/users/confirm-invitation/" + token;
        context.setVariable("redirectUrl", redirectUrl);
        context.setVariable("username", currentUser);
    }
}
