import React from 'react';
import { AppBar, Toolbar, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#fff',
  },
}));

export default function Header() {
  const classes = useStyles();

  return (
    <AppBar position='static' className={classes.root}>
      <Toolbar></Toolbar>
    </AppBar>
  );
}
