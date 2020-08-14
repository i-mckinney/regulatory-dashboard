import React from "react"

const EntityCard = ({
  RecordLabel,
  SystemOfRecord,
  ID,
  BorrowerName,
  RelationshipManager,
}) => {
  return (
    <div className="textbox">
      <div>
        <h2>{RecordLabel}</h2>
      </div>
      <div>System of Record: {SystemOfRecord}</div>
      <div>
        <ul>
          <li>{ID}</li>
          <li>{BorrowerName}</li>
          <li>{RelationshipManager}</li>
        </ul>
      </div>
    </div>
  )
}

// EntityCard.propTypes = {
//   RecordLabel: PropTypes.string.isRequired
// }

export default EntityCard
