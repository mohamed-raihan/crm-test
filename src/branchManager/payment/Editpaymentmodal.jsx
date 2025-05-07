import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  FormFeedback,
} from "reactstrap";
import { toast } from "react-toastify";
import API_URL from "../../api/api_urls";
import allaxios from "../../api/axios";

const EditPaymentModal = ({ toggle, paymentData, onPaymentUpdated }) => {
  const [formData, setFormData] = useState({
    policy_id: paymentData?.policy_id || "",
    customer: paymentData?.customer || "",
    transaction_date: paymentData?.transaction_date || "",
    amount_paid: paymentData?.amount_paid || "",
    payment_method: paymentData?.payment_method || "",
    payment_status: paymentData?.payment_status || "",
    due_amount: paymentData?.due_amount || "",
    next_due_date: paymentData?.next_due_date || "",
    notes: paymentData?.notes || "",
    transaction_id: paymentData?.transaction_id || "",

    // Additional fields from the image
    EMI_amount: paymentData?.EMI_amount || "",
    GCC_sum_insured: paymentData?.GCC_sum_insured || "",
    GHI_sum_insured: paymentData?.GHI_sum_insured || "",
    GPA_sum_insured: paymentData?.GPA_sum_insured || "",
    SI_date: paymentData?.SI_date || "",
    SI_flag: paymentData?.SI_flag || false,
    good_health_declaration: paymentData?.good_health_declaration || "",
    loan_tenure: paymentData?.loan_tenure || "",
  });
  const [policyOptions, setPolicyOptions] = useState([]);
  const [customer, setcustomer] = useState([]);
  const [errors, setErrors] = useState({}); // Holds field-specific error messages
  const [totalPremiumAmount, setTotalPremiumAmount] = useState(0); // New state for total premium amount

  const paymentMethods = [
    "bank_transfer", // Make sure the API expects lowercase values
    "credit_card",
    "debit_card",
    "upi",
    "other",
  ];

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }

    if (name === "amount_paid") {
      // Recalculate due amount whenever amount_paid changes
      recalculateDueAmount(value);
    }
  };

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

  const fetchCustomer = async () => {
    try {
      const response = await allaxios.get(API_URL.CUSTOMER.GET_CUSTOMER, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      });
      setcustomer(response.data);
    } catch (error) {
      console.error("Error fetching policies:", error);
      toast.error("Failed to fetch policies.");
    }
  };

  const recalculateDueAmount = (newAmountPaid) => {
    // Recalculate the due amount when the user updates the 'amount_paid'
    const updatedAmountPaid = parseFloat(newAmountPaid) || 0;
    const updatedDueAmount =
      totalPremiumAmount -
      (updatedAmountPaid + parseFloat(paymentData?.amount_paid || 0));
    setFormData((prevData) => ({
      ...prevData,
      due_amount: updatedDueAmount.toFixed(2), // Limit to 2 decimal places
    }));
  };

  console.log(policyOptions);
  console.log(customer);

  useEffect(() => {
    fetchPolicies();
    fetchCustomer();
  }, []);
  // Handle form submission
  const validateFields = () => {
    const newErrors = {};

    if (!formData.policy_id) {
      newErrors.policy_id = "Policy is required.";
    }
    if (!formData.customer) {
      newErrors.customer = "Customer is required.";
    }
    if (!formData.date) {
      newErrors.date = "Date is required.";
    }
    if (
      !formData.amount_paid ||
      isNaN(formData.amount_paid) ||
      formData.amount_paid <= 0
    ) {
      newErrors.amount_paid = "Please enter a valid amount.";
    }
    if (!formData.payment_method) {
      newErrors.payment_method = "Payment method is required.";
    }
    if (!formData.payment_status) {
      newErrors.payment_status = "Payment status is required.";
    }
    if (
      !formData.due_amount ||
      isNaN(formData.due_amount) ||
      formData.due_amount < 0
    ) {
      newErrors.due_amount = "Please enter a valid due amount.";
    }
    if (!formData.next_due_date) {
      newErrors.next_due_date = "Next due date is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (!validateFields()) {
      return; // Stop submission if validation fails
    }

    try {
      const response = await allaxios.patch(
        API_URL.PAYMENT.PATCH_PAYMENT(paymentData.id),
        formData,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
          },
        }
      );
      console.log("Payment updated:", response.data);
      toast.success("Payment updated successfully");
      toggle();
      if (onPaymentUpdated) onPaymentUpdated(); // Refresh parent component data
    } catch (error) {
      console.error("Error updating payment:", error);
      toast.error("Failed to update payment");
    }
  };

  console.log("paymenteditdata", paymentData);

  useEffect(() => {
    if (paymentData) {
      setFormData({
        policy_id: paymentData?.policy_id || "",
        customer: paymentData?.customer || "",
        transaction_date: paymentData?.transaction_date || "",
        amount_paid: paymentData?.amount_paid || "",
        payment_method: paymentData?.payment_method || "",
        payment_status: paymentData?.payment_status || "",
        due_amount: paymentData?.due_amount || "",
        next_due_date: paymentData?.next_due_date || "",
        notes: paymentData?.notes || "",
        transaction_id: paymentData?.transaction_id || "",

        // Additional fields from the image
        EMI_amount: paymentData?.EMI_amount || "",
        GCC_sum_insured: paymentData?.GCC_sum_insured || "",
        GHI_sum_insured: paymentData?.GHI_sum_insured || "",
        GPA_sum_insured: paymentData?.GPA_sum_insured || "",
        SI_date: paymentData?.SI_date || "",
        SI_flag: paymentData?.SI_flag || false,
        good_health_declaration: paymentData?.good_health_declaration || "",
        loan_tenure: paymentData?.loan_tenure || "",
      });
      const policy = policyOptions.find(
        (policy) => policy.id === paymentData.policy_id
      );
      if (policy) {
        setTotalPremiumAmount(policy.total_premium_amount || 0); // Assuming total_premium_amount is part of the policy object
      }
    }
  }, [paymentData]);

  return (
    <div className="p-3">
      <h5>Edit Payment</h5>
      <Form onSubmit={handleFormSubmit}>
        <Row>
          <Col xs={12}>
            <FormGroup>
              <Label for="policy_id">Policy</Label>
              <Input
                type="select"
                id="policy_id"
                name="policy_id"
                value={formData.policy_id}
                onChange={handleInputChange}
                invalid={!!errors.policy_id}
              >
                <option value="">Select Policy</option>
                {policyOptions.map((policy) => (
                  <option key={policy.id} value={policy.id}>
                    {policy.policy_name}
                  </option>
                ))}
              </Input>
              <FormFeedback>{errors.policy_id}</FormFeedback>
            </FormGroup>
          </Col>
          <Col xs={12}>
            <FormGroup>
              <Label for="customer">Customer</Label>
              <Input
                type="select"
                id="customer"
                name="customer"
                value={formData.customer}
                onChange={handleInputChange}
                invalid={!!errors.customer}
              >
                <option value="">Select Customer</option>
                {customer.map((cust) => (
                  <option key={cust.id} value={cust.id}>
                    {cust.name}
                  </option>
                ))}
              </Input>
              <FormFeedback>{errors.customer}</FormFeedback>
            </FormGroup>
          </Col>
          <Col xs={6}>
            <FormGroup>
              <Label for="date">Date</Label>
              <Input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                invalid={!!errors.date}
              />
              <FormFeedback>{errors.date}</FormFeedback>
            </FormGroup>
          </Col>
          <Col xs={6}>
            <FormGroup>
              <Label for="amount_paid">Amount Paid</Label>
              <Input
                type="number"
                id="amount_paid"
                name="amount_paid"
                value={formData.amount_paid}
                onChange={handleInputChange}
                invalid={!!errors.amount_paid}
                min="0"
              />
              <FormFeedback>{errors.amount_paid}</FormFeedback>
            </FormGroup>
          </Col>
          <Col xs={6}>
            <FormGroup>
              <Label for="payment_method">Payment Method</Label>
              <Input
                type="select"
                id="payment_method"
                name="payment_method"
                value={formData.payment_method}
                onChange={handleInputChange}
                invalid={!!errors.payment_method}
              >
                <option value="">Select Payment Method</option>
                {paymentMethods.map((method, index) => (
                  <option key={index} value={method}>
                    {method}
                  </option>
                ))}
              </Input>
              <FormFeedback>{errors.payment_method}</FormFeedback>
            </FormGroup>
          </Col>
          <Col xs={6}>
            <FormGroup>
              <Label for="payment_status">Payment Status</Label>
              <Input
                type="select"
                id="payment_status"
                name="payment_status"
                value={formData.payment_status}
                onChange={handleInputChange}
                invalid={!!errors.payment_status}
              >
                <option value="">Select Payment Status</option>
                <option value="successful">Successful</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </Input>
              <FormFeedback>{errors.payment_status}</FormFeedback>
            </FormGroup>
          </Col>
          <Col xs={6}>
            <FormGroup>
              <Label for="due_amount">Due Amount</Label>
              <Input
                type="number"
                id="due_amount"
                name="due_amount"
                value={formData.due_amount}
                onChange={handleInputChange}
                invalid={!!errors.due_amount}
                min="0"
              />
              <FormFeedback>{errors.due_amount}</FormFeedback>
            </FormGroup>
          </Col>
          <Col xs={6}>
            <FormGroup>
              <Label for="next_due_date">Next Due Date</Label>
              <Input
                type="date"
                id="next_due_date"
                name="next_due_date"
                value={formData.next_due_date}
                onChange={handleInputChange}
                invalid={!!errors.next_due_date}
              />
              <FormFeedback>{errors.next_due_date}</FormFeedback>
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
                value={formData.GCC_sum_insured}
                onChange={handleInputChange}
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
                value={formData.GHI_sum_insured}
                onChange={handleInputChange}
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
                value={formData.GPA_sum_insured}
                onChange={handleInputChange}
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
                value={formData.SI_date}
                onChange={handleInputChange}
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
                value={formData.SI_flag}
                onChange={handleInputChange}
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
                value={formData.loan_tenure}
                onChange={handleInputChange}
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
            Update Payment
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default EditPaymentModal;
