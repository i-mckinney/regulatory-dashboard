import React, { useState } from 'react'
import { makeStyles, Box, Tabs } from '@material-ui/core'

const verticalTabsStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
    gridTemplateColumns: 'minmax(125px, 15%) 1fr',
    display: 'grid',
    width: '100%',
    justifyContent: 'space-between',
  },
  tabContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    position: 'sticky',
    left: '0',
    top: '0',
  },
}))

function VerticalTabs(props) {
  const verticalTabsClasses = verticalTabsStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    console.log(newValue)
    setValue(newValue);
  }

  return (
    <Box className={verticalTabsClasses.container}>
      <div className={verticalTabsClasses.tabContainer}>
        {props.renderAddCollection()}
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="vertical tabs"
          className={verticalTabsClasses.tabs}
          indicatorColor="primary"
          textColor="primary"
        >
          {props.renderTabs()}
        </Tabs>
      </div>
        {props.renderHelixPanelTabs(value)}
    </Box>
  )
}

export default VerticalTabs