import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { TextField, Button, Typography, Box, Container, IconButton, Tooltip } from '@mui/material';
import { Facebook, Google, Twitter, GitHub } from '@mui/icons-material';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            await axios.post('http://localhost:8080/users/login', { username, password });
            navigate('/home');
        } catch (error) {
            setError(error.response ? error.response.data : 'Login error');
        }
    };

    const handleGitHubLogin = () => {
        window.location.href = 'http://localhost:8080/login';
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 8, textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 500 }}>
                    Sign In
                </Typography>
                <Typography variant="h6" style={{ fontFamily: 'Roboto, sans-serif' }}>Sign in with:</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <Tooltip title="Placeholder for Facebook login">
                        <span>
                            <IconButton disabled>
                                <Facebook />
                            </IconButton>
                        </span>
                    </Tooltip>
                    <Tooltip title="Placeholder for Google login">
                        <span>
                            <IconButton disabled>
                                <Google />
                            </IconButton>
                        </span>
                    </Tooltip>
                    <Tooltip title="Placeholder for Twitter login">
                        <span>
                            <IconButton disabled>
                                <Twitter />
                            </IconButton>
                        </span>
                    </Tooltip>
                    <Tooltip title="Sign in with GitHub">
                        <IconButton onClick={handleGitHubLogin}>
                            <GitHub />
                        </IconButton>
                    </Tooltip>
                </Box>
                <Typography variant="h6" sx={{ mt: 2 }} style={{ fontFamily: 'Roboto, sans-serif' }}>or:</Typography>
                {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
                <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <Button variant="contained" color="primary" onClick={handleLogin} sx={{ mt: 2, py: 1.5 }} fullWidth>
                    Sign In
                </Button>
                <Typography variant="body1" sx={{ mt: 2 }}>
                    Not a member? <RouterLink to="/signup" style={{ textDecoration: 'none', color: '#3f51b5' }}>Register</RouterLink>
                </Typography>
            </Box>
        </Container>
    );
};

export default Login;
