import React, { useState, useEffect } from "react";
import { useHistory, } from "react-router-dom";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
} from "reactstrap";
import { Formik, Field, Form } from "formik";

/**
 * @param {func} handleDelete makes a post request to specific URL to delete
 * @param {boolean} isOpen state for showing or not showing modal
 * @param {func} toggle Toggling state of isOpen to show and unshow modal
 * @param {string} deleteString string that represents where the delete request is being made to
 * @returns {jsx} returns modal that shows up when delete button is clicked, and sends delete request
 * when delete button is clicked again
 */
function ConfirmationModal({ clickedTableRows, isOpen, toggle }) {
  const [tableRows, setTableRows] = useState([]);
  const history = useHistory();
  useEffect(() => {
    if (clickedTableRows.length > 0) {
      const jsxTable = clickedTableRows.map((row) => {
        return (
          <tr key={row}>
            <td>{row.FieldName}</td>
            <td>{row.SystemOfRecord}</td>
            <td style={{color:"red"}}>{row.PreviousValue}</td>
            <td style={{color:"green"}}>{row.NewValue}</td>
            <td>{row.SourceSystem}</td>
          </tr>
        );
      });
      setTableRows(jsxTable);
    }
  }, [clickedTableRows]);

  const [isAdminSelectOpen, setIsAdminSelectOpen] = useState(false);

  const handleNext = () => {
    toggle(false);
    setIsAdminSelectOpen(!isAdminSelectOpen);
  };

  const handleFinal = () => {
    setIsAdminSelectOpen(!isAdminSelectOpen);
    history.push({pathname: '/entity', state: "Request Submitted! Waiting for the approval on your changes." })
  };

  const toggleAdminSelect = () => {
    setIsAdminSelectOpen(!isAdminSelectOpen);
  };
  return (
    <>
      <Modal isOpen={isOpen} toggle={toggle} style={{ maxWidth: "60%" }}>
        <ModalHeader toggle={toggle}>
          Step 1 of 2 - Review and Confirm Your Changes
        </ModalHeader>
        <ModalBody>
          <Table borderless style={{ textAlign: "center" }}>
            <thead>
              <tr>
                <th>Field Name</th>
                <th>System of Record</th>
                <th>Previous Value</th>
                <th>New Value</th>
                <th>Source System</th>
              </tr>
            </thead>
            <tbody>{tableRows}</tbody>
          </Table>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Cancel
          </Button>
          <Button color="info" onClick={handleNext}>
            Next{" "}
          </Button>{" "}
        </ModalFooter>
      </Modal>

      <Modal
        isOpen={isAdminSelectOpen}
        toggle={toggleAdminSelect}
        style={{ maxWidth: "60%" }}
      >
        <ModalHeader toggle={toggleAdminSelect}>
          {" "}
          Step 2 of 2 - Review and Confirm Your Changes
        </ModalHeader>
        <ModalBody>
          <Formik initialValues={{ Approver: "" }}>
            <Form>
              <label htmlFor="Approver">
                <h5>Approver</h5>
              </label>
              <Field
                as="select"
                style={{
                  width: "20%",
                  height: "50px",
                }}
                className="form-control Approver-input"
                id="Approver"
                name="Approver"
              >
                <option value="" />
                <option value="Neil"> Neil </option>
                <option value="David"> David </option>
                <option value="Damian Lillard"> Damian Lillard</option>
              </Field>
            </Form>
          </Formik>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Previous
          </Button>
          <Button color="success" onClick={handleFinal}>
            Confirm{" "}
          </Button>{" "}
        </ModalFooter>
      </Modal>
    </>
  );
}

export default ConfirmationModal;
