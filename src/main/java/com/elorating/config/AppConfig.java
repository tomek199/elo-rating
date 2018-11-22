package com.elorating.config;

import org.springframework.boot.web.server.ErrorPage;
import org.springframework.boot.web.server.WebServerFactoryCustomizer;
import org.springframework.boot.web.servlet.server.ConfigurableServletWebServerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;

@Configuration
public class AppConfig {

    /**
     * Bean for handling single page application that always redirect to /
     * @return error page which redirect to /
     */
    @Bean
    public WebServerFactoryCustomizer<ConfigurableServletWebServerFactory> pageNotFoundHandler() {
        return container -> container.addErrorPages(new ErrorPage(HttpStatus.NOT_FOUND, "/"));
    }
}
