import React from 'react';
import { Typography, Box, Container } from '@mui/material';

const Home = () => {
    return (
        <Container maxWidth="md">
            <Box sx={{ mt: 8 }}>
                <Typography variant="h3" gutterBottom>
                    Home Page
                </Typography>
                <Typography variant="body1">
                    Welcome to the homepage! This is where you will see your personalized content.
                </Typography>
            </Box>
        </Container>
    );
};

export default Home;
