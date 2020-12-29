import React from "react"
import { makeStyles } from "@material-ui/core"
import { Card, CardHeader, CardContent, Typography } from "@material-ui/core"
import PropTypes from "prop-types"

// Styling used for MaterialUI
const helixTableCardStyles = makeStyles(() => ({
  infoCardDiv: {
    paddingBottom: '25px',
  },
  infoCard: {
    boxShadow: '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)',
    backgroundColor: 'rgb(241, 239, 239)',
    transition: 'box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1)',
    display: 'block',
    position: 'relative',
    padding: '16px',
    borderRadius: '4px',
  },
  infoCardHeader: {
    paddingBottom: '0',
  },
  infoCardTitle: {
    marginBottom: '20px',
  },
  infoCardSubtitle: {
    marginBottom: '16px',
    color: 'rgba(0, 0, 0, 0.54)',
  },
  infoCardContent: {
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
 * @param {string} recordLabel API result property
 * @param {string} systemOfRecord API result property
 * @param {func} renderCardContent func render content of unordered list
 * @returns {JSX} renders a card component
 * */
const HelixTableCard = ({
  recordLabel,
  systemOfRecord,
  renderCardContent
}) => {
  // Creates an object for styling. Any className that matches key in the helixTableCardStyles object will have a corresponding styling
  const helixTableCardClasses = helixTableCardStyles();

  return (
    <div className={helixTableCardClasses.loanInfoCardDiv}>
      <Card className={helixTableCardClasses.loanInfoCard}>
        <CardHeader className={helixTableCardClasses.loanInfoCardHeader}
          title={<Typography className={helixTableCardClasses.loanInfoCardTitle} variant="h3" component="h1">
            {recordLabel}
          </Typography>}
          subheader={<Typography className={helixTableCardClasses.loanInfoCardSubtitle} variant="subtitle2" >
            {systemOfRecord}
          </Typography>}
        >
        </CardHeader>
        <CardContent className={helixTableCardClasses.loanInfoCardContent}>
            {renderCardContent()}
        </CardContent>
      </Card>
    </div>
  )
}

HelixTableCard.propTypes = {
  recordLabel: PropTypes.string.isRequired,
  systemOfRecord: PropTypes.string.isRequired,
  renderCardContent: PropTypes.func.isRequired
}

export default HelixTableCard
