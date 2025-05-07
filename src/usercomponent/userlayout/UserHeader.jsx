import React, { useEffect, useState } from "react";
import "../../css/layout/header.css";
import Headerlogo from "../../images/Headerlogo.png";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useUser } from "../../usercomponent/usercontext/Usercontext";
import { IoIosArrowDown, IoMdSettings } from "react-icons/io";
import { Card, CardBody, Collapse, ListGroup, ListGroupItem } from "reactstrap";
import { CgProfile } from "react-icons/cg";
import { CiLogout } from "react-icons/ci";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [loggedUser, setLoggedUser] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const { userLoginData } = useUser();
  
  console.log(userLoginData);
  

  const navigate = useNavigate();

  const usertoken = sessionStorage.getItem("userData");

  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
    navigate("/");
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 3,
    textAlign: "center",
    borderRadius: "8px",
  };

  const confirmLogout = () => {
    setShowAlert(true);
  };

  console.log('dba',showDropdown);
  

  const handleConfirm = () => {
    setShowAlert(false);
    handleLogout();
  };

  const toggleDropdown = () => {
    setShowDropdown(true);
  };

  const handleCancel = () => {
    setShowAlert(false);
  };

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    console.log(userData);
    
    setLoggedUser(userData);
  }, []);

  return (
    <header className="header">
      <div className="header-left">
        <img src={Headerlogo} alt="Logo" className="header-logo" />
      </div>

      <div className="header-right">
        <div className="profile-section" style={{ position: "relative" }}>
          <div className="d-flex flex-column">
            <div onClick={toggle} className="d-flex">
              <div className="d-flex flex-column">
                <span className="profile-name">
                  {loggedUser ? loggedUser.user.name : "User"}
                </span>
                <span className="profile-subtext">User</span>
              </div>
              <div className="ms-2 mt-1">
                <IoIosArrowDown />
              </div>
            </div>
            <Collapse
              isOpen={isOpen}
              style={{
                position: "absolute",
                top: "100%",
                right: 0,
                zIndex: 1000,
                width: "150px",
                marginTop:"10px"
              }}
            >
              <ListGroup>
                <ListGroupItem
                  style={{ height: "50px" }}
                  disabled
                  href="#"
                  tag="a"
                  className="d-flex align-items-center"
                >
                  <CgProfile className="fs-2" />

                  <div className="w-100 p-2" onClick={confirmLogout}>
                    Profile
                  </div>
                </ListGroupItem>
                <ListGroupItem
                  style={{ height: "50px" }}
                  disabled
                  href="#"
                  tag="a"
                  className="d-flex align-items-center"
                >
                  <IoMdSettings className="fs-2" />
                  <div className="w-100 p-2" onClick={confirmLogout}>
                    Settings
                  </div>
                </ListGroupItem>
                <ListGroupItem
                  style={{ height: "50px" }}
                  onClick={confirmLogout}
                  className="d-flex align-items-center"
                >
                  <CiLogout className="fs-2"/>
                  <div className="w-100 p-2" onClick={confirmLogout}>
                    Logout
                  </div>
                </ListGroupItem>
              </ListGroup>
            </Collapse>
          </div>

          <Modal
            open={showAlert}
            onClose={handleCancel}
            aria-labelledby="logout-modal-title"
            aria-describedby="logout-modal-description"
          >
            <Box sx={modalStyle}>
              <Typography id="logout-modal-title" variant="h6">
                Logout
              </Typography>
              <Typography id="logout-modal-description" sx={{ mt: 2 }}>
                Are you sure you want to log out?
              </Typography>
              <Box
                sx={{ mt: 3, display: "flex", justifyContent: "space-around" }}
              >
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleLogout}
                  style={{ width: "100px" }}
                >
                  OK
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          </Modal>
        </div>
      </div>
    </header>
  );
};

export default Header;
