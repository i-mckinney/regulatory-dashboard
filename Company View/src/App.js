import React from 'react';
import './App.css';
import SideMenu from './layout/SideMenu';
import {
  makeStyles,
  CssBaseline,
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core';
import Header from './layout/Header';
import PageHeader from './layout/PageHeader';
import CodeIcon from '@material-ui/icons/Code';
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
  appMain: {
    paddingLeft: '320px',
    width: '100%',
  },
});

function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <SideMenu />
      <div className={classes.appMain}>
        <Header />
        <PageHeader
          title='Client API Interface'
          subTitle='Add, Edit and Save API Request'
          icon={<CodeIcon fontSize='large' />}
        />
      </div>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
