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
    },
    avatar: {
      backgroundColor: red[500],
    },
  }))

const HelixCard = () => {
    const helixCardclasses = helixCardStyles();

    return (
    <Card className={helixCardclasses.root}>
        <CardHeader
            avatar={
            <Avatar aria-label="user" className={helixCardclasses.avatar}>
                R
            </Avatar>
            }
            action={ <HelixMenuIcon /> }
            title="Last Modified by Ray"
            subheader="Created at 01/01/2019"
        />
        <Divider />
        <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
            CCAR Report
            </Typography>
        </CardContent>
    </Card>
    )
}

export default HelixCard