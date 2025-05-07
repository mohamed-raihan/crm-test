import React, { useEffect, useState } from "react";
import { Row, Col, Label, FormGroup, Input } from "reactstrap";
import allaxios from "../../api/axios";
import API_URL from "../../api/api_urls";
import Select from "react-select";

const CustomerDetailsForm = ({ formData, setFormData }) => {
  const [userPolicies, setUserPolicies] = useState([]);
  const [userCustomer, setUserCustomer] = useState([]);
  const [selectedCustomerDetails, setSelectedCustomerDetails] = useState(null); // For selected customer
  const [agent, setAgent] = useState([]);

  const [validationErrors, setValidationErrors] = useState({});

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

  //   const fetchUsercustomer = async () => {
  //     try {
  //       const response = await allaxios.get(API_URL.CUSTOMER.GET_CUSTOMER, {
  //         headers: {
  //           Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
  //         },
  //       });
  //       setUserCustomer(response.data);
  //     } catch (error) {
  //       console.error("Error fetching policies:", error);
  //     }
  //   };

  const fetchUsercustomer = async () => {
    const userDataString = sessionStorage.getItem("userData");

    if (!userDataString) {
      console.log("No user data found in session storage.");
      return;
    }

    try {
      const userData = JSON.parse(userDataString);
      console.log("Logged-in User ID:", userData.login_id);

      const response = await allaxios.get(API_URL.CUSTOMER.GET_CUSTOMER, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      });

      console.log("API Response:", response.data);

      const filteredCustomers = response.data.filter(
        (customer) => customer.created_by.id === userData.login_id
      );

      console.log("Filtered Customers:", filteredCustomers);
      setUserCustomer(filteredCustomers);
      //   setFilteredData(filteredCustomers);
    } catch (error) {
      console.error("Error occurred while fetching or processing data:", error);
    }
  };

  console.log(userCustomer);

  const fetchAgents = async () => {
    try {
      const response = await allaxios.get(API_URL.AGENTS.GET_AGENT);
      console.log(response);
      setAgent(response.data);
    } catch (error) {
      console.error(error);
      
    }
  };

  //   const handleChange = (e) => {
  //     setFormData({
  //       ...formData,
  //       [e.target.name]: e.target.value,
  //     });
  //   };

  // const handleChange = (e) => {
  //     const { name, value } = e.target;

  //     const errors = { ...validationErrors };

  //     if (name === "policy_ids") {
  //       const updatedValue = [parseInt(value)];
  //       console.log("Updated policy_ids:", updatedValue); // Log the updated value
  //       setFormData((prev) => ({
  //         ...prev,
  //         [name]: updatedValue, // Ensure policy_ids is an array
  //       }));
  //     } else {
  //       setFormData((prev) => ({
  //         ...prev,
  //         [name]: value,
  //       }));
  //     }
  //   };

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

  const handleAgentChange = (selectedOption) => {
    setFormData((prev) => ({
      ...prev,
      agent: selectedOption ? selectedOption.value : "",
    }));
  };

  const customerOptions = userCustomer.map((customer) => ({
    value: customer.id, // Assuming `id` is the unique identifier for customers
    label: `${customer.name}`, // Adjust based on your data structure
  }));

  console.log(customerOptions);

  useEffect(() => {
    fetchPolicies();
    fetchUsercustomer();
    fetchAgents();
  }, []);

  return (
    <div>
      <h5>Customer Details</h5>
      <form>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label htmlFor="customer_ids">Customer</Label>
              <Select
                id="customer_ids"
                name="customer_id"
                options={customerOptions}
                value={customerOptions.find(
                  (option) => option.value === formData.customer_id
                )}
                onChange={handleCustomerChange}
                isClearable
                placeholder="Select Customer"
              />
              {validationErrors.customer_id && (
                <p className="text-danger">{validationErrors.customer_id}</p>
              )}
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label htmlFor="agent">Agent</Label>
              <Select
                id="agent"
                name="agent"
                options={agent.map((item) => ({
                  value: item.id,
                  label: item.full_name,
                }))}
                value={agent
                  .map((item) => ({
                    value: item.id,
                    label: item.full_name,
                  }))
                  .find((option) => option.value === formData.agent)}
                onChange={handleAgentChange}
                isClearable
                placeholder="Select Agent"
              />
              {validationErrors.agent && (
                <p className="text-danger">{validationErrors.agent}</p>
              )}
            </FormGroup>
          </Col>
        </Row>

        {selectedCustomerDetails && (
          <div className="customer-details-section mt-4">
            <h6>Customer Information</h6>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label htmlFor="aadhar_card_number">Aadhar Card Number</Label>
                  <Input
                    type="text"
                    id="aadhar_card_number"
                    value={selectedCustomerDetails.aadhar_card_number || ""}
                    readOnly
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label htmlFor="pan_card_number">PAN Card Number</Label>
                  <Input
                    type="text"
                    id="pan_card_number"
                    value={selectedCustomerDetails.pan_card_number || ""}
                    readOnly
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label htmlFor="contact">Contact</Label>
                  <Input
                    type="text"
                    id="contact"
                    value={selectedCustomerDetails.contact || ""}
                    readOnly
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    value={selectedCustomerDetails.email || ""}
                    readOnly
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input
                    type="text"
                    id="dob"
                    value={selectedCustomerDetails.dob || ""}
                    readOnly
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label htmlFor="gender">Gender</Label>
                  <Input
                    type="text"
                    id="gender"
                    value={selectedCustomerDetails.gender || ""}
                    readOnly
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label htmlFor="father_name">Father's Name</Label>
                  <Input
                    type="text"
                    id="father_name"
                    value={selectedCustomerDetails.father_name || ""}
                    readOnly
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label htmlFor="mother_name">Mother's Name</Label>
                  <Input
                    type="text"
                    id="mother_name"
                    value={selectedCustomerDetails.mother_name || ""}
                    readOnly
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label htmlFor="guardian_name">Guardian Name</Label>
                  <Input
                    type="text"
                    id="guardian_name"
                    value={selectedCustomerDetails.guardian_name || ""}
                    readOnly
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label htmlFor="health_condition">Health Condition</Label>
                  <Input
                    type="text"
                    id="health_condition"
                    value={selectedCustomerDetails.health_condition || ""}
                    readOnly
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    type="text"
                    id="name"
                    value={selectedCustomerDetails.name || ""}
                    readOnly
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label htmlFor="occupation">Occupation</Label>
                  <Input
                    type="text"
                    id="occupation"
                    value={selectedCustomerDetails.occupation || ""}
                    readOnly
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label htmlFor="status">Status</Label>
                  <Input
                    type="text"
                    id="status"
                    value={selectedCustomerDetails.status || ""}
                    readOnly
                  />
                </FormGroup>
              </Col>
            </Row>
          </div>
        )}

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
                placeholder="Enter valid email"

              />
               {validationErrors.email && (
                <p className="text-danger">{validationErrors.email}</p>
              )}
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
                placeholder="Enter your pan card"

              />
               {validationErrors.pan_card_number && (
                <p className="text-danger">{validationErrors.pan_card_number}</p>
              )}
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
                placeholder="Enter 12-digit Aadhar number"

              />
               {validationErrors.aadhar_card_number && (
                <p className="text-danger">
                  {validationErrors.aadhar_card_number}
                </p>
              )}
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
               {validationErrors.dob && (
                <p className="text-danger">{validationErrors.dob}</p>
              )}
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
              {validationErrors.gender && (
                <p className="text-danger">{validationErrors.gender}</p>
              )}
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
                //   invalid={!!validationErrors.status}

                >
           <option value="">Select Status</option>
           <option value="active">Active</option>
           <option value="deactivated" >Deactivated</option>

           {validationErrors.status && (
                <p className="text-danger">{validationErrors.status}</p>
              )}
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
                placeholder="Enter father name"

              />
               {validationErrors.father_name && (
                <p className="text-danger">{validationErrors.father_name}</p>
              )}
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
        <Row>
          {/* <Col md={4}>
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
              {validationErrors.policies && (
                <p className="text-danger">{validationErrors.policies}</p>
              )}
            </div>
          </Col> */}
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
          {/* <Col md={4}>
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
             {validationErrors.policy_ids && (
                <p className="text-danger">{validationErrors.policy_ids}</p>
              )}
                </Input>
          </Col> */}
          {/* <Col md={4}>
            <div className="form-group">
              <label>Occupation</label>
              <input
                type="text"
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                className="form-control"
              />
               {validationErrors.occupation && (
                <p className="text-danger">{validationErrors.occupation}</p>
              )}
            </div>
          </Col> */}
        </Row>

        {/* Policies from API */}
        <Row></Row>

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
                {validationErrors.health_condition && (
                <p className="text-danger">{validationErrors.health_condition}</p>
              )}
            </div>
          </Col>
        </Row> */}
      </form>
    </div>
  );
};

export default CustomerDetailsForm;
