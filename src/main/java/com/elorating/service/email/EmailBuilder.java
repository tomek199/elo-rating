package com.elorating.service.email;

public abstract class EmailBuilder {
    protected Email email;
    protected String recipient;
    protected String originUrl;

    public void newEmail() {
        email = new Email();
    }

    public Email getEmail() {
        return email;
    }

    public abstract void buildRecipient();
    public abstract void buildSubject();
    public abstract void buildTemplateName();
    public abstract void buildContext();
}
