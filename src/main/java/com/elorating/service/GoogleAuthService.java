package com.elorating.service;

import com.elorating.model.User;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;
import java.util.Date;

@Service
public class GoogleAuthService {
    private static final Logger logger = LoggerFactory.getLogger(GoogleAuthService.class);
    private static final JacksonFactory jacksonFactory = new JacksonFactory();
    private static final NetHttpTransport httpTransport = new NetHttpTransport();

    @Value("${google.client.id}")
    private String clientId;

    public User getUserFromToken(String token) {
        GoogleIdToken idToken = verifyGoogleIdToken(token);
        if (idToken != null) {
            return createUserFromPayload(idToken.getPayload());
        } else {
            return null;
        }
    }

    public GoogleIdToken verifyGoogleIdToken(String token) {
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(httpTransport, jacksonFactory)
                .setAudience(Collections.singletonList(clientId)).build();
        GoogleIdToken idToken = null;
        try {
            idToken = verifier.verify(token);
        } catch (GeneralSecurityException e) {
            logger.error(e.getMessage());
        } catch (IOException e) {
            logger.error(e.getMessage());
        } finally {
            return idToken;
        }
    }
    
    private User createUserFromPayload(Payload payload) {
        User user = new User();
        user.setGoogleId(payload.getSubject());
        user.setName((String) payload.get("name"));
        user.setGivenName((String) payload.get("given_name"));
        user.setFamilyName((String) payload.get("family_name"));
        user.setEmail(payload.getEmail());
        user.setPictureUrl((String) payload.get("picture"));
        user.setLastSignIn(new Date());
        return user;
    }
}
