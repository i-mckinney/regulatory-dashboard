import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Popper from '@material-ui/core/Popper';


const options = ['Save As'];

export default function SplitButton() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleClick = () => {
    // Save changes to defined API Call
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <Grid container direction='row' alignItems='center'>
      <Grid item xs={12}>
        <ButtonGroup
          variant='contained'
          color='transparent'
          ref={anchorRef}
          aria-label='split button'
        >
          <Button onClick={handleClick}>Save</Button>
          <Button
            color='primary'
            size='small'
            aria-controls={open ? 'split-button-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-label='save as'
            aria-haspopup='menu'
            onClick={handleToggle}
          >
            <ArrowDropDownIcon />
          </Button>
        </ButtonGroup>

        <Popper><p>test</p></Popper>
      </Grid>
    </Grid>
  );
}
