import React from "react";
import { Button } from "react-bootstrap";
import "./AccountSettings.css"; // Import CSS for styling

const AccountSettings = () => {
  const settings = [
    {
      title: "Admin Email",
      description: "Manage or update admin email addresses.",
      action: "Change",
      info: "1 email address",
    },
    {
      title: "Phone Number",
      description: "Add a phone number for account recovery.",
      action: "Change",
      info: "1 phone number",
    },
    {
      title: "Change Password",
      description: "Update your admin password for security.",
      action: "Change",
      info: "Last changed: May 20, 2023",
    },
    {
      title: "Active Sessions",
      description: "View and manage active login sessions.",
      action: "Change",
      info: "2 active sessions",
    },
    {
      title: "Remembered Devices",
      description: "Manage devices that store login credentials.",
      action: "Change",
      info: "0 devices",
    },
    {
      title: "Two-Factor Authentication",
      description: "Enhance security with two-step verification.",
      action: "Change",
      info: "Off",
    },
  ];

  return (
    <div className="account-settings-container-fluid">
      <h2 className="account-settings-title">Admin Account Settings</h2>
      <p className="account-settings-subtitle">Manage and secure your admin account</p>

      <div className="settings-list">
        {settings.map((setting, index) => (
          <div key={index} className="setting-item">
            <div className="setting-details">
              <h4 className="setting-title">{setting.title}</h4>
              <p className="setting-description">{setting.description}</p>
            </div>
            <div className="setting-action">
              <span className="setting-info">{setting.info}</span>
              <Button variant="link" className="change-btn">
                {setting.action}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountSettings;
