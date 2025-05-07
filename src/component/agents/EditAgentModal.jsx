import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import API_URL from "../../api/api_urls";
import allaxios from "../../api/axios";
import { toast } from "react-toastify";

const EditAgentModal = ({ toggle, onAgentUpdated, agentData }) => {
  const [formData, setFormData] = useState({
    full_name: agentData?.full_name || "",
    email: agentData?.email || "",
    contact_number: agentData?.contact_number || "",
    // role: agentData?.role || '',
    branch: agentData?.branch || "",
    join_date: agentData?.join_date || "",
    address: agentData?.address || "",
    commission_percentage: agentData?.commission_percentage || "",
    gender: agentData?.gender || "",
  });
  const [UserRole, setUserRole] = useState([]);
  const [Userbranch, setUserbranch] = useState([]);
  const [errors, setErrors] = useState({});

  // Handle input field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const fetchUserRole = async () => {
    try {
      const response = await allaxios.get(API_URL.USERROLE.GET_ROLE, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      });
      setUserRole(response.data);
    } catch (error) {
      console.error("Error fetching user roles:", error);
    }
  };

  const fetchUserBranches = async () => {
    try {
      const response = await allaxios.get(API_URL.BRANCH.GET_BRANCH, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      });
      setUserbranch(response.data);
    } catch (error) {
      console.error("Error fetching user branches:", error);
    }
  };

  const handleFormSubmit = async () => {
    // Validate form data

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    try {
      const response = await allaxios.patch(
        API_URL.AGENTS.PATCH_AGENT(agentData?.id),
        formData,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
          },
        }
      );
      toast.success("Agent updated successfully");
      toggle();
      if (onAgentUpdated) onAgentUpdated();
    } catch (error) {
      console.error("Error updating Agent:", error);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.full_name) errors.full_name = "Full name is required";
    if (!formData.email) errors.email = "Email is required";
    if (!formData.contact_number)
      errors.contact_number = "Contact number is required";
    // if (!formData.role) errors.role = 'Role is required';
    // if (!formData.branch) errors.branch = 'Branch is required';
    if (!formData.join_date) errors.join_date = "Join date is required";

    if (!formData.commission_percentage)
      errors.commission_percentage = "Commission % is required";

    if (!formData.address) errors.address = "Address is required";
    if (!formData.gender) errors.gender = "Gender is required";

    return errors;
  };

  useEffect(() => {
    if (agentData) {
      console.log(agentData);
      
      setFormData({
        full_name: agentData.full_name || "",
        email: agentData.email || "",
        contact_number: agentData.contact_number || "",
        // role: agentData.role || '',
        branch: agentData.branch || "",
        join_date: agentData.join_date || "",
        address: agentData.address || "",
        gender: agentData.gender || "",
      });
    }
  }, [agentData]);

  useEffect(() => {
    fetchUserRole();
    fetchUserBranches();
  }, []);

  return (
    <div>
      <ModalHeader toggle={toggle}>Edit Agent</ModalHeader>
      <ModalBody>
        <Form>
          <Row>
            <Col md={12}>
              <FormGroup>
                <Label for="full_name">Full name</Label>
                <Input
                  id="full_name"
                  name="full_name"
                  placeholder="Enter name"
                  type="text"
                  value={formData.full_name}
                  onChange={handleInputChange}
                  invalid={!!errors.full_name}
                />
                {errors.full_name && (
                  <div className="text-danger">{errors.full_name}</div>
                )}
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="contact_number">Contact number</Label>
                <Input
                  type="number"
                  id="contact_number"
                  name="contact_number"
                  placeholder="Enter phone number"
                  value={formData.contact_number}
                  onChange={handleInputChange}
                  invalid={!!errors.contact_number}
                />
                {errors.contact_number && (
                  <div className="text-danger">{errors.contact_number}</div>
                )}
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="email">Email address</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleInputChange}
                  invalid={!!errors.email}
                />
                {errors.email && (
                  <div className="text-danger">{errors.email}</div>
                )}
              </FormGroup>
            </Col>
          </Row>
          <Row>
          <Col md={6}>
              <FormGroup>
                <Label for="joinType">Select Branch</Label>
                <Input
                  id="branch"
                  name="branch"
                  type="select"
                  value={formData.branch}
                  onChange={handleInputChange}
                  invalid={!!errors.branch}
                >
                  <option value="">Select branch</option>
                  {Userbranch.map((option, index) => (
                    <option key={index} value={option.id}>
                      {option.branch_name}
                    </option>
                  ))}
                </Input>
                {errors.gender && (
                  <FormFeedback style={{ color: "red" }}>
                    {errors.gender}
                  </FormFeedback>
                )}
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="commission_percentage">Agent commission %</Label>
                <Input
                  type="number"
                  id="commission_percentage"
                  name="commission_percentage"
                  placeholder="Enter agent commission"
                  value={formData.commission_percentage}
                  onChange={handleInputChange}
                  invalid={!!errors.commission_percentage}
                />
                {errors.commission_percentage && (
                  <div className="text-danger">
                    {errors.commission_percentage}
                  </div>
                )}
              </FormGroup>
            </Col>
          </Row>
          <Row>
            {/* <Col md={6}>
              <FormGroup>
                <Label for="branch">Branch</Label>
                <Input
                  id="branch"
                  name="branch"
                  type="select"
                  value={formData.branch}
                  onChange={handleInputChange}
                  invalid={!!errors.branch}
                >
                  <option value="">Select Branch</option>
                  {Userbranch.map((branch) => (
                    <option key={branch.id} value={branch.id}>
                      {branch.branch_name}
                    </option>
                  ))}
                </Input>
                {errors.branch && <div className="text-danger">{errors.branch}</div>}
              </FormGroup>
            </Col> */}

            {/* <Col md={6}>
              <FormGroup>
                <Label for="role">Role</Label>
                <Input
                  id="role"
                  name="role"
                  type="select"
                  value={formData.role}
                  onChange={handleInputChange}
                  invalid={!!errors.role}
                >
                  <option value="">Select Role</option>
                  {UserRole.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </Input>
                {errors.role && <div className="text-danger">{errors.role}</div>}
              </FormGroup>
            </Col> */}
          </Row>

          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="gender">Select Gender</Label>
                <Input
                  id="gender"
                  name="gender"
                  type="select"
                  value={formData.gender}
                  onChange={handleInputChange}
                  invalid={!!errors.gender}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Input>
                {errors.gender && (
                  <div className="text-danger">{errors.gender}</div>
                )}
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="join_date">Join date</Label>
                <Input
                  type="date"
                  id="join_date"
                  name="join_date"
                  value={formData.join_date}
                  onChange={handleInputChange}
                  invalid={!!errors.join_date}
                />
                {errors.join_date && (
                  <div className="text-danger">{errors.join_date}</div>
                )}
              </FormGroup>
            </Col>
          </Row>

          <FormGroup>
            <Label for="address">Address</Label>
            <Input
              style={{ height: "100px" }}
              type="textarea"
              id="address"
              name="address"
              placeholder="Enter address"
              value={formData.address}
              onChange={handleInputChange}
              invalid={!!errors.address}
            />
            {errors.address && (
              <div className="text-danger">{errors.address}</div>
            )}
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleFormSubmit}>
          Update
        </Button>{" "}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </div>
  );
};

export default EditAgentModal;
