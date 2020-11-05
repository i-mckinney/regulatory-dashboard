import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader'; 
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

// MAPPED KEY TRANSFER LIST
/* 
Displays a transferable list of keys provided by the responseMapped data object associated
with the given API response. Select keys and move from selectedResponseKeys to availableResponseKeys to save and send to CompanyBackend 
   */


const useTransferListStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
  },
  cardHeader: {
    padding: theme.spacing(1, 2),
  },
  list: {
    width: 200,
    height: 230,
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
}));

// Material UI Transfer List Component
function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

// Material UI Transfer List Component
function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

// Material UI Transfer List Component
function union(a, b) {
  return [...a, ...not(b, a)];
}


/**
 * @return {JSX} returns Material UI transfer list component fro selecting mapped response keys that are to be sent to the backend
  

 */
export default function TransferList({ availableResponseKeys, setAvailableResponseKeys, selectedResponseKeys, setSelectedResponseKeys}) {
  const transferListClasses = useTransferListStyles();
  const [checked, setChecked] = React.useState([]);
  //const [availableResponseKeys, setAvailableResponseKeys] = React.useState(keys);
  //const [selectedResponseKeys, setSelectedResponseKeys] = React.useState(mappedKeys);

  // useEffect(() => {
  //   setKeys(selectedResponseKeys)
  // }, [selectedResponseKeys, setKeys])

  // useEffect(() => {
  //   setAvailableResponseKeys(keys)
  //   setSelectedResponseKeys(mappedKeys)
  // }, [keys, mappedKeys])


  const leftChecked = intersection(checked, availableResponseKeys);
  const rightChecked = intersection(checked, selectedResponseKeys);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setSelectedResponseKeys(selectedResponseKeys.concat(leftChecked));
    setAvailableResponseKeys(not(availableResponseKeys, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setAvailableResponseKeys(availableResponseKeys.concat(rightChecked));
    setSelectedResponseKeys(not(selectedResponseKeys, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  /** @return {JSX} returns a custom list of mapped keys
    * @param {string} title the custom list title to distinguish selectedResponseKeys from availableResponseKeys
    * @param {object} items object containing all available list items
 */
  const customList = (title, items) => (
    <Card>
      <CardHeader
        className={transferListClasses.cardHeader}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
            disabled={items.length === 0}
            inputProps={{ 'aria-label': 'all items selected' }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <List className={transferListClasses.list} dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItem key={value} role="listitem" button onClick={handleToggle(value)}>
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );

  return (
    <Grid container spacing={2} justify="center" alignItems="center" className={transferListClasses.root}>
      <Grid item>{customList('Available Response Keys', availableResponseKeys)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            variant="outlined"
            size="small"
            className={transferListClasses.button}
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected selectedResponseKeys"
          >
            &gt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={transferListClasses.button}
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected availableResponseKeys"
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList('Selected Response Keys', selectedResponseKeys)}</Grid>
    </Grid>
  );
}