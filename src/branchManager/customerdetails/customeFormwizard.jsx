import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import "react-form-wizard-component/dist/style.css";

const CustomFormWizard = ({ children, onComplete, activeTabIndex = 0 }) => {
  const [activeTab, setActiveTab] = useState(activeTabIndex);
  const [validationStatus, setValidationStatus] = useState({});
  const [tabs, setTabs] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    // Initialize tabs from children
    const tabsData = React.Children.map(children, (child, index) => {
      if (!React.isValidElement(child)) return null;

      const { title, icon, validate } = child.props;
      return {
        title,
        icon,
        index,
        validate: validate || (() => true),
      };
    }).filter(Boolean);

    setTabs(tabsData);

    // Initialize validation status
    const initialStatus = {};
    tabsData.forEach((tab) => {
      initialStatus[tab.index] = false;
    });
    setValidationStatus(initialStatus);
  }, [children]);

  const validateTab = (index) => {
    // Find the tab with the matching index
    const tab = tabs.find((t) => t.index === index);

    if (tab && typeof tab.validate === "function") {
      return tab.validate();
    }
    return true;
  };

  const moveToTab = (index) => {
    // First validate the current tab before moving
    if (validateTab(activeTab)) {
      setValidationStatus((prev) => ({ ...prev, [activeTab]: true }));
      setActiveTab(index);
    }
  };

  const handleNext = () => {
    if (activeTab < tabs.length - 1) {
      if (validateTab(activeTab)) {
        setValidationStatus((prev) => ({ ...prev, [activeTab]: true }));
        setActiveTab(activeTab + 1);
      }
    } else {
      // Last tab completion
      if (validateTab(activeTab)) {
        setValidationStatus((prev) => ({ ...prev, [activeTab]: true }));
        setIsCompleted(true);
        if (onComplete && typeof onComplete === "function") {
          onComplete();
        }
      }
    }
  };

  const handlePrevious = () => {
    if (activeTab > 0) {
      setActiveTab(activeTab - 1);
    }
  };

  return (
    <div className="form-wizard-container">
      <div className="wizard-navigation">
        {tabs.map((tab, index) => (
          <div key={index} className="wizard-step-container">
            {index > 0 && (
              <div
                className={`wizard-line ${index <= activeTab ? "active" : ""}`}
              />
            )}
            <div
              className={`wizard-step ${index === activeTab ? "active" : ""} ${
                validationStatus[index] ? "completed" : ""
              }`}
              onClick={() =>
                index <=
                Math.max(
                  ...Object.keys(validationStatus)
                    .filter((key) => validationStatus[key] === true)
                    .map(Number)
                    .concat(0)
                ) +
                  1
                  ? moveToTab(index)
                  : null
              }
            >
              <div className="wizard-step-icon">
                {tab.icon && <i className={tab.icon}></i>}
              </div>
              <div className="wizard-step-title">{tab.title}</div>
            </div>
            {index < tabs.length - 1 && (
              <div
                className={`wizard-line ${index < activeTab ? "active" : ""}`}
              />
            )}
          </div>
        ))}
      </div>

      <div className="wizard-content">
        {React.Children.map(children, (child, index) => {
          if (!React.isValidElement(child)) return null;
          return (
            <div
              className={`wizard-tab-content ${
                index === activeTab ? "active" : ""
              }`}
            >
              {child}
              <div className="wizard-footer">
                {activeTab > 0 && (
                  <Button
                    color="secondary"
                    onClick={handlePrevious}
                    className="btn-previous"
                  >
                    Previous
                  </Button>
                )}
                <Button
                  color="primary"
                  onClick={handleNext}
                  className="btn-next ml-auto"
                >
                  {activeTab === tabs.length - 1 ? "Complete" : "Next"}
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .form-wizard-container {
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        .wizard-navigation {
          display: flex;
          justify-content: space-between;
          margin-bottom: 30px;
          position: relative;
        }

        .wizard-step-container {
          display: flex;
          align-items: center;
          flex: 1;
        }

        .wizard-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          z-index: 2;
        }

        .wizard-step-icon {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background-color: #f5f5f5;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 10px;
          transition: all 0.3s ease;
          color: #999;
        }

        .wizard-step-icon i {
          font-size: 28px;
        }

        .wizard-step.active .wizard-step-icon {
          background-color: #2196f3;
          color: white;
        }

        .wizard-step.completed .wizard-step-icon {
          background-color: #4caf50;
          color: white;
        }

        .wizard-step-title {
          font-size: 14px;
          color: #999;
          text-align: center;
        }

        .wizard-step.active .wizard-step-title {
          color: #2196f3;
          font-weight: bold;
        }

        .wizard-step.completed .wizard-step-title {
          color: #4caf50;
        }

        .wizard-line {
          height: 2px;
          background-color: #f5f5f5;
          flex-grow: 1;
          transition: background-color 0.3s ease;
          margin: 0 10px;
        }

        .wizard-line.active {
          background-color: #2196f3;
        }

        .wizard-tab-content {
          display: none;
          padding: 20px 0;
        }

        .wizard-tab-content.active {
          display: block;
        }

        .wizard-footer {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid #eee;
        }

        .btn-next {
          margin-left: auto;
        }

        @import url("https://cdn.jsdelivr.net/gh/lykmapipo/themify-icons@0.1.2/css/themify-icons.css");
      `}</style>
    </div>
  );
};

const TabContent = ({ children, title, icon, validate, isValid }) => {
  return <div className="tab-pane">{children}</div>;
};

CustomFormWizard.TabContent = TabContent;

export default CustomFormWizard;
