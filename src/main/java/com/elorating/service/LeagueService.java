package com.elorating.service;

import com.elorating.model.League;
import com.elorating.model.LeagueSettings;
import com.elorating.model.User;
import com.elorating.repository.LeagueRepository;
import com.elorating.repository.MatchRepository;
import com.elorating.repository.PlayerRepository;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Optional;

@Service
public class LeagueService implements RepositoryService<League> {

    @Resource
    private LeagueRepository leagueRepository;

    @Resource
    private MatchRepository matchRepository;

    @Resource
    private PlayerRepository playerRepository;

    @Override
    public Optional<League> getById(String id) {
        return leagueRepository.findById(id);
    }

    @Override
    public List<League> getAll() {
        return leagueRepository.findAll();
    }

    @Override
    public League save(League league) {
        return leagueRepository.save(league);
    }

    @Override
    public List<League> save(Iterable<League> leagues) {
        return leagueRepository.saveAll(leagues);
    }

    @Override
    public void deleteById(String id)
    {
        matchRepository.deleteByLeagueId(id);
        playerRepository.deleteByLeagueId(id);
        leagueRepository.deleteById(id);
    }

    @Override
    public void deleteAll() {
        leagueRepository.deleteAll();
    }

    public List<League> findByName(String leagueName) {
        return leagueRepository.findByNameLikeIgnoreCase(leagueName);
    }

    public League update(League league) {
        return leagueRepository.findById(league.getId()).map(dbLeague -> {
            dbLeague.setName(league.getName());
            dbLeague.setSettings(league.getSettings());
            leagueRepository.save(dbLeague);
            return dbLeague;
        }).orElse(null);
    }

    public List<League> findUnassignedLeagues() {
        return leagueRepository.findByUsersNull();
    }

    public League findLeagueByIdAndUser(String leagueId, User user) {
        return leagueRepository.findByIdAndUsers(leagueId, user);
    }

    public LeagueSettings getLeagueSettings(String id) {
        return leagueRepository.findById(id)
                .map(League::getSettings)
                .orElse(null);
    }
}
