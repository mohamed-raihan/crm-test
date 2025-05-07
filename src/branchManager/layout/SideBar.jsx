import React, { useState } from "react";
import "../../css/layout/users/usersidebar.css"; 
import { Link, NavLink } from "react-router-dom";
import { Col, Nav, NavItem, Row } from "reactstrap";
import {
  FaHome,
  FaBuilding,
  FaUsers,
  FaUserTie,
  FaFileAlt,
  FaCalculator,
  FaBell,
  FaFile,
  FaCreditCard,
} from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { BiSolidBuildingHouse } from "react-icons/bi";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const menuItems = [
    {
      icon: <FaHome className="fs-4" />,
      text: <span>Dashboard</span>,
      route: "/manager-dashboard",
    },
    {
        icon: <FaUsers className="fs-4" />,
        text: <span>Users</span>,
        route: "/manager-users",
      },
    {
      icon: <FaUsers className="fs-4" />,
      text: <span>Customers</span>,
      route: "/manager-customer",
    },
    {
      icon: <FaUsers className="fs-4" />,
      text: <span>Customers Policy</span>,
      route: "/manager-customerdetails",
    },
    {
      icon: <FaCreditCard className="fs-4" />,
      text: <span>Payment</span>,
      route: "/manager-payments",
    },
    
    {
      icon: <FaUserTie className="fs-4" />,
      text: <span>Agent</span>,
      route: "/manager-agent",
    },
    {
      icon: <FaFileAlt className="fs-4" />,
      text: <span>Policies</span>,
      route: "/manager-policies",
    },
    
    {
      icon: <FaBell className="fs-4" />, // Bell icon for notifications
      text: <span>Notification</span>,
      route: "/manager-notification",
    },
    
    {
      icon: <FaFile className="fs-4" />,
      text: <span>Reports</span>,
      route: "/manager-report",
    },

    
    {
      icon: <FaGear style={{ marginTop: "37px" }} className="fs-4" />,
      text: <p className="mt-5">Settings</p>,
      route: "/manager-settings",
    },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const activeStyle = {
    background: '#007bff',
    // color: 'white',
    borderRadius: '4px',
    textDecoration: 'none',
  };

  const usertoken = sessionStorage.getItem("userData")

  console.log('usertoken',usertoken);
  
  
  return (
    <>
      {/* Toggle button */}
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        <i className={isSidebarOpen ? "fas fa-times" : "fas fa-bars"}></i>
      </button>
      <div
        className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}
        style={{
          width: "250px",
          background: "white",
          height: "100vh",
          padding: "2rem",
        }}
      >
        <Nav vertical>
          {menuItems.map((item, index) => (
            <NavItem key={index} style={{ padding: "0.5rem 0" }}>
              <NavLink
                to={item.route}
                style={({ isActive }) =>
                  isActive
                    ? { ...activeStyle }
                    : { textDecoration: 'none', color: 'black' }
                }
              >
                <Row>
                  <div className="sidebar-item">
                    <Col
                      xs="2"
                      className=""
                    >
                      {item.icon}
                    </Col>
                    <Col className="mt-1 ms-2">{item.text}</Col>
                  </div>
                </Row>
              </NavLink>
            </NavItem>
          ))}
        </Nav>
      </div>
    </>
  );
};

export default Sidebar;
