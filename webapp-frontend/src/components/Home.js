import React, { useState, useEffect, useCallback } from 'react';
import { Typography, Box, Container, TextField, Button, List, ListItem, ListItemText, IconButton, Paper } from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = ({ user }) => {
    const [posts, setPosts] = useState([]);
    const [newPostText, setNewPostText] = useState('');
    const [userLocation, setUserLocation] = useState({ latitude: null, longitude: null });

    const fetchPosts = useCallback(async (latitude, longitude, radius = 10000) => {
        try {
            const response = await axios.get('http://localhost:8081/posts/within', {
                params: {
                    latitude: latitude,
                    longitude: longitude,
                    radius: radius
                }
            });
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    }, []);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation({ latitude, longitude });
            fetchPosts(latitude, longitude);
        }, (error) => {
            console.error('Error getting user location:', error);
        });
    }, [fetchPosts]);

    const handlePostSubmit = async () => {
        if (userLocation.latitude && userLocation.longitude) {
            try {
                await axios.post('http://localhost:8081/posts', {
                    text: newPostText,
                    longitude: userLocation.longitude,
                    latitude: userLocation.latitude,
                    author: { id: user.id }
                });
                setNewPostText('');
                fetchPosts(userLocation.latitude, userLocation.longitude);
            } catch (error) {
                console.error('Error creating post:', error);
            }
        } else {
            console.error('User location not available');
        }
    };

    return (
        <Container maxWidth="md">
            <Box sx={{ mt: 8 }}>
                <Typography variant="h3" gutterBottom>
                    Home Page
                </Typography>
                {user && (
                    <Typography variant="body1">
                        Welcome, {user.username}!
                    </Typography>
                )}
                <Box sx={{ mt: 4 }}>
                    <TextField
                        label="Write a new post"
                        multiline
                        rows={4}
                        variant="outlined"
                        fullWidth
                        value={newPostText}
                        onChange={(e) => setNewPostText(e.target.value)}
                    />
                    <Button variant="contained" color="primary" onClick={handlePostSubmit} sx={{ mt: 2 }}>
                        Post
                    </Button>
                </Box>
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h5" gutterBottom>
                        Posts:
                    </Typography>
                    <List>
                        {posts.map((post) => (
                            <ListItem key={post.id} alignItems="flex-start">
                                <Paper elevation={3} sx={{ width: '100%', padding: 2 }}>
                                    <ListItemText
                                        primary={post.text}
                                        secondary={`Posted by ${post.author.username} at ${new Date(post.postedAt).toLocaleString()}`}
                                    />
                                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                                        <IconButton component={Link} to={`/comments/${post.id}`}>
                                            <CommentIcon />
                                        </IconButton>
                                    </Box>
                                </Paper>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Box>
        </Container>
    );
};

export default Home;
