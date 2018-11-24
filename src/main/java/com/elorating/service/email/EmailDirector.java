package com.elorating.service.email;

public class EmailDirector {
    private EmailBuilder builder;

    public void setBuilder(EmailBuilder builder) {
        this.builder = builder;
    }

    public Email build() {
        builder.newEmail();
        builder.buildRecipient();
        builder.buildSubject();
        builder.buildTemplateName();
        builder.buildContext();
        return builder.getEmail();
    }
}
