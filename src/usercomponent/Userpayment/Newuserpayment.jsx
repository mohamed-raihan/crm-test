import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input, Row, Col } from "reactstrap";
import { toast } from "react-toastify";
import API_URL from "../../api/api_urls";
import allaxios from "../../api/axios";
import { FormText } from "react-bootstrap";

const NewPaymentModal = ({ toggle }) => {
  const [policyOptions, setPolicyOptions] = useState([]);
  const [customerOptions, setCustomerOptions] = useState([]);
  const [paymentData, setPaymentData] = useState([
    {
      policy_id: "",
      customer: "",
      transaction_date: "",
      amount_paid: "",
      payment_method: "",
      payment_status: "",
      due_amount: "",
      next_due_date: "",
      notes: "",
      transaction_id: "",

      // Additional fields from the image
      EMI_amount: "",
      GCC_sum_insured: "",
      GHI_sum_insured: "",
      GPA_sum_insured: "",
      SI_date: "",
      SI_flag: false,
      good_health_declaration: "",
      loan_tenure: "",
    },
  ]);
  const [errors, setErrors] = useState({}); // Holds field-specific error messages
  const [policyDetails, setPolicyDetails] = useState(null); // Store fetched policy details
  const [exceededAmount, setExceededAmount] = useState(false);

  const paymentMethods = [
    "bank_transfer", // Make sure the API expects lowercase values
    "credit_card",
    "debit_card",
    "upi",
    "other",
  ];

  // Fetch policy options
  const fetchPolicies = async () => {
    try {
      const response = await allaxios.get(API_URL.POLICIES.GET_POLICIES, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      });
      setPolicyOptions(response.data);
    } catch (error) {
      console.error("Error fetching policies:", error);
      toast.error("Failed to fetch policies.");
    }
  };

  const fetchPolicyDetails = async (policyId) => {
    console.log("Policy ID:", policyId);

    if (!policyId) return;

    try {
      const response = await allaxios.get(`${API_URL.POLICIES.GET_POLICIES}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      });

      // Assuming response.data is an array of policies
      const matchedPolicy = response.data.find(
        (policy) => policy.id == policyId
      );

      if (matchedPolicy) {
        setPolicyDetails(matchedPolicy);
      } else {
        console.warn("No matching policy found.");
        toast.error("Policy not found.");
      }
    } catch (error) {
      console.error("Error fetching policy details:", error);
      toast.error("Failed to fetch policy details.");
    }
  };

  console.log(policyDetails);

  // Fetch customer options
  //   const fetchCustomers = async () => {
  //     try {
  //       const response = await allaxios.get(API_URL.CUSTOMER.GET_CUSTOMER, {
  //         headers: {
  //           Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
  //         },
  //       });
  //       setCustomerOptions(response.data);
  //     } catch (error) {
  //       console.error('Error fetching customers:', error);
  //       toast.error('Failed to fetch customers.');
  //     }
  //   };

  const fetchCustomers = async () => {
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
      setCustomerOptions(filteredCustomers);
    } catch (error) {
      console.error("Error occurred while fetching or processing data:", error);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentData({ ...paymentData, [name]: value });
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }

    if (name === "policy_id") {
      fetchPolicyDetails(value);
    }

    if (name === "amount_paid") {
      handleAmountChange(value);
    }
    if (name === "transaction_date" && policyDetails?.policy_term_duration) {
      const nextDue = calculateNextDueDate(
        value,
        policyDetails.policy_term_duration
      );
      setPaymentData((prev) => ({
        ...prev,
        next_due_date: nextDue,
      }));
    }
  };

  const calculateNextDueDate = (startDate, termDuration) => {
    if (!startDate || !termDuration) return "";

    const [termValue, termUnit] = termDuration.split(" ");
    const value = parseInt(termValue, 10); // Extract numeric value

    let nextDue = new Date(startDate);

    if (termUnit.toLowerCase().includes("month")) {
      nextDue.setMonth(nextDue.getMonth() + value);
    } else if (
      termUnit.toLowerCase().includes("yr") ||
      termUnit.toLowerCase().includes("year")
    ) {
      nextDue.setFullYear(nextDue.getFullYear() + value);
    }

    return nextDue.toISOString().split("T")[0]; // Format as YYYY-MM-DD
  };

  const validateFields = () => {
    const newErrors = {};

    if (!paymentData.policy_id) {
      newErrors.policy_id = "Policy is required.";
    }
    if (!paymentData.customer) {
      newErrors.customer = "Customer is required.";
    }
    if (!paymentData.transaction_date) {
      newErrors.date = "Date is required.";
    }
    if (
      !paymentData.amount_paid ||
      isNaN(paymentData.amount_paid) ||
      paymentData.amount_paid <= 0
    ) {
      newErrors.amount_paid = "Please enter a valid amount.";
    }
    if (!paymentData.payment_method) {
      newErrors.payment_method = "Payment method is required.";
    }
    if (!paymentData.payment_status) {
      newErrors.payment_status = "Payment status is required.";
    }
    if (
      !paymentData.due_amount ||
      isNaN(paymentData.due_amount) ||
      paymentData.due_amount < 0
    ) {
      newErrors.due_amount = "Please enter a valid due amount.";
    }
    if (!paymentData.next_due_date) {
      newErrors.next_due_date = "Next due date is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAmountChange = (amountPaid) => {
    const totalPremium = policyDetails?.total_premium_amount || 0;
    const amount = parseFloat(amountPaid) || 0;

    if (amount > totalPremium) {
      setExceededAmount(true);
      setPaymentData((prev) => ({
        ...prev,
        due_amount: "",
        next_due_date: "",
      }));
    } else {
      setExceededAmount(false);
      const dueAmount = totalPremium - amount;
      setPaymentData((prev) => ({
        ...prev,
        due_amount: dueAmount.toFixed(2),
        next_due_date: calculateNextDueDate(
          paymentData.transaction_date,
          policyDetails?.policy_term_duration
        ),
      }));
    }
  };
  // const calculateNextDueDate = (startDate, termDuration) => {
  //   if (!startDate || !termDuration) return '';

  //   const [termValue, termUnit] = termDuration.split(' ');
  //   const value = parseInt(termValue, 10);

  //   let nextDue = new Date(startDate);
  //   if (termUnit.toLowerCase().includes('month')) {
  //     nextDue.setMonth(nextDue.getMonth() + value);
  //   } else if (termUnit.toLowerCase().includes('year')) {
  //     nextDue.setFullYear(nextDue.getFullYear() + value);
  //   }

  //   return nextDue.toISOString().split('T')[0];
  // };

  // Handle form submission
  const handleAddPayment = async (e) => {
    e.preventDefault();

    if (!validateFields()) {
      return; // Stop submission if validation fails
    }

    try {
      const response = await allaxios.post(
        API_URL.PAYMENT.POST_PAYMENT,
        paymentData,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
          },
        }
      );
      console.log("Payment added:", response.data);
      toast.success("Payment added successfully!");
      toggle();
    } catch (error) {
      console.error("Error adding payment:", error);
      toast.error("Failed to add payment. Please try again.");
    }
  };

  useEffect(() => {
    fetchPolicies();
    fetchCustomers();
  }, []);

  return (
    <div className="p-3">
      <h5>Add New Payment</h5>
      <Form
        style={{ height: "80vh", overflowY: "auto", overflowX: "hidden" }}
        onSubmit={handleAddPayment}
      >
        <Row>
          <Col md={12}>
            <FormGroup>
              <Label for="customer">Customer</Label>
              <Input
                type="select"
                id="customer"
                name="customer"
                value={paymentData.customer}
                onChange={handleChange}
              >
                <option value="">Select Customer</option>
                {customerOptions.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </Input>
              {errors.customer && (
                <small className="text-danger">{errors.customer}</small>
              )}
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="policy_id">Policy</Label>
              <Input
                type="select"
                id="policy_id"
                name="policy_id"
                value={paymentData.policy_id}
                onChange={handleChange}
              >
                <option value="">Select Policy</option>
                {policyOptions.map((policy) => (
                  <option key={policy.id} value={policy.id}>
                    {policy.policy_name}
                  </option>
                ))}
              </Input>
              {errors.policy_id && (
                <small className="text-danger">{errors.policy_id}</small>
              )}
            </FormGroup>
          </Col>

          <Col md={6}>
            <FormGroup>
              <Label for="amount_paid">Total</Label>
              <Input
                type="number"
                id="amount_paid"
                name="amount_paid"
                value={policyDetails?.total_premium_amount}
                readOnly // Makes the field non-editable
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="transaction_date">Date</Label>
              <Input
                type="date"
                id="transaction_date"
                name="transaction_date"
                value={paymentData.date}
                onChange={handleChange}
              />
              {errors.date && (
                <small className="text-danger">{errors.date}</small>
              )}
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="amount_paid">Amount Paid</Label>
              <Input
                type="number"
                id="amount_paid"
                name="amount_paid"
                value={paymentData.amount_paid}
                onChange={handleChange}
                placeholder="Enter amount paid"
              />
              {errors.amount_paid && (
                <small className="text-danger">{errors.amount_paid}</small>
              )}
              {exceededAmount && (
                <small className="text-danger">Amount has exceeded</small>
              )}
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="payment_method">Payment Method</Label>
              <Input
                type="select"
                id="payment_method"
                name="payment_method"
                value={paymentData.payment_method}
                onChange={handleChange}
              >
                <option value="">Select Payment Method</option>
                <option value="bank_transfer">Bank transfer</option>
                <option value="credit_card">Credit card</option>
                <option value="debit_card">Debit card</option>
                <option value="upi">UPI</option>
                <option value="other">Other</option>
              </Input>
              {errors.payment_method && (
                <small className="text-danger">{errors.payment_method}</small>
              )}
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="payment_status">Payment Status</Label>
              <Input
                type="select"
                id="payment_status"
                name="payment_status"
                value={paymentData.payment_status}
                onChange={handleChange}
              >
                <option value="">Select Payment Status</option>
                <option value="successful">Successful</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </Input>
              {errors.payment_status && (
                <small className="text-danger">{errors.payment_status}</small>
              )}
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="due_amount">Due Amount</Label>
              <Input
                type="number"
                id="due_amount"
                name="due_amount"
                value={paymentData.due_amount}
                onChange={handleChange}
                placeholder="Enter due amount"
              />
              {errors.due_amount && (
                <small className="text-danger">{errors.due_amount}</small>
              )}
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="next_due_date">Next Due Date</Label>
              <Input
                type="date"
                id="next_due_date"
                name="next_due_date"
                value={paymentData.next_due_date}
                onChange={handleChange}
              />
              {errors.next_due_date && (
                <small className="text-danger">{errors.next_due_date}</small>
              )}
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <div className="form-group">
              <Label>GCC sum insured(Optional)</Label>
              <Input
                type="text"
                name="GCC_sum_insured"
                placeholder="Enter GCC sum insured"
                value={paymentData.GCC_sum_insured}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </Col>
          <Col md={6}>
            <div className="form-group">
              <Label>GHI sum insured(Optional)</Label>
              <Input
                type="text"
                name="GHI_sum_insured"
                placeholder="Enter GHI sum insured"
                value={paymentData.GHI_sum_insured}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <div className="form-group">
              <Label>GPA sum insured(Optional)</Label>
              <Input
                type="text"
                name="GPA_sum_insured"
                placeholder="Enter GPA sum insured"
                value={paymentData.GPA_sum_insured}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </Col>
          <Col md={6}>
            <div className="form-group">
              <Label>SI date(Optional)</Label>
              <Input
                type="text"
                name="SI_date"
                placeholder="Enter SI date"
                value={paymentData.SI_date}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <div className="form-group">
              <Label>SI flag(Optional)</Label>
              <Input
                type="text"
                name="SI_flag"
                value={paymentData.SI_flag}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </Col>
          <Col md={6}>
            <div className="form-group">
              <label>Loan tenure(Optional)</label>
              <input
                type="text"
                name="loan_tenure"
                placeholder="Enter loan tenure"
                value={paymentData.loan_tenure}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </Col>
        </Row>

        <div className="d-flex justify-content-end">
          <Button color="secondary" onClick={toggle} className="me-2">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Add Payment
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default NewPaymentModal;
