import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button, Col, Form, FormFeedback, FormGroup, Input, Label, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
import allaxios from "../../../api/axios";
import API_URL from "../../../api/api_urls";

const AgentCommissionForm = ({toggle,editToggle,editData,fetchCommission}) => {

    const [commissionData,setCommissionData] = useState({
        id:"",
        agent:"",
        policy_type:"",
        fixed_commission_amount:"",
        commission_percentage:"",
    })
    const [errors, setErrors] = useState({});
    const [agent,setAgent] = useState([])
    const [policy,setPolicy] = useState([])

    const fetchAgent = async()=>{
        try{
            const response = await allaxios.get(API_URL.AGENTS.GET_AGENT)
            console.log(response);
            setAgent(response.data)
            
        }catch(error){
            console.error(error);            
        }
    }

    const fetchPolicy = async()=>{
        try{
            const response = await allaxios.get(API_URL.POLICY_TYPE.GET_POLICY_TYPE)
            console.log(response);
            setPolicy(response.data)
            
        }catch(error){
            console.error(error);            
        }
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCommissionData({
          ...commissionData,
          [name]: value,
        });
      };

      const validateFields = () => {
        const newErrors = {};
        Object.entries(commissionData).forEach(([key, value]) => {
          if (key !== "id") {
            // Skip validation for the `id` field
            if (typeof value === "string") {
              if (!value.trim()) {
                newErrors[key] = true; // String is empty or whitespace
              }
            } else if (value === null || value === undefined) {
              newErrors[key] = true; // Value is null or undefined
            }
          }
        });
        console.log("Validation Errors:", newErrors); // Debugging
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };

      const handleSave = (event) => {
        event.preventDefault();
        if (!validateFields()) {
          toast.error("Please fill out all required fields.");
          return;
        }
    
        // const formData = new FormData();
        // Object.entries(branchFormData).forEach(([key, value]) => {
        //   formData.append(key, value);
        // });
    
        if (commissionData.id) {
          allaxios
            .patch(API_URL.AGENT_COMMISSION.PATCH_COMMISSION(commissionData.id), commissionData)
            .then((response) => {
                console.log(response);
              toast.success("Branch updated successfully");
              fetchCommission();
              editToggle();
            })
            .catch((error) => {
              toast.error("Failed to update branch.");
              console.error(error);
            });
        } else {
          allaxios
            .post(API_URL.AGENT_COMMISSION.POST_COMMISSION, commissionData)
            .then((response) => {
                console.log(response);
              toast.success("Branch added successfully");
              toggle();
            })
            .catch((error) => {
              toast.error("Error adding commission");
              console.error(error);
            });
        }
      };

    useEffect(()=>{
        fetchAgent()
        fetchPolicy()
        if(editData){
            setCommissionData({
                ...commissionData,
                ...editData
            })
        }
    },[])

  return (
    <div>
      <ModalHeader toggle={toggle ? toggle : editToggle}>
        {toggle ? `Add commission` : "Edit commission"}
      </ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSave}>
          <Row>
            <Col md={6}>
            <FormGroup>
                <Label for="agent">Agent name</Label>
                <Input
                  className="bg-light"
                  id="agent"
                  type="select"
                  name="agent"
                  value={commissionData.agent}
                  onChange={handleInputChange}
                  invalid={errors.agent}
                >
                  <option value="">Select agent</option>
                  {agent.map((option, index) => (
                    <option key={index} value={option.id}>
                      {option.full_name}
                    </option>
                  ))}
                </Input>
                <FormFeedback>Agent is required</FormFeedback>
              </FormGroup>
            </Col>
            <Col md={6}>
            <FormGroup>
                <Label for="policy_type">Policy</Label>
                <Input
                  className="bg-light"
                  id="policy_type"
                  type="select"
                  name="policy_type"
                  value={commissionData.policy_type}
                  onChange={handleInputChange}
                  invalid={errors.policy_type}
                >
                  <option value="">Select policy</option>
                  {policy.map((option, index) => (
                    <option key={index} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </Input>
                <FormFeedback>Policy is required</FormFeedback>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="fixed_commission_amount">Commission Amount</Label>
                <Input
                  id="fixed_commission_amount"
                  name="fixed_commission_amount"
                  placeholder="Enter commission amount"
                  type="text"
                  value={commissionData.fixed_commission_amount}
                  onChange={handleInputChange}
                  invalid={errors.fixed_commission_amount}
                />
                <FormFeedback>Commission amount is required</FormFeedback>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="commission_percentage">Commission %</Label>
                <Input
                  id="commission_percentage"
                  name="commission_percentage"
                  placeholder="Enter commission %"
                  type="text"
                  value={commissionData.commission_percentage}
                  onChange={handleInputChange}
                  invalid={errors.commission_percentage}
                />
                <FormFeedback>Commission % is required</FormFeedback>
              </FormGroup>
            </Col>
          </Row>
        </Form>
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

export default AgentCommissionForm;
