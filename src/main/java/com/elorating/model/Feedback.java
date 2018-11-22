package com.elorating.model;

public class Feedback {
    private String sender;
    private String text;

    public String getSender() {
        return sender;
    }

    public String getText() {
        return text;
    }

    public Feedback() { }

    public Feedback(String sender, String text) {
        this.sender = sender;
        this.text = text;
    }
}
