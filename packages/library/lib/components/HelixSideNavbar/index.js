"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = HelixSideNavbar;

var _react = _interopRequireDefault(require("react"));

var _core = require("@material-ui/core");

var _clsx = _interopRequireDefault(require("clsx"));

var _AppBar = _interopRequireDefault(require("@material-ui/core/AppBar"));

var _Toolbar = _interopRequireDefault(require("@material-ui/core/Toolbar"));

var _List = _interopRequireDefault(require("@material-ui/core/List"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _Divider = _interopRequireDefault(require("@material-ui/core/Divider"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _Menu = _interopRequireDefault(require("@material-ui/icons/Menu"));

var _ChevronLeft = _interopRequireDefault(require("@material-ui/icons/ChevronLeft"));

var _ChevronRight = _interopRequireDefault(require("@material-ui/icons/ChevronRight"));

var _ListItem = _interopRequireDefault(require("@material-ui/core/ListItem"));

var _ListItemIcon = _interopRequireDefault(require("@material-ui/core/ListItemIcon"));

var _ListItemText = _interopRequireDefault(require("@material-ui/core/ListItemText"));

var _MoveToInbox = _interopRequireDefault(require("@material-ui/icons/MoveToInbox"));

var _Mail = _interopRequireDefault(require("@material-ui/icons/Mail"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var drawerWidth = 240;
var useStyles = (0, _core.makeStyles)(function (theme) {
  return {
    root: {
      display: "flex"
    },
    appBar: {
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    appBarShift: {
      width: "calc(100% - ".concat(drawerWidth, "px)"),
      marginLeft: drawerWidth,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    hide: {
      display: "none"
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0
    },
    drawerPaper: {
      width: drawerWidth
    },
    drawerHeader: _objectSpread(_objectSpread({
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1)
    }, theme.mixins.toolbar), {}, {
      justifyContent: "flex-end"
    }),
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      marginLeft: -drawerWidth
    },
    contentShift: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }),
      marginLeft: 0
    }
  };
});
/**
 * @return {JSX} returns a reusable button form control component
 */

function HelixSideNavbar(props) {
  /**
   * text: text string communicating to user the button action
   * size: the size of the component - 'large' 'medium' 'small'
   * color: the color of the component - 'default' 'inherit' 'primary' 'secondary'
   * onClick: the function called a onclick event
   */
  var text = props.text,
      anchor = props.anchor,
      variant = props.variant,
      other = _objectWithoutProperties(props, ["text", "anchor", "variant"]); // const buttonClasses = buttonStyles();


  var theme = (0, _core.useTheme)();
  var classes = useStyles();

  var _React$useState = _react["default"].useState(true),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      open = _React$useState2[0],
      setOpen = _React$useState2[1];

  var handleDrawerOpen = function handleDrawerOpen(e) {
    e.persist();
    setOpen(true);
  };

  var handleDrawerClose = function handleDrawerClose(e) {
    e.persist();
    setOpen(false);
  };

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: classes.root
  }, /*#__PURE__*/_react["default"].createElement(_core.CssBaseline, null), /*#__PURE__*/_react["default"].createElement(_core.Drawer, {
    className: classes.drawer,
    variant: "persistent",
    anchor: "left",
    open: open,
    classes: {
      paper: classes.drawerPaper
    }
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: classes.drawerHeader
  }, /*#__PURE__*/_react["default"].createElement(_IconButton["default"], {
    onClick: handleDrawerClose
  }, theme.direction === "ltr" ? /*#__PURE__*/_react["default"].createElement(_ChevronLeft["default"], null) : /*#__PURE__*/_react["default"].createElement(_ChevronRight["default"], null))), /*#__PURE__*/_react["default"].createElement(_Divider["default"], null), /*#__PURE__*/_react["default"].createElement(_List["default"], null, ["Inbox", "Starred", "Send email", "Drafts"].map(function (text, index) {
    return /*#__PURE__*/_react["default"].createElement(_ListItem["default"], {
      button: true,
      key: text
    }, /*#__PURE__*/_react["default"].createElement(_ListItemIcon["default"], null, index % 2 === 0 ? /*#__PURE__*/_react["default"].createElement(_MoveToInbox["default"], null) : /*#__PURE__*/_react["default"].createElement(_Mail["default"], null)), /*#__PURE__*/_react["default"].createElement(_ListItemText["default"], {
      primary: text
    }));
  })), /*#__PURE__*/_react["default"].createElement(_Divider["default"], null), /*#__PURE__*/_react["default"].createElement(_List["default"], null, ["All mail", "Trash", "Spam"].map(function (text, index) {
    return /*#__PURE__*/_react["default"].createElement(_ListItem["default"], {
      button: true,
      key: text
    }, /*#__PURE__*/_react["default"].createElement(_ListItemIcon["default"], null, index % 2 === 0 ? /*#__PURE__*/_react["default"].createElement(_MoveToInbox["default"], null) : /*#__PURE__*/_react["default"].createElement(_Mail["default"], null)), /*#__PURE__*/_react["default"].createElement(_ListItemText["default"], {
      primary: text
    }));
  }))), /*#__PURE__*/_react["default"].createElement(_Divider["default"], null));
}