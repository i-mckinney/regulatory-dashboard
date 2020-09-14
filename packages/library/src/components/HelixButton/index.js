import React from 'react';
import { makeStyles, Button } from '@material-ui/core';

const buttonStyles = makeStyles((theme) => ({
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

export default function HelixButton(props) {
  /**
   * text: text string communicating to user the button action
   * size: the size of the component - 'large' 'medium' 'small'
   * color: the color of the component - 'default' 'inherit' 'primary' 'secondary'
   * onClick: the function called a onclick event
   */
  const { text, size, color, variant, onClick, ...other } = props;
  const buttonClasses = buttonStyles();

  return (
    <Button
      // || For handling instances where a prop is not communicated by the parent component
      variant={variant || 'contained'}
      size={size || 'medium'}
      color={color || 'inherit'}
      onClick={onClick}
      {...other}
      buttonClasses={{ root: buttonClasses.root, label: buttonClasses.label }}
    >
      {text}
    </Button>
  );
}
