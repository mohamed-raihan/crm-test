import React, { useState } from 'react';
import { Search, Plus, Bell } from 'lucide-react';
import { Button, Modal, Form } from 'react-bootstrap';
import './notification.css';

const UserNotifications = () => {
  const [showModal, setShowModal] = useState(false);
  const [notifications, setNotifications] = useState([
    { 
      id: 1, 
      subject: "Payment Due Reminder", 
      customer: "John Doe", 
      email: "john.doe@example.com", 
      type: "Payment Reminder", 
      status: "Unread", 
      date: "Mar 10, 2024" 
    },
    { 
      id: 2, 
      subject: "Special Discount Offer", 
      customer: "Jane Smith", 
      email: "jane.smith@example.com", 
      type: "Promotional Offer", 
      status: "Read", 
      date: "Mar 9, 2024" 
    },
    { 
      id: 3, 
      subject: "Account Update", 
      customer: "Ammar Foley", 
      email: "ammar.foley@example.com", 
      type: "Account Update", 
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
            <Bell className="icon me-2" /> User Notifications
          </h1>
          <div className="header-actions">
            <div className="search-container">
              <Search className="search-icon" />
              <input type="text" placeholder="Search notifications..." className="search-input" />
            </div>
            <Button className="add-message-btn" onClick={() => setShowModal(true)}>
              <Plus size={18} /> Send Notification
            </Button>
          </div>
        </div>

        {/* Notifications Table */}
        <div className="message-list">
          <div className="message-list-header">
            <div>Subject</div>
            <div>Customer</div>
            <div>Email</div>
            <div>Type</div>
            <div>Status</div>
            <div>Date</div>
          </div>

          {notifications.map((notification) => (
            <div key={notification.id} className="message-item">
              <div>{notification.subject}</div>
              <div className="recipient">{notification.customer}</div>
              <div className="email">{notification.email}</div>
              <div>{notification.type}</div>
              <div className={`status-badge ${notification.status.toLowerCase()}`}>{notification.status}</div>
              <div>{notification.date}</div>
            </div>
          ))}
        </div>

        {/* Send Notification Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Send Notification</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="recipient">
                <Form.Label>Recipient Email</Form.Label>
                <Form.Control type="email" placeholder="Enter customer email" autoFocus />
              </Form.Group>
              <Form.Group className="mb-3" controlId="type">
                <Form.Label>Notification Type</Form.Label>
                <Form.Select>
                  <option>Payment Reminder</option>
                  <option>Promotional Offer</option>
                  <option>Account Update</option>
                  <option>Service Alert</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="subject">
                <Form.Label>Subject</Form.Label>
                <Form.Control type="text" placeholder="Enter subject" />
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

export default UserNotifications;
