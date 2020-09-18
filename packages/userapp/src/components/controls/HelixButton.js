import React from 'react';
import { Button } from '@material-ui/core';

/**
 * @return {JSX} returns a reusable button form control component
 */
export default function HelixButton(props) {
  /**
   * size: the size of the component - 'large' 'medium' 'small'
   * color: the color of the component - 'default' 'inherit' 'primary' 'secondary'
   * onClick: the function called a onclick event
   */
  const { size, color, variant, onClick, ...other } = props

  return (
    <Button
      // || For handling instances where a prop is not communicated by the parent component
      variant={variant || 'contained'}
      size={size || 'medium'}
      color={color || 'inherit'}
      onClick={onClick}
      {...other}
    >
    </Button>
  )
}
