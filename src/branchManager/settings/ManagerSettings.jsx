import React from 'react';
import './Accountsettings.css';

const ManagerAccountSettings = () => {
  return (
    <div className="account-settings">
      <h1>Account settings</h1>
      <div className="qsearch">
        <h2>QSearch</h2>
        <p>Settings and options for your application.</p>
        <div className="plan-info">
          <p>Your application is currently on the free plan</p>
          <p>Paid plans offer higher usage limits, additional branches, and much more. <a href="/learn-more">Learn more here</a></p>
        </div>
      </div>

      <div className="application-info">
        <h2>Name</h2>
        <input type="text" defaultValue="Untitled UI" />
        <p>Changes will update all URLs.</p>
        <p>untitledui-staging.com/</p>
        <input type="text" defaultValue="untitledui" />
      </div>

      <div className="branch-info">
        <h2>Default branch</h2>
        <p>Main branch</p>
      </div>

      <div className="contact-info">
        <h2>Contact</h2>
        <p>Sophie@untitledui.com</p>
      </div>

      <div className="snapshot">
        <h2>A quick snapshot of your application.</h2>
        <p>Untitled UI is the ultimate Figma UI kit and design system to</p>
        <p>40 characters left</p>
      </div>

      <div className="advanced-settings">
        <h2>Advanced settings</h2>
        <div className="setting">
          <label>
            <input type="checkbox" defaultChecked />
            Allow administrators to invite new members
          </label>
          <p>Any administrator can manage application members and send invites.</p>
        </div>
        <div className="setting">
          <label>
            <input type="checkbox" defaultChecked />
            Allow administrators to change names
          </label>
          <p>Any administrator can change project names and URLs.</p>
        </div>
        <div className="setting">
          <label>
            <input type="checkbox" />
            Require administrator approval for deploy requests
          </label>
          <p>An administrator must approve deploy requests before they can be processed.</p>
        </div>
      </div>

      <button className="reset-button">Reset to default</button>
    </div>
  );
};

export default ManagerAccountSettings;