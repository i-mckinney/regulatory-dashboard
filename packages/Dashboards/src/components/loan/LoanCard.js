import React from "react"
import { makeStyles } from "@material-ui/core"
import { Card, CardHeader, CardContent, Typography } from "@material-ui/core"
import PropTypes from "prop-types"

// Styling used for MaterialUI
const loanCardStyles = makeStyles(() => ({
  loanInfoCardDiv: {
    paddingBottom: '25px',
  },
  loanInfoCard: {
    boxShadow: '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)',
    backgroundColor: 'rgb(241, 239, 239)',
    transition: 'box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1)',
    display: 'block',
    position: 'relative',
    padding: '16px',
    borderRadius: '4px',
  },
  loanInfoCardHeader: {
    paddingBottom: '0',
  },
  loanInfoCardTitle: {
    marginBottom: '20px',
  },
  loanInfoCardSubtitle: {
    marginBottom: '16px',
    color: 'rgba(0, 0, 0, 0.54)',
  },
  loanInfoCardContent: {
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
 * @param {string} primaryBorrowerBID API result property
 * @param {string} primaryBorrowerName API result property
 * @param {string} guarantorName API result property
 * @returns {JSX} renders a loan card for edit loan dashboard
 * */
const LoanCard = ({
  recordLabel,
  systemOfRecord,
  primaryBorrowerBID,
  primaryBorrowerName,
  guarantorName,
}) => {
  // Creates an object for styling. Any className that matches key in the loanCardClasses object will have a corresponding styling
  const loanCardClasses = loanCardStyles();

  return (
    <div className={loanCardClasses.loanInfoCardDiv}>
      <Card className={loanCardClasses.loanInfoCard}>
        <CardHeader className={loanCardClasses.loanInfoCardHeader}
          title={<Typography className={loanCardClasses.loanInfoCardTitle} variant="h3" component="h1">
            {recordLabel}
          </Typography>}
          subheader={<Typography className={loanCardClasses.loanInfoCardSubtitle} variant="subtitle2" >
            System of Record: {systemOfRecord}
          </Typography>}
        >
        </CardHeader>
        <CardContent className={loanCardClasses.loanInfoCardContent}>
            <ul>
              <li>{`Primary Borrower ID: ${primaryBorrowerBID}`}</li>
              <li>{`Primary Borrower Name: ${primaryBorrowerName}`}</li>
              <li>{`Guarantor Name: ${guarantorName}` }</li>
            </ul>
        </CardContent>
      </Card>
    </div>
  )
}

LoanCard.propTypes = {
  recordLabel: PropTypes.string.isRequired,
  systemOfRecord: PropTypes.string.isRequired,
  primaryBorrowerBID: PropTypes.string.isRequired,
  primaryBorrowerName: PropTypes.string.isRequired,
  guarantorName: PropTypes.string.isRequired,
}

export default LoanCard
