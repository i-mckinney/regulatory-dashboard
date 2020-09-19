"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _styles = require("@material-ui/core/styles");

var _lightGreen = _interopRequireDefault(require("@material-ui/core/colors/lightGreen"));

var _lime = _interopRequireDefault(require("@material-ui/core/colors/lime"));

var _teal = _interopRequireDefault(require("@material-ui/core/colors/teal"));

var _yellow = _interopRequireDefault(require("@material-ui/core/colors/yellow"));

var _deepOrange = _interopRequireDefault(require("@material-ui/core/colors/deepOrange"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var tropical = (0, _styles.createMuiTheme)({
  palette: {
    primary: _lime["default"],
    secondary: _teal["default"],
    error: _deepOrange["default"],
    action: {
      disabledBackground: _teal["default"][400]
    },
    text: {
      primary: _lightGreen["default"][900],
      secondary: _teal["default"][700],
      disabled: _yellow["default"][600]
    }
  },
  status: {
    danger: "orange"
  }
});
var _default = tropical;
exports["default"] = _default;