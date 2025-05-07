import React, { useEffect, useState } from "react";
import {
  CustomerAdminTableColumn,
  CustomerTableColumn,
} from "../../component/Common/TableDatas.jsx";
import DataTable from "react-data-table-component";
import { Button, Input, Modal } from "reactstrap";
import NewUserModal from "./Newcustomer.jsx";
import ViewUserModal from "./Viewcustomer.jsx";
import Editcustomermodal from "./Editcustomer.jsx";
import API_URL from "../../api/api_urls";
import allaxios from "../../api/axios";
import { ModalBody, ModalFooter, ModalHeader } from "react-bootstrap";
import { toast } from "react-toastify";
import { use } from "react";
import { useNavigate } from "react-router-dom";
// import PolicyAssignmentModal from "./Policyassign.jsx";

const Customertable = () => {
  const [modal, setModal] = useState(false);
  const [viewmodal, setviewmodal] = useState(false);
  const [iscustomer, setiscustomer] = useState(false);
  const [showEditAction, setShowEditAction] = useState(true); // Default: Edit button visible

  const [editmodal, seteditModal] = useState(false);
  const [customerdata, setcustomerdata] = useState([]);
  const [userrole, setuserrole] = useState([]);
  const [userbranch, setuserbranch] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [usernominee, setusernominee] = useState([]);
  const [policyModal, setPolicyModal] = useState(false);
  const [suggestions, setSuggestions] = useState([]); // Holds matching suggestions

  const toggle = () => setModal(!modal);

  const edittoggle = () => seteditModal(!editmodal);

  // const viewtoggle =() =>setviewmodal(!viewmodal)
  const navigate = useNavigate();
  const handleViewUser = (user) => {
    setSelectedUser(user);
    setviewmodal(true);
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

  const togglePolicyModal = (customer) => {
    setSelectedUser(customer);
    setPolicyModal(!policyModal);
    console.log(customer);
  };

  console.log(selectedUser);

  const handleEditUser = (user) => {
    setSelectedUser(user);
    seteditModal(true);
    console.log(editmodal);
  };

  const handleprofilenavigate = (user) => {
    setSelectedUser(user);
    console.log("profile", user);

    navigate("/customerprofile", { state: { customerData: user } });
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    if (value.trim() === "") {
      setSuggestions([]); // Clear suggestions when input is empty
      setFilteredData(customerdata);
      return;
    }

    // Filter suggestions
    const matchedSuggestions = customerdata
      .filter(
        (user) =>
          user.name.toLowerCase().includes(value) ||
          (user.role && user.role.toLowerCase().includes(value))
      )
      .map((user) => ({
        name: user.name,
        role: user.role || "", // Ensure role is not undefined
      }));

    setSuggestions(matchedSuggestions);

    // Filter table data
    const filtered = customerdata.filter(
      (user) =>
        user.name.toLowerCase().includes(value) ||
        (user.role && user.role.toLowerCase().includes(value))
    );

    setFilteredData(filtered);
  };

  const handleSuggestionClick = (text) => {
    setSearchTerm(text);
    setSuggestions([]);

    // Filter based on clicked suggestion
    const filtered = customerdata.filter(
      (user) =>
        user.name.toLowerCase() === text.toLowerCase() ||
        (user.role && user.role.toLowerCase() === text.toLowerCase())
    );

    setFilteredData(filtered);
  };

  console.log(customerdata);

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

      // const filteredCustomers = response.data.filter(
      //   (customer) => customer.created_by.id === userData.login_id
      // );

      // console.log("Filtered Customers:", filteredCustomers);
      setcustomerdata(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error("Error occurred while fetching or processing data:", error);
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
    const response = await allaxios.get(API_URL.BRANCH.GET_BRANCH, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
      },
    });

    console.log("users branch", response.data);
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
  console.log("View Modal State:", viewmodal);
  console.log("Selected User:", selectedUser);

  const handleToggleStatus = async (row) => {
    try {
      // Find the user details from userdata.users by matching the ID
      const user = customerdata.find((u) => u.id === row.id);

      if (!user) {
        toast.error("User not found.");
        return;
      }

      // Determine the new status based on the current status
      const newStatus = user.status === "active" ? "deactivated" : "active";

      console.log("Toggling status for ID:", row.id, "to:", newStatus);

      // Make the patch request with the new status
      const response = await allaxios.patch(
        API_URL.CUSTOMER.PATCH_CUSTOMER(row.id), // Pass the correct user ID
        { status: newStatus }, // Send only the new status
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
          },
        }
      );

      console.log("Status updated successfully:", response.data);
      toast.success("User status updated successfully!");

      fetchCustomers(); // Refresh user list after toggling status
    } catch (error) {
      console.error("Error toggling status:", error);
      toast.error("Failed to update status. Please try again.");
    }
  };

  useEffect(() => {
    fetchCustomers();
    fetchbranch();
    fetchrole();
    fetchnominees();
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

  console.log(policyModal);

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
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search..."
          />

          {/* Suggestions Dropdown */}
          {suggestions.length > 0 && (
            <ul
              className="list-group position-absolute  shadow"
              style={{ width: "210px", marginTop: "30px" }}
            >
              {suggestions.map((item, index) => (
                <li
                  key={index}
                  className="list-group-item list-group-item-action"
                  onClick={() => handleSuggestionClick(item.name)}
                  style={{
                    cursor: "pointer",
                    marginTop: "10px",
                    zIndex: "1",
                    width: "215px",
                  }}
                >
                  {item.name} {item.role ? `(${item.role})` : ""}{" "}
                  {/* Fix here */}
                </li>
              ))}
            </ul>
          )}
          {/* <Button onClick={toggle} className="btn bg-primary w-50">
            + Add new
          </Button> */}
        </div>
      </div>

      <DataTable
        className="border shadow"
        data={filteredData}
        columns={CustomerAdminTableColumn(
          handleViewUser,
          handleEditUser,
          handledelete,
          handleprofilenavigate,
          togglePolicyModal,
          userrole,
          userbranch,
          showEditAction,
          handleToggleStatus
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

      {/* <Modal isOpen={policyModal} toggle={() => setPolicyModal(false)} centered={true}>
  <PolicyAssignmentModal 
    toggle={() => setPolicyModal(false)} 
    customer={selectedUser} 
    isOpen={policyModal}
  />
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

      {/* <Modal isOpen={editmodal} toggle={() => seteditModal(false)} centered={true} >
        <Editusermodal toggle={() => seteditModal(false)} userData={selectedUser} onUserUpdated={fetchUsers}/>
      </Modal> */}

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
