import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import allaxios from "../../api/axios";
import API_URL from "../../api/api_urls";
import { toast } from "react-toastify";
import { Field } from "formik";
import "react-form-wizard-component/dist/style.css";
import EditCustomerDetailsForm from "../customerdetails/Editcustomersection";
import EditNomineeDetailsForm from "../customerdetails/EditNomineesection";
import EditPaymentDetailsForm from "../customerdetails/Editpaymentsection";
import EditPolicyDetailsForm from "../customerdetails/Editpolicysection";
import FormWizard from "react-form-wizard-component";

const EdituserModal = ({ toggle, userData, onUserUpdated }) => {
  const [formData, setFormData] = useState({
    first_name: userData?.first_name || "",
    middle_name: userData?.middle_name || "",
    last_name: userData?.last_name || "",
    contact: userData?.contact || "",
    email: userData?.email || "",
    aadhar_card_number: userData?.aadhar_card_number || "",
    pan_no: userData?.pan_no || "",
    gender: userData?.gender || "",
    dob: userData?.dob || "",
    occupation: userData?.occupation || "",
    policies: userData?.policies?.map((policy) => policy.status) || "",
    policy_ids: userData?.policies?.map((policy) => policy.id) || [],
    health_condition: userData?.health_condition || "",
    father_name: userData?.father_name || "",
    mother_name: userData?.mother_name || "",
    guardian_name: userData?.guardian_name || "",
    nominees: userData?.nominees || [],
    payments: userData?.payments || [],
    customer_policies: userData?.customer_policies || [],
    start_date: userData?.start_date || "",
    status: userData?.status || "",
    profile_image: userData?.profile_image || "",
    address1: userData?.address1 || "",
    address2: userData?.address2 || "",
    address3: userData?.address3 || "",
    district: userData?.district || "",
    pincode: userData?.pincode || "",
  });

  const [nomineeFormData, setNomineeFormData] = useState({
    name: "",
    relationship: "",
    phone_number: "",
    email: "",
    address: "",
    customer: "",
  });

  const [PolicyFormData, setPolicyFormData] = useState({
    policy_id: "",
    start_date: "",
    customer_id: "",
  });

  const [paymentData, setPaymentData] = useState({
    policy_id: "",
    customer: "",
    date: "",
    amount_paid: "",
    payment_method: "",
    payment_status: "",
    due_amount: "",
    next_due_date: "",
    notes: "",
    transaction_id: "",
  });

  const [UserRole, setUserRole] = useState([]);
  const [Userbranch, setUserbranch] = useState([]);
  const [userpolicies, setuserpolicies] = useState([]);
  const [usernominee, setusernominee] = useState([]);
  const [userpayment, setuserpayment] = useState([]);
  const [userpolicy, setuserpolicy] = useState([]);

  const [validationErrors, setValidationErrors] = useState({});

  console.log("formdata", formData);
  console.log("userdata", userData);
  console.log("policies", userpolicies);

  // console.log('nomineedata props',userNominee);

  // Handle input field changes
  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;

  //   if (name === "policy_ids") {
  //     // Ensure it's stored as an integer list
  //     setFormData((prev) => ({
  //       ...prev,
  //       [name]: [parseInt(value, 10)], // Convert value to an integer and store in a list
  //     }));
  //   } else {
  //     setFormData((prev) => ({
  //       ...prev,
  //       [name]: value,
  //     }));
  //   }
  // };

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0], // Store the selected file
      }));
    } else if (name === "policy_ids") {
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

  const validateForm = () => {
    const errors = {};

    if (!formData.name) errors.name = "Full Name is required.";
    if (!formData.contact) {
      errors.contact = "Contact Number is required.";
    } else if (!/^\d{10}$/.test(formData.contact)) {
      errors.contact = "Contact Number must be 10 digits.";
    }
    if (!formData.email) {
      errors.email = "Email Address is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Enter a valid email address.";
    }
    if (!formData.aadhar_card_number) {
      errors.aadhar_card_number = "Aadhar Card Number is required.";
    } else if (formData.aadhar_card_number.length !== 12) {
      errors.aadhar_card_number = "Aadhar Card Number must be 12 digits.";
    }
    if (!formData.pan_card_number) {
      errors.pan_card_number = "PAN Card Number is required.";
    } else if (!/[A-Z]{5}[0-9]{4}[A-Z]{1}/.test(formData.pan_card_number)) {
      errors.pan_card_number = "Enter a valid PAN Card Number.";
    }
    if (!formData.gender) errors.gender = "Gender is required.";
    if (!formData.dob) errors.dob = "Date of Birth is required.";
    if (!formData.occupation) errors.occupation = "Occupation is required.";
    if (!formData.policies) errors.policies = "Policy Status is required.";
    if (!formData.policy_ids) errors.policy_ids = "Policy ID is required.";
    if (!formData.health_condition) {
      errors.health_condition = "Health Condition is required.";
    }
    if (!formData.nominees) errors.nominees = "nominees is required.";
    if (!formData.mother_name) errors.mother_name = "Mother name is required.";
    if (!formData.father_name) errors.father_name = "Father name is required.";
    if (!formData.guardian_name)
      errors.guardian_name = "Guardian name is required.";

    if (!formData.payments) errors.payments = "Payments is required.";
    if (!formData.status) errors.status = "Status is required.";
    if (!formData.address) errors.address = "Address is required.";

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
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

  const fetchUserData = async () => {
    try {
      const response = await allaxios.get(
        `${API_URL.USERS.GET_USERS}/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
          },
        }
      );
      setFormData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchUserpolicies = async () => {
    try {
      const response = await allaxios.get(API_URL.POLICIES.GET_POLICIES, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      });
      setuserpolicies(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  console.log(userpolicies);

  const fetchUsernominee = async () => {
    try {
      const response = await allaxios.get(API_URL.NOMINEE.GET_NOMINEE, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      });

      // Filter the response data to find entries where the customer matches userData.id
      const filteredNominees = response.data.filter(
        (nominee) => nominee.customer === userData.id
      );

      // Set the filtered nominees to the state
      setusernominee(filteredNominees);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchUserPolicy = async () => {
    try {
      const response = await allaxios.get(API_URL.POLICY.GET_POLICY, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      });

      console.log(response.data);

      // Filter the response data to find entries where the customer matches userData.id
      const filteredpolicy = response.data.filter(
        (policy) => policy.customer_id === userData.id
      );

      // Set the filtered nominees to the state
      setuserpolicy(filteredpolicy);
    } catch (error) {
      console.error("Error fetching user data payment:", error);
    }
  };

  console.log(userpolicy);

  const fetchUserPayment = async () => {
    try {
      const response = await allaxios.get(API_URL.PAYMENT.GET_PAYMENT, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      });

      // Filter the response data to find entries where the customer matches userData.id
      const filteredpayment = response.data.filter(
        (payment) => payment.customer === userData.id
      );

      // Set the filtered nominees to the state
      setuserpayment(filteredpayment);
    } catch (error) {
      console.error("Error fetching user data payment:", error);
    }
  };

  console.log(userpayment);

  //   const Nomineedata = userData.nominees

  //   const nominee = Nomineedata.map((i)=>{
  //     return i.address
  //   })

  // console.log(usernominee);

  const handleFormSubmit = async () => {
    try {
      const data = new FormData(); // Create FormData object

      // Append all fields except profile_image (if it's a string, meaning it's a URL)
      Object.keys(formData).forEach((key) => {
        if (key !== "profile_image") {
          data.append(key, formData[key]);
        }
      });

      // Append the profile image file only if it's a File object
      if (formData.profile_image && formData.profile_image instanceof File) {
        data.append("profile_image", formData.profile_image);
      }

      const response = await allaxios.patch(
        API_URL.CUSTOMER.PATCH_CUSTOMER(userData?.id),
        data, // Send FormData, not formData object
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
            "Content-Type": "multipart/form-data", // Required for file uploads
          },
        }
      );

      toast.success("Customer updated successfully");
      toggle();
      if (onUserUpdated) onUserUpdated(); // Refresh parent component
    } catch (error) {
      console.error("Error updating Customer:", error);
      toast.error("Failed to update Customer. Please try again.");
    }
  };

  useEffect(() => {
    if (userData) {
      setFormData({
        first_name: userData?.first_name || "",
        middle_name: userData?.middle_name || "",
        last_name: userData?.last_name || "",
        contact: userData?.contact || "",
        email: userData?.email || "",
        aadhar_card_number: userData?.aadhar_card_number || "",
        pan_no: userData?.pan_no || "",
        gender: userData?.gender || "",
        dob: userData?.dob || "",
        occupation: userData?.occupation || "",
        policies: userData?.policies?.map((policy) => policy.status) || "",
        policy_ids: userData?.policies?.map((policy) => policy.id) || [],
        health_condition: userData?.health_condition || "",
        father_name: userData?.father_name || "",
        mother_name: userData?.mother_name || "",
        guardian_name: userData?.guardian_name || "",
        nominees: userData?.nominees || [],
        payments: userData?.payments || [],
        customer_policies: userData?.customer_policies || [],
        start_date: userData?.start_date || "",
        status: userData?.status || "",
        profile_image: userData?.profile_image || "",
        address1: userData?.address1 || "",
        address2: userData?.address2 || "",
        address3: userData?.address3 || "",
        district: userData?.district || "",
        pincode: userData?.pincode || "",
      });
    }
  }, [userData]);

  useEffect(() => {
    if (usernominee && usernominee.length > 0) {
      const nominee = usernominee.find((n) => n.customer === userData?.id);
      console.log("nominee", nominee);

      if (nominee) {
        setNomineeFormData({
          name: nominee.name || "",
          relationship: nominee.relationship || "",
          phone_number: nominee.phone_number || "",
          email: nominee.email || "",
          address: nominee.address || "",
          customer: nominee.customer || "",
        });
      }
    }
  }, [usernominee, userData]);

  useEffect(() => {
    if (userpayment && userpayment.length > 0) {
      const payment = userpayment.find((n) => n.customer === userData?.id);
      console.log("payment", payment);

      if (payment) {
        setPaymentData({
          policy_id: payment.policies, // Assuming `policy_id` expects a single value or an array
          customer: payment.customer || "",
          date: payment.date || "",
          amount_paid: payment.amount_paid || "",
          payment_method: payment.payment_method || "",
          payment_status: payment.payment_status || "",
          due_amount: payment.due_amount || "",
          next_due_date: payment.next_due_date || "",
          notes: payment.notes || "",
          transaction_id: payment.transaction_id || "",
        });
      }
    }
  }, [userpayment, userData]);

  useEffect(() => {
    if (userpolicy && userpolicy.length > 0) {
      const policy = userpolicy.find(
        (policy) => policy.customer_id === userData?.id
      );
      console.log("policy", policy);

      if (policy) {
        setPolicyFormData({
          policy_id: policy.policy_id, // Assuming `policy_id` expects a single value or an array
          customer: policy.customer_id || "",
          start_date: policy.start_date || "",
        });
      }
    }
  }, [userpolicy, userData]);

  useEffect(() => {
    fetchUserRole();
    fetchUserBranches();
    fetchUserData();
    fetchUserpolicies();
    fetchUsernominee();
    fetchUserPayment();
    fetchUserPolicy();
  }, []);

  const tabChanged = ({ prevIndex, nextIndex }) => {
    console.log("Moved from step", prevIndex, "to step", nextIndex);
  };

  console.log("edituser", userData);

  return (
    // <div>
    <Modal isOpen={true} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>Edit Customer</ModalHeader>
      <ModalBody>
        <Form
          style={{ height: "70vh", overflowY: "auto", overflowX: "hidden" }}
        >
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="profile_image">Profile image</Label>
                <Input
                  id="profile_image"
                  name="profile_image"
                  type="file"
                  onChange={handleInputChange} // Remove `value`
                  accept="image/*" // Restrict file type to images
                />

                {/* <FormFeedback>{validationErrors.name}</FormFeedback> */}
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <FormGroup>
                <Label for="first_name">First Name <span className="text-danger fw-bold">*</span></Label>
                <Input
                  id="first_name"
                  name="first_name"
                  placeholder="Enter name"
                  type="text"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  invalid={!!validationErrors.name}
                />
                <FormFeedback>{validationErrors.name}</FormFeedback>
              </FormGroup>
            </Col>

            <Col md={4}>
              <FormGroup>
                <Label for="middle_name">Middle Name</Label>
                <Input
                  id="middle_name"
                  name="middle_name"
                  placeholder="Enter name"
                  type="text"
                  value={formData.middle_name}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </Col>

            <Col md={4}>
              <FormGroup>
                <Label for="last_name">Last Name</Label>
                <Input
                  id="last_name"
                  name="last_name"
                  placeholder="Enter name"
                  type="text"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  invalid={!!validationErrors.last_name}
                />
                <FormFeedback>{validationErrors.last_name}</FormFeedback>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="contact">Contact Number <span className="text-danger fw-bold">*</span></Label>
                <Input
                  id="contact"
                  name="contact"
                  placeholder="Enter phone number"
                  type="number"
                  value={formData.contact}
                  onChange={handleInputChange}
                  invalid={!!validationErrors.contact}
                />
                <FormFeedback>{validationErrors.contact}</FormFeedback>
              </FormGroup>
            </Col>

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
                  invalid={!!validationErrors.email}
                />
                <FormFeedback>{validationErrors.email}</FormFeedback>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="aadhar_card_number">Aadhar Card Number</Label>
                <Input
                  id="aadhar_card_number"
                  name="aadhar_card_number"
                  placeholder="Enter Aadhar Card Number"
                  type="text"
                  value={formData.aadhar_card_number}
                  onChange={handleInputChange}
                  invalid={!!validationErrors.aadhar_card_number}
                />
                <FormFeedback>
                  {validationErrors.aadhar_card_number}
                </FormFeedback>
              </FormGroup>
            </Col>

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
                  invalid={!!validationErrors.pan_card_number}
                />
                <FormFeedback>{validationErrors.pan_card_number}</FormFeedback>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="gender">Gender <span className="text-danger fw-bold">*</span></Label>
                <Input
                  id="gender"
                  name="gender"
                  type="select"
                  value={formData.gender}
                  onChange={handleInputChange}
                  invalid={!!validationErrors.gender}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Input>
                <FormFeedback>{validationErrors.pan_card_number}</FormFeedback>
              </FormGroup>
            </Col>

            <Col md={6}>
              <FormGroup>
                <Label for="dob">Date of Birth <span className="text-danger fw-bold">*</span></Label>
                <Input
                  id="dob"
                  name="dob"
                  type="date"
                  value={formData.dob}
                  onChange={handleInputChange}
                  invalid={!!validationErrors.dob}
                />
                <FormFeedback>{validationErrors.dob}</FormFeedback>
              </FormGroup>
            </Col>
          </Row>
          <Row>
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
                  invalid={!!validationErrors.occupation}
                />

                <FormFeedback>{validationErrors.occupation}</FormFeedback>
              </FormGroup>
            </Col>

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
                  invalid={!!validationErrors.health_condition}
                />
                <FormFeedback>{validationErrors.health_condition}</FormFeedback>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            {/* <Col md={4}>
                      <FormGroup>
                        <Label for="payments">Payments</Label>
                        <Input
                          id="payments"
                          name="payments"
                          placeholder="Enter Payments"
                          type="number"
                          value={formData.payments}
                          onChange={handleInputChange}
                          invalid={!!validationErrors.payments}
        
                        />
                 <FormFeedback>{validationErrors.payments}</FormFeedback>
        
                      </FormGroup>
                    </Col> */}
            <Col md={6}>
              <FormGroup>
                <Label for="status">Customer Status <span className="text-danger fw-bold">*</span></Label>
                {/* <Field name="status" as="select" className="form-control">
                    <option value="">Select Status</option>
                    <option value="Active">Active</option>
                    <option value="Deactivated" disabled>Deactivated</option>
                  </Field> */}
                <Input
                  id="status"
                  name="status"
                  type="select"
                  value={formData.status}
                  onChange={handleInputChange}
                  invalid={!!validationErrors.status}
                >
                  <option value="">Select Status</option>
                  <option value="active">Active</option>
                  <option value="deactivated">Deactivated</option>
                  {/* <option value="Cancelled">Cancelled</option> */}
                </Input>
                <FormFeedback>{validationErrors.status}</FormFeedback>

                {/* <ErrorMessage name="status" component="div" className="text-danger" /> */}
              </FormGroup>
            </Col>

            <Col md={6}>
              <FormGroup>
                <Label for="father_name">Father's Name</Label>
                <Input
                  id="father_name"
                  name="father_name"
                  placeholder="Enter Father's Name"
                  type="text"
                  value={formData.father_name}
                  onChange={handleInputChange}
                  invalid={!!validationErrors.father_name}
                />
                <FormFeedback>{validationErrors.father_name}</FormFeedback>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="mother_name">Mother's Name</Label>
                <Input
                  id="mother_name"
                  name="mother_name"
                  placeholder="Enter Mother's Name"
                  type="text"
                  value={formData.mother_name}
                  onChange={handleInputChange}
                  invalid={!!validationErrors.mother_name}
                />
                <FormFeedback>{validationErrors.mother_name}</FormFeedback>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="guardian_name">Guardian's Name</Label>
                <Input
                  id="guardian_name"
                  name="guardian_name"
                  placeholder="Enter Guardian's Name"
                  type="text"
                  value={formData.guardian_name}
                  onChange={handleInputChange}
                  invalid={!!validationErrors.guardian_name}
                />
                <FormFeedback>{validationErrors.guardian_name}</FormFeedback>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="address1">Address 1</Label>
                <Input
                  id="address1"
                  name="address1"
                  placeholder="Enter address line 1"
                  type="text"
                  value={formData.address1}
                  onChange={handleInputChange}
                  invalid={!!validationErrors.mother_name}
                />
                <FormFeedback>{validationErrors.mother_name}</FormFeedback>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="address2">Address 2</Label>
                <Input
                  id="address2"
                  name="address2"
                  placeholder="Enter address line 2"
                  type="text"
                  value={formData.address2}
                  onChange={handleInputChange}
                  invalid={!!validationErrors.guardian_name}
                />
                <FormFeedback>{validationErrors.guardian_name}</FormFeedback>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="mother_name">Address 3</Label>
                <Input
                  id="address3"
                  name="address3"
                  placeholder="Enter address line 3"
                  type="text"
                  value={formData.address3}
                  onChange={handleInputChange}
                  invalid={!!validationErrors.mother_name}
                />
                <FormFeedback>{validationErrors.mother_name}</FormFeedback>
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for="district">District</Label>
                <Input
                  id="district"
                  name="district"
                  placeholder="Enter District"
                  type="text"
                  value={formData.district}
                  onChange={handleInputChange}
                  invalid={!!validationErrors.guardian_name}
                />
                <FormFeedback>{validationErrors.guardian_name}</FormFeedback>
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for="pincode">Pincode</Label>
                <Input
                  id="pincode"
                  name="pincode"
                  placeholder="Enter pincode"
                  type="text"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  invalid={!!validationErrors.guardian_name}
                />
                <FormFeedback>{validationErrors.guardian_name}</FormFeedback>
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
        <Button color="primary" onClick={handleFormSubmit}>
          Create
        </Button>{" "}
      </ModalFooter>
      {/* </div> */}
    </Modal>
    /* <Modal isOpen={true} toggle={toggle} size="lg">
<div className="p-4">
  <h4>New Customer </h4>
  <FormWizard onComplete={handleFormSubmit} onTabChange={tabChanged}>
    <FormWizard.TabContent title="Customer Details" icon="ti-user">
      <EditCustomerDetailsForm
        formData={formData}
        setFormData={setFormData}
        handleChange={handleInputChange}
       
      />
    </FormWizard.TabContent>
    <FormWizard.TabContent title="Nominee Details" icon="ti-heart">
      <EditNomineeDetailsForm
        formData={nomineeFormData}
        setFormData={setNomineeFormData}
        handleChange={handleNomineeInputChange}

      />
    </FormWizard.TabContent>

    <FormWizard.TabContent title="Payment Details" icon="ti-file">
      <EditPolicyDetailsForm
        formData={PolicyFormData}
        setFormData={setPolicyFormData}
        handleChange={handlePolicyInputChange}
      />
    </FormWizard.TabContent>
    <FormWizard.TabContent title="Payment Details" icon="ti-money">
      <EditPaymentDetailsForm
        formData={paymentData}
        setFormData={setPaymentData}
        handleChange={handlePaymentInputChange}
      />
    </FormWizard.TabContent>
  </FormWizard>
</div>
    {/* Add styles for icons */
    /* <style>{`
  @import url("https://cdn.jsdelivr.net/gh/lykmapipo/themify-icons@0.1.2/css/themify-icons.css");
`}</style>
</Modal>  */
  );
};

export default EdituserModal;
