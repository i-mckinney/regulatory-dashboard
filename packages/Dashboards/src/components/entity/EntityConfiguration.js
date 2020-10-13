import React, { useState, useMemo } from 'react'
import { withRouter } from 'react-router-dom'
import { makeStyles, TableCell } from '@material-ui/core'
import AddBoxIcon from '@material-ui/icons/AddBox'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import { HelixTextField } from 'helixmonorepo-lib'
import HelixTable from '../table/HelixTable'
import entities from '../apis/entities'
import companies from '../apis/companies'

// Styling used for MaterialUI
const entityConfigurationStyles = makeStyles(() => ({
    configContainer: {
        width: '60%',
        margin: 'auto',
        marginTop: '3rem',
        paddingBottom: '3rem',
    },
    configTable: {
        marginTop: '3rem',
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

    // data store fetchEntitiesConfiguration GET Method API results
    const [tableData, setTableData] = useState([])

    const [customApis, setCustomApis] = useState([])

    const columns = useMemo(() => [
        {
            Label: "Selected Custom Api Request",
            Accessor: "requestName",
            Sortable: false,
        },
    ], [])

    const rows = useMemo(() => [], [])

    const apis = useMemo(() => [{
      "label": "Select an API",
      "value": "0",
  }], [])
  
    const [api, setApi] = useState("0")
  
    const handleChange = (event) => {
      setApi(event.target.value)
    }

  // fetchEntitiesConfiguration calls backend api through get protocol to get all the aggregated source system data
  const fetchEntitiesConfiguration = async () => {
    const response = await entities.get("/5f7e1bb2ab26a664b6e950c8/entitiesConfig")
    setTableData(response.data)
  }

  const fetchCustomApis = async () => {
    const response = await companies.get("/companies/5f7e1bb2ab26a664b6e950c8/customapi")
    setCustomApis(response.data) 
  }

  if (customApis.length === 0 && tableData.length === 0) {
    fetchCustomApis()
    fetchEntitiesConfiguration()
  } else {
    if (apis.length === 1) {
      customApis.forEach((customApi, customApiIndex) => {
        customApi["label"] = `#${customApi["_id"]} - ${customApi["requestName"]} - ${customApi["requestType"]}`
        customApi["value"] = customApiIndex + 1
        apis.push(customApi)
      })
    }
    if (rows.length === 0) {
      tableData.entityConfiguration.forEach((entity) => {
          rows.push(entity)
      })
    }
  }
  console.log(apis[api], apis)

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
        return row._id  
    }

    /**
     * @param {int} rowIndex represents row index
     * @param {object} row represent object data from the api result
     * @param {object} column represent object data (have a header object which has an accessor needed it for key props) from the api result
     * @return {JSX} Table cell of object properties in that Table row
     */
    const customCellRender = (row, column, rowIndex, columnIndex) => {
        const columnAccessor = column.Accessor
        return (
            <TableCell key={`Row-${rowIndex} ${columnAccessor}-${columnIndex}`}>
                <span className={entityConfigurationClasses.cellSpan}>
                    {row[columnAccessor]}
                    <IconButton aria-label="delete" size="small" edge="start" onClick={() => (props.history.push({ pathname: `/entity/delete/${row._id}`, state: row }))} color="secondary">
                        <DeleteIcon />
                  </IconButton>
                </span>
            </TableCell>
        )
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
            <div className={entityConfigurationClasses.configTable}>
                <HelixTable displayCreateIcon={displayCreateIcon} columns={columns} rows={rows} customHeadColumnKeyProp={customHeadColumnKeyProp} customBodyRowKeyProp={customBodyRowKeyProp} customCellRender={customCellRender} />
            </div>
        </div>
    )
}

export default withRouter(EntityConfiguration)