import React from 'react'
import { Paper, Card, Typography, makeStyles } from '@material-ui/core'

const headerStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#fdfdff',
  },
  pageHeader: {
    padding: theme.spacing(4),
    display: 'flex',
    marginBottom: theme.spacing(2),
  },
  pageIcon: {
    display: 'inline-block',
    padding: theme.spacing(2),
    color: '#3c44b1',
  },
  pageTitle: {
    paddingLeft: theme.spacing(4),
    '& .MuiTypography-subtitle2': {
      opacity: '0.6',
    },
  },
}))

/**
 * @return {JSX} returns a reusable page header component for quick layouts
 */
export default function PageHeader(props) {
  /**
   * title: text styled with bold Material-UI Typography classes
   * subTitle: text styled with discreet Material-UI Typography classes
   * icon: optional Material-UI icon'
   */
  const headerClasses = headerStyles()
  const { title, subTitle, icon } = props

  return (
    <Paper elevation={0} square className={headerClasses.root}>
      <div className={headerClasses.pageHeader}>
        <Card className={headerClasses.pageIcon}>{icon}</Card>
        <div className={headerClasses.pageTitle}>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
          <Typography variant="subtitle2" component="div">
            {subTitle}
          </Typography>
        </div>
      </div>
    </Paper>
  )
}
