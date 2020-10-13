"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _core = require("@material-ui/core");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Search = _interopRequireDefault(require("@material-ui/icons/Search"));

var _index = _interopRequireDefault(require("../../HelixTextField/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Styling used for MaterialUI
var helixToolBarSearchStyles = (0, _core.makeStyles)(function () {
  return {
    searchStyles: {
      width: "28%"
    }
  };
});
/**
 * @param {func} onSearch the onSearch function handle the user query input
 * @param {func} displayCreateIcon the displayCreateIcon displays textfield with search icon jsx 
 */

var HelixToolBarSearch = function HelixToolBarSearch(_ref) {
  var onSearch = _ref.onSearch,
      displayCreateIcon = _ref.displayCreateIcon;
  // Creates an object for styling. Any className that matches key in the helixTableSearchStyles object will have a corresponding styling
  var helixToolBarSearchClasses = helixToolBarSearchStyles();
  return /*#__PURE__*/_react["default"].createElement(_core.Toolbar, {
    disableGutters: true
  }, /*#__PURE__*/_react["default"].createElement(_index["default"], {
    className: helixToolBarSearchClasses.searchStyles,
    label: "Search",
    InputProps: {
      startAdornment: /*#__PURE__*/_react["default"].createElement(_core.InputAdornment, {
        position: "start"
      }, /*#__PURE__*/_react["default"].createElement(_Search["default"], null))
    },
    onChange: onSearch
  }), displayCreateIcon());
};

HelixToolBarSearch.propTypes = {
  onSearch: _propTypes["default"].func.isRequired,
  displayCreateIcon: _propTypes["default"].func.isRequired
};
var _default = HelixToolBarSearch;
exports["default"] = _default;