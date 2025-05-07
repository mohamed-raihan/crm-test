// StaticLayout.js
import React, { useEffect, useState } from "react";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";
import "../css/routes/staticlayout.css";
import { Col, Row } from "reactstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { Alert, Button } from "react-bootstrap";

const StaticLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showAlert, setShowAlert] = useState(false);
  const [usertoken, setusertoken] = useState(false);

  return (
    <div>
      <Header />
      <div className="sidebarsection">
        <Row>
          <Col>
            <Sidebar />
          </Col>
          <Col style={{minHeight:"100vh",backgroundColor:"#edede9"}} md={10}>
            <div className="content " style={{ marginTop: "120px" }}>
              {children}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default StaticLayout;
