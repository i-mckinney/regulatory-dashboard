/**
 * 
 * @param {object} self self object that contains column accessor 
 * @param {object} other other object that contains column accessor
 * @param {string} orderBy orderBy is a column accessor property
 * @return {int} object "self" will compare with object "other" by ascii value of the column header
 */
export const descendingComparator = (self, other, orderBy) => {
    if (other[orderBy] < self[orderBy]) {
      return -1
    }
    if (other[orderBy] > self[orderBy]) {
      return 1
    }
    return 0;
}
  
/**
 * @param {string} order string represents ascending or descending order
 * @param {string} orderBy string represents a property of the column header 
 */
export const getComparator = (order, orderBy) => {
    return order === 'desc'
        ? (self, other) => descendingComparator(self, other, orderBy)
        : (self, other) => -descendingComparator(self, other, orderBy)
}
  
/**
 * @param {array} array the array that will be sorted
 * @param {func} comparator func that has the rules of how to sort array by either ascending or descending 
 * @return {array} return a new array of sorted items 
 */
export const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((elem, index) => [elem, index])
    stabilizedThis.sort((self, other) => {
      const order = comparator(self[0], other[0])
      return order
    })
    return stabilizedThis.map((elem) => elem[0])
}