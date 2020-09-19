"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _FirstPage = _interopRequireDefault(require("@material-ui/icons/FirstPage"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _KeyboardArrowLeft = _interopRequireDefault(require("@material-ui/icons/KeyboardArrowLeft"));

var _KeyboardArrowRight = _interopRequireDefault(require("@material-ui/icons/KeyboardArrowRight"));

var _LastPage = _interopRequireDefault(require("@material-ui/icons/LastPage"));

var _styles = require("@material-ui/core/styles");

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Styling used for MaterialUI
var tablePaginationActionsStyles = (0, _styles.makeStyles)(function () {
  return {
    paginationButton: {
      flexShrink: 0,
      marginLeft: 7
    }
  };
});
/**
 * @param {int} count count is total amount of row data
 * @param {int} page page is current page currently at
 * @param {int} rowsPerPage the rowsPerPage is a number of row per page
 * @param {func} onChangePage this function will handle page changes and sends it back up to parent component
 * @returns {JSX} renders a custom table pagination actions for table
 */

var HelixTablePaginationActions = function HelixTablePaginationActions(_ref) {
  var count = _ref.count,
      page = _ref.page,
      rowsPerPage = _ref.rowsPerPage,
      onChangePage = _ref.onChangePage;
  // Creates an object for styling. Any className that matches key in the tablePaginationActionsStyles object will have a corresponding styling
  var tablePaginationActionsClasses = tablePaginationActionsStyles();
  /**
   * handleFirstPageButtonClick will change the page to the first page
   */

  var handleFirstPageButtonClick = function handleFirstPageButtonClick() {
    onChangePage(0);
  };
  /**
   * handleBackButtonClick will change the page to go back one page before (current page - 1)
   */


  var handleBackButtonClick = function handleBackButtonClick() {
    onChangePage(page - 1);
  };
  /**
   * handleNextButtonClick will change the page to go next page (current page + 1)
   */


  var handleNextButtonClick = function handleNextButtonClick() {
    onChangePage(page + 1);
  };
  /**
   * handleLastPageButtonClick will change teh page to the last page 
   */


  var handleLastPageButtonClick = function handleLastPageButtonClick() {
    onChangePage(Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: tablePaginationActionsClasses.paginationButton
  }, /*#__PURE__*/_react["default"].createElement(_IconButton["default"], {
    onClick: handleFirstPageButtonClick,
    disabled: page === 0,
    "aria-label": "first page"
  }, /*#__PURE__*/_react["default"].createElement(_FirstPage["default"], null)), /*#__PURE__*/_react["default"].createElement(_IconButton["default"], {
    onClick: handleBackButtonClick,
    disabled: page === 0,
    "aria-label": "previous page"
  }, /*#__PURE__*/_react["default"].createElement(_KeyboardArrowLeft["default"], null)), /*#__PURE__*/_react["default"].createElement(_IconButton["default"], {
    onClick: handleNextButtonClick,
    disabled: page >= Math.ceil(count / rowsPerPage) - 1,
    "aria-label": "next page"
  }, /*#__PURE__*/_react["default"].createElement(_KeyboardArrowRight["default"], null)), /*#__PURE__*/_react["default"].createElement(_IconButton["default"], {
    onClick: handleLastPageButtonClick,
    disabled: page >= Math.ceil(count / rowsPerPage) - 1,
    "aria-label": "last page"
  }, /*#__PURE__*/_react["default"].createElement(_LastPage["default"], null)));
};

HelixTablePaginationActions.propTypes = {
  count: _propTypes["default"].number.isRequired,
  page: _propTypes["default"].number.isRequired,
  rowsPerPage: _propTypes["default"].number.isRequired,
  onChangePage: _propTypes["default"].func.isRequired
};
var _default = HelixTablePaginationActions;
exports["default"] = _default;