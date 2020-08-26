import React from 'react';
import AddApiForm from './AddApiForm';
import PageHeader from '../../layout/PageHeader';
import CodeIcon from '@material-ui/icons/Code';
import { Paper, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
}));

export default function ClientApiCalls() {
  const classes = useStyles();
  return (
    <>
      <PageHeader
        title='Client API Interface'
        subTitle='Add, Edit and Save API Request'
        icon={<CodeIcon fontSize='large' />}
      />
      <Paper className={classes.pageContent}>
        <AddApiForm />
      </Paper>
    </>
  );
}
