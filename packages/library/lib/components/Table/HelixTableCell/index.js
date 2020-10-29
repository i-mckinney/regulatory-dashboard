"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _core = require("@material-ui/core");

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _CheckCircle = _interopRequireDefault(require("@material-ui/icons/CheckCircle"));

var _Replay = _interopRequireDefault(require("@material-ui/icons/Replay"));

var _Save = _interopRequireDefault(require("@material-ui/icons/Save"));

var _Clear = _interopRequireDefault(require("@material-ui/icons/Clear"));

var _propTypes = _interopRequireDefault(require("prop-types"));

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
var entityTableCellStyles = (0, _core.makeStyles)(function () {
  return {
    initialState: {
      display: 'inline-block'
    },
    modifiedInitialState: {
      fontSize: '0.75rem',
      display: 'inline-block'
    },
    initialCell: {
      outline: 'none',
      '& input:focus': {
        outline: 'none'
      }
    },
    editedCell: {
      outline: 'none',
      '& input:focus': {
        outline: 'none'
      },
      backgroundColor: 'orange'
    },
    errorCell: {
      outline: 'none',
      '& input:focus': {
        outline: 'none'
      },
      backgroundColor: '#ffbcbb'
    },
    editedIcon: {
      fontSize: '1rem',
      color: 'green'
    },
    undoIcon: {
      fontSize: '1rem',
      color: 'red',
      cursor: 'pointer',
      "float": 'right',
      '&:focus': {
        outline: 'none'
      }
    },
    matButton: {
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0)'
      },
      '&:focus': {
        outline: 'none'
      }
    },
    matIcon: {
      fill: 'black'
    },
    matIconSpan: {
      display: 'block'
    },
    selectedRadio: {
      color: 'green'
    }
  };
});
/**
 * @param {string} value string represents table data cell value from Cell object property
 * @param {array} sourceOfTruthData array represents the array of original source of truth to compare with
 * @param {array} matchesToSoT matchesToSoT is an array of boolean that represents matches value to the source of truth
 * @param {func} handleSourceOfTruth handleSourceOfTruth is a func comes from parent component, once it is invoke, it will save new source and true value
 * @param {int} rowIndex index of the current row
 * @param {int} columnIndex index of the current column
 * @param {array} columns array of columns
 * @param {func} editData func comes from parent component, once it is invoke, it will pass the data back to parent component to edit data
 * @param {bool} editable represents whether this cell is editable or not
 * @param {bool} containActions represents whether this cell contains actions or not
 * @param {func} displayActions displays jsx object of actions
 * @returns {JSX} renders a custom table data cell
 */

var EntityTableCell = function EntityTableCell(_ref) {
  var initialStateValue = _ref.value,
      sourceOfTruthData = _ref.sourceOfTruthData,
      matchesToSoT = _ref.matchesToSoT,
      handleSourceOfTruth = _ref.handleSourceOfTruth,
      saveData = _ref.saveData,
      saveRadioData = _ref.saveRadioData,
      rowIndex = _ref.rowIndex,
      columnIndex = _ref.columnIndex,
      columns = _ref.columns,
      editData = _ref.editData,
      editable = _ref.editable,
      containActions = _ref.containActions,
      displayActions = _ref.displayActions;

  /**
   * 1) value will be data from props you get from Cell object property
   * 2) currentStateValue is a editable value data to display
   * 3) isDivHidden is a boolean to check whether div is hidden or not
   * 4) saveChanges is a boolean to check whether changes are saved
   * */
  var _useState = (0, _react.useState)(initialStateValue),
      _useState2 = _slicedToArray(_useState, 2),
      value = _useState2[0],
      setValue = _useState2[1];

  var _useState3 = (0, _react.useState)(value),
      _useState4 = _slicedToArray(_useState3, 2),
      currentStateValue = _useState4[0],
      setCurrentStateValue = _useState4[1];

  var _useState5 = (0, _react.useState)(true),
      _useState6 = _slicedToArray(_useState5, 2),
      isDivHidden = _useState6[0],
      setIsDivHidden = _useState6[1];

  var _useState7 = (0, _react.useState)(false),
      _useState8 = _slicedToArray(_useState7, 2),
      saveChanges = _useState8[0],
      setSaveChanges = _useState8[1]; // Creates an object for styling. Any className that matches key in the entityTableCellClasses object will have a corresponding styling


  var entityTableCellClasses = entityTableCellStyles(); // Text input can be typed in the input tag, when keyboard event is trigger

  var handleInputChange = function handleInputChange(e) {
    setValue(e.target.value);
  };
  /**
   * @returns {int} return current cell index in 1-dimension array
   * */


  var cellIndex = function cellIndex() {
    var colIndex = columnIndex;
    var currentRowIndex = rowIndex;
    var index = (columns.length - 1) * currentRowIndex + colIndex - 1;
    return index;
  }; // Saves the text input, displays current state edited text input, hide rest of the identifier tags
  // (e.g. button, span, etc...), send the data to parent component when the save button triggers


  var handleSaveChange = function handleSaveChange(e) {
    e.stopPropagation();
    setSaveChanges(true);
    setCurrentStateValue(value);
    setIsDivHidden(true);
    var currentCellIndex = cellIndex();
    editData(currentCellIndex, true, value);
    saveData(rowIndex, columnIndex, true, initialStateValue, value, sourceOfTruthData[rowIndex].trueValue === value);
  }; // Hides all identifier tags (e.g. button, div, span) when cancel button triggers


  var handleCancelChange = function handleCancelChange(e) {
    e.stopPropagation();
    setIsDivHidden(true);
  }; // Unhides all identifier tags (e.g. button, div, span) when particular cell div triggers


  var handleDivChange = function handleDivChange() {
    setIsDivHidden(false);
  }; // Reset current state edited text input, hides all identifier tags, display initial state value,
  // send the data to parent component when the reset triggers


  var handleResetChange = function handleResetChange(e) {
    e.stopPropagation();
    setCurrentStateValue("");
    setValue(initialStateValue);
    setIsDivHidden(true);
    setSaveChanges(false);
    var currentCellIndex = cellIndex();
    editData(currentCellIndex, false, "");
    saveData(rowIndex, columnIndex, false, initialStateValue, value, sourceOfTruthData[rowIndex].trueValue === value);
  }; // If there is not editable data shown, return intial-state
  // else there is editable data shown, return modified-initial-state


  var initialState = function initialState() {
    if (!saveChanges) {
      return entityTableCellClasses.initialState;
    }

    return entityTableCellClasses.modifiedInitialState;
  }; // Display the initial state value


  var displayInitialStateValue = function displayInitialStateValue() {
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: initialState()
    }, initialStateValue);
  }; // Display current state value of edited changes


  var displayCurrentStateChanges = function displayCurrentStateChanges() {
    if (saveChanges) {
      return /*#__PURE__*/_react["default"].createElement("div", null, currentStateValue, /*#__PURE__*/_react["default"].createElement(_CheckCircle["default"], {
        className: entityTableCellClasses.editedIcon
      }), /*#__PURE__*/_react["default"].createElement(_Replay["default"], {
        className: entityTableCellClasses.undoIcon,
        onClick: handleResetChange,
        onKeyDown: handleResetChange,
        role: "button",
        tabIndex: "0"
      }));
    }

    return null;
  }; // Display the customized form with input text box and save/cancel button


  var displayCustomizedForm = function displayCustomizedForm() {
    if (!isDivHidden) {
      return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("input", {
        type: "text",
        value: value,
        onChange: handleInputChange
      }), /*#__PURE__*/_react["default"].createElement("span", {
        className: entityTableCellClasses.matIconSpan
      }, /*#__PURE__*/_react["default"].createElement(_IconButton["default"], {
        className: entityTableCellClasses.matButton,
        "aria-label": "save",
        type: "button",
        onClick: handleSaveChange
      }, /*#__PURE__*/_react["default"].createElement(_Save["default"], {
        className: entityTableCellClasses.matIcon
      })), /*#__PURE__*/_react["default"].createElement(_IconButton["default"], {
        className: entityTableCellClasses.matButton,
        "aria-label": "clear",
        type: "button",
        onClick: handleCancelChange
      }, /*#__PURE__*/_react["default"].createElement(_Clear["default"], {
        className: entityTableCellClasses.matIcon
      }))));
    }

    return null;
  }; // If changes are made, display background color for that cell 'orange'
  // otherwise, display regular state of the cell


  var cellState = function cellState() {
    if (saveChanges) {
      return entityTableCellClasses.editedCell;
    } else if (sourceOfTruthData[rowIndex].trueValue !== initialStateValue && initialStateValue !== "") {
      return entityTableCellClasses.errorCell;
    }

    return entityTableCellClasses.initialCell;
  };

  var isRadioSelected = function isRadioSelected() {
    handleSourceOfTruth(rowIndex, columns[columnIndex].Accessor, currentStateValue || initialStateValue);
    saveRadioData(rowIndex, columns[columnIndex].Accessor, currentStateValue || initialStateValue);
  }; // displayTableCell return jsx object of editable table cell or non-editable table cell


  var displayTableCell = function displayTableCell() {
    if (editable) {
      return /*#__PURE__*/_react["default"].createElement(_core.TableCell, {
        className: cellState(),
        onClick: handleDivChange,
        onKeyDown: handleDivChange,
        role: "row",
        tabIndex: "0"
      }, /*#__PURE__*/_react["default"].createElement(_core.Radio, {
        className: entityTableCellClasses.selectedRadio,
        disabled: initialStateValue === "",
        checked: initialStateValue === sourceOfTruthData[rowIndex].trueValue && columns[columnIndex].Accessor === sourceOfTruthData[rowIndex].source,
        size: "small",
        color: "default",
        onClick: isRadioSelected
      }), displayInitialStateValue(), displayCurrentStateChanges(), displayCustomizedForm());
    } else if (containActions) {
      return /*#__PURE__*/_react["default"].createElement(_core.TableCell, null, displayActions());
    } else {
      return /*#__PURE__*/_react["default"].createElement(_core.TableCell, null, displayInitialStateValue());
    }
  };

  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, displayTableCell());
};

EntityTableCell.propTypes = {
  handleSourceOfTruth: _propTypes["default"].func.isRequired,
  matchesToSoT: _propTypes["default"].instanceOf(Array).isRequired,
  value: _propTypes["default"].string.isRequired,
  rowIndex: _propTypes["default"].number.isRequired,
  columnIndex: _propTypes["default"].number.isRequired,
  columns: _propTypes["default"].instanceOf(Array).isRequired,
  editData: _propTypes["default"].func.isRequired,
  editable: _propTypes["default"].bool.isRequired,
  containActions: _propTypes["default"].bool.isRequired,
  displayActions: _propTypes["default"].func.isRequired
};
EntityTableCell.defaultProps = {
  value: "",
  sourceOfTruthData: [],
  matchesToSoT: [],
  handleSourceOfTruth: function handleSourceOfTruth() {
    return null;
  },
  rowIndex: 0,
  columnIndex: 0,
  columns: [],
  editData: function editData() {
    return null;
  },
  editable: false,
  containActions: false,
  displayActions: function displayActions() {
    return null;
  }
};
var _default = EntityTableCell;
exports["default"] = _default;