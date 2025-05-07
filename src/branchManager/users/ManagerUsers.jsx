import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { managerUserTablecolumn } from "../../component/Common/TableDatas";
import allaxios from "../../api/axios";
import API_URL from "../../api/api_urls";
import { Button, Modal } from "reactstrap";
import NewManagerUser from "./NewManagerUser";
import { toast } from "react-toastify";
import EditManagerUser from "./EditManagerUser";

const ManagerUsers = () => {
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [ediData, setEditData] = useState([]);
  const [loggedUser, setLoggedUser] = useState();
  const [userBranch, setuserbranch] = useState([]);

  const toggle = () => setModal(!modal);

  const editToggle = (row) => {
    setEditModal(!editModal);
    setEditData(row);
  };

  const fetchUsers = async () => {
    const userDataString = sessionStorage.getItem("userData");

    if (!userDataString) {
      console.log("No user data found in session storage.");
      return;
    }

    try {
      const userData = JSON.parse(userDataString);
      console.log("Logged-in User ID:", userData.login_id);

      const response = await allaxios.get(API_URL.USERS.GET_USERS);
      console.log("API Response:", response);

      const branchStaff = response.data.users.filter(
        (staff) => staff.created_by.id === userData.login_id
      );

      console.log("Filtered Branch Staff:", branchStaff);
      setData(branchStaff);
    } catch (error) {
      console.error("Error occurred while fetching or processing data:", error);
    }
  };

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

  const handleToggleStatus = async (row) => {
    try {
      // Find the user details from userdata.users by matching the ID
      const user = data.find((u) => u.id === row.id);

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

  useEffect(() => {
    fetchUsers();
    fetchUserBranches();
  }, [modal]);

  return (
    <div className="mx-3">
      <div className="d-flex flex-wrap justify-content-between p-3 border mb-2 shadow">
        <div className="d-flex">
          <h5 className="ms-2">Users</h5>
        </div>
        <div className="d-flex">
          <input
            className="form-control me-2 w-100"
            type="text"
            placeholder="search"
            // onChange={handleSearch}
          />
          <Button onClick={toggle} className="btn bg-primary w-50">
            + Add new
          </Button>
        </div>
      </div>
      <DataTable
        className="border shadow"
        data={data}
        columns={managerUserTablecolumn(
          handleToggleStatus,
          editToggle,
          handledelete,userBranch
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
        <NewManagerUser userBranch={userBranch} toggle={toggle} />
      </Modal>
      <Modal isOpen={editModal} toggle={editToggle} centered={true}>
        <EditManagerUser
          toggle={editToggle}
          userData={ediData}
          fetchUsers={fetchUsers}
        />
      </Modal>
    </div>
  );
};

export default ManagerUsers;
