"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _core = require("@material-ui/core");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _index = _interopRequireDefault(require("../HelixTableHead/index"));

var _index2 = _interopRequireDefault(require("../HelixTableBody/index"));

var _index3 = _interopRequireDefault(require("../HelixTableFooter/index"));

var _index4 = _interopRequireDefault(require("../HelixToolBarSearch/index"));

var _index5 = require("../HelixTableSortFunc/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// Styling used for MaterialUI
var helixTableStyles = (0, _core.makeStyles)(function () {
  return {
    helixTable: {
      '& table': {
        width: '100%',
        display: 'table',
        borderTopRightRadius: '4px',
        borderTopLeftRadius: '4px',
        boxSizing: 'border-box',
        borderSpacing: '2px',
        borderColor: 'grey',
        '& tr': {
          border: 'none',
          backgroundColor: 'white',
          '&:nth-child(even)': {
            backgroundColor: '#d3e9ff'
          },
          '&:hover': {
            backgroundColor: '#add8e6'
          },
          '&:last-child': {
            borderBottomRightRadius: '4px',
            borderBottomLeftRadius: '4px'
          }
        },
        '& th': {
          backgroundColor: '#2e353d',
          color: 'white',
          margin: '0',
          borderBottom: 'solid 1px #e0e4e8',
          padding: '8px'
        },
        '& td': {
          margin: '0',
          borderBottom: 'solid 1px #e0e4e8',
          padding: '8px'
        },
        '&:last-children': {
          borderBottom: 'none'
        }
      }
    }
  };
});
/**
 * 
 * ###Params
 * * _**columns**_ **\<array\>** Array of object where each object contains which filter to use, header label and accessor for getting specific key from data object
 * * _**rows**_ **\<array\>**  API result from getting a list of items such as report templates, clients and etc.(depending on where it is used)
 * * _**customCellRender**_ **\<func\>** customCellRender func represents custom func that return jsx of table row of table cell values
 * * _**customHeadRowProps**_ **\<func\>**  func represents custom func that return key props for table row in table head (required)
 * * _**customBodyRowProps**_ **\<func\>**  func represents custom func that return key props for the table row in table body (required)
 * * _**initialOrderBy**_ **\<string\>** string represents what the column in the table should order by initially
 * * _**displayCreateIcon**_ **\<func\>** func displays jsx object of create icon into toolbar
 * 
 * ###Returns 
 * * **\<JSX\>** renders a react custom table component
 */

var HelixTable = function HelixTable(_ref) {
  var columns = _ref.columns,
      rows = _ref.rows,
      customCellRender = _ref.customCellRender,
      customHeadColumnKeyProp = _ref.customHeadColumnKeyProp,
      customBodyRowKeyProp = _ref.customBodyRowKeyProp,
      initialOrderBy = _ref.initialOrderBy,
      toggleSearch = _ref.toggleSearch,
      toggleExpandable = _ref.toggleExpandable,
      displayCreateIcon = _ref.displayCreateIcon,
      customCollapsibleRowRender = _ref.customCollapsibleRowRender;
  // Creates an object for styling. Any className that matches key in the helixTableStyles object will have a corresponding styling
  var helixTableClasses = helixTableStyles(); // Page is needed for pagination to determine the process of what page it is at

  var _useState = (0, _react.useState)(0),
      _useState2 = _slicedToArray(_useState, 2),
      page = _useState2[0],
      setPage = _useState2[1]; // rowsPerPage is needed for pagination to determine how many rows should be display per page


  var _useState3 = (0, _react.useState)(5),
      _useState4 = _slicedToArray(_useState3, 2),
      rowsPerPage = _useState4[0],
      setRowsPerPage = _useState4[1];
  /**
   * @param {int} newPage the newPage passed from the child component
   * it sets a new page
   */


  var handleChangePage = function handleChangePage(newPage) {
    setPage(newPage);
  };
  /**
   * @param {event} event the event object hold the property of input value that passed from the child component
   * it sets row per page by specific value and set the page to 0
   */


  var handleChangeRowsPerPage = function handleChangeRowsPerPage(event) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }; // order is a conditional string for ascending or descending order


  var _useState5 = (0, _react.useState)('asc'),
      _useState6 = _slicedToArray(_useState5, 2),
      order = _useState6[0],
      setOrder = _useState6[1]; // orderBy is a string to order by column in ascending or descending order


  var _useState7 = (0, _react.useState)(initialOrderBy),
      _useState8 = _slicedToArray(_useState7, 2),
      orderBy = _useState8[0],
      setOrderBy = _useState8[1];
  /**
   * @param {string} property the property is a column header
   */


  var onSort = function onSort(property) {
    var isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  }; // searchFilter contains a func that store filter query search upon user input


  var _useState9 = (0, _react.useState)({
    search: function search(rows, columns) {
      return rows;
    }
  }),
      _useState10 = _slicedToArray(_useState9, 2),
      searchFilter = _useState10[0],
      setSearchFilter = _useState10[1];
  /**
   * @param {object} event the event object contains user input
   * Pass the user query input to searchFilter and it store which object matches the query 
   */


  var onSearch = function onSearch(event) {
    var value = event.target.value;
    setSearchFilter({
      search: function search(rows, columns) {
        if (value === '') return rows;else return rows.filter(function (row) {
          return columns.filter(function (column) {
            var columnAccessor = column.Accessor;

            if (typeof row[columnAccessor] === 'string') {
              return row[columnAccessor].toLowerCase().includes(value.toLowerCase());
            }

            try {
              var assignedRoles = row[columnAccessor].reduce(function (result, roles) {
                return "".concat(result, " ").concat(roles).trim();
              }, "");
              return assignedRoles.toLowerCase().includes(value.toLowerCase());
            } catch (error) {
              console.log("Error Type", error);
              return error;
            }
          }).length > 0 ? true : false;
        });
      }
    });
  };

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: helixTableClasses.helixTable
  }, toggleSearch ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_index4["default"], {
    onSearch: onSearch,
    displayCreateIcon: displayCreateIcon
  }), /*#__PURE__*/_react["default"].createElement(_core.TableContainer, {
    component: _core.Paper
  }, /*#__PURE__*/_react["default"].createElement(_core.Table, {
    "aria-label": "table"
  }, /*#__PURE__*/_react["default"].createElement(_index["default"], {
    toggleSearch: toggleSearch,
    toggleExpandable: toggleExpandable,
    order: order,
    orderBy: orderBy,
    onSort: onSort,
    columns: columns,
    customHeadColumnKeyProp: customHeadColumnKeyProp
  }), /*#__PURE__*/_react["default"].createElement(_index2["default"], {
    toggleSearch: toggleSearch,
    toggleExpandable: toggleExpandable,
    customCollapsibleRowRender: customCollapsibleRowRender,
    searchFilter: searchFilter,
    order: order,
    orderBy: orderBy,
    getComparator: _index5.getComparator,
    stableSort: _index5.stableSort,
    columns: columns,
    rows: rows,
    rowsPerPage: rowsPerPage,
    page: page,
    customCellRender: customCellRender,
    customBodyRowKeyProp: customBodyRowKeyProp
  }), /*#__PURE__*/_react["default"].createElement(_index3["default"], {
    toggleExpandable: toggleExpandable,
    rows: rows,
    colSpan: columns.length,
    rowsPerPage: rowsPerPage,
    page: page,
    handleChangePage: handleChangePage,
    handleChangeRowsPerPage: handleChangeRowsPerPage
  })))) : /*#__PURE__*/_react["default"].createElement(_core.TableContainer, {
    component: _core.Paper
  }, /*#__PURE__*/_react["default"].createElement(_core.Table, {
    "aria-label": "table"
  }, /*#__PURE__*/_react["default"].createElement(_index["default"], {
    toggleExpandable: toggleExpandable,
    onSort: onSort,
    columns: columns,
    customHeadColumnKeyProp: customHeadColumnKeyProp
  }), /*#__PURE__*/_react["default"].createElement(_index2["default"], {
    toggleExpandable: toggleExpandable,
    customCollapsibleRowRender: customCollapsibleRowRender,
    searchFilter: searchFilter,
    getComparator: _index5.getComparator,
    stableSort: _index5.stableSort,
    columns: columns,
    rows: rows,
    customCellRender: customCellRender,
    customBodyRowKeyProp: customBodyRowKeyProp
  }))));
};

HelixTable.propTypes = {
  columns: _propTypes["default"].instanceOf(Array).isRequired,
  rows: _propTypes["default"].instanceOf(Array).isRequired,
  customCellRender: _propTypes["default"].func.isRequired,
  customHeadColumnKeyProp: _propTypes["default"].func.isRequired,
  customBodyRowKeyProp: _propTypes["default"].func.isRequired,
  initialOrderBy: _propTypes["default"].string.isRequired,
  toggleSearch: _propTypes["default"].bool.isRequired,
  toggleExpandable: _propTypes["default"].bool.isRequired,
  displayCreateIcon: _propTypes["default"].func.isRequired,
  customCollapsibleRowRender: _propTypes["default"].func.isRequired
};
HelixTable.defaultProps = {
  initialOrderBy: '',
  toggleSearch: false,
  toggleExpandable: false,
  displayCreateIcon: function displayCreateIcon() {
    return null;
  }
};
var _default = HelixTable;
exports["default"] = _default;