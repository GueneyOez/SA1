import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { TextField, Button, Typography, Box, Container, IconButton, Tooltip } from '@mui/material';
import { Facebook, Google, Twitter, GitHub } from '@mui/icons-material';
import axios from 'axios';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async () => {
        try {
            await axios.post('http://localhost:8081/users/register', { username, password });
            navigate('/login');
        } catch (error) {
            setError(error.response ? error.response.data : 'Signup error');
        }
    };

    const handleGitHubSignup = () => {
        window.location.href = 'http://localhost:8081/login';
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 8, textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 500 }}>
                    Sign Up
                </Typography>
                <Typography variant="h6" style={{ fontFamily: 'Roboto, sans-serif' }}>Sign up with:</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <Tooltip title="Placeholder for Facebook signup">
                        <span>
                            <IconButton disabled>
                                <Facebook />
                            </IconButton>
                        </span>
                    </Tooltip>
                    <Tooltip title="Placeholder for Google signup">
                        <span>
                            <IconButton disabled>
                                <Google />
                            </IconButton>
                        </span>
                    </Tooltip>
                    <Tooltip title="Placeholder for Twitter signup">
                        <span>
                            <IconButton disabled>
                                <Twitter />
                            </IconButton>
                        </span>
                    </Tooltip>
                    <Tooltip title="Sign up with GitHub">
                        <IconButton onClick={handleGitHubSignup}>
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
                <Button variant="contained" color="primary" onClick={handleSignup} sx={{ mt: 2, py: 1.5 }} fullWidth>
                    Sign Up
                </Button>
                <Typography variant="body1" sx={{ mt: 2 }}>
                    Already a member? <RouterLink to="/login" style={{ textDecoration: 'none', color: '#3f51b5' }}>Sign in</RouterLink>
                </Typography>
            </Box>
        </Container>
    );
};

export default Signup;
