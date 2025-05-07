import React, { useState } from "react";
import { FaEdit, FaTimes } from "react-icons/fa";
import '../../css/layout/branch/editbranch.css';
import { Modal } from "reactstrap";
import NewBranchModal from "./NewBranchModal";

const EditBranchModal = ({ toggle,data,fetchBranch}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Modal state
  const [editData, setEditData] = useState({
    address: "123 Main Street, City, State",
    contact: "+1 123-456-7890",
    email: "example@domain.com",
  });

  // Function to toggle the edit modal
  const toggleEditModal = () => {
    setIsEditModalOpen(!isEditModalOpen);
  };

  // Handle input change in the edit modal
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Data:", editData); // Replace with your API call
    toggleEditModal();
  };

  return (
    <div className="viewbranch-container">
      {/* Top-level Heading and Icons */}
      <div className="branch-header">
        <h5>{data.name}</h5>
        <div className="header-icons">
          <FaTimes className="icon-close" onClick={toggle} />
        </div>
      </div>

      {/* First Section */}
      <div className="branch-info-section">
        <div className="info-column">
          <h6>Address</h6>
          <p><b>{data.address}</b></p>
        </div>
        <div className="info-column">
          <h6>Contact Number</h6>
          <p><b>{data.contact}</b></p>
        </div>
        <div className="info-column">
          <h6>Email Address</h6>
          <p><b>{data.email}</b></p>
        </div>
        <div>
          <i
            className="fa-solid fa-pen"
            style={{ cursor: "pointer" }}
            onClick={toggleEditModal}
          ></i>
        </div>
      </div>

      {/* Second Section */}
      <div className="user-table-section">
        <div className="table-header">
          <h4>
            Users{" "}
            {/* <span
              style={{
                borderRadius: "50%",
                background: "#2dc653",
                fontSize: "10px",
                padding: "5px",
              }}
            >
              36
            </span> */}
          </h4>
          <input
            type="text"
            placeholder="Search users..."
            className="search-bar"
          />
        </div>
        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact Number</th>
              <th>Role</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><b>Sijo Mathew</b></td>
              <td><b>+1 987-654-3210</b></td>
              <td><b>Branch Manager</b></td>
              <th><i style={{ fontSize: "15px", color: "red" }} className="fa-solid fa-trash"></i></th>
            </tr>
            <tr>
              <td><b>Mathews Sijo</b></td>
              <td><b>+1 123-456-7890</b></td>
              <td><b>Asst. Branch Manager</b></td>
              <th><i style={{ fontSize: "15px", color: "red" }} className="fa-solid fa-trash"></i></th>
            </tr>
            <tr>
              <td><b>Jijo Mathew</b></td>
              <td><b>+1 987-654-3210</b></td>
              <td><b>Agent</b></td>
              <th><i style={{ fontSize: "15px", color: "red" }} className="fa-solid fa-trash"></i></th>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {/* {isEditModalOpen && (
        <div className="modal-overlay  ">
          <div className="modal-content " >
            <div className="modal-header">
              <h5>Edit Branch Details</h5>
              <FaTimes className="icon-close" onClick={toggleEditModal} />
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <label><b>Address</b></label>
                <input
                  type="textarea"
                  name="address"
                  value={editData.address}
                  onChange={handleInputChange}
                />

                <label><b>Contact Number</b></label>
                <input
                  type="text"
                  name="contact"
                  value={editData.contact}
                  onChange={handleInputChange}
                />

                <label><b>Email Address</b></label>
                <input
                  type="email"
                  name="email"
                  value={editData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="modal-footer">
                <button type="submit" className="save-btn" style={{width:"100px",height:"40px",marginTop:"10px"}}>Save</button>
                <button type="button" className="cancel-btn" onClick={toggleEditModal} style={{width:"100px",height:"40px",marginTop:"10px"}}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )} */}
      
      <Modal isOpen={isEditModalOpen} toggle={toggleEditModal}>
        <NewBranchModal fetchBranch={fetchBranch} data={data} editToggle={toggleEditModal}/>
      </Modal>

    </div>
  );
};

export default EditBranchModal;
