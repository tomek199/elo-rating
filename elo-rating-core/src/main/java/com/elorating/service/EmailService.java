package com.elorating.service;

import com.elorating.service.email.Email;
import com.elorating.service.email.EmailBuilder;
import org.springframework.scheduling.annotation.Async;

import java.util.Set;

public interface EmailService {


    boolean send(Email email);
    @Async
    void sendEmails(Set emails);
    public boolean sendEmail(EmailBuilder emailBuilder);
}
