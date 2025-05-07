import React, { useEffect, useState } from "react";
import { userTableColumn } from "../Common/TableDatas";
import DataTable from "react-data-table-component";
import { Button, Modal } from "reactstrap";
import NewUserModal from "./NewUserModal";
import ViewUserModal from "./Viewuser.jsx";
import Editusermodal from "./Editusermodal";
import API_URL from "../../api/api_urls";
import allaxios from "../../api/axios";
import { ModalBody, ModalFooter, ModalHeader } from "react-bootstrap";
import { toast } from "react-toastify";
import { use } from "react";

const UserTable = () => {
  const [modal, setModal] = useState(false);
  const [viewmodal, setviewmodal] = useState(false);
  const [editmodal, seteditModal] = useState(false);
  const [userdata, setuserdata] = useState([]);
  const [userrole, setuserrole] = useState([]);
  const [userbranch, setuserbranch] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]); // Holds matching suggestions

  const toggle = () => setModal(!modal);

  const edittoggle = () => seteditModal(!editmodal);

  // const viewtoggle =() =>setviewmodal(!viewmodal)

  const handleViewUser = (user) => {
    setSelectedUser(user); // Set the user to view
    setviewmodal(true); // Open the view modal
  };

  console.log(selectedUser);
  console.log(userbranch);
  

  const handleEditUser = (user) => {
    setSelectedUser(user);
    seteditModal(true);
    console.log(editmodal);
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
  
    if (value.trim() === "") {
      setSuggestions([]); // Clear suggestions when input is empty
      setFilteredData(userdata.users);
      return;
    }
  
    // Function to get role name by ID
    const getRoleName = (roleId) => {
      const role = userrole.find((r) => r.id === roleId);
      return role ? role.name : "Unknown Role"; // Default to "Unknown Role" if not found
    };
  
    // Filter suggestions based on name or role
    const matchedSuggestions = userdata.users
      .filter(
        (user) =>
          user.name.toLowerCase().includes(value) ||
          (user.role && getRoleName(user.role).toLowerCase().includes(value))
      )
      .map((user) => ({
        name: user.name,
        role: getRoleName(user.role), // Convert role ID to role name
      }));
  
    setSuggestions(matchedSuggestions);
  
    // Filter table data based on input
    const filtered = userdata.users.filter(
      (user) =>
        user.name.toLowerCase().includes(value) ||
        (user.role && getRoleName(user.role).toLowerCase().includes(value))
    );
  
    setFilteredData(filtered);
  };
  
  // When user clicks a suggestion, update search box and filter table
  const handleSuggestionClick = (selected) => {
    setSearchTerm(selected); // Update input field
    setSuggestions([]); // Hide the suggestions
  
    // Function to get role name by ID
    const getRoleName = (roleId) => {
      const role = userrole.find((r) => r.id === roleId);
      return role ? role.name : "Unknown Role"; 
    };
  
    // Find the user with the selected name or role
    const filtered = userdata.users.filter(
      (user) =>
        user.name.toLowerCase() === selected.toLowerCase() ||
        (user.role && getRoleName(user.role).toLowerCase() === selected.toLowerCase())
    );
  
    setFilteredData(filtered); // Update table with filtered results
  };
  
  
  
  console.log(filteredData);
  console.log("data", userdata);

  const handleToggleStatus = async (row) => {
    try {
      // Find the user details from userdata.users by matching the ID
      const user = userdata.users.find((u) => u.id === row.id);

      if (!user) {
        toast.error("User not found.");
        return;
      }

      // Determine the new status based on the current status
      const newStatus = user.status === "active" ? "deactivated" : "active";

      console.log("Toggling status for ID:", row.id, "to:", newStatus);

      // Make the patch request with the new status
      const response = await allaxios.patch(
        API_URL.USERS.USER_PATCH(row.id), // Pass the correct user ID
        { status: newStatus }, // Send only the new status
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
          },
        }
      );

      console.log("Status updated successfully:", response.data);
      toast.success("User status updated successfully!");

      fetchUsers(); // Refresh user list after toggling status
    } catch (error) {
      console.error("Error toggling status:", error);
      toast.error("Failed to update status. Please try again.");
    }
  };

  const fetchUsers = async () => {
    const response = await allaxios.get(API_URL.USERS.GET_USERS, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
      },
    });

    console.log("users data", response.data);
    setuserdata(response.data);
    setFilteredData(response.data.users);
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

  // Fetch user branches
  const fetchUserBranches = async () => {
    try {
      const response = await allaxios.get(API_URL.BRANCH.GET_BRANCH, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      });
      setuserbranch(response.data);
    } catch (error) {
      console.error("Error fetching branches:", error);
    }
  };

  console.log("View Modal State:", viewmodal);
  console.log("Selected User:", selectedUser);

  useEffect(() => {
    fetchUsers();
    fetchUserBranches();
    fetchrole();
  }, [modal]);

  console.log("users", userdata);

  const handledelete = async (id) => {
    toast.warning(
      <div>
        <span>Are you sure you want to delete this user?</span>
        <br />
        <Button
          color="danger"
          size="sm"
          onClick={async () => {
            try {
              const response = await allaxios.delete(
                API_URL.USERS.DELETE_USERS(id),
                {
                  headers: {
                    Authorization: `Bearer ${sessionStorage.getItem(
                      "authToken"
                    )}`,
                  },
                }
              );
              console.log("User deleted successfully:", response.data);
              toast.success("User deleted successfully!", {
                autoClose: 2000,
              });
              fetchUsers();
              toast.dismiss();
            } catch (error) {
              console.error("Error deleting user:", error);
              toast.error("Failed to delete user. Please try again.");
            }
          }}
          className="ms-2"
        >
          Yes
        </Button>
        <Button
          color="secondary"
          size="sm"
          onClick={() => toast.dismiss()}
          className="ms-2"
        >
          No
        </Button>
      </div>,
      {
        position: "top-center", // Default position, will be overridden by custom styles
        autoClose: false,

        hideProgressBar: true,
        closeButton: false,
        className: "custom-toast", // Custom class to apply styles
      }
    );
  };

  const data = [
    {
      name: "raihan",
      contact_number: "9567545214",
      email: "raihan@gmail.com",
    },
  ];

  return (
    <div className="table-wrapper">
      <div className="d-flex flex-wrap justify-content-between p-3 border mb-2 shadow">
        <div className="d-flex">
          <h5 className="ms-2">Users</h5>
        </div>
        <div className="d-flex">
        <input
    className="form-control me-2 w-100"
    type="text"
    value={searchTerm}
    onChange={handleSearch}
    placeholder="Search by name or role..."
  />

  {/* Suggestions Dropdown */}
  {suggestions.length > 0 && (
    <ul className="list-group position-absolute  mt-1 shadow bg-white rounded border" style={{ position:"relative",
      top:"190px"}} >
      {suggestions.map((item, index) => (
        <li
          key={index}
          className="list-group-item list-group-item-action px-3 py-2 "
          onClick={() => handleSuggestionClick(item.name)}
          style={{
            cursor: "pointer",
            transition: "background 0.3s",
            zIndex:"1",
            width:"200px",
           
          }}
          onMouseEnter={(e) => (e.target.style.background = "#f8f9fa")}
          onMouseLeave={(e) => (e.target.style.background = "white")}
        >
          <span>{item.name}</span> {item.role ? `(${item.role})` : ""}
        </li>
      ))}
    </ul>
  )}
          <Button onClick={toggle} className="btn bg-primary w-50">
            + Add new
          </Button>
        </div>
      </div>
      <DataTable
        className="border shadow"
        data={filteredData}
        columns={userTableColumn(
          handleViewUser,
          handleEditUser,
          handledelete,
          handleToggleStatus,
          userrole,
          userbranch
        )}
        customStyles={{
          table: {
            style: {
              width: "100%",
            },
          },
        }}
        striped={true}
        pagination
        // selectableRows={true}
      ></DataTable>
      <Modal isOpen={modal} toggle={toggle} centered={true}>
        <NewUserModal userbranch={userbranch} toggle={toggle} />
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

      <Modal
        isOpen={viewmodal}
        toggle={() => setviewmodal(false)}
        centered={true}
      >
        <ModalHeader toggle={() => setviewmodal(false)}>
          User Details
        </ModalHeader>
        <ModalBody>
          {selectedUser ? (
            <div>
              <p>
                <strong>Name:</strong> {selectedUser.name}
              </p>
              <p>
                <strong>Email:</strong> {selectedUser.email}
              </p>
              <p>
                <strong>Contact:</strong> {selectedUser.contact}
              </p>
              <p>
                <strong>job type:</strong> {selectedUser.job_type}
              </p>
              <p>
                <strong>Contact:</strong> {selectedUser.contact}
              </p>
            </div>
          ) : (
            <p>No user data available</p>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => setviewmodal(false)}>
            Close
          </Button>
        </ModalFooter>
      </Modal>

      {/* <Modal isOpen={editmodal} toggle={() => seteditModal(false)} centered={true} >
        <Editusermodal toggle={() => seteditModal(false)} userData={selectedUser} onUserUpdated={fetchUsers}/>
      </Modal> */}

      <Modal
        isOpen={editmodal}
        toggle={() => seteditModal(false)}
        centered={true}
      >
        <Editusermodal
          toggle={() => seteditModal(false)}
          userData={selectedUser}
          onUserUpdated={fetchUsers}
          userbranch={userbranch}
        />
      </Modal>

      {/* </Modal> */}
    </div>
  );
};

export default UserTable;
