import { ErrorMessage, Field, Formik } from "formik";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  FormGroup,
  Input,
  Label,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import allaxios from "../../api/axios";
import API_URL from "../../api/api_urls";
import { toast } from "react-toastify";

const NewManagerUser = ({ toggle }) => {
  const [userRoles, setUserRoles] = useState([]);
  const [userBranches, setUserBranches] = useState([]);
  const [matchedEmails, setMatchedEmails] = useState([]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Full Name is required"),
    contact: Yup.string()
      .matches(/^[0-9]{10}$/, "Contact must be a 10-digit number")
      .required("Contact is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required")
      .test(
        "is-unique",
        "This email is already in use",
        (value) => !matchedEmails.includes(value)
      ),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    role: Yup.string().required("Role is required"),
    job_type: Yup.string().required("Join Type is required"),
    target: Yup.string().required("Target is required"),
    status: Yup.string().required("Status is required"),
    address: Yup.string().required("Address is required"),
  });

  // Fetch user roles
  const fetchUserRole = async () => {
    try {
      const response = await allaxios.get(API_URL.USERROLE.GET_ROLE, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      });
      console.log(response);
      
      const userRole = response.data.find((user)=>{
        return user.name === "User"
      })
      console.log(userRole);
      
      setUserRoles(userRole);
    } catch (error) {
      console.error("Error fetching user roles:", error);
    }
  };

  // Fetch user branches
  const fetchUserBranches = async () => {
    try {
      const response = await allaxios.get(API_URL.BRANCH.GET_BRANCH, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      });
      setUserBranches(response.data);
    } catch (error) {
      console.error("Error fetching branches:", error);
    }
  };

  // Fetch existing users and their emails
  const fetchUsers = async () => {
    try {
      const response = await allaxios.get(API_URL.USERS.GET_USERS, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      });
      const emails = response.data.users.map((user) => user.email);
      setMatchedEmails(emails);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleSubmit = async (values, { resetForm }) => {
    console.log(values);
    
    try {
      const userDataString = sessionStorage.getItem("userData");
      const userData = JSON.parse(userDataString);
      console.log(userData);

      const updatedValue = {...values,branch:userData.user.branch}
      console.log(updatedValue);
      
      
      const response = await allaxios.post(API_URL.USERS.POST_USERS, updatedValue, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      });
      console.log("User created successfully:", response.data);
      toast.success("User created successfully!", { autoClose: 2000 });
      setMatchedEmails((prev) => [...prev, values.email]); // Update matched emails
      toggle();
      resetForm();
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error("Error creating user. Check the fields.", {
        autoClose: 2000,
      });
    }
  };

  useEffect(() => {
    fetchUserRole();
    fetchUserBranches();
    fetchUsers();
  }, []);

  return (
    <div>
      <ModalHeader toggle={toggle}>New User</ModalHeader>
      <ModalBody style={{ overflowY: "auto", height: "86vh" }}>
        <Formik
          initialValues={{
            name: "",
            contact: "",
            email: "",
            password: "",
            role: "",
            branch: "",
            job_type: "",
            target:"",
            status: "",
            address: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, resetForm }) => (
            <form
              onSubmit={handleSubmit}
              autoComplete="off" // Prevents autofill on the form
            >
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="name">Full Name</Label>
                    <Field
                      name="name"
                      as={Input}
                      type="text"
                      placeholder="Enter name"
                      className="form-control"
                      autoComplete="off" // Prevents autofill on this field
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-danger"
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="email">Email Address</Label>
                    <Field
                      name="email"
                      as={Input}
                      type="email"
                      placeholder="Enter email"
                      className="form-control"
                      autoComplete="new-email" // Prevents autofill on this field
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-danger"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="contact">Contact Number</Label>
                    <Field
                      name="contact"
                      as={Input}
                      type="text"
                      placeholder="Enter phone number"
                      className="form-control"
                      autoComplete="off" // Prevents autofill on this field
                    />
                    <ErrorMessage
                      name="contact"
                      component="div"
                      className="text-danger"
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="password">Password</Label>
                    <Field
                      name="password"
                      as={Input}
                      type="password"
                      placeholder="Enter password"
                      className="form-control"
                      autoComplete="new-password" // Prevents autofill on this field
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-danger"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="role">Role</Label>
                    <Field name="role" as="select" className="form-control">
                      <option value="">Select Role</option>
                        <option key={userRoles.id} value={userRoles.id}>
                          {userRoles.name}
                        </option>
    
                    </Field>
                    <ErrorMessage
                      name="role"
                      component="div"
                      className="text-danger"
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="job_type">Join Type</Label>
                    <Field name="job_type" as="select" className="form-control">
                      <option value="">Select Join Type</option>
                      <option value="fulltime">Full Time</option>
                      {/* <option value="parttime">Part Time</option> */}
                    </Field>
                    <ErrorMessage
                      name="job_type"
                      component="div"
                      className="text-danger"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                {/* <Col md={6}>
                  <FormGroup>
                    <Label for="branch">Branch</Label>
                    <Field name="branch" as="select" className="form-control">
                      <option value="">Select Branch</option>
                      {userBranches.map((branch) => (
                        <option key={branch.id} value={branch.id}>
                          {branch.branch_name}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="role"
                      component="div"
                      className="text-danger"
                    />
                  </FormGroup>
                </Col> */}
                <Col md={6}>
                  <FormGroup>
                    <Label for="status">Status</Label>
                    <Field name="status" as="select" className="form-control">
                      <option value="">Select Status</option>
                      <option value="Active">Active</option>
                      <option value="Deactivated">Deactivated</option>
                    </Field>
                    <ErrorMessage
                      name="status"
                      component="div"
                      className="text-danger"
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                <FormGroup>
                    <Label for="target">Insentive target</Label>
                    <Field
                      name="target"
                      as={Input}
                      type="target"
                      placeholder="Enter target"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="target"
                      component="div"
                      className="text-danger"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="aadhar_number">Aadhar number</Label>
                    <Field
                      name="aadhar_number"
                      as={Input}
                      type="text"
                      placeholder="Enter aadhar number"
                      className="form-control"
                      autoComplete="off" // Prevents autofill on this field
                    />
                    <ErrorMessage
                      name="aadhar_number"
                      component="div"
                      className="text-danger"
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="pan_number">Pan number</Label>
                    <Field
                      name="pan_number"
                      as={Input}
                      type="text"
                      placeholder="Enter pan number"
                      className="form-control"
                      autoComplete="off" // Prevents autofill on this field
                    />
                    <ErrorMessage
                      name="pan_number"
                      component="div"
                      className="text-danger"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <Label for="address">Address</Label>
                <Field
                  name="address"
                  as="textarea"
                  className="form-control"
                  placeholder="Enter address"
                  rows="3"
                  autoComplete="off" // Prevents autofill on this field
                />
                <ErrorMessage
                  name="address"
                  component="div"
                  className="text-danger"
                />
              </FormGroup>
              <ModalFooter>
                <Button type="submit" color="primary">
                  Create
                </Button>
                <Button
                  color="secondary"
                  onClick={() => {
                    resetForm(); // Reset form when modal is canceled
                    toggle();
                  }}
                >
                  Cancel
                </Button>
              </ModalFooter>
            </form>
          )}
        </Formik>
      </ModalBody>
    </div>
  );
};

export default NewManagerUser;
