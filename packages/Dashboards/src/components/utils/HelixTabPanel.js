import React from 'react'
import PropTypes from 'prop-types'
import { Box, Typography } from '@material-ui/core'

function HelixTabPanel(props) {
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
          <Box p={3}>
            <Typography>{children}</Typography>
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