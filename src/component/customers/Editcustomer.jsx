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
    policies: userData?.policies || "",
    policy_ids: userData?.policy_ids || "",
    health_condition: userData?.health_condition || "",
    father_name: userData?.father_name || "",
    mother_name: userData?.mother_name || "",
    guardian_name: userData?.guardian_name || "",
    nominees: userData?.nominees || "",
    payments: userData?.payments || "",
    start_date: userData?.start_date || "",
    address: userData?.address || "",
  });
  
  const [UserRole, setUserRole] = useState([])
  const [Userbranch, setUserbranch] = useState([])


  console.log('formdata',formData);
  console.log('userdata',userData);

  // Handle input field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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


  const handleFormSubmit = async () => {
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
      toast.success("Customer updated successfully");
      console.log("Customer updated successfully:", response.data);
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
      policies: userData.policies || "",
      policy_ids: userData.policy_ids || "",
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
    fetchUserRole();
    fetchUserBranches();
    fetchUserData();
  }, []);

  console.log('edituser',userData);
  

  return (
    <div>
      <ModalHeader toggle={toggle}>Edit Customer</ModalHeader>
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
                     <FormGroup>
                       <Label for="aadhar_card_number">Aadhar Card Number</Label>
                       <Input
                         id="aadhar_card_number"
                         name="aadhar_card_number"
                         placeholder="Enter Aadhar Card Number"
                         type="text"
                         value={formData.aadhar_card_number}
                         onChange={handleInputChange}
                       />
                     </FormGroup>
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
        <Button color="primary" onClick={handleFormSubmit}>
      Create
        </Button>{" "}
      </ModalFooter>
    </div>
  );
};

export default EdituserModal;
