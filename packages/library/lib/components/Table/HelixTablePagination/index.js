"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _core = require("@material-ui/core");

var _index = _interopRequireDefault(require("../HelixTablePaginationActions/index"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @param {array} rows API result from getting a list of items such as report templates, clients and etc.(depending on where it is used)
 * @param {int} colSpan the colSpan is span on how many column spaces
 * @param {int} rowsPerPage the rowsPerPage is a number of row per page
 * @param {int} page page is current page currently at
 * @param {func} handleChangePage this function will be pass down to (child component) HelixTablePagination to handle page changes
 * @param {func} handleChangeRowsPerPage this function will be pass down to (child component) HelixTablePagination to handle how many rows per page changes 
 * @returns {JSX} renders a custom table pagination for table
 */
var HelixTablePagination = function HelixTablePagination(_ref) {
  var rows = _ref.rows,
      colSpan = _ref.colSpan,
      rowsPerPage = _ref.rowsPerPage,
      page = _ref.page,
      handleChangePage = _ref.handleChangePage,
      handleChangeRowsPerPage = _ref.handleChangeRowsPerPage;
  return /*#__PURE__*/_react["default"].createElement(_core.TablePagination, {
    rowsPerPageOptions: [5, 10, 25, 50, {
      label: 'All',
      value: -1
    }],
    colSpan: colSpan,
    count: rows.length,
    rowsPerPage: rowsPerPage,
    page: page,
    SelectProps: {
      inputProps: {
        'aria-label': 'rows per page'
      },
      "native": true
    },
    onChangePage: handleChangePage,
    onChangeRowsPerPage: handleChangeRowsPerPage,
    ActionsComponent: _index["default"]
  });
};

HelixTablePagination.propTypes = {
  rows: _propTypes["default"].instanceOf(Array).isRequired,
  colSpan: _propTypes["default"].number.isRequired,
  rowsPerPage: _propTypes["default"].number.isRequired,
  page: _propTypes["default"].number.isRequired,
  handleChangePage: _propTypes["default"].func.isRequired,
  handleChangeRowsPerPage: _propTypes["default"].func.isRequired
};
var _default = HelixTablePagination;
exports["default"] = _default;