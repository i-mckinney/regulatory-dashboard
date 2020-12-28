import React, { useState, useMemo, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { makeStyles, Grid, Typography } from '@material-ui/core'
import AddBoxIcon from '@material-ui/icons/AddBox'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import SaveIcon from '@material-ui/icons/Save'
import CancelIcon from '@material-ui/icons/Cancel'
import { HelixTable, HelixTableCell, HelixTextField, HelixButton } from 'helixmonorepo-lib'
import entities from '../apis/entities'
import companies from '../apis/companies'

// Styling used for MaterialUI
const loanConfigurationStyles = makeStyles(() => ({
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
        },
    },
    buttonStyle: {
      '& button': {
          marginTop: '16px',
          marginRight: '16px',
      },
      '& a': {
          marginTop: '16px',
          marginRight: '16px',
      }
    },
    header: {
      marginBottom: '1rem',
    }
  }))

/**
 * @param {Object} props Using the history property to route next component with data state
 * @return {JSX} LoanConfiguration site with provided configs for loan
 * routed at /loan/configuration/:id
 */
const LoanConfiguration = (props) => {
  // Creates an object for styling. Any className that matches key in the loanConfigurationStyles object will have a corresponding styling
  const loanConfigurationClasses = loanConfigurationStyles()

  // customApis store the default list of custom apis
  const [customApis, setCustomApis] = useState([])

  // columns contains selected custom api request
  const columns = useMemo(() => [
    {
      Label: "Selected Custom Api Request",
      Accessor: "requestName",
      Sortable: false,
    },
  ], [])

  // rows will store all the row data
  const [rows, setRows] = useState([])

  // tempRows will act as a temporary storage to identify intersection between selected and unselected custom apis
  const tempRows = useMemo(() => [],[])

  // apis acts as an options which show a list of custom apis
  const apis = useMemo(() => [{
    "label": "Select an API",
    "value": "0",
  }], [])

  // api play a role as selecting particular option from apis variable
  const [api, setApi] = useState("0")

  /**
   * @param {object} event the event object
   */
  const handleChange = (event) => {
    setApi(event.target.value)
  }

  /**
   * Renders only when it is mounted at first
   * It will fetchLoansConfiguration and fetchCustomApis whenever LoanConfiguration loads
   */
  useEffect(() => {

    /**
    * @param {object} response the response is an api results/response via api call
    */
    const showSelection = (response) => {
      const copyCustomApis = [ ...response ]
      const remainingCustomApis = copyCustomApis.filter((customApi) => 
        !tempRows.find((selectedCustomApi) => customApi._id === selectedCustomApi._id)
      )

      remainingCustomApis.forEach((customApi) => {
        const copyCustomApi = { ...customApi }
        copyCustomApi["label"] = `#${customApi["_id"]} - ${customApi["requestName"]} - ${customApi["requestType"]}`
        copyCustomApi["value"] = customApi["_id"]
        apis.push(copyCustomApi)
      })
    }

    /**
     * fetchLoansConfiguration calls backend api through get protocol to get all the selected custom apis
     */
    const fetchLoansConfiguration = async () => {
      const response = await entities.get(`/loanConfig/5f7e1bb2ab26a664b6e950c8/${props.location.state.loanID}`)
      response.data.forEach((row) => {
        tempRows.push(row)
      })
      setRows(response.data)
  
    }

    /**
     * fetchCustomApis calls backend api through get protocol to get all custom apis
     */
    const fetchCustomApis = async () => {
      const response = await companies.get("/companies/5f7e1bb2ab26a664b6e950c8/customapi/loan")
      showSelection(response.data)
      setCustomApis(response.data)
    }

    const apiCallCheckList = async () => {
      await fetchLoansConfiguration()
      await fetchCustomApis()
    }
    apiCallCheckList()
    
  }, [columns, tempRows, apis])

  /**
   * handleAddCustomApi adds custom api to table
   */
  const handleAddCustomApi = () => {
    const copyRows = [ ...rows ]
    const removedSelectionIndex = apis.findIndex((elem) => elem._id === api)
    if (removedSelectionIndex !== -1) {
      const index = customApis.findIndex((elem) => elem._id === apis[removedSelectionIndex]._id)
      copyRows.push(customApis[index])
      tempRows.push(customApis[index])
      apis.splice(removedSelectionIndex, 1)
      setRows(copyRows)
      setApi("0")
    } 
  }

  /**
   * @param {string} rowId rowId is unique identifier
   * @param {int} rowIndex represents row index
   */
  const handleDeleteCustomApi = (rowId, rowIndex) => {
    const copyRows = [ ...rows ]
    const customApi = copyRows[rowIndex]

    const copyCustomApi = { ...customApi }
    copyCustomApi["label"] = `#${customApi["_id"]} - ${customApi["requestName"]} - ${customApi["requestType"]}`
    copyCustomApi["value"] = customApi["_id"]
    apis.push(copyCustomApi)

    const remainingCopyRows = copyRows.filter((copyRow) => copyRow._id !== rowId)
    setRows(remainingCopyRows)
  }

  /**
   * handleSaveLoanConfiguration saves list of selected custom api in the configuration table
   */
  const handleSaveLoanConfiguration = async () => {
    const config = { loanConfiguration: [], loanId: props.location.state.loanID }
    rows.forEach((row) => config.loanConfiguration.push(row._id))
    await entities.post(`/loanConfig/5f7e1bb2ab26a664b6e950c8/${props.location.state.loanID}`, config)
    props.history.push("/loan")
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
        <>
          <span className={loanConfigurationClasses.cellSpan}>
            {`${row[columnAccessor]} - ${row["requestUrl"]}`}
            <IconButton aria-label="delete" size="small" edge="start" onClick={() => handleDeleteCustomApi(row._id, rowIndex)} color="secondary">
                <DeleteIcon />
            </IconButton>
          </span>
        </>
      )
      return (
        <HelixTableCell key={`Row-${rowIndex} ${columnAccessor}-${columnIndex}`} containActions={true} displayActions={displayActions} />
      )
  }

  /**
   * @return {jsx} return a jsx object of HelixButtons 
   */
  const renderButtonActions = () => {
    return (
        <>
            <HelixButton 
            color="primary" 
            variant="contained" 
            type="submit" 
            size="small"
            onClick={handleSaveLoanConfiguration}
            startIcon={<SaveIcon />}
            text="Save" />
            <HelixButton
            color="default"
            variant="contained"
            type="cancel"
            size="small"
            href="/loan"
            startIcon={<CancelIcon />}
            text="Cancel" />
        </>
    )
  }

  return (
      <div className={loanConfigurationClasses.configContainer}>
        <Grid item xs={12} className={loanConfigurationClasses.header}><Typography variant="h5" component="h2">Configure Loan Custom API(s)</Typography></Grid>
          <div>
              <HelixTextField
              className={loanConfigurationClasses.selectFormControl}
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
              onClick={handleAddCustomApi}>
                  <AddBoxIcon fontSize="large" />
              </IconButton>
          </div>
          <div className={loanConfigurationClasses.configTable}>
              <HelixTable toggleSearch={false} columns={columns} rows={rows} customHeadColumnKeyProp={customHeadColumnKeyProp} customBodyRowKeyProp={customBodyRowKeyProp} customCellRender={customCellRender} />
          </div>
          <Grid
          container
          direction="row"
          justify="flex-end"
          alignItems="center"
          >
            <Grid className={loanConfigurationClasses.buttonStyle}>
                {renderButtonActions()}
            </Grid>
          </Grid>
      </div>
  )
}

export default withRouter(LoanConfiguration)