import React, { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import { Button, Modal, Form } from 'react-bootstrap';
import './managernotification.css';

const BranchManagerNotification = () => {
  const [showModal, setShowModal] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, name: "Florence Shaw", email: "florence@insurance.com", role: "Admin", status: "Unread", date: "Mar 4, 2024" },
    { id: 2, name: "Amélie Laurent", email: "amelie@insurance.com", role: "Admin", status: "Read", date: "Mar 4, 2024" },
    { id: 3, name: "Ammar Foley", email: "ammar@insurance.com", role: "Staff", status: "Unread", date: "Mar 2, 2024" },
  ]);

  return (
    <div className="container-fluid">
 <div className="notification-container-fluid">
      {/* Header Section */}
      <div className="notification-header">
        <h1 className="notification-title">Branch Manager Notifications</h1>
        <div className="header-actions">
          <div className="search-container">
            <Search className="search-icon" />
            <input type="text" placeholder="Search messages..." className="search-input" />
          </div>
          <Button className="add-message-btn" onClick={() => setShowModal(true)}>
            <Plus size={18} /> Send Message
          </Button>
        </div>
      </div>

      {/* Messages List */}
      <div className="message-list">
        <div className="message-list-header">
          <div>Name</div>
          <div>Email</div>
          <div>Role</div>
          <div>Status</div>
          <div>Date</div>
        </div>

        {messages.map((message) => (
          <div key={message.id} className="message-item">
            <div>{message.name}</div>
            <div className="email">{message.email}</div>
            <div>{message.role}</div>
            <div className={`status-badge ${message.status.toLowerCase()}`}>{message.status}</div>
            <div>{message.date}</div>
          </div>
        ))}
      </div>

      {/* Send Message Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Send Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="recipient">
              <Form.Label>Recipient Email</Form.Label>
              <Form.Control type="email" placeholder="Enter recipient email" autoFocus />
            </Form.Group>
            <Form.Group className="mb-3" controlId="subject">
              <Form.Label>Subject</Form.Label>
              <Form.Control type="text" placeholder="Enter subject" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="message">
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" rows={4} placeholder="Enter your message" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => setShowModal(false)}>
            Send Message
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    </div>
   
  );
};

export default BranchManagerNotification;
