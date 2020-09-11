"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = HelixButton;

var _react = _interopRequireDefault(require("react"));

var _core = require("@material-ui/core");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var buttonStyles = (0, _core.makeStyles)(function (theme) {
  return {
    root: {
      margin: theme.spacing(0.5)
    },
    label: {
      textTransform: 'none'
    }
  };
});
/**
 * @return {JSX} returns a reusable button form control component
 */

function HelixButton(props) {
  /**
   * text: text string communicating to user the button action
   * size: the size of the component - 'large' 'medium' 'small'
   * color: the color of the component - 'default' 'inherit' 'primary' 'secondary'
   * onClick: the function called a onclick event
   */
  var text = props.text,
      size = props.size,
      color = props.color,
      variant = props.variant,
      onClick = props.onClick,
      other = _objectWithoutProperties(props, ["text", "size", "color", "variant", "onClick"]);

  var buttonClasses = buttonStyles();
  return /*#__PURE__*/_react["default"].createElement(_core.Button // || For handling instances where a prop is not communicated by the parent component
  , _extends({
    variant: variant || 'contained',
    size: size || 'medium',
    color: color || 'inherit',
    onClick: onClick
  }, other, {
    buttonClasses: {
      root: buttonClasses.root,
      label: buttonClasses.label
    }
  }), text);
}