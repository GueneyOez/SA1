import React, { useState, useEffect, useCallback } from 'react';
import { Typography, Box, Container, TextField, Button, List, ListItem, ListItemText, IconButton } from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = ({ user }) => {
    const [posts, setPosts] = useState([]);
    const [newPostText, setNewPostText] = useState('');

    const fetchPosts = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:8080/posts');
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    }, []);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    const handlePostSubmit = async () => {
        try {
            await axios.post('http://localhost:8080/posts', {
                text: newPostText,
                longitude: 0.0,
                latitude: 0.0,
                author: { id: user.id }
            });
            setNewPostText('');
            fetchPosts();
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
                                <ListItemText
                                    primary={post.text}
                                    secondary={`Posted by ${post.author.username} at ${new Date(post.postedAt).toLocaleString()}`}
                                />
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <IconButton component={Link} to={`/comments/${post.id}`}>
                                        <CommentIcon />
                                    </IconButton>
                                </Box>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Box>
        </Container>
    );
};

export default Home;
