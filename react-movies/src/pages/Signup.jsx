import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('info');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage('');
    setMessageType('info');

    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      setMessageType('error');
      return;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters long.");
      setMessageType('error');
      return;
    }

    // console.log('Attempting signup with:', email, password); // Log removed
    setMessage("Signup successful! Please login.");
    setMessageType('success');
    setTimeout(() => navigate('/login'), 1500);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 3,
          border: '1px solid #ccc',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        }}
      >
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          Sign Up
        </Typography>
        {message && (
          <Alert severity={messageType} sx={{ width: '100%', mb: 2 }}>
            {message}
          </Alert>
        )}
        <Box component="form" onSubmit={handleSignup} noValidate sx={{ mt: 1, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            variant="outlined"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, bgcolor: 'secondary.main', '&:hover': { bgcolor: 'secondary.dark' } }}
          >
            Sign Up
          </Button>
          <Box sx={{ textAlign: 'center' }}>
            <Link href="/login" variant="body2">
              Already have an account? Login
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;