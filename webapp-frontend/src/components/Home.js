import React, { useState, useEffect, useCallback } from 'react';
import { Typography, Box, Container, TextField, Button, List, ListItem, ListItemText, IconButton } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import CommentIcon from '@mui/icons-material/Comment';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = ({ user }) => {
    const [posts, setPosts] = useState([]);
    const [newPostText, setNewPostText] = useState('');
    const [votes, setVotes] = useState({});

    const fetchPosts = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:8080/posts');
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    }, []);

    const fetchVotes = useCallback(async (postId) => {
        try {
            const response = await axios.get('http://localhost:8080/votes/count', {
                params: { postId }
            });
            setVotes((prevVotes) => ({
                ...prevVotes,
                [postId]: {
                    ...prevVotes[postId],
                    ...response.data
                }
            }));
        } catch (error) {
            console.error('Error fetching votes:', error);
        }
    }, []);

    const fetchUserVoteStatus = useCallback(async (postId) => {
        try {
            const response = await axios.get('http://localhost:8080/votes/hasVoted', {
                params: { postId, userId: user.id }
            });
            setVotes((prevVotes) => ({
                ...prevVotes,
                [postId]: {
                    ...prevVotes[postId],
                    userVote: response.data
                }
            }));
        } catch (error) {
            console.error('Error checking user vote status:', error);
        }
    }, [user.id]);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    useEffect(() => {
        posts.forEach((post) => {
            fetchVotes(post.id);
            fetchUserVoteStatus(post.id);
        });
    }, [posts, fetchVotes, fetchUserVoteStatus]);

    const handlePostSubmit = async () => {
        try {
            await axios.post('http://localhost:8080/posts', {
                text: newPostText,
                longitude: 0.0, // Beispielwert, ersetzen Sie ihn durch den tatsächlichen Wert
                latitude: 0.0, // Beispielwert, ersetzen Sie ihn durch den tatsächlichen Wert
                author: { id: user.id } // Verwenden Sie die tatsächliche Benutzer-ID
            });
            setNewPostText('');
            fetchPosts();
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    const handleVote = async (postId, isUpvote) => {
        try {
            await axios.post('http://localhost:8080/votes', null, {
                params: {
                    postId,
                    userId: user.id,
                    isUpvote
                }
            });
            fetchVotes(postId);
            fetchUserVoteStatus(postId);
        } catch (error) {
            console.error('Error voting:', error);
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
                                    <IconButton
                                        onClick={() => handleVote(post.id, true)}
                                        color={votes[post.id]?.userVote && votes[post.id]?.userVote.isUpvote === true ? 'primary' : 'default'}
                                    >
                                        <ThumbUpIcon />
                                    </IconButton>
                                    <Typography variant="body2" sx={{ mx: 1 }}>
                                        {votes[post.id]?.upvotes || 0}
                                    </Typography>
                                    <IconButton
                                        onClick={() => handleVote(post.id, false)}
                                        color={votes[post.id]?.userVote && votes[post.id]?.userVote.isUpvote === false ? 'primary' : 'default'}
                                    >
                                        <ThumbDownIcon />
                                    </IconButton>
                                    <Typography variant="body2" sx={{ mx: 1 }}>
                                        {votes[post.id]?.downvotes || 0}
                                    </Typography>
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
