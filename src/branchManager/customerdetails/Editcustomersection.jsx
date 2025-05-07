import React, { useEffect, useState } from "react";
import { Row, Col, Label, FormGroup, Input } from "reactstrap";
import allaxios from "../../api/axios";
import API_URL from "../../api/api_urls";
import Select from "react-select"; // Use react-select instead

const CustomerDetailsForm = ({ formData, setFormData  }) => {
  const [userPolicies, setUserPolicies] = useState([]);
  const [userCustomer, setUserCustomer] = useState([]);

  const fetchPolicies = async () => {
    try {
      const response = await allaxios.get(API_URL.POLICIES.GET_POLICIES, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      });
      setUserPolicies(response.data);
    } catch (error) {
      console.error("Error fetching policies:", error);
    }
  };

  const fetchUsercustomer = async () => {
    try {
      const response = await allaxios.get(API_URL.CUSTOMER.GET_CUSTOMER, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      });
      setUserCustomer(response.data);
    } catch (error) {
      console.error("Error fetching policies:", error);
    }
  };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };
const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "policy_ids") {
      const updatedValue = [parseInt(value)];
      console.log("Updated policy_ids:", updatedValue); // Log the updated value
      setFormData((prev) => ({
        ...prev,
        [name]: updatedValue, // Ensure policy_ids is an array
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  
  const handleCustomerChange = (selectedOption) => {
    const selectedCustomer = userCustomer.find(
      (customer) => customer.id === selectedOption.value
    );
    setSelectedCustomerDetails(selectedCustomer); // Update selected customer details
    setFormData((prev) => ({
      ...prev,
      customer_id: selectedOption ? selectedOption.value : "",
    }));
  };
    const customerOptions = userCustomer.map((customer) => ({
      value: customer.id, // Assuming `id` is the unique identifier for customers
      label: `${customer.name}`, // Adjust based on your data structure
      
    }));
  
  useEffect(() => {
    fetchPolicies();
    fetchUsercustomer();
  }, []);

  return (
    <div>
      <h5>Customer Details</h5>
      <form>
        {/* Name and Contact */}
        <Row>
        <Col md={12}>
  <FormGroup>
    <Label htmlFor="customer_ids">Customer</Label>
    <Select
      id="customer_ids"
      name="customer_id"
      options={customerOptions}
      value={customerOptions.find((option) => option.value === formData.customer_id)}
      onChange={handleCustomerChange}
      isClearable 
      placeholder="Select Customer"
    />
    {/* {validationErrors.customer_id && (
      <p className="text-danger">{validationErrors.customer_id}</p>
    )} */}
  </FormGroup>
</Col>
        </Row>

        {/* Email and Aadhar Card Number */}
        {/* <Row>
          <Col md={4}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </Col>
          <Col md={4}>
            <div className="form-group">
              <label>Pan Card Number</label>
              <input
                type="text"
                name="pan_card_number"
                value={formData.pan_card_number}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </Col>
          <Col md={4}>
            <div className="form-group">
              <label>Aadhar Card Number</label>
              <input
                type="text"
                name="aadhar_card_number"
                value={formData.aadhar_card_number}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </Col>
        </Row> */}

        {/* Date of Birth and Gender */}
        {/* <Row>
          <Col md={4}>
            <div className="form-group">
              <label>Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </Col>
          <Col md={4}>
            <div className="form-group">
              <label>Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="form-control"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </Col>
          <Col md={4}>
       <FormGroup>
            <Label for="status">Customer Status</Label>
          
            <Input
                  id="status"
                  name="status"
                  type="select"
                  value={formData.status}
                  onChange={handleChange}

                >
           <option value="">Select Status</option>
           <option value="active">Active</option>
           <option value="deactivated" >Deactivated</option>


            </Input>

      </FormGroup>   
               </Col>
        </Row> */}

        {/* Father, Mother, and Guardian Names */}
        {/* <Row>
          <Col md={4}>
            <div className="form-group">
              <label>Father's Name</label>
              <input
                type="text"
                name="father_name"
                value={formData.father_name}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </Col>
          <Col md={4}>
            <div className="form-group">
              <label>Mother's Name</label>
              <input
                type="text"
                name="mother_name"
                value={formData.mother_name}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </Col>
          <Col md={4}>
            <div className="form-group">
              <label>Guardian's Name</label>
              <input
                type="text"
                name="guardian_name"
                value={formData.guardian_name}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </Col>
        </Row> */}

        {/* Policies (Static Dropdown) */}
        {/* <Row>
          <Col md={6}>
            <div className="form-group">
              <label>Policy Status</label>
              <select
                name="policies"
                value={formData.policies}
                onChange={handleChange}
                className="form-control"
              >
                <option value="">Select Policy Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </Col>
          <Col md={6}>
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
          </Col>
        </Row> */}

        {/* Policies from API */}
        {/* <Row>
          <Col md={6}>
          <Label for="policy_ids">Policy ID</Label>
                <Input
                  id="policy_ids"
                  name="policy_ids"
                  type="select"
                  value={formData.policy_ids}
                  onChange={handleChange}
                //   invalid={!!validationErrors.policy_ids}
                >
                  <option value="">Select Policy</option>
                  {userPolicies.map((policy) => (
                    <option key={policy.id} value={policy.id}>
                      {policy.policy_name}
                    </option>
                  ))}
                </Input>
          </Col>
          <Col md={6}>
            <div className="form-group">
              <label>Occupation</label>
              <input
                type="text"
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </Col>
        </Row> */}

        {/* Address Field */}
        {/* <Row>
          <Col md={12}>
            <div className="form-group">
              <label>Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </Col>
        </Row> */}

        {/* Health Condition */}
        {/* <Row>
          <Col md={12}>
            <div className="form-group">
              <label>Health Condition</label>
              <textarea
                name="health_condition"
                value={formData.health_condition}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </Col>
        </Row> */}
      </form>
    </div>
  );
};

export default CustomerDetailsForm;
