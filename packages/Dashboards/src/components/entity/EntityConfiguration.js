import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import AddBoxIcon from '@material-ui/icons/AddBox'
import IconButton from '@material-ui/core/IconButton'
import { HelixTextField } from 'helixmonorepo-lib'

// Styling used for MaterialUI
const entityConfigurationStyles = makeStyles(() => ({
    configContainer: {
        width: '80%',
        margin: 'auto',
        marginTop: '3rem',
        paddingBottom: '3rem',
    },
    selectForm: {
        width: '90%',
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
                className={entityConfigurationClasses.selectForm}
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
        </div>
    )
}

export default withRouter(EntityConfiguration)