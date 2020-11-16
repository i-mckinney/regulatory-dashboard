import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import { Toolbar, Typography, IconButton, Tooltip } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

const useToolbarStyles = makeStyles((theme) => ({
  selectTableToolBarRoot: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  toolBarHighlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  toolbarTitle: {
    flex: "1 1 100%",
  },
}));
/**
 * @param {num} numSelected number of rows that are selected
 * @param {func} handleDeleteRow function to delete rows that are selected
 * @return renders a table tool bar that shows selected rows and functionality to delete selected rows
 */
function SelectTableToolBar(props) {
  const selectTableToolBarClasses = useToolbarStyles();
  const { numSelected, handleDeleteRow } = props;

  return (
    <Toolbar
      className={clsx(selectTableToolBarClasses.selectTableToolBarRoot, {
        [selectTableToolBarClasses.toolBarHighlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={selectTableToolBarClasses.toolbarTitle}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={selectTableToolBarClasses.toolbarTitle}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          <strong>Discrepancy Table Summary</strong>
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton
            aria-label="delete"
            onClick={handleDeleteRow}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : null}
    </Toolbar>
  );
}

SelectTableToolBar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default SelectTableToolBar;
