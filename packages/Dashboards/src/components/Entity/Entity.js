import React, { useState, useEffect, useMemo } from 'react'
import { withRouter } from 'react-router-dom'
import { StylesProvider, makeStyles, Typography, TableCell } from '@material-ui/core'
import AddBoxIcon from '@material-ui/icons/AddBox'
import SettingsIcon from '@material-ui/icons/Settings';
import IconButton from '@material-ui/core/IconButton'
import AssessmentIcon from '@material-ui/icons/Assessment'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
// import { HelixTable } from 'helixmonorepo-lib'
import HelixTable from '../table/HelixTable'
import HelixTableCell from '../table/HelixTableCell'
import entities from '../apis/entities'
import { sortableExcludes, columnExcludes, columnLabels } from '../../config'

// Styling used for MaterialUI
const entityStyles = makeStyles(() => ({
  mediumContainer: {
      width: '80%',
      margin: 'auto',
      marginTop: '3rem',
      paddingBottom: '3rem',
      '& table': {
          width: '100%',
          display: 'table',
          borderTopRightRadius: '4px',
          borderTopLeftRadius: '4px',
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
  discrepancyButton: {
    color: 'green'
  },
}))

/** @return {JSX} Entity site
 * routed at /Entity
 */

function Entity(props) {
  // Creates an object for styling. Any className that matches key in the entityStyles object will have a corresponding styling
  const entityClasses = entityStyles()

  /** useMemo is a React hook that memorizes the output of a function.
   * It's important that we're using React.useMemo here to ensure that our data isn't recreated on every render.
   * If we didn't use React.useMemo, the table would think it was receiving new data on every render
   * and attempt to recalulate a lot of logic every single time. Only when the memoized value actually changes, it re renders
   * Header -> Represents what is shown in the table
   * Accessor -> represents key that you look for in a given data
   * Filter -> choosing which filter to use.
   * filter -> includes (tells react table to show values that matches the value in the select field)
   * Filter not given -> will use global filter
   * */
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
   * @param {object} entity represent object of entity with particular props
   * @param {string} accessor represents the accessor which user with acessor can access the property value
   */
  const isoToDate = (entity, accessor) => {
      const strDate = entity[accessor];
      entity[accessor] = strDate.substring(0, 10)
  }

  /**
   * Renders only when it is mounted at first
   * It will fetchUsers whenever UserTable loads
   */
  useEffect(() => {
      
      /**
       * fetchEntities calls backend api through get protocol to get all the entities
       */
      const fetchEntities = async () => {
          const response = await entities.get("/5f7e1bb2ab26a664b6e950c8/entities")

          response.data.forEach((entity) => {
              if (entity["createdAt"] !== undefined) {
                  isoToDate(entity, "createdAt")
              }
              if (entity["updatedAt"] !== undefined) {
                  isoToDate(entity, "updatedAt")
              }
          })
          setRows(response.data)
      }

      fetchEntities()
  }, [columns])

    /**
     * @param {int} rowIndex represents row index
     * @param {object} row represent object data from the api result
     * @param {object} column represent object data (have a header object which has an accessor needed it for key props) from the api result
     * @return {JSX} Table cell of object properties in that Table row
     */
    const customCellRender = (row, column, rowIndex, columnIndex) => {
        const columnAccessor = column.Accessor
        if (columnAccessor === "Actions") {
            return (
                <TableCell className={entityClasses.actionsIconStyle} key={`Row-${rowIndex} ${columnAccessor}-${columnIndex}`}>
                  <IconButton className={entityClasses.discrepancyButton} aria-label="discrepancy" size="small" edge="start" onClick={() => (props.history.push({ pathname: `/entity/${row._id}/discrepancy-report`, state: row }))}>
                    <AssessmentIcon />
                  </IconButton>
                  <IconButton aria-label="edit" size="small" edge="start" onClick={() => (props.history.push({ pathname: `/entity/edit/${row._id}`, state: row }))} color="default">
                    <EditIcon />
                  </IconButton>
                  <IconButton aria-label="delete" size="small" edge="start" onClick={() => (props.history.push({ pathname: `/entity/delete/${row._id}`, state: row }))} color="secondary">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
            )
        }
        else {
          return <HelixTableCell key={`Row-${rowIndex} ${columnAccessor}-${columnIndex}`} value={row[columnAccessor]} editable={false}/>
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

    // Initially, we can start the table to order by Relationship Name or Borrower Name or etc in ascending order
    const initialOrderBy = "RelationshipName"

    /**
     * @return jsx object of create icon in child component's toolbar
     */
    const displayCreateUserIcon = () => {
        return (
          <span className={entityClasses.createIconStyle}>
            <IconButton
            color="primary"
            onClick={() => (props.history.push("/entity/new"))}>
                <AddBoxIcon fontSize="large" />
            </IconButton>
            <IconButton
            onClick={() => (props.history.push("/entity/configuration"))}>
                <SettingsIcon fontSize="large" />
            </IconButton>
          </span>
        )
    }

    return (
        <StylesProvider injectFirst>
            <div className={entityClasses.mediumContainer}>
              <div className={entityClasses.header}>
                  <Typography variant="h5">Entity</Typography>
              </div>
              <HelixTable toggleSearch={true} displayCreateIcon={displayCreateUserIcon} initialOrderBy={initialOrderBy} columns={columns.slice(1)} rows={rows} customCellRender={customCellRender} customHeadColumnKeyProp={customHeadColumnKeyProp} customBodyRowKeyProp={customBodyRowKeyProp} />
            </div>
        </StylesProvider>
    )
}

export default withRouter(Entity)
