package com.elorating.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

@Configuration
public class AuthConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private AuthFilter authFilter;

    /**
     * Configuration for triggering filter before each http request
     * @param http HttpSecurity
     * @throws Exception
     */
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .antMatcher("/**")
                .addFilterBefore(authFilter, BasicAuthenticationFilter.class);
    }
}
