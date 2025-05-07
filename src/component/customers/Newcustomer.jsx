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
import allaxios from "../../api/axios";
import API_URL from "../../api/api_urls";
import { toast } from "react-toastify";

const NewUserModal = ({ toggle }) => {
  const [userrole, setUserRole] = useState([]);
  const [userbranch, setUserBranch] = useState([]);
  const [userpolicies, setUserPolicies] = useState([]);
  const [isValid, setIsValid] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    aadhar_card_number: "",
    pan_card_number: "",
    gender: "",
    dob: "",
    occupation: "",
    policies: "",
    policy_ids: "",
    health_condition: "",
    father_name: "",
    mother_name: "",
    guardian_name: "",
    nominees: "",
    payments: "",
    start_date: "",
    address: "",
  });

  const fetchUserRole = async () => {
    const response = await allaxios.get(API_URL.USERROLE.GET_ROLE, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
      },
    });
    setUserRole(response.data);
  };

  const fetchPolicies = async () => {
    const response = await allaxios.get(API_URL.POLICIES.GET_POLICIES, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
      },
    });
    setUserPolicies(response.data);
  };

  const fetchUserBranches = async () => {
    const response = await allaxios.get(API_URL.BRANCH.GET_BRANCH, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
      },
    });
    setUserBranch(response.data);
  };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "policy_ids") {
      // Ensure it's stored as a list
      setFormData((prev) => ({
        ...prev,
        [name]: [parseInt(value)], // Convert to list and parse as integer
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await allaxios.post(
        API_URL.CUSTOMER.POST_CUSTOMER,
        formData,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
          },
        }
      );
      toast.success("Customer created successfully!", { autoClose: 2000 });
      console.log("successfully added customer");

      toggle();
    } catch (error) {
      toast.error("Error creating Customer. Check the fields", {
        autoClose: 2000,
      });
    }
  };

  const validateAadhaar = (number) => {
    const aadhaarRegex = /^\d{12}$/;
    return aadhaarRegex.test(number);
  };

  const handleAadhar = (e) => {
    const input = e.target.value.replace(/\D/g, ''); // Remove non-digits
    if (input.length <= 12) {
      setFormData({
        ...formData,
        aadhar_card_number: input,
      })
      setIsValid(validateAadhaar(input));
    }
  };

  const formatAadhaar = (number) => {
    return number.replace(/(\d{4})/g, '$1 ').trim();
  };

  useEffect(() => {
    fetchUserRole();
    fetchUserBranches();
    fetchPolicies();
  }, []);

  return (
    <div>
      <ModalHeader toggle={toggle}>New Customer</ModalHeader>
      <ModalBody>
        <Form>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="contact">Contact Number</Label>
                <Input
                  id="contact"
                  name="contact"
                  placeholder="Enter phone number"
                  type="number"
                  value={formData.contact}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="Enter email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <div className="relative w-full max-w-md">
                <input
                  type="text"
                  value={formatAadhaar(value)}
                  onChange={handleAadhar}
                  placeholder="Enter 12-digit Aadhaar number"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
                  maxLength={14} // 12 digits + 2 spaces
                />
                {isValid && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <Check className="w-5 h-5 text-green-500" />
                  </div>
                )}
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="pan_card_number">PAN Card Number</Label>
                <Input
                  id="pan_card_number"
                  name="pan_card_number"
                  placeholder="Enter PAN Card Number"
                  type="text"
                  value={formData.pan_card_number}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="gender">Gender</Label>
                <Input
                  id="gender"
                  name="gender"
                  type="select"
                  value={formData.gender}
                  onChange={handleInputChange}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="policies">Policies</Label>
                <Input
                  id="policies"
                  name="policies"
                  type="select"
                  value={formData.policies}
                  onChange={handleInputChange}
                >
                  <option value="">Select Policy Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Cancelled">Cancelled</option>
                </Input>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="policy_ids">Policy ID</Label>
                <Input
                  id="policy_ids"
                  name="policy_ids"
                  type="select"
                  value={formData.policy_ids}
                  onChange={handleInputChange}
                >
                  <option value="">Select Policy</option>
                  {userpolicies.map((policy) => (
                    <option key={policy.id} value={policy.id}>
                      {policy.policy_name}
                    </option>
                  ))}
                </Input>
                {/* <Input
  id="policy_ids"
  name="policy_ids"
  type="select"
  value={formData.policy_ids}
  onChange={handleInputChange}
  multiple
>
  <option value="">Select Policy</option>
  {userpolicies.map((policy) => (
    <option key={policy.id} value={policy.id}>
      {policy.policy_name}
    </option>
  ))}
</Input> */}
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="dob">Date of Birth</Label>
                <Input
                  id="dob"
                  name="dob"
                  type="date"
                  value={formData.dob}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="occupation">Occupation</Label>
                <Input
                  id="occupation"
                  name="occupation"
                  placeholder="Enter Occupation"
                  type="text"
                  value={formData.occupation}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="health_condition">Health Condition</Label>
                <Input
                  id="health_condition"
                  name="health_condition"
                  placeholder="Enter Health Condition"
                  type="text"
                  value={formData.health_condition}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="payments">Payments</Label>
                <Input
                  id="payments"
                  name="payments"
                  placeholder="Enter Payments"
                  type="number"
                  value={formData.payments}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <FormGroup>
                <Label for="father_name">Father's Name</Label>
                <Input
                  id="father_name"
                  name="father_name"
                  placeholder="Enter Father's Name"
                  type="text"
                  value={formData.father_name}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="mother_name">Mother's Name</Label>
                <Input
                  id="mother_name"
                  name="mother_name"
                  placeholder="Enter Mother's Name"
                  type="text"
                  value={formData.mother_name}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="guardian_name">Guardian's Name</Label>
                <Input
                  id="guardian_name"
                  name="guardian_name"
                  placeholder="Enter Guardian's Name"
                  type="text"
                  value={formData.guardian_name}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Label for="nominees">Nominees</Label>
            <Input
              id="nominees"
              name="nominees"
              placeholder="Enter Nominees"
              type="textarea"
              value={formData.nominees}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="address">Address</Label>
            <Input
              id="address"
              name="address"
              placeholder="Enter Address"
              type="textarea"
              value={formData.address}
              onChange={handleInputChange}
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
        <Button color="primary" onClick={handleSubmit}>
          Create
        </Button>
      </ModalFooter>
    </div>
  );
};

export default NewUserModal;
