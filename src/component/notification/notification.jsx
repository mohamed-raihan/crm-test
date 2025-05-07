import React, { useState } from 'react';
import { Search, Plus, Bell } from 'lucide-react';
import { Button, Modal, Form } from 'react-bootstrap';
import './notification.css';

const AdminNotifications = () => {
  const [showModal, setShowModal] = useState(false);
  const [notifications, setNotifications] = useState([
    { 
      id: 1, 
      subject: "System Maintenance", 
      recipient: "All Staff", 
      type: "System Alert", 
      priority: "High", 
      status: "Unread", 
      date: "Mar 10, 2024" 
    },
    { 
      id: 2, 
      subject: "Policy Update", 
      recipient: "HR Team", 
      type: "Policy Change", 
      priority: "Medium", 
      status: "Read", 
      date: "Mar 9, 2024" 
    },
    { 
      id: 3, 
      subject: "New Employee Onboarding", 
      recipient: "HR & IT", 
      type: "Task Assignment", 
      priority: "Low", 
      status: "Unread", 
      date: "Mar 8, 2024" 
    },
  ]);

  return (
    <div className="container-fluid">
      <div className="notification-container">
        {/* Header Section */}
        <div className="notification-header">
          <h1 className="notification-title">
            <Bell className="icon me-2" /> Admin Notifications
          </h1>
          <div className="header-actions">
            <div className="search-container">
              <Search className="search-icon" />
              <input type="text" placeholder="Search notifications..." className="search-input" />
            </div>
            <Button className="add-message-btn" onClick={() => setShowModal(true)}>
              <Plus size={18} /> Create Notification
            </Button>
          </div>
        </div>

        {/* Notifications Table */}
        <div className="message-list">
          <div className="message-list-header">
            <div>Subject</div>
            <div>Recipient</div>
            <div>Type</div>
            <div>Priority</div>
            <div>Status</div>
            <div>Date</div>
          </div>

          {notifications.map((notification) => (
            <div key={notification.id} className="message-item">
              <div>{notification.subject}</div>
              <div className="recipient">{notification.recipient}</div>
              <div>{notification.type}</div>
              <div className={`priority-badge ${notification.priority.toLowerCase()}`}>{notification.priority}</div>
              <div className={`status-badge ${notification.status.toLowerCase()}`}>{notification.status}</div>
              <div>{notification.date}</div>
            </div>
          ))}
        </div>

        {/* Send Notification Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Create New Notification</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="recipient">
                <Form.Label>Recipient</Form.Label>
                <Form.Control type="text" placeholder="Enter recipient (e.g., 'All Staff', 'HR Team')" autoFocus />
              </Form.Group>
              <Form.Group className="mb-3" controlId="subject">
                <Form.Label>Subject</Form.Label>
                <Form.Control type="text" placeholder="Enter subject (e.g., 'Policy Update')" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="type">
                <Form.Label>Notification Type</Form.Label>
                <Form.Select>
                  <option>System Alert</option>
                  <option>Policy Change</option>
                  <option>Task Assignment</option>
                  <option>General Announcement</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="priority">
                <Form.Label>Priority Level</Form.Label>
                <Form.Select>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="message">
                <Form.Label>Message</Form.Label>
                <Form.Control as="textarea" rows={4} placeholder="Enter the notification message" />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setShowModal(false)}>
              Send Notification
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default AdminNotifications;
