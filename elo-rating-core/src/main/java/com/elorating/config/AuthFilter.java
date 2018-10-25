package com.elorating.config;

import com.elorating.model.League;
import com.elorating.model.User;
import com.elorating.repository.LeagueRepository;
import com.elorating.repository.UserRepository;
import com.elorating.service.GoogleAuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.annotation.Resource;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class AuthFilter extends OncePerRequestFilter {

    private static final String X_AUTHORIZATION = "X-Authorization";
    private static final String ERROR_MESSAGE = "You are not authorized to this league";

    @Autowired
    private GoogleAuthService googleAuthService;

    @Resource
    private LeagueRepository leagueRepository;

    @Resource
    private UserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        if (isAuthorized(request)) {
            filterChain.doFilter(request, response);
        } else {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, ERROR_MESSAGE);
        }
    }

    private boolean isAuthorized(HttpServletRequest request) {
        String leagueId = getLeagueId(request.getRequestURI());
        if (!isMethodToAuthorize(request) || leagueId == null)
            return true;
        League league = leagueRepository.findById(leagueId).orElseGet(League::new);
        if (!league.isAssigned())
            return true;
        String token = request.getHeader(X_AUTHORIZATION);
        return isUserAuthorized(league, token);
    }

    private boolean isMethodToAuthorize(HttpServletRequest request) {
        String method = request.getMethod();
        if (HttpMethod.GET.name().equals(method))
            return false;
        else if(HttpMethod.OPTIONS.name().equals(method))
            return false;
        else
            return true;
    }

    private String getLeagueId(String uri) {
        String segments[] = uri.split("/");
        try {
            return segments[2].equals("leagues") ? segments[3] : null;
        } catch (IndexOutOfBoundsException e) {
            return null;
        }
    }

    private boolean isUserAuthorized(League league, String token) {
        User user = googleAuthService.getUserFromToken(token);
        if (user == null)
            return false;
        user = userRepository.findByGoogleId(user.getGoogleId());
        return leagueRepository.findByIdAndUsers(league.getId(), user) != null;
    }
}
