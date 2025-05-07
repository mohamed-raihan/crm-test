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
} from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { BiSolidBuildingHouse } from "react-icons/bi";
import { MdPolicy } from "react-icons/md";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const menuItems = [
    {
      icon: <FaHome className="fs-4" />,
      text: <span>Dashboard</span>,
      route: "/userdashboard",
    },
    // {
    //   icon: <BiSolidBuildingHouse className="fs-4" />,
    //   text: <span>Branches</span>,
    //   route: "/branch",
    // },
    // {
    //   icon: <FaUsers className="fs-4" />,
    //   text: <span>Users</span>,
    //   route: "/users",
    // },
    {
      icon: <FaUserTie className="fs-4" />,
      text: <span>Customer </span>,
      route: "/usercustomer",
    },

    {
      icon: <FaUserTie className="fs-4" />,
      text: <span>Customer Policies </span>,
      route: "/user-customerdetails",
    },


    {
      icon: <FaUserTie className="fs-4" />,
      text: <span> Payment </span>,
      route: "/user-payment",
    },

    {
      icon: <MdPolicy className="fs-4" />,
      text: <span> Policies </span>,
      route: "/userpolicy",
    },
    // {
    //   icon: <FaFileAlt className="fs-4" />,
    //   text: <span>Policy category</span>,
    //   route: "/policy-category",
    // },
    // {
    //   icon: <FaFileAlt className="fs-4" />,
    //   text: <span>Policies</span>,
    //   route: "/policies",
    // },
    // {
    //   icon: <FaBuilding className="fs-4" />,
    //   text: <span>Company</span>,
    //   route: "/company",
    // },
    // {
    //   icon: <FaCalculator className="fs-4" />,
    //   text: <span>Tax Management</span>,
    //   route: "/tax",
    // },
    {
      icon: <FaBell className="fs-4" />,
      text: <span>Notifications</span>,
      route: "/user-notification",
    },
    {
      icon: <FaFile className="fs-4" />,
      text: <span>Reports</span>,
      route: "/user-report",
    },
    {
      icon: <FaGear style={{ marginTop: "37px" }} className="fs-4" />,
      text: <p className="mt-5">Account Settings</p>,
      route: "/account-settings",
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

      {/* Sidebar */}
      {/* <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <ul className="sidebar-menu">
          <li className="sidebar-item d-flex flex-row ">
            
          <i className="fas fa-home" style={{ margin: '10px 0px',fontSize:"15px" ,marginLeft:"20px",marginTop:"19px",width:"16px",height:"16px"}}></i>

            <a href="/dashboard">
              Dashboard
            </a>
          </li>
          <li className="sidebar-item d-flex flex-row">
          <i className="fas fa-building" style={{ margin: '10px 0px',marginLeft:"22px" ,fontSize:"15px",marginTop:"19px",width:"16px",height:"16px"}}></i>

            <a href="/branch">
              Branches
            </a>
          </li>
          <li className="sidebar-item d-flex">
          <i className="fa-solid fa-users" style={{ margin: '10px 0px',marginLeft:"17px" ,fontSize:"15px",marginTop:"19px",width:"16px",height:"16px" }}></i>
            <a href="/users">
              Users
            </a>
          </li>
          <li className="sidebar-item d-flex">
          <i className="fas fa-user-tie"  style={{ margin: '10px 0px',marginLeft:"17px" ,fontSize:"15px",marginTop:"19px",width:"16px",height:"16px" }}></i>

            <a href="/agents" style={{marginLeft:"5px"}}>
              Agents
            </a>
          </li>
          <li className="sidebar-item d-flex" >

          <i className="fas fa-file-contract" style={{ margin: '10px 0px',marginLeft:"22px" ,fontSize:"15px",marginTop:"19px",width:"16px",height:"16px" }}></i>

            <a href="/policies">
              Policies
            </a>
          </li>
          <li className="sidebar-item d-flex">
          <i className="fas fa-calculator" style={{ margin: '10px 0px',marginLeft:"22px" ,fontSize:"15px",marginTop:"19px",width:"16px",height:"16px" }}></i>

            <a href="/tax-management">
              Tax Management
            </a>
          </li>
          <li className="sidebar-item d-flex">
          <i className="fas fa-bell" style={{ margin: '10px 0px',marginLeft:"22px" ,fontSize:"15px",marginTop:"19px",width:"16px",height:"16px" }}></i>

            <a href="/notifications">
              Notifications
            </a>
          </li>
          <li className="sidebar-item d-flex">
          <i className="fas fa-file-alt" style={{ margin: '10px 0px',marginLeft:"22px" ,fontSize:"15px",marginTop:"19px",width:"16px",height:"16px" }}></i>
            <a href="/reports">
              Reports
            </a>
          </li>
        </ul>
        <div className="sidebar-footer">
          <a href="/account-settings" className="account-settings">
            <i className="fas fa-cogs" style={{marginLeft:"0px"}}></i>
           <span style={{marginLeft:"13px",fontSize:"18px"}}>Account Settings</span> 
          </a>
        </div>
      </div> */}

      <div
        className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}
        style={{
          width: "250px",
          background: "#f8f9fa",
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
