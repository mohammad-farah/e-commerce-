import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

// Define the structure of user data and response types
interface User {
    username: string;
    email: string;
    token: string;
}

interface SignupData {
    user: User;
}

interface SignupResponse {
    status: string;
    message: string;
    data: SignupData;
}

// Create a default theme for the application
const defaultTheme = createTheme();

export default function SignUp() {
    const [, setCookie] = useCookies(['token']);
    const navigate = useNavigate();

    // State for Snackbar visibility and message
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

    // Handle user registration
    const authenticateUser = async (email: string, password: string, username: string): Promise<void> => {
        try {
            const response = await axios.post<SignupResponse>('http://127.0.0.1:8000/user/register', {
                email,
                password,
                username
            });

            // Extract the token and set it in cookies
            const token = response.data.data.user.token;
            setCookie('token', token, { path: '/' });

            // Show success message and navigate after a delay
            setSnackbarMessage('Registration successful!');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
            
            // Wait for the Snackbar to be visible
            setTimeout(() => {
                navigate('/home');
            }, 3000); // Adjust the delay (3000 ms = 3 seconds) as needed

        } catch (error) {
            console.error('Registration failed', error);
            setSnackbarMessage('Registration failed');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    };

    // Handle form submission
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email') as string;
        const password = data.get('password') as string;
        const username = data.get('fullname') as string;
        authenticateUser(email, password, username);
    };

    // Handle Snackbar close
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    {/* Avatar with icon */}
                    <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    {/* Sign Up Title */}
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    {/* Form for user registration */}
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            {/* Full Name Input */}
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="given-name"
                                    name="fullname"
                                    required
                                    fullWidth
                                    id="fullname"
                                    label="Full Name"
                                    autoFocus
                                />
                            </Grid>
                            {/* Email Input */}
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            {/* Password Input */}
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                        </Grid>
                        {/* Sign Up Button */}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        {/* Link to Sign In page */}
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/signin" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>

            {/* Snackbar for feedback */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </ThemeProvider>
    );
}
