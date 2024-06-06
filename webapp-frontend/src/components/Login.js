import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, Container } from '@mui/material';
import axios from 'axios';

const Login = ({ setUser }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:8080/users/login', { username, password });
            setUser(response.data); // Speichern Sie die Benutzerdaten nach erfolgreichem Login
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
                <Typography variant="h4" gutterBottom>
                    Login
                </Typography>
                {error && <Typography color="error">{error}</Typography>}
                <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button variant="contained" color="primary" onClick={handleLogin} sx={{ mt: 2 }}>
                    Login
                </Button>
                <Typography variant="body1" sx={{ mt: 4 }}>or</Typography>
                <Button variant="contained" color="secondary" onClick={handleGitHubLogin} sx={{ mt: 2 }}>
                    Login with GitHub
                </Button>
            </Box>
        </Container>
    );
};

export default Login;
