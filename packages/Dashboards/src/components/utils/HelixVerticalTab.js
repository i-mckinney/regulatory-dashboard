import React, { useState } from 'react'
import { makeStyles, Tabs, Tab, Divider } from '@material-ui/core'
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
  myTabs: {
    marginTop: '1rem',
  },
  divider: {
    marginLeft: '1.5rem',
    height: '100vh',
  }
}))

function VerticalTabs(props) {
  const verticalTabsClasses = verticalTabsStyles();
  const [value, setValue] = useState(1);

  const handleChange = (event, newValue) => {
    console.log(newValue)
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
        {props.renderTabs()}
        {/* <Tab label="Add Collection" className={verticalTabsClasses.collection} />
        <Tab label="Entities"/>
        <Tab label="Loans"/>
        <Tab label="Reports"/> */}
      </Tabs>
      <Divider orientation="vertical" className={verticalTabsClasses.divider} />
      {props.renderHelixPanelTabs(value)}
    </div>
  )
}

export default VerticalTabs