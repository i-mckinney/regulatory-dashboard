import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {Grid, Box, Paper, IconButton} from '@material-ui/core'
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/DeleteOutline';

/**
 * @param {string} keyName the key passed down from the parent component
 * @param {function} onEdit updates matching keyName property 
 * @param {function} onDelete removes matching keyName property
 * @return {JSX} a dynamically generated card component displaying key name property
 */
 
const TableKeysCard = ({ keyName, value, onEdit, onDelete }) => {
  // Handles edit dialog open and close 
  const [ openDialog, setOpenDialog ] = useState(false)

  return (
    <Box>
      <Grid container>
        <Grid item md={12}>
          <Paper elevation={1}>
            <Box display='flex' p={1}>
              <Box p={1} flexGrow={1}><p>{keyName}</p>
              </Box>
              <Box p={1}>
                <IconButton
                aria-label="edit"
                size="medium"
                edge="start"
                color="primary"
                onClick = {() => setOpenDialog(true)}
                >
                  <CreateIcon />
                </IconButton>
                <IconButton
                aria-label="delete"
                size="medium"
                edge="false"
                color="secondary"
                onClick={onDelete}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>  
    </Box>
  )
}

export default TableKeysCard
