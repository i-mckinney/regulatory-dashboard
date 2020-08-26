import React from 'react';
import './App.css';
import {
  makeStyles,
  CssBaseline,
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core';
import ClientRequestsPage from './pages/ClientRequestsPage/ClientRequestsPage';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#333996',
      light: '#3c44b126',
    },
    secondary: {
      main: '#f83245',
      light: '#f8324526',
    },
    background: {
      default: '#f4f5fd',
    },
  },
  overrides: {
    MuiAppBar: {
      root: {
        transform: 'translateZ(0)',
      },
    },
  },
  props: {
    MuiIconButton: {
      disableRipple: true,
    },
  },
});

const useStyles = makeStyles({
  companyViewMain: {
    paddingLeft: '200px',
    paddingRight: '200px',
    width: '100%',
  },
});

function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.companyViewMain}>
        <ClientRequestsPage />
      </div>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
