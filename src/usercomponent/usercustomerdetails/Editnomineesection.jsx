import React from "react";
import { Row, Col, Label, FormGroup, Input } from "reactstrap"; // Import Row and Col from reactstrap

const NomineeDetailsForm = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value, // Directly updating the top-level keys
    });
  };

  return (
    <div>
      <h5>Nominee Details</h5>
      <form>
        <Row>
          <Col md={6}>
            <div className="form-group">
              <label>Nominee Name</label>
              <input
                type="text"
                name="name" // Matches the `name` key in formData
                value={formData.name}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </Col>
          <Col md={6}>
             <FormGroup>
          <Label for="relationship">relationship</Label>
          {/* <Field name="status" as="select" className="form-control">
//             <option value="">Select Status</option>
//             <option value="Active">Active</option>
//             <option value="Deactivated" disabled>Deactivated</option>
//           </Field> */}
            <Input
                  id="relationship"
                  name="relationship"
                  type="select"
                  value={formData.relationship}
                  onChange={handleChange}
                  // invalid={!!validationErrors.status}

                >
           <option value="">Select relationship</option>
           <option value="spouse">spouse</option>
           <option value="parent" >parent</option>
           <option value="child" >child</option>
           {/* <option value="other" >other</option> */}

           {/* <option value="Cancelled">Cancelled</option> */}


               </Input>
               {/* <FormFeedback>{validationErrors.status}</FormFeedback> */}

        {/* <ErrorMessage name="status" component="div" className="text-danger" /> */}
      </FormGroup>      
       </Col>
        </Row>

        <Row>
          <Col md={6}>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="text"
                name="phone_number" // Matches the `phone_number` key in formData
                value={formData.phone_number}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </Col>
          <Col md={6}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email" // Matches the `email` key in formData
                value={formData.email}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <div className="form-group">
              <label>Address</label>
              <textarea
                name="address" // Matches the `address` key in formData
                value={formData.address}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </Col>
          {/* <Col md={6}>
            <div className="form-group">
              <label>Customer</label>
              <input
                type="text"
                name="customer" // Matches the `customer` key in formData
                value={formData.customer}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </Col> */}
        </Row>
      </form>
    </div>
  );
};

export default NomineeDetailsForm;
