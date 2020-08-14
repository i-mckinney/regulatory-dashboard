import React from "react"
// import { Card, CardBody, CardTitle, CardSubtitle, CardText } from "reactstrap"
import PropTypes from "prop-types"

const EntityCard = ({
  RecordLabel,
  SystemOfRecord,
  ID,
  BorrowerName,
  RelationshipManager,
}) => {
  return (
    <div className="container entity-info-card-">

      <div className="entity-card-title">
        <h1>{RecordLabel}</h1>
      </div>
      <div className="entity-card-subtitle">
        System of Record: {SystemOfRecord}
      </div>
      <div className="entity-card-content">
        <ul>
          <li>{ID}</li>
          <li>{BorrowerName}</li>
          <li>{RelationshipManager}</li>
        </ul>
      </div>
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
