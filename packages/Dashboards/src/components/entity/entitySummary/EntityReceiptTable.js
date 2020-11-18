import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

const columns = [
  {
    id: "fieldName",
    label: "Field Name",
    minWidth: 170,
    align: "left",
  },

  {
    id: "ExternalSource",
    label: "External Source",
    minWidth: 170,
    align: "left",
  },
  {
    id: "ExternalValue",
    label: "External Value",
    minWidth: 170,
    align: "left",
  },
  {
    id: "CurrentValue",
    label: "Proposed Value",
    minWidth: 170,
    align: "left",
  },
  {
    id: "SourceOfTruth",
    label: "Source Of Truth",
    minWidth: 170,
    align: "left",
  },
];

// function createData(fieldName, externalSource, externalValue, proposedValue ) {
//   return { fieldName, externalSource, externalValue, proposedValue };
// }

// const rows = [
//   createData('borrowerName', 'FIS', "Eric", "Ian"),
//   createData('borrowerName', 'SalesForce', "Raymond", "Ian"),
//   createData('borrowerName', 'DataWareHouse', "Jacob", "Ian"),
//   createData('TIN', 'FIS', 1324171354, 3287263),
//   createData('AccountID', 'SalesForce', 1324171354, 3287263),
//   createData('Account#', 'FIS', 1324171354, 3287263),
//   createData('PhoneType', 'DataWareHouse', "Home", "Home"),
//   createData('borrowerName', 'FIS', "Eric", "Ian"),
//   createData('borrowerName', 'SalesForce', "Raymond", "Ian"),
//   createData('borrowerName', 'DataWareHouse', "Jacob", "Ian"),
//   createData('TIN', 'FIS', 1324171354, 3287263),
//   createData('AccountID', 'SalesForce', 1324171354, 3287263),
//   createData('Account#', 'FIS', 1324171354, 3287263),
//   createData('PhoneType', 'DataWareHouse', "Home", "Home"),

// ];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

function EntityReceiptTable(props) {
  const { rows } = props;
  console.log(rows);
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  <b>{column.label}</b>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      if (column.id === "fieldName") {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            <b>{value}</b>
                          </TableCell>
                        );
                      } else if (column.id === "SourceOfTruth") {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {`${value}`}
                          </TableCell>
                        );
                      } else {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value}
                          </TableCell>
                        );
                      }
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default EntityReceiptTable;
