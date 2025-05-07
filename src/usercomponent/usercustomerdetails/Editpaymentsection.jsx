import React, { useEffect, useState } from "react";
import { Row, Col, Label, FormGroup, Input } from "reactstrap"; // Import Row and Col from reactstrap
import allaxios from "../../api/axios";
import API_URL from "../../api/api_urls";

const PaymentDetailsForm = ({ formData, setFormData   }) => {
      const [userpolicies, setUserPolicies] = useState([]);
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        
        // Directly assign the value for policy_id
        const updatedValue =
          name === "amount_paid" || name === "due_amount"
            ? parseFloat(value) || ""
            : value;
      
        setFormData((prev) => ({
          ...prev,
          [name]: updatedValue,
        }));
      };
      
        
      console.log(formData);
      
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

  console.log('userpolicy',userpolicies);
  

  return (
    <div>
      <h5>Edit  Payment Details</h5>
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
          {/* <Col md={6}>
            <div className="form-group">
              <label>Customer</label>
              <input
                type="text"
                name="customer"
                value={paymentData.customer}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </Col> */}
            <Col md={6}>
  <div className="form-group">
    <label>Amount Paid</label>
    <input
      type="number"
      name="amount_paid"
      value={formData.amount_paid}
      onChange={handleChange}
      className="form-control"
    />
  </div>
</Col>


        </Row>

        {/* Date and Amount Paid */}
        <Row>
          <Col md={6}>
            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </Col>
           <Col md={6}>
            <div className="form-group">
            <label>Transaction ID</label>
             <input
              type="text"
              name="transaction_id"
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
              <label>Payment Method</label>
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
                    <Label for="payment_status">Payment Status</Label>
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
                value={formData.due_amount}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </Col>
          <Col md={6}>
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
                rows="4" 
              ></textarea>
            </div>
          </Col>
        </Row>

      </form>
    </div>
  );
};

export default PaymentDetailsForm;
