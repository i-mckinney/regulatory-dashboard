import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import HelixTable from "../table/HelixTable"
import { makeStyles, Button, Typography, TableCell } from '@material-ui/core'

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
            borderCollapse: 'separate',
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
    floatRight: {
        float: "right",
    },
    header: {
        paddingBottom: '2rem',
    }
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
            Label: "",
            ID: "EditButton",
        },
        {
            Label: "",
            ID: "DeleteButton",
        }
    ], [])

    // Data Processed from API Results
    const [rows, setRows] = useState([
        {
            ID: "1",
            FirstName: "Joe",
            LastName: "Doe",
            DateOfBirth: "01012000",
            Phone: "5555555555",
        },
        {
            ID: "2",
            FirstName: "John",
            LastName: "Smith",
            DateOfBirth: "12122012",
            Phone: "1234567890",
        },
        {
            ID: "3",
            FirstName: "Ray",
            LastName: "Smith",
            DateOfBirth: "11112011",
            Phone: "9876543210",
        },
        {
            ID: "4",
            FirstName: "Joy",
            LastName: "Doe",
            DateOfBirth: "01012000",
            Phone: "5555555555",
        },
        {
            ID: "5",
            FirstName: "Irene",
            LastName: "Smith",
            DateOfBirth: "12122012",
            Phone: "1234567890",
        },
        {
            ID: "6",
            FirstName: "Wendy",
            LastName: "Smith",
            DateOfBirth: "11112011",
            Phone: "9876543210",
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
    const customCellRender = (row, column) => {
        const columnID = column.ID
        const rowID = row.ID
        if (columnID === "EditButton") {
            return (
                <TableCell key={rowID}>
                    <Button size="small" onClick={() => (props.history.push({ pathname: `/user/edit/${row.ID}`, state: row }))} variant="contained" color="default">Edit</Button>
                </TableCell>
            )
        }
        else if(columnID === "DeleteButton") {
            return (
                <TableCell key={rowID}>
                    <Button size="small" onClick={() => (props.history.push({ pathname: `/user/delete/${row.ID}`, state: row }))} variant="contained" color="secondary">Delete</Button>
                </TableCell>
            )
        }
        return (
            <TableCell key={rowID}>
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

    return (
        <div className={userTableClasses.mediumContainer}>
            <div className={userTableClasses.header}>
                <Typography variant="h5">Users</Typography>
                <Button className={userTableClasses.floatRight} size="small" href="/user/new" variant="contained" color="primary">
                    Create User
                </Button>
            </div>
            <HelixTable columns={columns} rows={rows} customCellRender={customCellRender} customHeadRowProps={customHeadRowProps} customBodyRowProps={customBodyRowProps} />
        </div>
    )
}

export default withRouter(UserTable)
