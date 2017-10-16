package com.elorating.service;

import com.elorating.service.email.Email;

public interface EmailService {
    boolean send(Email email);
}
