import React, { useState, useEffect } from "react";
import { Row, Col, Label, FormGroup, Input, Button, FormFeedback } from "reactstrap";

const NomineeDetailsForm = ({ formData, setFormData, setIsnominee, onValidationChange }) => {
  const [validationErrors, setValidationErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  // Convert formData to array if it's not already
  const nomineesArray = Array.isArray(formData) ? formData : [formData];

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    nomineesArray.forEach((nominee, index) => {
      // Validate name
      if (!nominee.name) {
        errors[index] = { ...errors[index], name: "Nominee name is required" };
        isValid = false;
      }

      // Validate relationship
      if (!nominee.relationship) {
        errors[index] = { ...errors[index], relationship: "Relationship is required" };
        isValid = false;
      }

      // Validate phone number
      if (!nominee.phone_number) {
        errors[index] = { ...errors[index], phone_number: "Phone number is required" };
        isValid = false;
      } else if (!/^\d{10}$/.test(nominee.phone_number)) {
        errors[index] = { ...errors[index], phone_number: "Phone number must be 10 digits" };
        isValid = false;
      }

      // Validate email
      if (nominee.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nominee.email)) {
        errors[index] = { ...errors[index], email: "Please enter a valid email address" };
        isValid = false;
      }
    });

    setValidationErrors(errors);
    setIsFormValid(isValid);
    
    // Notify parent component about validation status
    if (onValidationChange) {
      onValidationChange(isValid);
    }

    return isValid;
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedNominees = Array.isArray(prev) ? [...prev] : [{ ...prev }];
      updatedNominees[index] = { ...updatedNominees[index], [name]: value };
      return updatedNominees;
    });
  };

  const addNominee = () => {
    setFormData(prev => [
      ...(Array.isArray(prev) ? prev : [prev]),
      { name: "", relationship: "", phone_number: "", email: "", address: "", customer: "" }
    ]);
  };

  useEffect(() => {
    validateForm();
  }, [nomineesArray]);

  return (
    <div>
      <h5>Nominee Details</h5>
      {nomineesArray.map((nominee, index) => (
        <div key={index} className="nominee-form">
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label htmlFor={`name-${index}`}>Nominee Name *</Label>
                <Input
                  type="text"
                  id={`name-${index}`}
                  name="name"
                  value={nominee.name}
                  onChange={(e) => handleChange(e, index)}
                  className={validationErrors[index]?.name ? "is-invalid" : ""}
                  required
                />
                {validationErrors[index]?.name && (
                  <FormFeedback>{validationErrors[index].name}</FormFeedback>
                )}
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label htmlFor={`relationship-${index}`}>Relationship *</Label>
                <Input
                  type="select"
                  id={`relationship-${index}`}
                  name="relationship"
                  value={nominee.relationship}
                  onChange={(e) => handleChange(e, index)}
                  className={validationErrors[index]?.relationship ? "is-invalid" : ""}
                  required
                >
                  <option value="">Select Relationship</option>
                  <option value="spouse">Spouse</option>
                  <option value="child">Child</option>
                  <option value="parent">Parent</option>
                  <option value="sibling">Sibling</option>
                  <option value="other">Other</option>
                </Input>
                {validationErrors[index]?.relationship && (
                  <FormFeedback>{validationErrors[index].relationship}</FormFeedback>
                )}
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <FormGroup>
                <Label htmlFor={`phone_number-${index}`}>Phone Number *</Label>
                <Input
                  type="text"
                  id={`phone_number-${index}`}
                  name="phone_number"
                  value={nominee.phone_number}
                  onChange={(e) => handleChange(e, index)}
                  className={validationErrors[index]?.phone_number ? "is-invalid" : ""}
                  required
                />
                {validationErrors[index]?.phone_number && (
                  <FormFeedback>{validationErrors[index].phone_number}</FormFeedback>
                )}
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label htmlFor={`email-${index}`}>Email</Label>
                <Input
                  type="email"
                  id={`email-${index}`}
                  name="email"
                  value={nominee.email}
                  onChange={(e) => handleChange(e, index)}
                  className={validationErrors[index]?.email ? "is-invalid" : ""}
                />
                {validationErrors[index]?.email && (
                  <FormFeedback>{validationErrors[index].email}</FormFeedback>
                )}
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <FormGroup>
                <Label htmlFor={`address-${index}`}>Address</Label>
                <Input
                  type="textarea"
                  id={`address-${index}`}
                  name="address"
                  value={nominee.address}
                  onChange={(e) => handleChange(e, index)}
                />
              </FormGroup>
            </Col>
          </Row>
          <hr />
        </div>
      ))}

      <Button color="primary" onClick={addNominee}>
        + Add Another Nominee
      </Button>
    </div>
  );
};

export default NomineeDetailsForm;