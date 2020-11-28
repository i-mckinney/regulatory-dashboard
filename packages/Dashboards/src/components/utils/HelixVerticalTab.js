import React, { useState } from 'react'
import { makeStyles, Tabs, Tab, Divider } from '@material-ui/core'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import HelixTabPanel from './HelixTabPanel'

const verticalTabsStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 224,
  },
  collection: {
    backgroundColor: '#3f51b5',
    fontSize: '.8125rem',
    opacity: '1',
    minHeight: '35px',
    borderRadius: '4px',
  },
  divider: {
    marginLeft: '1rem',
    width: '5px',
    height: '100vh',
  }
}))

function VerticalTabs() {
  const verticalTabsClasses = verticalTabsStyles();
  const [value, setValue] = useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  return (
    <div className={verticalTabsClasses.root}>
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        aria-label="vertical tabs"
        className={verticalTabsClasses.myTabs}
      >
        <Tab label="Add Collection" className={verticalTabsClasses.collection} />
        <Tab label="Entities"/>
        <Tab label="Loans"/>
        <Tab label="Reports"/>
      </Tabs>
      <Divider orientation="vertical" className={verticalTabsClasses.divider} />
      <HelixTabPanel value={value} index={1}>
        Entities Content
      </HelixTabPanel>
      <HelixTabPanel value={value} index={2}>
        Loans Content
      </HelixTabPanel>
      <HelixTabPanel value={value} index={3}>
        Reports Content
      </HelixTabPanel>
    </div>
  )
}

export default VerticalTabs