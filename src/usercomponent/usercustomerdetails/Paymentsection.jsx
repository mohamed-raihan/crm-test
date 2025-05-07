import React, { useEffect, useState } from "react";
import { Row, Col, Label, FormGroup, Input } from "reactstrap"; // Import Row and Col from reactstrap
import allaxios from "../../api/axios";
import API_URL from "../../api/api_urls";
import dayjs from "dayjs"; // Import dayjs for date manipulation

const PaymentDetailsForm = ({
  formData,
  setFormData,
  handleChange,
  selectedpolicy,
}) => {
  const [userpolicies, setUserPolicies] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  //   const handleChange = (e) => {
  //     const { name, value } = e.target;
  //     setFormData({
  //       ...formData,
  //       [name]: name === "amount_paid" || name === "due_amount" ? parseFloat(value) || "" : value,
  //     });
  //   };

  // const handleChange = (e) => {
  //     const { name, value } = e.target;

  //     // Ensure policies are sent as a list
  //     const updatedValue =
  //       name === "policy_ids" ? [value] : name === "amount_paid" || name === "due_amount" ? parseFloat(value) || "" : value;

  //     setFormData({
  //       ...formData,
  //       [name]: updatedValue,
  //     });
  //   };

  useEffect(() => {
    if (selectedpolicy) {
      setFormData((prevData) => ({
        ...prevData,
        policy_id: selectedpolicy, // Auto-fill policy_id when selectedpolicy changes
      }));
    }
  }, [selectedpolicy, setFormData]);

  console.log(selectedpolicy);

  console.log(formData.policy_id);

  const selectedPolicy = userpolicies.find(
    (policy) => policy.id == formData.policy_id
  );
  console.log(selectedPolicy);

  useEffect(() => {
    if (formData.policy_id && formData.amount_paid !== "") {
      // Find the selected policy's total_premium_amount
      const selectedPolicy = userpolicies.find(
        (policy) => policy.id == formData.policy_id
      );
      console.log(selectedPolicy);
      console.log(formData.policy_id);

      if (selectedPolicy) {
        const totalPremium = parseFloat(selectedPolicy.total_premium_amount);
        const amountPaid = parseFloat(formData.amount_paid) || 0;

        console.log(totalPremium);
        console.log(amountPaid);

        if (amountPaid > totalPremium) {
          setErrorMessage("The amount paid exceeds the total premium amount.");
          setFormData((prevData) => ({
            ...prevData,
            due_amount: 0, // Due amount should be zero if overpaid
          }));
        } else {
          setErrorMessage(""); // Clear any error message
          setFormData((prevData) => ({
            ...prevData,
            due_amount: 0,
          }));
        }
      }
    }
  }, [formData.policy_id, formData.amount_paid, userpolicies]);

  const calculateNextDueDate = () => {
    if (formData.policy_id && formData.date) {
      const selectedPolicy = userpolicies.find(
        (policy) => policy.id == formData.policy_id
      );

      if (selectedPolicy?.policy_term_duration) {
        const policyDuration = selectedPolicy.policy_term_duration;
        const match = policyDuration.match(/(\d+)\s*(months|years|days)/i);

        if (match) {
          const value = parseInt(match[1], 10);
          const unit = match[2].toLowerCase();

          let newDueDate = dayjs(formData.date);

          if (unit.includes("month")) {
            newDueDate = newDueDate.add(value, "month");
          } else if (unit.includes("year")) {
            newDueDate = newDueDate.add(value, "year");
          } else if (unit.includes("day")) {
            newDueDate = newDueDate.add(value, "day");
          }

          setFormData((prevData) => ({
            ...prevData,
            next_due_date: newDueDate.format("YYYY-MM-DD"),
          }));
        }
      }
    }
  };

  useEffect(() => {
    calculateNextDueDate();
  }, [formData.date, formData.policy_id, userpolicies]);

  const fetchPolicies = async () => {
    const response = await allaxios.get(API_URL.POLICIES.GET_POLICIES, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
      },
    });
    setUserPolicies(response.data);
  };

  useEffect(() => {
    fetchPolicies();
  }, []);

  console.log("userform data", formData);
  console.log(userpolicies);

  return (
    <div>
      <h5>Payment Details</h5>
      <form>
        {/* Policy ID and Customer */}
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

                {userpolicies.map((policy) => (
                  <option key={policy.id} value={policy.id}>
                    {policy.policy_name}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </Col>
          <Col md={6}>
            <div className="form-group">
              <label>
                Amount Paid <span className="text-danger">*</span>
              </label>
              <input
                type="number"
                name="amount_paid"
                placeholder="Enter paid amount"
                value={formData.amount_paid}
                onChange={handleChange}
                className="form-control"
              />
              {errorMessage && <p className="text-danger">{errorMessage}</p>}
            </div>
          </Col>
        </Row>

        {/* Date and Amount Paid */}
        <Row>
          <Col md={6}>
            <div className="form-group">
              <label>
                Date<span className="text-danger ms-1">*</span>
              </label>
              <input
                type="date"
                name="transaction_date"
                value={formData.transaction_date}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </Col>
          <Col md={6}>
            <div className="form-group">
              <label>Transaction ID(Optional)</label>
              <input
                type="text"
                name="transaction_id"
                placeholder="Enter transaction id"
                value={formData.transaction_id}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </Col>
        </Row>

        {/* Payment Method and Status */}
        <Row>
          <Col md={6}>
            <div className="form-group">
              <label>
                Payment Method<span className="text-danger ms-1">*</span>
              </label>
              <select
                name="payment_method"
                value={formData.payment_method}
                onChange={handleChange}
                className="form-control"
              >
                <option value="">Select Payment Method</option>
                <option value="bank_transfer">Bank transfer</option>
                <option value="credit_card">Credit card</option>
                <option value="debit_card">Debit card</option>
                <option value="upi">UPI</option>
                <option value="other">Other</option>
              </select>
            </div>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="payment_status">
                Payment Status<span className="text-danger ms-1">*</span>
              </Label>
              <Input
                type="select"
                id="payment_status"
                name="payment_status"
                value={formData.payment_status}
                onChange={handleChange}
              >
                <option value="">Select Payment Status</option>
                <option value="successful">Successful</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </Input>
            </FormGroup>
          </Col>
        </Row>

        {/* Due Amount and Next Due Date */}
        <Row>
          <Col md={6}>
            <div className="form-group">
              <label>Due Amount</label>
              <input
                type="number"
                name="due_amount"
                placeholder="Due amount"
                value={formData.due_amount}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </Col>
          {/* <Col md={6}>
                  <div className="form-group">
                    <label>Next Due Date</label>
                    <input
                      type="date"
                      name="next_due_date"
                      value={formData.next_due_date}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </Col> */}
          <Col md={6}>
            <div className="form-group">
              <label>EMI amount(Optional)</label>
              <input
                type="text"
                name="EMI_amount"
                placeholder="Enter EMI amount"
                value={formData.EMI_amount}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <div className="form-group">
              <label>GCC sum insured(Optional)</label>
              <input
                type="text"
                name="GCC_sum_insured"
                placeholder="Enter GCC sum insured"
                value={formData.GCC_sum_insured}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </Col>
          <Col md={6}>
            <div className="form-group">
              <label>GHI sum insured(Optional)</label>
              <input
                type="text"
                name="GHI_sum_insured"
                placeholder="Enter GHI sum insured"
                value={formData.GHI_sum_insured}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <div className="form-group">
              <label>GPA sum insured(Optional)</label>
              <input
                type="text"
                name="GPA_sum_insured"
                placeholder="Enter GPA sum insured"
                value={formData.GPA_sum_insured}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </Col>
          <Col md={6}>
            <div className="form-group">
              <label>SI date(Optional)</label>
              <input
                type="text"
                name="SI_date"
                placeholder="Enter SI date"
                value={formData.SI_date}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <div className="form-group">
              <label>SI flag(Optional)</label>
              <Input
                type="select"
                name="SI_flag"
                value={formData.SI_flag}
                onChange={handleChange}
                className="form-control"
              >
                <option value="">Select SI flag</option>
                <option value="true">True</option>
                <option value="false">False</option>
              </Input>
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
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <div className="form-group">
              <label>Note(Optional)</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="form-control"
                rows="4" // Adjust the number of rows as needed
              ></textarea>
            </div>
          </Col>
        </Row>
      </form>
    </div>
  );
};

export default PaymentDetailsForm;
