import React from "react"
import { Card, CardBody, CardTitle, CardSubtitle } from "reactstrap"
import PropTypes from "prop-types"

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
  return (
    <div className="entity-info-card-div">
      <Card className="entity-info-card">
        <CardBody>
          <div className="entity-info-card-header">
            <CardTitle className="entity-info-card-title">
              <h1>{RecordLabel}</h1>
            </CardTitle>
            <CardSubtitle className="entity-info-card-subtitle">
              System of Record: {SystemOfRecord}
            </CardSubtitle>
          </div>
          <div className="entity-info-card-content">
            <ul>
              <li>{ID}</li>
              <li>{BorrowerName}</li>
              <li>{RelationshipManager}</li>
            </ul>
          </div>
        </CardBody>
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
