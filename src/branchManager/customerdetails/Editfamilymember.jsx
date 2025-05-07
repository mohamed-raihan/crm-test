import React, { useState } from "react";
import { Row, Col, Label, FormGroup, Input, Button } from "reactstrap"; // Import Row and Col from reactstrap
import allaxios from "../../api/axios";
import API_URL from "../../api/api_urls";

const FamilyMemberForm = ({ formData, setFormData }) => {
  // const [familyData, setFamilyData] = useState({
  //   id: "",
  //   cutomer: "",
  //   name: "",
  //   relationship: "",
  //   dob: "",
  //   contact: "",
  //   email: "",
  // });
  const relationshipChoice = [
    { value: "E", label: "Self" },
    { value: "S", label: "Spouse" },
    { value: "D", label: "Daughter" },
    { value: "C", label: "Son" },
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = ()=>{
    allaxios.post(API_URL.FAMILY_MEMBERS.POST_MEMBERS,familyData)
    .then((response)=>{
      console.log(response);
    }).catch((error)=>{
      console.error(error);
    })
  }


  return (
    <div>
      <h5 className="mb-4">Family Details</h5>
      <form onSubmit={handleSave}>
        <Row>
          <Col md={4}>
            <div>
              <FormGroup>
                <Label className="text-start w-100"> Name</Label>
                <Input
                  type="text"
                  placeholder="Enter name"
                  name="name" // Matches the `name` key in formData
                  value={formData.name}
                  onChange={handleChange}
                />
              </FormGroup>
            </div>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label className="text-start w-100" for="relationship">
                relationship
              </Label>
              <Input
                id="relationship"
                name="relationship"
                type="select"
                value={formData.relationship}
                onChange={handleChange}
                // invalid={!!validationErrors.status}
              >
                <option value="">Select relationship</option>
                {relationshipChoice.map((relation) => (
                  <option value={relation.value}>{relation.label}</option>
                ))}

                {/* <option value="Cancelled">Cancelled</option> */}
              </Input>
              {/* <FormFeedback>{validationErrors.status}</FormFeedback> */}

              {/* <ErrorMessage name="status" component="div" className="text-danger" /> */}
            </FormGroup>
          </Col>
          <Col md={4}>
            <div className="form-group">
              <label className="text-start w-100">Date of birth</label>
              <Input
                type="date"
                name="dob" // Matches the `address` key in formData
                value={formData.dob}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <div className="form-group">
              <label className="text-start w-100">Phone Number</label>
              <input
                type="text"
                placeholder="Enter phone number"
                name="contact" // Matches the `phone_number` key in formData
                value={formData.contact}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </Col>
          <Col md={6}>
            <div className="form-group">
              <label className="text-start w-100">Email</label>
              <input
                type="email"
                placeholder="Enter email"
                name="email" // Matches the `email` key in formData
                value={formData.email}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </Col>
        </Row>
      </form>
    </div>
  );
};

export default FamilyMemberForm;
