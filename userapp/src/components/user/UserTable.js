import React from 'react'
import Table from "../table/Table"
import { makeStyles, Button, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
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
    const classes = useStyles();

    const columns = React.useMemo(() => [
        {
            Header: "First Name",
            accessor: "FirstName",
        },
        {
            Header: "Last Name",
            accessor: "LastName",
        },
        {
            Header: "Date of Birth",
            accessor:"DateOfBirth"
        },
        {
            Header: "Phone",
            accessor: "Phone",
        },
        {
            Header: "Address",
            accessor: "Address",
        },
        {
            Header: "City",
            accessor: "City"
        },
        {
            Header: "State",
            accessor: "State",
        },
        {
            Header: "Zip Code",
            accessor: "ZipCode"
        }
    ])

    const data = [
        {
            FirstName: "Joe",
            LastName: "Doe",
            DateOfBirth: "01012000",
            Phone: "5555555555",
            Address: "123 Hollywood Ave",
            City: "Los Angeles",
            State: "California",
            ZipCode: "90068",
        },
        {
            FirstName: "John",
            LastName: "Smith",
            DateOfBirth: "12122012",
            Phone: "1234567890",
            Address: "200 Santa Monica Pier",
            City: "Santa Monica",
            State: "California",
            ZipCode: "90401",
        },
        {
            FirstName: "Ray",
            LastName: "Smith",
            DateOfBirth: "11112011",
            Phone: "9876543210",
            Address: "700 W 7th St",
            City: "Los Angeles",
            State: "California",
            ZipCode: "90017",
        },
        
    ]

    return (
        <div className={classes.mediumContainer}>
            <div className={classes.header}>
                <Typography variant="h5">Users</Typography>
                <Button className={classes.floatRight} size="small" href="/user/new" variant="contained" color="primary">
                    Create User
                </Button>
            </div>
            <Table columns={columns} data={data} />
        </div>
    )
}

export default UserTable
