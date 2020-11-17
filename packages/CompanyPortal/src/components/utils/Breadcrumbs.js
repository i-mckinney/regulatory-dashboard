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
 * @param {Object} props history (object) and location (object)
 * history is used to direct browser to location specificed in histroy.push()
 * location is used to extract path of application 
 * @return {JSX} Breadcrumbs component for navigating within app
 */
const Breadcrumbs=(props) => {
    const classes = useStyles()
    const {history, location} = props
    const {pathname} = location
    const pathnames = pathname.split('/').filter(x=>x)

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