"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _core = require("@material-ui/core");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/**
 * ###Returns 
 * * **\<JSX\>** returns a reusable form input text field component
 */
var HelixTextField = function HelixTextField(props) {
  /**
   * name: the form control name 
   * label: the form control label
   * value: the form control value
   * onChange: the function called on form change detection
   * other: other properties that TextField has
   */
  var name = props.name,
      label = props.label,
      value = props.value,
      onChange = props.onChange,
      other = _objectWithoutProperties(props, ["name", "label", "value", "onChange"]);

  return /*#__PURE__*/_react["default"].createElement(_core.TextField, _extends({
    variant: "outlined",
    label: label,
    name: name,
    value: value,
    onChange: onChange
  }, other));
};

var _default = HelixTextField;
exports["default"] = _default;