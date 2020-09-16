import React from 'react';
import { Button as MuiButton, makeStyles } from '@material-ui/core';

const useButtonStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0.5),
  },
  label: {
    textTransform: 'none',
  },
}));

/**
 * @return {JSX} returns a reusable button form control component
 */
export default function Button(props) {
  /**
   * text: text string communicating to user the button action
   * size: the size of the component - 'large' 'medium' 'small'
   * color: the color of the component - 'default' 'inherit' 'primary' 'secondary'
   * onClick: the function called a onclick event
   */
  const { text, size, color, variant, onClick, ...other } = props;
  const buttonClasses = useButtonStyles();

  return (
    <MuiButton
      variant={variant || 'contained'}
      size={size || 'large'}
      color={color || 'secondary'}
      onClick={onClick}
      {...other}
      buttonClasses={{ root: buttonClasses.root, label: buttonClasses.label }}
    >
      {text}
    </MuiButton>
  );
}
