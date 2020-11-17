//Component for creating a breadcrumb for app navigation
import React  from "react"
import {withRouter} from "react-router-dom"
import {
    Link, 
    makeStyles, 
    Typography, 
    Breadcrumbs as MUIBreadcrumbs,
}from "@material-ui/core"

// Styling used for MaterialUI
const useStyles= makeStyles({
    root: {
        cursor: 'pointer'
    }
})

/**
 * Function to check if the current path contains a number in it 
 * @param {Array} arrayOfPathnames -- Array of strings containing pathnames of current page
 * @return {Number} i -- index of arrayOfPathnames containing a digit
 */
const getNumIndex = (arrayOfPathnames) => {
    for(var i =0; i<arrayOfPathnames.length; i++) {
      if(/\d/.test(arrayOfPathnames[i])) {
        return i
      }
    }
  }

/**
 * Helper Function to create array with combined  elements
 * @param {Array} pathToEdit -- array of strings to edit
 * @param {number} start -- index of first element to combine
 * @param {number} end -- index of last element to combine
 * @param {string} separator -- string to seperate combined elements
 * @return {Array} Array of strings containing route paths and combined element of true path
 */
const editBreadcrumb = (pathToEdit,start,end, separator ) => {
    const combinedCrumb = pathToEdit.slice(start,end+1).join(separator)
    return pathToEdit.slice(0,1).concat(combinedCrumb)
}

/**
 * @param {Object} props history (object) and location (object)
 * history is used to direct browser to location specificed in histroy.push()
 * location is used to extract path of application 
 * @return {JSX} Breadcrumbs component for navigating within app
 */
const Breadcrumbs=(props) => {
    const classes = useStyles()
    const {history, location} = props
    const {pathname} = location
    const pathnamesFull = pathname.split('/').filter(x=>x)

    const pathnames = getNumIndex(pathnamesFull) ? 
    editBreadcrumb(pathnamesFull, pathnamesFull.length-2,pathnamesFull.length-1,'-')
   : pathnamesFull

    return (
        <MUIBreadcrumbs aria-label="breadcrumb">
        {pathnames.length > 0 ? 
            (<Link 
                className ={classes.root}
                color="inherit" 
                onClick={()=> history.push("/")}> 
                Home 
            </Link>)
            : (<Typography> Home </Typography>)
        }
        {pathnames.map((name, index) => {
                const routeTo = `/${pathnames.slice(0,index+1).join("/")}`
                const isLast = index === pathnames.length-1
                return isLast ? 
                    (<Typography key={name}> {name} </Typography>)
                    : (<Link 
                        className ={classes.root}
                        key ={name} 
                        color="inherit"
                        onClick={()=> history.push(routeTo)}> 
                        {name} 
                    </Link>)
                }
            )
        }
        </MUIBreadcrumbs>
    )
}

export default withRouter(Breadcrumbs)