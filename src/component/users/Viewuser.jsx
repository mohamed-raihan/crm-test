import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import "../../css/layout/users/viewuser.css";
import allaxios from "../../api/axios";
import API_URL from "../../api/api_urls";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const ViewuserModal = ({ toggle ,userData}) => {

  const [userdata,setuserdata] = useState([])

  const fetchUsers = async()=>{
    const response = await allaxios.get(API_URL.USERS.GET_USERS,{
     headers:{
     Authorization:`Bearer ${sessionStorage.getItem('authToken')}`
     }
})

        console.log('users data',response.data);
        setuserdata(response.data)
  }

  console.log('userdata',userData);
  
  console.log("View :", toggle);


  useEffect(()=>{
   fetchUsers()
  },[])


  return (
    // <div className="viewbranch-overlay">
    //   <div className="viewbranch-container animate-modal">
    //     {/* Top-level Heading and Icons */}
    //     <div className="branch-header">
    //       <div
    //         className="user-initial"
    //         style={{
    //           height: "60px",
    //           width: "60px",
    //           borderRadius: "50%",
    //           background: "red",
    //           padding: "18px",
    //           position: "relative",
    //           left: "20px",
    //         }}
    //       >
    //         SM
    //       </div>
    //       <div className="user-details" style={{ position: "relative", right: "150px" }}>
    //         <h4>Sijo Mathew</h4>
    //         <p>Branch manager • Kayamkulam</p>
    //       </div>
    //       <div className="header-icons">
    //         <FaTimes className="icon-close" onClick={toggle} />
    //       </div>
    //     </div>

    //     {/* Info Section */}
    //     <div className="branch-info-section">
    //       {/* First Row */}
    //       <div className="info-column">
    //         <h6>Address</h6>
    //         <p><b>123 Main Street, City, State</b></p>
    //       </div>
    //       <div className="info-column">
    //         <h6>Contact Number</h6>
    //         <p><b>+1 123-456-7890</b></p>
    //       </div>
    //       <div className="info-column">
    //         <h6>Email Address</h6>
    //         <p><b>example@domain.com</b></p>
    //       </div>

    //       {/* Second Row */}
    //       <div className="info-column">
    //         <h6>Gender</h6>
    //         <p><b>Male</b></p>
    //       </div>
    //       <div className="info-column">
    //         <h6>Join Date</h6>
    //         <p><b>11/12/2025</b></p>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    
    <div className="" style={{background:"red"}}>
   <Modal
    toggle={toggle}
      // onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      
      <Modal.Header >
        <Modal.Title id="contained-modal-title-vcenter" >
          User Details
        </Modal.Title>  
      </Modal.Header>
      <Modal.Body>
        <div className="user-details-container">
          {/* Replace with actual user data */}
          <div className="user-initial">
            <div
              style={{
                height: "60px",
                width: "60px",
                borderRadius: "50%",
                background: "red",
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "24px",
              }}
            >
              SM
            </div>
          </div>
          <div className="user-details" style={{ marginLeft: "20px" }}>
            <h4>Sijo Mathew</h4>
            <p>Branch Manager • Kayamkulam</p>
          </div>

          {/* Info Section */}
          <div className="branch-info-section">
            <div className="info-row">
              <div className="info-column">
                <h6>Address</h6>
                <p><b>123 Main Street, City, State</b></p>
              </div>
              <div className="info-column">
                <h6>Contact Number</h6>
                <p><b>+1 123-456-7890</b></p>
              </div>
              <div className="info-column">
                <h6>Email Address</h6>
                <p><b>example@domain.com</b></p>
              </div>
            </div>
            <div className="info-row">
              <div className="info-column">
                <h6>Gender</h6>
                <p><b>Male</b></p>
              </div>
              <div className="info-column">
                <h6>Join Date</h6>
                <p><b>11/12/2025</b></p>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
    </div>
    
  );
};

export default ViewuserModal;
