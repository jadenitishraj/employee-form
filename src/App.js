import React, { useState } from 'react';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
  Form, FormGroup, Label, Input, Container
} from 'reactstrap';
import { jsPDF } from 'jspdf';  // Import jsPDF
import employeeData from './data.json';
import 'bootstrap/dist/css/bootstrap.min.css';

function EmployeeModal() {
  const [employeeId, setEmployeeId] = useState('');
  const [employee, setEmployee] = useState(null);
  const [modal, setModal] = useState(false);
  const [error, setError] = useState('');

  const toggle = () => setModal(!modal);

  const handleInputChange = (e) => {
    setEmployeeId(e.target.value);
    setError('');  // Clear error message on new input
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const foundEmployee = employeeData.find(emp => emp.id === employeeId);
    if (foundEmployee) {
      setEmployee(foundEmployee);
    } else {
      setEmployee(null);
      setError('No employee found');
    }
    toggle();  // Open the modal
  };

  const handleDownload = () => {
    if (!employee) return;

    const doc = new jsPDF();
    const margin = 10;
    const lineHeight = 10;

    doc.setFontSize(18);
    doc.text("Employee Details", margin, margin + lineHeight);

    doc.setFontSize(12);
    doc.text(`Name: ${employee.name}`, margin, margin + 2 * lineHeight);
    doc.text(`Address: ${employee.address}`, margin, margin + 3 * lineHeight);
    doc.text(`Aadhar Card Number: ${employee.aadharCardNumber}`, margin, margin + 4 * lineHeight);
    doc.text(`PAN Card Number: ${employee.panCardNumber}`, margin, margin + 5 * lineHeight);
    doc.text(`Contact Number: ${employee.contactNumber}`, margin, margin + 6 * lineHeight);

    doc.save(`${employee.name}_details.pdf`);
  };

  return (
    <Container>
      <h3 style={{marginTop:'20px'}}>Employee Profile Verification</h3>
      <div className='main-div' style={{marginTop:'200px'}}>
      <Form onSubmit={handleSubmit} >
        <FormGroup>
          <Label for="employeeId">Employee ID</Label>
          <Input
            type="text"
            name="employeeId"
            id="employeeId"
            placeholder="Enter Employee ID"
            value={employeeId}
            onChange={handleInputChange}
          />
        </FormGroup>
        <Button type="submit" color="primary">Search</Button>
      </Form>

      {error && <p className="text-danger mt-2">{error}</p>}

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Employee Details</ModalHeader>
        <ModalBody>
          {employee ? (
            <div>
              <p><strong>Name:</strong> {employee.name}</p>
              <p><strong>Address:</strong> {employee.address}</p>
              <p><strong>Aadhar Card Number:</strong> {employee.aadharCardNumber}</p>
              <p><strong>PAN Card Number:</strong> {employee.panCardNumber}</p>
              <p><strong>Contact Number:</strong> {employee.contactNumber}</p>
            </div>
          ) : (
            <p className="text-danger">No employee found.</p>
          )}
        </ModalBody>
        <ModalFooter>
          {employee && (
            <Button color="success" onClick={handleDownload}>
              Download PDF
            </Button>
          )}
          <Button color="secondary" onClick={toggle}>Close</Button>
        </ModalFooter>
      </Modal>
      </div>
    </Container>
  );
}

export default EmployeeModal;
