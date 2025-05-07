import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import allaxios from "../../api/axios";
import API_URL from "../../api/api_urls";
import { toast } from "react-toastify";
import "../../css/layout/policies/policiestable.css";
import { Table, Container, Form } from "react-bootstrap";

const NewpolicyModal = ({ toggle, editToggle, fetchPolicies, editData }) => {
  const [policyData, setPolicydata] = useState({
    id: "",
    policy_code: "",
    policy_name: "",
    company: "",
    policy_category: "",
    policy_type: "",
    description: "",
    coverage_amount: "",
    coverage_type: "",
    premium_amount: "",
    payment_frequency: "",
    tax: "",
    tax_type: "",
    tax_amount: "",
    total_premium_amount: "",
    commission_agent: "",
    commission_kannat: "",
    policy_term_duration: "",
    status: "",
    eligibility_criteria: "",
    exclusions: "" || null,
    grace_period: "",
    late_payment_penalty: "",
    maturity_benefits: "",
    cancellation_policy: "",
    terms_conditions_document: "",
    policy_brochure: "",
    no_claim_bonus: "",
    // created_by: "",
    // created_date: "",
    // updated_date: "",
  });
  const [polcyCatogary, setPolicyCategory] = useState([]);
  const [policyType, setPolicyType] = useState([]);
  const [premiumAmount, setPremiumAmount] = useState("");
  const [tax, setTax] = useState("");
  const [totalPremiumAmount, setTotalPremiumAmount] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);
  const [taxPercentage, setTaxpercentage] = useState([]);
  const [errors, setErrors] = useState({});
  const [policyCode, setPolicyCode] = useState([]);
  const [company, setCompany] = useState([]);

  const fetchCategory = async () => {
    console.log("fetch");
    try {
      const response = await allaxios.get(API_URL.POLICY_CATEGORY.GET_CATEGORY);
      console.log(response);

      // // Ensure policyData.company exists
      // if (!policyData?.company) {
      //   toast.error("Company data is missing");
      //   return;
      // }

      // // Filter categories matching policyData.company
      // const companyCategory = response.data.filter(
      //   (category) => category.company === policyData.company
      // );
      // console.log(companyCategory);

      setPolicyCategory(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Error fetching data");
    }
  };

  const fetchPolicyType = async () => {
    try {
      const response = await allaxios.get(API_URL.POLICY_TYPE.GET_POLICY_TYPE);
      console.log(response);
      console.log(policyData.company, policyData.policy_category);

      const filteredMaster = response.data.filter(
        (master) =>
          master.company == policyData.company &&
          master.policy_category == policyData.policy_category
      );
      console.log(filteredMaster);

      setPolicyType(filteredMaster);
    } catch (error) {
      console.error(error);
    }
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

  const fetchCompany = async () => {
    try {
      const response = await allaxios.get(API_URL.COMPANY.GET_COMPANY);
      console.log(response);
      setCompany(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const calculateTotal = () => {
    const amount = parseFloat(premiumAmount) || 0;

    console.log(tax);

    const selectedTax = taxPercentage.find(
      (option) => option.id === parseInt(tax)
    );
    const taxRate = selectedTax ? parseFloat(selectedTax.tax) : 0;

    // const taxRate = parseFloat(tax) || 0;

    const calculatedTax = (amount * taxRate) / 100;

    const total = amount + calculatedTax;

    setTotalPremiumAmount(total.toFixed(2));
    setTaxAmount(calculatedTax.toFixed(2));

    setPolicydata((prevData) => ({
      ...prevData,
      tax_amount: calculatedTax.toFixed(2),
      total_premium_amount: total.toFixed(2),
    }));
  };

  const checkPolicyCodeDuplication = async (policyCode) => {
    try {
      const response = await allaxios.get(
        `${API_URL.POLICIES.GET_POLICIES}?policy_code=${policyCode}`
      );
      return response.data.exists; // Assuming the API returns `{ exists: true/false }`
    } catch (error) {
      console.error("Error checking policy code duplication:", error);
      toast.error("Error validating policy code.");
      return false; // Default to false if the API call fails
    }
  };

  // const handleInputChange = (event) => {
  //   const { name, value, type, files } = event.target;

  //   setPolicydata({
  //     ...policyData,
  //     [name]: type === "file" ? files[0] : value, // Handle file inputs
  //   });

  //   if (name === "premium_amount") {
  //     const taxPercentage = parseFloat(value) || 0;
  //     setPremiumAmount(taxPercentage);
  //     calculateTotal();
  //   }
  //   if (name === "tax_percentage") {
  //     setTax(value);
  //     calculateTotal();
  //   }
  // };

  const handleInputChange = async (event) => {
    const { name, value, type, files } = event.target;

    // Update state for policy data
    setPolicydata({
      ...policyData,
      [name]: type === "file" ? files[0] : value, // Handle file inputs
    });

    console.log(value);

    if (value.toLowerCase() === "hospicash") {
      console.log("inside hospicash");

      setIsHospicash(true);
    }

    // Handle specific input cases
    if (name === "premium_amount") {
      const premiumAmount = parseFloat(value) || 0;
      setPremiumAmount(premiumAmount);
      calculateTotal();
    }

    if (name === "tax") {
      setTax(value);
      calculateTotal();
    }

    if (name === "policy_code") {
      const formattedCode = value.toUpperCase(); // Format the policy_code
      setPolicydata({
        ...policyData,
        policy_code: formattedCode,
      });

      console.log(formattedCode);

      // Check for duplicate policy codes
      const isDuplicate = await checkPolicyCodeDuplication(formattedCode);
      if (isDuplicate) {
        setPolicydata((prevData) => ({
          ...prevData,
          policy_code: "",
        }));
        toast.error("Policy code already exists. Please use a different code.");
      }
    }
  };

  // Handle company selection
  const handleMasterChange = async (event) => {
    const selectedCompanyId = event.target.value;

    // Update policy data with selected company
    setPolicydata((prevData) => ({
      ...prevData,
      company: selectedCompanyId,
    }));

    console.log(selectedCompanyId);

    try {
      // Fetch categories filtered by company
      const categoryResponse = await allaxios.get(
        API_URL.POLICY_CATEGORY.GET_CATEGORY
      );
      console.log(categoryResponse);

      const filteredCategories = categoryResponse.data.filter(
        (category) => category.company == selectedCompanyId
      );
      setPolicyCategory(filteredCategories);
      console.log(filteredCategories);

      // Fetch types filtered by company
      const typeResponse = await allaxios.get(
        API_URL.POLICY_TYPE.GET_POLICY_TYPE
      );
      console.log(typeResponse);

      const filteredTypes = typeResponse.data.filter(
        (type) => type.company == selectedCompanyId
      );
      setPolicyType(filteredTypes);
      console.log(filteredTypes);
    } catch (error) {
      console.error(error);
      toast.error("Error fetching category or type data");
    }
  };

  console.log(errors);

  const validateFields = () => {
    const newErrors = {};
    const optionalFields = [
      "id",
      "exclusions",
      "grace_period",
      "late_payment_penalty",
      "eligibility_criteria",
      "maturity_benefits",
      "no_claim_bonus",
      "policy_brochure",
      "terms_conditions_document",
      "cancellation_policy",
      "coverage_type",
      "premium_amount",
      "tax",
      "tax_type",
      "tax_amount",
      "total_premium_amount",
      "coverage_amount",
      "tax_details",
    ];

    Object.entries(policyData).forEach(([key, value]) => {
      if (!optionalFields.includes(key)) {
        if (typeof value === "string" && !value.trim()) {
          newErrors[key] = true; // String is empty or whitespace
        } else if (value === null || value === undefined) {
          newErrors[key] = true; // Value is null or undefined
        }
      }
    });

    console.log("Validation Errors:", newErrors); // Debugging
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // const handleSave = (event) => {
  //   console.log(policyData);

  //   event.preventDefault();
  //   if (!validateFields()) {
  //     toast.error("Please fill out all required fields.");
  //     return;
  //   }

  //   Object.keys(policyData).forEach((key) => {
  //     if (policyData[key]) {
  //       formData.append(key, policyData[key]); // ✅ Append all data, including files
  //     }
  //   });

  //   if (policyData.id) {
  //     console.log("edit");

  //     allaxios
  //       .patch(API_URL.POLICIES.PATCH_POLICIES(policyData.id), policyData)
  //       .then((response) => {
  //         console.log(response);
  //         editToggle();
  //         toast.success("Policy updated");
  //         fetchPolicies();
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //         toast.error("Error occured");
  //       });
  //   } else {
  //     allaxios
  //       .post(API_URL.POLICIES.POST_POLICIES, policyData)
  //       .then((response) => {
  //         toast.success("Policy added");
  //         console.log(response);
  //         toggle();
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //         toast.error(
  //           error.response.data.policy_code
  //             ? error.response.data.policy_code[0]
  //             : "Some error occured"
  //         );
  //       });
  //   }
  // };

  const handleSave = async (event) => {
    event.preventDefault();

    if (!validateFields()) {
      toast.error("Please fill out all required fields.");
      return;
    }

    const formData = new FormData(); // ✅ Declare formData before using it

    // Append all fields to FormData
    Object.keys(policyData).forEach((key) => {
      if (policyData[key]) {
        formData.append(key, policyData[key]);
      }
    });

    // Check if editing or creating a new policy
    if (policyData.id) {
      console.log("edit");

      if (rows.length > 0) {
        rows.forEach(async (planData) => {
          console.log(planData);

          if (planData.id) {
            console.log("inside if");

            try {
              const response = await allaxios.patch(
                API_URL.PLANS.PATCH_PLAN(planData.id),
                planData
              );
              console.log(response);

              editToggle();
              fetchPolicies();
            } catch (error) {
              console.error(error);
            }
          } else {
            console.log("inside else");

            try {
              const responses = await allaxios.post(API_URL.PLANS.POST_PLAN, {
                policy: editData.id,
                ...planData,
              });

              console.log("All data submitted successfully:", responses);
            } catch (error) {
              console.error("Error submitting data:", error);
              alert("Error submitting data.");
            }
          }
        });
      }

      await allaxios
        .patch(API_URL.POLICIES.PATCH_POLICIES(policyData.id), formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          console.log(response);
          toast.success("Policy updated");
          editToggle();
          fetchPolicies();
        })
        .catch((error) => {
          console.error(error);
          toast.error("Error occurred");
        });
    } else {
      await allaxios
        .post(API_URL.POLICIES.POST_POLICIES, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then(async (response) => {
          console.log(response);

          // plans api
          if (rows.length > 0) {
            for (const row of rows) {
              // 1️⃣ Post Plan Name → Get `plan_id`
              const planResponse = await allaxios.post(
                API_URL.PLANS.POST_PLAN,
                {
                  policy: response.data.id,
                  plan_name: row.plan_name,
                }
              );

              const planId = planResponse.data.id; // Extract `plan_id`
              console.log("Plan created with ID:", planId);

              // 2️⃣ Call Premium Amount API Twice
              await allaxios.post(API_URL.PLAN_COVERAGE.POST_PLAN_COVERAGE, {
                plan: planId,
                premium_amount: row.premium_amount,
                coverage_amount: row.coverage_amount,
              });
              console.log(`First premium amount posted for Plan ID: ${planId}`);

              await allaxios.post(API_URL.PLAN_COVERAGE.POST_PLAN_COVERAGE, {
                plan: planId,
                premium_amount: row.premium_amount1,
                coverage_amount: row.coverage_amount1,
              });
              console.log(
                `Second premium amount posted for Plan ID: ${planId}`
              );
              toggle();
            }
          } else {
            toggle();
            toast.success("Policy added");
          }
        })
        .catch((error) => {
          console.error(error);
          toast.error(
            error.response?.data?.policy_code
              ? error.response.data.policy_code[0]
              : "Some error occurred"
          );
        });
    }
  };

  useEffect(() => {
    if (editData) {
      console.log(editData);
      fetchPlans();
      setPolicydata({
        ...policyData,
        ...editData,
        tax: editData.tax_details?.id,
      });
      if (editData?.policy_name?.toLowerCase() === "hospicash") {
        setIsHospicash(true);
      }
    }

    // fetchPolicyType();
    fetchCategory();
    // fetchTax();
    fetchCompany();
  }, []);

  useEffect(() => {
    if (policyData.company && policyData.policy_category) {
      console.log("type");

      fetchPolicyType();
    }
  }, [policyData.company, policyData.policy_category]);

  console.log(policyData);

  //hospicash
  const [rows, setRows] = useState([
    {
      plan_name: "",
      premium_amount: "",
      premium_amount1: "",
      coverage_amount: "500",
      coverage_amount1: "1000",
    },
  ]);
  const [isHospicash, setIsHospicash] = useState(false);
  console.log(isHospicash);

  console.log(rows);

  const fetchPlans = async () => {
    try {
      const response = await allaxios.get(API_URL.PLANS.GET_PLAN);
      console.log(response.data);
      const reversed = response.data.reverse();
      const matchedPlans = reversed.filter(
        (plan) => plan.policy === editData.id
      );
      console.log(matchedPlans);

      setRows(matchedPlans);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (index, field, value) => {
    console.log(index, field, value);

    const newRows = [...rows];
    newRows[index][field] = value;

    console.log(newRows);

    setRows(newRows);
  };

  const addRow = () => {
    setRows([
      ...rows,
      {
        plan_name: "",
        premium_amount: "",
        premium_amount1: "",
        coverage_amount: "500",
        coverage_amount1: "1000",
      },
    ]);
  };

  const removeRow = async (index, rowId) => {
    try {
      await allaxios.delete(API_URL.PLANS.DELETE_PLAN(rowId));

      // If successful, remove from state
      const newRows = rows.filter((_, i) => i !== index);
      setRows(newRows);

      console.log("Row deleted successfully:", rowId);
    } catch (error) {
      console.error("Error deleting row:", error);
      alert("Failed to delete row.");
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await allaxios.post(API_URL.PLANS.POST_PLAN, rows);
      console.log("Data submitted successfully:", response.data);
      alert("Data submitted successfully!");
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Error submitting data.");
    }
  };

  return (
    <div>
      <ModalHeader toggle={toggle}>
        {toggle ? "New Policy" : "Edit Policy"}
      </ModalHeader>
      <ModalBody
        className="modal-body "
        style={{ height: "70vh", overflowY: "auto" }}
      >
        <div className="border-bottom border-dark mb-4">
          <p className="mb-1">1. Policy Details</p>
        </div>
        <Form onSubmit={handleSave}>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="policy_code">Policy code</Label>
                <Input
                  className="bg-light"
                  id="policy_code"
                  name="policy_code"
                  placeholder="Enter Policy code"
                  type="text"
                  value={policyData.policy_code}
                  onChange={handleInputChange}
                  invalid={errors.policy_code}
                />
                <FormFeedback>Policy code is required</FormFeedback>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="policy_name">Policy name</Label>
                <Input
                  className="bg-light"
                  id="policy_name"
                  name="policy_name"
                  placeholder="Enter Policy name"
                  type="text"
                  value={policyData.policy_name}
                  onChange={handleInputChange}
                  invalid={errors.policy_name}
                />
                <FormFeedback>Policy name is required</FormFeedback>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <FormGroup>
                <Label for="company">Company</Label>
                <Input
                  className="bg-light"
                  id="company"
                  type="select"
                  name="company"
                  value={policyData.company}
                  onChange={handleInputChange}
                  invalid={errors.company}
                >
                  <option value="">Select company</option>
                  {company.map((option, index) => (
                    <option key={index} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </Input>
                <FormFeedback>Company is required</FormFeedback>
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="policy_category">Policy category</Label>
                <Input
                  className="bg-light"
                  id="policy_category"
                  type="select"
                  name="policy_category"
                  value={policyData.policy_category}
                  onChange={handleInputChange}
                  invalid={errors.policy_category}
                >
                  <option value="">Select policy category</option>
                  {polcyCatogary.map((option, index) => (
                    <option key={index} value={option.id}>
                      {option.policy_name}
                    </option>
                  ))}
                </Input>
                <FormFeedback>Policy category is required</FormFeedback>
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="policy_type">Policy Master</Label>
                <Input
                  className="bg-light"
                  id="policy_type"
                  type="select"
                  name="policy_type"
                  value={policyData.policy_type}
                  onChange={handleInputChange}
                  invalid={errors.policy_type}
                >
                  <option value="">Select policy master</option>
                  {policyType.map((option, index) => (
                    <option key={index} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </Input>
                <FormFeedback>Policy master is required</FormFeedback>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            {/* <Col md={4}>
              <FormGroup>
                <Label for="Policy">Policy Description(Optional)</Label>
                <Input
                  className="bg-light"
                  id="Policy"
                  name="Policy"
                  required={false}
                  placeholder="Enter policy description"
                  type="text"
                  // value={policyData.coverage_amount}
                  // onChange={handleInputChange}
                  // invalid={errors.coverage_amount}
                />
              </FormGroup>
            </Col> */}
            {/* <Col md={4}>
              <FormGroup>
                <Label for="coverage_amount">Coverage amount</Label>
                <Input
                  className="bg-light"
                  id="coverage_amount"
                  name="coverage_amount"
                  placeholder="Enter coverage amount"
                  type="text"
                  value={policyData.coverage_amount}
                  onChange={handleInputChange}
                  invalid={errors.coverage_amount}
                />
                <FormFeedback>Coverage amount is required</FormFeedback>
              </FormGroup>
            </Col> */}
            <Col md={6}>
              <FormGroup>
                <Label for="coverage_type">Coverage Type</Label>
                <Input
                  className="bg-light"
                  id="coverage_type"
                  name="coverage_type"
                  placeholder="Enter coverage type"
                  type="text"
                  value={policyData.coverage_type}
                  onChange={handleInputChange}
                  invalid={errors.coverage_type}
                />
                <FormFeedback>Coverage Type is required</FormFeedback>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="Exclusions">Exclusions (Optional)</Label>
                <Input
                  className="bg-light"
                  id="Exclusions"
                  name="exclusions"
                  placeholder="Enter exclusions"
                  type="text"
                  value={policyData.exclusions}
                  onChange={handleInputChange}
                />
                <FormFeedback>This field is required</FormFeedback>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            

            {/* <Col md={6}>
              <FormGroup>
                <Label for="tax">Tax (%)</Label>
                <Input
                  className="bg-light"
                  type="select"
                  id="tax"
                  name="tax"
                  placeholder="Enter tax percentage"
                  value={policyData.tax}
                  onChange={handleInputChange}
                  onKeyUp={calculateTotal}
                  invalid={errors.tax}
                >
                  <option value="">Select Tax %</option>
                  {taxPercentage.map((option, index) => (
                    <option key={index} value={option.id}>
                      {option.tax}
                    </option>
                  ))}
                </Input>
                <FormFeedback>Enter tax percentage</FormFeedback>
              </FormGroup>
            </Col> */}
          </Row>
          <Row>
            {/* <Col md={6}>
              <FormGroup>
                <Label for="premium_amount">Premium Amount</Label>
                <Input
                  className="bg-light"
                  id="premium_amount"
                  name="premium_amount"
                  placeholder="Enter premium amount"
                  value={policyData.premium_amount}
                  onChange={handleInputChange}
                  onKeyUp={calculateTotal}
                  invalid={errors.premium_amount}
                />
                <FormFeedback>Enter premium amount</FormFeedback>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="tax_amount">Tax amount</Label>
                <Input
                  className="bg-light"
                  id="tax_amount"
                  name="tax_amount"
                  placeholder="Enter tax amount"
                  value={policyData.tax_amount}
                  onChange={handleInputChange}
                  invalid={errors.tax_amount}
                />
                <FormFeedback>This field is required</FormFeedback>
              </FormGroup>
            </Col> */}
          </Row>
          <Row>
            {/* <Col md={6}>
              <FormGroup>
                <Label for="tax_type">Tax type</Label>
                <Input
                  className="bg-light"
                  id="tax_type"
                  name="tax_type"
                  type="select"
                  placeholder="Enter tax type"
                  value={policyData.tax_type}
                  onChange={handleInputChange}
                  invalid={errors.tax_type}
                >
                  <option value="">Select tax type</option>
                  <option value="Inclusive">Inclusive</option>
                  <option value="Exclusive">Exclusive</option>
                </Input>
                <FormFeedback>Tax type is required</FormFeedback>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="total_premium_amount">Total premium amount</Label>
                <Input
                  className="bg-light"
                  id="total_premium_amount"
                  name="total_premium_amount"
                  placeholder="Total premium amount"
                  value={policyData.total_premium_amount}
                  onChange={handleInputChange}
                  invalid={errors.total_premium_amount}
                />
                <FormFeedback>This field is required</FormFeedback>
              </FormGroup>
            </Col> */}
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="grace_period">Grace Period(Optional)</Label>
                <Input
                  className="bg-light"
                  id="grace_period"
                  name="grace_period"
                  placeholder="Enter Grace Period"
                  value={policyData.grace_period}
                  onChange={handleInputChange}
                  // invalid={errors.total_premium_amount}
                />
                <FormFeedback>This field is required</FormFeedback>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="late_payment_penalty">
                  Late Payment Penalty(Optional)
                </Label>
                <Input
                  className="bg-light"
                  id="late_payment_penalty"
                  name="late_payment_penalty"
                  placeholder="Total Late Payment Penalty"
                  value={policyData.late_payment_penalty}
                  onChange={handleInputChange}
                  // invalid={errors.total_premium_amount}
                />
                <FormFeedback>This field is required</FormFeedback>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="payment_frequency">Payment frequency</Label>
                <Input
                  className="bg-light"
                  id="payment_frequency"
                  name="payment_frequency"
                  type="select"
                  placeholder="Enter payment frequency"
                  value={policyData.payment_frequency}
                  onChange={handleInputChange}
                  invalid={errors.payment_frequency}
                >
                  <option value="">Select payment frequency</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="Annually">Annually</option>
                </Input>
                <FormFeedback>Payment frequency is required</FormFeedback>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="policy_term_duration">
                  Policy term duration (in months)
                </Label>
                <Input
                  className="bg-light"
                  id="policy_term_duration"
                  type="text"
                  name="policy_term_duration"
                  placeholder="Eg: 12 months"
                  value={policyData.policy_term_duration}
                  onChange={handleInputChange}
                  invalid={errors.policy_term_duration}
                />
                <FormFeedback>This field is required</FormFeedback>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            {/* <Col md={4}>
              <FormGroup>
                <Label for="Renewal Options">Renewal Options(Optional)</Label>
                <Input
                  className="bg-light"
                  id="Renewal Options"
                  name="Renewal Options"
                  type="select"
                  placeholder="Enter Renewal Options"
                 
                >
                  <option value="">Select Renewal Options</option>
                  <option>Automatic</option>
                  <option>Manual</option>
                </Input>
                <FormFeedback>This field is required</FormFeedback>
              </FormGroup>
            </Col> */}

            <Col md={6}>
              <FormGroup>
                <Label for="cancellation_policy">
                  Cancellation Policy(Optional)
                </Label>
                <Input
                  className="bg-light"
                  id="cancellation_policy"
                  name="cancellation_policy"
                  placeholder="Enter Cancellation Policy"
                  value={policyData.cancellation_policy}
                  onChange={handleInputChange}
                  // invalid={errors.commission_agent}
                />
                <FormFeedback>This field is required</FormFeedback>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="Add-ons">Add-ons(Optional)</Label>
                <Input
                  className="bg-light"
                  id="Add-ons"
                  name="Add-ons"
                  type="select"
                  placeholder="Enter Add-ons"
                  // value={policyData.payment_frequency}
                  // onChange={handleInputChange}
                  // invalid={errors.payment_frequency}
                >
                  <option value="">Select Add-ons </option>
                  <option>Add-ons</option>
                  <option>Add-ons</option>
                  <option>Add-ons</option>
                </Input>
                <FormFeedback>This field is required</FormFeedback>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="no_claim_bonus">No-Claim Bonus(Optional)</Label>
                <Input
                  className="bg-light"
                  id="no_claim_bonus"
                  name="no_claim_bonus"
                  placeholder="Enter No-Claim Bonus"
                  value={policyData.no_claim_bonus}
                  onChange={handleInputChange}
                  // invalid={errors.commission_agent}
                  type="number"
                />
                <FormFeedback>This field is required</FormFeedback>
              </FormGroup>
            </Col>

            <Col md={6}>
              <FormGroup>
                <Label for="Riders">Riders(Optional)</Label>
                <Input
                  className="bg-light"
                  id="Riders"
                  name="Riders"
                  type="select"
                  placeholder="Enter Riders"
                  // value={policyData.payment_frequency}
                  // onChange={handleInputChange}
                  // invalid={errors.payment_frequency}
                >
                  <option value="">Select Riders</option>
                  <option>Riders</option>
                  <option>Riders</option>
                  <option>Riders</option>
                </Input>
                <FormFeedback>This field is required</FormFeedback>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="terms_conditions_document">
                  Terms & Conditions Document (Optional)
                </Label>
                <Input
                  className="bg-light"
                  id="terms_conditions_document"
                  name="terms_conditions_document"
                  placeholder="Enter Terms & Conditions Document"
                  onChange={handleInputChange} // ✅ Keep onChange, remove value
                  type="file"
                />
                <FormFeedback>This field is required</FormFeedback>
              </FormGroup>
            </Col>

            <Col md={6}>
              <FormGroup>
                <Label for="policy_brochure">Policy Brochure (Optional)</Label>
                <Input
                  className="bg-light"
                  id="policy_brochure"
                  name="policy_brochure"
                  placeholder="Enter Policy Brochure"
                  onChange={handleInputChange} // ✅ Keep onChange, remove value
                  type="file"
                />
                <FormFeedback>This field is required</FormFeedback>
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col md={4}>
              <FormGroup>
                <Label for="commission_agent">Commission agent</Label>
                <Input
                  className="bg-light"
                  id="commission_agent"
                  name="commission_agent"
                  placeholder="Enter commission agent"
                  value={policyData.commission_agent}
                  onChange={handleInputChange}
                  invalid={errors.commission_agent}
                />
                <FormFeedback>This field is required</FormFeedback>
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="commission_kannat">Commission kannat</Label>
                <Input
                  className="bg-light"
                  id="commission_kannat"
                  name="commission_kannat"
                  placeholder="Enter commission kannat"
                  value={policyData.commission_kannat}
                  onChange={handleInputChange}
                  invalid={errors.commission_kannat}
                />
                <FormFeedback>This field is required</FormFeedback>
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="commission_kannat">Status</Label>
                <Input
                  className="bg-light"
                  id="status"
                  name="status"
                  type="select"
                  value={policyData.status}
                  onChange={handleInputChange}
                  invalid={errors.status}
                >
                  <option value="">Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive" disabled>
                    Inactive
                  </option>
                  <option value="Expired" disabled>
                    Expired
                  </option>
                </Input>
                <FormFeedback>This field is required</FormFeedback>
              </FormGroup>
            </Col>
          </Row>
          <Row></Row>

          <Row>
            <Col md={12}>
              <FormGroup>
                <Label for="eligibility_criteria">
                  Eligibility Criteria(Optional)
                </Label>
                <Input
                  className="bg-light"
                  id="eligibility_criteria"
                  name="eligibility_criteria"
                  placeholder="Enter Eligibility Criteria"
                  type="textarea"
                  value={policyData.eligibility_criteria}
                  onChange={handleInputChange}
                  // invalid={errors.coverage_type}
                />
                <FormFeedback>This field is required</FormFeedback>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <FormGroup>
                <Label for="maturity_benefits">
                  Maturity Benefits(Optional)
                </Label>
                <Input
                  className="bg-light"
                  id="maturity_benefits"
                  name="maturity_benefits"
                  placeholder="Enter Maturity Benefits"
                  value={policyData.maturity_benefits}
                  onChange={handleInputChange}
                  // invalid={errors.commission_agent}
                  type="textarea"
                />
                <FormFeedback>This field is required</FormFeedback>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <FormGroup>
                <Label for="description">Description</Label>
                <Input
                  className="bg-light"
                  style={{ height: "100px" }}
                  type="textarea"
                  id="description"
                  name="description"
                  placeholder="Enter description"
                  onChange={handleInputChange}
                  value={policyData.description}
                  invalid={errors.description}
                />
              </FormGroup>
            </Col>
          </Row>
        </Form>

        {/* policy plans */}
        {isHospicash && (
          <div>
            <div className="border-bottom border-dark mb-3">
              <p className="mb-1">2. Policy Plans</p>
            </div>
            <Container className="mt-4">
              <div className="d-flex justify-content-end mb-3">
                <Button
                  className="border border-success bg-transparent text-success "
                  onClick={addRow}
                >
                  +
                </Button>
              </div>

              <Table bordered hover responsive>
                <thead className="table-secondary">
                  <tr>
                    <th>Plan</th>
                    <th>Per Day 500</th>
                    <th>Per Day 1000</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, index) => (
                    <tr key={index}>
                      <td>
                        <Form.Control
                          type="text"
                          placeholder="Enter name"
                          value={row.plan_name}
                          onChange={(e) =>
                            handleChange(index, "plan_name", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <Form.Control
                          type="text"
                          placeholder="Enter pr.amount"
                          value={row.premium_amount}
                          onChange={(e) =>
                            handleChange(
                              index,
                              "premium_amount",
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td>
                        <Form.Control
                          type="number"
                          placeholder="Enter pr.amount"
                          value={row.premium_amount1}
                          onChange={(e) =>
                            handleChange(
                              index,
                              "premium_amount1",
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td className="d-flex justify-content-center p-0">
                        <div
                          className="fs-2 text-danger"
                          onClick={() => removeRow(index, row.id)}
                        >
                          -
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Container>
          </div>
        )}
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSave}>
          {toggle ? "Create" : "Update"}
        </Button>{" "}
        <Button color="secondary" onClick={toggle ? toggle : editToggle}>
          Cancel
        </Button>
      </ModalFooter>
    </div>
  );
};

export default NewpolicyModal;
