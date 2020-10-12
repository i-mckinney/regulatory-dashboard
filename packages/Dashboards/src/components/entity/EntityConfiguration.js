import React, { useState, useMemo } from 'react'
import { withRouter } from 'react-router-dom'
import { makeStyles, TableCell } from '@material-ui/core'
import AddBoxIcon from '@material-ui/icons/AddBox'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import { HelixTextField, HelixTable } from 'helixmonorepo-lib'

// Styling used for MaterialUI
const entityConfigurationStyles = makeStyles(() => ({
    configContainer: {
        width: '80%',
        margin: 'auto',
        marginTop: '3rem',
        paddingBottom: '3rem',
    },
    selectFormControl: {
        width: '90%',
    },
    cellSpan: {
        display: 'block',
        '& button': {
            float: 'right',
            cursor: 'pointer',
            marginLeft: "auto",
        }
    }
  }))

/**
 * @param {Object} props Using the history property to route next component with data state
 * @return {JSX} EntityConfiguration site with provided configs for entity
 * routed at /entity/configuration
 */
const EntityConfiguration = (props) => {
    // Creates an object for styling. Any className that matches key in the entityConfigurationStyles object will have a corresponding styling
    const entityConfigurationClasses = entityConfigurationStyles()

    const columns = useMemo(() => [
        {
            Label: "Selected Custom Api Request",
            Accessor: "SelectedCustomApiRequest",
            Sortable: false,
        },
    ], [])

    const rows = useMemo(() => [
        {
            "SelectedCustomApiRequest": "localhost:5555/123/entities"
        }
    ], [])

    /**
     * @param {object} column represent object data regarding the api result  
     * @return {string} provide table row with unique key props (required)
     */
    const customHeadColumnKeyProp = (column) => {
        return column.Accessor
    }

    const displayCreateIcon = () => null

    /**
     * @param {object} row represent object data regarding the api result 
     * @return {string} provide table row with unique key props (required)
     */
    const customBodyRowKeyProp = (row) => {
        return row.SelectedCustomApiRequest
    }

    /**
     * @param {int} rowIndex represents row index
     * @param {object} row represent object data from the api result
     * @param {object} column represent object data (have a header object which has an accessor needed it for key props) from the api result
     * @return {JSX} Table cell of object properties in that Table row
     */
    const customCellRender = (rowIndex, row, column) => {
        const columnAccessor = column.Accessor
        return (
            <TableCell key={`${rowIndex} ${columnAccessor}`}>
                <span className={entityConfigurationClasses.cellSpan}>
                    {row[columnAccessor]}
                    <IconButton aria-label="delete" size="small" edge="start" onClick={() => (props.history.push({ pathname: `/entity/delete/${row._id}`, state: row }))} color="secondary">
                        <DeleteIcon />
                  </IconButton>
                </span>
            </TableCell>
        )
    }

    const apis = [
        {
          value: "Get-Salesforce-Transaction-Data",
          label: "Get Salesforce Transaction Data",
        },
        {
          value: "Post-Salesforce-Transaction-Data",
          label: "Post Salesforce Transaction Data",
        },
        {
          value: "Put-Salesforce-Transaction-Data",
          label: "Put Salesforce Transaction Data",
        },
      ]
    
      const [api, setApi] = useState("Get-Salesforce-Transaction-Data")
    
      const handleChange = (event) => {
        setApi(event.target.value)
      }

    return (
        <div className={entityConfigurationClasses.configContainer}>
            <div>
                <HelixTextField
                className={entityConfigurationClasses.selectFormControl}
                id="outlined-select-api-native"
                select
                label="API"
                value={api}
                onChange={handleChange}
                SelectProps={{
                    native: true,
                }}
                helperText="Please select your API"
                variant="outlined"
                >
                {apis.map((option) => (
                    <option key={option.value} value={option.value}>
                    {option.label}
                    </option>
                ))}
                </HelixTextField>
                <IconButton
                color="primary"
                onClick={() => (props.history.push("/entity/new"))}>
                    <AddBoxIcon fontSize="large" />
                </IconButton>
            </div>
            <div>
                <HelixTable displayCreateIcon={displayCreateIcon} columns={columns} rows={rows} customHeadColumnKeyProp={customHeadColumnKeyProp} customBodyRowKeyProp={customBodyRowKeyProp} customCellRender={customCellRender} />
            </div>
        </div>
    )
}

export default withRouter(EntityConfiguration)