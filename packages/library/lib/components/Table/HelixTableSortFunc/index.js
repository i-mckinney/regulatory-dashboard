"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stableSort = exports.getComparator = exports.descendingComparator = void 0;

/**
 * 
 * @param {object} self self object that contains column accessor 
 * @param {object} other other object that contains column accessor
 * @param {string} orderBy orderBy is a column accessor property
 * @return {int} object "self" will compare with object "other" by ascii value of the column header
 */
var descendingComparator = function descendingComparator(self, other, orderBy) {
  if (other[orderBy] < self[orderBy]) {
    return -1;
  }

  if (other[orderBy] > self[orderBy]) {
    return 1;
  }

  return 0;
};
/**
 * @param {string} order string represents ascending or descending order
 * @param {string} orderBy string represents a property of the column header 
 */


exports.descendingComparator = descendingComparator;

var getComparator = function getComparator(order, orderBy) {
  return order === 'desc' ? function (self, other) {
    return descendingComparator(self, other, orderBy);
  } : function (self, other) {
    return -descendingComparator(self, other, orderBy);
  };
};
/**
 * @param {array} array the array that will be sorted
 * @param {func} comparator func that has the rules of how to sort array by either ascending or descending 
 * @return {array} return a new array of sorted items 
 */


exports.getComparator = getComparator;

var stableSort = function stableSort(array, comparator) {
  var stabilizedThis = array.map(function (elem, index) {
    return [elem, index];
  });
  stabilizedThis.sort(function (self, other) {
    var order = comparator(self[0], other[0]);
    return order;
  });
  return stabilizedThis.map(function (elem) {
    return elem[0];
  });
};

exports.stableSort = stableSort;