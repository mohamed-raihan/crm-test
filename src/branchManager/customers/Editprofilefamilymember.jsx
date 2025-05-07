import React, { useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Col, FormGroup, Input, Label, Row } from "reactstrap";

const EditFamilyMemberModal = ({
  show,
  onHide,
  familyData,
  setFamilyData,
  handleSave,
}) => {

  const relationshipChoice = [
    { value: "E", label: "Self" },
    { value: "S", label: "Spouse" },
    { value: "D", label: "Daughter" },
    { value: "C", label: "Son" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFamilyData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Family Member</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="family-member-form">
          <Row>
            <Col md={4}>
              <FormGroup>
                <Label className="text-start w-100">
                  First Name <span className="text-danger fw-bold">*</span>
                </Label>
                <Input
                  type="text"
                  placeholder="Enter first name"
                  name="first_name"
                  value={familyData.first_name}
                  onChange={(e) => handleChange(e)}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label className="text-start w-100">
                  Middle Name <span className="text-danger fw-bold">*</span>
                </Label>
                <Input
                  type="text"
                  placeholder="Enter middle name"
                  name="middle_name"
                  value={familyData.middle_name}
                  onChange={(e) => handleChange(e)}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label className="text-start w-100">
                  Last Name <span className="text-danger fw-bold">*</span>
                </Label>
                <Input
                  type="text"
                  placeholder="Enter last name"
                  name="last_name"
                  value={familyData.last_name}
                  onChange={(e) => handleChange(e)}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <FormGroup>
                <Label className="text-start w-100">Relationship</Label>
                <Input
                  type="select"
                  name="relationship"
                  value={familyData.relationship}
                  onChange={(e) => handleChange(e)}
                >
                  <option value="">Select Relationship</option>
                  {relationshipChoice.map((relation) => (
                    <option key={relation.value} value={relation.value}>
                      {relation.label}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label className="text-start w-100">
                  Date of Birth <span className="text-danger fw-bold">*</span>
                </Label>
                <Input
                  type="date"
                  name="dob"
                  value={familyData.dob}
                  onChange={(e) => handleChange(e)}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label className="text-start w-100">
                  Gender <span className="text-danger fw-bold">*</span>
                </Label>
                <Input
                  type="select"
                  name="gender"
                  value={familyData.gender}
                  onChange={(e) => handleChange(e)}
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label className="text-start w-100">
                  Phone Number <span className="text-danger fw-bold">*</span>
                </Label>
                <Input
                  type="text"
                  placeholder="Enter phone number"
                  name="contact"
                  value={familyData.contact}
                  onChange={(e) => handleChange(e)}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label className="text-start w-100">Email</Label>
                <Input
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={familyData.email}
                  onChange={(e) => handleChange(e)}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <FormGroup>
                <Label className="text-start w-100">
                  Address 1 <span className="text-danger fw-bold">*</span>
                </Label>
                <Input
                  type="text"
                  placeholder="Enter address 1"
                  name="address1"
                  value={familyData.address1}
                  onChange={(e) => handleChange(e)}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label className="text-start w-100">Address 2</Label>
                <Input
                  type="text"
                  placeholder="Enter address 2"
                  name="address2"
                  value={familyData.address2}
                  onChange={(e) => handleChange(e)}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label className="text-start w-100">Address 3</Label>
                <Input
                  type="text"
                  placeholder="Enter address 3"
                  name="address3"
                  value={familyData.address3}
                  onChange={(e) => handleChange(e)}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <FormGroup>
                <Label className="text-start w-100">
                  District <span className="text-danger fw-bold">*</span>
                </Label>
                <Input
                  type="text"
                  placeholder="Enter district"
                  name="district"
                  value={familyData.district}
                  onChange={(e) => handleChange(e)}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label className="text-start w-100">
                  Pincode <span className="text-danger fw-bold">*</span>
                </Label>
                <Input
                  type="text"
                  placeholder="Enter pincode"
                  name="pincode"
                  value={familyData.pincode}
                  onChange={(e) => handleChange(e)}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label className="text-start w-100">PAN Number</Label>
                <Input
                  type="text"
                  placeholder="Enter PAN number"
                  name="pan_no"
                  value={familyData.pan_no}
                  onChange={(e) => handleChange(e)}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <FormGroup>
                <Label className="text-start w-100">Occupation</Label>
                <Input
                  type="text"
                  placeholder="Enter occupation"
                  name="occupation"
                  value={familyData.occupation}
                  onChange={(e) => handleChange(e)}
                />
              </FormGroup>
            </Col>
          </Row>
          <hr />
        </div>
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

export default EditFamilyMemberModal;
