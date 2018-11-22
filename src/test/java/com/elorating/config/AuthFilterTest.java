package com.elorating.config;

import com.elorating.model.League;
import com.elorating.model.User;
import com.elorating.repository.LeagueRepository;
import com.elorating.repository.UserRepository;
import com.elorating.service.GoogleAuthService;
import io.swagger.models.HttpMethod;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class AuthFilterTest {

    private static final String USER_TOKEN = "1a2b3c";
    public static final String GOOGLE_ID = "google_id";

    @Mock
    private GoogleAuthService googleAuthService;
    @Mock
    private LeagueRepository leagueRepository;
    @Mock
    private UserRepository userRepository;
    @Mock
    private HttpServletRequest request;
    @Mock
    private HttpServletResponse response;
    @Mock
    private FilterChain filterChain;

    @InjectMocks
    private AuthFilter authFilter;

    @Before
    public void setUp() throws Exception {
        doNothing().when(filterChain).doFilter(any(), any());
        doNothing().when(response).sendError(anyInt(), anyString());
        when(request.getRequestURI()).thenReturn("/api/leagues/12345");
        when(request.getMethod()).thenReturn(HttpMethod.POST.name());
        when(request.getHeader(anyString())).thenReturn(USER_TOKEN);
        League league = new League("12345");
        league.addUser(new User());
        when(leagueRepository.findById(anyString())).thenReturn(Optional.of(league));
    }

    @Test
    public void testDoFilterInternalLeagueIdNull() throws Exception {
        when(request.getRequestURI()).thenReturn("/api/users/12345");
        authFilter.doFilterInternal(request, response, filterChain);
        Mockito.verify(filterChain, Mockito.times(1)).doFilter(any(), any());
    }

    @Test
    public void testDoFilterInternalToShortURI() throws Exception {
        when(request.getRequestURI()).thenReturn("/api");
        authFilter.doFilterInternal(request, response, filterChain);
        Mockito.verify(filterChain, Mockito.times(1)).doFilter(any(), any());
    }

    @Test
    public void testDoFilterInternalMethodGET() throws Exception {
        when(request.getMethod()).thenReturn(HttpMethod.GET.name());
        authFilter.doFilterInternal(request, response, filterChain);
        Mockito.verify(filterChain, Mockito.times(1)).doFilter(any(), any());
    }

    @Test
    public void testDoFilterInternalMethodOPTIONS() throws Exception {
        when(request.getMethod()).thenReturn(HttpMethod.OPTIONS.name());
        authFilter.doFilterInternal(request, response, filterChain);
        Mockito.verify(filterChain, Mockito.times(1)).doFilter(any(), any());
    }

    @Test
    public void testDoFilterInternalLeagueUnassigned() throws Exception {
        when(leagueRepository.findById(anyString())).thenReturn(Optional.of(new League()));
        authFilter.doFilterInternal(request, response, filterChain);
        Mockito.verify(filterChain, Mockito.times(1)).doFilter(any(), any());
    }

    @Test
    public void testDoFilterInternalUserNull() throws Exception {
        when(googleAuthService.getUserFromToken(anyString())).thenReturn(null);
        authFilter.doFilterInternal(request, response, filterChain);
        Mockito.verify(response, Mockito.times(1)).sendError(anyInt(), anyString());
    }

    @Test
    public void testDoFilterInternalUserAuthorized() throws Exception {
        User user = new User();
        user.setGoogleId(GOOGLE_ID);
        when(googleAuthService.getUserFromToken(eq(USER_TOKEN))).thenReturn(user);
        when(userRepository.findByGoogleId(eq(GOOGLE_ID))).thenReturn(user);
        when(leagueRepository.findByIdAndUsers(anyString(), any())).thenReturn(new League());
        authFilter.doFilterInternal(request, response, filterChain);
        Mockito.verify(filterChain, Mockito.times(1)).doFilter(any(), any());
    }

    @Test
    public void testDoFilterInternalUserNotAuthorized() throws Exception {
        User user = new User();
        user.setGoogleId(GOOGLE_ID);
        when(googleAuthService.getUserFromToken(eq(USER_TOKEN))).thenReturn(user);
        when(userRepository.findByGoogleId(anyString())).thenReturn(user);
        when(leagueRepository.findByIdAndUsers(anyString(), any())).thenReturn(null);
        authFilter.doFilterInternal(request, response, filterChain);
        Mockito.verify(response, Mockito.times(1)).sendError(anyInt(), anyString());
    }
}