import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles, Box, Typography } from '@material-ui/core'

const helixTabPanelStyles = makeStyles((theme) => ({
  canvas: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
  },
}))

function HelixTabPanel(props) {
    const helixTabPanelClasses = helixTabPanelStyles()
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