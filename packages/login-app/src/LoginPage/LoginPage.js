import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Redirect from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { gql, useMutation, useApolloClient } from '@apollo/client'

// Add to shared component library and import
function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://www.helixcp.com/'>
        Helix Consulting Partners
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useLoginPageStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: 'grey',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    color: 'white',
    background: 'primary',
    margin: theme.spacing(3, 0, 2),
  },
}));

const LOGIN = gql`
  mutation login(
    $email: String!,
    $password: String!
  ) {
    login(input: {
      email:$email,
      password:$password
    }) {
      user {
        email
      }
    }
  }
`;

const REGISTER = gql`
  mutation register($input:AuthInput!) {
    register(input: $input) {
      user {
        email
      }
      errors {
        message
      }
    }
  }
`


export default function Login() {
  const loginPageClasses = useLoginPageStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [newEmail, registerEmail] = useState("");
  const [newPassword, registerPassword] = useState("");

  const client = useApolloClient();

  const handleRegister = async (evt) => {
    //prevents page from reloading on form submission
    evt.preventDefault();
    await register({ variables: { input: { email: newEmail, password: newPassword } }, notifyOnNetworkStatusChange: true })
    alert(`Submitting Name: ${newEmail}`)
  }

  const handleLogin = async (evt) => {
    evt.preventDefault();
    await login({ variables: { email: email, password: password }, notifyOnNetworkStatusChange: true })
    alert(`Logging in email: ${email}`)
  }

  const [login, { data }] = useMutation(LOGIN, {
    onCompleted({ data }) {
      console.log(data)
      localStorage.setItem("token", data);
      return window.location = '/'
    }
  });
  const [register, { data2 }] = useMutation(REGISTER, {
    onCompleted({ data2 }) {
      console.log(data2)
    }
  });

  return (
    <>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={loginPageClasses.paper}>
          <Avatar className={loginPageClasses.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Register
        </Typography>
          <form className={loginPageClasses.form} noValidate onSubmit={handleRegister}>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
              value={newEmail}
              onChange={(e) => registerEmail(e.target.value)}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
              value={newPassword}
              onChange={(e) => registerPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value='remember' color='primary' />}
              label='Remember me'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={loginPageClasses.submit}
            >
              Register
          </Button>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={loginPageClasses.paper}>
          <Avatar className={loginPageClasses.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Login
          </Typography>
          <form className={loginPageClasses.form} noValidate onSubmit={handleLogin}>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value='remember' color='primary' />}
              label='Remember me'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={loginPageClasses.submit}
            >
              Login
            </Button>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </>
  );
}
