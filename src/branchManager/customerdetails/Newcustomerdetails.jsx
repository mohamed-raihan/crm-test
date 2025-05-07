import React, { useEffect, useRef, useState } from "react";
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
import CustomerDetailsForm from "./Customersection";
import NomineeDetailsForm from "./Nomineesection";
import PaymentDetailsForm from "./Paymentsection";
import PolicyDetailsForm from "./Policysection";
import FamilymemeberForm from "./Familymembersection";

// Import the custom FormWizard component
import CustomFormWizard from "./customeFormwizard";

const NewUserModal = ({ toggle }) => {
  const [userrole, setUserRole] = useState([]);
  const [userbranch, setUserBranch] = useState([]);
  const [userpolicies, setUserPolicies] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [selectedPolicyDetails, setSelectedPolicyDetails] = useState(null);
  const [usercustomer, setUsercustomer] = useState([]);
  const [selectedpolicypayment, setselectedpolicypayment] = useState(null);
  const [isNominee, setIsnominee] = useState(false);

  const [activeTab, setActiveTab] = useState(0);
  const lastToastRef = useRef(null);

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
    nominees: [],
    payments: [],
    customer_policies: [],
    start_date: "",
    status: "",
  });

  const [CustomerdetailFormData, setCustomerdetailFormData] = useState({
    customer_id: "",
    agent: "",
  });

  const [nomineeFormData, setNomineeFormData] = useState([
    {
      name: "",
      relationship: "",
      phone_number: "",
      email: "",
      address: "",
      customer: "",
    },
  ]);

  const [PolicyFormData, setPolicyFormData] = useState({
    policy: "",
    start_date: "",
    customer: "",
    agent: "",
    tax_percentage: "",
    premium_amount1: "",
    coverage_amount1: "",
    total_premium_amount1: "",
    plan: "",
    plan_coverage: "",
  });

  const [taxPercentage, setTaxpercentage] = useState([]);

  const [paymentData, setPaymentData] = useState({
    policy_id: "",
    customer: "",
    transaction_date: "",
    amount_paid: "",
    payment_method: "",
    payment_status: "",
    due_amount: "",
    next_due_date: "",
    notes: "",
    transaction_id: "",
    EMI_amount: "",
    GCC_sum_insured: "",
    GHI_sum_insured: "",
    GPA_sum_insured: "",
    SI_date: null,
    SI_flag: "",
    good_health_declaration: "",
    loan_tenure: null,
  });

  const [familyData, setFamilyData] = useState([
    {
      id: "",
      cutomer: "",
      first_name: "",
      middle_name: "",
      last_name: "",
      relationship: "",
      dob: "",
      gender: "",
      contact: "",
      email: "",
      address1: "",
      address2: "",
      address3: "",
      district: "",
      pincode: "",
      pan_no: "",
      occupation: "",
    },
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [premiumAmount, setPremiumAmount] = useState("");
  const [tax, setTax] = useState("");

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "policy_ids") {
      setFormData((prev) => ({
        ...prev,
        [name]: [parseInt(value)],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handlePaymentInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchTax = async () => {
    try {
      const response = await allaxios.get(API_URL.TAX.GET_TAX);
      setTaxpercentage(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const calculateTotal = () => {
    const total = premiumAmount || 0;
    const taxRate = tax ? parseFloat(tax) : 0;

    if (taxRate > 0) {
      const baseAmount = total / (1 + taxRate / 100);
      const calculatedTax = total - baseAmount;

      setPolicyFormData((prevData) => ({
        ...prevData,
        total_premium_amount1: baseAmount.toFixed(2),
        tax_amount: calculatedTax.toFixed(2),
      }));
    } else {
      setPolicyFormData((prevData) => ({
        ...prevData,
        total_premium_amount1: total.toFixed(2),
        tax_amount: "0.00",
      }));
    }
  };

  const handlePolicyInputChange = (e) => {
    const { name, value } = e.target;

    const formattedValue =
      name === "start_date" && value
        ? new Date(value).toISOString().split("T")[0]
        : value;

    setPolicyFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));

    if (name === "policy") {
      const selectedPolicy = userpolicies.find(
        (policy) => policy.id === Number(value)
      );
      setSelectedPolicyDetails(selectedPolicy || null);
    }

    if (name === "tax_percentage") {
      setTax(value);
      calculateTotal();
    }

    if (name === "premium_amount1") {
      const premiumAmount = parseFloat(value) || 0;
      setPremiumAmount(premiumAmount);
      calculateTotal();
    }
  };

  const RELATIONSHIP_CHOICES = [
    { value: "spouse", label: "Spouse" },
    { value: "parent", label: "Parent" },
    { value: "child", label: "Child" },
    { value: "other", label: "Other" },
  ];

  // Validation functions for each tab
  const validateCustomerDetails = () => {
    if (!CustomerdetailFormData.customer_id) {
      toast.error("Please fill all required fields in Customer Details");
      return false;
    }
    return true;
  };

  console.log(userpolicies);
  
  const validateNomineeDetails = () => {
    // Nominee is optional, but if entered, validate required fields
    if (
      nomineeFormData[0].name &&
      (!nomineeFormData[0].relationship || !nomineeFormData[0].phone_number)
    ) {
      toast.error("Please complete all nominee details or leave them empty", {
        autoClose: 2000,
      });
      return false;
    }
    return true;
  };

  const validatePolicyDetails = () => {
    const { 
      policy: policyId, 
      start_date, 
      premium_amount1, 
      coverage_amount1, 
      total_premium_amount1, 
      plan_coverage 
    } = PolicyFormData;
  
    if (!policyId || !start_date) {
      toast.error("Please select policy type and start date", { autoClose: 2000 });
      return false;
    }
  
    // Find the selected policy in userpolicies array
    const selectedPolicy = userpolicies.find(p => p.id == policyId);
    
    console.log(userpolicies);
    
    if (!selectedPolicy) {
      toast.error("Invalid policy selected", { autoClose: 2000 });
      return false;
    }
  
    // Check if policy is hospicash (case insensitive)
    const isHospicash = selectedPolicy.policy_name.toLowerCase().includes("hospicash");
  
    if (isHospicash) {
      if (!plan_coverage) {
        toast.error("Please enter plan coverage for Hospicash policy", { autoClose: 2000 });
        return false;
      }
    } else {
      if (!premium_amount1 || !coverage_amount1 || !total_premium_amount1) {
        toast.error("Please fill all premium and coverage amount fields", { autoClose: 2000 });
        return false;
      }
    }
  
    return true;
  };
  console.log(PolicyFormData);

  const validateFamilyDetails = () => {
    // Family members are optional, but if entered, validate required fields
    if (
      familyData[0].first_name &&
      (!familyData[0].relationship ||
        !familyData[0].dob ||
        !familyData[0].gender)
    ) {
      toast.error(
        "Please complete all family member details or leave them empty",
        { autoClose: 2000 }
      );
      return false;
    }
    return true;
  };

  const validatePaymentDetails = () => {
    if (
      !paymentData.transaction_date ||
      !paymentData.amount_paid ||
      !paymentData.payment_method ||
      !paymentData.payment_status
    ) {
      toast.error("Please fill all required fields in Payment Details", {
        autoClose: 2000,
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const errors = [];

    try {
      const customerId = CustomerdetailFormData.customer_id;

      // Nominee Submission
      if (nomineeFormData[0].name !== "") {
        for (let nominee of nomineeFormData) {
          const updatedNomineeFormData = { ...nominee, customer: customerId };

          try {
            await allaxios.post(
              API_URL.NOMINEE.POST_NOMINEE,
              updatedNomineeFormData,
              {
                headers: {
                  Authorization: `Bearer ${sessionStorage.getItem(
                    "authToken"
                  )}`,
                },
              }
            );
          } catch (error) {
            errors.push({
              type: "nominee",
              message: error.response?.data?.message || "Failed to add nominee",
            });
            break;
          }
        }
      }

      // Policy Submission
      try {
        const updatedPolicyData = {
          ...PolicyFormData,
          customer: customerId,
          agent: CustomerdetailFormData.agent,
        };

        await allaxios.post(API_URL.POLICY.POST_POLICY, updatedPolicyData, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
          },
        });
      } catch (error) {
        errors.push({
          type: "policy",
          message: error.response?.data?.message || "Failed to add policy",
        });
      }

      // Family Data Submission
      if (familyData[0].first_name !== "") {
        for (const family of familyData) {
          const updatedFamilyData = { ...family, customer: customerId };

          try {
            await allaxios.post(
              API_URL.FAMILY_MEMBERS.POST_MEMBERS,
              updatedFamilyData,
              {
                headers: {
                  Authorization: `Bearer ${sessionStorage.getItem(
                    "authToken"
                  )}`,
                },
              }
            );
          } catch (error) {
            errors.push({
              type: "familymembers",
              message:
                error.response?.data?.message || "Failed to add family member",
            });
            break;
          }
        }
      }

      // Payment Submission
      try {
        const updatedPaymentData = {
          ...paymentData,
          customer: customerId,
        };

        await allaxios.post(API_URL.PAYMENT.POST_PAYMENT, updatedPaymentData, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
          },
        });
      } catch (error) {
        errors.push({
          type: "payments",
          message: error.response?.data?.message || "Failed to add payment",
        });
      }

      // Show error if any
      if (errors.length > 0) {
        const priorityOrder = [
          "policy",
          "payments",
          "familymembers",
          "nominee",
        ];
        const highestPriorityError = errors.sort(
          (a, b) =>
            priorityOrder.indexOf(a.type) - priorityOrder.indexOf(b.type)
        )[0];

        toast.error(highestPriorityError.message, { autoClose: 2000 });
        // setIsSubmitting(false);
        return;
      }

      // Success
      toast.success("Customer details created successfully!", {
        autoClose: 2000,
      });
      toggle();
    } catch (error) {
      console.error("Unexpected Error:", error);
      setIsSubmitting(false);
      toast.error("Unexpected error occurred. Please try again.", {
        autoClose: 2000,
      });
    }
  };

  useEffect(() => {
    fetchUserRole();
    fetchUserBranches();
    fetchPolicies();
    fetchUserCustomer();
  }, []);

  return (
    <Modal isOpen={true} toggle={toggle} size="lg">
      <div
        className="p-4"
        style={{ height: "90vh", overflowY: "auto", scrollbarWidth: "thin" }}
      >
        <h4>New Customer</h4>
        <CustomFormWizard activeTabIndex={activeTab} onComplete={handleSubmit}>
          <CustomFormWizard.TabContent
            title="Customer Details"
            icon="ti-user"
            validate={validateCustomerDetails}
          >
            <CustomerDetailsForm
              formData={CustomerdetailFormData}
              setFormData={setCustomerdetailFormData}
            />
          </CustomFormWizard.TabContent>

          <CustomFormWizard.TabContent
            title="Nominee Details"
            icon="ti-heart"
            validate={validateNomineeDetails}
          >
            <NomineeDetailsForm
              formData={nomineeFormData}
              setFormData={setNomineeFormData}
              setIsnominee={setIsnominee}
            />
          </CustomFormWizard.TabContent>

          <CustomFormWizard.TabContent
            title="Policy Details"
            icon="ti-file"
            validate={validatePolicyDetails}
          >
            <PolicyDetailsForm
              formData={PolicyFormData}
              setFormData={setPolicyFormData}
              handleChange={handlePolicyInputChange}
              selectedpolicy={selectedPolicyDetails}
              calculateTotal={calculateTotal}
            />
          </CustomFormWizard.TabContent>

          <CustomFormWizard.TabContent
            title="Family Details"
            icon="fa fa-users"
            validate={validateFamilyDetails}
          >
            <FamilymemeberForm
              formData={familyData}
              setFormData={setFamilyData}
              handleChange={handlePolicyInputChange}
              selectedpolicy={selectedPolicyDetails}
            />
          </CustomFormWizard.TabContent>

          <CustomFormWizard.TabContent
            title="Payment Details"
            icon="ti-money"
            validate={validatePaymentDetails}
          >
            <PaymentDetailsForm
              formData={paymentData}
              setFormData={setPaymentData}
              handleChange={handlePaymentInputChange}
              selectedpolicy={PolicyFormData.policy}
            />
          </CustomFormWizard.TabContent>
        </CustomFormWizard>
      </div>

      <style>{`
        @import url("https://cdn.jsdelivr.net/gh/lykmapipo/themify-icons@0.1.2/css/themify-icons.css");
      `}</style>
    </Modal>
  );
};

export default NewUserModal;
