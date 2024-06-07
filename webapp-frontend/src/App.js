import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Welcome from './components/Welcome';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import CommentPage from './components/CommentPage'; // Import the CommentPage component

function App() {
    const [user, setUser] = useState(null);

    return (
        <Router>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        My App
                    </Typography>
                    <Button color="inherit" component={RouterLink} to="/">Welcome</Button>
                    <Button color="inherit" component={RouterLink} to="/signup">Sign Up</Button>
                    <Button color="inherit" component={RouterLink} to="/login">Login</Button>
                    {user && <Button color="inherit" component={RouterLink} to="/home">Home</Button>}
                </Toolbar>
            </AppBar>
            <Container>
                <Routes>
                    <Route path="/" element={<Welcome />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login setUser={setUser} />} />
                    <Route path="/home" element={<Home user={user} />} />
                    <Route path="/comments/:postId" element={<CommentPage user={user} />} /> {/* Add this line */}
                </Routes>
            </Container>
        </Router>
    );
}

export default App;
