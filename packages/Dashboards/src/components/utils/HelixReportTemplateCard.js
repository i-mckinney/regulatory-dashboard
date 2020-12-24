import React from 'react'
import { makeStyles, Divider, MenuItem, ListItemIcon } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import { red } from '@material-ui/core/colors'
import HelixMenuIcon from './HelixMenuIcon'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import PropTypes from 'prop-types'

// // Styling used for MaterialUI
// const helixReportCardStyles = makeStyles(() => ({
//     root: {
//       maxWidth: 345,
//       marginTop: '25px',
//       marginLeft: '25px',
//       marginRight: '40px',
//       boxShadow: '0px 6px 6px -3px rgba(0,0,0,0.2), 0px 10px 14px 1px rgba(0,0,0,0.14), 0px 4px 18px 3px rgba(0,0,0,0.12)',
//       borderRadius: '24px',
//       cursor: 'pointer',
//       '&:hover': {
//         backgroundColor: '#ededed'
//       }
//     },
//     avatar: {
//       backgroundColor: red[500],
//     },
//     content: {
//       textAlign: 'center',
//     },
//     header: {
//       fontSize: '1.25rem',
//       textAlign: 'center',
//     },
//     headerHeight: {
//       minHeight: '5.5rem',
//     }
//   }))

  // Styling used for MaterialUI
const helixReportCardStyles = makeStyles(() => ({
  root: {
    maxWidth: 345,
    marginTop: '25px',
    marginLeft: '25px',
    marginRight: '40px',
    boxShadow: '0px 6px 6px -3px rgba(0,0,0,0.2), 0px 10px 14px 1px rgba(0,0,0,0.14), 0px 4px 18px 3px rgba(0,0,0,0.12)',
    borderRadius: '24px',
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

const HelixReportTemplateCard = (props) => {
  // Creates an object for styling. Any className that matches key in the helixReportCardStyles object will have a corresponding styling
  const helixReportCardClasses = helixReportCardStyles();

  const renderCustomizedMenuItems = (handleEditMenuItem, handleDeleteMenuItem) => {
    return (
      <div>
        <MenuItem onClick={handleEditMenuItem}>
          <ListItemIcon>
              <EditIcon fontSize="small" />
          </ListItemIcon>
          <Typography>Edit</Typography>
        </MenuItem>
        <MenuItem onClick={handleDeleteMenuItem}>
          <ListItemIcon>
              <DeleteIcon fontSize="small" color="secondary" />
          </ListItemIcon>
          <Typography>Delete</Typography>
        </MenuItem>
      </div>
    )
  }

  const formatDate=(inputDate) => {
    var date = new Date(inputDate);
    if (!isNaN(date.getTime())) {
        return date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
    }
  }

  return (
  <Card className={helixReportCardClasses.root} onClick={props.handleReport}>
    <CardHeader
      // classes ={{title: helixReportCardClasses.header, root: helixReportCardClasses.headerHeight }}
      action={ 
      <HelixMenuIcon
      report={props.report}
      renderCustomizedMenuItems={renderCustomizedMenuItems}
      handleEditMenuItem={props.handleEditReport}
      handleDeleteMenuItem={props.handleDeleteReport}
      /> }
      // title={props.report.reportTemplateName}
      subheader={`Created: ${formatDate(props.report.reportTemplateCreatedAt)}`}
    />
    <Divider />
    <CardContent>
      <Typography className={helixReportCardClasses.content} variant="h6" color="textPrimary" component="p">
        {/* <Typography className={helixReportCardClasses.content} variant="subtitle2" color="textPrimary" component="p"> */}
        {/* Created: {formatDate(props.report.reportTemplateCreatedAt)} */}
        {props.report.reportTemplateName}
        </Typography>
    </CardContent>
  </Card>
  )
}

HelixReportTemplateCard.propTypes = {
  // user: PropTypes.string.isRequired,
  handleEditReport: PropTypes.func.isRequired,
  handleDeleteReport: PropTypes.func.isRequired,
}


export default HelixReportTemplateCard