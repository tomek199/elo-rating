package com.elorating.utils;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import org.springframework.test.util.ReflectionTestUtils;

public class JwtUtilsTest {

    @InjectMocks
    private JwtUtils jwtUtils;

    private static final String USERNAME = "Test User";
    private static final String FAKE_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJKb2UifQ.ipevRNuRP6HflG8cFKnmUPtypruRC4fb1DWtoLL62SY";

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        ReflectionTestUtils.setField(jwtUtils, "secret", "secret");
        ReflectionTestUtils.setField(jwtUtils, "expiration", 3600L);
    }

    @Test
    public void testGenerate() throws Exception {
        String token = jwtUtils.generate(USERNAME);
        Assert.assertNotNull(token);
    }

    @Test
    public void testValidateTrue() {
        String token = jwtUtils.generate(USERNAME);
        boolean isValid = jwtUtils.validate(token);
        Assert.assertTrue(isValid);
    }

    @Test
    public void testValidateFalse() {
        boolean isValid = jwtUtils.validate(FAKE_TOKEN);
        Assert.assertFalse(isValid);
    }

    @Test
    public void testGetUsername() {
        String token = jwtUtils.generate(USERNAME);
        String username = jwtUtils.getUsername(token);
        Assert.assertEquals(USERNAME, username);
    }

    @Test
    public void testGetUsernameIsNull() {
        String username = jwtUtils.getUsername(FAKE_TOKEN);
        Assert.assertNull(username);
    }
}