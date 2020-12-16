import React, { useState } from 'react'
import { makeStyles, Box, Tabs } from '@material-ui/core'
import PropTypes from 'prop-types'

// Styling used for MaterialUI
const helixVerticalTabsStyles = makeStyles((theme) => ({
  container: {
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

function HelixVerticalTabs(props) {
  // Creates an object for styling. Any className that matches key in the verticalTabsStyles object will have a corresponding styling
  const helixVerticalTabsClasses = helixVerticalTabsStyles();
  
  // value uses 0 - 9 indexing to access tabs
  const [value, setValue] = useState(0);

  /**
   * @param {object} event the event object
   * @param {int} newValue the value the tab is selected
   */
  const handleChange = (event, newValue) => {
    console.log(newValue)
    setValue(newValue);
  }

  return (
    <Box className={helixVerticalTabsClasses.container}>
      <div className={helixVerticalTabsClasses.tabContainer}>
        {props.renderAddCollection()}
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="vertical tabs"
          className={helixVerticalTabsClasses.tabs}
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

HelixVerticalTabs.propTypes = {
  renderAddCollection: PropTypes.func.isRequired,
  renderTabs: PropTypes.func.isRequired,
  renderHelixPanelTabs: PropTypes.func.isRequired,
}

HelixVerticalTabs.defaultProps = {
  renderAddCollection: () => null
}


export default HelixVerticalTabs