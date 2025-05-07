import React, { useState } from "react";
import "../css/layout/sidebar.css";
import { Link, NavLink } from "react-router-dom";
import { Col, Nav, NavItem, Row, Collapse } from "reactstrap";
import {
  FaHome,
  FaBuilding,
  FaUsers,
  FaUserTie,
  FaFileAlt,
  FaCalculator,
  FaBell,
  FaFile,
  FaClipboardList,
} from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { BiSolidBuildingHouse } from "react-icons/bi";
import { MdPolicy } from "react-icons/md";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isPolicyOpen, setIsPolicyOpen] = useState(false); // For collapsible group

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const togglePolicyGroup = () => {
    setIsPolicyOpen(!isPolicyOpen);
  };

  const activeStyle = {
    background: "#007bff",
    borderRadius: "4px",
    textDecoration: "none",
  };

  const menuItems = [
    {
      icon: <FaHome className="fs-4" />,
      text: <span>Dashboard</span>,
      route: "/dashboard",
    },
    {
      icon: <BiSolidBuildingHouse className="fs-4" />,
      text: <span>Branches</span>,
      route: "/branch",
    },
    {
      icon: <FaUsers className="fs-4" />,
      text: <span>Users</span>,
      route: "/users",
    },
    {
      icon: <FaUsers className="fs-4" />,
      text: <span>Customer</span>,
      route: "/customer",
    },
    {
      icon: <FaUserTie className="fs-4" />,
      text: <span>Agents</span>,
      route: "/agents",
    },
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
      route: "/notification",
    },
    {
      icon: <FaFile className="fs-4" />,
      text: <span>Reports</span>,
      route: "/reports",
    },
    {
      icon: <FaGear style={{ marginTop: "12px" }} className="fs-4" />,
      text: <p className="mt-4">Account Settings</p>,
      route: "/settings",
    },
  ];

  return (
    <div>
      {/* Toggle button */}
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        <i className={isSidebarOpen ? "fas fa-times" : "fas fa-bars"}></i>
      </button>

      <div
        className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}
        style={{
          width: "230px",
          backgroundColor:"white",
          height: "90vh",
          padding: "1rem",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <Nav vertical>
          {menuItems.slice(0, 6).map((item, index) => (
            <NavItem key={index} style={{ padding: "0.5rem 0" }}>
              <NavLink
                to={item.route}
                style={({ isActive }) =>
                  isActive
                    ? { ...activeStyle }
                    : { textDecoration: "none", color: "black" }
                }
              >
                <Row>
                  <div className="sidebar-item">
                    <Col xs="2">{item.icon}</Col>
                    <Col className="mt-1 ms-2">{item.text}</Col>
                  </div>
                </Row>
              </NavLink>
            </NavItem>
          ))}

          {/* Collapsible Policies Group */}
          <NavItem style={{ padding: "0.5rem 0" }}>
            <div
              className="sidebar-item"
              onClick={togglePolicyGroup}
              style={{ cursor: "pointer", color: "black" }}
            >
              <Row>
                <Col xs="2">
                  <MdPolicy className="fs-4" />
                </Col>
                <Col className="mt-1 ms-3">
                  <span>Masters</span>
                </Col>
              </Row>
            </div>
            <Collapse isOpen={isPolicyOpen}>
              <Nav vertical className="ms-4">
              <NavItem>
                  <NavLink
                    to="/company"
                    style={({ isActive }) =>
                      isActive
                        ? { ...activeStyle }
                        : { textDecoration: "none", color: "black" }
                    }
                  >
                    <Row className="my-2">
                      <Col xs="2">
                      <FaBuilding className="fs-4" />
                      </Col>
                      <Col>Company</Col>
                    </Row>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    to="/policy-category"
                    style={({ isActive }) =>
                      isActive
                        ? { ...activeStyle }
                        : { textDecoration: "none", color: "black" }
                    }
                  >
                    <Row className="my-2">
                      <Col xs="2">
                        <FaClipboardList className="fs-4" />
                      </Col>
                      <Col>Policy Category</Col>
                    </Row>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    to="/policy-type"
                    style={({ isActive }) =>
                      isActive
                        ? { ...activeStyle }
                        : { textDecoration: "none", color: "black" }
                    }
                  >
                    <Row className="my-2">
                      <Col xs="2">
                        <FaFileAlt className="fs-4" />
                      </Col>
                      <Col>Policy Master</Col>
                    </Row>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    to="/policies"
                    style={({ isActive }) =>
                      isActive
                        ? { ...activeStyle }
                        : { textDecoration: "none", color: "black" }
                    }
                  >
                    <Row className="my-2">
                      <Col xs="2">
                        <FaFileAlt className="fs-4" />
                      </Col>
                      <Col>Policies</Col>
                    </Row>
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </NavItem>

          {/* Remaining Menu Items */}
          {menuItems.slice(6).map((item, index) => (
            <NavItem key={index} style={{ padding: "0.5rem 0" }}>
              <NavLink
                to={item.route}
                style={({ isActive }) =>
                  isActive
                    ? { ...activeStyle }
                    : { textDecoration: "none", color: "black" }
                }
              >
                <Row>
                  <div className="sidebar-item">
                    <Col xs="2">{item.icon}</Col>
                    <Col className="mt-1 ms-2">{item.text}</Col>
                  </div>
                </Row>
              </NavLink>
            </NavItem>
          ))}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
