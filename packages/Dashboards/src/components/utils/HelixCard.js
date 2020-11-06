import React from 'react';
import { makeStyles, Divider } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import { red } from '@material-ui/core/colors'
import HelixMenuIcon from '../utils/HelixMenuIcon'
import PropTypes from 'prop-types'

// Styling used for MaterialUI
const helixCardStyles = makeStyles(() => ({
    root: {
      maxWidth: 345,
      marginTop: '25px',
      marginLeft: '25px',
      marginRight: '40px',
      boxShadow: '0px 6px 6px -3px rgba(0,0,0,0.2), 0px 10px 14px 1px rgba(0,0,0,0.14), 0px 4px 18px 3px rgba(0,0,0,0.12)',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: '#ededed'
      }
    },
    avatar: {
      backgroundColor: red[500],
    },
    content: {
      textAlign: 'center',
    },
  }))

const HelixCard = (props) => {
  // Creates an object for styling. Any className that matches key in the helixCardStyles object will have a corresponding styling
    const helixCardClasses = helixCardStyles();

    return (
    <Card className={helixCardClasses.root} onClick={props.handleEditReport}>
      <CardHeader
        avatar={
        <Avatar aria-label="user" className={helixCardClasses.avatar}>
            {props.user.charAt(0).toUpperCase()}
        </Avatar>
        }
        action={ 
        <HelixMenuIcon 
        handleEditReport={props.handleEditReport}
        handleDeleteReport={props.handleDeleteReport}
        /> }
        title={`Last Modified by ${props.lastModifiedBy}`}
        subheader={`Created at ${props.createdAt}`}
      />
      <Divider />
      <CardContent>
          <Typography className={helixCardClasses.content} variant="h6" color="textPrimary" component="p">
          CCAR Report
          </Typography>
      </CardContent>
    </Card>
    )
}

HelixCard.propTypes = {
  user: PropTypes.string.isRequired,
  lastModifiedBy: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  handleEditReport: PropTypes.func.isRequired,
  handleDeleteReport: PropTypes.func.isRequired,
}


export default HelixCard