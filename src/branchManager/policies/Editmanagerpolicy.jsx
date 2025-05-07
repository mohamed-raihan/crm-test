import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const Editpoliciesmodal = ({ toggle }) => {
  const [editData, setEditData] = useState({
    company: "",
    policyName: "",
    emiAmount: "",
    loanTenure: "",
    tax: "",
    policyBenefits: "",
    terms: "",
  });

  // Handle input change in the modal form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Data:", editData); // Replace with your API call or logic
    toggle(); // Close modal after submission
  };

  return (
    <div>
      <ModalHeader toggle={toggle}>Edit Policy</ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="company" className="form-label">Company</label>
              <input
                type="text"
                className="form-control"
                id="company"
                name="company"
                placeholder="Enter company name"
                value={editData.company}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="policyName" className="form-label">Policy Name</label>
              <input
                type="text"
                className="form-control"
                id="policyName"
                name="policyName"
                placeholder="Enter policy name"
                value={editData.policyName}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="emiAmount" className="form-label">EMI Amount</label>
              <input
                type="number"
                className="form-control"
                id="emiAmount"
                name="emiAmount"
                placeholder="Enter EMI amount"
                value={editData.emiAmount}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="loanTenure" className="form-label">Loan Tenure</label>
              <input
                type="text"
                className="form-control"
                id="loanTenure"
                name="loanTenure"
                placeholder="Enter loan tenure"
                value={editData.loanTenure}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="tax" className="form-label">Tax (%)</label>
              <input
                type="number"
                className="form-control"
                id="tax"
                name="tax"
                placeholder="Enter tax percentage"
                value={editData.tax}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="policyBenefits" className="form-label">Policy Benefits</label>
              <textarea
                className="form-control"
                id="policyBenefits"
                name="policyBenefits"
                rows="3"
                placeholder="Enter policy benefits"
                value={editData.policyBenefits}
                onChange={handleInputChange}
              ></textarea>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 mb-3">
              <label htmlFor="terms" className="form-label">Terms and Conditions</label>
              <textarea
                className="form-control"
                id="terms"
                name="terms"
                rows="4"
                placeholder="Enter terms and conditions"
                value={editData.terms}
                onChange={handleInputChange}
              ></textarea>
            </div>
          </div>
        </form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" type="submit" onClick={handleSubmit}>
          Update
        </Button>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </div>
  );
};

export default Editpoliciesmodal;
