import React from 'react'
import HelixTable from "../table/HelixTable"
import { makeStyles, Button, Typography, TableRow, TableCell } from '@material-ui/core'

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

    // Table Header
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
    ])

    // Data Processed API Results
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
    const customRowRender = (row) => {
        return (
        <TableRow key={row.FirstName}>
            <TableCell scope="row">
                {row.FirstName}
            </TableCell>
            <TableCell>{row.LastName}</TableCell>
            <TableCell >{row.DateOfBirth}</TableCell>
            <TableCell >{row.Phone}</TableCell>
        </TableRow>
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
