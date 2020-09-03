import React from 'react'
import FirstPageIcon from '@material-ui/icons/FirstPage'
import IconButton from '@material-ui/core/IconButton'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import LastPageIcon from '@material-ui/icons/LastPage'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

const tablePaginationActionsStyles = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}))

/**
 * @param {int} count count is total amount of row data
 * @param {int} page page is current page currently at
 * @param {int} rowsPerPage the rowsPerPage is a number of row per page
 * @param {func} onChangePage this function will handle page changes and sends it back up to parent component
 * @returns {JSX} renders a custom table pagination actions for table
 */
const HelixTablePaginationActions = ({ count, page, rowsPerPage, onChangePage }) => {
  const tablePaginationActionsClasses = tablePaginationActionsStyles()
  const theme = useTheme()

  /**
   * handleFirstPageButtonClick will change the page to the first page
   */
  const handleFirstPageButtonClick = () => {
    onChangePage(0)
  }

  /**
   * handleBackButtonClick will change the page to go back one page before (current page - 1)
   */
  const handleBackButtonClick = () => {
    onChangePage(page - 1)
  }

  /**
   * handleNextButtonClick will change the page to go next page (current page + 1)
   */
  const handleNextButtonClick = () => {
    onChangePage(page + 1)
  }

  /**
   * handleLastPageButtonClick will change teh page to the last page 
   */
  const handleLastPageButtonClick = () => {
    onChangePage(Math.max(0, Math.ceil(count / rowsPerPage) - 1))
  }

  return (
    <div className={tablePaginationActionsClasses.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  )
}

HelixTablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
}

export default HelixTablePaginationActions
