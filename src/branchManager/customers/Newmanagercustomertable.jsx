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
import CustomerDetailsForm from "../customerdetails/Customersection";
import NomineeDetailsForm from "../customerdetails/Nomineesection";
import PaymentDetailsForm from "../customerdetails/Paymentsection";
import PolicyDetailsForm from "../customerdetails/Policysection";

import FormWizard from "react-form-wizard-component";

const NewUserModal = ({ toggle }) => {
  const [userrole, setUserRole] = useState([]);
  const [userbranch, setUserBranch] = useState([]);
  const [userpolicies, setUserPolicies] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [selectedPolicyDetails, setSelectedPolicyDetails] = useState(null);
  const [usercustomer, setUsercustomer] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    first_name: "",
    middle_name:"",
    last_name: "",
    contact: "",
    email: "",
    aadhar_card_number: "",
    pan_no: "",
    gender: "",
    dob: "",
    occupation: "",
    policies: "",
    policy_ids: "",
    health_condition: "",
    father_name: "",
    mother_name: "",
    guardian_name: "",
    nominees: [],
    payments: [],
    customer_policies: [],
    start_date: "",
    status: "",
    profile_image: "",
    address1: "",
    address2: "",
    address3: "",
    district: "",
    pincode: "",
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

  console.log(formData);
  // console.log(nomineeFormData);
  // console.log(PolicyFormData);

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

  console.log(paymentData);

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

  const fetchUserCustomer = async () => {
    const response = await allaxios.get(API_URL.CUSTOMER.GET_CUSTOMER, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
      },
    });
    setUsercustomer(response.data);
  };

  console.log("customer data", usercustomer);

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  // };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;

  //   if (name === "policy_ids") {
  //     // Ensure it's stored as a list
  //     setFormData((prev) => ({
  //       ...prev,
  //       [name]: [parseInt(value)], // Convert to list and parse as integer
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
        [name]: files[0], // Store the first selected file
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

  const handleNomineeInputChange = (e) => {
    const { name, value } = e.target;
    setNomineeFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePaymentInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePolicyInputChange = (e) => {
    const { name, value } = e.target;

    const formattedValue =
      name === "start_date" && value
        ? new Date(value).toISOString().split("T")[0] // Format date to YYYY-MM-DD
        : value;

    setPolicyFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));

    const selectedPolicy = userpolicies.find(
      (policy) => policy.id === parseInt(value)
    );
    setSelectedPolicyDetails(selectedPolicy || null);
  };

  const RELATIONSHIP_CHOICES = [
    { value: "spouse", label: "Spouse" },
    { value: "parent", label: "Parent" },
    { value: "child", label: "Child" },
    { value: "other", label: "Other" },
  ];

  const addNominee = () => {
    if (
      !nomineeData.name ||
      !nomineeData.relationship ||
      !nomineeData.phone_number
    ) {
      toast.error("Please fill all nominee fields.", { autoClose: 2000 });
      return;
    }
    setFormData((prev) => ({
      ...prev,
      nominees: [...prev.nominees, nomineeData],
    }));
    setNomineeFormData({
      name: "",
      relationship: "",
      phone_number: "",
      email: "",
      address: "",
    });
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.first_name) errors.name = "First Name is required.";
    if (!formData.contact) {
      errors.contact = "Contact Number is required.";
    } else if (!/^\d{10}$/.test(formData.contact)) {
      errors.contact = "Contact Number must be 10 digits.";
    }
    // if (!formData.email) {
    //   errors.email = "Email Address is required.";
    // } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    //   errors.email = "Enter a valid email address.";
    // } else if (usercustomer.some((user) => user.email === formData.email)) {
    //   errors.email = "This email address is already in use.";
    // }

    // if (!formData.aadhar_card_number) {
    //   errors.aadhar_card_number = "Aadhar Card Number is required.";
    // } else if (formData.aadhar_card_number.length !== 12) {
    //   errors.aadhar_card_number = "Aadhar Card Number must be 12 digits.";
    // }
    // if (!formData.pan_card_number) {
    //   errors.pan_card_number = "PAN Card Number is required.";
    // } else if (!/[A-Z]{5}[0-9]{4}[A-Z]{1}/.test(formData.pan_card_number)) {
    //   errors.pan_card_number = "Enter a valid PAN Card Number.";
    // }
    if (!formData.gender) errors.gender = "Gender is required.";
    if (!formData.dob) errors.dob = "Date of Birth is required.";
    // if (!formData.occupation) errors.occupation = "Occupation is required.";
    // // if (!formData.policies) errors.policies = "Policy Status is required.";
    // // if (!formData.policy_ids) errors.policy_ids = "Policy ID is required.";
    // if (!formData.health_condition) {
    //   errors.health_condition = "Health Condition is required.";
    // }
    // // if (!formData.nominees) errors.nominees = "nominees is required.";
    // if (!formData.mother_name) errors.mother_name = "Mother name is required.";
    // if (!formData.father_name) errors.father_name = "Father name is required.";
    // if (!formData.guardian_name) errors.guardian_name = "Guardian name is required.";

    // if (!formData.payments) errors.payments = "Payments is required.";
    // if (!formData.status) errors.status = "Status is required.";
    // if (!formData.address) errors.address = "Address is required.";

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  console.log(paymentData);

  // const handleSubmit = async () => {

  //   // const formattedDate = dayjs(paymentData.date).format("YYYY-MM-DD");

  //   if (!validateForm()) {
  //       toast.error("Please fill all required fields correctly.", {
  //         autoClose: 2000,
  //       });
  //       return;
  //     }

  //   try {
  //     const response = await allaxios.post(
  //       API_URL.CUSTOMER.POST_CUSTOMER,
  //       formData,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
  //         },
  //       }
  //     );

  //     // const customerId = response.data.id;
  //     // console.log('Customer ID:', customerId);

  //     // Add the customer ID to the nomineeFormData
  //     // const updatedNomineeFormData = {
  //     //   ...nomineeFormData,

  //     //   customer: customerId, // Assuming the customer ID should go in the 'customer' field
  //     // };

  //     // // Second API call to create the nominee
  //     // const nomineeresponse = await allaxios.post(
  //     //   API_URL.NOMINEE.POST_NOMINEE,
  //     //   updatedNomineeFormData,
  //     //   {
  //     //     headers: {
  //     //       Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
  //     //     },
  //     //   }
  //     // );

  //     // const updatedPolicyData = {
  //     //   ...PolicyFormData,
  //     //   customer_id: customerId,
  //     // };

  //     // const policyResponse = await allaxios.post(
  //     //   API_URL.POLICY.POST_POLICY,
  //     //   updatedPolicyData,
  //     //   {
  //     //     headers: {
  //     //       Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
  //     //     },
  //     //   }
  //     // );

  //     // console.log('policy response',policyResponse);

  //     // const updatedPaymentData = {
  //     //   ...paymentData,
  //     //   customer: customerId,
  //     // };

  //     // // Create Payment
  //     // const paymentResponse = await allaxios.post(
  //     //   API_URL.PAYMENT.POST_PAYMENT,
  //     //   updatedPaymentData,
  //     //   {
  //     //     headers: {
  //     //       Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
  //     //     },
  //     //   }
  //     // );

  //     // console.log('Payment Response:', paymentResponse);

  //   //  console.log('nominee response',nomineeresponse);

  //     console.log('success',response.data);

  //     toast.success("Customer created successfully!", { autoClose: 2000 });
  //     console.log('successfully added customer');
  //     console.log(response.data);

  //     toggle();
  //   } catch (error) {
  //       console.log('error',error);

  //     toast.error("Error creating Customer. Check the fields", {
  //       autoClose: 2000,
  //     });

  //   }
  // };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error("Please fill all required fields correctly.", {
        autoClose: 2000,
      });
      return;
    }

    try {
      const data = new FormData(); // Create FormData object

      // Append all form fields except profile_image
      Object.keys(formData).forEach((key) => {
        if (key !== "profile_image") {
          data.append(key, formData[key]);
        }
      });

      // Append the profile image file
      if (formData.profile_image) {
        data.append("profile_image", formData.profile_image);
      }

      const response = await allaxios.post(
        API_URL.CUSTOMER.POST_CUSTOMER,
        data,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
            "Content-Type": "multipart/form-data", // Required for file upload
          },
        }
      );

      toast.success("Customer created successfully!", { autoClose: 2000 });
      toggle();
    } catch (error) {
      console.log("Error:", error);
      toast.error("Error creating Customer. Check the fields", {
        autoClose: 2000,
      });
    }
  };

  const tabChanged = ({ prevIndex, nextIndex }) => {
    console.log("Moved from step", prevIndex, "to step", nextIndex);
  };

  useEffect(() => {
    fetchUserRole();
    fetchUserBranches();
    fetchPolicies();
    fetchUserCustomer();
  }, []);

  return (
    // <div>
    <Modal isOpen={true} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>New Customer</ModalHeader>
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
            <Col md={6}>
              <FormGroup>
                <Label for="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  type="select"
                  value={formData.title}
                  onChange={handleInputChange}
                >
                  <option value="">Select title</option>
                  <option value="MR">MR</option>
                  <option value="MRS">MRS</option>
                  <option value="MS">MS</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <FormGroup>
                <Label for="first_name">First Name</Label>
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
                  invalid={!!validationErrors.last_name}
                />
                <FormFeedback>{validationErrors.last_name}</FormFeedback>
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
                <Label for="contact">Contact Number</Label>
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
                <Label for="gender">Gender</Label>
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
                <Label for="dob">Date of Birth</Label>
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
                <Label for="status">Customer Status</Label>
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
        <Button color="primary" onClick={handleSubmit}>
          Create
        </Button>
      </ModalFooter>
      {/* </div> */}
    </Modal>
    /* <Modal isOpen={true} toggle={toggle} size="lg">
<div className="p-4 " style={{height:"90vh",overflowY:"auto",scrollbarWidth:"thin"}} >
  <h4>New Customer </h4>
  <FormWizard onComplete={handleSubmit} onTabChange={tabChanged}>
    <FormWizard.TabContent title="Customer Details" icon="ti-user">
      <CustomerDetailsForm
        formData={formData}
        setFormData={setFormData}
        // handleChange={handleInputChange}
       
      />
    </FormWizard.TabContent>
    <FormWizard.TabContent title="Nominee Details" icon="ti-heart">
      <NomineeDetailsForm
        formData={nomineeFormData}
        setFormData={setNomineeFormData}
      />
    </FormWizard.TabContent>

    <FormWizard.TabContent title="Policy Details" icon="ti-file">
      <PolicyDetailsForm
        formData={PolicyFormData}
        setFormData={setPolicyFormData}
        handleChange={handlePolicyInputChange}
        selectedpolicy={selectedPolicyDetails}

      />
    </FormWizard.TabContent>

    <FormWizard.TabContent title="Payment Details" icon="ti-money">
      <PaymentDetailsForm
        formData={paymentData}
        setFormData={setPaymentData}
        handleChange={handlePaymentInputChange}
      />
    </FormWizard.TabContent>
  </FormWizard>
</div>

{/* <style>{`
  @import url("https://cdn.jsdelivr.net/gh/lykmapipo/themify-icons@0.1.2/css/themify-icons.css");
`}</style>
</Modal> */
  );
};

export default NewUserModal;
