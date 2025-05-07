import React, { useEffect } from "react";
import { Card, CardContent, CardActions, Typography } from "@mui/material";
import {
  Button,
  Tabs,
  Tab,
  Badge,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { useState } from "react";
import DataTable from "react-data-table-component";
import allaxios from "../../api/axios";
import API_URL from "../../api/api_urls";
import {
  customerFamilyTablecolumn,
  customerNomineeTablecolumn,
  cutomerProfileTablecolumn,
} from "../../component/Common/TableDatas";
import { useLocation } from "react-router-dom";
import profilepic from "../../assets/propic.png";

const UserProfile = () => {
  const location = useLocation();
  const { customerData } = location.state;
  const [tabValue, setTabValue] = useState(0);
  const [status, setStatus] = useState([]);
  console.log(customerData);

  const relationshipChoice = [
    { value: "E", label: "Self" },
    { value: "S", label: "Spouse" },
    { value: "D", label: "Daughter" },
    { value: "C", label: "Son" },
  ];

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div
      style={{ padding: "16px", backgroundColor: "#edf2f4", height: "100vh" }}
    >
      <Card
        className="rounded container d-flex align-items-center mt-5 w-100"
        style={{
          // maxWidth: "900px",
          height: "16rem",
          margin: "auto",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <CardContent
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 5fr",
            gap: "16px",
          }}
        >
          <div className="ms-5 me-4" style={{ textAlign: "center" }}>
            <img
              src={profilepic}
              alt="User"
              style={{
                width: "128px",
                height: "128px",
                borderRadius: "50%",
                marginBottom: "16px",
              }}
            />
            <div>
              <Typography variant="h6">{customerData.name}</Typography>
              <Typography color="textSecondary">
                <strong>{customerData.customer_id}</strong>
              </Typography>
              <Typography color="textSecondary">
                <span className="me-1">
                  <i
                    className="fa-solid fa-circle"
                    style={{ color: "#06db1e", fontSize: "8px" }}
                  ></i>
                  <i
                    class="fa-solid fa-circle"
                    style={{ color: "#ff0000", fontSize: "8px" }}
                  ></i>
                </span>
                {customerData.status}
              </Typography>
            </div>
          </div>
          <table
            className="ms-4"
            style={{ width: "100%", borderCollapse: "collapse" }}
          >
            <tbody>
              <tr
                style={{
                  borderBottom: "1px solid #ddd",
                  borderLeft: "1px solid #ddd",
                }}
              >
                <td className="pe-3">
                  <Typography>
                    <strong>Gender:</strong>
                    <span className="ms-2">{customerData.gender}</span>
                  </Typography>
                </td>
                <td className="pe-3">
                  <Typography>
                    <strong>Date of Birth:</strong>
                    <span className="ms-2">{customerData.dob}</span>
                  </Typography>
                </td>
                <td className="pe-3">
                  <Typography>
                    <strong>Phone Number:</strong>
                    <span className="ms-2">{customerData.contact}</span>
                  </Typography>
                </td>
                <td>
                  <Typography>
                    <strong>Email:</strong>
                    <span className="ms-2">{customerData.email}</span>
                  </Typography>
                </td>
              </tr>
              <tr
                style={{
                  borderBottom: "1px solid #ddd",
                  borderLeft: "1px solid #ddd",
                  backgroundColor: "transparent",
                }}
              >
                <td className="pe-3">
                  <Typography>
                    <strong>Occupation:</strong>
                    <span className="ms-2">{customerData.occupation}</span>
                  </Typography>
                </td>
                <td className="pe-3">
                  <Typography>
                    <strong>Aadhar Number:</strong>
                    <span className="ms-2">
                      {customerData.aadhar_card_number}
                    </span>
                  </Typography>
                </td>
                <td className="pe-3">
                  <Typography>
                    <strong>PAN Card Number:</strong>
                    <span className="ms-2">{customerData.pan_card_number}</span>
                  </Typography>
                </td>
                <td>
                  <Typography>
                    <strong>Status:</strong>
                    <span className="ms-2">{customerData.status}</span>
                  </Typography>
                </td>
              </tr>
              <tr style={{ borderLeft: "1px solid #ddd" }}>
                <td className="pe-3">
                  <Typography>
                    <strong>Father name:</strong>
                    <span className="ms-2">{customerData.father_name}</span>
                  </Typography>
                </td>
                <td className="pe-3">
                  <Typography>
                    <strong>Mother name:</strong>
                    <span className="ms-2">{customerData.mother_name}</span>
                  </Typography>
                </td>
                <td className="pe-3">
                  <Typography>
                    <strong>Health condition:</strong>
                    <span className="ms-2">
                      {customerData.health_condition}
                    </span>
                  </Typography>
                </td>
                <td>
                  <Typography>
                    <strong>Guardian name:</strong>
                    <span className="ms-2">{customerData.guardian_name}</span>
                  </Typography>
                </td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>
      <div className="container">
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          style={{ marginTop: "32px" }}
        >
          <Tab label="Customer Policies" />
          <Tab label="Family members" />
          <Tab label="Nominee" />
          <Tab label="Transaction history" />
        </Tabs>

        {tabValue === 0 && (
          <DataTable
            data={customerData.customer_policies}
            columns={cutomerProfileTablecolumn()}
            pagination
          ></DataTable>
        )}

        {tabValue === 1 && (
          <Typography>
            <DataTable
              data={customerData.family_members}
              columns={customerFamilyTablecolumn(relationshipChoice)}
            ></DataTable>
          </Typography>
        )}
        {tabValue === 2 && (
          <Typography>
            <DataTable
              data={customerData.nominees}
              columns={customerNomineeTablecolumn()}
            ></DataTable>
          </Typography>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
