// StaticLayout.js
import React, { useEffect, useState } from 'react';
import UserHeader from '../usercomponent/userlayout/UserHeader';
import UserSidebar from '../usercomponent/userlayout/UserSidebar';
import '../css/routes/userstaticlayout.css';
import { Col, Row } from 'reactstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { Alert, Button } from 'react-bootstrap';
import { useUser } from '../usercomponent/usercontext/Usercontext'; // Import the context


const StaticLayout = ({ children }) => {
const navigate = useNavigate()
const location = useLocation()
const [showAlert, setShowAlert] = useState(false); 
const [usertoken, setusertoken] = useState(false); 
const { userLoginData } = useUser(); // Access userLoginData from the context


console.log('Current location',location);
console.log('alert',showAlert);
const token = sessionStorage.getItem("authToken")
console.log('usertoken',usertoken);
  return (
    <div>
     <UserHeader/>
     <div className="usersidebarsection">
      <Row>
        <Col md={2}>
        <UserSidebar/>
        </Col>
        <Col style={{minHeight:"100vh",backgroundColor:"#edede9"}} md={10}>
      <div className="content " style={{marginTop:"120px"}}>{children}</div>
        </Col>
      </Row>
     </div>
    </div>
  );
};

export default StaticLayout;
