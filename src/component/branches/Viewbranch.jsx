import React from "react";
import { FaEdit, FaTimes } from "react-icons/fa";
import '../../css/layout/branch/viewbranch.css';
import allaxios from "../../api/axios";

const ViewBranchModal = ({ toggle, view }) => {

  return (
    <div className="viewbranch-container">
      {/* Top-level Heading and Icons */}
      <div className="branch-header">
        <h5>{view.name}</h5>
        <div className="header-icons">
          {/* <FaEdit className="icon-edit" /> */}
          <i class="fa-solid fa-pen"></i>
          <FaTimes className="icon-close" onClick={toggle} />
        </div>
      </div>

      {/* First Section */}
      <div className="branch-info-section">
        <div className="info-column">
          <h6>Address</h6>
          <p><b>{view.address}</b></p>
        </div>
        <div className="info-column">
          <h6>Contact Number</h6>
          <p><b>{view.contact}</b></p>
        </div>
        <div className="info-column">
          <h6>Email Address</h6>
          <p><b>{view.email}</b></p>
        </div>
      </div>

      {/* Second Section */}
      <div className="user-table-section">
        <div className="table-header">
          <h4>Users <span style={{borderRadius:"50%",background:"#2dc653",fontSize:"10px",padding:"5px"}}>36</span></h4>
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
              <th><i style={{fontSize:"15px"}} class="fa-solid fa-eye" ></i></th>

            </tr>
            <tr>
              <td><b>Mathews Sijo</b></td>
              <td><b>+1 123-456-7890</b></td>
              <td><b>Asst. Branch Manager</b></td>
              <th><i style={{fontSize:"15px"}} class="fa-solid fa-eye" ></i></th>

            </tr>
            <tr>
              <td><b>Jijo Mathew</b></td>
              <td><b>+1 987-654-3210</b></td>
              <td><b>Agent</b></td>
              <th><i style={{fontSize:"15px"}} class="fa-solid fa-eye" ></i></th>

            </tr>
            {/* <i style={{fontSize:"15px"}} class="fa-solid fa-eye" onClick={viewtoggle}></i> */}

           
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewBranchModal;
