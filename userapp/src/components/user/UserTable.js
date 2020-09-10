import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import HelixTable from "../table/HelixTable"
import { makeStyles, Typography, TableCell } from '@material-ui/core'
import AddBoxIcon from '@material-ui/icons/AddBox';
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

// Styling used for MaterialUI
const userTableStyles = makeStyles(() => ({
    mediumContainer: {
        width: '80%',
        margin: 'auto',
        marginTop: '5rem',
        paddingBottom: '5rem',
        '& table': {
            width: '100%',
            display: 'table',
            borderTopRightRadius: '4px',
            borderTopLeftRadius: '4px',
            boxSizing: 'border-box',
            borderSpacing: '2px',
            borderColor: 'grey',
            '& tr': {
              border: 'none',
              backgroundColor: 'white',
              '&:nth-child(even)': {
                backgroundColor: '#f2f2f2',
              },
              '&:hover': {
                backgroundColor: '#add8e6',
              },
              '&:last-child': {
                borderBottomRightRadius: '4px',
                borderBottomLeftRadius: '4px',
              }
            },
            '& th': {
              backgroundColor: '#2e353d',
              color: 'white',
              margin: '0',
              borderBottom: 'solid 1px #e0e4e8',
              padding: '8px',
            },
            '& td': {
              margin: '0',
              borderBottom: 'solid 1px #e0e4e8',
              padding: '8px',
            },
            '&:last-children': {
              borderBottom: 'none',
            },
        },
    },
    createIconStyle: {
        float: 'right',
        cursor: 'pointer',
    },
    header: {
        paddingBottom: '2rem',
    },
    actionsIconStyle: {
        '& button': {
            marginRight: '1rem',
            cursor: 'pointer',
        },
    },
}))

/**
 * @param {Object} props Using the history location to route next component with data state
 * @return {JSX} UserTable site show list of users
 * routed at /
 */
const UserTable = (props) => {
    // Creates an object for styling. Any className that matches key in the userTableStyles object will have a corresponding styling
    const userTableClasses = userTableStyles();

    // Table Header from API Results
    const columns = React.useMemo(() => [
        {
            Label: "First Name",
            ID: "FirstName",
        },
        {
            Label: "Last Name",
            ID: "LastName",
        },
        {
            Label: "Date of Birth",
            ID:"DateOfBirth",
        },
        {
            Label: "Phone",
            ID: "Phone",
        },
        {
            Label: "Actions",
            ID: "Actions",
        },
    ], [])

    // Data Processed from API Results
    const [rows, setRows] = useState([
        {
            ID: "1",
            FirstName: "Joe",
            LastName: "Doe",
            DateOfBirth: "1987-01-01",
            Phone: "8861551515",
        },
        {
            ID: "2",
            FirstName: "John",
            LastName: "Smith",
            DateOfBirth: "1989-12-12",
            Phone: "8002552525",
        },
        {
            ID: "3",
            FirstName: "Ray",
            LastName: "Smith",
            DateOfBirth: "1988-11-11",
            Phone: "8003553535",
        },
        {
            ID: "4",
            FirstName: "Joy",
            LastName: "Doe",
            DateOfBirth: "1991-09-03",
            Phone: "2136746045",
        },
        {
            ID: "5",
            FirstName: "Irene",
            LastName: "Smith",
            DateOfBirth: "1991-03-29",
            Phone: "9496458858",
        },
        {
            ID: "6",
            FirstName: "Wendy",
            LastName: "Hernandez",
            DateOfBirth: "1990-09-09",
            Phone: "4156749201",
        },   
    ])
    
    /**
     * Renders only when it is mounted at first
     * It will receive a type & payload from the props.location.state
     * Depending on the type of the state, it will perform the follow CRUD operations
     */
    useEffect(() => {
        const currentState = props.location.state
        if(currentState) {
            const { type, payload } = currentState
            switch(type) {
                case "CREATE":
                    setRows(rows => [ ...rows, payload ])
                    break
                case "UPDATE":
                    const copyRowsU = [ ...rows ]
                    const updatedRows = copyRowsU.filter((row) => (row.ID !== payload.ID))
                    setRows(rows => [ ...updatedRows, payload ])
                    break
                case "DELETE":
                    const copyRowsD = [ ...rows ]
                    const remainingRows = copyRowsD.filter((row) => (row.ID !== payload.ID))
                    setRows(rows => [ ...remainingRows ])
                    break
                default:
                    break
            }
        }

    }, [props.location.state])

    /**
     * @param {object} row represent object data from the api result
     * @param {object} column represent object data (have a header object which has an accessor needed it for key props) from the api result
     * @return {JSX} Table cell of object properties in that Table row
     */
    const customCellRender = (rowIndex, row, column) => {
        const columnID = column.ID
        if (columnID === "Actions") {
            return (
                <TableCell className={userTableClasses.actionsIconStyle} key={`${rowIndex} ${columnID}`}>
                    <IconButton aria-label="edit" size="small" edge="start" onClick={() => (props.history.push({ pathname: `/user/edit/${row.ID}`, state: row }))} color="default">
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" size="small" edge="start" onClick={() => (props.history.push({ pathname: `/user/delete/${row.ID}`, state: row }))} color="secondary">
                        <DeleteIcon />
                    </IconButton>
                </TableCell>
            )
        }
        return (
            <TableCell key={`${rowIndex} ${columnID}`}>
                {row[columnID]}
            </TableCell>
        )
    }

    /**
     * @param {object} column represent object data regarding the api result  
     * @return {string} provide table row with unique key props (required)
     */
    const customHeadRowProps = (column) => {
        return column.ID
    }

    /**
     * @param {object} row represent object data regarding the api result 
     * @return {string} provide table row with unique key props (required)
     */
    const customBodyRowProps = (row) => {
        return row.ID
    }

    // Initially, we can start the table to order by First Name, ascending order
    const initialOrderBy = "FirstName"

    const displayCreateUserIcon = () => {
        return (
            <IconButton
            className={userTableClasses.createIconStyle} 
            color="primary"
            onClick={() => (props.history.push("/user/new"))}>
                <AddBoxIcon fontSize="large" />
            </IconButton>
        )
    }

    return (
        <div className={userTableClasses.mediumContainer}>
            <div className={userTableClasses.header}>
                <Typography variant="h5">Users</Typography>
            </div>
            <HelixTable displayCreateIcon={displayCreateUserIcon} initialOrderBy={initialOrderBy} columns={columns} rows={rows} customCellRender={customCellRender} customHeadRowProps={customHeadRowProps} customBodyRowProps={customBodyRowProps} />
        </div>
    )
}

export default withRouter(UserTable)
