"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _core = require("@material-ui/core");

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @param {array} columns Array of object where each object contains which filter to use, header label and accessor for getting specific key from data object
 * @param {array} rows API result from getting a list of items such as report templates, clients and etc.(depending on where it is used)
 * @param {int} rowsPerPage the rowsPerPage is a number of row per page
 * @param {int} page page is current page currently at
 * @param {func} customCellRender func represent custom func that return jsx of table row of table cell values
 * @param {func} customBodyRowKeyProp func represent custom func that return key props for the table row (required)
 * @param {string} order string represents ascending or descending order
 * @param {string} orderBy string represents which column should it order by
 * @param {func} getComparator func that set up a rule to compare the orderby column by acsending or descending order
 * @param {func} stableSort func that uses getComparator to sort it in order
 * @param {object} searchFilter object that contains a function for filtering search query
 * @param {bool} toggleSearch bool represents true or false if table should have a search function
 * @param {bool} toggleExpandable bool represents true or false if table should have a expandable rows
 * @param {func} customCollapsibleRowRender func represent custom func that return jsx of expandable table row
 * @returns {JSX} renders a custom table body for table
 */
var HelixTableBody = function HelixTableBody(_ref) {
  var columns = _ref.columns,
      rows = _ref.rows,
      rowsPerPage = _ref.rowsPerPage,
      page = _ref.page,
      customCellRender = _ref.customCellRender,
      customBodyRowKeyProp = _ref.customBodyRowKeyProp,
      order = _ref.order,
      orderBy = _ref.orderBy,
      getComparator = _ref.getComparator,
      stableSort = _ref.stableSort,
      searchFilter = _ref.searchFilter,
      toggleSearch = _ref.toggleSearch,
      toggleExpandable = _ref.toggleExpandable,
      customCollapsibleRowRender = _ref.customCollapsibleRowRender;
  //If rowsPerPage is always greater than 0, then we sort the rows by indicating column
  //and display rowsPerPage by each page
  //Else display all the sorted rows order by indicating columns
  var sortedRows = rowsPerPage > 0 ? stableSort(searchFilter.search(rows, columns), getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : stableSort(searchFilter.search(rows, columns), getComparator(order, orderBy));
  var dataRows = toggleSearch ? sortedRows : rows;

  var renderTableBody = function renderTableBody() {
    if (toggleExpandable) {
      return /*#__PURE__*/_react["default"].createElement(_core.TableBody, null, dataRows.map(function (row, rowIndex) {
        return customCollapsibleRowRender(row, rowIndex, columns, customCellRender);
      }));
    } else {
      return /*#__PURE__*/_react["default"].createElement(_core.TableBody, null, dataRows.map(function (row, rowIndex) {
        return /*#__PURE__*/_react["default"].createElement(_core.TableRow, {
          key: customBodyRowKeyProp(row)
        }, columns.map(function (column, columnIndex) {
          return customCellRender(row, column, rowIndex, columnIndex);
        }));
      }));
    }
  };

  return renderTableBody();
};

HelixTableBody.propTypes = {
  columns: _propTypes["default"].instanceOf(Array).isRequired,
  rows: _propTypes["default"].instanceOf(Array).isRequired,
  rowsPerPage: _propTypes["default"].number.isRequired,
  page: _propTypes["default"].number.isRequired,
  customCellRender: _propTypes["default"].func.isRequired,
  customBodyRowKeyProp: _propTypes["default"].func.isRequired,
  order: _propTypes["default"].string.isRequired,
  orderBy: _propTypes["default"].string.isRequired,
  getComparator: _propTypes["default"].func.isRequired,
  stableSort: _propTypes["default"].func.isRequired,
  searchFilter: _propTypes["default"].shape({
    search: _propTypes["default"].func.isRequired
  }).isRequired,
  toggleSearch: _propTypes["default"].bool.isRequired,
  toggleExpandable: _propTypes["default"].bool.isRequired
};
HelixTableBody.defaultProps = {
  rowsPerPage: 0,
  page: 0,
  order: '',
  orderBy: '',
  toggleSearch: false
};
var _default = HelixTableBody;
exports["default"] = _default;