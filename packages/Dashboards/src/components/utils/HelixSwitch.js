import React from 'react'
import { makeStyles } from '@material-ui/core'
import Switch from '@material-ui/core/Switch'

// Styling used for MaterialUI
const helixSwitchStyles = makeStyles((theme) => ({
    root: {
      width: 42,
      height: 26,
      padding: 0,
      margin: theme.spacing(1),
    },
    switchBase: {
      padding: 1,
      '&$checked': {
        transform: 'translateX(16px)',
        color: theme.palette.common.white,
        '& + $track': {
          backgroundColor: '#52d869',
          opacity: 1,
          border: 'none',
        },
      },
      '&$focusVisible $thumb': {
        color: '#52d869',
        border: '6px solid #fff',
      },
    },
    thumb: {
      width: 24,
      height: 24,
    },
    track: {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.grey[1000],
      opacity: .38,
      transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
    focusVisible: {},
  }))
  
const HelixSwitch = (props) => {
    // Creates an object for styling. Any className that matches key in the reportArchiveStyles object will have a corresponding styling
    const helixSwitchClasses = helixSwitchStyles()

    return (
        <Switch
            focusVisibleClassName={helixSwitchClasses.focusVisible}
            disableRipple
            classes={{
            root: helixSwitchClasses.root,
            switchBase: helixSwitchClasses.switchBase,
            thumb: helixSwitchClasses.thumb,
            track: helixSwitchClasses.track,
            checked: helixSwitchClasses.checked,
            }}
            {...props}
        />
    )
}

export default HelixSwitch
  