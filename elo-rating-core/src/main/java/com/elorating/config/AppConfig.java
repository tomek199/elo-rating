package com.elorating.config;

import com.elorating.service.PlayerStatsService;
import com.elorating.service.PlayerStatsServiceImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Created by pokor on 10.06.2017.
 */
@Configuration
public class AppConfig {

    @Bean(name = "playerStatsService")
    public PlayerStatsService getPlayerStatsService() {
        return new PlayerStatsServiceImpl();
    }
}
