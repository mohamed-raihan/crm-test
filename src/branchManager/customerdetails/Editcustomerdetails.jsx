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
import EditCustomerDetailsForm from "./Editcustomersection";
import EditNomineeDetailsForm from "./EditNomineesection";
import EditPaymentDetailsForm from "./Editpaymentsection";
import EditPolicyDetailsForm from "./Editpolicysection";
import EditFamilymemeberForm from "./Editfamilymember";
import FormWizard from "react-form-wizard-component";

const EdituserModal = ({ toggle, userData, onUserUpdated }) => {
  const [formData, setFormData] = useState({
    name: userData?.name || "",
    email: userData?.email || "",
    contact: userData?.contact || "",
    aadhar_card_number: userData?.aadhar_card_number || "",
    pan_card_number: userData?.pan_card_number || "",
    gender: userData?.gender || "",
    dob: userData?.dob || "",
    occupation: userData?.occupation || "",
    policies: userData?.policies?.map((policy) => policy.status) || "",
    policy_ids: userData?.policies?.map((policy) => policy.id) || [], 
    health_condition: userData?.health_condition || "",
    father_name: userData?.father_name || "",
    mother_name: userData?.mother_name || "",
    guardian_name: userData?.guardian_name || "",
    nominees: userData?.nominees || "",
    payments: userData?.payments || "",
    start_date: userData?.start_date || "",
    address: userData?.address || "",
  });

   const [nomineeFormData, setNomineeFormData] = useState({
      name: "",
      relationship: "",
      phone_number: "",
      email: "",
      address: "",
      customer:""
    });

    const [CustomerdetailFormData, setCustomerdetailFormData] = useState({
        customer_id: "",
       
      });
      
     const [PolicyFormData, setPolicyFormData] = useState({
        policy_id: "",
        start_date: "",
        customer_id:""
      });
    
       const [familyData, setFamilyData] = useState({
          id: "",
          cutomer: "",
          name: "",
          relationship: "",
          dob: "",
          contact: "",
          email: "",
        });
      

 const [paymentData, setPaymentData] = useState({
      policy_id: '',
      customer: '',
      date: '',
      amount_paid: '',
      payment_method: '',
      payment_status: '',
      due_amount: '',
      next_due_date: '',
       notes:'',
      transaction_id:''
    });
console.log(paymentData);

  
  const [UserRole, setUserRole] = useState([])
  const [Userbranch, setUserbranch] = useState([])
  const [userpolicies, setuserpolicies] = useState([])
  const [usernominee, setusernominee] = useState([])
  const [userpayment, setuserpayment] = useState([])
  const [userpolicy, setuserpolicy] = useState([])
  const [userCustomer, setuserCustomer] = useState([])

  const [validationErrors, setValidationErrors] = useState({});


  console.log('formdata',formData);
  console.log('userdata',userData );
  console.log('policies',userpolicies);
console.log(userCustomer);

  // console.log('nomineedata props',userNominee);

  
  // Handle input field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "policy_ids") {
      // Ensure it's stored as an integer list
      setFormData((prev) => ({
        ...prev,
        [name]: [parseInt(value, 10)], // Convert value to an integer and store in a list
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  
  const fetchUsercustomer = async () => {
    try {
      const response = await allaxios.get(API_URL.CUSTOMER.GET_CUSTOMER, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      });
      setuserCustomer(response.data);
    } catch (error) {
      console.error("Error fetching policies:", error);
    }
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
  
  
   const addNominee = () => {
      if (!nomineeFormData.name || !nomineeFormData.relationship || !nomineeFormData.phone_number) {
        toast.error("Please fill all nominee fields.", { autoClose: 2000 });
        return;
      }
      setFormData((prev) => ({
        ...prev,
        nominees: [...prev.nominees, nomineeFormData],
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
    if (!formData.guardian_name) errors.guardian_name = "Guardian name is required.";

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
      const response = await allaxios.get(`${API_URL.USERS.GET_USERS}/${userId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      });
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
  
      console.log(filteredNominees[0]);
      
      // Set the filtered nominees to the state
      setusernominee(filteredNominees[0]);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  
  console.log(usernominee);
  
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
  
      
      console.log(filteredpayment[0]);
      
      // Set the filtered nominees to the state
      setuserpayment(filteredpayment[0]);
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
      // const response = await allaxios.patch(
      //   API_URL.CUSTOMER.PATCH_CUSTOMER(userData?.id), 
      //   formData,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
      //     },
      //   }
      // );
      // const customerId = response.data.id;
      // console.log('Customer ID:', customerId);
  
      // // Add the customer ID to the nomineeFormData
      // const updatedNomineeFormData = {
      //   ...nomineeFormData,
      //   customer: customerId, // Assuming the customer ID should go in the 'customer' field
      // };
  
      // // Second API call to create the nominee
      // const nomineeresponse = await allaxios.post(
      //   API_URL.NOMINEE.PATCH_NOMINEE(userData.id),
      //   updatedNomineeFormData,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
      //     },
      //   }
      // );

      if (nomineeFormData.customer) {
      
        const nomineeresponse = await allaxios.patch(
          API_URL.NOMINEE.PATCH_NOMINEE(usernominee.id), // Assuming PATCH endpoint uses user ID
          nomineeFormData,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
            },
          }
        );
        console.log("Nominee updated successfully:", nomineeresponse.data);
      } else {

        const customerId = CustomerdetailFormData.customer_id;
        const updatedNomineeFormData = {
          ...nomineeFormData,
          customer: customerId, // Assuming the customer ID should go in the 'customer' field
        };
    
        const nomineeresponse = await allaxios.post(
          API_URL.NOMINEE.POST_NOMINEE,
          updatedNomineeFormData,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
            },
          }
        );
        console.log("Nominee created successfully:", nomineeresponse.data);
      }

      // if (PolicyFormData.customer_id) {
      //   console.log(userpolicy);
      //   const Matchedpolicy = userpolicy.map((i)=>{
      //     return i.id
      //   })
      //   const policyresponse = await allaxios.patch(
      //     API_URL.POLICY.PATCH_POLICY(Matchedpolicy), // Assuming PATCH endpoint uses user ID
      //     PolicyFormData,
      //     {
      //       headers: {
      //         Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
      //       },
      //     }
      //   );
      //   console.log("Policy updated successfully:", policyresponse.data);
      // } else {

      //   const customerId = userData.id;
      //   const updatedPolicyFormData = {
      //     ...PolicyFormData,
      //     customer_id: customerId, // Assuming the customer ID should go in the 'customer' field
      //   };
    
      //   const policyresponse = await allaxios.post(
      //     API_URL.POLICY.POST_POLICY,
      //     updatedPolicyFormData,
      //     {
      //       headers: {
      //         Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
      //       },
      //     }
      //   );
      //   console.log("Policy created successfully:", policyresponse.data);
      // }
  
      if (paymentData.customer) {
        console.log('insidepatch payment',userpayment);
        const Matchedpayment = userpayment.map((i)=>{
          return i.id
        })
        const paymentresponse = await allaxios.patch(
          API_URL.PAYMENT.PATCH_PAYMENT(Matchedpayment), // Assuming PATCH endpoint uses user ID
          paymentData,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
            },
          }
        );
        console.log("Payment updated successfully:", paymentresponse.data);
      } else {

        const customerId = CustomerdetailFormData.customer_id;
        const updatedPaymentFormData = {
          ...paymentData,
          customer: customerId, // Assuming the customer ID should go in the 'customer' field
        };
    
        const paymentresponse = await allaxios.post(
          API_URL.PAYMENT.POST_PAYMENT,
          updatedPaymentFormData,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
            },
          }
        );
        console.log("Payment created successfully:", paymentresponse.data);
      }
  

      toast.success("Customer  updated successfully");
      
      
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
      name: userData.name || "",
      email: userData.email || "",
      contact: userData.contact || "",
      aadhar_card_number: userData.aadhar_card_number || "",
      pan_card_number: userData.pan_card_number || "",
      gender: userData.gender || "",
      dob: userData.dob || "",
      occupation: userData.occupation || "",
      policies: userData?.policies?.map((policy) => policy.status) || "",
      policy_ids: userData.policies?.map((policy) => policy.id) || [], 
      health_condition: userData.health_condition || "",
      father_name: userData.father_name || "",
      mother_name: userData.mother_name || "",
      guardian_name: userData.guardian_name || "",
      nominees: userData.nominees || "",
      payments: userData.payments || "",
      start_date: userData.start_date || "",
      address: userData.address || "",
      status: userData?.status || "",
    });
  }
}, [userData]);

useEffect(() => {
  if (usernominee) {
    // const nominee = usernominee.find((n) => n.customer === userData?.id);
    // console.log('nominee',nominee);
    
    if (usernominee) {
      setNomineeFormData({
        name: usernominee.name || "",
        relationship: usernominee.relationship || "",
        phone_number: usernominee.phone_number || "",
        email: usernominee.email || "",
        address: usernominee.address || "",
        customer: usernominee.customer || "",
      });
    }
  }
}, [usernominee, userData]);

console.log(userData);

useEffect(() => {
  if (userpayment) {
  
    
    if (userpayment) {
      setPaymentData({
      policy_id: userpayment.policies, // Assuming `policy_id` expects a single value or an array
      customer: userpayment.customer || "",
      date:userpayment.date || "",
      amount_paid: userpayment.amount_paid || "",
      payment_method: userpayment.payment_method || "",
      payment_status: userpayment.payment_status || "",
      due_amount: userpayment.due_amount || "",
      next_due_date: userpayment.next_due_date || "",
      notes:userpayment.notes || "",
      transaction_id:userpayment.transaction_id || ""
      });
    }
  }
}, [userpayment, userData]);


useEffect(() => {
  if (userpolicy && userpolicy.length > 0) {
    const policy = userpolicy.find((policy) => policy.customer_id === userData?.id);
    console.log('policy',policy);
    
    if (policy) {
      setPolicyFormData({
      policy_id: policy.policy_id , // Assuming `policy_id` expects a single value or an array
      customer: policy.customer_id || "",
      start_date:policy.start_date || "",
      
      });
    }
  }
}, [userpolicy, userData]);

useEffect(() => {
  if (userCustomer && userCustomer.length > 0) {
    const customer = userCustomer.find((customer) => customer.id === userData?.id);
    console.log('customer',customer);
    
    if (customer) {
      setCustomerdetailFormData({
      customer: customer.customer_id || "",
      
      });
    }
  }
}, [userCustomer, userData]);

console.log(CustomerdetailFormData.customer_id);


  useEffect(() => {
    fetchUserRole();
    fetchUserBranches();
    fetchUserData();
    fetchUserpolicies();
    fetchUsernominee();
    fetchUserPayment();
    fetchUserPolicy();
    fetchUsercustomer();
  }, []);

  const tabChanged = ({ prevIndex, nextIndex }) => {
    console.log("Moved from step", prevIndex, "to step", nextIndex);
  };

  console.log('edituser',userData);
  

  return (
    // <div>
  //   <Modal isOpen={true} toggle={toggle} size="lg">

  //     <ModalHeader toggle={toggle}>Edit Customer</ModalHeader>
  //     <ModalBody>
  //     <Form>
  //         <Row>
  //           <Col md={6}>
  //             <FormGroup>
  //               <Label for="name">Full Name</Label>
  //               <Input
  //                 id="name"
  //                 name="name"
  //                 placeholder="Enter name"
  //                 type="text"
  //                 value={formData.name}
  //                 onChange={handleInputChange}
  //                 invalid={!!validationErrors.name}

  //               />
  //         <FormFeedback>{validationErrors.name}</FormFeedback>

  //             </FormGroup>
  //           </Col>
  //           <Col md={6}>
  //             <FormGroup>
  //               <Label for="contact">Contact Number</Label>
  //               <Input
  //                 id="contact"
  //                 name="contact"
  //                 placeholder="Enter phone number"
  //                 type="number"
  //                 value={formData.contact}
  //                 onChange={handleInputChange}
  //                 invalid={!!validationErrors.contact}

  //               />
  //          <FormFeedback>{validationErrors.contact}</FormFeedback>

  //             </FormGroup>
  //           </Col>
  //         </Row>
  //         <Row>
  //           <Col md={6}>
  //             <FormGroup>
  //               <Label for="email">Email Address</Label>
  //               <Input
  //                 id="email"
  //                 name="email"
  //                 placeholder="Enter email"
  //                 type="email"
  //                 value={formData.email}
  //                 onChange={handleInputChange}
  //                 invalid={!!validationErrors.email}

  //               />
  //         <FormFeedback>{validationErrors.email}</FormFeedback>
  //             </FormGroup>
  //           </Col>
  //           <Col md={6}>
  //             <FormGroup>
  //               <Label for="aadhar_card_number">Aadhar Card Number</Label>
  //               <Input
  //                 id="aadhar_card_number"
  //                 name="aadhar_card_number"
  //                 placeholder="Enter Aadhar Card Number"
  //                 type="text"
  //                 value={formData.aadhar_card_number}
  //                 onChange={handleInputChange}
  //                 invalid={!!validationErrors.aadhar_card_number}

  //               />
  //       <FormFeedback>{validationErrors.aadhar_card_number}</FormFeedback>

  //             </FormGroup>
  //           </Col>
  //         </Row>
  //         <Row>
  //           <Col md={6}>
  //             <FormGroup>
  //               <Label for="pan_card_number">PAN Card Number</Label>
  //               <Input
  //                 id="pan_card_number"
  //                 name="pan_card_number"
  //                 placeholder="Enter PAN Card Number"
  //                 type="text"
  //                 value={formData.pan_card_number}
  //                 onChange={handleInputChange}
  //                 invalid={!!validationErrors.pan_card_number}

  //               />
  //         <FormFeedback>{validationErrors.pan_card_number}</FormFeedback>

  //             </FormGroup>
  //           </Col>
  //           <Col md={6}>
  //             <FormGroup>
  //               <Label for="gender">Gender</Label>
  //               <Input
  //                 id="gender"
  //                 name="gender"
  //                 type="select"
  //                 value={formData.gender}
  //                 onChange={handleInputChange}
  //                 invalid={!!validationErrors.gender}

  //               >
  //                 <option value="">Select Gender</option>
  //                 <option value="Male">Male</option>
  //                 <option value="Female">Female</option>
  //                 <option value="Other">Other</option>
  //               </Input>
  //             <FormFeedback>{validationErrors.pan_card_number}</FormFeedback>

  //             </FormGroup>
  //           </Col>
  //         </Row>
  //         <Row>
  //           <Col md={6}>
  //             <FormGroup>
  //               <Label for="policies">Policies</Label>
  //               <Input
  //                 id="policies"
  //                 name="policies"
  //                 type="select"
  //                 value={formData.policies}
  //                 onChange={handleInputChange}
  //                 invalid={!!validationErrors.gender}
  //               >
  //                 <option value="">Select Policy Status</option>
  //                 <option value="Active">Active</option>
  //                 <option value="Inactive">Inactive</option>
  //                 <option value="Cancelled">Cancelled</option>
  //               </Input>
  //               <FormFeedback>{validationErrors.gender}</FormFeedback>
  //             </FormGroup>
  //           </Col>
  //           <Col md={6}>
  //           <FormGroup>
  //   <Label for="policy_ids">Policy ID</Label>
  //   <Input
  //     id="policy_ids"
  //     name="policy_ids"
  //     type="select"
  //     value={formData.policy_ids[0] || ""} // Select the first policy ID or default
  //     onChange={handleInputChange}
  //     invalid={!!validationErrors.policy_ids}
  //   >
  //     <option value="">Select Policy</option>
  //     {userpolicies.map((policy) => (
  //       <option key={policy.id} value={policy.id}>
  //         {policy.policy_name}
  //       </option>
  //     ))}
  //   </Input>
  //   <FormFeedback>{validationErrors.policy_ids}</FormFeedback>
  // </FormGroup>
  //           </Col>
  //         </Row>
  //         <Row>
  //           <Col md={6}>
  //             <FormGroup>
  //               <Label for="dob">Date of Birth</Label>
  //               <Input
  //                 id="dob"
  //                 name="dob"
  //                 type="date"
  //                 value={formData.dob}
  //                 onChange={handleInputChange}
  //                 invalid={!!validationErrors.dob}

  //               />
  //           <FormFeedback>{validationErrors.dob}</FormFeedback>

  //             </FormGroup>
  //           </Col>
  //           <Col md={6}>
  //             <FormGroup>
  //               <Label for="occupation">Occupation</Label>
  //               <Input
  //                 id="occupation"
  //                 name="occupation"
  //                 placeholder="Enter Occupation"
  //                 type="text"
  //                 value={formData.occupation}
  //                 onChange={handleInputChange}
  //                 invalid={!!validationErrors.occupation}
  //               />

  //       <FormFeedback>{validationErrors.occupation}</FormFeedback>

  //             </FormGroup>
  //           </Col>
  //         </Row>
  //         <Row>
  //           <Col md={4}>
  //             <FormGroup>
  //               <Label for="health_condition">Health Condition</Label>
  //               <Input
  //                 id="health_condition"
  //                 name="health_condition"
  //                 placeholder="Enter Health Condition"
  //                 type="text"
  //                 value={formData.health_condition}
  //                 onChange={handleInputChange}
  //                 invalid={!!validationErrors.health_condition}

  //               />
  //          <FormFeedback>{validationErrors.health_condition}</FormFeedback>

  //             </FormGroup>
  //           </Col>
  //           <Col md={4}>
  //             <FormGroup>
  //               <Label for="payments">Payments</Label>
  //               <Input
  //                 id="payments"
  //                 name="payments"
  //                 placeholder="Enter Payments"
  //                 type="number"
  //                 value={formData.payments}
  //                 onChange={handleInputChange}
  //                 invalid={!!validationErrors.payments}

  //               />
  //        <FormFeedback>{validationErrors.payments}</FormFeedback>

  //             </FormGroup>
  //           </Col>
  //            <Col md={4}>
  //        <FormGroup>
  //          <Label for="status">Customer Status</Label>
  //         {/* <Field name="status" as="select" className="form-control">
  //           <option value="">Select Status</option>
  //           <option value="Active">Active</option>
  //           <option value="Deactivated" disabled>Deactivated</option>
  //         </Field> */}
  //          <Input
  //                 id="status"
  //                 name="status"
  //                 type="select"
  //                 value={formData.status}
  //                 onChange={handleInputChange}
  //                 invalid={!!validationErrors.status}

  //               >
  //           <option value="">Select Status</option>
  //           <option value="active">Active</option>
  //           <option value="deactivated" >Deactivated</option>
  //           {/* <option value="Cancelled">Cancelled</option> */}


  //               </Input>
  //               <FormFeedback>{validationErrors.status}</FormFeedback>

  //        {/* <ErrorMessage name="status" component="div" className="text-danger" /> */}
  //      </FormGroup>   
       
  //       </Col>
  //         </Row>
  //         <Row>
  //           <Col md={4}>
  //             <FormGroup>
  //               <Label for="father_name">Father's Name</Label>
  //               <Input
  //                 id="father_name"
  //                 name="father_name"
  //                 placeholder="Enter Father's Name"
  //                 type="text"
  //                 value={formData.father_name}
  //                 onChange={handleInputChange}
  //                 invalid={!!validationErrors.father_name}

  //               />
  //        <FormFeedback>{validationErrors.father_name}</FormFeedback>

  //             </FormGroup>
  //           </Col>
  //           <Col md={4}>
  //             <FormGroup>
  //               <Label for="mother_name">Mother's Name</Label>
  //               <Input
  //                 id="mother_name"
  //                 name="mother_name"
  //                 placeholder="Enter Mother's Name"
  //                 type="text"
  //                 value={formData.mother_name}
  //                 onChange={handleInputChange}
  //                 invalid={!!validationErrors.mother_name}

  //               />
  //          <FormFeedback>{validationErrors.mother_name}</FormFeedback>

  //             </FormGroup>
  //           </Col>
  //           <Col md={4}>
  //             <FormGroup>
  //               <Label for="guardian_name">Guardian's Name</Label>
  //               <Input
  //                 id="guardian_name"
  //                 name="guardian_name"
  //                 placeholder="Enter Guardian's Name"
  //                 type="text"
  //                 value={formData.guardian_name}
  //                 onChange={handleInputChange}
  //                 invalid={!!validationErrors.guardian_name}

  //               />
  //          <FormFeedback>{validationErrors.guardian_name}</FormFeedback>

  //             </FormGroup>
  //           </Col>
  //         </Row>
  //          <h5>Nominee Details</h5>
  //                  <Row>
  //                    <Col md={6}>
  //                      <FormGroup>
  //                        <Label for="nominee_name">Nominee Name</Label>
  //                        <Input
  //                          id="nominee_name"
  //                          name="name"
  //                          type="text"
  //                          value={nomineeFormData.name}
  //                          onChange={handleNomineeInputChange}
  //                        />
  //                      </FormGroup>
  //                    </Col>
  //                    <Col md={6}>
  //                    <FormGroup>
  //                   <Label for="relationship">relationship</Label>
  //                  {/* <Field name="status" as="select" className="form-control">
  //                    <option value="">Select Status</option>
  //                    <option value="Active">Active</option>
  //                    <option value="Deactivated" disabled>Deactivated</option>
  //                  </Field> */}
  //                   <Input
  //                          id="relationship"
  //                          name="relationship"
  //                          type="select"
  //                          value={nomineeFormData.relationship}
  //                          onChange={handleNomineeInputChange}
  //                          // invalid={!!validationErrors.status}
         
  //                        >
  //                    <option value="">Select relationship</option>
  //                    <option value="spouse">spouse</option>
  //                    <option value="parent" >parent</option>
  //                    <option value="child" >child</option>
  //                    <option value="other" >other</option>
         
  //                    {/* <option value="Cancelled">Cancelled</option> */}
         
         
  //                        </Input>
  //                        {/* <FormFeedback>{validationErrors.status}</FormFeedback> */}
         
  //                 {/* <ErrorMessage name="status" component="div" className="text-danger" /> */}
  //               </FormGroup>   
  //                    </Col>
  //                  </Row>
  //                  <Row>
  //                    <Col md={6}>
  //                      <FormGroup>
  //                        <Label for="phone_number">Phone Number</Label>
  //                        <Input
  //                          id="phone_number"
  //                          name="phone_number"
  //                          type="text"
  //                          value={nomineeFormData.phone_number}
  //                          onChange={handleNomineeInputChange}
  //                        />
  //                      </FormGroup>
  //                    </Col>
  //                    <Col md={6}>
  //                      <FormGroup>
  //                        <Label for="email">Email</Label>
  //                        <Input
  //                          id="email"
  //                          name="email"
  //                          type="email"
  //                          value={nomineeFormData.email}
  //                          onChange={handleNomineeInputChange}
  //                        />
  //                      </FormGroup>
  //                    </Col>
  //                  </Row>
  //                  <Row>
  //                    <Col md={12}>
  //                      <FormGroup>
  //                        <Label for="address">Address</Label>
  //                        <Input
  //                          id="address"
  //                          name="address"
  //                          type="textarea"
  //                          value={nomineeFormData.address}
  //                          onChange={handleNomineeInputChange}
  //                        />
  //                      </FormGroup>
  //                    </Col>
  //                  </Row>
  //       </Form>
  //     </ModalBody>
  //     <ModalFooter>
  //       <Button color="secondary" onClick={toggle}>
  //         Cancel
  //       </Button>
  //       <Button color="primary" onClick={handleFormSubmit}>
  //     Create
  //       </Button>{" "}
  //     </ModalFooter>
  //   {/* </div> */}
  //   </Modal>
<Modal isOpen={true} toggle={toggle} size="lg">
<div className="p-4">
  <h4>New Customer </h4>
  <FormWizard onComplete={handleFormSubmit} onTabChange={tabChanged}>
    <FormWizard.TabContent title="Customer Details" icon="ti-user">
      <EditCustomerDetailsForm
        formData={formData}
        setFormData={setCustomerdetailFormData}
        // handleChange={handleInputChange}
       
      />
    </FormWizard.TabContent>
    <FormWizard.TabContent title="Nominee Details" icon="ti-heart">
      <EditNomineeDetailsForm
        formData={nomineeFormData}
        setFormData={setNomineeFormData}
        handleChange={handleNomineeInputChange}

      />
    </FormWizard.TabContent>

    <FormWizard.TabContent title="Policy Details" icon="ti-file">
      <EditPolicyDetailsForm
        formData={PolicyFormData}
        setFormData={setPolicyFormData}
        handleChange={handlePolicyInputChange}
      />

    </FormWizard.TabContent>

    <FormWizard.TabContent title="Family member" icon="ti-users">
      <EditFamilymemeberForm
        formData={familyData}
        setFormData={setFamilyData}
        // handleChange={handlePolicyInputChange}
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
    {/* Add styles for icons */}
<style>{`
  @import url("https://cdn.jsdelivr.net/gh/lykmapipo/themify-icons@0.1.2/css/themify-icons.css");
`}</style>
</Modal>
  );
};

export default EdituserModal;
