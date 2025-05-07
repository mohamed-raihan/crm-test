import React, { useEffect, useState } from "react";
import { CustomerBranchTableColumn } from "../../component/Common/TableDatas.jsx";
import DataTable from "react-data-table-component";
import { Button, Input, Modal } from "reactstrap";
import NewUserModal from "./Newcustomerdetails.jsx";
// import ViewUserModal from "./Viewmanagercustomer.jsx";
import Editcustomermodal from "./Editcustomerdetails.jsx";
import API_URL from "../../api/api_urls";
import allaxios from "../../api/axios";
import { ModalBody, ModalFooter, ModalHeader } from "react-bootstrap";
import { toast } from "react-toastify";
import { use } from "react";
import { Tab, Tabs } from "react-bootstrap";
import "../../css/layout/branchmanagerdashboard/customerdetails/customerdetailstable.css";
import { useNavigate } from "react-router-dom";
import PolicyAssignmentModal from "../customers/Policyassign.jsx";
import { BeatLoader } from "react-spinners";

const Customertable = () => {
  const [modal, setModal] = useState(false);
  const [viewmodal, setviewmodal] = useState(false);
  const [editmodal, seteditModal] = useState(false);
  const [customerdata, setcustomerdata] = useState([]);
  const [userrole, setuserrole] = useState([]);
  const [userbranch, setuserbranch] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [usernominee, setusernominee] = useState([]);
  const [activeTab, setActiveTab] = useState("nominee");
  const [nomineeData, setnomineeData] = useState([]);
  const [policyModal, setPolicyModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const toggle = () => setModal(!modal);

  const edittoggle = () => seteditModal(!editmodal);

  // const viewtoggle =() =>setviewmodal(!viewmodal)
  const navigate = useNavigate();

  // const handleViewUser = (user) => {
  //   setSelectedUser(user);
  //   setviewmodal(true);
  // };

  const togglePolicyModal = (customer) => {
    setSelectedUser(customer);
    setPolicyModal(!policyModal);
    console.log(customer);
  };
  const dummyCustomerData = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      contact_number: "9876543210",
      job_type: "Full-Time",
      branch: "New York",
      role: "Manager",
    },
  ];

  console.log(selectedUser);

  // const handleEditUser = (user) => {
  //   setSelectedUser(user);
  //   seteditModal(true);
  //   console.log(editmodal);
  // };

  const handleprofilenavigate = (user) => {
    setSelectedUser(user);
    setShowAlert(true);
  };

  const handleConfirm = () => {
    setShowAlert(false);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      console.log("profile", selectedUser);
      navigate("/customerprofile", { state: { customerData: selectedUser } });
    }, 700);
  };

  const handleCancel = () => {
    setShowAlert(false);
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = userdata.filter((user) =>
      user.name.toLowerCase().includes(value)
    );
    setFilteredData(filtered);
  };

  // const fetchCustomers = async () => {
  //   const response = await allaxios.get(API_URL.CUSTOMER.GET_CUSTOMER, {
  //     headers: {
  //       Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
  //     },
  //   });

  //   console.log("customer data", response.data);
  //   setcustomerdata(response.data);
  //   setFilteredData(response.data);
  // };

  const fetchCustomers = async () => {
    const userDataString = sessionStorage.getItem("userData");

    if (!userDataString) {
      console.log("No user data found in session storage.");
      return;
    }

    try {
      const userData = JSON.parse(userDataString);
      console.log("Logged-in User ID:", userData.login_id);

      const response = await allaxios.get(API_URL.CUSTOMER.GET_CUSTOMER, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      });

      console.log("API Response:", response.data);

      const filteredCustomers = response.data.filter(
        (customer) => customer.created_by.id === userData.login_id
      );

      console.log("Filtered Customers:", filteredCustomers);
      setcustomerdata(filteredCustomers);
      setFilteredData(filteredCustomers);
    } catch (error) {
      console.error("Error occurred while fetching or processing data:", error);
    }
  };

  const fetchnomineetable = async () => {
    try {
      const response = await allaxios.get(API_URL.CUSTOMER.GET_CUSTOMER, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      });

      const data = response.data;
      console.log("Full Customer Data:", data);

      // Extracting nominees from each customer object
      const nomineeList = data.flatMap((customer) => customer.nominees || []);

      console.log("Extracted Nominee Data:", nomineeList);

      // Setting the nominee data
      setnomineeData(nomineeList);
    } catch (error) {
      console.error("Error fetching nominee data:", error);
    }
  };

  const fetchrole = async () => {
    const response = await allaxios.get(API_URL.USERROLE.GET_ROLE, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
      },
    });

    console.log("users role", response.data);
    setuserrole(response.data);
  };

  const fetchnominees = async () => {
    const response = await allaxios.get(API_URL.NOMINEE.GET_NOMINEE, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
      },
    });

    console.log("users nominee", response.data);
    setusernominee(response.data);
  };
  const fetchbranch = async () => {
    const response = await allaxios.get(API_URL.BRANCH.GET_BRANCH, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
      },
    });

    console.log("users branch", response.data);
    setuserbranch(response.data);
  };

  useEffect(() => {
    fetchCustomers();
    fetchbranch();
    fetchrole();
    fetchnominees();
    fetchnomineetable();
  }, [modal]);

  console.log("customerdata", customerdata);

  const handledelete = async (id) => {
    try {
      const response = await allaxios.delete(
        API_URL.CUSTOMER.DELETE_CUSTOMER(id),
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
          },
        }
      );
      console.log("User deleted successfully:", response.data);
      toast.success("User deleted successfully!");
      fetchCustomers(); // Refresh the user list after deletion
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user. Please try again.");
    }
  };

  const overlayStyles = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  };

  const alertStyles = {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0px 0px 15px rgba(0,0,0,0.3)",
    width: "300px",
  };

  const messageStyles = {
    fontSize: "16px",
    marginBottom: "15px",
    fontWeight: "bold",
  };

  const buttonContainer = {
    display: "flex",
    justifyContent: "space-between",
  };

  const buttonStyles = {
    padding: "8px 12px",
    borderRadius: "5px",
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    cursor: "pointer",
    width: "45%",
  };

  const cancelButtonStyles = {
    ...buttonStyles,
    backgroundColor: "#e74c3c",
  };

  const spinnerStyles = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Black overlay with 70% opacity
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1050, // Higher than alert
  };

  return (
    <div className="table-wrapper">
      {/* <div className="d-flex justify-content-between p-3 border mb-2 shadow">
        <h5 className="ms-2">Customers</h5>
        <input
          className="ms-5 w-50 "
          type="text"
          placeholder="search"
          onChange={handleSearch}
          style={{ position: "relative" }}
        />
          <Button onClick={toggle} className="btn bg-primary w-50">
                    + Add new
       </Button>
      </div> */}
      <div className="d-flex flex-wrap justify-content-between p-3 border mb-2 shadow position-relative">
        <h5 className="ms-2">Customer</h5>
        <div className="d-flex">
          <input
            className="form-control me-2 w-100"
            type="text"
            onChange={handleSearch}
            placeholder="search"
          />
          <Button onClick={toggle} className="btn bg-primary w-50">
            + Add new
          </Button>
        </div>
      </div>

      <DataTable
        className="border shadow"
        data={filteredData}
        columns={CustomerBranchTableColumn(
          // handleViewUser,
          // handledelete,
          handleprofilenavigate
          // togglePolicyModal,
          // userrole,
          // userbranch,
        )}
        customStyles={{
          table: {
            style: {
              width: "100%",
            },
          },
        }}
        striped={true}
        center={true}
        pagination
        // selectableRows={true}
      ></DataTable>
      <Modal isOpen={modal} toggle={toggle} centered={true}>
        <NewUserModal toggle={toggle} />
      </Modal>
      {/* <Modal isOpen={viewmodal} toggle={viewtoggle} centered={true}> */}
      {/* { viewmodal && ( */}

      {/* <Modal isOpen={viewmodal} toggle={() => setviewmodal(false)} centered={true}>

      <ViewUserModal  toggle={() => setviewmodal(false)} 
        userData={selectedUser}  />

      </Modal> */}

      {/* <Modal isOpen={viewmodal} toggle={() => setviewmodal(false)} centered={true}>
    <ViewUserModal toggle={() => setviewmodal(false)} userData={selectedUser} />
    </Modal> */}

      {/* <Modal isOpen={viewmodal} toggle={() => setviewmodal(false)} centered={true}>
        <ModalHeader toggle={() => setviewmodal(false)}>User Details</ModalHeader>
        <ModalBody>
          {selectedUser ? (
            <div>
              <p><strong>Name:</strong> {selectedUser.name}</p>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Contact:</strong> {selectedUser.contact}</p>
              <p><strong>job type:</strong> {selectedUser.job_type}</p>
              <p><strong>Contact:</strong> {selectedUser.contact}</p>

            </div>
          ) : (
            <p>No user data available</p>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => setviewmodal(false)}>Close</Button>
        </ModalFooter>
      </Modal> */}
      {showAlert && (
        <div style={overlayStyles}>
          <div style={alertStyles}>
            <p style={messageStyles}>
              Edit will be in the profile page. Click OK to proceed.
            </p>
            <div style={buttonContainer}>
              <button onClick={handleConfirm} style={buttonStyles}>
                OK
              </button>
              <button onClick={handleCancel} style={cancelButtonStyles}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div style={spinnerStyles}>
          <BeatLoader color="#3498db" size={10} />
        </div>
      )}

      {/* <Modal isOpen={editmodal} toggle={() => seteditModal(false)} centered={true} >
        <Editusermodal toggle={() => seteditModal(false)} userData={selectedUser} onUserUpdated={fetchUsers}/>
      </Modal> */}
      <Modal
        isOpen={policyModal}
        toggle={() => setPolicyModal(false)}
        centered={true}
      >
        <PolicyAssignmentModal
          toggle={() => setPolicyModal(false)}
          customer={selectedUser}
          isOpen={policyModal}
        />
      </Modal>

      <Modal
        isOpen={editmodal}
        toggle={() => seteditModal(false)}
        centered={true}
      >
        <Editcustomermodal
          toggle={() => seteditModal(false)}
          userData={selectedUser}
          onUserUpdated={fetchCustomers}
        />
      </Modal>
    </div>
  );
};

export default Customertable;
