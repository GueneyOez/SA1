import React, { useState, useEffect } from 'react';
import { Typography, Box, Container, TextField, Button, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import CommentIcon from '@mui/icons-material/Comment';
import axios from 'axios';

const Home = ({ user }) => {
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
                longitude: 0.0, // Beispielwert, ersetzen Sie ihn durch den tatsächlichen Wert
                latitude: 0.0, // Beispielwert, ersetzen Sie ihn durch den tatsächlichen Wert
                author: { id: user.id } // Verwenden Sie die tatsächliche Benutzer-ID
            });
            setNewPostText('');
            fetchPosts(); // Aktualisieren Sie die Posts nach erfolgreicher Post-Erstellung
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
                                <IconButton component={Link} to={`/comments/${post.id}`}>
                                    <CommentIcon />
                                </IconButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Box>
        </Container>
    );
};

export default Home;
