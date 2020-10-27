import React from "react"
import { makeStyles } from "@material-ui/core"
import { Card, CardHeader, CardContent, Typography } from "@material-ui/core"
import PropTypes from "prop-types"

// Styling used for MaterialUI
const entityCardStyles = makeStyles(() => ({
  entityInfoCardDiv: {
    paddingBottom: '25px',
  },
  entityInfoCard: {
    boxShadow: '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)',
    backgroundColor: 'rgb(241, 239, 239)',
    transition: 'box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1)',
    display: 'block',
    position: 'relative',
    padding: '16px',
    borderRadius: '4px',
  },
  entityInfoCardHeader: {
    paddingBottom: '0',
  },
  entityInfoCardTitle: {
    marginBottom: '20px',
  },
  entityInfoCardSubtitle: {
    marginBottom: '16px',
    color: 'rgba(0, 0, 0, 0.54)',
  },
  entityInfoCardContent: {
    display: 'block',
    fontSize: '14px',
    paddingLeft: '5px',
    paddingTop: '0',
    "& ul": {
      marginBottom: '0'
    },
    "&:last-child": {
      paddingBottom: '0',
   }
  },
}));


/**
 * @param {string} RecordLabel API result property
 * @param {string} SystemOfRecord API result property
 * @param {string} ID API result property of  HeaderInfo object
 * @param {string} BorrowerName API result property of HeaderInfo object
 * @param {string} RelationshipManager API result property of HeaderInfo object
 * @returns {JSX} renders a entity card for edit entity dashboard
 * */
const EntityCard = ({
  RecordLabel,
  SystemOfRecord,
  ID,
  BorrowerName,
  RelationshipManager,
}) => {
  // Creates an object for styling. Any className that matches key in the entityCardClasses object will have a corresponding styling
  const entityCardClasses = entityCardStyles();

  return (
    <div className={entityCardClasses.entityInfoCardDiv}>
      <Card className={entityCardClasses.entityInfoCard}>
        <CardHeader className={entityCardClasses.entityInfoCardHeader}
          title={<Typography className={entityCardClasses.entityInfoCardTitle} variant="h3" component="h1">
            {RecordLabel}
          </Typography>}
          subheader={<Typography className={entityCardClasses.entityInfoCardSubtitle} variant="subtitle2" >
            System of Record: {SystemOfRecord}
          </Typography>}
        >
        </CardHeader>
        <CardContent className={entityCardClasses.entityInfoCardContent}>
            <ul>
              <li>{`ID: ${ID}`}</li>
              <li>{`Borrower Name: ${BorrowerName}`}</li>
              <li>{`Relationship Manager: ${RelationshipManager}` }</li>
            </ul>
        </CardContent>
      </Card>
    </div>
  )
}

EntityCard.propTypes = {
  RecordLabel: PropTypes.string.isRequired,
  SystemOfRecord: PropTypes.string.isRequired,
  ID: PropTypes.string.isRequired,
  BorrowerName: PropTypes.string.isRequired,
  RelationshipManager: PropTypes.string.isRequired,
}

export default EntityCard
