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
  FormFeedback
} from "reactstrap";
import allaxios from "../../api/axios";
import API_URL from "../../api/api_urls";
import { toast } from "react-toastify";

const ManagerAgentForm = ({ toggle,editToggle }) => {
  const [userbranch, setuserbranch] = useState();
  const [userrole, setuserole] = useState([]);  
  
  const [formData, setFormData] = useState({
    full_name: "",
    contact_number: "",
    email: "",
    gender: "",
    branch: "",
    join_date: "",
    commission_percentage:"",
    address: "",
    role: ""
  });

  console.log(formData);
  

  const [errors, setErrors] = useState({
    full_name: "",
    contact_number: "",
    email: "",
    gender: "",
    // branch: "",
    join_date: "",
    commission_percentage:"",
    address: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "join_date") {
      const formattedDate = value.split("T")[0]; // Format to 'YYYY-MM-DD'
      setFormData((prev) => ({ ...prev, [name]: formattedDate }));
    }

    // Clear any errors when user types
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // const fetchUserBranches = async () => {
  //   const response = await allaxios.get(API_URL.BRANCH.GET_BRANCH, {
  //     headers: {
  //       Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
  //     },
  //   });
  //   console.log("userbranch", response.data);
  //   setuserbranch(response.data);
  // };
  
  const fetchUserRole = async () => {
    const response = await allaxios.get(API_URL.USERROLE.GET_ROLE, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
      },
    });
    console.log("userrole", response.data);
    setuserole(response.data);
  };

  const handleSubmit = async () => {
    // Basic Validation
    let formErrors = {};

    if (!formData.full_name) formErrors.full_name = "Full name is required";
    if (!formData.contact_number) formErrors.contact_number = "Contact number is required";
    if (!formData.email) formErrors.email = "Email is required";
    if (!formData.gender) formErrors.gender = "Gender is required";
    // if (!formData.branch) formErrors.branch = "Branch is required";
    if (!formData.join_date) formErrors.join_date = "Join date is required";
  
    if (!formData.commission_percentage) formErrors.commission_percentage = "Agent commission is required";

    if (!formData.address) formErrors.address = "Address is required";

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return; // Stop the form submission if there are errors
    }

    console.log(formData);
    
    try {
      const response = await allaxios.post(API_URL.AGENTS.POST_AGENT, formData, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      });
      console.log("Agent created successfully:", response.data);
      toast.success("Agent created successful!", { autoClose: 2000 });

      toggle();
    } catch (error) {
      console.error("Error creating Agent:", error);
      toast.error("Error creating Agent", { autoClose: 2000 });
    }
  };

  useEffect(() => {
    const userDataString = sessionStorage.getItem("userData");
    const userData = JSON.parse(userDataString)
    // setuserbranch(userData.user.branch)
    console.log(userData);
    
    if(userData){
      setFormData({
        ...formData,
        branch: userData.user.branch
      })
    }
    // fetchUserBranches();
    fetchUserRole();
  }, []);

  return (
    <div>
      <ModalHeader toggle={toggle}>New Agent</ModalHeader>
      <ModalBody>
        <Form>
          <Row>
            <Col md={12}>
              <FormGroup>
                <Label for="exampleEmail">Full name</Label>
                <Input
                  id="full_name"
                  name="full_name"
                  placeholder="Enter Full name"
                  type="text"
                  value={formData.full_name}
                  onChange={handleInputChange}
                  invalid={!!errors.full_name}
                />
                {errors.full_name && <FormFeedback style={{ color: 'red' }}>{errors.full_name}</FormFeedback>}
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="exampleCity">Contact number</Label>
                <Input
                  type="number"
                  id="contact_number"
                  name="contact_number"
                  placeholder="Enter phone number"
                  value={formData.contact_number}
                  onChange={handleInputChange}
                  invalid={!!errors.contact_number}
                />
                {errors.contact_number && <FormFeedback style={{ color: 'red' }}>{errors.contact_number}</FormFeedback>}
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="exampleState">Email address</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleInputChange}
                  invalid={!!errors.email}
                />
                {errors.email && <FormFeedback style={{ color: 'red' }}>{errors.email}</FormFeedback>}
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="joinType">Select Gender</Label>
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
                {errors.gender && <FormFeedback style={{ color: 'red' }}>{errors.gender}</FormFeedback>}
              </FormGroup>
            </Col>
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
                  {userbranch.map((branch) => (
                    <option key={branch.id} value={branch.id}>
                      {branch.branch_name}
                    </option>
                  ))}
                </Input>
                {errors.branch && <FormFeedback style={{ color: 'red' }}>{errors.branch}</FormFeedback>}
              </FormGroup>
            </Col> */}
          </Row>
          <Row>
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
                {errors.join_date && <FormFeedback style={{ color: 'red' }}>{errors.join_date}</FormFeedback>}
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
                {errors.commission_percentage && <FormFeedback style={{ color: 'red' }}>{errors.commission_percentage}</FormFeedback>}
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Label for="exampleAddress">Address</Label>
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
            {errors.address && <FormFeedback style={{ color: 'red' }}>{errors.address}</FormFeedback>}
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSubmit}>
          Create
        </Button>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </div>
  );
};

export default ManagerAgentForm;
