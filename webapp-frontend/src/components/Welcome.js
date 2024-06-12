// src/components/Welcome.js
import React from 'react';
import { Button, Typography, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Welcome = () => {
    return (
        <Box sx={{ textAlign: 'center', mt: 8 }}>
            <Typography variant="h3" gutterBottom>
                Welcome to Jodel
            </Typography>
            <Button variant="contained" color="primary" component={RouterLink} to="/signup" sx={{ mr: 2 }}>
                Sign Up
            </Button>
            <Button variant="contained" color="secondary" component={RouterLink} to="/login">
                Login
            </Button>
        </Box>
    );
};

export default Welcome;
