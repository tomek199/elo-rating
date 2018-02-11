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

@Service("leagueService")
public class LeagueServiceImpl implements LeagueService {

    @Resource
    private LeagueRepository leagueRepository;

    @Resource
    private MatchRepository matchRepository;

    @Resource
    private PlayerRepository playerRepository;

    @Override
    public League getById(String id) {
        return leagueRepository.findOne(id);
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
        return leagueRepository.save(leagues);
    }

    @Override
    public void deleteById(String id)
    {
        matchRepository.deleteByLeagueId(id);
        playerRepository.deleteByLeagueId(id);
        leagueRepository.delete(id);
    }

    @Override
    public List<League> findByName(String leagueName) {
        return leagueRepository.findByNameLikeIgnoreCase(leagueName);
    }

    @Override
    public List<League> findUnassignedLeagues() {
        return leagueRepository.findByUsersNull();
    }

    @Override
    public League findLeagueByIdAndUser(String leagueId, User user) {
        return leagueRepository.findByIdAndUsers(leagueId, user);
    }

    @Override
    public LeagueSettings getLeagueSettings(String id) {
        League league = leagueRepository.findOne(id);
        if (league != null && league.getSettings() != null)
            return league.getSettings();
        else
            return null;
    }

    @Override
    public void deleteAll() {
        leagueRepository.deleteAll();
    }
}
