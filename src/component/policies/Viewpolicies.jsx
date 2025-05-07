import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import API_URL from "../../api/api_urls";
import allaxios from "../../api/axios";
// import "../../css/policyModal.css"; // Add a separate CSS file for styling

const ViewPolicyModal = ({ isOpen, toggle, policyData }) => {
  const [company, setCompany] = useState([]);
  const [tax, settax] = useState([]);
  const [category, setcategory] = useState([]);
  const [type, settype] = useState([]);


  const getCompanyName = (id) => {
    const policycompany = company.find((comp) => comp.id === id);
    return policycompany ? policycompany.name : "Unknown Company";
  };

  const getPolicyCategoryName = (id) => {
    const policycategory = category.find((cat) => cat.id === id);
    return policycategory ? policycategory.policy_name : "Unknown Category";
  };

  const getPolicyTypeName = (id) => {
    const policytype = type.find((typ) => typ.id === id);
    return policytype ? policytype.name : "Unknown Type";
  };

  const fetchCompany = async () => {
    console.log("fetch");

    try {
      const response = await allaxios.get(API_URL.COMPANY.GET_COMPANY);
      console.log(response);

      setCompany(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Error fetching company");
    }
  };

  const fetchpolicytype = async () => {
    console.log("fetch");

    try {
      const response = await allaxios.get(API_URL.POLICY_TYPE.GET_POLICY_TYPE);
      console.log(response);

      settype(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Error fetching policy type");
    }
  };

  const fetchtax = async () => {
    console.log("fetch");

    try {
      const response = await allaxios.get(API_URL.TAX.GET_TAX);
      console.log(response);

      settax(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Error fetching policy tax");
    }
  };


  const fetchpolicycategory = async () => {
    console.log("fetch");

    try {
      const response = await allaxios.get(API_URL.POLICY_CATEGORY.GET_CATEGORY);
      console.log(response);

      setcategory(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Error fetching policy category");
    }
  };

  console.log(tax);
  console.log(company);
  console.log(category);
  
  

  useEffect(()=>{
    fetchCompany();
    // fetchtax();
    fetchpolicycategory();
    fetchpolicytype();
  },[])
  return (
    <Modal isOpen={isOpen} toggle={toggle} size="xl" centered className="policy-modal">
      <ModalHeader toggle={toggle} className="modal-header-custom">
        <h5>View Policy</h5>
      </ModalHeader>
      <ModalBody className="modal-body-custom">
        <div className="container">
          <div className="row">
            {[
              { label: "Policy Name", value: policyData?.policy_name },
              { label: "Policy Code", value: policyData?.policy_code },
              { label: "Policy Type", value: getPolicyTypeName(policyData?.policy_type) },
              { label: "Policy Type Details", value: policyData?.policy_type_details },
              { label: "Policy Category", value: getPolicyCategoryName(policyData?.policy_category) },
              { label: "Policy Category Details", value: policyData?.policy_category_details },
              { label: "Company", value: getCompanyName(policyData?.company) },
              { label: "Company Details", value: policyData?.company_details },
              { label: "Coverage Amount", value: policyData?.coverage_amount },
              { label: "Coverage Type", value: policyData?.coverage_type },
              { label: "Premium Amount", value: policyData?.premium_amount },
              { label: "Payment Frequency", value: policyData?.payment_frequency },
              { label: "Tax Type", value: policyData?.tax_type },
              { label: "Tax Amount", value: policyData?.tax_amount },
              { label: "Total Premium Amount", value: policyData?.total_premium_amount },
              { label: "Commission Agent", value: policyData?.commission_agent },
              { label: "Commission Kannat", value: policyData?.commission_kannat },
              { label: "Policy Term Duration", value: policyData?.policy_term_duration },
              { label: "Status", value: policyData?.status },
            ].map((item, index) => (
              <div key={index} className="col-md-4 mb-3">
                <div className="policy-field" style={{
                  backgroundColor: "#f8f9fa",
                  padding: "15px",
                  borderRadius: "8px",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  textAlign: "center"
                }}>
                  <h6 style={{ color: "#007bff" }}>{item.label}</h6>
                  <p>{item.value || "N/A"}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ModalBody>
      <ModalFooter className="modal-footer-custom">
        <Button color="secondary" onClick={toggle} className="close-btn">
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ViewPolicyModal;
