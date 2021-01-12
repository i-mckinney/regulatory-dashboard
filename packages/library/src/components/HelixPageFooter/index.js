import React from "react"
import { makeStyles, Typography, Link, Box } from "@material-ui/core"

const footerStyles = makeStyles((theme) => ({
  root: {},
  pageFooter: {
    padding: theme.spacing(4),
    display: "flex",
    marginBottom: theme.spacing(2),
  },
}))

export default function HelixPageFooter() {
  const footerClasses = footerStyles()

  // Returns a copyright notice pertaining to the current year, and a link to the Helix website
  const Copyright = () => {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <Link href="https://www.helixcp.com/">
          Helix Consulting Partners
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    )
  }

  return (
    <div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </div>
  )
}
