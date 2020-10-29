import React from 'react'
import { makeStyles, Toolbar, InputAdornment } from '@material-ui/core'
import PropTypes from 'prop-types'
import SearchIcon from '@material-ui/icons/Search'
import HelixTextField from '../../HelixTextField/index'

// Styling used for MaterialUI
const helixToolBarSearchStyles = makeStyles(() => ({
  searchStyles: {
    width: "28%",
  },
}))

/**
 * @param {func} onSearch the onSearch function handle the user query input
 * @param {func} displayCreateIcon the displayCreateIcon displays textfield with search icon jsx 
 */
const HelixToolBarSearch = ({ onSearch, displayCreateIcon }) => {
  // Creates an object for styling. Any className that matches key in the helixTableSearchStyles object will have a corresponding styling
  const helixToolBarSearchClasses = helixToolBarSearchStyles()

    return (
      <Toolbar disableGutters>
        <HelixTextField
        className={helixToolBarSearchClasses.searchStyles}
        label="Search"
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <SearchIcon />
            </InputAdornment>
          )
        }}
        onChange={onSearch}
        />
        {displayCreateIcon()}
      </Toolbar>
    )
}

HelixToolBarSearch.propTypes = {
  onSearch: PropTypes.func.isRequired,
  displayCreateIcon: PropTypes.func.isRequired,
}

export default HelixToolBarSearch