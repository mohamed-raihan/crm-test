import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, FormGroup, Label } from "reactstrap";
import allaxios from "../../api/axios";
import API_URL from "../../api/api_urls";
import { toast } from "react-toastify";
import './policyassign.css'

const PolicyAssignmentModal = ({ isOpen, toggle, customer }) => {
  const [policyFormData, setPolicyFormData] = useState({
    policy: "",
    start_date: "",
    customer: customer ? customer.id : "",
  });
  const [userpolicies, setUserPolicies] = useState([]);
  const [selectedPolicy, setSelectedPolicy] = useState(null); // New state for selected policy

  const handleChange = (e) => {
    setPolicyFormData({ ...policyFormData, [e.target.name]: e.target.value });
  };

  const fetchPolicies = async () => {
    const response = await allaxios.get(API_URL.POLICIES.GET_POLICIES, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
      },
    });
    setUserPolicies(response.data);
  };

  console.log(selectedPolicy);
  

  useEffect(() => {
    fetchPolicies();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await allaxios.post(API_URL.POLICY.POST_POLICY, policyFormData, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      });

      toast.success("Policy assigned successfully!");
      toggle(); // Close modal
    } catch (error) {
      console.error("Error assigning policy:", error);
      toast.error("Failed to assign policy. Please try again.");
    }
  };
  

  const handlePolicyChange = () => {
    const selectedPolicyId = policyFormData.policy;
    console.log(selectedPolicyId);
    console.log(userpolicies);
    
    const policy = userpolicies.find((policy) => policy.id == selectedPolicyId);
    setSelectedPolicy(policy); // Set the selected policy details
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} centered>
      <ModalHeader toggle={toggle}>Assign Policy</ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label for="policy_id">Policy</Label>
          <Input
            id="policy"
            name="policy"
            type="select"
            value={policyFormData.policy}
            onChange={(e) => {
              handleChange(e);
              handlePolicyChange(e); // Update selected policy when a policy is selected
            }}
          >
            <option value="">Select Policy</option>
            {userpolicies.map((policy) => (
              <option key={policy.id} value={policy.id}>
                {policy.policy_name}
              </option>
            ))}
          </Input>
        </FormGroup>

        <FormGroup>
          <Label for="start_date">Start Date</Label>
          <Input type="date" name="start_date" id="start_date" value={policyFormData.start_date} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="customer">Customer</Label>
          <Input type="text" name="customer" id="customer" value={customer ? customer.name : ""} disabled />
        </FormGroup>

        {/* Policy Details Section (Responsive) */}
        {selectedPolicy && (
          <div className="policy-details">
            <h5>Policy Details</h5>
            <div className="policy-details-row">
              <div className="policy-detail-box">
                <strong>Policy Name:</strong> {selectedPolicy.policy_name}
              </div>
              <div className="policy-detail-box">
                <strong>Policy Type:</strong> {selectedPolicy.policy_type}
              </div>
            </div>
            <div className="policy-details-row">
              <div className="policy-detail-box">
                <strong>Policy Category:</strong> {selectedPolicy.policy_category}
              </div>
              <div className="policy-detail-box">
                <strong>Company:</strong> {selectedPolicy.company}
              </div>
            </div>
            <div className="policy-details-row">
              <div className="policy-detail-box">
                <strong>Description:</strong> {selectedPolicy.description}
              </div>
              <div className="policy-detail-box">
                <strong>Coverage Amount:</strong> {selectedPolicy.coverage_amount}
              </div>
            </div>
            <div className="policy-details-row">
              <div className="policy-detail-box">
                <strong>Premium Amount:</strong> {selectedPolicy.premium_amount}
              </div>
              <div className="policy-detail-box">
                <strong>Payment Frequency:</strong> {selectedPolicy.payment_frequency}
              </div>
            </div>
            <div className="policy-details-row">
              <div className="policy-detail-box">
                <strong>Tax Type:</strong> {selectedPolicy.tax_type}
              </div>
              <div className="policy-detail-box">
                <strong>Total Premium Amount:</strong> {selectedPolicy.total_premium_amount}
              </div>
            </div>
          </div>
        )}
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSubmit}>
          Save
        </Button>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default PolicyAssignmentModal;
