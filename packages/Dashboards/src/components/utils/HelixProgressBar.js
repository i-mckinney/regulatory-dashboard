import React, { useState, useEffect, useRef } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  completed: {
    display: "inline-block",
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  icon: {
    // color: theme.palette.secondary.main,
    // "&$activeIcon": {
    //   color: theme.palette.secondary.main,
    // },
    "&$completedIcon": {
      color: theme.palette.success.main,
    },
  },
  // activeIcon: {},
  completedIcon: {},
}));

function getStepContent(step) {
  switch (step) {
    case 0:
      return "Entities";
    case 1:
      return "Loan";
    case 2:
      return "Normalization Table";
    case 3:
      return "Summary";
    default:
      return "Unknown step";
  }
}

const HelixGreenStep = withStyles({
  root: {
    "&$completed": {
      color: "lightgreen",
    },
    "&$active": {
      color: "pink",
    },
    "&$disabled": {
      color: "red",
    },
  },
  alternativeLabel: {},
  active: {}, //needed so that the &$active tag works
  completed: {},
  disabled: {},
})((props) => <Step {...props} />);

function HelixProgressBar({ steps = [], activeStep, setActiveStep }) {
  const helixProgressBarClasses = useStyles();
  const [completed] = useState({});

  // totalSteps get the total steps
  const totalSteps = () => {
    return steps.length;
  };

  // isLastStep checks is this step the last step
  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  // handleNext moves to the next steps
  const handleNext = () => {
    const newActiveStep = isLastStep()
      ? // It's the last step, but not all steps have been completed,
        // find the first step that has been completed
        steps.findIndex((step, i) => !(i in completed))
      : activeStep + 1;
    setActiveStep(newActiveStep);

    if (newActiveStep === 2) {
      setOpenMenu(true);
    } else {
      setOpenMenu(false);
    }
  };

  // handleBack goes back one page
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    if (activeStep - 1 === 2) {
      setOpenMenu(true);
    } else {
      setOpenMenu(false);
    }
  };

  //open is boolean that allow menu list to open
  const [open, setOpen] = useState(false);

  // anchorRef is a reference of StepperButton
  const anchorRef = useRef(null);

  // openMenu is a boolean tells us the current state when we can open the menu
  const [openMenu, setOpenMenu] = useState(true);

  // handleToggle toggles opening of the menu list
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  // handleAdditionalOptions checks for openMenu is the current step to click for additional menu list
  const handleAdditionalOptions = () => {
    console.log('hie')
    setOpen(!open)
    // if (openMenu) {
    //   handleToggle();
    // }
  };

  /**
   * @param {object} event the event object
   */
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  /**
   * @param {object} event the event object
   */
  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  const handleStep = (step) => () => {
    setActiveStep(step);
  };
  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={helixProgressBarClasses.root}>
      <Stepper nonLinear={false} activeStep={activeStep}>
        {steps.map((label, index) => {
          if(index ===2){
            console.log("yoyo")
          }
          return (
            <Step key={label}>
              {index === 2 ? (
                <StepLabel
                  onClick={handleAdditionalOptions}
                  ref={anchorRef}
                  aria-controls={open ? "menu-list-grow" : undefined}
                  aria-haspopup="true"
                >
                  {label}
                </StepLabel>
              ) : (
                <StepLabel
                  StepIconProps={{
                    classes: {
                      root: helixProgressBarClasses.icon,
                      active: helixProgressBarClasses.activeIcon,
                      completed: helixProgressBarClasses.completedIcon,
                    },
                  }}
                  onClick={handleStep(index)}
                >
                  {label}
                </StepLabel>
              )}
            </Step>
          );
        })}
      </Stepper>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem onClick={handleClose}>
                    #5 Normalization Table
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    #10 Normalization Table
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
      {/* <div>
          <div>
            <Typography className={helixProgressBarClasses.instructions}>{getStepContent(activeStep)}</Typography>
            <div>
              <Button disabled={activeStep === 0} onClick={handleBack} className={helixProgressBarClasses.button}>
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={helixProgressBarClasses.button}
              >
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        </div> */}
    </div>
  );
}

export default HelixProgressBar;
