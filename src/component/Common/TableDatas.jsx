import { fabClasses } from "@mui/material";
import { Button, FormGroup, Input, Label } from "reactstrap";

export const Branchcolumn = (viewtoggle, edittoggle, handleDelete) => [
  {
    name: "ID",
    selector: (row, index) => index + 1,
    // center: true,
    sortable: true,
    width: "70px",
  },
  {
    name: "Branch code",
    selector: (row) => row.branch_code,
    // center: true,
    sortable: true,
  },
  {
    name: "Branch name",
    selector: (row) => row.branch_name,
    // center: true,
    sortable: true,
  },
  {
    name: "Address",
    selector: (row) => row.address,
    // center: true,
    sortable: true,
  },
  {
    name: "Contact number",
    selector: (row) => row.contact,
    // center: true,
    sortable: true,
  },
  {
    name: "Email address",
    selector: (row) => row.email,
    // center: true,
    sortable: true,
  },
  {
    name: "Branch manager",
    selector: (row) => {
      const manager = row.users.find((user) => user.role === 2);
      return manager ? manager.name : "Manager not assigned";
    },
    // center: true,
    sortable: true,
    minWidth: "140px",
  },
  {
    name: "Action",
    selector: (row) => (
      <div className="justify-content-between">
        {/* <i style={{fontSize:"20px"}} class="fa-solid fa-eye" onClick={()=>viewtoggle(row)}></i> */}
        <i
          style={{ padding: "20px", fontSize: "20px" }}
          class="fa-solid fa-pencil"
          onClick={() => edittoggle(row)}
        ></i>
        <i
          onClick={() => handleDelete(row)}
          style={{ fontSize: "20px", color: "red" }}
          class="fa-solid fa-trash"
        ></i>
      </div>
    ),
    minWidth: "140px",
    // center: true,
    sortable: true,
  },
];

export const userTableColumn = (
  handleViewUser,
  handleEditUser,
  handledelete,
  handleToggleStatus,
  userrole,
  userbranch
) => [
  {
    name: "ID",
    selector: (row, index) => index + 1, // +1 to start from 1 instead of 0
    // center: true,
    sortable: true,
    width: "70px",
  },

  {
    name: "Name",
    selector: (row) => row.name,
    // center:true,
    sortable: true,
    width: "150px",
  },
  {
    name: "Contact number",
    selector: (row) => row.contact,
    // center:true,
    sortable: true,
    width: "150px",
  },
  {
    name: "Email address",
    selector: (row) => row.email,
    // center:true,
    sortable: true,
  },

  {
    name: "Job Type",
    selector: (row) => row.job_type,
    // center:true,
    sortable: true,
    width: "100px",
  },
  {
    name: " Role",
    selector: (row) => {
      const role = userrole.find((role) => role.id === row.role);
      return role ? role.name : "Unknown role";
    },
    // center: true,
    sortable: true,
  },

  {
    name: "Created Date",
    selector: (row) => row.created_date,
    // center: true,
    sortable: true,
    width: "140px",
  },
  {
    name: "Branch",
    selector: (row) => {
      const userBranch = userbranch.find((branch) => branch.id === row.branch);
      return userBranch ? userBranch.branch_name : "Unknown Branch";
    },
    // center: true,
    sortable: true,
    width: "100px",
  },
  {
    name: "Insentive target",
    selector: (row) => row.target,
    // center: true,
    sortable: true,
    width: "140px",
  },

  {
    name: "Status ",
    selector: (row) => row.status,
    // center: true,
    sortable: true,
    width: "100px",
  },

  // {
  //   name: ' Status ',
  //   selector: (row) => (
  //     <div style={{color:"blue"}}>
  //       <i
  //         className={`fa-solid fa-toggle-${row.status === 'active' ? 'on' : 'off'}`}
  //         onClick={() => handleToggleStatus(row)} // Pass the entire row to toggle the status
  //         style={{ cursor: 'pointer', fontSize: '24px' }}
  //       ></i>
  //     </div>
  //   ),
  // center: true,
  //   sortable: true,
  // },

  {
    name: "Action",
    selector: (row) => (
      <div className="justify-content-between">
        <i
          className={`fa-solid fa-toggle-${
            row.status === "active" ? "on" : "off"
          }`}
          onClick={() => handleToggleStatus(row)} // Pass the entire row to toggle the status
          style={{ cursor: "pointer", fontSize: "24px", color: "blue" }}
        ></i>
        <i
          style={{ fontSize: "15px", display: "none" }}
          class="fa-solid fa-eye"
          onClick={() => handleViewUser(row)}
        ></i>
        <i
          style={{ padding: "15px", fontSize: "20px" }}
          class="fa-solid fa-pencil"
          onClick={() => handleEditUser(row)} // Pass the row to the edit handler
        ></i>
        <i
          style={{ fontSize: "15px", color: "red", cursor: "pointer" }}
          className="fa-solid fa-trash"
          onClick={() => handledelete(row.id)}
        ></i>
      </div>
    ),
    width: "150px",
    center: true,
    sortable: true,
  },
];

export const CustomerAdminTableColumn = (
  handleViewUser,
  handleEditUser,
  handledelete,
  handleprofilenavigate,
  togglePolicyModal,
  showEditAction,
  userrole,
  userbranch,
  handleToggleStatus
) => [
  {
    name: "ID",
    selector: (row, index) => index + 1, // +1 to start from 1 instead of 0
    // center: true,
    sortable: true,
    width: "70px",
  },

  {
    name: "Customer Id",
    selector: (row) => row.customer_id,
    // center: true,
    sortable: true,
    width: "150px",
  },

  {
    name: "name",
    selector: (row) => row.name,
    // center:true,
    sortable: true,
    width: "150px",
  },
  {
    name: "Email address",
    selector: (row) => row.email,
    // center:true,
    sortable: true,
    width: "250px",
  },

  {
    name: "Contact number",
    selector: (row) => row.contact,
    // center:true,
    sortable: true,
    width: "150px",
  },
  {
    name: "Created by",
    selector: (row) => row.created_by.name,
    // center:true,
    sortable: true,
    width: "150px",
  },
  {
    name: "Created date",
    selector: (row) => row.created_date,
    // center:true,
    sortable: true,
    width: "150px",
  },

  {
    name: "Branch",
    selector: (row) => row.branch_name,
    // center:true,
    sortable: true,
    width: "150px",
  },

  {
    name: "Status ",
    selector: (row) => row.status,
    // center: true,
    sortable: true,
    width: "100px",
  },

  // {
  //   name: "Assign Policy",
  //   selector: (row) => (
  //     <i
  //       style={{ fontSize: "20px", color: "blue", cursor: "pointer" }}
  //       className="fa-solid fa-file"  // Changed from fa-key to fa-plus
  //       onClick={() => togglePolicyModal(row)} // Trigger the modal when clicked
  //     ></i>
  //   ),
  //   center: true,
  //   sortable: true,
  // },

  {
    name: "View",
    selector: (row) => (
      <div className="d-flex align-items-center">
        {/* <i
          style={{ fontSize: "20px", color: "black", cursor: "pointer" }}
          className="fa-solid fa-file m-3" // Changed from fa-key to fa-plus
          onClick={() => togglePolicyModal(row)} // Trigger the modal when clicked
        ></i> */}
        <i
          className={`fa-solid me-3 fa-toggle-${
            row.status === "active" ? "on" : "off"
          }`}
          onClick={() => handleToggleStatus(row)}
          style={{ cursor: "pointer", fontSize: "24px", color: "blue" }}
        ></i>

        <i
          style={{ fontSize: "15px" }}
          class="fa-solid fa-eye"
          onClick={() => handleprofilenavigate(row)}
        ></i>
        {/* {showEditAction && (
          <i
            style={{ padding: "15px", fontSize: "20px", cursor: "pointer" }}
            className="fa-solid fa-pencil"
            onClick={() => handleEditUser(row)}
          ></i>
        )} */}
        <i
          style={{
            fontSize: "15px",
            marginLeft: "15px",
            color: "red",
            cursor: "pointer",
          }}
          className="fa-solid fa-trash"
          onClick={() => handledelete(row.id)}
        ></i>
      </div>
    ),
    // center: true,
    width: "150px",
    sortable: true,
  },
];

export const CustomerreportcountColumn = (
  handleViewUser,
  handleEditUser,
  handledelete,
  handleprofilenavigate,
  togglePolicyModal,
  showEditAction,
  userrole,
  userbranch
) => [
  // {
  //   name: "id",
  //   selector: (row) => row.id,
  //   // center: true,
  //   sortable: true,
  //   width: "70px",
  // },
  {
    name: "Customer Id",
    selector: (row) => row.customer_id,
    // center: true,
    sortable: true,
    width: "150px",
  },

  {
    name: "Name",
    selector: (row) => row.name,
    // center:true,
    sortable: true,
    width: "150px",
  },
  {
    name: "Email address",
    selector: (row) => row.email,
    // center:true,
    sortable: true,
    width: "170px",
  },

  {
    name: "Contact number",
    selector: (row) => row.contact,
    // center:true,
    sortable: true,
    width: "150px",
  },

  {
    name: "Aadhar card number",
    selector: (row) => row.aadhar_card_number,
    // center: true,
    sortable: true,
    width: "170px",
  },
  {
    name: "Pan card number",
    selector: (row) => row.pan_card_number,
    // center: true,
    sortable: true,
    width: "150px",
  },
  {
    name: "Gender",
    selector: (row) => row.gender,
    // center: true,
    sortable: true,
    width: "150px",
  },
  {
    name: "Date of birth",
    selector: (row) => row.dob,
    // center: true,
    sortable: true,
    width: "150px",
  },
  {
    name: "Occupation",
    selector: (row) => row.occupation,
    // center: true,
    sortable: true,
    width: "150px",
  },
  {
    name: "Health condition",
    selector: (row) => row.health_condition,
    // center: true,
    sortable: true,
    width: "150px",
  },
  {
    name: "Father name",
    selector: (row) => row.father_name,
    // center: true,
    sortable: true,
    width: "150px",
  },
  {
    name: "Mother name",
    selector: (row) => row.mother_name,
    // center: true,
    sortable: true,
    width: "150px",
  },
  {
    name: "Guardian name",
    selector: (row) => row.guardian_name,
    // center: true,
    sortable: true,
    width: "150px",
  },
  {
    name: "Nominee name",
    selector: (row) =>
      row.nominees
        .map((nominee) => {
          return nominee.name;
        })
        .join(", "),
    // center: true,
    sortable: true,
    width: "150px",
  },
  {
    name: "Nominee Relationship",
    selector: (row) =>
      row.nominees
        .map((nominee) => {
          return nominee.relationship;
        })
        .join(", "),
    // center: true,
    sortable: true,
    width: "150px",
  },
  {
    name: "Nominee phone number",
    selector: (row) =>
      row.nominees
        .map((nominee) => {
          return nominee.phone_number;
        })
        .join(", "),
    // center: true,
    sortable: true,
    width: "150px",
  },
  {
    name: "Nominee Address",
    selector: (row) =>
      row.nominees
        .map((nominee) => {
          return nominee.address;
        })
        .join(", "),
    // center: true,
    sortable: true,
    width: "150px",
  },
  // {
  //   name: "Family member name",
  //   selector: (row) =>
  //     row.family_members
  //       .map((family_members) => {
  //         console.log(family_members.name);

  //         return family_members.name;
  //       })
  //       .join(", "),
  //   // center: true,
  //   sortable: true,
  //   width: "150px",
  // },
  // {
  //   name: "Relationship",
  //   selector: (row) =>
  //     row.family_members
  //       .map((family_members) => {
  //         console.log(family_members.relationship);

  //         return family_members.relationship;
  //       })
  //       .join(", "),
  //   // center: true,
  //   sortable: true,
  //   width: "150px",
  // },
  // {
  //   name: "Date of birth",
  //   selector: (row) =>
  //     row.family_members
  //       .map((family_members) => {
  //         console.log(family_members.dob);

  //         return family_members.dob;
  //       })
  //       .join(", "),
  //   // center: true,
  //   sortable: true,
  //   width: "150px",
  // },
  // {
  //   name: "Contact",
  //   selector: (row) =>
  //     row.family_members
  //       .map((family_members) => {
  //         console.log(family_members.contact);

  //         return family_members.contact;
  //       })
  //       .join(", "),
  //   // center: true,
  //   sortable: true,
  //   width: "150px",
  // },
  // {
  //   name: "Email",
  //   selector: (row) =>
  //     row.family_members
  //       .map((family_members) => {
  //         console.log(family_members.email);
  //         console.log(row);

  //         return family_members.contact;
  //       })
  //       .join(", "),
  //   // center: true,
  //   sortable: true,
  //   width: "150px",
  // },
  // {
  //   name: "Nominee name",
  //   selector: (row) =>
  //     row.family_members_nominees
  //       ?.map((family_members_nominees) => {
  //         console.log(row);

  //         console.log(family_members_nominees.nominees.name);

  //         return family_members_nominees.nominees.name;
  //       })
  //       .join(", "),
  //   // center: true,
  //   sortable: true,
  //   width: "150px",
  // },
  // {
  //   name: "Relationship",
  //   selector: (row) =>
  //     row.family_members_nominees
  //       ?.map((family_members_nominees) => {
  //         console.log(family_members_nominees.relationship);

  //         return family_members_nominees.relationship;
  //       })
  //       .join(", "),
  //   // center: true,
  //   sortable: true,
  //   width: "150px",
  // },
  // {
  //   name: "Phonenumber",
  //   selector: (row) =>
  //     row.family_members_nominees
  //       ?.map((family_members_nominees) => {
  //         console.log(family_members_nominees.phone_number);

  //         return family_members_nominees.phone_number;
  //       })
  //       .join(", "),
  //   // center: true,
  //   sortable: true,
  //   width: "150px",
  // },
  {
    name: "Policy name",
    selector: (row) =>
      row.customer_policies
        ?.map((customer_policies) => {
          return customer_policies.policy_name;
        })
        .join(", "),
    // center: true,
    sortable: true,
    width: "150px",
  },
  {
    name: "Policy category",
    selector: (row) =>
      row.customer_policies
        ?.map((customer_policies) => {
          return customer_policies.policy_category;
        })
        .join(", "),
    // center: true,
    sortable: true,
    width: "150px",
  },
  {
    name: "Policy Master",
    selector: (row) =>
      row.customer_policies
        ?.map((customer_policies) => {
          return customer_policies.policy_type;
        })
        .join(", "),
    // center: true,
    sortable: true,
    width: "150px",
  },
  {
    name: "agent",
    selector: (row) =>
      row.customer_policies
        ?.map((customer_policies) => {
          return customer_policies.agent;
        })
        .join(", "),
    // center: true,
    sortable: true,
    width: "150px",
  },
  {
    name: "Total premium amount",
    selector: (row) =>
      row.customer_policies
        ?.map((customer_policies) => {
          return customer_policies.total_amount;
        })
        .join(", "),
    // center: true,
    sortable: true,
    width: "150px",
  },
  {
    name: "paid amount",
    selector: (row) =>
      row.payments
        .map((payments) => {
          return payments.amount_paid;
        })
        .join(", "),
    // center: true,
    sortable: true,
    width: "150px",
  },
  {
    name: "Due amount ",
    selector: (row) =>
      row.payments
        .map((payments) => {
          return payments.balance;
        })
        .join(", "),
    // center: true,
    sortable: true,
    width: "150px",
  },
  {
    name: "Payment method",
    selector: (row) =>
      row.payments
        .map((payments) => {
          return payments.payment_method;
        })
        .join(", "),
    // center: true,
    sortable: true,
    width: "150px",
  },
  {
    name: "Payment status",
    selector: (row) =>
      row.payments
        .map((payments) => {
          return payments.payment_status;
        })
        .join(", "),
    // center: true,
    sortable: true,
    width: "150px",
  },
  // {
  //   name: "Balance",
  //   selector: (row) =>
  //     row.payments
  //       .map((payments) => {
  //         console.log(payments.balance);

  //         return payments.balance;
  //       })
  //       .join(", "),
  //   // center: true,
  //   sortable: true,
  //   width: "150px",
  // },
  {
    name: "Total paid amount",
    selector: (row) =>
      row.payments
        .map((payments) => {
          return payments.total_paid_amount;
        })
        .join(", "),
    // center: true,
    sortable: true,
    width: "150px",
  },
  {
    name: "Created by",
    selector: (row) => row.created_by.name,
    // center:true,
    sortable: true,
    width: "150px",
  },
  {
    name: "Created date",
    selector: (row) => row.created_date,
    // center:true,
    sortable: true,
    width: "150px",
  },

  {
    name: "Branch",
    selector: (row) => row.branch_name,
    // center:true,
    sortable: true,
    width: "130px",
  },

  {
    name: "Status ",
    selector: (row) => row.status,
    // center: true,
    sortable: true,
    width: "100px",
  },

  // {
  //   name: "Assign Policy",
  //   selector: (row) => (
  //     <i
  //       style={{ fontSize: "20px", color: "blue", cursor: "pointer" }}
  //       className="fa-solid fa-file"  // Changed from fa-key to fa-plus
  //       onClick={() => togglePolicyModal(row)} // Trigger the modal when clicked
  //     ></i>
  //   ),
  //   center: true,
  //   sortable: true,
  // },

  {
    name: "View",
    selector: (row) => (
      <div className="justify-content-between">
        {/* <i
          style={{ fontSize: "20px", color: "black", cursor: "pointer" }}
          className="fa-solid fa-file m-3" // Changed from fa-key to fa-plus
          onClick={() => togglePolicyModal(row)} // Trigger the modal when clicked
        ></i> */}

        <i
          style={{ fontSize: "15px" }}
          class="fa-solid fa-eye"
          onClick={() => handleprofilenavigate(row)}
        ></i>
        {/* {showEditAction && (
          <i
            style={{ padding: "15px", fontSize: "20px", cursor: "pointer" }}
            className="fa-solid fa-pencil"
            onClick={() => handleEditUser(row)}
          ></i>
        )} */}
        {/* <i
          style={{ fontSize: "15px", color: "red", cursor: "pointer" }}
          className="fa-solid fa-trash"
          onClick={() => handledelete(row.id)}
        ></i> */}
      </div>
    ),
    // center: true,
    width: "100px",
    sortable: true,
  },
];

export const hospicashCustomertablecolumn = (
  handleViewUser,
  handleEditUser,
  handledelete,
  handleprofilenavigate,
  togglePolicyModal,
  showEditAction,
  userrole,
  userbranch
) => [
  {
    name: "Loan Account Number",
    selector: (row) => row.customer_id,
    sortable: true,
    width: "150px",
  },
  {
    name: "Member Relation",
    selector: (row) => "E",
    sortable: true,
    width: "150px",
  },
  {
    name: "Title",
    selector: (row) => row.title,
    sortable: true,
    width: "100px",
  },
  {
    name: "First Name",
    selector: (row) => row.first_name,
    sortable: true,
    width: "150px",
  },
  {
    name: "Middle Name",
    selector: (row) => row.middle_name,
    sortable: true,
    width: "150px",
  },
  {
    name: "Last Name",
    selector: (row) => row.last_name,
    sortable: true,
    width: "150px",
  },
  {
    name: "Member DOB",
    selector: (row) => row.dob,
    sortable: true,
    width: "150px",
  },
  {
    name: "Gender",
    selector: (row) => row.gender,
    sortable: true,
    width: "100px",
  },
  {
    name: "Address 1",
    selector: (row) => row.address1,
    sortable: true,
    width: "200px",
  },
  {
    name: "Address 2",
    selector: (row) => row.address2,
    sortable: true,
    width: "200px",
  },
  {
    name: "Address 3",
    selector: (row) => row.address3,
    sortable: true,
    width: "200px",
  },
  {
    name: "District",
    selector: (row) => row.district,
    sortable: true,
    width: "150px",
  },
  {
    name: "Pincode",
    selector: (row) => row.pincode,
    sortable: true,
    width: "100px",
  },
  {
    name: "Email ID",
    selector: (row) => row.email,
    sortable: true,
    width: "200px",
  },
  {
    name: "Mobile",
    selector: (row) => row.contact,
    sortable: true,
    width: "150px",
  },
  {
    name: "PAN No",
    selector: (row) => row.pan_no,
    sortable: true,
    width: "150px",
  },
  {
    name: "Occupation",
    selector: (row) => row.occupation,
    sortable: true,
    width: "150px",
  },
  {
    name: "Nominee Name",
    selector: (row) => row.nominees[0]?.name,
    sortable: true,
    width: "150px",
  },
  {
    name: "Nominee Mobile",
    selector: (row) => row.nominees[0]?.phone_number,
    sortable: true,
    width: "150px",
  },
  {
    name: "Nominee Relation",
    selector: (row) => row.nominees[0]?.relationship,
    sortable: true,
    width: "150px",
  },
  {
    name: "Nominee Address",
    selector: (row) => row.nominees[0]?.address,
    sortable: true,
    width: "200px",
  },
  {
    name: "Nominee Appointee Name",
    selector: (row) => row.NomineeAppointeeName,
    sortable: true,
    width: "200px",
  },
  {
    name: "Transaction Date",
    selector: (row) => {
      try {
        if (!row.payments || row.payments.length === 0) {
          console.warn("No payment data found for row:", row);
          return "No payment data";
        }

        const matchingPolicy = row.payments.find(
          (policy) => policy.policy_name?.toLowerCase() === "hospicash"
        );

        return matchingPolicy?.transaction_date || "No transaction date";
      } catch (error) {
        console.error("Error in selector function:", error);
        return "Error fetching data";
      }
    },
    sortable: true,
    width: "150px",
  },

  {
    name: "Loan tenure",
    selector: (row) => {
      if (!row.payments || row.payments.length === 0) {
        return "No payment data";
      }

      const matchingPolicy = row.payments.find(
        (policy) => policy.policy_name?.toLowerCase() === "hospicash"
      );

      return matchingPolicy.loan_tenure || "No loan tenure";
    },
    sortable: true,
    width: "150px",
  },
  {
    name: "Good Health Declaration",
    selector: (row) => {
      if (row.health_condition.toLowerCase === "good") {
        return "Y";
      } else {
        return "Y";
      }
    },
    sortable: true,
    width: "200px",
  },
  {
    name: "GHI Sum Insured",
    selector: (row) => {
      if (!row.payments || row.payments.length === 0) {
        return "No payment data";
      }

      const matchingPolicy = row.payments.find(
        (policy) => policy.policy_name?.toLowerCase() === "hospicash"
      );

      return matchingPolicy.GHI_sum_insured || "";
    },
    sortable: true,
    width: "150px",
  },
  {
    name: "GPA Sum Insured",
    selector: (row) => {
      if (!row.payments || row.payments.length === 0) {
        return "No payment data";
      }

      const matchingPolicy = row.payments.find(
        (policy) => policy.policy_name?.toLowerCase() === "hospicash"
      );

      return matchingPolicy.GPA_sum_insured || "";
    },
    sortable: true,
    width: "150px",
  },
  {
    name: "GCC Sum Insured",
    selector: (row) => {
      if (!row.payments || row.payments.length === 0) {
        return "No payment data";
      }

      const matchingPolicy = row.payments.find(
        (policy) => policy.policy_name?.toLowerCase() === "hospicash"
      );

      return matchingPolicy.GCC_sum_insured || "";
    },
    sortable: true,
    width: "150px",
  },
  {
    name: "EMI Amount",
    selector: (row) => {
      if (!row.payments || row.payments.length === 0) {
        return "No payment data";
      }

      const matchingPolicy = row.payments.find(
        (policy) => policy.policy_name?.toLowerCase() === "hospicash"
      );

      return matchingPolicy.EMI_amount || "";
    },
    sortable: true,
    width: "150px",
  },
  {
    name: "Branch Code",
    selector: (row) => "KANNATTU",
    sortable: true,
    width: "150px",
  },
  {
    name: "SI Flag",
    selector: (row) => {
      if (!row.payments || row.payments.length === 0) {
        return "No payment data";
      }

      const matchingPolicy = row.payments.find(
        (policy) => policy.policy_name?.toLowerCase() === "hospicash"
      );

      return matchingPolicy.SI_flag || "";
    },
    sortable: true,
    width: "150px",
  },
  {
    name: "SI Date",
    selector: (row) => {
      if (!row.payments || row.payments.length === 0) {
        return "No payment data";
      }

      const matchingPolicy = row.payments.find(
        (policy) => policy.policy_name?.toLowerCase() === "hospicash"
      );

      return matchingPolicy.SI_date || "";
    },
    sortable: true,
    width: "150px",
  },
  {
    name: "Total Premium Collected",
    selector: (row) => {
      if (!row.payments || row.payments.length === 0) {
        return "No payment data";
      }

      const matchingPolicy = row.payments.find(
        (policy) => policy.policy_name?.toLowerCase() === "hospicash"
      );

      return matchingPolicy.total_paid_amount || "";
    },
    sortable: true,
    width: "200px",
  },
  {
    name: "View",
    selector: (row) => (
      <div className="justify-content-between">
        {/* <i
          style={{ fontSize: "20px", color: "black", cursor: "pointer" }}
          className="fa-solid fa-file m-3" // Changed from fa-key to fa-plus
          onClick={() => togglePolicyModal(row)} // Trigger the modal when clicked
        ></i> */}

        <i
          style={{ fontSize: "15px" }}
          class="fa-solid fa-eye"
          onClick={() => handleprofilenavigate(row)}
        ></i>
        {/* {showEditAction && (
          <i
            style={{ padding: "15px", fontSize: "20px", cursor: "pointer" }}
            className="fa-solid fa-pencil"
            onClick={() => handleEditUser(row)}
          ></i>
        )} */}
        {/* <i
          style={{ fontSize: "15px", color: "red", cursor: "pointer" }}
          className="fa-solid fa-trash"
          onClick={() => handledelete(row.id)}
        ></i> */}
      </div>
    ),
    // center: true,
    width: "100px",
    sortable: true,
  },
];

export const hospicashFamilymember = (data) => [
  // {
  //   name: "Loan Account Number",
  //   selector: (row) => "",
  //   sortable: true,
  //   width: "150px",
  // },
  {
    name: "Member Relation",
    selector: (row) => row.relationship,
    sortable: true,
    width: "150px",
  },
  {
    name: "Title",
    selector: (row) => row.title,
    sortable: true,
    width: "100px",
  },
  {
    name: "First Name",
    selector: (row) => row.first_name,
    sortable: true,
    width: "150px",
  },
  {
    name: "Middle Name",
    selector: (row) => row.middle_name,
    sortable: true,
    width: "150px",
  },
  {
    name: "Last Name",
    selector: (row) => row.last_name,
    sortable: true,
    width: "150px",
  },
  {
    name: "Member DOB",
    selector: (row) => {
      const date = new Date(row.dob);
      const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is 0-indexed
      const day = String(date.getDate()).padStart(2, '0');
      const year = date.getFullYear();
      return `${month}/${day}/${year}`;
    },
    sortable: true,
    width: "150px",
  },
  {
    name: "Gender",
    selector: (row) => row.gender,
    sortable: true,
    width: "100px",
  },
  {
    name: "Address 1",
    selector: (row) => row.address1,
    sortable: true,
    width: "200px",
  },
  {
    name: "Address 2",
    selector: (row) => row.address2,
    sortable: true,
    width: "200px",
  },
  {
    name: "Address 3",
    selector: (row) => row.address3,
    sortable: true,
    width: "200px",
  },
  {
    name: "District",
    selector: (row) => row.district,
    sortable: true,
    width: "150px",
  },
  {
    name: "Pincode",
    selector: (row) => row.pincode,
    sortable: true,
    width: "100px",
  },
  {
    name: "Email ID",
    selector: (row) => row.email,
    sortable: true,
    width: "200px",
  },
  {
    name: "Mobile",
    selector: (row) => row.contact,
    sortable: true,
    width: "150px",
  },
  {
    name: "PAN No",
    selector: (row) => row.pan_no,
    sortable: true,
    width: "150px",
  },
  {
    name: "Occupation",
    selector: (row) => row.occupation,
    sortable: true,
    width: "150px",
  },
  {
    name: "Nominee Name",
    selector: (row) => data.nominees[0]?.name,
    sortable: true,
    width: "150px",
  },
  {
    name: "Nominee Mobile",
    selector: (row) => data.nominees[0]?.phone_number,
    sortable: true,
    width: "150px",
  },
  {
    name: "Nominee Relation",
    selector: (row) => data.nominees[0]?.relationship,
    sortable: true,
    width: "150px",
  },
  {
    name: "Nominee Address",
    selector: (row) => data.nominees[0]?.address,
    sortable: true,
    width: "200px",
  },
  {
    name: "Nominee Appointee Name",
    selector: (row) => data.NomineeAppointeeName,
    sortable: true,
    width: "200px",
  },
  {
    name: "Transaction Date",
    selector: (row) => {
      try {
        if (!data.payments || data.payments.length === 0) {
          console.warn("No payment data found for row:");
          return "No payment data";
        }

        data.payments.forEach((policy, index) => {});

        const matchingPolicy = data.payments.find(
          (policy) => policy.policy_name?.toLowerCase() === "hospicash"
        );

        return matchingPolicy?.transaction_date || "No transaction date";
      } catch (error) {
        console.error("Error in selector function:", error);
        return "Error fetching data";
      }
    },
    sortable: true,
    width: "150px",
  },

  {
    name: "Loan tenure",
    selector: (row) => {
      if (!data.payments || data.payments.length === 0) {
        return "No payment data";
      }

      const matchingPolicy = data.payments.find(
        (policy) => policy.policy_name?.toLowerCase() === "hospicash"
      );

      return matchingPolicy.loan_tenure || "No loan tenure";
    },
    sortable: true,
    width: "150px",
  },
  {
    name: "Good Health Declaration",
    selector: (row) => {
      if (data.health_condition.toLowerCase === "good") {
        return "Y";
      } else {
        return "Y";
      }
    },
    sortable: true,
    width: "200px",
  },
  {
    name: "GHI Sum Insured",
    selector: (row) => {
      if (!data.payments || data.payments.length === 0) {
        return "No payment data";
      }

      const matchingPolicy = data.payments.find(
        (policy) => policy.policy_name?.toLowerCase() === "hospicash"
      );

      return matchingPolicy.GHI_sum_insured || "";
    },
    sortable: true,
    width: "150px",
  },
  {
    name: "GPA Sum Insured",
    selector: (row) => {
      if (!data.payments || data.payments.length === 0) {
        return "No payment data";
      }

      const matchingPolicy = data.payments.find(
        (policy) => policy.policy_name?.toLowerCase() === "hospicash"
      );

      return matchingPolicy.GPA_sum_insured || "";
    },
    sortable: true,
    width: "150px",
  },
  {
    name: "GCC Sum Insured",
    selector: (row) => {
      if (!data.payments || data.payments.length === 0) {
        return "No payment data";
      }

      const matchingPolicy = data.payments.find(
        (policy) => policy.policy_name?.toLowerCase() === "hospicash"
      );

      return matchingPolicy.GCC_sum_insured || "";
    },
    sortable: true,
    width: "150px",
  },
  {
    name: "EMI Amount",
    selector: (row) => {
      if (!data.payments || data.payments.length === 0) {
        return "No payment data";
      }

      const matchingPolicy = data.payments.find(
        (policy) => policy.policy_name?.toLowerCase() === "hospicash"
      );

      return matchingPolicy.EMI_amount || "";
    },
    sortable: true,
    width: "150px",
  },
  {
    name: "Branch Code",
    selector: (row) => data.branch_code,
    sortable: true,
    width: "150px",
  },
  {
    name: "SI Flag",
    selector: (row) => {
      if (!data.payments || data.payments.length === 0) {
        return "No payment data";
      }

      const matchingPolicy = data.payments.find(
        (policy) => policy.policy_name?.toLowerCase() === "hospicash"
      );

      return matchingPolicy.SI_flag || "";
    },
    sortable: true,
    width: "150px",
  },
  {
    name: "SI Date",
    selector: (row) => {
      if (!data.payments || data.payments.length === 0) {
        return "No payment data";
      }

      const matchingPolicy = data.payments.find(
        (policy) => policy.policy_name?.toLowerCase() === "hospicash"
      );

      return matchingPolicy.SI_date || "";
    },
    sortable: true,
    width: "150px",
  },
  // {
  //   name: "Total Premium Collected",
  //   selector: (row) => {
  //     if (!data.payments || data.payments.length === 0) {
  //       return "No payment data";
  //     }

  //     const matchingPolicy = data.payments.find(
  //       (policy) => policy.policy_name?.toLowerCase() === "hospicash"
  //     );

  //     return matchingPolicy.total_paid_amount || "";
  //   },
  //   sortable: true,
  //   width: "200px",
  // },
];

export const CustomerTableColumn = (
  handleViewUser,
  handleEditUser,
  handledelete,
  handleprofilenavigate,
  togglePolicyModal,
  showEditAction,
  userrole,
  userbranch
) => [
  {
    name: "ID",
    selector: (row, index) => index + 1, // +1 to start from 1 instead of 0
    // center: true,
    sortable: true,
    width: "70px",
  },

  {
    name: "First name",
    selector: (row) => row.first_name,
    // center:true,
    sortable: true,
    width: "140px",
  },
  {
    name: "Middle name",
    selector: (row) => row.middle_name,
    // center:true,
    sortable: true,
    width: "140px",
  },
  {
    name: "Last name",
    selector: (row) => row.last_name,
    // center:true,
    sortable: true,
    width: "140px",
  },
  {
    name: "Email address",
    selector: (row) => row.email,
    // center:true,
    sortable: true,
    width: "180px",
  },

  {
    name: "Contact number",
    selector: (row) => row.contact,
    // center:true,
    sortable: true,
  },
  {
    name: "Created by",
    selector: (row) => row.created_by.name,
    // center:true,
    sortable: true,
    width: "150px",
  },
  {
    name: "Created date",
    selector: (row) => row.created_date,
    // center:true,
    sortable: true,
    width: "150px",
  },

  {
    name: "Status ",
    selector: (row) => row.status,
    // center: true,
    sortable: true,
    width: "100px",
  },

  // {
  //   name: "Assign Policy",
  //   selector: (row) => (
  //     <i
  //       style={{ fontSize: "20px", color: "blue", cursor: "pointer" }}
  //       className="fa-solid fa-file"  // Changed from fa-key to fa-plus
  //       onClick={() => togglePolicyModal(row)} // Trigger the modal when clicked
  //     ></i>
  //   ),
  //   center: true,
  //   sortable: true,
  // },

  {
    name: "Action",
    selector: (row) => (
      <div className="justify-content-between">
        <i
          style={{ fontSize: "20px", color: "black", cursor: "pointer" }}
          className="fa-solid fa-file m-3" // Changed from fa-key to fa-plus
          onClick={() => togglePolicyModal(row)} // Trigger the modal when clicked
        ></i>

        <i
          style={{ fontSize: "15px" }}
          class="fa-solid fa-eye"
          onClick={() => handleprofilenavigate(row)}
        ></i>
        {showEditAction && (
          <i
            style={{ padding: "15px", fontSize: "20px", cursor: "pointer" }}
            className="fa-solid fa-pencil"
            onClick={() => handleEditUser(row)}
          ></i>
        )}
        {/* <i
          style={{ fontSize: "15px", color: "red", cursor: "pointer" }}
          className="fa-solid fa-trash"
          onClick={() => handledelete(row.id)}
        ></i> */}
      </div>
    ),
    center: true,
    width: "150px",
    sortable: true,
  },
];

export const CompanyCustomerTableColumn = (handleProfileNavigate,company_name) => [
  {
    name: "ID",
    selector: (row, index) => index + 1, // Start from 1 instead of 0
    sortable: true,
    width: "70px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width: "180px",
  },
  {
    name: "Email",
    selector: (row) => row.email,
    sortable: true,
    width: "150px",
  },
  {
    name: "Contact Number",
    selector: (row) => row.contact,
    sortable: true,
    width: "150px",
  },
  {
    name: "Policy",
    selector: (row) => {
      const matchedPolicy = row.customer_policies.find(
        (policy) => policy.company_name === company_name
      );
      return matchedPolicy ? matchedPolicy.policy_name : "No policy";
    },
    sortable: true,
    width: "150px",
  },
  {
    name: "Policy amount",
    selector: (row) => {
      const matchedPolicy = row.customer_policies.find(
        (policy) => policy.company_name === company_name
      );
      if (!matchedPolicy) return "Not applicable";
      return matchedPolicy.policy_name?.toLowerCase() === "hospicash"
        ? matchedPolicy.plan_coverage?.premium_amount
        : matchedPolicy.premium_amount1;
    },
    sortable: true,
    width: "130px",
  },
  {
    name: "Sum insured",
    selector: (row) => {
      const matchedPolicy = row.customer_policies.find(
        (policy) => policy.company_name === company_name
      );
      if (!matchedPolicy) return "Not applicable";
      return matchedPolicy.policy_name?.toLowerCase() === "hospicash"
        ? matchedPolicy.plan_coverage?.coverage_amount
        : matchedPolicy.coverage_amount1;
    },
    sortable: true,
    width: "130px",
  },
  {
    name: "Paid amount",
    selector: (row) =>
      row.payments[0].policy_name
        ? row.payments[0].total_paid_amount
        : "No policy",
    sortable: true,
    width: "130px",
  },
  // {
  //   name: "Due amount",
  //   selector: (row) =>
  //     row.payments[0].policy_name ? row.payments[0].balance : "No policy",
  //   sortable: true,
  //   width: "130px",
  // },
  {
    name: "Created by",
    selector: (row) => row.created_by.name,
    sortable: true,
    width: "150px",
  },
  {
    name: "Created date",
    selector: (row) => row.created_date,
    sortable: true,
    width: "150px",
  },
  {
    name: "Status",
    selector: (row) => row.status,
    sortable: true,
  },

  {
    name: "Action",
    cell: (row) => (
      <Button
        color="primary"
        size="sm"
        onClick={() => handleProfileNavigate(row)} // Call function on click
      >
        View
      </Button>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];

export const CategoryCustomerTableColumn = () => [
  {
    name: "ID",
    selector: (row, index) => index + 1, // Start from 1 instead of 0
    sortable: true,
    width: "70px",
  },
  {
    name: "Customer id",
    selector: (row) => row.customer_id,
    sortable: true,
    width: "180px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width: "180px",
  },
  {
    name: "Email Address",
    selector: (row) => row.email,
    sortable: true,
    width: "180px",
  },
  {
    name: "Contact Number",
    selector: (row) => row.contact,
    sortable: true,
    width: "150px",
  },
  {
    name: "Branch",
    selector: (row) => row.branch_name || "Unknown",
    sortable: true,
    width: "150px",
  },
  {
    name: "Created by",
    selector: (row) => row.created_by.name,
    sortable: true,
    width: "150px",
  },
  {
    name: "Created date",
    selector: (row) => row.created_date,
    sortable: true,
    width: "150px",
  },
  {
    name: "Status",
    selector: (row) => row.status,
    sortable: true,
    width: "100px",
  },
];

export const BranchCustomercountTableColumn = () => [
  {
    name: "ID",
    selector: (row, index) => index + 1, // Start from 1 instead of 0
    sortable: true,
    width: "70px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width: "180px",
  },
  {
    name: "Email Address",
    selector: (row) => row.email,
    sortable: true,
    width: "180px",
  },
  {
    name: "Contact Number",
    selector: (row) => row.contact,
    sortable: true,
    width: "150px",
  },
  {
    name: "Policy",
    selector: (row) =>
      row.customer_policies[0]?.policy_name
        ? row.customer_policies[0].policy_name
        : "No policy",
    sortable: true,
    width: "130px",
  },
  {
    name: "Total amount",
    selector: (row) =>
      row.customer_policies[0]?.policy_name
        ? row.customer_policies[0].plan_coverage.premium_amount
        : "No policy",
    sortable: true,
    width: "130px",
  },
  {
    name: "Company",
    selector: (row) =>
      row.customer_policies[0]?.policy_name
        ? row.customer_policies[0].company_name
        : "No policy",
    sortable: true,
    width: "130px",
  },
  {
    name: "Category",
    selector: (row) =>
      row.customer_policies[0]?.policy_name
        ? row.customer_policies[0].policy_category_name
        : "No policy",
    sortable: true,
    width: "130px",
  },
  {
    name: "Created by",
    selector: (row) => row.created_by.name,
    // center:true,
    sortable: true,
    width: "120px",
  },
  {
    name: "Created date",
    selector: (row) => row.created_date,
    // center:true,
    sortable: true,
    width: "150px",
  },
  {
    name: "Status",
    selector: (row) => row.status,
    sortable: true,
  },
];

export const CustomerBranchTableColumn = (
  handleEditUser
  // handledelete,
  // handleprofilenavigate,
  // togglePolicyModal,
  // showEditAction,
  // userrole,
  // userbranch
) => [
  {
    name: "ID",
    selector: (row, index) => index + 1, // +1 to start from 1 instead of 0
    // center: true,
    sortable: true,
    width: "70px",
  },

  {
    name: "name",
    selector: (row) => row.name,
    // center:true,
    sortable: true,
    width: "140px",
  },
  {
    name: "Email address",
    selector: (row) => row.email,
    // center:true,
    sortable: true,
  },

  {
    name: "Contact number",
    selector: (row) => row.contact,
    // center:true,
    sortable: true,
  },

  {
    name: "Created by",
    selector: (row) => row.created_by.name,
    // center:true,
    sortable: true,
    width: "150px",
  },
  {
    name: "Created date",
    selector: (row) => row.created_date,
    // center:true,
    sortable: true,
    width: "150px",
  },

  {
    name: "Status ",
    selector: (row) => row.status,
    // center: true,
    sortable: true,
  },

  // {
  //   name: "Assign Policy",
  //   selector: (row) => (
  //     <i
  //       style={{ fontSize: "20px", color: "blue", cursor: "pointer" }}
  //       className="fa-solid fa-file"  // Changed from fa-key to fa-plus
  //       onClick={() => togglePolicyModal(row)} // Trigger the modal when clicked
  //     ></i>
  //   ),
  //   center: true,
  //   sortable: true,
  // },

  {
    name: "Action",
    selector: (row) => (
      <div className="justify-content-between">
        {/* <i
          style={{ fontSize: "20px", color: "black", cursor: "pointer" }}
          className="fa-solid fa-file m-3" // Changed from fa-key to fa-plus
          onClick={() => togglePolicyModal(row)} // Trigger the modal when clicked
        ></i>

        <i
          style={{ fontSize: "15px" }}
          class="fa-solid fa-eye"
          onClick={() => handleprofilenavigate(row)}
        ></i> */}
        <i
          style={{ padding: "15px", fontSize: "20px", cursor: "pointer" }}
          className="fa-solid fa-pencil"
          onClick={() => handleEditUser(row)}
        ></i>

        {/* <i
          style={{ fontSize: "15px", color: "red", cursor: "pointer" }}
          className="fa-solid fa-trash"
          onClick={() => handledelete(row.id)}
        ></i> */}
      </div>
    ),
    center: true,
    sortable: true,
  },
];

export const CustomeruserTableColumn = (
  handleViewUser,
  handleEditUser,
  handledelete,
  handleprofilenavigate,
  togglePolicyModal,
  showEditAction,
  userrole,
  userbranch
) => [
  {
    name: "ID",
    selector: (row, index) => index + 1, // +1 to start from 1 instead of 0
    // center: true,
    sortable: true,
    width: "70px",
  },

  {
    name: "name",
    selector: (row) => row.name,
    // center:true,
    sortable: true,
    width: "140px",
  },
  {
    name: "Email address",
    selector: (row) => row.email,
    // center:true,
    sortable: true,
  },

  {
    name: "Contact number",
    selector: (row) => row.contact,
    // center:true,
    sortable: true,
  },

  {
    name: "Created by",
    selector: (row) => row.created_by.name,
    // center:true,
    sortable: true,
    width: "150px",
  },
  {
    name: "Created date",
    selector: (row) => row.created_date,
    // center:true,
    sortable: true,
    width: "150px",
  },

  {
    name: "Status ",
    selector: (row) => row.status,
    // center: true,
    sortable: true,
  },

  // {
  //   name: "Assign Policy",
  //   selector: (row) => (
  //     <i
  //       style={{ fontSize: "20px", color: "blue", cursor: "pointer" }}
  //       className="fa-solid fa-file"  // Changed from fa-key to fa-plus
  //       onClick={() => togglePolicyModal(row)} // Trigger the modal when clicked
  //     ></i>
  //   ),
  //   center: true,
  //   sortable: true,
  // },

  {
    name: "Action",
    selector: (row) => (
      <div className="justify-content-between">
        <i
          style={{ fontSize: "20px", color: "black", cursor: "pointer" }}
          className="fa-solid fa-file m-3" // Changed from fa-key to fa-plus
          onClick={() => togglePolicyModal(row)} // Trigger the modal when clicked
        ></i>

        <i
          style={{ fontSize: "15px" }}
          class="fa-solid fa-eye"
          onClick={() => handleprofilenavigate(row)}
        ></i>

        <i
          style={{
            padding: "15px",
            fontSize: "20px",
            cursor: "pointer",
            display: "none",
          }}
          className="fa-solid fa-pencil"
          onClick={() => handleEditUser(row)}
        ></i>

        {/* <i
          style={{ fontSize: "15px", color: "red", cursor: "pointer" }}
          className="fa-solid fa-trash"
          onClick={() => handledelete(row.id)}
        ></i> */}
      </div>
    ),
    center: true,
    sortable: true,
  },
];

export const AgentTableColumn = (
  handleView,
  handleEdit,
  handledelete,
  userbranch,
  userrole,
  insentive
) => [
  {
    name: "ID",
    selector: (row, index) => index + 1, // +1 to start from 1 instead of 0
    // center: true,
    sortable: true,
    width: "70px",
  },
  {
    name: "Name",
    selector: (row) => row.full_name,
    // center: true,
    sortable: true,
    width: "120px",
  },
  {
    name: "Contact number",
    selector: (row) => row.contact_number,
    // center: true,
    sortable: true,
    width: "150px",
  },
  {
    name: "Email address",
    selector: (row) => row.email,
    sortable: true,
    width: "180px",
  },
  {
    name: "Address",
    selector: (row) => row.address,
    sortable: true,
    width: "170px",
  },
  // {
  //   name: "Branch ",
  //   selector: (row) => {
  //     const branch = userbranch.find((branch) => branch.id === row.branch);
  //     return branch ? branch.branch_name : "Unknown Branch";
  //   },
  //   center: true,
  //   sortable: true,
  // },
  {
    name: "Gender",
    selector: (row) => row.gender,
    sortable: true,
    width: "120px",
  },

  {
    name: "Commission %",
    selector: (row) => {
      if (insentive && Array.isArray(insentive)) {
        // Step 1: Filter agents matching row.id
        const filteredAgents = insentive.filter(
          (item) => item.agent === row.id
        );

        // Step 2: Sum all incentive_amount values
        const totalCommission = filteredAgents.reduce(
          (sum, item) => sum + (parseFloat(item.incentive_amount) || 0),
          0
        );

        return `₹${totalCommission.toFixed(2)}`;
      }
      return "0.00%";
    },
    sortable: true,
    width: "130px",
  },

  {
    name: "Join Date",
    selector: (row) => {
      if (row.join_date) {
        const date = new Date(row.join_date);
        return !isNaN(date) ? date.toISOString().split("T")[0] : "Invalid Date";
      }
      return "No Date";
    },
    sortable: true,
    width: "120px",
  },

  {
    name: "Created By ",
    selector: (row) => row.created_by.name,
    sortable: true,
    width: "150px",
  },

  {
    name: " Role",
    selector: (row) => "Agent",
    sortable: true,
    width: "120px",
  },
  {
    name: "Action",
    selector: (row) => (
      <div className="justify-content-between">
        <i
          onClick={() => handleView(row)}
          style={{ fontSize: "20px" }}
          class="fa-solid fa-eye"
        ></i>
        <i
          onClick={() => handleEdit(row)}
          style={{ padding: "15px", fontSize: "20px" }}
          class="fa-solid fa-pencil"
        ></i>
        <i
          style={{ fontSize: "15px", color: "red", cursor: "pointer" }}
          className="fa-solid fa-trash"
          onClick={() => handledelete(row.id)}
        ></i>
      </div>
    ),
    width: "120px",
    // right: true,
    // center: true,
    sortable: true,
  },
];

export const BranchPaymentTableColumn = (
  handleEditPayment,
  handleDeletePayment,
  Customerdata,
  Policydata
) => [
  {
    name: " ID",
    selector: (row) => row.id, // Display payment ID
    // center: true,
    sortable: true,
  },
  {
    name: "Policy Name",
    selector: (row) => {
      const policy = Policydata.find((pol) => pol.id === row.policy_id); // Find the customer
      return policy ? policy.policy_name : "Unknown policy";
    },
    // center: true,
    sortable: true,
  },
  {
    name: "Customer Name",
    selector: (row) => {
      const customer = Customerdata.find((cus) => cus.id === row.customer); // Find the customer
      return customer ? customer.name : "Unknown Customer";
    },
    // center: true,
    sortable: true,
  },

  {
    name: "Amount",
    selector: (row) => row.amount_paid, // Display payment amount
    // center: true,
    sortable: true,
  },
  {
    name: "Payment Date",
    selector: (row) => row.transaction_date,
    // center: true,
    sortable: true,
  },
  {
    name: "Payment Method",
    selector: (row) => row.payment_method, // Display payment date
    // center: true,
    sortable: true,
  },
  // {
  //   name: 'Branch',
  //   selector: row => {
  //     const branch = userbranch.find(branch => branch.id === row.branch);  // Find the branch name
  //     return branch ? branch.branch_name : "Unknown Branch";
  //   },
  //   center: true,
  //   sortable: true,
  // },
  {
    name: "Payment Status",
    selector: (row) => row.payment_status, // Display payment status (e.g., Paid, Pending)
    // center: true,
    sortable: true,
  },
  {
    name: "Action",
    selector: (row) => (
      <div className="justify-content-between">
        {/* <i onClick={() => handleView(row)} style={{ fontSize: "20px" }} className="fa-solid fa-eye"></i> */}
        <i
          onClick={() => handleEditPayment(row)}
          style={{ padding: "15px", fontSize: "20px" }}
          className="fa-solid fa-pencil"
        ></i>
        <i
          style={{ fontSize: "15px", color: "red", cursor: "pointer" }}
          className="fa-solid fa-trash"
          onClick={() => handleDeletePayment(row.id)}
        ></i>
      </div>
    ),
    // center: true,
    sortable: true,
  },
];

//   {
//     name: "Branch name",
//     selector: (row) => {
//       const role = userrole.find((role) => role.id === row.role);
//       return role ? role.name : "Unknown role";
//     },
// center: true,
//     sortable: true,
//   },
//   {
//     name: "Action",
//     selector: (row) => (
//       <div className="justify-content-between">
//         <i
//           onClick={() => handleView(row)}
//           style={{ fontSize: "20px" }}
//           class="fa-solid fa-eye"
//         ></i>
//         <i
//           onClick={() => handleEdit(row)}
//           style={{ padding: "15px", fontSize: "20px" }}
//           class="fa-solid fa-pencil"
//         ></i>
//         <i
//           style={{ fontSize: "15px", color: "red", cursor: "pointer" }}
//           className="fa-solid fa-trash"
//           onClick={() => handledelete(row.id)}
//         ></i>
//       </div>
//     ),
// center: true,
//     sortable: true,
//   },
// ];

export const policiesTableColumn = (
  viewtoggle,
  edittoggle,
  handleDelete,
  company,
  policyCategory,
  policyType
) => [
  {
    cell: (row) => (
      <div
        style={{
          backgroundColor:
            row.status === "Active"
              ? "#8cb369"
              : row.status === "Expired"
              ? "#bc4b51"
              : null,
          padding: "10px",
          borderRadius: "5px",
          width: "100%",
        }}
      ></div>
    ),
    sortable: true, // Optional, if the column needs sorting
    width: "60px", // Optional, set column width
  },
  {
    name: "ID",
    selector: (row, index) => index + 1,
    // center: true,
    sortable: true,
    width: "70px",
  },
  {
    name: "Policy code",
    selector: (row) => row.policy_code,
    // center: true,
    sortable: true,
  },
  {
    name: "Policy name",
    selector: (row) => row.policy_name,
    center: true,
    sortable: true,
    width: "140px",
  },
  {
    name: "Company",
    selector: (row) => {
      const companyName = company.find((company) => company.id === row.company);
      return companyName ? companyName.name : "Unknown Branch";
    },
    // center: true,
    sortable: true,
    width: "100px",
  },
  {
    name: "Policy category",
    selector: (row) => {
      const policy = policyCategory.find(
        (policyC) => policyC.id === row.policy_category
      );
      return policy ? policy.policy_name : "Unknown Branch";
    },
    // center: true,
    sortable: true,
    width: "140px",
  },
  {
    name: "Policy Master",
    selector: (row) => {
      const policy = policyType.find(
        (policyT) => policyT.id === row.policy_type
      );
      return policy ? policy.name : "Unknown policy master";
    },
    // center: true,
    sortable: true,
    width: "120px",
  },
  // {
  //   name: "Premium amount",
  //   selector: (row) => row.premium_amount,
  //   // center: true,
  //   sortable: true,
  //   width: "150px",
  // },
  {
    name: "Payment frequency",
    selector: (row) => row.payment_frequency,
    // center: true,
    sortable: true,
    width: "180px",
  },
  {
    name: "Policy term duration",
    selector: (row) => row.policy_term_duration,
    // center: true,
    sortable: true,
    width: "180px",
  },
  // {
  //   name: "Tax amount",
  //   selector: (row) => row.tax_amount,
  //   // center: true,
  //   sortable: true,
  //   width: "120px",
  // },
  // {
  //   name: "Total premium amount",
  //   selector: (row) => row.total_premium_amount,
  //   // center: true,
  //   sortable: true,
  //   width: "180px",
  // },
  {
    name: "Action",
    selector: (row) => (
      <div className="justify-content-between">
        <i
          style={{ fontSize: "15px" }}
          className="fa-solid fa-eye"
          onClick={() => viewtoggle(row)}
        ></i>
        <i
          style={{ padding: "15px", fontSize: "20px" }}
          class="fa-solid fa-pencil"
          onClick={() => edittoggle(row)}
        ></i>
        <i
          onClick={() => handleDelete(row)}
          style={{ fontSize: "15px" }}
          class="fa-solid fa-trash"
        ></i>
      </div>
    ),
    width: "140px",
    // center: true,
    // left:true,
    sortable: true,
  },
];

export const companyTableColumn = (editToggle, handleDelete) => [
  {
    name: "ID",
    selector: (row, index) => index + 1, // +1 to start from 1 instead of 0
    // center: true,
    sortable: true,
  },
  {
    name: "Image",
    selector: (row) => (
      <div>
        <img width={"100px"} className="p-2" src={row.logo} alt="" />
      </div>
    ),
    // center: true,
    sortable: true,
  },
  {
    name: "Company Name",
    selector: (row) => row.name,
    // center: true,
    sortable: true,
  },
  {
    name: "",
    // selector:row=> row.company_name,
    // center: true,
    sortable: true,
  },
  {
    name: "",
    // selector:row=> row.company_name,
    // center: true,
    sortable: true,
  },
  {
    name: "Action",
    selector: (row) => (
      <div className="justify-content-between">
        <i
          onClick={() => editToggle(row)}
          style={{ padding: "15px", fontSize: "20px" }}
          class="fa-solid fa-pencil"
        ></i>
        <i
          onClick={() => handleDelete(row)}
          style={{ fontSize: "15px" }}
          class="fa-solid fa-trash"
        ></i>
      </div>
    ),
    minWidth: "130px",
    // center: true,
    sortable: true,
  },
];

export const policyCategoryTable = (editCategory, handleDelete) => [
  {
    name: "ID",
    selector: (row, index) => index + 1, // +1 to start from 1 instead of 0
    // center: true,
    sortable: true,
    width: "70px",
  },
  {
    name: "Policy Category",
    selector: (row) => row.policy_name,
    // center: true,
    sortable: true,
    width: "150px",
  },
  {
    name: "",
    // selector:row=> row.company_name,
    // center: true,
    sortable: true,
  },
  {
    name: "Action",
    selector: (row) => (
      <div className="justify-content-between">
        <i
          onClick={() => editCategory(row)}
          style={{ padding: "15px", fontSize: "20px" }}
          class="fa-solid fa-pencil"
        ></i>
        <i
          onClick={() => handleDelete(row)}
          style={{ fontSize: "15px" }}
          class="fa-solid fa-trash"
        ></i>
      </div>
    ),
    // minWidth: "130px",
    center: true,
    sortable: true,
    right: true,
  },
];

export const taxTableColumn = (
  handleEditTax,
  handleDeleteTax,
  taxTypes,
  branches
) => [
  {
    name: "ID",
    selector: (row, index) => index + 1,
    // center: true,
    sortable: true,
  },
  {
    name: "Name",
    selector: (row) => row.name,
    // center: true,
    sortable: true,
  },
  {
    name: "Tax",
    selector: (row) => row.tax,
    // center: true,
    sortable: true,
  },

  {
    name: "Action",
    selector: (row) => (
      <div className="justify-content-between">
        {/* <i onClick={()=>handleView(row)} style={{fontSize:"20px"}} class="fa-solid fa-eye"></i> */}
        <i
          onClick={() => handleEditTax(row)}
          style={{ padding: "15px", fontSize: "20px" }}
          class="fa-solid fa-pencil"
        ></i>
        <i
          style={{ fontSize: "20px", color: "red" }}
          class="fa-solid fa-trash"
          onClick={() => handleDeleteTax(row.id)}
        ></i>
      </div>
    ),
    // center: true,
    sortable: true,
  },
];

export const policyTypeTablecolumn = (editToggle, handleDelete) => [
  {
    name: "ID",
    selector: (row, index) => index + 1,
    // center: true,
    sortable: true,
    width: "100px",
  },
  {
    name: "Company",
    selector: (row) => row.company_name,
    // center: true,
    sortable: true,
    width: "130px",
  },
  {
    name: "Category",
    selector: (row) => row.policy_category_name,
    // center: true,
    sortable: true,
    width: "130px",
  },
  {
    name: "Policy Master ",
    selector: (row) => row.name,
    // center: true,
    sortable: true,
  },
  {
    name: "Action",
    selector: (row) => (
      <div className="justify-content-between">
        <i
          onClick={() => editToggle(row)}
          style={{ padding: "15px", fontSize: "20px" }}
          class="fa-solid fa-pencil"
        ></i>
        <i
          onClick={() => handleDelete(row)}
          style={{ fontSize: "20px", color: "red" }}
          class="fa-solid fa-trash"
        ></i>
      </div>
    ),
    center: true,
    // right:true,
    sortable: true,
    width: "150px",
  },
];

export const agentCommissionColumn = (
  edittoggle,
  agent,
  policy,
  handledelete
) => [
  {
    name: "ID",
    selector: (row, index) => index + 1,
    // center: true,
    width: "70px",
    sortable: true,
  },
  {
    name: "Agent name",
    selector: (row) => {
      const AgentName = agent.find((agent) => agent.id === row.agent);
      return AgentName ? AgentName.full_name : "null";
    },
    // center: true,
    sortable: true,
    width: "150px",
  },
  {
    name: "Policy",
    selector: (row) => {
      const policyName = policy.find((policy) => policy.id === row.policy_type);
      return policyName ? policyName.name : "null";
    },
    // center: true,
    sortable: true,
    width: "100px",
  },
  {
    name: "Commission amout",
    selector: (row) => row.fixed_commission_amount,
    // center: true,
    sortable: true,
    width: "170px",
  },
  {
    name: "Commission %",
    selector: (row) => row.commission_percentage,
    // center: true,
    sortable: true,
    width: "150px",
  },
  {
    name: "Action",
    selector: (row) => (
      <div className="justify-content-between">
        <i
          style={{ padding: "15px", fontSize: "20px" }}
          class="fa-solid fa-pencil"
          onClick={() => edittoggle(row)}
        ></i>
        <i
          style={{ fontSize: "15px", color: "red", cursor: "pointer" }}
          className="fa-solid fa-trash"
          onClick={() => handledelete(row.id)}
        ></i>
      </div>
    ),
    // center: true,
    right: true,
    sortable: true,
    width: "500px",
  },
];

// -----------------Manager Tables---------------------//

export const managerUserTablecolumn = (
  handleToggleStatus,
  editToggle,
  handledelete,
  userBranch
) => [
  {
    name: "ID",
    selector: (row, index) => index + 1,
    // center: true,
    width: "70px",
    sortable: true,
  },

  {
    name: "Name",
    selector: (row) => row.name,
    // center: true,
    sortable: true,
    width: "150px",
  },
  {
    name: "Contact number",
    selector: (row) => row.contact,
    // center: true,
    sortable: true,
    width: "140px",
  },
  {
    name: "Email address",
    selector: (row) => row.email,
    // center: true,
    sortable: true,
    width: "150px",
  },

  {
    name: "Job Type",
    selector: (row) => row.job_type,
    // center: true,
    sortable: true,
    width: "100px",
  },
  {
    name: "Branch",
    selector: (row) => {
      const userbranch = userBranch.find((branch) => branch.id === row.branch);
      return userbranch ? userbranch.branch_name : "Unknown Branch";
    },
    // center: true,
    sortable: true,
    width: "100px",
  },

  {
    name: "Insentive Target",
    selector: (row) => row.target,
    // center: true,
    sortable: true,
    width: "140px",
  },

  {
    name: "Created Date",
    selector: (row) => row.created_date,
    // center: true,
    sortable: true,
    width: "140px",
  },

  {
    name: "Status ",
    selector: (row) => row.status,
    // center: true,
    sortable: true,
    width: "100px",
  },

  {
    name: "Action",
    selector: (row) => (
      <div className="justify-content-between">
        <i
          className={`fa-solid fa-toggle-${
            row.status === "active" ? "on" : "off"
          }`}
          onClick={() => handleToggleStatus(row)} // Pass the entire row to toggle the status
          style={{ cursor: "pointer", fontSize: "24px", color: "blue" }}
        ></i>
        <i
          style={{ padding: "15px", fontSize: "20px" }}
          class="fa-solid fa-pencil"
          onClick={() => editToggle(row)}
        ></i>
        <i
          style={{ fontSize: "15px", color: "red", cursor: "pointer" }}
          className="fa-solid fa-trash"
          onClick={() => handledelete(row.id)}
        ></i>
      </div>
    ),
    center: true,
    // right:true,
    sortable: true,
    width: "150px",
  },
];

export const managerAgentTablecolumn = (
  branch,
  editToggle,
  handledelete,
  insentive
) => [
  {
    name: "ID",
    selector: (row, index) => index + 1,
    // center: true,
    width: "70px",
    sortable: true,
  },
  {
    name: "Name",
    selector: (row) => row.full_name,
    // center: true,
    sortable: true,
    width: "150px",
  },
  {
    name: "Email",
    selector: (row) => row.email,
    // center: true,
    sortable: true,
    width: "180px",
  },
  {
    name: "Mobile",
    selector: (row) => row.contact_number,
    // center: true,
    sortable: true,
    width: "130px",
  },
  {
    name: "Address",
    selector: (row) => row.address,
    // center: true,
    sortable: true,
    width: "150px",
  },
  {
    name: "Branch",
    selector: (row) => {
      const branchName = branch.find((branch) => branch.id === row.branch);
      return branchName ? branchName.branch_name : "Unknown branch";
    },
    // center: true,
    sortable: true,
    width: "120px",
  },
  {
    name: "Commission",
    selector: (row) => {
      if (insentive && Array.isArray(insentive)) {
        const totalCommission = insentive
          .filter((agent) => agent.agent === row.id)
          .reduce((sum, item) => sum + (item.insentive_amount || 0), 0);

        return `${totalCommission}%`;
      }
      return "0%";
    },
    sortable: true,
    // width: "130px",
  },
  // {
  //   name: "Status",
  //   selector: (row) => row.status,
  //   // center: true,
  //   sortable: true,
  // },
  {
    name: "Action",
    selector: (row) => (
      <div className="justify-content-between">
        <i
          style={{ fontSize: "15px", display: "none" }}
          class="fa-solid fa-eye"
          // onClick={() => handleViewUser(row)}
        ></i>
        <i
          style={{ padding: "15px", fontSize: "20px" }}
          class="fa-solid fa-pencil"
          onClick={() => editToggle(row)}
        ></i>
        <i
          style={{ fontSize: "15px", color: "red", cursor: "pointer" }}
          className="fa-solid fa-trash"
          onClick={() => handledelete(row.id)}
        ></i>
      </div>
    ),
    center: true,
    // right:true,
    sortable: true,
    width: "110px",
  },
];

export const managerAgentCommissioncolumn = (
  edittoggle,
  agent,
  policy,
  handledelete
) => [
  {
    name: "ID",
    selector: (row, index) => index + 1,
    // center: true,
    width: "70px",
    sortable: true,
  },
  {
    name: "Agent name",
    selector: (row) => {
      const AgentName = agent.find((agent) => agent.id === row.agent);
      return AgentName ? AgentName.full_name : "null";
    },
    // center: true,
    sortable: true,
    width: "150px",
  },
  {
    name: "Policy",
    selector: (row) => {
      const policyName = policy.find((policy) => policy.id === row.policy_type);
      return policyName ? policyName.name : "null";
    },
    // center: true,
    sortable: true,
    width: "100px",
  },
  {
    name: "Commission amout",
    selector: (row) => row.fixed_commission_amount,
    // center: true,
    sortable: true,
    width: "170px",
  },
  {
    name: "Commission %",
    selector: (row) => row.commission_percentage,
    // center: true,
    sortable: true,
    width: "150px",
  },
  {
    name: "Action",
    selector: (row) => (
      <div className="justify-content-between">
        <i
          style={{ padding: "15px", fontSize: "20px" }}
          class="fa-solid fa-pencil"
          onClick={() => edittoggle(row)}
        ></i>
        <i
          style={{ fontSize: "15px", color: "red", cursor: "pointer" }}
          className="fa-solid fa-trash"
          onClick={() => handledelete(row.id)}
        ></i>
      </div>
    ),
    // center: true,
    right: true,
    sortable: true,
    width: "500px",
  },
];

export const cutomerProfileTablecolumn = (handledeletePolicy) => [
  {
    name: "ID",
    selector: (row, index) => index + 1,
    width: "70px",
    sortable: true,
  },
  {
    name: "Policy name",
    selector: (row) => row.policy_name,
    sortable: true,
    width: "120px",
  },
  {
    name: "Policy Info",
    selector: (row) =>
      row.policy_name.toLowerCase() === "hospicash"
        ? row.plan?.plan_name
        : row.policy_category_name,
    sortable: true,
    width: "150px",
  },
  {
    name: "Coverage amount",
    selector: (row) =>
      row.policy_name.toLowerCase() === "hospicash"
        ? row.plan_coverage?.coverage_amount
        : row.coverage_amount1,
    sortable: true,
    width: "150px",
  },
  {
    name: "Premium amount",
    selector: (row) =>
      row.policy_name.toLowerCase() === "hospicash"
        ? row.plan_coverage?.premium_amount
        : row.premium_amount1,
    sortable: true,
    width: "150px",
  },
  {
    name: "Start date",
    selector: (row) => row.start_date,
    sortable: true,
    width: "120px",
  },
  {
    name: "End date",
    selector: (row) => row.end_date,
    sortable: true,
    width: "110px",
  },
  {
    name: "Action",
    selector: (row) => (
      <div className="justify-content-between">
        <i
          style={{ fontSize: "15px", color: "red", cursor: "pointer" }}
          className="fa-solid fa-trash"
          onClick={() => handledeletePolicy(row.id)}
        ></i>
      </div>
    ),
    sortable: true,
    width: "100px",
  },
];


export const customerFamilyTablecolumn = (relationshipChoice, handleEdit, handledeleteFamily) => [
  {
    name: "ID",
    selector: (row, index) => index + 1,
    // center: true,
    width: "70px",
    sortable: true,
  },
  {
    name: "Name",
    selector: (row) =>
      `${row.first_name || ""} ${row.middle_name || ""} ${
        row.last_name || ""
      }`.trim(),
    sortable: true,
    width: "170px",
  },
  {
    name: "Email",
    selector: (row) => row.email,
    sortable: true,
    width: "150px",
  },
  {
    name: "Gender",
    selector: (row) => row.gender,
    sortable: true,
    width: "100px",
  },
  {
    name: "Contact",
    selector: (row) => row.contact,
    sortable: true,
    width: "120px",
  },
  {
    name: "Address 1",
    selector: (row) => row.address1,
    sortable: true,
    width: "180px",
  },
  {
    name: "Date of birth",
    selector: (row) => row.dob,
    sortable: true,
    width: "120px",
  },
  {
    name: "Relationship",
    selector: (row) => {
      const relationship = relationshipChoice.find(
        (relation) => relation.value === row.relationship
      );
      return relationship ? relationship.label : "null";
    },
    sortable: true,
    width: "120px",
  },
  {
    name: "District",
    selector: (row) => row.district,
    sortable: true,
    width: "120px",
  },
  {
    name: "Actions",
    cell: (row) => (
      <div className="">
        <i
          className="fa-solid me-3 fa-pencil"
          onClick={() => handleEdit(row)}
          style={{ cursor: "pointer", color: "blue", fontSize: "16px" }}
        ></i>
        <i
          style={{ fontSize: "15px", color: "red", cursor: "pointer" }}
          className="fa-solid fa-trash"
          onClick={() => handledeleteFamily(row.id)}
        ></i>
      </div>

    ),
    width: "100px",
  },
];

export const customerNomineeTablecolumn = (handleEditnominee,handledeletenominee) => [
  {
    name: "ID",
    selector: (row, index) => index + 1,
    // center: true,
    width: "70px",
    sortable: true,
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width: "170px",
  },
  {
    name: "Email",
    selector: (row) => row.email,
    sortable: true,
    width: "160px",
  },
  {
    name: "Contact",
    selector: (row) => row.phone_number,
    sortable: true,
    width: "120px",
  },
  {
    name: "Address",
    selector: (row) => row.address,
    sortable: true,
    width: "180px",
  },
  {
    name: "Relationship",
    selector: (row) => row.relationship,
    sortable: true,
    width: "120px",
  },
  {
    name: "Actions",
    cell: (row) => (
      <div>
        <i
          className="fa-solid fa-pencil"
          onClick={() => handleEditnominee(row)}
          style={{ cursor: "pointer", color: "blue", fontSize: "16px" }}
        ></i>
        <i
          style={{ fontSize: "15px", color: "red", cursor: "pointer" }}
          className="fa-solid fa-trash ms-3"
          onClick={() => handledeletenominee(row.id)}
        ></i>
      </div>
      
    ),
    width: "100px",
  },
];

export const customerPaymentTableColumn = (
  handleEditPayment,
  usercustomer,
  userpolicies,
  handledeleteTransaction
) => [
  {
    name: "ID",
    selector: (row, index) => index + 1,
    width: "70px",
    sortable: true,
  },
  {
    name: "Policy",
    selector: (row) => {
      // Log the row and userpolicies to the console for debugging

      // Inline comparison to get the policy name by comparing ID
      const policy = userpolicies.find((pol) => pol.id === row.policy_id);

      return policy ? policy.policy_name : "Unknown Policy";
    },
    sortable: true,
    width: "150px",
  },

  {
    name: "Customer",
    selector: (row) => {
      // Inline comparison to get the customer name by comparing ID
      const customer = usercustomer.find((cust) => cust.id === row.customer);
      return customer ? customer.name : "Unknown Customer";
    },
    sortable: true,
    width: "180px",
  },
  {
    name: "Payment Date",
    selector: (row) => row.transaction_date,
    sortable: true,
    width: "150px",
  },
  {
    name: "Amount Paid",
    selector: (row) => row.amount_paid,
    sortable: true,
    width: "130px",
  },
  {
    name: "Payment Method",
    selector: (row) => row.payment_method,
    sortable: true,
    width: "150px",
  },
  {
    name: "Payment Status",
    selector: (row) => row.payment_status,
    sortable: true,
    width: "140px",
  },
  // {
  //   name: "Due Amount",
  //   selector: (row) => row.due_amount,
  //   sortable: true,
  //   width: "120px",
  // },
  // {
  //   name: "Next Due Date",
  //   selector: (row) => row.next_due_date,
  //   sortable: true,
  //   width: "160px",
  // },
  {
    name: "Transaction ID",
    selector: (row) => row.transaction_id,
    sortable: true,
    width: "150px",
  },
  {
    name: "Actions",
    cell: (row) => (
      <div>
        <i
          className="fa-solid fa-pencil"
          onClick={() => handleEditPayment(row)}
          style={{ cursor: "pointer", color: "blue", fontSize: "16px" }}
        ></i>
        <i
          style={{ fontSize: "15px", color: "red", cursor: "pointer" }}
          className="fa-solid fa-trash ms-3"
          onClick={() => handledeleteTransaction(row.id)}
        ></i>
      </div>
    ),
    width: "100px",
  },
];

export const reportTablecolumn = (customerPolicy) => [
  {
    name: "ID",
    selector: (row, index) => index + 1,
    // center: true,
    width: "70px",
    sortable: true,
  },
  {
    name: "Customer Id",
    selector: (row) => row.customer_id,
    sortable: true,
    width: "150px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width: "150px",
  },
  {
    name: "Contact",
    selector: (row) => row.contact,
    sortable: true,
    width: "150px",
  },
  {
    name: "Email",
    selector: (row) => row.email,
    sortable: true,
    width: "250px",
  },
  {
    name: "Policy",
    selector: (row) => {
      if (customerPolicy) {
        const matchingPolicy = row.customer_policies?.find(
          (policy) => policy.policy_name === customerPolicy
        );
        return matchingPolicy ? matchingPolicy.policy_name : "No policy";
      } else {
        return row.customer_policies?.[0]?.policy_name || "No policy";
      }
    },
    sortable: true,
    width: "150px",
  },
  {
    name: "Sum insured",
    selector: (row) => {
      if (customerPolicy) {
        const matchingPolicy = row.customer_policies?.find(
          (policy) => policy.policy_name === customerPolicy
        );
        return matchingPolicy ? matchingPolicy.coverage_amount : "null";
      } else {
        return row.customer_policies?.[0]?.coverage_amount || "No policy";
      }
    },
    sortable: true,
    width: "150px",
  },
  {
    name: "Policy amount",
    selector: (row) => {
      if (customerPolicy) {
        const matchingPolicy = row.customer_policies?.find(
          (policy) => policy.policy_name === customerPolicy
        );
        return matchingPolicy ? matchingPolicy.total_amount : "null";
      } else {
        return row.customer_policies?.[0]?.total_amount || "No policy";
      }
    },
    sortable: true,
    width: "150px",
  },
  {
    name: "Total paid amount",
    selector: (row) => {
      if (customerPolicy) {
        // Find the payment where policy_name matches customerPolicy
        const matchingPayment = row.payments?.find(
          (payment) => payment.policy_name === customerPolicy
        );
        return matchingPayment ? matchingPayment.amount_paid : "null";
      } else {
        // Default case: return the first payment's amount_paid (if available)
        return row.payments[0]?.amount_paid || "null";
      }
    },
    sortable: true,
    width: "150px",
  },
  {
    name: "Due amount",
    selector: (row) => {
      if (customerPolicy) {
        // Find the payment where policy_name matches customerPolicy
        const matchingPayment = row.payments?.find(
          (payment) => payment.policy_name === customerPolicy
        );
        return matchingPayment ? matchingPayment.balance : "null";
      } else {
        // Default case: return the first payment's amount_paid (if available)
        return row.payments[0]?.balance || "null";
      }
    },
    sortable: true,
    width: "130px",
  },
  {
    name: "Created date",
    selector: (row) => row.created_date,
    sortable: true,
    width: "130px",
  },
  {
    name: "Created by",
    selector: (row) => row.created_by.name,
    sortable: true,
    width: "130px",
  },
  {
    name: "Health condition",
    selector: (row) => row.health_condition,
    sortable: true,
    width: "150px",
  },
  {
    name: "Occupation",
    selector: (row) => row.occupation,
    sortable: true,
    width: "150px",
  },
];

export const reportUserTablecolumn = (branch, role) => [
  {
    name: "ID",
    selector: (row, index) => index + 1,
    // center: true,
    width: "70px",
    sortable: true,
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width: "100px",
  },
  {
    name: "Contact",
    selector: (row) => row.contact,
    sortable: true,
    width: "120px",
  },
  {
    name: "Email",
    selector: (row) => row.email,
    sortable: true,
    width: "170px",
  },
  {
    name: "Created by",
    selector: (row) => row.created_by.name,
    sortable: true,
    width: "130px",
  },
  {
    name: "Created date",
    selector: (row) => row.created_date,
    sortable: true,
    width: "130px",
  },
  {
    name: "Branch",
    selector: (row) => {
      const branchName = branch.find((branch) => branch.id === row.branch);
      return branchName ? branchName.branch_name : "Unknown branch";
    },
    // center: true,
    width: "120px",
    sortable: true,
  },
  {
    name: "Role",
    selector: (row) => {
      const roleName = role.find((roles) => roles.id === row.role);
      return roleName ? roleName.name : "Unknown role";
    },
    sortable: true,
    width: "150px",
  },
  {
    name: "Target",
    selector: (row) => row.target,
    sortable: true,
    width: "130px",
  },
  {
    name: "Status",
    selector: (row) => row.status,
    sortable: true,
    width: "170px",
  },
];

export const reportAgentTablecolumn = (branch, incentive) => [
  {
    name: "ID",
    selector: (row, index) => index + 1,
    // center: true,
    width: "70px",
    sortable: true,
  },
  {
    name: "Name",
    selector: (row) => row.full_name,
    sortable: true,
    width: "170px",
  },
  {
    name: "Branch",
    selector: (row) => {
      const branchName = branch.find((branch) => branch.id === row.branch);
      return branchName ? branchName.branch_name : "Unknown branch";
    },
    // center: true,
    width: "120px",
    sortable: true,
  },
  {
    name: "Contact number",
    selector: (row) => row.contact_number,
    sortable: true,
    width: "150px",
  },
  {
    name: "Email",
    selector: (row) => row.email,
    sortable: true,
    width: "180px",
  },
  {
    name: "Address",
    selector: (row) => row.address,
    sortable: true,
    width: "140px",
  },
  {
    name: "Commission %",
    selector: (row) => {
      if (incentive && Array.isArray(incentive)) {
        // Step 1: Filter agents matching row.id
        const filteredAgents = incentive.filter(
          (item) => item.agent === row.id
        );

        // Step 2: Sum all incentive_amount values
        const totalCommission = filteredAgents.reduce(
          (sum, item) => sum + (parseFloat(item.incentive_amount) || 0),
          0
        );

        return `₹${totalCommission.toFixed(2)}`;
      }
      return "0.00%";
    },
    sortable: true,
    width: "130px",
  },

  {
    name: "Created by",
    selector: (row) => row.created_by.name,
    sortable: true,
    width: "120px",
  },
  {
    name: "Gender",
    selector: (row) => row.gender,
    sortable: true,
    width: "100px",
  },
  {
    name: "Join Date",
    selector: (row) => new Date(row.join_date).toLocaleDateString(),
    sortable: true,
    width: "120px",
  },
];

export const reportTransactionTablecolumn = (data) => [
  {
    name: "ID",
    selector: (row, index) => index + 1,
    // center: true,
    width: "70px",
    sortable: true,
  },
  {
    name: "Customer",
    selector: (row) => {
      const customerName = data.find(
        (customer) => customer.id === row.customer
      );
      return customerName ? customerName.name : "Unknown customer";
    },
    sortable: true,
    width: "150px",
  },
  {
    name: "Amount paid",
    selector: (row) => row.amount_paid,
    sortable: true,
    width: "130px",
  },
  {
    name: "Balance",
    selector: (row) => row.balance,
    sortable: true,
    width: "110px",
  },
  {
    name: "Total paid amount",
    selector: (row) => row.total_paid_amount,
    sortable: true,
    width: "150px",
  },
  {
    name: "Date",
    selector: (row) => row.date,
    sortable: true,
    width: "120px",
  },
  // {
  //   name: "Next due date",
  //   selector: (row) => row.next_due_date,
  //   sortable: true,
  //   width: "130px",
  // },
  {
    name: "Payment method",
    selector: (row) => row.payment_method,
    sortable: true,
    width: "150px",
  },
  {
    name: "Policy name",
    selector: (row) => row.policy_name,
    sortable: true,
    width: "150px",
  },
  {
    name: "Transaction id",
    selector: (row) => row.transaction_id,
    sortable: true,
    width: "150px",
  },
  {
    name: "Payment status",
    selector: (row) => row.payment_status,
    sortable: true,
    width: "150px",
  },
];
