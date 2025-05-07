import React, { useEffect, useState } from "react";
import { Row, Col, Label, FormGroup, Input } from "reactstrap"; // Import Row and Col from reactstrap
import API_URL from "../../api/api_urls";
import allaxios from "../../api/axios";

const PolicyDetailsForm = ({ formData, setFormData , handleChange }) => {
  const [userPolicies, setUserPolicies] = useState([]);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  const fetchPolicies = async () => {
    const response = await allaxios.get(API_URL.POLICIES.GET_POLICIES, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
      },
    });
    setUserPolicies(response.data);
  };

  useEffect(()=>{
    fetchPolicies();
  },[])
  console.log('userpolicy',userPolicies);
  console.log(formData);
  
  
  return (
    <div>
      <h5>Policy Details</h5>
      <form>
        <Row>
          <Col md={6}>
           <FormGroup>
           <Label for="policy_id">Policy</Label>
           <Input
             id="policy_id"
             name="policy_id"
             type="select" 
             value={formData.policy_id}
             onChange={handleChange}
             disabled
           >
          <option value="">Select Policy</option>
         
            {userPolicies.map((policy) => (
               <option key={policy.id} value={policy.id}>
                 {policy.policy_name}
               </option>
             ))}
           </Input>
         </FormGroup>
         
          </Col>

          <Col md={6}>
            <FormGroup>
              <Label for="start_date">Start Date</Label>
              <Input
                type="date"
                id="start_date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                className="form-control"
                disabled
              />
            </FormGroup>
          </Col>

           {/* <Col md={6}>
                      <div className="form-group">
                        <label>Start Date</label>
                        <input
                          type="date"
                          name="start_date"
                          value={formData.start_date}
                          onChange={handleChange}
                          className="form-control"
                        />
                        
                      </div>
                    </Col> */}
        </Row>

        <Row>
          {/* <Col md={6}>
            <FormGroup>
              <Label for="customer">Customer</Label>
              <Input
                type="text"
                id="customer"
                name="customer"
                value={formData.customer}
                onChange={handleChange}
                className="form-control"
              />
            </FormGroup>
          </Col> */}

          {/* <Col md={6}>
            <FormGroup>
              <Label for="remarks">Remarks</Label>
              <Input
                type="textarea"
                id="remarks"
                name="remarks"
                value={formData.remarks || ""}
                onChange={handleChange}
                className="form-control"
              />
            </FormGroup>
          </Col> */}
        </Row>
      </form>
    </div>
  );
};

export default PolicyDetailsForm;
