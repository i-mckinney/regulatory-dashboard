import React from 'react'
import { makeStyles, Paper, GridList, GridListTile } from '@material-ui/core'
import HelixCard from './HelixCard'
import PropTypes from 'prop-types'
import { getComparator, stableSort } from '../table/HelixTableSortFunc'

const helixCollectionListStyles = makeStyles(() => ({
    paper: {
        marginTop: '1rem',
    },
    gridList: {
        width: '100%',
        height: 500,
        transform: 'translateZ(0)',
    },
}))

const HelixCollectionList = (props) => {
    // Creates an object for styling. Any className that matches key in the helixCollectionListStyles object will have a corresponding styling
    const helixCollectionListClasses = helixCollectionListStyles()

    const sortedReports = stableSort(props.searchFilter.search(props.reportData), getComparator('asc', 'createdAt'))

    return (
    <Paper elevation={props.elevation} className={helixCollectionListClasses.paper}>
        <GridList cellHeight={props.cellHeight} spacing={props.spacing} cols={props.columnSpan} className={helixCollectionListClasses.gridList}>
            {sortedReports.map((report) => (
                <GridListTile key={report._id}>
                    <HelixCard 
                    user={props.user} 
                    lastModifiedBy={report.lastModifiedBy} 
                    createdAt={report.createdAt} 
                    handleEditReport={props.handleEditReport}
                    handleDeleteReport={props.handleDeleteReport}
                    />
                </GridListTile>
            ))}
        </GridList>
    </Paper>
    )
}

HelixCollectionList.propTypes = {
    user: PropTypes.string.isRequired,
    reportData: PropTypes.instanceOf(Array).isRequired,
    elevation: PropTypes.number.isRequired,
    cellHeight: PropTypes.number.isRequired,
    spacing: PropTypes.number.isRequired,
    columnSpan: PropTypes.number.isRequired,
    handleEditReport: PropTypes.func.isRequired,
    handleDeleteReport: PropTypes.func.isRequired,
}

HelixCollectionList.defaultProps = {
    elevation: 10,
    cellHeight: 200,
    spacing: 10,
    columnSpan: 3,
}

export default HelixCollectionList