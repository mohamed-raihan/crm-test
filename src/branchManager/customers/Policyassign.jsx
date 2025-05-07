import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, FormGroup, Label } from "reactstrap";
import allaxios from "../../api/axios";
import API_URL from "../../api/api_urls";
import { toast } from "react-toastify";
import "./policy.css";

const PolicyAssignmentModal = ({ isOpen, toggle, customer }) => {
  const [policyFormData, setPolicyFormData] = useState({
    policy: "",
    start_date: "",
    agent:"",
    customer: customer ? customer.id : "",
  });
  const [userpolicies, setUserPolicies] = useState([]);
  const [usercompany, setusercompany] = useState([]);
  const [usercategory, setusercategory] = useState([]);
  const [usertype, setusertype] = useState([]);
  const [agent, setagent] = useState([]);
  const [policy, setPolicy] = useState([]);

  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);

  useEffect(() => {
    fetchPolicies();
    fetchcompany();
    fetchcategory();
    fetchtype();
    fetchagent();
    fetchPolicy();
  }, []);

  console.log(policyFormData);
  

  const fetchPolicies = async () => {
    const response = await allaxios.get(API_URL.POLICIES.GET_POLICIES, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
      },
    });
    setUserPolicies(response.data);
  };


  const fetchPolicy = async () => {
    const response = await allaxios.get(API_URL.POLICY.GET_POLICY, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
      },
    });
    setPolicy(response.data);
  };


  console.log(policy);
  console.log(userpolicies);


  
  const fetchcompany = async () => {
    const response = await allaxios.get(API_URL.COMPANY.GET_COMPANY, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
      },
    });
    setusercompany(response.data);
  };

  const fetchcategory = async () => {
    const response = await allaxios.get(API_URL.POLICY_CATEGORY.GET_CATEGORY, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
      },
    });
    setusercategory(response.data);
  };

  const fetchtype = async () => {
    const response = await allaxios.get(API_URL.COMPANY.GET_COMPANY, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
      },
    });
    setusertype(response.data);
  };

  const fetchagent = async () => {
    const response = await allaxios.get(API_URL.AGENTS.GET_AGENT, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
      },
    });
    setagent(response.data);
  };

  console.log(usercategory);
  

  // const handleChange = (e) => {
  //   setPolicyFormData({ ...policyFormData, [e.target.name]: e.target.value });
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPolicyFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  
  const handleSubmit = async () => {
    try {
      const response = await allaxios.post(API_URL.POLICY.POST_POLICY, policyFormData, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      });
      console.log("Policy :", policyFormData); // Log the response data

      console.log("Policy assigned successfully:", response.data); // Log the response data
  
      toast.success("Policy assigned successfully!");
      toggle();
    } catch (error) {
      console.error("Error assigning policy:", error);
      toast.error("Failed to assign policy. Please try again.");
    }
  };
  
console.log(agent);

  const openPolicyModal = (policyId) => {
    const policy = userpolicies.find((p) => p.id == policyId);
    if (policy) {
      setSelectedPolicy(policy);
      setIsPolicyModalOpen(true);
    }
  };

  const getCompanyName = (companyId) => {
    const company = usercompany.find((c) => c.id === companyId);
    return company ? company.name : "Unknown Company";
  };
  
  const getCategoryName = (categoryId) => {
    const category = usercategory.find((c) => c.id === categoryId);
    return category ? category.policy_name : "Unknown Category";
  };
  
  const getTypeName = (typeId) => {
    const type = usertype.find((t) => t.id === typeId);
   
    
    return type ? type.name : "Unknown Type";
  };

  return (
    <>
      <Modal isOpen={isOpen} toggle={toggle} centered>
        <ModalHeader toggle={toggle}>Assign Policy</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="customer">Customer</Label>
            <Input type="text" name="customer" id="customer" value={customer ? customer.name : ""} disabled />
          </FormGroup>

          <FormGroup>
            <Label for="policy">Policy</Label>
            <div className="d-flex align-items-center">
              <Input
                id="policy"
                name="policy"
                type="select"
                value={policyFormData.policy}
                onChange={handleChange}
              >
                <option value="">Select Policy</option>
                {userpolicies.map((policy) => (
                  <option key={policy.id} value={policy.id}>
                    {policy.policy_name}
                  </option>
                ))}
              </Input>
              <Button
                // color="info"
                size="sm"
                className="ml-2 m-1"
                disabled={!policyFormData.policy}
                onClick={() => openPolicyModal(policyFormData.policy)}
                style={{background:"black"}}
              >
                <i className="fa-solid fa-eye"></i> {/* Font Awesome Eye Icon */}
              </Button>
            </div>
          </FormGroup>

                     <FormGroup>
             <Label for="agent">Agent</Label>
             <Input
               id="agent"
               name="agent"
               type="select"
               value={policyFormData.agent}
               onChange={handleChange} 
             >
               <option value="">Select Agent</option>
               {agent.map((agent) => (
                 <option key={agent.id} value={agent.id}>
                   {agent.full_name}
                 </option>
               ))}
             </Input>
           </FormGroup>


          <FormGroup>
            <Label for="start_date">Start Date</Label>
            <Input
              type="date"
              name="start_date"
              id="start_date"
              value={policyFormData.start_date}
              onChange={handleChange}
            />
          </FormGroup>
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

      {/* Policy Details Modal */}
      {selectedPolicy && (
        <Modal isOpen={isPolicyModalOpen} toggle={() => setIsPolicyModalOpen(false)} centered>
          <ModalHeader toggle={() => setIsPolicyModalOpen(false)}>Policy Details</ModalHeader>
          <ModalBody>
            <div className="policy-details">
              <p><strong>Policy Name:</strong> {selectedPolicy.policy_name}</p>
              <p><strong>Policy Type:</strong> {getTypeName(selectedPolicy.policy_type)}</p>
          <p><strong>Policy Category:</strong> {getCategoryName(selectedPolicy.policy_category)}</p>
          <p><strong>Company:</strong> {getCompanyName(selectedPolicy.company)}</p>
              <p><strong>Description:</strong> {selectedPolicy.description}</p>
              <p><strong>Coverage Amount:</strong> {selectedPolicy.coverage_amount}</p>
              <p><strong>Premium Amount:</strong> {selectedPolicy.premium_amount}</p>
              <p><strong>Payment Frequency:</strong> {selectedPolicy.payment_frequency}</p>
              <p><strong>Tax Type:</strong> {selectedPolicy.tax_type}</p>
              <p><strong>Total Premium Amount:</strong> {selectedPolicy.total_premium_amount}</p>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={() => setIsPolicyModalOpen(false)}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </>
  );
};

export default PolicyAssignmentModal;
