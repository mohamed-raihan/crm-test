import React, { useState } from "react";
import "../../css/layout/customer/viewprofile.css";
import { FaUser, FaEnvelope, FaPhone, FaIdCard } from "react-icons/fa";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("basic");

  const basicInfo = {
    Name: "John Doe",
    "Phone Number": "123-456-7890",
    Email: "johndoe@example.com",
    "Aadhaar Card": "1234-5678-9012",
    "PAN Card": "ABCDE1234F",
    Gender: "Male",
    DOB: "1990-01-01",
    Occupation: "Software Engineer",
    "Health Condition": "No known issues",
    "Parent Details": "John Doe Sr.",
  };

  const dummyBasicInfo = [
    { icon: <FaUser />, value: "John Doe" },
    { icon: <FaEnvelope />, value: "johndoe@example.com" },
    { icon: <FaPhone />, value: "123-456-7890" },
    { icon: <FaIdCard />, value: "A1234BC567" },
  ];

  const nomineeInfo = {
    "Nominee Name": "Jane Doe",
    "Relationship to Customer": "Wife",
    "Nominee Phone": "987-654-3210",
    "Nominee Email": "janedoe@example.com",
    "Nominee Address": "1234 Main Street",
  };

  const policies = [
    {
      policyNumber: "POL123456",
      policyName: "Life Insurance",
      premium: "$500/year",
      startDate: "2022-01-01",
      endDate: "2032-01-01",
    },
    {
      policyNumber: "POL789012",
      policyName: "Health Insurance",
      premium: "$300/year",
      startDate: "2021-06-01",
      endDate: "2031-06-01",
    },
  ];

  const paymentHistory = [
    { date: "2023-10-01", amount: "$500", method: "Credit Card", status: "Successful" },
    { date: "2023-07-01", amount: "$500", method: "Net Banking", status: "Successful" },
    { date: "2023-04-01", amount: "$500", method: "Debit Card", status: "Failed" },
  ];

  const handleTabClick = (tab) => setActiveTab(tab);

  return (
    <div className="profile-page-cv">
      <div className="left-section">
        <div className="profile-info">
          <div className="profile-image-wrapper">
            {/* <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="profile-image"
            /> */}
          </div>
          <h2>John Doe</h2>
          <h4>Software Engineer</h4>
        </div>
        <div className="basic-info-grid">
          {dummyBasicInfo.map((info, index) => (
            <div key={index} className="info-box">
              <span className="info-icon">{info.icon}</span>
              <span className="info-value">{info.value}</span>
            </div>
          ))}
        </div>

      </div>
      <div className="right-section">
        <div className="tabs">
          {["basic", "nominee", "policies", "payment"].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={activeTab === tab ? "active" : ""}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)} Information
            </button>
          ))}
        </div>
        <div className="content">
          {activeTab === "basic" && (
            <div className="tab-content">
              {/* <h3>Basic Information</h3> */}
              {Object.entries(basicInfo).map(([key, value]) => (
                <div key={key} className="field-row">
                  <p>
                    <strong>{key}: </strong> {value}
                  </p>
                </div>
              ))}
            </div>
          )}
          {activeTab === "nominee" && (
            <div className="tab-content">
              {/* <h3>Nominee Information</h3> */}
              {Object.entries(nomineeInfo).map(([key, value]) => (
                <div key={key} className="field-row">
                  <p>
                    <strong>{key}: </strong> {value}
                  </p>
                </div>
              ))}
            </div>
          )}
         {activeTab === "policies" && (
  <div className="tab-content">
    {/* <h3>Policies</h3> */}
    <div className="field-row-grid">
      {policies.map((policy, index) => (
        <div key={index} className="policy-box">
          <p>
            <strong>Policy Number:</strong> {policy.policyNumber}
          </p>
          <p>
            <strong>Policy Name:</strong> {policy.policyName}
          </p>
          <p>
            <strong>Premium:</strong> {policy.premium}
          </p>
          <p>
            <strong>Start Date:</strong> {policy.startDate}
          </p>
          <p>
            <strong>End Date:</strong> {policy.endDate}
          </p>
        </div>
      ))}
    </div>
  </div>
)}

          {activeTab === "payment" && (
            <div className="tab-content">
              <h3>Payment History</h3>
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Method</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentHistory.map((pay, i) => (
                    <tr key={i}>
                      <td>{pay.date}</td>
                      <td>{pay.amount}</td>
                      <td>{pay.method}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
