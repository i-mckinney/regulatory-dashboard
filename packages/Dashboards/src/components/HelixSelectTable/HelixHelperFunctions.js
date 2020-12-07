//Sortinig helper functions used in entity select table

export function descendingComparator(self, other, orderBy) {
  if (other[orderBy] < self[orderBy]) {
    return -1;
  }
  if (other[orderBy] > self[orderBy]) {
    return 1;
  }
  return 0;
}

export function getComparator(order, orderBy) {
  return order === "desc"
    ? (self, other) => descendingComparator(self, other, orderBy)
    : (self, other) => -descendingComparator(self, other, orderBy);
}

export const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((elem, index) => [elem, index]);
  stabilizedThis.sort((self, other) => {
    const order = comparator(self[0], other[0]);
    return order;
  });
  return stabilizedThis.map((elem) => elem[0]);
};
