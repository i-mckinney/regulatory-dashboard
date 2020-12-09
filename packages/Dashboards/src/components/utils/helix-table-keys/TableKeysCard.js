import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {Grid, Box, Paper, IconButton} from '@material-ui/core'
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/DeleteOutline';

const TableKeysCard = () => {
  return (
    <Box>
    <Grid container>
      <Grid item md={12}>
      <Paper elevation={1}>
        <Box display='flex' p={1}>
          <Box p={1} flexGrow={1}><p>Key Name</p></Box>
          <Box p={1}>
            <IconButton
            aria-label="delete"
            size="medium"
            edge="start"
            color="primary"
            >
            <CreateIcon />

            </IconButton>
            <IconButton
            aria-label="delete"
            size="medium"
            edge="false"
            color="secondary"
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
