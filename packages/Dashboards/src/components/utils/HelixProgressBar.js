import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  completed: {
    display: 'inline-block',
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Entities', 'Loan', 'Normalization Table', 'Summary'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return 'Entities';
    case 1:
      return 'Loan';
    case 2:
      return 'Normalization Table';
    case 3:
      return 'Summary'
    default:
      return 'Unknown step';
  }
}

export default function HorizontalNonLinearStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const steps = getSteps();

  const totalSteps = () => {
    return steps.length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
    
    if (newActiveStep === 2) {
      setOpenMenu(true)
    } else {
      setOpenMenu(false)
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [openMenu, setOpenMenu] = React.useState(false);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleAdditionalOptions = () => {
    console.log(openMenu)
    if (openMenu) {
      handleToggle()
    }
  }

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.root}>
        <Stepper nonLinear activeStep={activeStep}>
            {steps.map((label, index) => (
            <Step key={label}>
                {index === 2 ? (
                <StepButton 
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleAdditionalOptions} 
                completed={completed[index]}>
                {label}
                </StepButton>)
                : <StepLabel>{label}</StepLabel>
                }
            </Step>
            ))}
        </Stepper>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <MenuItem onClick={handleClose}>#5 Normalization Table</MenuItem>
                    <MenuItem onClick={handleClose}>#10 Normalization Table</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
        <div>
            <div>
                <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                <div>
                <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                    Back
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                >
                    Next
                </Button>
                </div>
            </div>
        </div>
    </div>
  );
}



















// import React from 'react';
// import PropTypes from 'prop-types';
// import { makeStyles, withStyles } from '@material-ui/core/styles';
// import clsx from 'clsx';
// import Stepper from '@material-ui/core/Stepper';
// import Step from '@material-ui/core/Step';
// import StepLabel from '@material-ui/core/StepLabel';
// import Check from '@material-ui/icons/Check';
// import SettingsIcon from '@material-ui/icons/Settings';
// import GroupAddIcon from '@material-ui/icons/GroupAdd';
// import VideoLabelIcon from '@material-ui/icons/VideoLabel';
// import StepConnector from '@material-ui/core/StepConnector';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';

// const QontoConnector = withStyles({
//   alternativeLabel: {
//     top: 10,
//     left: 'calc(-50% + 16px)',
//     right: 'calc(50% + 16px)',
//   },
//   active: {
//     '& $line': {
//       borderColor: '#784af4',
//     },
//   },
//   completed: {
//     '& $line': {
//       borderColor: '#784af4',
//     },
//   },
//   line: {
//     borderColor: '#eaeaf0',
//     borderTopWidth: 3,
//     borderRadius: 1,
//   },
// })(StepConnector);

// const useQontoStepIconStyles = makeStyles({
//   root: {
//     color: '#eaeaf0',
//     display: 'flex',
//     height: 22,
//     alignItems: 'center',
//   },
//   active: {
//     color: '#784af4',
//   },
//   circle: {
//     width: 8,
//     height: 8,
//     borderRadius: '50%',
//     backgroundColor: 'currentColor',
//   },
//   completed: {
//     color: '#784af4',
//     zIndex: 1,
//     fontSize: 18,
//   },
// });

// function QontoStepIcon(props) {
//   const classes = useQontoStepIconStyles();
//   const { active, completed } = props;

//   return (
//     <div
//       className={clsx(classes.root, {
//         [classes.active]: active,
//       })}
//     >
//       {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
//     </div>
//   );
// }

// QontoStepIcon.propTypes = {
//   /**
//    * Whether this step is active.
//    */
//   active: PropTypes.bool,
//   /**
//    * Mark the step as completed. Is passed to child components.
//    */
//   completed: PropTypes.bool,
// };

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: '100%',
//   },
//   button: {
//     marginRight: theme.spacing(1),
//   },
//   instructions: {
//     marginTop: theme.spacing(1),
//     marginBottom: theme.spacing(1),
//   },
// }));

// function getSteps() {
//   return ['Entities', 'Loan', 'Normalization Table', 'Summary'];
// }

// function getStepContent(step) {
//   switch (step) {
//     case 0:
//       return 'Entities';
//     case 1:
//       return 'Loan';
//     case 2:
//       return 'Normalization Table';
//     case 3:
//         return 'Summary';
//     default:
//       return 'Unknown step';
//   }
// }

// export default function CustomizedSteppers() {
//   const classes = useStyles();
//   const [activeStep, setActiveStep] = React.useState(0);
//   const steps = getSteps();

//   const handleNext = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

//   const handleReset = () => {
//     setActiveStep(0);
//   };

//   return (
//     <div className={classes.root}>
//       <Stepper alternativeLabel activeStep={activeStep}>
//         {steps.map((label) => (
//           <Step key={label}>
//             <StepLabel>{label}</StepLabel>
//           </Step>
//         ))}
//       </Stepper>
//       <div>
//         {activeStep === steps.length ? (
//           <div>
//             <Typography className={classes.instructions}>
//               All steps completed - you&apos;re finished
//             </Typography>
//             <Button onClick={handleReset} className={classes.button}>
//               Reset
//             </Button>
//           </div>
//         ) : (
//           <div>
//             <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
//             <div>
//               <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
//                 Back
//               </Button>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={handleNext}
//                 className={classes.button}
//               >
//                 {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
//               </Button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
