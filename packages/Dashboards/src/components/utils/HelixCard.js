import React from 'react';
import { makeStyles, Divider } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { red } from '@material-ui/core/colors'
import MoreVertIcon from '@material-ui/icons/MoreVert'

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
            <Avatar aria-label="recipe" className={helixCardclasses.avatar}>
                R
            </Avatar>
            }
            action={
            <IconButton aria-label="settings">
                <MoreVertIcon />
            </IconButton>
            }
            title="Shrimp and Chorizo Paella"
            subheader="September 14, 2016"
        />
        <Divider />
        <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
            This impressive paella is a perfect party dish and a fun meal to cook together with your
            guests. Add 1 cup of frozen peas along with the mussels, if you like.
            </Typography>
        </CardContent>
    </Card>
    )
}

export default HelixCard