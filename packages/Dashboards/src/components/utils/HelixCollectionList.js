import React from 'react'
import { makeStyles, Paper, GridList, GridListTile } from '@material-ui/core'
import PropTypes from 'prop-types'
import { getComparator, stableSort } from '../table/HelixTableSortFunc'

// Styling used for MaterialUI
const helixCollectionListStyles = makeStyles(() => ({
    paper: {
        marginTop: '1rem',
    },
    gridList: {
        height: 500,
        transform: 'translateZ(0)',
    },
}))

const HelixCollectionList = (props) => {
    // Creates an object for styling. Any className that matches key in the helixCollectionListStyles object will have a corresponding styling
    const helixCollectionListClasses = helixCollectionListStyles()

    const sortedComponents = stableSort(props.searchFilter.search(props.data), getComparator('asc', 'createdAt'))

    return (
    <Paper elevation={props.elevation} className={helixCollectionListClasses.paper}>
        <GridList cellHeight={props.cellHeight} spacing={props.spacing} cols={props.columnSpan} className={helixCollectionListClasses.gridList}>
            {sortedComponents.map((component) => (
                <GridListTile key={component._id} style={{ padding: 0 }}>
                    {props.renderCustomizedComponent(props.user, component, props.handleComponent, props.handleEditComponent, props.handleDeleteComponent)}
                </GridListTile>
            ))}
        </GridList>
    </Paper>
    )
}

HelixCollectionList.propTypes = {
    user: PropTypes.string.isRequired,
    searchFilter: PropTypes.shape({ search: PropTypes.func.isRequired }).isRequired,
    data: PropTypes.instanceOf(Array).isRequired,
    elevation: PropTypes.number.isRequired,
    cellHeight: PropTypes.number.isRequired,
    spacing: PropTypes.number.isRequired,
    columnSpan: PropTypes.number.isRequired,
    renderCustomizedComponent: PropTypes.func.isRequired,
    handleComponent: PropTypes.func.isRequired,
    handleEditComponent: PropTypes.func.isRequired,
    handleDeleteComponent: PropTypes.func.isRequired,
}

HelixCollectionList.defaultProps = {
    elevation: 10,
    cellHeight: 200,
    spacing: 10,
    columnSpan: 3,
}

export default HelixCollectionList