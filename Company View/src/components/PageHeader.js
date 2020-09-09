import React from 'react'
import { Paper, Card, Typography, makeStyles } from '@material-ui/core'

const pageHeaderStyles = makeStyles(theme => ({
    root: {
        backgroundColor: '#fdfdff'
    },
    pageHeader:{
        padding:theme.spacing(4),
        display:'flex',
        marginBottom:theme.spacing(2)
    },
    pageIcon:{
        display:'inline-block',
        padding:theme.spacing(2),
        color:'#000000'
    },
    pageTitle:{
        paddingLeft:theme.spacing(4),
        '& .MuiTypography-subtitle2':{
            opacity:'0.6'
        }
    }
}))

export default function PageHeader(props) {

    const pageHeaderClasses = pageHeaderStyles();
    const { title, subTitle, icon } = props;
    return (
        <Paper elevation={0} square className={pageHeaderClasses.root}>
            <div className={pageHeaderClasses.pageHeader}>
                <Card className={pageHeaderClasses.pageIcon}>
                    {icon}
                </Card>
                <div className={pageHeaderClasses.pageTitle}>
                    <Typography
                        variant="h6"
                        component="div">
                        {title}</Typography>
                    <Typography
                        variant="subtitle2"
                        component="div">
                        {subTitle}</Typography>
                </div>
            </div>
        </Paper>
    )
}
