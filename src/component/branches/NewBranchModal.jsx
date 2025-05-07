import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import { patch, post } from "../../api/config";
import API_URL from "../../api/api_urls";
import allaxios from "../../api/axios";
import { toast, ToastContainer } from "react-toastify";
import { ErrorMessage, Field } from "formik";

const NewBranchModal = ({ toggle, editToggle, data, fetchBranch }) => {
  const [branchFormData, setBranchFormData] = useState({
    id: "",
    branch_name: "",
    branch_code: "",
    // users: "",
    email: "",
    contact: "",
    address: "",
    country: "",
    state: "",
    city: "",
  });
  const [token, setToken] = useState();
  const [manager, setManager] = useState([]);
  const [errors, setErrors] = useState({});
  const [branch, setBranch] = useState([]);

  const fetchManager = async () => {
    console.log(branchFormData);

    try {
      const response = await allaxios.get(API_URL.BRANCH.GET_MANAGER);
      console.log(response);
      setManager(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBranchFormData({
      ...branchFormData,
      [name]: value,
    });
  };

  //validate
  const validateFields = () => {
    const newErrors = {};
    Object.entries(branchFormData).forEach(([key, value]) => {
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

    const formData = new FormData();
    Object.entries(branchFormData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (branchFormData.id) {
      allaxios
        .patch(API_URL.BRANCH.PATCH_BRANCH(branchFormData.id), formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          toast.success("Branch updated successfully");
          fetchBranch();
          editToggle();
        })
        .catch((error) => {
          toast.error("Failed to update branch.");
          console.error(error);
        });
    } else {
      allaxios
        .post(API_URL.BRANCH.POST_BRANCH, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          toast.success("Branch added successfully");
          toggle();
        })
        .catch((error) => {
          toast.error(
            error.response.data.branch_code
              ? error.response.data.branch_code[0]
              : error.response.data.email?error.response.data.email[0]:"Failed to add branch"
          );
          console.error(error);
        });
    }
  };

  useEffect(() => {
    if (data) {
      console.log(data.users.name);

      setBranchFormData({
        ...branchFormData,
        ...data,
        // users: data.users.name,
      });
    }
    setToken(sessionStorage.getItem("authToken"));
    fetchManager();
  }, []);

  console.log(branchFormData.users);

  return (
    <div>
      <ModalHeader toggle={toggle ? toggle : editToggle}>
        {toggle ? `New Branch` : "Edit Branch"}
      </ModalHeader>
      <ModalBody style={{ height: "75vh", overflowY: "auto" }}>
        <Form onSubmit={handleSave}>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="branchName">Branch name</Label>
                <Input
                  id="branchName"
                  name="branch_name"
                  placeholder="Enter branch name"
                  type="text"
                  value={branchFormData.branch_name}
                  onChange={handleInputChange}
                  invalid={errors.branch_name}
                />
                <FormFeedback>This field is required</FormFeedback>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="branchcode">Branch code</Label>
                <Input
                  id="branchcode"
                  name="branch_code"
                  placeholder="Enter branch code"
                  type="text"
                  value={branchFormData.branch_code}
                  onChange={handleInputChange}
                  invalid={errors.branch_code}
                />
                <FormFeedback>Branch code is required</FormFeedback>
              </FormGroup>
            </Col>
          </Row>
          {/* <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="users">Branch manager</Label>
                <Input
                  className="bg-light"
                  id="users"
                  type="select"
                  name="users"
                  value={branchFormData.users}
                  onChange={handleInputChange}
                  invalid={errors.users}
                >
                  <option value="">Select branch manager</option>
                  {manager.map((option, index) => (
                    <option key={index} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </Input>
                <FormFeedback>Branch manager is required</FormFeedback>
              </FormGroup>
            </Col>
          </Row> */}
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="exampleCity">Contact number</Label>
                <Input
                  id="exampleCity"
                  name="contact"
                  placeholder="Enter phone number"
                  value={branchFormData.contact}
                  onChange={handleInputChange}
                  invalid={errors.contact}
                />
                <FormFeedback>Contact number is required</FormFeedback>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="email">Email address</Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="Enter email address"
                  value={branchFormData.email}
                  onChange={handleInputChange}
                  invalid={errors.email}
                />
                <FormFeedback>Email address is required</FormFeedback>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            {/* <Col className="d-flex flex-wrap"> */}
            <Col md={4}>
              <FormGroup>
                <Label for="country">Country</Label>
                <Input
                  id="country"
                  name="country"
                  placeholder="Enter country"
                  value={branchFormData.country}
                  onChange={handleInputChange}
                  invalid={errors.branch_code}
                />
                <FormFeedback>Country is required</FormFeedback>
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label>State</Label>
                <Input
                  id="exampleState"
                  name="state"
                  placeholder="Enter state"
                  value={branchFormData.state}
                  onChange={handleInputChange}
                  invalid={errors.state}
                />
                <FormFeedback>State is required</FormFeedback>
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label>City</Label>
                <Input
                  id="exampleState"
                  name="city"
                  placeholder="Enter city"
                  value={branchFormData.city}
                  onChange={handleInputChange}
                  invalid={errors.city}
                />
                <FormFeedback>City is required</FormFeedback>
              </FormGroup>
            </Col>
            <Row>
              <FormGroup>
                <Label>Status</Label>
                <Input
                type="select"
                id="status"
                name="status"
                >
                  <option value="">Select status</option>
                  <option value="">Active</option>
                  <option value="">Inactive</option>
                </Input>
              </FormGroup>
            </Row>
            <FormGroup>
              <Label for="address">Address</Label>
              <Input
                style={{ height: "150px" }}
                type="textarea"
                id="address"
                name="address"
                placeholder="Enter address"
                value={branchFormData.address}
                onChange={handleInputChange}
                invalid={errors.address}
              />
              <FormFeedback>Address is required</FormFeedback>
            </FormGroup>
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

export default NewBranchModal;
