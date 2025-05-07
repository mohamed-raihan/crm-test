import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Label,
  FormGroup,
  Input,
  Button,
  FormFeedback,
} from "reactstrap"; // Import Row and Col from reactstrap
import API_URL from "../../api/api_urls";
import allaxios from "../../api/axios";
import { Form, Table } from "react-bootstrap";

const PolicyDetailsForm = ({
  formData,
  setFormData,
  handleChange,
  selectedpolicy,
  calculateTotal,
}) => {
  const [userPolicies, setUserPolicies] = useState([]);
  const [taxPercentage, setTaxpercentage] = useState([]);
  const [plans, setPlans] = useState([]);
  const [coverage, setCoverage] = useState([]);
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [isHospicash, setIsHospicash] = useState(false);

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

  const fetchTax = async () => {
    try {
      const response = await allaxios.get(API_URL.TAX.GET_TAX);
      console.log(response);
      setTaxpercentage(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPlans = async () => {
    try {
      const response = await allaxios.get(API_URL.PLANS.GET_PLAN);
      console.log(response.data);

      console.log(formData.policy);
      

      const matchedPlans = response.data.filter((plan)=>
        plan.policy == formData.policy
      )

       console.log(matchedPlans);
       
      setPlans(matchedPlans);
    } catch (error) {
      console.error(error);
    }
  };

  // const fetchPlanCoverage = async () => {
  //   try {
  //     const response = await allaxios.get(
  //       API_URL.PLAN_COVERAGE.GET_PLAN_COVERAGE
  //     );
  //     console.log(response.data);

  //     setCoverage(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handlePlan = async (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: parseInt(value), // Convert to list and parse as integer
    }));

    try {
      const response = await allaxios.get(
        API_URL.PLAN_COVERAGE.GET_PLAN_COVERAGE
      );
      console.log(response.data);

      const matchedCoverage = response.data.filter(
        (coverage) => coverage.plan == value
      );
      console.log(matchedCoverage);

      setCoverage(matchedCoverage);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(formData.policy);

  const matchedPolicy = userPolicies.find(
    (policy) => policy.id == formData?.policy
  )?.policy_name;

  useEffect(() => {
    if (matchedPolicy?.toLowerCase() === "hospicash") {
      setIsHospicash(true);
    } else {
      setIsHospicash(false);
    }
  }, [matchedPolicy]);

  const handleSelectPlan = (planId) => {
    setSelectedPlanId(planId);
  };

  useEffect(() => {
    fetchPolicies();
    // fetchTax();
    fetchPlans();
    // fetchPlanCoverage();
  }, [formData]);

  console.log("userpolicy", userPolicies);
  console.log(formData);

  const containerStyle = {
    margin: "20px auto",
    maxWidth: "900px",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)", // Two columns by default
    gap: "15px", // Space between rows and columns
    width: "100%",
  };

  const headingStyle = {
    fontSize: "18px",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "20px",
  };

  <style jsx>
    {`
      @media (max-width: 768px) {
        .sub-row-style {
          flex-direction: column; /* Stack columns vertically */
          gap: 10px; /* Adjust spacing for smaller screens */
        }
      }
    `}
  </style>;

  const addPolicy = () => {
    setFormData([
      ...formData,
      { policy_id: "", start_date: "", customer_id: "" },
    ]);
  };

  // Function to remove a policy field
  const removePolicy = (index) => {
    const updatedPolicies = formData.filter((_, i) => i !== index);
    setFormData(updatedPolicies);
  };

  const boxStyle = {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "20px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  };

  const mainRowStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  };
  const subRowStyle = {
    display: "flex",
    justifyContent: "space-between", // Space between the two columns
    gap: "20px", // Space between columns
  };

  const colStyle = {
    flex: "1", // Equal width for both columns
    display: "flex",
    flexDirection: "column",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
  };

  const labelStyle = {
    fontWeight: "600",
    marginBottom: "5px",
    color: "#333",
  };
  const valueStyle = {
    fontWeight: "500", // Make the value bolder
    color: "#555",
    // wordBreak: "break-word", // Handles long text
    // alignSelf: "flex-end", // Align values to the start of the column
    // backgroundColor: "red",
    display: "flex",
    alignItems: "center",
  };

  const detailRowStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center", // Align label and value vertically
    fontSize: "16px",
    gap: "15px", // Space between label and value
  };

  return (
    <div>
      <h5>Policy Details</h5>
      <form>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="policy_id">Policy</Label>
              <Input
                id="policy"
                name="policy"
                type="select"
                value={formData.policy}
                onChange={handleChange}
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
              />
            </FormGroup>
          </Col>
        </Row>
        {!isHospicash ? (
          <div>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="coverage_amount">Coverage amount</Label>
                  <Input
                    className="bg-light"
                    id="coverage_amount"
                    name="coverage_amount"
                    placeholder="Enter coverage amount"
                    type="text"
                    value={formData.coverage_amount}
                    onChange={handleChange}
                    invalid=""
                  />
                  <FormFeedback>Coverage amount is required</FormFeedback>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="coverage_type">Coverage Type</Label>
                  <Input
                    className="bg-light"
                    id="coverage_type"
                    name="coverage_type"
                    placeholder="Enter coverage type"
                    type="text"
                    value={formData.coverage_type}
                    onChange={handleChange}
                    invalid=""
                  />
                  <FormFeedback>Coverage Type is required</FormFeedback>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="total_premium_amount1">Total premium amount</Label>
                  <Input
                    className="bg-light"
                    id="total_premium_amount1"
                    name="total_premium_amount1"
                    placeholder="Total premium amount"
                    value={formData.total_premium_amount1}
                    onChange={handleChange}
                    invalid=""
                  />
                  <FormFeedback>This field is required</FormFeedback>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="tax">Tax (%)</Label>
                  <Input
                    className="bg-light"
                    type="text"
                    id="tax"
                    name="tax"
                    placeholder="Enter tax percentage"
                    value={formData.tax}
                    onChange={handleChange}
                    onKeyUp={calculateTotal}
                    invalid=""
                  />
                  <FormFeedback>Enter tax percentage</FormFeedback>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="tax_amount">Tax amount</Label>
                  <Input
                    className="bg-light"
                    id="tax_amount"
                    name="tax_amount"
                    placeholder="Enter tax amount"
                    value={formData.tax_amount}
                    onChange={handleChange}
                    invalid=""
                  />
                  <FormFeedback>This field is required</FormFeedback>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="premium_amount">Premium Amount</Label>
                  <Input
                    className="bg-light"
                    id="premium_amount"
                    name="premium_amount"
                    placeholder="Enter premium amount"
                    value={formData.premium_amount}
                    onChange={handleChange}
                    onKeyUp={calculateTotal}
                    invalid=""
                  />
                  <FormFeedback>Enter premium amount</FormFeedback>
                </FormGroup>
              </Col>
            </Row>
          </div>
        ) : (
          <div>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="plan">Plan</Label>
                  <Input
                    id="plan"
                    name="plan"
                    type="select"
                    value={formData.plan}
                    onChange={handlePlan}
                  >
                    <option value="">Select Plan</option>

                    {plans.map((policy) => (
                      <option key={policy.id} value={policy.id}>
                        {policy.plan_name}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="plan_coverage">Premium amount</Label>
                  <Input
                    id="plan_coverage"
                    name="plan_coverage"
                    type="select"
                    value={formData.plan_coverage}
                    onChange={handleChange}
                  >
                    <option value="">Select premium amount</option>

                    {coverage.map((coverage) => (
                      <option key={coverage.id} value={coverage.id}>
                        {coverage.premium_amount}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
            </Row>
          </div>
        )}

        {selectedpolicy && (
          <div style={containerStyle}>
            <h6 style={headingStyle}>Selected Policy Details</h6>
            <div style={boxStyle}>
              <div style={gridStyle}>
                {[
                  { label: "Policy Name", value: selectedpolicy.policy_name },
                  {
                    label: "Company Details",
                    value: selectedpolicy.company_details,
                  },
                  {
                    label: "Coverage Amount",
                    value: selectedpolicy.coverage_amount,
                  },
                  {
                    label: "Coverage Type",
                    value: selectedpolicy.coverage_type,
                  },
                  { label: "Description", value: selectedpolicy.description },
                  {
                    label: "Payment Frequency",
                    value: selectedpolicy.payment_frequency,
                  },
                  {
                    label: "Policy Category",
                    value: selectedpolicy.policy_category_details,
                  },
                  {
                    label: "Policy Term Duration",
                    value: selectedpolicy.policy_term_duration,
                  },
                  {
                    label: "Policy Type",
                    value: selectedpolicy.policy_type_details,
                  },
                  {
                    label: "Premium Amount",
                    value: selectedpolicy.premium_amount,
                  },
                  { label: "Status", value: selectedpolicy.status },
                  { label: "Tax Amount", value: selectedpolicy.tax_amount },
                  { label: "Tax Type", value: selectedpolicy.tax_type },
                  {
                    label: "Total Premium Amount",
                    value: selectedpolicy.total_premium_amount,
                  },
                ].map((detail, index) => (
                  <div key={index} style={detailRowStyle}>
                    <span style={labelStyle}>{detail.label}:</span>
                    <span style={valueStyle}>{detail.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default PolicyDetailsForm;
