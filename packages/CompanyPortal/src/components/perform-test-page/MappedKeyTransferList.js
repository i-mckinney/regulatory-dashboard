import React from 'react';
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

// MAPPED KEY TRANSFER LIST COMPONENT
/* 
Displays a transferable list of keys provided by the externalSourceData and responseMapped data objects
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

// Material UI Transfer List Component default behavior
function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

/**
 * @param {Object} availableResponseKeys list of available keys provided by the external data source
 * @param {Object} selectedResponseKeys list of keys selected using the response mapping tool
 * @returns {JSX} returns Material UI transfer list component fro selecting mapped response keys that are to be sent to the backend
 */
export default function TransferList({ availableResponseKeys, setAvailableResponseKeys, selectedResponseKeys, setSelectedResponseKeys}) {
  const transferListClasses = useTransferListStyles();
  // Checked store array of keys that are ready to move to the available or selected list 
  const [checked, setChecked] = React.useState([]);

  const leftChecked = intersection(checked, availableResponseKeys);
  const rightChecked = intersection(checked, selectedResponseKeys);

  /**
  * @param {String} value represents the key input name
  */
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

  /**
   * @param {Array} items represents an array of keys
   * @return the length of checked keys
   */
  const numberOfChecked = (items) => intersection(checked, items).length;

  /**
   * @param {array} items represents an array of roles 
   */
  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  /**
   * handleCheckedRight changes the state for availableResponseKeys and selectedResponseKeys
   */
  const handleCheckedRight = () => {
    setSelectedResponseKeys(selectedResponseKeys.concat(leftChecked));
    setAvailableResponseKeys(not(availableResponseKeys, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  /**
   * handleCheckedRight changes the state for availableResponseKeys and selectedResponseKeys
   */
  const handleCheckedLeft = () => {
    setAvailableResponseKeys(availableResponseKeys.concat(rightChecked));
    setSelectedResponseKeys(not(selectedResponseKeys, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  /** 
    * @param {String} title the custom list title of either availableResponseKeys or selectedResponseKeys
    * @param {Array} items array of all keys
    * @returns {JSX} the entire TransferList component
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