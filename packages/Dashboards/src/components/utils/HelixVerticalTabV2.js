import React from 'react'
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
    width: '200%',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    position: 'sticky',
    left: '0',
    top: '56px',
  },
}))

function HelixVerticalTabs(props) {
  // Creates an object for styling. Any className that matches key in the verticalTabsStyles object will have a corresponding styling
  const helixVerticalTabsClasses = helixVerticalTabsStyles();

  return (
    <Box className={helixVerticalTabsClasses.container}>
      <div className={helixVerticalTabsClasses.tabContainer}>
        {props.renderAddCollection()}
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={props.value}
          onChange={props.handleChange}
          aria-label="vertical tabs"
          className={helixVerticalTabsClasses.tabs}
          indicatorColor="primary"
          textColor="primary"
        >
          {props.renderHelixTabs()}
        </Tabs>
      </div>
      {props.renderHelixPanelTabs(props.value)}
      <br />
      {props.renderButtonContainer()}
      

    </Box>
  )
}

HelixVerticalTabs.propTypes = {
  renderAddCollection: PropTypes.func.isRequired,
  renderHelixTabs: PropTypes.func.isRequired,
  renderHelixPanelTabs: PropTypes.func.isRequired,
  renderButtonContainer: PropTypes.func.isRequired,
}

HelixVerticalTabs.defaultProps = {
  renderAddCollection: () => null,
  renderButtonContainer: () => null
}


export default HelixVerticalTabs