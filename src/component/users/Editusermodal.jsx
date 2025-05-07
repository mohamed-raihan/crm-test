import React, { useEffect, useState } from "react";
import {
  Alert,
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
import allaxios from "../../api/axios";
import API_URL from "../../api/api_urls";
import { toast } from "react-toastify";
import { ErrorMessage, Field } from "formik";
import { Eye, EyeOff } from "lucide-react";

const EdituserModal = ({ toggle, userData, onUserUpdated, userbranch }) => {
  const [formData, setFormData] = useState({
    name: userData?.name || "",
    email: userData?.email || "",
    contact: userData?.contact || "",
    role: userData?.role || "",
    branch: userData?.branch || "",
    job_type: userData?.job_type || "",
    target: userData?.target || "",
    address: userData?.address || "",
    password: userData?.password || "",
    status: userData?.status || "",
  });

  const [errors, setErrors] = useState({});
  const [duplicateEmailError, setDuplicateEmailError] = useState("");
  const [UserRole, setUserRole] = useState([]);
  const [selectedBranch, setSelectedbranch] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handle input field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({ ...errors, [name]: "" }); // Clear error on input change
  };

  const validateFields = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.contact) newErrors.contact = "Contact number is required";
    if (!formData.role) newErrors.role = "Role is required";
    if (!formData.job_type) newErrors.job_type = "Job type is required";
    if (!formData.target) newErrors.target = "Target is required";
    if (!formData.status) newErrors.status = "Status is required";
    if (!formData.address) newErrors.address = "Address is required";
    return newErrors;
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

  console.log(userbranch);

  const fetchUserBranches = async () => {
    try {
      const response = await allaxios.get(API_URL.BRANCH.GET_BRANCH, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      });
      const branch = response.data.find((branch) => {
        return branch.branch === userbranch.id;
      });
      setSelectedbranch(response.data);
    } catch (error) {
      console.error("Error fetching user branches:", error);
    }
  };

  console.log(selectedBranch);

  const checkDuplicateEmail = async () => {
    try {
      const response = await allaxios.get(API_URL.USERS.GET_USERS, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      });
      const users = response.data.users;
      const duplicateUser = users.find(
        (user) => user.email === formData.email && user.id !== userData.id
      );
      return !!duplicateUser;
    } catch (error) {
      console.error("Error checking duplicate email:", error);
      return false;
    }
  };

  const handleFormSubmit = async () => {
    const fieldErrors = validateFields();
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    const isDuplicateEmail = await checkDuplicateEmail();
    if (isDuplicateEmail) {
      setDuplicateEmailError("Email already exists.");
      return;
    }

    try {
      const response = await allaxios.patch(
        API_URL.USERS.USER_PATCH(userData?.id),
        formData,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
          },
        }
      );
      toast.success("User updated successfully");
      toggle();
      if (onUserUpdated) onUserUpdated();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  useEffect(() => {
    if (userData) {
      console.log(userData);

      setFormData({
        name: userData.name || "",
        email: userData.email || "",
        contact: userData.contact || "",
        role: userData.role || "",
        branch: userData.branch || "",
        job_type: userData.job_type || "",
        target: userData.target || "",
        address: userData.address || "",
        password: userData?.password || "",
        status: userData?.status || "",
      });
    }
  }, [userData]);

  useEffect(() => {
    fetchUserRole();
    fetchUserBranches();
  }, []);

  console.log(formData);

  return (
    <div>
      <ModalHeader toggle={toggle}>Edit User</ModalHeader>
      <ModalBody>
        <Form>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="fullName">Full name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  onChange={handleInputChange}
                  value={formData.name}
                  placeholder="Edit full name"
                />
              </FormGroup>
            </Col>

            <Col md={6}>
              <FormGroup className="relative">
                <Label for="password">Password</Label>
                <div style={{ position: "relative" }}>
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    disabled
                  />
                  {/* Add toggle button */}
                  <Button
                    type="button"
                    onClick={togglePasswordVisibility}
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "10px",
                      transform: "translateY(-50%)",
                      padding: "5px",
                      border: "none",
                      background: "transparent",
                      color: "black",
                    }}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </Button>
                </div>
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="email">Email address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Edit email"
                />
                {errors.email && <p className="text-danger">{errors.email}</p>}
                {duplicateEmailError && (
                  <p className="text-danger">{duplicateEmailError}</p>
                )}
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="contact">Contact number</Label>
                <Input
                  id="contact"
                  name="contact"
                  type="text"
                  value={formData.contact}
                  onChange={handleInputChange}
                  placeholder="Edit phone number"
                />
                {errors.contact && (
                  <p className="text-danger">{errors.contact}</p>
                )}
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="role">Role</Label>
                <Input
                  id="role"
                  name="role"
                  type="select"
                  value={formData.role}
                  onChange={handleInputChange}
                >
                  <option value="">Select Role</option>
                  {UserRole.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </Input>
                {errors.role && <p className="text-danger">{errors.role}</p>}
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="job_type">Join Type</Label>
                <Input
                  id="job_type"
                  name="job_type"
                  type="select"
                  value={formData.job_type}
                  onChange={handleInputChange}
                >
                  <option value="">Select Join Type</option>
                  <option value="fulltime">Full Time</option>
                  <option value="parttime">Part Time</option>
                </Input>
                {errors.job_type && (
                  <p className="text-danger">{errors.job_type}</p>
                )}
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="status">Status</Label>
                <Input
                  id="status"
                  name="status"
                  type="select"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <option value="">Edit Status</option>
                  <option value="active">Active</option>
                  <option value="deactivated">Deactivated</option>
                </Input>
                {errors.status && (
                  <p className="text-danger">{errors.status}</p>
                )}
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="branch">Branch</Label>
                <Input
                  name="branch"
                  type="select"
                  className="form-control"
                  value={formData.branch}
                  onChange={handleInputChange}
                >
                  <option value="">Select Branch</option>
                  {selectedBranch.map((branch, index) => (
                    <option key={index} value={branch.id}>
                      {branch.branch_name}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
                <Label for="target">Insentive target</Label>
                <Input
                  id="target"
                  name="target"
                  type="text"
                  value={formData.target}
                  onChange={handleInputChange}
                  placeholder="Edit target"
                />
                {errors.target && <p className="text-danger">{errors.target}</p>}
              </FormGroup>
          <FormGroup>
            <Label for="address">Address</Label>
            <Input
              style={{ height: "100px" }}
              type="textarea"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Edit address"
            />
            {errors.address && <p className="text-danger">{errors.address}</p>}
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

export default EdituserModal;
