import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import allaxios from "../../api/axios";
import API_URL from "../../api/api_urls";

const PaymentModal = ({ show, onHide, paymentData, setPaymentData, handleSave }) => {
  const [userpolicies, setUserPolicies] = useState([]);
        const [usercustomer, setusercustomer] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

   const fetchPolicies = async () => {
      const response = await allaxios.get(API_URL.POLICIES.GET_POLICIES, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      });
      setUserPolicies(response.data);
    };
  
    const fetchcustomer = async () => {
      const response = await allaxios.get(API_URL.CUSTOMER.GET_CUSTOMER, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      });
      setusercustomer(response.data);
    };
  
  
    useEffect(()=>{
      fetchPolicies();
      fetchcustomer();
    },[])


    const policyName = userpolicies.find((policy) => policy.id === paymentData.policy_id)?.policy_name || "";

  // Find the customer name by matching the customer ID
  const customerName = usercustomer.find((customer) => customer.id === paymentData.customer)?.name || "";



  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Payment Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Policy ID</Form.Label>
            <Form.Control
              type="text"
              name="policy_id"
              value={policyName}  // Show the policy name instead of ID
              onChange={handleChange}
              disabled  // Disable the field
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Customer</Form.Label>
            <Form.Control
              type="text"
              name="customer"
              value={customerName}  // Show the customer name instead of ID
              onChange={handleChange}
              disabled  // Disable the field
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Payment Date</Form.Label>
            <Form.Control type="date" name="date" value={paymentData.date} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Amount Paid</Form.Label>
            <Form.Control type="number" name="amount_paid" value={paymentData.amount_paid} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Payment Method</Form.Label>
            <Form.Select name="payment_method" value={paymentData.payment_method} onChange={handleChange}>
              <option value="">Select Payment Method</option>
              <option value="cash">Cash</option>
              <option value="credit_card">Credit Card</option>
              <option value="bank_transfer">Bank Transfer</option>
              <option value="upi">UPI</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Payment Status</Form.Label>
            <Form.Select name="payment_status" value={paymentData.payment_status} onChange={handleChange}>
              <option value="">Select Status</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Due Amount</Form.Label>
            <Form.Control type="number" name="due_amount" value={paymentData.due_amount} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Next Due Date</Form.Label>
            <Form.Control type="date" name="next_due_date" value={paymentData.next_due_date} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Transaction ID</Form.Label>
            <Form.Control type="text" name="transaction_id" value={paymentData.transaction_id} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Notes</Form.Label>
            <Form.Control as="textarea" rows={3} name="notes" value={paymentData.notes} onChange={handleChange} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Payment
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PaymentModal;
