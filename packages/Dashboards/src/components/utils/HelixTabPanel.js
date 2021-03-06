import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles, Box } from '@material-ui/core'

// Styling used for MaterialUI
const helixTabPanelStyles = makeStyles((theme) => ({
  canvas: {
    padding: theme.spacing(1),
  },
}))

function HelixTabPanel(props) {
  // Creates an object for styling. Any className that matches key in the helixTabPanelStyles object will have a corresponding styling
  const helixTabPanelClasses = helixTabPanelStyles()
  
  // Destruct props data into individual variables
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={1} className={helixTabPanelClasses.canvas}>
          {children}
        </Box>
      )}
    </div>
  )
}
  
HelixTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}

export default HelixTabPanel