package com.elorating.utils;

import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtils {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private Long expiration;

    public String generate(String username) {
        Date createdAt = new Date();
        Date expirationDate = new Date(createdAt.getTime() + expiration * 1000);
        return Jwts.builder()
                    .setSubject(username)
                    .setIssuedAt(createdAt)
                    .setExpiration(expirationDate)
                    .signWith(SignatureAlgorithm.HS512, secret)
                    .compact();
    }

    public String getUsername(String token) {
        if (validate(token))
            return parseClaims(token).getBody().getSubject();
        else
            return null;
    }

    public boolean validate(String token) {
        try {
            parseClaims(token);
            return true;
        } catch (SignatureException e) {
            return false;
        }
    }

    private Jws<Claims> parseClaims(String token) throws SignatureException {
        return Jwts.parser().setSigningKey(secret).parseClaimsJws(token);
    }
}
