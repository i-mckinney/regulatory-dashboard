"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _styles = require("@material-ui/core/styles");

var _addonKnobs = require("@storybook/addon-knobs");

var _dark = _interopRequireDefault(require("./dark"));

var _testTheme = _interopRequireDefault(require("./testTheme"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var themes = {
  dark: _dark["default"],
  tropical: _testTheme["default"]
};
var themeNames = Object.keys(themes);

var _default = function _default(_ref) {
  var children = _ref.children;
  var theme = (0, _addonKnobs.select)("Theme", themeNames, themeNames[0], "Themes");
  return /*#__PURE__*/_react["default"].createElement(_styles.ThemeProvider, {
    theme: themes[theme]
  }, children);
};

exports["default"] = _default;