import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Checkbox } from "@material-ui/core";
import { green } from "@material-ui/core/colors";

/* Redners a Checkbox when selected, has a green color background */
const HelixGreenCheckbox = withStyles({
  root: {
    color: "default",
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

export default HelixGreenCheckbox;
