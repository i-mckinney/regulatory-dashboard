import React, { useState } from "react";
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
function ConfirmationModal({ handleConfirm, isOpen, toggle }) {
  const [isAdminSelectOpen, setIsAdminSelectOpen] = useState(false);
  const handleNext = () => {
    toggle();
    setIsAdminSelectOpen(!isAdminSelectOpen);
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
                <th>Data Field</th>
                <th>System of Record</th>
                <th>Previous Value</th>
                <th>New Value</th>
                <th>Source System</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
            </tbody>
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
          <Formik initiaValues={{ Approver: "" }}>
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
                <option value="Buckets"> Neil </option>
                <option value="Value"> David </option>
              </Field>
            </Form>
          </Formik>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Previous
          </Button>
          <Button color="success" onClick={handleNext}>
            Confirm{" "}
          </Button>{" "}
        </ModalFooter>
      </Modal>
    </>
  )
}

export default ConfirmationModal
