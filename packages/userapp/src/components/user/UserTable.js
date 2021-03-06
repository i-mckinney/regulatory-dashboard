import React, { useState, useEffect, useMemo } from 'react'
import { withRouter } from 'react-router-dom'
import { StylesProvider, makeStyles, Typography } from '@material-ui/core'
import AddBoxIcon from '@material-ui/icons/AddBox'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import { HelixTable, HelixTableCell } from 'helixmonorepo-lib'
import users from '../apis/users'
import { sortableExcludes, columnExcludes, columnLabels } from '../../config'

// Styling used for MaterialUI
const userTableStyles = makeStyles(() => ({
    mediumContainer: {
        width: '80%',
        margin: 'auto',
        marginTop: '3rem',
        paddingBottom: '3rem',
    },
    createIconStyle: {
        float: 'right',
        cursor: 'pointer',
        marginLeft: "auto",
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
    const userTableClasses = userTableStyles()

    // rows will stores users from GET Method fetchUsers via Rest API 
    const [rows, setRows] = useState([])
    
    // columns will store column header that we want to show in the front end
    const columns = useMemo(() => [], [])

    if (rows.length !== 0) {
        const headerColumns = Object.keys(rows[0])
        headerColumns.forEach((key, index) => {
            if (!columnExcludes.includes(key)) {
                columns.push({
                Label: columnLabels[index],
                Accessor: key,
                Sortable: sortableExcludes.includes(key) ? false : true,
                })
            }
        })
    }

    /**
     * @param {object} user represent object of user with particular props
     * @param {string} accessor represents the accessor which user with acessor can access the property value
     */
    const isoToDate = (user, accessor) => {
        const strDate = user[accessor];
        user[accessor] = strDate.substring(0, 10)
    }

    /**
     * Renders only when it is mounted at first
     * It will fetchUsers whenever UserTable loads
     */
    useEffect(() => {
        
        /**
         * fetchUsers calls backend api through get protocol to get all the users
         */
        const fetchUsers = async () => {
            const response = await users.get("/users")

            response.data.forEach((user) => {
                if (user["createdAt"] !== undefined) {
                    isoToDate(user, "createdAt")
                }
                if (user["updatedAt"] !== undefined) {
                    isoToDate(user, "updatedAt")
                }
            })
            setRows(response.data)
        }

        fetchUsers()
    }, [columns])

    /**
     * @param {object} row the row is an object of data
     * @param {object} column the column is an object of the header with accessor and label props
     * @param {int} rowIndex the rowIndex represents index of the row
     * @param {int} columnIndex the columnIndex represents index of the column
     * @return {JSX} HelixTableCell of object properties in that Table row
     */
    const customCellRender = (row, column, rowIndex, columnIndex) => {
        const columnAccessor = column.Accessor
        const displayActions = () => (
            <span className={userTableClasses.actionsIconStyle}>
                <IconButton aria-label="edit" size="small" edge="start" onClick={() => (props.history.push({ pathname: `/users/edit/${row._id}`, state: row }))} color="default">
                    <EditIcon />
                </IconButton>
                <IconButton aria-label="delete" size="small" edge="start" onClick={() => (props.history.push({ pathname: `/users/delete/${row._id}`, state: row }))} color="secondary">
                    <DeleteIcon />
                </IconButton>
            </span>
        )
        if (columnAccessor === "Actions") {
            return (
                <HelixTableCell key={`Row-${rowIndex} ${columnAccessor}-${columnIndex}`} containActions={true} displayActions={displayActions} />
            )
        }
        else if (columnAccessor === "Roles") {
            const assignedRoles = row[columnAccessor].reduce((result, roles, index) => {
                return index ? `${result}, ${roles}`.trim() : `${result} ${roles}`.trim()
            }, "")

            return (
                <HelixTableCell key={`Row-${rowIndex} ${columnAccessor}-${columnIndex}`} value={assignedRoles} />
            )
        }
        else {
            return <HelixTableCell key={`Row-${rowIndex} ${columnAccessor}-${columnIndex}`} value={row[columnAccessor]} />
        }
    }

    /**
     * @param {object} column represent object data regarding the api result  
     * @return {string} provide table row with unique key props (required)
     */
    const customHeadColumnKeyProp = (column) => {
        return column.Accessor
    }

    /**
     * @param {object} row represent object data regarding the api result 
     * @return {string} provide table row with unique key props (required)
     */
    const customBodyRowKeyProp = (row) => {
        return row._id
    }

    // Initially, we can start the table to order by Username or First Name or etc in ascending order
    const initialOrderBy = "Username"

    /**
     * @return jsx object of create icon in child component's toolbar
     */
    const displayCreateUserIcon = () => {
        return (
            <IconButton
            className={userTableClasses.createIconStyle} 
            color="primary"
            onClick={() => (props.history.push("/users/new"))}>
                <AddBoxIcon fontSize="large" />
            </IconButton>
        )
    }

    return (
        <StylesProvider injectFirst>
            <div className={userTableClasses.mediumContainer}>
                <div className={userTableClasses.header}>
                    <Typography variant="h5">Users</Typography>
                </div>
                <HelixTable toggleSearch={true} displayCreateIcon={displayCreateUserIcon} initialOrderBy={initialOrderBy} columns={columns.slice(1)} rows={rows} customCellRender={customCellRender} customHeadColumnKeyProp={customHeadColumnKeyProp} customBodyRowKeyProp={customBodyRowKeyProp} />
            </div>
        </StylesProvider>
    )
}

export default withRouter(UserTable)
