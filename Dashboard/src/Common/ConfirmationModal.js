import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import PropTypes from "prop-types"
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
} from "reactstrap"
import { Formik, Field, Form } from "formik"

/**
 * @param {func} handleStepOneOpen sets isModalOneOpen true and opens up the first modal
 * @param {func} handleStepOneCancel  sets isModalOneOpen false and cloes the first modal
 * @param {bool} isModalOneOpen bool to determine whether first modal opens or not
 * @param {array} clickedTableRows array with each element as an selected object that contains data about edit changes
 * @returns {jsx} returns a first modal that displays edit changes that are being confirmed and the 2nd modal that shows
 * select field to choose an admin to confirm those changes.
 */
function ConfirmationModal({
  handleStepOneOpen,
  handleStepOneCancel,
  isModalOneOpen,
  clickedTableRows,
}) {
  // pre populate the table that shows on the first modal. (edit changes that have been selected on the confirm page)
  const [tableRows, setTableRows] = useState([])
  // Handles routes, send users to desired places in different settings.
  const history = useHistory()

  useEffect(() => {
    // if we get clickedTableRows from the parent, pre populate the jsxTable that shows on the first modal.
    if (clickedTableRows) {
      const jsxTable = clickedTableRows.map((row) => {
        return (
          <tr key={row}>
            <td>{row.FieldName}</td>
            <td>{row.SystemOfRecord}</td>
            <td style={{ color: "red" }}>{row.PreviousValue}</td>
            <td style={{ color: "green" }}>{row.NewValue}</td>
            <td>{row.SourceSystem}</td>
          </tr>
        )
      })
      setTableRows(jsxTable)
    }
  }, [clickedTableRows])

  // Determines whether modal two is open or not
  const [isModalTwoOpen, setIsModalTwoOpen] = useState(false)

  // Handles toggling between the state of isModalTwoOpen
  const handleStepTwoOpen = () => setIsModalTwoOpen(true)
  const handleStepTwoCancel = () => setIsModalTwoOpen(false)

  // Next button that is in the first modal. Closes  thefirst modal and opens up the second one.
  const handleNext = () => {
    handleStepOneCancel()
    handleStepTwoOpen()
  }

  // Back button that is in the second modal. Closes the second modal and opens up the first one.
  const handleGoBackFromStep2 = () => {
    handleStepOneOpen()
    handleStepTwoCancel()
  }

  // Final button. directs user back to entity page. TODO: THIS will be where we make a patch request to
  // update our entities. And if the patch request is successful, we push to history with success message.
  const handleFinal = () => {
    handleStepTwoCancel()
    history.push({
      pathname: "/entity",
      state: "Request Submitted! Waiting for the approval on your changes.",
    })
  }

  return (
    <>
      <Modal isOpen={isModalOneOpen} style={{ maxWidth: "60%" }}>
        <ModalHeader>Step 1 of 2 - Review and Confirm Your Changes</ModalHeader>
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
          <Button color="primary" onClick={handleStepOneCancel}>
            Cancel
          </Button>
          <Button color="success" onClick={handleNext}>
            Next
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={isModalTwoOpen} style={{ maxWidth: "60%" }}>
        <ModalHeader>Step 2 of 2 - Review and Confirm Your Changes</ModalHeader>
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
              </Field>
            </Form>
          </Formik>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleGoBackFromStep2}>
            Previous
          </Button>
          <Button color="success" onClick={handleFinal}>
            Confirm
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

ConfirmationModal.propTypes = {
  handleStepOneOpen: PropTypes.func.isRequired,
  handleStepOneCancel: PropTypes.func.isRequired,
  isModalOneOpen: PropTypes.bool.isRequired,
  clickedTableRows: PropTypes.instanceOf(Array).isRequired,
}

export default ConfirmationModal
