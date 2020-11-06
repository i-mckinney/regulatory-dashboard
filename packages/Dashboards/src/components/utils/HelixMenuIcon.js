import React, {useState, useRef, useEffect }from 'react';
import { Grow, Paper, Popper, ClickAwayListener, MenuList, MenuItem, ListItemIcon, Typography, IconButton } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import PropTypes from 'prop-types'

const HelixMenuIcon = (props) => {
  // open is boolean instance when user clicks menu icon
  const [open, setOpen] = useState(false)

  // anchorReg is used to access the DOM event object
  const anchorRef = useRef(null)

  /**
   * @param {object} e the event object
   * handleToggle handle mouse click trigger whenever user clicks Menu
   */
  const handleToggle = (e) => {
    e.stopPropagation()
    setOpen((prevOpen) => !prevOpen)
  }

  /**
   * @param {object} event the event object
   * handleClose checks the current mouse event click whether it can close the Menu
   */
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }

    setOpen(false)
  }

  /**
   * @param {object} event the event object
   * handleListKeyDown checks if there is a tab event to close the Menu
   */
  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen(false)
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open)

  /**
   * Renders only when it is mounted at first
   * It will check when user invoke click event
   */
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus()
    }

    prevOpen.current = open;
  }, [open])

  return (
      <div>
      <IconButton 
      ref={anchorRef}
      aria-controls={open ? 'menu-list-grow' : undefined}
      aria-haspopup="true"
      aria-label="settings"
      onClick={handleToggle}>
          <MoreVertIcon />
      </IconButton>
      <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
        >
          <Paper>
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                <MenuItem onClick={props.handleEditReport}>
                  <ListItemIcon>
                      <EditIcon fontSize="small" />
                  </ListItemIcon>
                  <Typography>Edit</Typography>
                </MenuItem>
                <MenuItem onClick={props.handleDeleteReport}>
                  <ListItemIcon>
                      <DeleteIcon fontSize="small" color="secondary" />
                  </ListItemIcon>
                  <Typography>Delete</Typography>
                </MenuItem>
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
      </Popper>
    </div>
  )
}

HelixMenuIcon.propTypes = {
  handleEditReport: PropTypes.func.isRequired,
  handleDeleteReport: PropTypes.func.isRequired,
}

export default HelixMenuIcon