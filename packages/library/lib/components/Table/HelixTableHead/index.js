"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _core = require("@material-ui/core");

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Styling used for MaterialUI
var helixTableHeadStyles = (0, _core.makeStyles)(function () {
  return {
    sortLabel: {
      color: "white!important"
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1
    }
  };
});
/**
 * @param {array} columns Array of object where each object contains which filter to use, header label and accessor for getting specific key from data object
 * @param {func} customHeadColumnKeyProp func represents custom function that return key props for table row in table head (required)
 * @param {string} order string represents ascending or descending order
 * @param {string} orderBy string represents which column should it order by
 * @param {func} onSort func that sort the table by column either ascending or descending order
 * @param {bool} toggleSearch bool represents true or false if table should have a search function
 * @returns {JSX} renders a custom table head for table
 */

var HelixTableHead = function HelixTableHead(_ref) {
  var columns = _ref.columns,
      customHeadColumnKeyProp = _ref.customHeadColumnKeyProp,
      order = _ref.order,
      orderBy = _ref.orderBy,
      onSort = _ref.onSort,
      toggleSearch = _ref.toggleSearch;
  // Creates an object for styling. Any className that matches key in the helixTableHeadStyles object will have a corresponding styling
  var helixTableHeadClasses = helixTableHeadStyles();
  /**
   * @param {string} column the column represents object containing headers
   * it passes the column header property back up to parent component to sort
   */

  var createSortHandler = function createSortHandler(column) {
    return function () {
      onSort(customHeadColumnKeyProp(column));
    };
  };
  /**
   * @return true if current order by is current column identifier else turn off active sorting
   */


  var isActive = function isActive(orderBy, column) {
    return orderBy === customHeadColumnKeyProp(column);
  };
  /**
   * @return the ascending order when clicked on a new column to order by otherwise descending order on the same column that we are at    
   */


  var orderByDirection = function orderByDirection(order, orderBy, column) {
    return orderBy === customHeadColumnKeyProp(column) ? order : 'asc';
  };
  /**
   * 
   * @param {object} column the column is an object that contains header label and header accessor
   * @return {jsx} return a jsx sortable column label or regular column label
   */


  var renderTableSortLabel = function renderTableSortLabel(column) {
    return column.Sortable ? /*#__PURE__*/_react["default"].createElement(_core.TableSortLabel, {
      className: helixTableHeadClasses.sortLabel,
      active: isActive(orderBy, column),
      direction: orderByDirection(order, orderBy, column),
      onClick: createSortHandler(column)
    }, column.Label, orderBy === customHeadColumnKeyProp(column) ? /*#__PURE__*/_react["default"].createElement("span", {
      className: helixTableHeadClasses.visuallyHidden
    }, order === 'desc' ? 'sorted descending' : 'sorted ascending') : null) : column.Label;
  };

  return /*#__PURE__*/_react["default"].createElement(_core.TableHead, null, /*#__PURE__*/_react["default"].createElement(_core.TableRow, null, columns.map(function (column) {
    return /*#__PURE__*/_react["default"].createElement(_core.TableCell, {
      key: customHeadColumnKeyProp(column),
      sortDirection: orderBy === customHeadColumnKeyProp(column) ? order : false
    }, toggleSearch ? renderTableSortLabel(column) : column.Label);
  })));
};

HelixTableHead.propTypes = {
  columns: _propTypes["default"].instanceOf(Array).isRequired,
  customHeadColumnKeyProp: _propTypes["default"].func.isRequired,
  order: _propTypes["default"].oneOf(['asc', 'desc', '']).isRequired,
  orderBy: _propTypes["default"].string.isRequired,
  onSort: _propTypes["default"].func.isRequired,
  toggleSearch: _propTypes["default"].bool.isRequired
};
HelixTableHead.defaultProps = {
  order: '',
  orderBy: '',
  toggleSearch: false
};
var _default = HelixTableHead;
exports["default"] = _default;