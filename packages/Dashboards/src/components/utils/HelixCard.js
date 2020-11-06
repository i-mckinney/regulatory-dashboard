import React from 'react';
import { makeStyles, Divider } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import { red } from '@material-ui/core/colors'
import HelixMenuIcon from '../utils/HelixMenuIcon'

const helixCardStyles = makeStyles(() => ({
    root: {
      maxWidth: 345,
      margin: '25px',
    },
    avatar: {
      backgroundColor: red[500],
    },
    content: {
      textAlign: 'center',
    },
  }))

const HelixCard = (props) => {
    const helixCardClasses = helixCardStyles();

    return (
    <Card className={helixCardClasses.root}>
        <CardHeader
          avatar={
          <Avatar aria-label="user" className={helixCardClasses.avatar}>
              {props.user.charAt(0).toUpperCase()}
          </Avatar>
          }
          action={ <HelixMenuIcon /> }
          title={`Last Modified by ${props.lastModifiedBy}`}
          subheader={props.createdAt}
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

export default HelixCard