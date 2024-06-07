import React, { useState, useEffect, useCallback } from 'react';
import { Typography, Box, Container, TextField, Button, List, ListItem, ListItemText } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CommentPage = ({ user }) => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newCommentText, setNewCommentText] = useState('');

    axios.defaults.withCredentials = true;

    const fetchPost = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:8080/posts/${postId}`);
            setPost(response.data);
        } catch (error) {
            console.error('Error fetching post:', error);
        }
    }, [postId]);

    const fetchComments = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:8080/comments/post/${postId}`);
            setComments(response.data);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    }, [postId]);

    useEffect(() => {
        fetchPost();
        fetchComments();
    }, [fetchPost, fetchComments]);

    const handleCommentSubmit = async () => {
        try {
            await axios.post('http://localhost:8080/comments', {
                ctext: newCommentText,
                longitude: 0.0, // Beispielwert, ersetzen Sie ihn durch den tatsächlichen Wert
                latitude: 0.0, // Beispielwert, ersetzen Sie ihn durch den tatsächlichen Wert
                author: { id: user.id }, // Verwenden Sie die tatsächliche Benutzer-ID
                post: { id: postId } // Verwenden Sie die tatsächliche Post-ID
            });
            setNewCommentText('');
            await fetchComments(); // Aktualisieren Sie die Kommentare nach erfolgreicher Erstellung
        } catch (error) {
            console.error('Error creating comment:', error);
        }
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
                    <Typography variant="h5" gutterBottom>
                        Comments:
                    </Typography>
                    <List>
                        {comments.map((comment) => (
                            <ListItem key={comment.id}>
                                <ListItemText
                                    primary={comment.ctext}
                                    secondary={`Commented by ${comment.author.username} at ${new Date(comment.postedAt).toLocaleString()}`}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Box>
        </Container>
    );
};

export default CommentPage;
