import React from "react";
import { Menu, MenuItem, IconButton, Badge} from "@material-ui/core";
import NotificationsIcon from "@material-ui/icons/Notifications";
import PropTypes from "prop-types";

/**
 * @param {object} topContainerClasses contains styling of useStyles for Container App
 * @return {jsx} Notification modal that pops up when notification circle button is clicked in the Container Top Navbar.
 */

function NotificationsModal(props) {
  const { topContainerClasses } = props;
  // anchorEl determines the target, where the modal points to when it is opened
  const [anchorEl, setAnchorEl] = React.useState(null);
  // Boolean state to determine whether notification modal will be open or not
  const openNotifications = Boolean(anchorEl);
  // numNotifications gives number of new notifications
  const [numNotifications, setNumNotifications] = React.useState(0);

  /**
   * When notification circle is clicked, modal's anchor will be set
   * to the notification circle, and modal will open on top of the circle
   * */
  const openNotificationModal = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Closes notification modal
  const closeNotificationModal = () => {
    setNumNotifications(0)
    setAnchorEl(null);
  };

  // Dummy function to demonstrate notification display
  const addNotification = () => {
    setNumNotifications(numNotifications+1)
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton
        className={topContainerClasses.containerNotificationPageButton}
        aria-label="notifications of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={openNotificationModal}
        color="inherit"
      >
        <Badge  badgeContent={numNotifications} color="secondary"> 
            <NotificationsIcon />
        </Badge>
      </IconButton>

      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={openNotifications}
        onClose={()=>{setAnchorEl(null)}}
      >
        <MenuItem onClick={closeNotificationModal}>Close and set to zero</MenuItem>
        <MenuItem onClick={addNotification}>Add notification</MenuItem>
      </Menu>
    </>
  );
}

NotificationsModal.propTypes = {
  topContainerClasses: PropTypes.instanceOf(Object).isRequired,
};

export default NotificationsModal;
