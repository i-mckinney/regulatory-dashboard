import React from 'react'
import HelixTable from "../table/HelixTable"
import { makeStyles, Button, Typography, TableCell } from '@material-ui/core'

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
 * @return {JSX} UserTable site
 * routed at /
 */
const UserTable = () => {
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
    ])

    // Data Processed from API Results
    const rows = [
        {
            FirstName: "Joe",
            LastName: "Doe",
            DateOfBirth: "01012000",
            Phone: "5555555555",
        },
        {
            FirstName: "John",
            LastName: "Smith",
            DateOfBirth: "12122012",
            Phone: "1234567890",
        },
        {
            FirstName: "Ray",
            LastName: "Smith",
            DateOfBirth: "11112011",
            Phone: "9876543210",
        },   
    ]

    /**
     * @param {object} row represent object pertaining data regarding the api result
     * @return {JSX} Table row with table cell of object properties
     */
    const customRowRender = (row, columnID) => {
        if (columnID === "EditButton") {
            return (
                <TableCell key={columnID}>
                    <Button size="small" href="/user/edit" variant="contained" color="default">Edit Button</Button>
                </TableCell>
            )
        }
        else if( columnID === "DeleteButton") {
            return (
                <TableCell key={columnID}>
                    <Button size="small" href="/user/delete" variant="contained" color="secondary">Delete Button</Button>
                </TableCell>
            )
        }
        return (
            <TableCell key={columnID}>
                {row[columnID]}
            </TableCell>
        )
    }

    return (
        <div className={userTableClasses.mediumContainer}>
            <div className={userTableClasses.header}>
                <Typography variant="h5">Users</Typography>
                <Button className={userTableClasses.floatRight} size="small" href="/user/new" variant="contained" color="primary">
                    Create User
                </Button>
            </div>
            <HelixTable columns={columns} rows={rows} customRowRender={customRowRender} />
        </div>
    )
}

export default UserTable
