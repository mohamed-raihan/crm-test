import React, { useEffect } from "react";
import { Card, CardContent, CardActions, Typography } from "@mui/material";
import {
  Button,
  Tabs,
  Tab,
  Badge,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { useState } from "react";
import DataTable from "react-data-table-component";
import allaxios from "../../api/axios";
import API_URL from "../../api/api_urls";
import {
  customerFamilyTablecolumn,
  customerNomineeTablecolumn,
  customerPaymentTableColumn,
  cutomerProfileTablecolumn,
} from "../../component/Common/TableDatas";
import { useLocation } from "react-router-dom";
import profilepic from "../../assets/propic.png";
import EditFamilyMemberModal from "./Editprofilefamilymember"; // Import the modal
import EditProfileNomineeModal from "./Editprofilenominee"; // Import the modal
import EditProfileTransactionModal from "./ProfileTransaction"; // Import the modal

import { toast } from "react-toastify";

const UserProfile = () => {
  const location = useLocation();
  const { customerData } = location.state;
  const [tabValue, setTabValue] = useState(0);
  const [status, setStatus] = useState([]);
  console.log(customerData);
  const [modalShow, setModalShow] = useState(false);
  const [nomineemodalShow, setnomineeModalShow] = useState(false);
  const [paymentmodalShow, setpaymentmodalShow] = useState(false);
  const [userpolicies, setUserPolicies] = useState([]);
  const [usercustomer, setusercustomer] = useState([]);
  const [policyUser, setPolicyUser] = useState([]);
  const [familyMember,setFamilymember] = useState([])
  const [transaction,setTransaction] = useState([])
  const [nomineee,setNominee] = useState([])

  const relationshipChoice = [
    { value: "E", label: "Self" },
    { value: "S", label: "Spouse" },
    { value: "D", label: "Daughter" },
    { value: "C", label: "Son" },
  ];
  const [open, setOpen] = useState(false);

  const [familyData, setFamilyData] = useState({
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
  });

  const [paymentData, setPaymentData] = useState([
    {
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
    },
  ]);

  const [nomineeFormData, setNomineeFormData] = useState({
    name: "",
    relationship: "",
    phone_number: "",
    email: "",
    address: "",
    customer: "",
  });

  const handleEdit = (row) => {
    setFamilyData(row); // Set selected member
    setModalShow(true); // Open modal
  };

  const handleEditnominee = (row) => {
    setNomineeFormData(row); // Set selected nominee
    setnomineeModalShow(true); // Open modal
  };

  const handleEditpayment = (row) => {
    setPaymentData(row); // Set selected nominee
    setpaymentmodalShow(true); // Open modal
  };
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  console.log(familyData);

  const fetchPolicies = async () => {
    try{
      const response = await allaxios.get(API_URL.POLICIES.GET_POLICIES, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      });

      // const matchedPolicy = response.data.filter((data)=>
      //   {
      //     data.id === customerData.customer_policies.map((item)=>{

      //     })

      //   }
      // )

      setUserPolicies(response.data);
    }catch(error){
      console.error();
      
    }
  };

  const fetchFamilyMember = async() => {
    try{
      const response = await allaxios.get(API_URL.FAMILY_MEMBERS.GET_MEMBERS);
      console.log(response);

      const matchedFamilyMember = response.data.filter((family) => family.customer == customerData.id )

      setFamilymember(matchedFamilyMember)
      
    }catch(error){
      console.error(error);
      
    }
  }

  const fetchTransaction = async() => {
    try{
      const response = await allaxios.get(API_URL.PAYMENT.GET_PAYMENT);
      console.log(response);

      const matchedFamilyMember = response.data.filter((transaction) => transaction.customer == customerData.id )

      setTransaction(matchedFamilyMember)
      
    }catch(error){
      console.error(error);
      
    }
  } 

  const fetchNominee = async() => {
    try{
      const response = await allaxios.get(API_URL.NOMINEE.GET_NOMINEE);
      console.log(response);

      const matchedFamilyMember = response.data.filter((nominee) => nominee.customer == customerData.id )

      setNominee(matchedFamilyMember)
      
    }catch(error){
      console.error(error);
      
    }
  } 

  const fetchUserPolicy = async () => {
    try {
      const response = await allaxios.get(API_URL.POLICY.GET_POLICY);

      console.log(response);
      const matchedUserPolicy = response.data.filter((policy) => policy.customer == customerData.id )
      console.log(matchedUserPolicy);
      
      setPolicyUser(matchedUserPolicy);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchcustomer = async () => {
    const response = await allaxios.get(API_URL.CUSTOMER.GET_CUSTOMER, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
      },
    });
    setusercustomer(response.data);
  };

  useEffect(() => {
    fetchPolicies();
    fetchcustomer();
    fetchUserPolicy();
    fetchFamilyMember();
    fetchNominee();
    fetchTransaction();
  }, []);

  const handleSavenominee = () => {
    allaxios
      .patch(
        `${API_URL.NOMINEE.PATCH_NOMINEE(nomineeFormData.id)}`,
        nomineeFormData
      )
      .then((response) => {
        console.log("Updated successfully Nominee:", response);
        toast.success("Updated successfully Nominee");
        setnomineeModalShow(false);
      })
      .catch((error) => {
        console.error("Error updating nominee:", error);
        toast.error("Error updating nominee");
      });
  };

  const handleSave = () => {
    allaxios
      .patch(
        `${API_URL.FAMILY_MEMBERS.PATCH_MEMBERS(familyData.id)}`,
        familyData
      )
      .then((response) => {
        toast.success("Updated successfully");
        console.log("Updated successfully:", response);
        setModalShow(false);
      })
      .catch((error) => {
        toast.error("Error updating family member");
        console.error("Error updating family member:", error);
      });
  };

  const handlepaymentSave = () => {
    allaxios
      .patch(`${API_URL.PAYMENT.PATCH_PAYMENT(paymentData.id)}`, paymentData)
      .then((response) => {
        toast.success("Updated successfully");
        console.log("Updated successfully:", response);
        setpaymentmodalShow(false);
      })
      .catch((error) => {
        toast.error("Error updating transaction history");
        console.error("Error updating transaction history:", error);
      });
  };

  console.log(userpolicies);
  console.log(policyUser);

  const handledeletePolicy = async (id) => {
    console.log(id);

    // const matchId = policyUser.find((item) => item.policy == id).id;
    // console.log(matchId);

    try {
      const response = await allaxios.delete(
        API_URL.POLICY.DELETE_POLICY(id)
      );
      console.log("User policy deleted successfully:", response);
      toast.success("User policy deleted successfully!");
      fetchPolicies();
      fetchUserPolicy();
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user. Please try again.");
    }
  };

  const handledeleteFamily = async (id) => {
    console.log(id);
    try {
      const response = await allaxios.delete(
        API_URL.FAMILY_MEMBERS.DELETE_MEMBERS(id)
      );
      console.log("Family member deleted successfully:", response);
      toast.success("Family member deleted successfully!");
      fetchFamilyMember();
    } catch (error) {
      console.error("Error deleting Family member:", error);
      toast.error("Failed to delete Family member. Please try again.");
    }
  };

  const handledeleteTransaction = async (id) => {
    console.log(id);
    try {
      const response = await allaxios.delete(
        API_URL.PAYMENT.DELETE_PAYMENT(id)
      );
      console.log("Transaction deleted successfully:", response);
      toast.success("Transaction deleted successfully!");
      fetchTransaction();
    } catch (error) {
      console.error("Error deleting Transaction:", error);
      toast.error("Failed to delete Transaction. Please try again.");
    }
  };

  const handledeletenominee = async (id) => {
    console.log(id);
    try {
      const response = await allaxios.delete(
        API_URL.NOMINEE.DELETE_NOMINEE(id)
      );
      console.log("Nominee deleted successfully:", response);
      toast.success("Nominee deleted successfully!");
      fetchNominee();
    } catch (error) {
      console.error("Error deleting Nominee:", error);
      toast.error("Failed to delete Nominee. Please try again.");
    }
  };

  return (
    <div
      style={{ padding: "16px", backgroundColor: "#edf2f4", height: "100vh" }}
    >
      <Card
        className="rounded container d-flex align-items-center mt-5 w-100"
        style={{
          // maxWidth: "900px",
          height: "16rem",
          margin: "auto",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <CardContent
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 5fr",
            gap: "16px",
          }}
        >
          <div className="ms-5 me-4" style={{ textAlign: "center" }}>
            <img
              src={customerData.profile_image?customerData.profile_image:profilepic}
              alt="User"
              style={{
                width: "128px",
                height: "128px",
                borderRadius: "50%",
                marginBottom: "16px",
              }}
            />
            <div>
              <Typography className="fw-bold">{customerData.name}</Typography>
              <Typography color="textSecondary">
                <strong>{customerData.customer_id}</strong>
              </Typography>
              <Typography color="textSecondary">
                <i
                  className="fa-solid fa-circle me-1"
                  style={{
                    color:
                      customerData.status === "active" ? "#06db1e" : "#ff0000",
                    fontSize: "8px",
                  }}
                ></i>
                {customerData.status}
              </Typography>
            </div>
          </div>
          <table
            className="ms-4"
            style={{
              width: "100%",
              borderCollapse: "collapse",
              overflowX: "auto",
            }}
          >
            <tbody>
              <tr
                style={{
                  borderBottom: "1px solid #ddd",
                  borderLeft: "1px solid #ddd",
                }}
              >
                <td className="px-3">
                  <Typography>
                    <strong>Gender:</strong>
                    <span className="ms-2">{customerData.gender}</span>
                  </Typography>
                </td>
                <td className="px-3">
                  <Typography>
                    <strong>Date of Birth:</strong>
                    <span className="ms-2">{customerData.dob}</span>
                  </Typography>
                </td>
                <td className="px-3">
                  <Typography>
                    <strong>Phone Number:</strong>
                    <span className="ms-2">{customerData.contact}</span>
                  </Typography>
                </td>
                <td>
                  <Typography>
                    <strong>Email:</strong>
                    <span className="ms-2">{customerData.email}</span>
                  </Typography>
                </td>
              </tr>
              <tr
                style={{
                  borderBottom: "1px solid #ddd",
                  borderLeft: "1px solid #ddd",
                  backgroundColor: "transparent",
                }}
              >
                <td className="px-3">
                  <Typography>
                    <strong>Occupation:</strong>
                    <span className="ms-2">{customerData.occupation}</span>
                  </Typography>
                </td>
                <td className="px-3">
                  <Typography>
                    <strong>Aadhar Number:</strong>
                    <span className="ms-2">
                      {customerData.aadhar_card_number}
                    </span>
                  </Typography>
                </td>
                <td className="px-3">
                  <Typography>
                    <strong>PAN Card Number:</strong>
                    <span className="ms-2">{customerData.pan_card_number}</span>
                  </Typography>
                </td>
                <td>
                  <Typography>
                    <strong>Status:</strong>
                    <span className="ms-2">{customerData.status}</span>
                  </Typography>
                </td>
              </tr>
              <tr style={{ borderLeft: "1px solid #ddd" }}>
                <td className="px-3">
                  <Typography>
                    <strong>Father name:</strong>
                    <span className="ms-2">{customerData.father_name}</span>
                  </Typography>
                </td>
                <td className="px-3">
                  <Typography>
                    <strong>Mother name:</strong>
                    <span className="ms-2">{customerData.mother_name}</span>
                  </Typography>
                </td>
                <td className="px-3">
                  <Typography>
                    <strong>Health condition:</strong>
                    <span className="ms-2">
                      {customerData.health_condition}
                    </span>
                  </Typography>
                </td>
                <td>
                  <Typography>
                    <strong>Guardian name:</strong>
                    <span className="ms-2">{customerData.guardian_name}</span>
                  </Typography>
                </td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>
      <div className="container">
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          style={{ marginTop: "32px" }}
        >
          <Tab label="Customer Policies" />
          <Tab label="Family members" />
          <Tab label="Nominee" />
          <Tab label="Transaction history" />
        </Tabs>

        {tabValue === 0 && (
          <DataTable
            data={policyUser}
            columns={cutomerProfileTablecolumn(
              handledeletePolicy,
              userpolicies
            )}
            pagination
          ></DataTable>
        )}

        {/* {tabValue === 1 && (
          <Typography>
            <DataTable
              data={customerData.family_members}
              columns={customerFamilyTablecolumn(relationshipChoice)}
            ></DataTable>
          </Typography>
        )} */}

        {tabValue === 1 && (
          <Typography>
            <DataTable
              data={familyMember}
              columns={customerFamilyTablecolumn(
                relationshipChoice,
                handleEdit,
                handledeleteFamily
              )}
            />
          </Typography>
        )}

        {/* Render the edit modal */}
        <EditFamilyMemberModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          familyData={familyData}
          setFamilyData={setFamilyData}
          handleSave={handleSave}
        />

        {tabValue === 2 && (
          <Typography>
            <DataTable
              data={nomineee}
              columns={customerNomineeTablecolumn(handleEditnominee,handledeletenominee)}
            ></DataTable>
          </Typography>
        )}

        <EditProfileNomineeModal
          show={nomineemodalShow}
          onHide={() => setnomineeModalShow(false)}
          nomineeFormData={nomineeFormData}
          setNomineeFormData={setNomineeFormData}
          handleSave={handleSavenominee}
        />

        {tabValue === 3 && (
          <Typography>
            <DataTable
              data={transaction}
              columns={customerPaymentTableColumn(
                handleEditpayment,
                usercustomer,
                userpolicies,
                handledeleteTransaction
              )}
            ></DataTable>
          </Typography>
        )}

        <EditProfileTransactionModal
          show={paymentmodalShow}
          onHide={() => setpaymentmodalShow(false)}
          paymentData={paymentData}
          setPaymentData={setPaymentData}
          handleSave={handlepaymentSave}
        />
      </div>
    </div>
  );
};

export default UserProfile;
