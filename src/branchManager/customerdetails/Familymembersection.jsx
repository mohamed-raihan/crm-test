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

  //   const handleChange = (e) => {
  //     setFormData({
  //       ...formData,
  //       [e.target.name]: e.target.value,
  //     });
  //   };

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedFamilyData = [...formData];
    updatedFamilyData[index][name] = value;
    setFormData(updatedFamilyData);
  };

  console.log(formData);
  

  const handleSave = () => {
    allaxios
      .post(API_URL.FAMILY_MEMBERS.POST_MEMBERS, familyData)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const addFamilyMember = () => {
    setFormData([
      ...formData,
      {
        id: "",
        cutomer: "",
        first_name: "",
        middle_name: "",
        last_name: "",
        relationship: "",
        dob: "",
        gender: "",
        contact: "",
        email: "",
        address1: "",
        address2: "",
        address3: "",
        district: "",
        pincode: "",
        pan_no: "",
        occupation: "",
      },
    ]);
  };

  return (
    // <div>
    //   <h5 className="mb-4">Family Details</h5>
    //   <form >
    //     <Row>
    //       <Col md={4}>
    //         <div>
    //           <FormGroup>
    //             <Label className="text-start w-100"> Name</Label>
    //             <Input
    //               type="text"
    //               placeholder="Enter name"
    //               name="name" // Matches the `name` key in formData
    //               value={formData.name}
    //               onChange={handleChange}
    //             />
    //           </FormGroup>
    //         </div>
    //       </Col>
    //       <Col md={4}>
    //         <FormGroup>
    //           <Label className="text-start w-100" for="relationship">
    //             relationship
    //           </Label>
    //           <Input
    //             id="relationship"
    //             name="relationship"
    //             type="select"
    //             value={formData.relationship}
    //             onChange={handleChange}
    //             // invalid={!!validationErrors.status}
    //           >
    //             <option value="">Select relationship</option>
    //             {relationshipChoice.map((relation) => (
    //               <option value={relation.value}>{relation.label}</option>
    //             ))}

    //             {/* <option value="Cancelled">Cancelled</option> */}
    //           </Input>
    //           {/* <FormFeedback>{validationErrors.status}</FormFeedback> */}

    //           {/* <ErrorMessage name="status" component="div" className="text-danger" /> */}
    //         </FormGroup>
    //       </Col>
    //       <Col md={4}>
    //         <div className="form-group">
    //           <label className="text-start w-100">Date of birth</label>
    //           <Input
    //             type="date"
    //             name="dob" // Matches the `address` key in formData
    //             value={formData.dob}
    //             onChange={handleChange}
    //             className="form-control"
    //           />
    //         </div>
    //       </Col>
    //     </Row>

    //     <Row>
    //       <Col md={6}>
    //         <div className="form-group">
    //           <label className="text-start w-100">Phone Number</label>
    //           <input
    //             type="text"
    //             placeholder="Enter phone number"
    //             name="contact" // Matches the `phone_number` key in formData
    //             value={formData.contact}
    //             onChange={handleChange}
    //             className="form-control"
    //           />
    //         </div>
    //       </Col>
    //       <Col md={6}>
    //         <div className="form-group">
    //           <label className="text-start w-100">Email</label>
    //           <input
    //             type="email"
    //             placeholder="Enter email"
    //             name="email" // Matches the `email` key in formData
    //             value={formData.email}
    //             onChange={handleChange}
    //             className="form-control"
    //           />
    //         </div>
    //       </Col>
    //     </Row>
    //   </form>
    // </div>
    <div>
      <h5 className="mb-4">Family Details</h5>
      {formData.map((member, index) => (
        <div key={index} className="family-member-form">
          <Row>
            <Col md={4}>
              <FormGroup>
                <Label className="text-start w-100">First Name <span className="text-danger fw-bold">*</span></Label>
                <Input
                  type="text"
                  placeholder="Enter first name"
                  name="first_name"
                  value={member.first_name}
                  onChange={(e) => handleChange(index, e)}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label className="text-start w-100">Middle Name <span className="text-danger fw-bold">*</span></Label>
                <Input
                  type="text"
                  placeholder="Enter middle name"
                  name="middle_name"
                  value={member.middle_name}
                  onChange={(e) => handleChange(index, e)}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label className="text-start w-100">Last Name <span className="text-danger fw-bold">*</span></Label>
                <Input
                  type="text"
                  placeholder="Enter last name"
                  name="last_name"
                  value={member.last_name}
                  onChange={(e) => handleChange(index, e)}
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
                  value={member.relationship}
                  onChange={(e) => handleChange(index, e)}
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
                <Label className="text-start w-100">Date of Birth <span className="text-danger fw-bold">*</span></Label>
                <Input
                  type="date"
                  name="dob"
                  value={member.dob}
                  onChange={(e) => handleChange(index, e)}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label className="text-start w-100">Gender <span className="text-danger fw-bold">*</span></Label>
                <Input
                  type="select"
                  name="gender"
                  value={member.gender}
                  onChange={(e) => handleChange(index, e)}
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
                <Label className="text-start w-100">Phone Number <span className="text-danger fw-bold">*</span></Label>
                <Input
                  type="text"
                  placeholder="Enter phone number"
                  name="contact"
                  value={member.contact}
                  onChange={(e) => handleChange(index, e)}
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
                  value={member.email}
                  onChange={(e) => handleChange(index, e)}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <FormGroup>
                <Label className="text-start w-100">Address 1 <span className="text-danger fw-bold">*</span></Label>
                <Input
                  type="text"
                  placeholder="Enter address 1"
                  name="address1"
                  value={member.address1}
                  onChange={(e) => handleChange(index, e)}
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
                  value={member.address2}
                  onChange={(e) => handleChange(index, e)}
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
                  value={member.address3}
                  onChange={(e) => handleChange(index, e)}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <FormGroup>
                <Label className="text-start w-100">District <span className="text-danger fw-bold">*</span></Label>
                <Input
                  type="text"
                  placeholder="Enter district"
                  name="district"
                  value={member.district}
                  onChange={(e) => handleChange(index, e)}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label className="text-start w-100">Pincode <span className="text-danger fw-bold">*</span></Label>
                <Input
                  type="text"
                  placeholder="Enter pincode"
                  name="pincode"
                  value={member.pincode}
                  onChange={(e) => handleChange(index, e)}
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
                  value={member.pan_no}
                  onChange={(e) => handleChange(index, e)}
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
                  value={member.occupation}
                  onChange={(e) => handleChange(index, e)}
                />
              </FormGroup>
            </Col>
          </Row>
          <hr />
        </div>
      ))}

      <Button color="primary" onClick={addFamilyMember}>
        + Add Another Family Member
      </Button>
    </div>
  );
};

export default FamilyMemberForm;
