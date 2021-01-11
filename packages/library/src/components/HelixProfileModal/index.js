import React from "react";
import { Menu, MenuItem, IconButton, Link } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import PropTypes from "prop-types";

/**
 * @param {object} topContainerClasses contains styling of useStyles for Container App
 * @return {jsx} profile modal that pops up when profile circle button is clicked in the Container Top Navbar.
 */

function ProfileModal(props) {
  const { topContainerClasses } = props;
  // anchorEl determines the target, where the modal points to when it is opened
  // const [anchorEl, setAnchorEl] = React.useState(null);
  // Boolean state to determine whether profile modal will be open or not
  // const openProfile = Boolean(anchorEl);

  /**
   * When profile circle is clicked, modal's anchor will be set
   * to the profile circle, and modal will open on top of the circle
   * */
  // const openProfileModal = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // // Closes profile modal
  // const closeProfileModal = () => {
  //   setAnchorEl(null);
  // };
  return (
    <>
      <IconButton
        className={topContainerClasses.containerUserPageButton}
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={openProfileModal}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>

      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={openProfile}
        onClose={closeProfileModal}
      >
        {displayMenuItems()}
        {/* <MenuItem>
          <Link href="/homepage">Home</Link>
        </MenuItem>
        <MenuItem>
          <Link href="/users">Profile</Link>
        </MenuItem>
        <MenuItem onClick={closeProfileModal}>My account</MenuItem>
        <MenuItem>
          <Link href="/">Log Out</Link>
        </MenuItem> */}
      </Menu>
    </>
  );
}

ProfileModal.propTypes = {
  topContainerClasses: PropTypes.instanceOf(Object).isRequired,
  displayMenuItems: PropTypes.func.isRequired,
  openProfile: PropTypes.bool.isRequired,
  openProfileModal: PropTypes.func.isRequired,
  closeProfileModal: PropTypes.func.isRequired,
};

export default ProfileModal;
