import React, { useEffect, useState } from "react";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import Select from "react-select";
import allaxios from "../../api/axios";
import API_URL from "../../api/api_urls";

const CustomerDetailsForm = ({ formData, setFormData, onValidationChange }) => {
  const [validationErrors, setValidationErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [userPolicies, setUserPolicies] = useState([]);
  const [userCustomer, setUserCustomer] = useState([]);
  const [selectedCustomerDetails, setSelectedCustomerDetails] = useState(null);
  const [agent, setAgent] = useState([]);

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    // Validate customer_id
    if (!formData.customer_id) {
      errors.customer_id = "Customer is required";
      isValid = false;
    }

    // Validate agent
    // if (!formData.agent) {
    //   errors.agent = "Agent is required";
    //   isValid = false;
    // }

    setValidationErrors(errors);
    setIsFormValid(isValid);

    // Notify parent component about validation status
    if (onValidationChange) {
      onValidationChange(isValid);
    }

    return isValid;
  };

  const handleCustomerChange = (selectedOption) => {
    const selectedCustomer = userCustomer.find(
      (customer) => customer.id === selectedOption.value
    );
    setSelectedCustomerDetails(selectedCustomer);
    setFormData((prev) => ({
      ...prev,
      customer_id: selectedOption ? selectedOption.value : "",
    }));
    validateForm();
  };

  const handleAgentChange = (selectedOption) => {
    setFormData((prev) => ({
      ...prev,
      agent: selectedOption ? selectedOption.value : "",
    }));
    validateForm();
  };

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

  const fetchAgents = async () => {
    try {
      const response = await allaxios.get(API_URL.AGENTS.GET_AGENT, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      });
      setAgent(response.data);
    } catch (error) {
      console.error("Error fetching agents:", error);
    }
  };

  const fetchUserCustomer = async () => {
    try {
      const response = await allaxios.get(API_URL.CUSTOMER.GET_CUSTOMER, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      });
      setUserCustomer(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  useEffect(() => {
    fetchPolicies();
    fetchUserCustomer();
    fetchAgents();
    validateForm();
  }, [formData]);

  const customerOptions = userCustomer.map((customer) => ({
    value: customer.id,
    label: `${customer.name}`,
  }));

  return (
    <div>
      <h5>Customer Details</h5>
      <form>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label htmlFor="customer_ids">Customer *</Label>
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
                className={validationErrors.customer_id ? "is-invalid" : ""}
                required
              />
              {validationErrors.customer_id && (
                <div className="invalid-feedback">
                  {validationErrors.customer_id}
                </div>
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
      </form>
    </div>
  );
};

export default CustomerDetailsForm;
