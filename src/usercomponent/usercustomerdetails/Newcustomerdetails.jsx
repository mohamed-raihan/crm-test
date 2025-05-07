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

import FormWizard from "react-form-wizard-component";

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
    // address: "",
    status: "",
  });

  const [CustomerdetailFormData, setCustomerdetailFormData] = useState({
    customer_id: "",
    agent: "",
  });
  console.log(CustomerdetailFormData);

  // const [nomineeFormData, setNomineeFormData] = useState({
  //   name: "",
  //   relationship: "",
  //   phone_number: "",
  //   email: "",
  //   address: "",
  //   customer:""
  // });

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
    premium_amount: "",
    coverage_amount: "",
    total_premium_amount1: "",
    plan: "",
    plan_coverage: "",
  });

  const [taxPercentage, setTaxpercentage] = useState([]);

  console.log(formData);
  console.log(nomineeFormData);
  console.log(PolicyFormData);

  console.log(CustomerdetailFormData);

  const [paymentData, setPaymentData] = useState([
    {
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

      // Additional fields from the image
      EMI_amount: "",
      GCC_sum_insured: "",
      GHI_sum_insured: "",
      GPA_sum_insured: "",
      SI_date: "" || null,
      SI_flag: "",
      good_health_declaration: "",
      loan_tenure: "" || null,
    },
  ]);

  //prevent submit
  const [isSubmitting, setIsSubmitting] = useState(false);

  console.log(paymentData);

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

  const [premiumAmount, setPremiumAmount] = useState("");
  const [tax, setTax] = useState("");
  console.log(tax);

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
  const handleNomineeInputChange = (e) => {
    const { name, value } = e.target;
    setNomineeFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePaymentInputChange = (e) => {
    const { name, value } = e.target;

    // const formattedValue =
    // name === "date" && value
    //   ? new Date(value).toISOString().split("T")[0] // Format date to YYYY-MM-DD
    //   : value;

    setPaymentData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const handlePaymentInputChange = (index, e) => {
  //   const { name, value } = e.target;
  //   const updatedPayments = [...paymentData];

  //   if (name === "date") {
  //     // Convert the date to the correct format: YYYY-MM-DD
  //     const formattedDate = value
  //       ? new Date(value).toISOString().split("T")[0]
  //       : "";
  //     updatedPayments[index][name] = formattedDate;
  //   } else {
  //     updatedPayments[index][name] = value;
  //   }

  //   setPaymentData(updatedPayments);
  // };

  // const handlePolicyInputChange = (e) => {
  //   const { name, value } = e.target;

  //   const formattedValue =
  //   name === "start_date" && value
  //     ? new Date(value).toISOString().split("T")[0] // Format date to YYYY-MM-DD
  //     : value;

  //   setPolicyFormData((prev) => ({
  //     ...prev,
  //     [name]: formattedValue,
  //   }));

  //   const selectedPolicy = userpolicies.find((policy) => policy.id === parseInt(value));
  //   setSelectedPolicyDetails(selectedPolicy || null);
  // };

  // const handlePolicyInputChange = (index, event) => {
  //   const { name, value } = event.target;
  //   const updatedPolicies = [...PolicyFormData];
  //   updatedPolicies[index][name] = value;
  //   setPolicyFormData(updatedPolicies);
  // };

  // policy assign

  const fetchTax = async () => {
    try {
      const response = await allaxios.get(API_URL.TAX.GET_TAX);
      console.log(response);
      setTaxpercentage(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const calculateTotal = () => {
    const total = premiumAmount || 0;

    // Find the actual tax percentage from taxPercentage array using the selected tax id
    console.log(premiumAmount);
    console.log(tax);

    // const selectedTax = taxPercentage.find(
    //   (option) => option.id === parseInt(tax)
    // );

    const taxRate = tax ? parseFloat(tax) : 0;

    console.log(taxRate);

    if (taxRate > 0) {
      const baseAmount = total / (1 + taxRate / 100); // Calculate amount without tax
      console.log(baseAmount);

      const calculatedTax = total - baseAmount; // Calculate tax amount

      setPolicyFormData((prevData) => ({
        ...prevData,
        premium_amount: baseAmount.toFixed(2),
        tax_amount: calculatedTax.toFixed(2),
      }));
    } else {
      setPolicyFormData((prevData) => ({
        ...prevData,
        premium_amount: total.toFixed(2),
        tax_amount: "0.00",
      }));
    }
  };

  const handlePolicyInputChange = (e) => {
    const { name, value } = e.target;

    // Format the date correctly for "start_date"
    const formattedValue =
      name === "start_date" && value
        ? new Date(value).toISOString().split("T")[0] // Ensure YYYY-MM-DD format
        : value;

    // Update form state
    setPolicyFormData((prev) => ({
      ...prev,
      [name]: formattedValue, // Update only the specific field
    }));

    // Update selected policy details when the policy is changed
    if (name === "policy") {
      const selectedPolicy = userpolicies.find(
        (policy) => policy.id === Number(value)
      );
      setSelectedPolicyDetails(selectedPolicy || null);
    }

    if (name === "tax") {
      console.log(value);
      setTax(value);
      calculateTotal();
    }

    if (name === "total_premium_amount1") {
      console.log(parseFloat(value));

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

  //   const validateForm = () => {
  //     const errors = {};

  //     if (!formData.name) errors.name = "Full Name is required.";
  //     if (!formData.contact) {
  //       errors.contact = "Contact Number is required.";
  //     } else if (!/^\d{10}$/.test(formData.contact)) {
  //       errors.contact = "Contact Number must be 10 digits.";
  //     }
  //     if (!formData.email) {
  //       errors.email = "Email Address is required.";
  //     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
  //       errors.email = "Enter a valid email address.";
  //     } else if (usercustomer.some((user) => user.email === formData.email)) {
  //       errors.email = "This email address is already in use.";
  //     }

  //     if (!formData.aadhar_card_number) {
  //       errors.aadhar_card_number = "Aadhar Card Number is required.";
  //     } else if (formData.aadhar_card_number.length !== 12) {
  //       errors.aadhar_card_number = "Aadhar Card Number must be 12 digits.";
  //     }
  //     if (!formData.pan_card_number) {
  //       errors.pan_card_number = "PAN Card Number is required.";
  //     } else if (!/[A-Z]{5}[0-9]{4}[A-Z]{1}/.test(formData.pan_card_number)) {
  //       errors.pan_card_number = "Enter a valid PAN Card Number.";
  //     }
  //     if (!formData.gender) errors.gender = "Gender is required.";
  //     if (!formData.dob) errors.dob = "Date of Birth is required.";
  //     if (!formData.occupation) errors.occupation = "Occupation is required.";
  //     // if (!formData.policies) errors.policies = "Policy Status is required.";
  //     // if (!formData.policy_ids) errors.policy_ids = "Policy ID is required.";
  //     if (!formData.health_condition) {
  //       errors.health_condition = "Health Condition is required.";
  //     }
  //     // if (!formData.nominees) errors.nominees = "nominees is required.";
  //     if (!formData.mother_name) errors.mother_name = "Mother name is required.";
  //     if (!formData.father_name) errors.father_name = "Father name is required.";
  //     if (!formData.guardian_name) errors.guardian_name = "Guardian name is required.";

  //     if (!formData.payments) errors.payments = "Payments is required.";
  //     if (!formData.status) errors.status = "Status is required.";
  //     // if (!formData.address) errors.address = "Address is required.";

  //     setValidationErrors(errors);
  //     return Object.keys(errors).length === 0;
  //   };

  console.log(familyData);

  // const handleSubmit = async () => {
  //   // const formattedDate = dayjs(paymentData.date).format("YYYY-MM-DD");

  //   // if (!validateForm()) {
  //   //     toast.error("Please fill all required fields correctly.", {
  //   //       autoClose: 2000,
  //   //     });
  //   //     return;
  //   //   }

  //   try {
  //     //   const response = await allaxios.post(
  //     //     API_URL.CUSTOMER.POST_CUSTOMER,
  //     //     formData,
  //     //     {
  //     //       headers: {
  //     //         Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
  //     //       },
  //     //     }
  //     //   );

  //     const customerId = CustomerdetailFormData.customer_id;
  //     console.log("Customer ID:", customerId);

  //     //   Add the customer ID to the nomineeFormData
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

  //     if (nomineeFormData[0].name !== "") {
  //       for (let nominee of nomineeFormData) {
  //         const updatedNomineeFormData = { ...nominee, customer: customerId };

  //         console.log("Submitting Nominee:", updatedNomineeFormData);

  //         await allaxios.post(
  //           API_URL.NOMINEE.POST_NOMINEE,
  //           updatedNomineeFormData,
  //           {
  //             headers: {
  //               Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
  //             },
  //           }
  //         );

  //         console.log("Successfully added nominee:", nominee);
  //       }
  //     }

  //     console.log(customerId);

  //     const updatedPolicyData = {
  //       ...PolicyFormData,
  //       customer: customerId,
  //       agent: CustomerdetailFormData.agent,
  //     };
  //     console.log(updatedPolicyData);

  //     const policyResponse = await allaxios.post(
  //       API_URL.POLICY.POST_POLICY,
  //       updatedPolicyData,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
  //         },
  //       }
  //     );

  //     console.log("policy response", policyResponse);
  //     // for (let policy of PolicyFormData) {
  //     //   const updatedPolicyData = { ...policy, customer: customerId };

  //     //   console.log("Submitting Policy:", updatedPolicyData);

  //     //   const policyResponse = await allaxios.post(
  //     //     API_URL.POLICY.POST_POLICY,
  //     //     updatedPolicyData,
  //     //     {
  //     //       headers: {
  //     //         Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
  //     //       },
  //     //     }
  //     //   );

  //     //   console.log("Policy Response:", policyResponse.data);
  //     // }

  //     //family
  //     if (familyData) {
  //       for(const family of familyData){
  //         const updatedFamilyData = { ...family, customer: customerId };
  //       // setFamilyData(updatedFamilyData);

  //       console.log(updatedFamilyData);

  //       try {
  //         const familyResponse = await allaxios.post(
  //           API_URL.FAMILY_MEMBERS.POST_MEMBERS,
  //           updatedFamilyData
  //         );
  //         console.log("family", familyResponse);
  //       } catch (error) {
  //         console.error(error);
  //       }
  //       }
  //     }

  //     // Create Payment

  //     const updatedPaymentData = {
  //       ...paymentData,
  //       customer: customerId,
  //     };

  //     const paymentResponse = await allaxios.post(
  //       API_URL.PAYMENT.POST_PAYMENT,
  //       updatedPaymentData,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
  //         },
  //       }
  //     );

  //     console.log("Payment Response:", paymentResponse);

  //     // for (let payment of paymentData) {
  //     //   const updatedPayment = { ...payment, customer: customerId };
  //     //   const paymentResponse = await allaxios.post(
  //     //     API_URL.PAYMENT.POST_PAYMENT,
  //     //     updatedPayment,
  //     //     {
  //     //       headers: {
  //     //         Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
  //     //       },
  //     //     }
  //     //   );
  //     //   console.log("Payment Response:", paymentResponse.data);
  //     // }

  //     //  console.log('nominee response',nomineeresponse);

  //     // console.log('success',response.data);

  //     toast.success("Customer details created successfully!", {
  //       autoClose: 2000,
  //     });
  //     console.log("successfully added customer");
  //     // console.log(response.data);

  //     toggle();
  //   } catch (error) {
  //     console.log("error", error);

  //     toast.error("Error creating Customer. Check the fields", {
  //       autoClose: 2000,
  //     });
  //   }
  // };

  const handleSubmit = async () => {
    console.log(isSubmitting);

    if (isSubmitting) return; // prevent multiple submissions
    setIsSubmitting(true); // lock the button

    const errors = [];

    try {
      const customerId = CustomerdetailFormData.customer_id;
      console.log("Customer ID:", customerId);

      // Nominee Submission
      if (nomineeFormData[0].name !== "") {
        for (let nominee of nomineeFormData) {
          const updatedNomineeFormData = { ...nominee, customer: customerId };

          console.log("Submitting Nominee:", updatedNomineeFormData);

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
            console.error("Nominee API Error:", error);
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
        console.log("Submitting Policy:", updatedPolicyData);

        await allaxios.post(API_URL.POLICY.POST_POLICY, updatedPolicyData, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
          },
        });
      } catch (error) {
        console.error("Policy API Error:", error);
        errors.push({
          type: "policy",
          message: error.response?.data?.message || "Failed to add policy",
        });
      }

      // Family Data Submission
      if (familyData[0].first_name !== "") {
        for (const family of familyData) {
          const updatedFamilyData = { ...family, customer: customerId };

          console.log("Submitting Family Member:", updatedFamilyData);

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
            console.error("Family API Error:", error);
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

        console.log("Submitting Payment:", updatedPaymentData);

        await allaxios.post(API_URL.PAYMENT.POST_PAYMENT, updatedPaymentData, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
          },
        });
      } catch (error) {
        console.error("Payment API Error:", error);
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
        return;
      }

      // Success
      toast.success("Customer details created successfully!", {
        autoClose: 2000,
      });
      console.log("Successfully added customer");
      // setIsSubmitting(false);
      toggle();
    } catch (error) {
      console.error("Unexpected Error:", error);
      toast.error("Unexpected error occurred. Please try again.", {
        autoClose: 2000,
      });
    } 
    // finally {
    //   setIsSubmitting(false); // unlock the button
    // }
  };

  const tabChanged = ({ prevIndex, nextIndex }) => {
    console.log("Moved from step", prevIndex, "to step", nextIndex);

    if (prevIndex === 2 && nextIndex === 3 && !isNominee) {
      const now = Date.now();

      // Show toast only if not shown in the last second
      // if (!lastToastRef.current || now - lastToastRef.current > 1000) {
      //   toast.warning("You must have a nominee to submit the form.");
      //   lastToastRef.current = now;
      // }

      return; // Prevent tab change
    }

    setActiveTab(nextIndex); // Allow navigation
  };

  useEffect(() => {
    fetchUserRole();
    fetchUserBranches();
    fetchPolicies();
    fetchUserCustomer();
    // fetchTax();
  }, []);

  return (
    <Modal isOpen={true} toggle={toggle} size="lg">
      <div
        className="p-4 "
        style={{ height: "90vh", overflowY: "auto", scrollbarWidth: "thin" }}
      >
        <h4>New Customer </h4>
        <FormWizard
          activeStep={activeTab}
          onComplete={handleSubmit}
          onTabChange={tabChanged}
        >
          <FormWizard.TabContent title="Customer Details" icon="ti-user">
            <CustomerDetailsForm
              formData={CustomerdetailFormData}
              setFormData={setCustomerdetailFormData}
              // handleChange={handleInputChange}
            />
          </FormWizard.TabContent>
          <FormWizard.TabContent title="Nominee Details" icon="ti-heart">
            <NomineeDetailsForm
              formData={nomineeFormData}
              setFormData={setNomineeFormData}
              setIsnominee={setIsnominee}
            />
          </FormWizard.TabContent>

          <FormWizard.TabContent title="Policy Details" icon="ti-file">
            <PolicyDetailsForm
              formData={PolicyFormData}
              setFormData={setPolicyFormData}
              handleChange={handlePolicyInputChange}
              selectedpolicy={selectedPolicyDetails}
              calculateTotal={calculateTotal}
            />
          </FormWizard.TabContent>

          <FormWizard.TabContent title="Family Details" icon="fa fa-users">
            <FamilymemeberForm
              formData={familyData}
              setFormData={setFamilyData}
              handleChange={handlePolicyInputChange}
              selectedpolicy={selectedPolicyDetails}
            />
          </FormWizard.TabContent>

          <FormWizard.TabContent title="Payment Details" icon="ti-money">
            <PaymentDetailsForm
              formData={paymentData}
              setFormData={setPaymentData}
              handleChange={handlePaymentInputChange}
              selectedpolicy={PolicyFormData.policy}
            />
          </FormWizard.TabContent>
        </FormWizard>
      </div>

      <style>{`
  @import url("https://cdn.jsdelivr.net/gh/lykmapipo/themify-icons@0.1.2/css/themify-icons.css");
`}</style>
    </Modal>
  );
};

export default NewUserModal;
