import React, { useState, useEffect } from 'react';
import { Typography, Box, Container, TextField, Button, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [newPostText, setNewPostText] = useState('');

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await axios.get('http://localhost:8080/posts');
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const handlePostSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:8080/posts', {
                text: newPostText,
                // You need to pass additional fields required by the backend like longitude, latitude, and authorId
                longitude: 0.0, // Example value, replace with actual value
                latitude: 0.0, // Example value, replace with actual value
                author: { id: 1 } // Example value, replace with actual value
            });
            setNewPostText('');
            fetchPosts(); // Refresh posts after successful post creation
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    return (
        <Container maxWidth="md">
            <Box sx={{ mt: 8 }}>
                <Typography variant="h3" gutterBottom>
                    Home Page
                </Typography>
                <Typography variant="body1">
                    Welcome to the homepage! This is where you will see your personalized content.
                </Typography>
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
                            <ListItem key={post.id}>
                                <ListItemText
                                    primary={post.text}
                                    secondary={`Posted by ${post.author.name} at ${new Date(post.postedAt).toLocaleString()}`}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Box>
        </Container>
    );
};

export default Home;
