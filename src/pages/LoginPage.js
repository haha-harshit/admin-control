import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Make a POST request to your authentication API
      const response = await axios.post('https://club-be.onrender.com/admin/login', {
        username,
        password,
      });

      // Assuming your API returns a token upon successful login
      const token = response.data.token;

      // Save the token to localStorage
      localStorage.setItem('token', token);

      // Navigate to another screen (e.g., '/dashboard') after successful login
      navigate('/overview');
    } catch (error) {
      console.error('Login failed', error);
      // Handle login failure (show error message, etc.)
    }
  };

  return (
    <div style={{width:"100vw",height:"100vh",display:"flex",justifyContent:"center",alignItems:"center"}}>

    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5">Club Nights(Admin) - Login</Typography>
        <TextField
          label="Username"
          margin="normal"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          margin="normal"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" color="secondary" onClick={handleLogin}>
          Login
        </Button>
      </Paper>
    </Container>
    </div>

  );
};

export default Login;
