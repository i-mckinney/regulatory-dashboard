import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import CustomParams from './custom-request/CustomParams';
import CustomHeaders from './custom-request/CustomHeaders';
import CustomBody from './custom-request/CustomBody';
import CustomMapping from './custom-request/CustomMapping';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

/* CUSTOMIZE REQUEST Component
* A Material UI Tab component that holds child components for setting custom request features
* Child components are CustomBody, CustomHeaders, CustomParams, and CustomMapping 
*/

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SimpleTabs({
  params,
  setParams,
  mapping,
  setMapping,
  headers,
  setHeaders,
  onSubmitRequest,
  onSave,
}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position='static' style={{ backgroundColor: 'black' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='simple tabs example'
        >
          <Tab label='Params' {...a11yProps(0)} />
          <Tab label='Headers' {...a11yProps(1)} />
          <Tab label='Body' {...a11yProps(2)} />
          <Tab label='Response Mapping Tool' {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <CustomParams fields={params} onChange={setParams} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CustomHeaders fields={headers} onChange={setHeaders} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <CustomBody />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <CustomMapping fields={mapping} onChange={setMapping} />
      </TabPanel>
    </div>
  );
}
