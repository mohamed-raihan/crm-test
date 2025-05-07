// StaticLayout.js
import React, { useEffect, useState } from "react";
import "../css/routes/userstaticlayout.css";
import { Col, Row } from "reactstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { Alert, Button } from "react-bootstrap";
import Sidebar from "../branchManager/layout/SideBar";
import ManagerHeader from "../branchManager/layout/ManagerHeader";

const ManagerStaticlayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showAlert, setShowAlert] = useState(false);
  const [usertoken, setusertoken] = useState(false);
  // const { userLoginData } = useUser(); // Access userLoginData from the context

  console.log("Current location", location);
  console.log("alert", showAlert);
  const token = sessionStorage.getItem("authToken");
  console.log("usertoken", usertoken);

  return (
    <div>
      <ManagerHeader />
      <div className="usersidebarsection">
        <Row>
          <Col md={2}>
            <Sidebar />
          </Col>
          <Col style={{minHeight:"100vh",backgroundColor:"#edede9"}} md={10}>
            <div className="content" style={{ marginTop: "120px" }}>
              {children}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ManagerStaticlayout;
