// src/components/CommentPage.js
import React, { useState, useEffect, useCallback } from 'react';
import { Typography, Box, Container, TextField, Button, List, ListItem, ListItemText, IconButton, MenuItem, Select, FormControl, InputLabel, Paper } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CommentPage = ({ user }) => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newCommentText, setNewCommentText] = useState('');
    const [votes, setVotes] = useState({});
    const [sortOption, setSortOption] = useState('newest');

    axios.defaults.withCredentials = true;

    const fetchPost = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:8081/posts/${postId}`);
            setPost(response.data);
        } catch (error) {
            console.error('Error fetching post:', error);
        }
    }, [postId]);

    const fetchComments = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:8081/comments/post/${postId}`);
            setComments(response.data);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    }, [postId]);

    const fetchVotes = useCallback(async (commentId) => {
        try {
            const response = await axios.get(`http://localhost:8081/votes/count`, {
                params: { commentId }
            });
            setVotes((prevVotes) => ({
                ...prevVotes,
                [commentId]: {
                    ...prevVotes[commentId],
                    ...response.data
                }
            }));
        } catch (error) {
            console.error('Error fetching votes:', error);
        }
    }, []);

    const fetchUserVoteStatus = useCallback(async (commentId) => {
        try {
            const response = await axios.get(`http://localhost:8081/votes/hasVoted`, {
                params: { commentId, userId: user.id }
            });
            setVotes((prevVotes) => ({
                ...prevVotes,
                [commentId]: {
                    ...prevVotes[commentId],
                    userVote: response.data
                }
            }));
        } catch (error) {
            console.error('Error checking user vote status:', error);
        }
    }, [user.id]);

    useEffect(() => {
        fetchPost();
        fetchComments();
    }, [fetchPost, fetchComments]);

    useEffect(() => {
        comments.forEach((comment) => {
            fetchVotes(comment.id);
            fetchUserVoteStatus(comment.id);
        });
    }, [comments, fetchVotes, fetchUserVoteStatus]);

    const handleCommentSubmit = async () => {
        try {
            await axios.post('http://localhost:8081/comments', {
                ctext: newCommentText,
                longitude: 0.0,
                latitude: 0.0,
                author: { id: user.id },
                post: { id: postId }
            });
            setNewCommentText('');
            await fetchComments();
        } catch (error) {
            console.error('Error creating comment:', error);
        }
    };

    const handleVote = async (commentId, isUpvote) => {
        try {
            await axios.post('http://localhost:8081/votes', null, {
                params: {
                    commentId,
                    userId: user.id,
                    isUpvote
                }
            });
            fetchVotes(commentId);
            fetchUserVoteStatus(commentId);
        } catch (error) {
            console.error('Error voting:', error);
        }
    };

    const sortComments = (comments) => {
        if (sortOption === 'newest') {
            return [...comments].sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt));
        } else if (sortOption === 'mostLikes') {
            return [...comments].sort((a, b) => (votes[b.id]?.upvotes || 0) - (votes[a.id]?.upvotes || 0));
        }
        return comments;
    };

    if (!post) return <div>Loading...</div>;

    return (
        <Container maxWidth="md">
            <Box sx={{ mt: 8 }}>
                <Typography variant="h4" gutterBottom>
                    {post.text}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    Posted by {post.author.username} at {new Date(post.postedAt).toLocaleString()}
                </Typography>
                <Box sx={{ mt: 4 }}>
                    <TextField
                        label="Write a new comment"
                        multiline
                        rows={4}
                        variant="outlined"
                        fullWidth
                        value={newCommentText}
                        onChange={(e) => setNewCommentText(e.target.value)}
                    />
                    <Button variant="contained" color="primary" onClick={handleCommentSubmit} sx={{ mt: 2 }}>
                        Comment
                    </Button>
                </Box>
                <Box sx={{ mt: 4 }}>
                    <FormControl variant="outlined" sx={{ minWidth: 120, mb: 2 }}>
                        <InputLabel id="sort-label">Sort By</InputLabel>
                        <Select
                            labelId="sort-label"
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                            label="Sort By"
                        >
                            <MenuItem value="newest">Newest</MenuItem>
                            <MenuItem value="mostLikes">Most Likes</MenuItem>
                        </Select>
                    </FormControl>
                    <Typography variant="h5" gutterBottom>
                        Comments:
                    </Typography>
                    <List>
                        {sortComments(comments).map((comment) => (
                            <ListItem key={comment.id} alignItems="flex-start">
                                <Paper elevation={3} sx={{ width: '100%', padding: 2 }}>
                                    <ListItemText
                                        primary={comment.ctext}
                                        secondary={`Commented by ${comment.author.username} at ${new Date(comment.postedAt).toLocaleString()}`}
                                    />
                                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                                        <IconButton
                                            onClick={() => handleVote(comment.id, true)}
                                            color={votes[comment.id]?.userVote && votes[comment.id]?.userVote.isUpvote === true ? 'primary' : 'default'}
                                        >
                                            <ThumbUpIcon />
                                        </IconButton>
                                        <Typography variant="body2" sx={{ mx: 1 }}>
                                            {votes[comment.id]?.upvotes || 0}
                                        </Typography>
                                        <IconButton
                                            onClick={() => handleVote(comment.id, false)}
                                            color={votes[comment.id]?.userVote && votes[comment.id]?.userVote.isUpvote === false ? 'primary' : 'default'}
                                        >
                                            <ThumbDownIcon />
                                        </IconButton>
                                        <Typography variant="body2" sx={{ mx: 1 }}>
                                            {votes[comment.id]?.downvotes || 0}
                                        </Typography>
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

export default CommentPage;
