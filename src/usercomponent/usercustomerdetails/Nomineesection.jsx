import React, { useState, useEffect } from "react";
import { Row, Col, Label, FormGroup, Input, Button, FormFeedback } from "reactstrap";

const NomineeDetailsForm = ({ formData, setFormData,setIsnominee }) => {
  const [errors, setErrors] = useState(formData.map(() => ({})));
  const [isFormValid, setIsFormValid] = useState(false); // ✅ Track form validity

  const validateField = (index, name, value) => {
    let errorMessage = "";

    switch (name) {
      case "name":
        errorMessage = value.trim() ? "" : "Nominee Name is required.";
        break;
      case "relationship":
        errorMessage = value ? "" : "Relationship is required.";
        break;
      case "phone_number":
        errorMessage = /^[0-9]{10}$/.test(value) ? "" : "Enter a valid 10-digit phone number.";
        break;
      case "email":
        errorMessage = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "" : "Enter a valid email address.";
        break;
      case "address":
        errorMessage = value.trim() ? "" : "Address is required.";
        break;
      default:
        break;
    }

    setErrors((prevErrors) => {
      const updatedErrors = [...prevErrors];
      updatedErrors[index] = { ...updatedErrors[index], [name]: errorMessage };

      // Remove all errors if the nominee is completely valid
      if (!Object.values(updatedErrors[index]).some((msg) => msg !== "")) {
        updatedErrors[index] = {};
      }

      return updatedErrors;
    });
  };

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedNominees = [...formData];
    updatedNominees[index][name] = value;
    setFormData(updatedNominees);
    validateField(index, name, value);
  };

  const addNominee = () => {
    setFormData([...formData, { name: "", relationship: "", phone_number: "", email: "", address: "", customer: "" }]);
    setErrors([...errors, {}]); // Add an empty error object for tracking
  };

  // ✅ Check form validity whenever `formData` or `errors` change
  useEffect(() => {
    const allValid = formData.every(
      (nominee, index) =>
        nominee.name.trim() &&
        nominee.relationship &&
        /^[0-9]{10}$/.test(nominee.phone_number) &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nominee.email) &&
        nominee.address.trim() &&
        Object.values(errors[index] || {}).every((msg) => msg === "") // Ensure no errors
    );

    setIsFormValid(allValid);
    setIsnominee(allValid)
  }, [formData, errors]);

  return (
    <div>
      <h5>Nominee Details</h5>
      {formData.map((nominee, index) => (
        <div key={index} className="nominee-form">
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label>Nominee Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={nominee.name}
                  placeholder="Enter Nominee's Name"
                  onChange={(e) => handleChange(index, e)}
                  invalid={Boolean(errors[index]?.name)}
                />
                <FormFeedback>{errors[index]?.name}</FormFeedback>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label>Relationship</Label>
                <Input
                  type="select"
                  name="relationship"
                  value={nominee.relationship}
                  onChange={(e) => handleChange(index, e)}
                  invalid={Boolean(errors[index]?.relationship)}
                >
                  <option value="">Select Relationship</option>
                  <option value="spouse">Spouse</option>
                  <option value="parent">Parent</option>
                  <option value="brother">Brother</option>
                  <option value="sister">Sister</option>
                  <option value="child">Child</option>
                </Input>
                <FormFeedback>{errors[index]?.relationship}</FormFeedback>
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <FormGroup>
                <Label>Phone Number</Label>
                <Input
                  type="text"
                  name="phone_number"
                  value={nominee.phone_number}
                  placeholder="Enter Phone Number"
                  onChange={(e) => handleChange(index, e)}
                  invalid={Boolean(errors[index]?.phone_number)}
                />
                <FormFeedback>{errors[index]?.phone_number}</FormFeedback>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={nominee.email}
                  placeholder="Enter Email Address"
                  onChange={(e) => handleChange(index, e)}
                  invalid={Boolean(errors[index]?.email)}
                />
                <FormFeedback>{errors[index]?.email}</FormFeedback>
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <FormGroup>
                <Label>Address</Label>
                <Input
                  type="textarea"
                  name="address"
                  value={nominee.address}
                  placeholder="Enter Address"
                  onChange={(e) => handleChange(index, e)}
                  invalid={Boolean(errors[index]?.address)}
                />
                <FormFeedback>{errors[index]?.address}</FormFeedback>
              </FormGroup>
            </Col>
          </Row>
          <hr />
        </div>
      ))}

      <Button color="primary" onClick={addNominee}>
        + Add Another Nominee
      </Button>

      {/* ✅ Display form validity */}
      {/* <div className="mt-3">
        <strong>Form Valid: </strong>
        {isFormValid ? "✅ Yes" : "❌ No"}
      </div> */}
    </div>
  );
};

export default NomineeDetailsForm;
