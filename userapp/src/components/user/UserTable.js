import React from 'react'
import HelixTable from "../table/HelixTable"
import { makeStyles, Button, Typography } from '@material-ui/core'

const userTableStyles = makeStyles(() => ({
    mediumContainer: {
        width: '80%',
        margin: 'auto',
        marginTop: '5rem',
        paddingBottom: '5rem',
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

    const columns = React.useMemo(() => [
        {
            Label: "First Name",
            ID: "FirstName",
            Align: "left",
        },
        {
            Label: "Last Name",
            ID: "LastName",
            Align: "left",
        },
        {
            Label: "Date of Birth",
            ID:"DateOfBirth",
            Align: "left",
        },
        {
            Label: "Phone",
            id: "Phone",
            align: "left",
        },
    ])

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

    return (
        <div className={userTableClasses.mediumContainer}>
            <div className={userTableClasses.header}>
                <Typography variant="h5">Users</Typography>
                <Button className={userTableClasses.floatRight} size="small" href="/user/new" variant="contained" color="primary">
                    Create User
                </Button>
            </div>
            <HelixTable columns={columns} rows={rows} />
        </div>
    )
}

export default UserTable
