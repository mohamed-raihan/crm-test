import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const NomineeModal = ({ show, onHide, nomineeFormData, setNomineeFormData, handleSave }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNomineeFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  console.log(nomineeFormData);
  

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Nominee</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>

        <Form.Group className="mb-3">
            <Form.Label>Customer</Form.Label>
            <Form.Control type="text" name="customer" value={nomineeFormData.customer} onChange={handleChange} disabled />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name="name" value={nomineeFormData.name} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Relationship</Form.Label>
            <Form.Select name="relationship" value={nomineeFormData.relationship} onChange={handleChange}>
              <option value="">Select Relationship</option>
              <option value="spouse">Spouse</option>
              <option value="parent">Parent</option>
              <option value="child">Child</option>
              {/* <option value="other">Other</option> */}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="text" name="phone_number" value={nomineeFormData.phone_number} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" value={nomineeFormData.email} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" name="address" value={nomineeFormData.address} onChange={handleChange} />
          </Form.Group>
         
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NomineeModal;
