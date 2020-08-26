import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SimpleSelect() {
  const classes = useStyles();
  const [method, setMethod] = React.useState('');

  const handleChange = (event) => {
    setMethod(event.target.value);
  };

  return (
    <div>
      <FormControl variant='outlined' className={classes.formControl}>
        <InputLabel id='method-input'>METHOD</InputLabel>
        <Select
          id='method-select'
          value={method}
          onChange={handleChange}
          label='Method'
        >
          <MenuItem value={'GET'}>GET</MenuItem>
          <MenuItem value={'POST'}>POST</MenuItem>
          <MenuItem value={'PUT'}>PUT</MenuItem>
          <MenuItem value={'PATCH'}>PATCH</MenuItem>
          <MenuItem value={'DELETE'}>DELETE</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
