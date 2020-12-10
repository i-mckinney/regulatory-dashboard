import React, { useState, useEffect, useRef } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuList from "@material-ui/core/MenuList";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
  },
  stepperRoot: {
    backgroundColor: "rgb(250,250,250)",
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


function HelixProgressBar({
  steps = [],
  activeStep,
  setActiveStep,
}) {
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
  const [check, setCheck] = useState(false);

  // anchorRef is a reference of StepperButton
  const anchorRef = useRef(null);

  // openMenu is a boolean tells us the current state when we can open the menu
  const [openMenu, setOpenMenu] = useState(true);

  // handleAdditionalOptions checks for openMenu is the current step to click for additional menu list
  const handleAdditionalOptions = () => {
    setOpen(!open);
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

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={helixProgressBarClasses.container}>
      <div>
        <Stepper
          nonLinear={false}
          activeStep={activeStep}
          classes={{
            root: helixProgressBarClasses.stepperRoot,
          }}
        >
          {steps.map((step, index) => {
            const label = step.label;

            return (
              <Step key={step.label + step.status}>
                {label === "Normalization Table" ? (
                  <StepLabel
                    StepIconProps={{
                      classes: {
                        root: helixProgressBarClasses.icon,
                        active: helixProgressBarClasses.activeIcon,
                        completed: helixProgressBarClasses.completedIcon,
                      },
                    }}
                    onClick={handleAdditionalOptions}
                    ref={anchorRef}
                    aria-controls={open ? "menu-list-grow" : undefined}
                    aria-haspopup="true"
                  >
                    Normalization Table
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
                  >
                    {label}
                  </StepLabel>
                )}
              </Step>
            );
          })}
        </Stepper>
      </div>
    </div>
  );
}

export default HelixProgressBar;
