// src/components/LoginPage.js
import React, { useEffect, useState } from 'react';
import { TextField, Button, Container, Paper, Typography, Box } from '@mui/material';
import { login } from '../../api-helpers';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async() => {
    // Handle login logic here
    // console.log('Logging in with:', { username, password });
    const res = await login({ email: username, password });
    // console.log(res.admin._id);
    
    if(res.success){
        const adminInfo = JSON.stringify({_id: res.admin._id, email: res.admin.email});
        localStorage.setItem('admin', adminInfo);
        window.location.href = `/dashboard/${res.admin._id}`;
    }
    else{
        setMessage(res.error);
    }
  };

  useEffect(() => {
  }, [message]);

  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: '50px', marginBottom: '250px' }}>
      <Paper elevation={3} style={{ padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5">Login</Typography>
        <form style={{ width: '100%', marginTop: 20 }}>
          <TextField
            label="Username"
            variant="outlined"
            margin="normal"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            variant="outlined"
            margin="normal"
            fullWidth
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Box marginBottom={2}>
            <Typography variant="body2" style={{ marginTop: 20, textAlign: 'center', color: 'red' }}>
                {message}
            </Typography>
          </Box>
          <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginPage;
