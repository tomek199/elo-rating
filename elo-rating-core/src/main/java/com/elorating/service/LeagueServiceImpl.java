package com.elorating.service;

import com.elorating.model.League;
import com.elorating.model.User;
import com.elorating.repository.LeagueRepository;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service("leagueService")
public class LeagueServiceImpl implements LeagueService {

    @Resource
    LeagueRepository leagueRepository;

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
    public void deleteById(String id) {
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
    public void deleteAll() {
        leagueRepository.deleteAll();
    }
}
