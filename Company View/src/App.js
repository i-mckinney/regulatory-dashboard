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
    background: {
      default: '#f4f5fd',
    },
  },
  props: {},
});

const AppStyles = makeStyles({
  companyViewMain: {
    paddingLeft: '10%',
    paddingRight: '10%',
    width: '100%',
  },
});

function App() {
  const AppClasses = AppStyles();

  return (
    <ThemeProvider theme={theme}>
      <div className={AppClasses.companyViewMain}>
        <ClientRequestsPage />
      </div>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
