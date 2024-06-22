import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSelector,useDispatch } from 'react-redux'
import { loginUser } from '../actions/userAction';
import { useNavigate,useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const defaultTheme = createTheme();

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading, isAuthenticated, error,user } = useSelector((state) => state.user);
  console.log( loading, isAuthenticated, error,user )

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
      dispatch(loginUser(data.get('email'),data.get('password')))
  }

  const adminRedirect = location.search ? location.search.split("=")[1] : "admin/dashboard"

      useEffect(() => {
        // if (error) {
        //     enqueueSnackbar(error, { variant: "error" });
        //     dispatch(clearErrors());
        // }
        if (isAuthenticated) {
            if(user.role == 'admin'){
                console.log(user)
                console.log(`/${adminRedirect}`)
                navigate(`/${adminRedirect}`)
            }
            if(user.role == 'user'){
                navigate('/home')
            }
        }
    }, [dispatch, error, isAuthenticated, navigate])

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
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="UserName"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}