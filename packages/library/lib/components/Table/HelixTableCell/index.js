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

var _index = _interopRequireDefault(require("../../HelixTextField/index"));

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
var helixTableCellStyles = (0, _core.makeStyles)(function () {
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
    greyCell: {
      outline: 'none',
      '& input:focus': {
        outline: 'none'
      },
      backgroundColor: '#f1efef'
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
      fill: 'black',
      '& button': {
        marginRight: 'unset'
      }
    },
    matIconSpan: {
      display: 'block',
      "float": 'right'
    },
    selectedRadio: {
      color: 'green'
    },
    editedField: {
      color: 'green'
    },
    matEditIcon: {
      '& button': {
        "float": 'right'
      }
    },
    helixInput: {
      marginTop: '16px'
    },
    pWaterMark: {
      padding: '.5px',
      fontSize: '11px',
      fontWeight: 1000,
      color: '#555555'
    }
  };
});
/**
 * @param {string} value string represents table data cell value from Cell object property
 * @param {int} rowIndex index of the current row
 * @param {int} columnIndex index of the current column
 * @param {array} columns array of columns
 * @param {bool} editable represents whether this cell is editable or not
 * @param {bool} containActions represents whether this cell contains actions or not
 * @param {func} displayActions displays jsx object of actions
 * @param {func} saveEntityData func that allow data to be saved and pass to next component
 * @param {func} saveRadioData func that save radio button data selected
 * @param {string} source string that represents column value
 * @param {string} sourceTrueValue string that represents value of the selected cell
 * @param {array} externalValues array of external values from source system
 * @returns {JSX} renders a custom HelixTableCell
 */

var HelixTableCell = function HelixTableCell(_ref) {
  var initialStateValue = _ref.value,
      rowIndex = _ref.rowIndex,
      columnIndex = _ref.columnIndex,
      columns = _ref.columns,
      editable = _ref.editable,
      containActions = _ref.containActions,
      displayActions = _ref.displayActions,
      saveEntityData = _ref.saveEntityData,
      saveRadioData = _ref.saveRadioData,
      source = _ref.source,
      sourceTrueValue = _ref.sourceTrueValue,
      externalValues = _ref.externalValues,
      isBold = _ref.isBold;

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

  var _useState3 = (0, _react.useState)(value === 'NULL' ? '' : value),
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
      setSaveChanges = _useState8[1]; // Creates an object for styling. Any className that a key in the helixTableCellStyles object will have a corresponding styling


  var helixTableCellClasses = helixTableCellStyles(); // Text input can be typed in the input tag, when keyboard event is trigger

  var handleInputChange = function handleInputChange(e) {
    setValue(e.target.value);
  }; // Saves the text input, displays current state edited text input, hide rest of the identifier tags
  // (e.g. button, span, etc...), send the data to parent component when the save button triggers


  var handleSaveChange = function handleSaveChange(e) {
    e.stopPropagation();
    setSaveChanges(true);
    setCurrentStateValue(value);
    setIsDivHidden(true);
    saveEntityData(rowIndex, columnIndex, true, initialStateValue, value, sourceTrueValue === value, source);
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
    saveEntityData(rowIndex, columnIndex, false, initialStateValue, value, sourceTrueValue === value, source);
  }; // If there is not editable data shown, return intial-state
  // else there is editable data shown, return modified-initial-state


  var initialState = function initialState() {
    if (!saveChanges) {
      return helixTableCellClasses.initialState;
    }

    return helixTableCellClasses.modifiedInitialState;
  }; // Display the initial state value


  var displayInitialStateValue = function displayInitialStateValue() {
    return /*#__PURE__*/_react["default"].createElement("div", {
      onClick: handleDivChange,
      className: initialState()
    }, isBold ? /*#__PURE__*/_react["default"].createElement("b", null, initialStateValue) : initialStateValue);
  }; // Display the external value that exist in that source system


  var displayExternalValue = function displayExternalValue() {
    var initialValue = initialStateValue === 'NULL' ? '' : initialStateValue;

    if (externalValues[rowIndex][columnIndex - 1] !== initialValue) {
      return "External Value Received: ".concat(externalValues[rowIndex][columnIndex - 1]);
    }

    return null;
  }; // Display current state value of edited changes


  var displayCurrentStateChanges = function displayCurrentStateChanges() {
    if (saveChanges) {
      return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("span", {
        className: helixTableCellClasses.editedField,
        onClick: handleDivChange
      }, currentStateValue), /*#__PURE__*/_react["default"].createElement(_CheckCircle["default"], {
        className: helixTableCellClasses.editedIcon
      }), /*#__PURE__*/_react["default"].createElement(_Replay["default"], {
        className: helixTableCellClasses.undoIcon,
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
      return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("span", null, displayExternalValue()), /*#__PURE__*/_react["default"].createElement(_index["default"], {
        className: helixTableCellClasses.helixInput,
        value: value,
        onChange: handleInputChange,
        label: "Value",
        fullWidth: true
      }), /*#__PURE__*/_react["default"].createElement("span", {
        className: helixTableCellClasses.matIconSpan
      }, /*#__PURE__*/_react["default"].createElement(_IconButton["default"], {
        className: helixTableCellClasses.matButton,
        "aria-label": "save",
        type: "button",
        onClick: handleSaveChange
      }, /*#__PURE__*/_react["default"].createElement(_Save["default"], {
        className: helixTableCellClasses.matIcon
      })), /*#__PURE__*/_react["default"].createElement(_IconButton["default"], {
        className: helixTableCellClasses.matButton,
        "aria-label": "clear",
        type: "button",
        onClick: handleCancelChange
      }, /*#__PURE__*/_react["default"].createElement(_Clear["default"], {
        className: helixTableCellClasses.matIcon
      }))));
    }

    return null;
  }; // Display character 'p' when proposed value is introduce by user input from previous discrepancy report submission


  var proposedWaterMark = function proposedWaterMark() {
    if (initialStateValue !== externalValues[rowIndex][columnIndex - 1] && initialStateValue !== "NULL") {
      return /*#__PURE__*/_react["default"].createElement("span", {
        className: helixTableCellClasses.pWaterMark
      }, "p");
    }

    return null;
  }; // If changes are made, display background color for that cell 'orange'
  // otherwise, display regular state of the cell


  var cellState = function cellState() {
    if (saveChanges) {
      return helixTableCellClasses.editedCell;
    } else if (initialStateValue === "NULL") {
      return helixTableCellClasses.greyCell;
    } else if (sourceTrueValue !== initialStateValue && initialStateValue !== "NULL") {
      return helixTableCellClasses.errorCell;
    }

    return helixTableCellClasses.initialCell;
  }; // selectedRadio saves the selected radio button data with its source and value


  var selectedRadio = function selectedRadio() {
    saveRadioData(rowIndex, columns[columnIndex].customApiId, currentStateValue || initialStateValue);
  }; // displayTableCell return jsx object of editable table cell or non-editable table cell


  var displayTableCell = function displayTableCell() {
    if (editable) {
      return /*#__PURE__*/_react["default"].createElement(_core.TableCell, {
        className: cellState(),
        role: "row",
        tabIndex: "0",
        style: {
          minWidth: 175
        }
      }, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        container: true,
        direction: "row",
        justify: "flex-start",
        alignItems: "center",
        spacing: 2
      }, /*#__PURE__*/_react["default"].createElement(_core.Grid, null, /*#__PURE__*/_react["default"].createElement(_core.Radio, {
        className: helixTableCellClasses.selectedRadio,
        disabled: initialStateValue === "NULL",
        checked: (currentStateValue || initialStateValue) === sourceTrueValue && columns[columnIndex].customApiId === source,
        size: "small",
        color: "default",
        onClick: selectedRadio
      })), /*#__PURE__*/_react["default"].createElement(_core.Grid, null, displayInitialStateValue(), proposedWaterMark())), displayCurrentStateChanges(), displayCustomizedForm());
    } else if (containActions) {
      return /*#__PURE__*/_react["default"].createElement(_core.TableCell, {
        className: helixTableCellClasses.initialCell
      }, displayActions());
    } else {
      return /*#__PURE__*/_react["default"].createElement(_core.TableCell, {
        className: helixTableCellClasses.initialCell
      }, displayInitialStateValue());
    }
  };

  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, displayTableCell());
};

HelixTableCell.propTypes = {
  value: _propTypes["default"].string.isRequired,
  rowIndex: _propTypes["default"].number.isRequired,
  columnIndex: _propTypes["default"].number.isRequired,
  columns: _propTypes["default"].instanceOf(Array).isRequired,
  editable: _propTypes["default"].bool.isRequired,
  containActions: _propTypes["default"].bool.isRequired,
  displayActions: _propTypes["default"].func.isRequired,
  saveEntityData: _propTypes["default"].func.isRequired,
  saveRadioData: _propTypes["default"].func.isRequired,
  source: _propTypes["default"].string.isRequired,
  sourceTrueValue: _propTypes["default"].string.isRequired,
  externalValues: _propTypes["default"].instanceOf(Array).isRequired,
  isBold: _propTypes["default"].bool.isRequired
};
HelixTableCell.defaultProps = {
  value: "",
  rowIndex: 0,
  columnIndex: 0,
  columns: [],
  editable: false,
  containActions: false,
  displayActions: function displayActions() {
    return null;
  },
  saveEntityData: function saveEntityData() {
    return null;
  },
  saveRadioData: function saveRadioData() {
    return null;
  },
  source: "",
  sourceTrueValue: "",
  externalValues: [],
  isBold: false
};
var _default = HelixTableCell;
exports["default"] = _default;