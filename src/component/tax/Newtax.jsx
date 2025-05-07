import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { toast } from 'react-toastify';
import API_URL from '../../api/api_urls';
import allaxios from '../../api/axios';
import { FormText } from 'react-bootstrap';

const NewTaxModal = ({ toggle  }) => {
  const [name, setname] = useState('');
  const [tax, settax] = useState('');
  const [taxError, settaxError] = useState('');
  const [isValid, setIsValid] = useState(true); // State to track if the tax input is valid


 
 
  // Add new tax
  const handleAddTax = async (e) => {
    e.preventDefault();
    const newTax = { name: name, tax: tax };
    try {
      const response = await allaxios.post(API_URL.TAX.POST_TAX, newTax, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
        },
      });
      console.log('New tax added:', response.data);
      toast.success('Tax added successfully!');
      toggle(); 
    } catch (error) {
      console.error('Error adding tax:', error);
      toast.error('Failed to add tax. Please try again.');
    }
  };

//   useEffect(() => {
//     fetchTaxTypes();
//     fetchBranches();
//   }, []);

const handleTaxChange = (e) => {
    const value = e.target.value;

    // Check if the value is a valid number and between 1 and 100
    if (value === '' || (value >= 1 && value <= 100 && !isNaN(value))) {
        settax(value);

      settaxError('');
      setIsValid(true);
    } else {
      settaxError('Please enter a value between 1 and 100.');
      setIsValid(false);
    }
  };
  

  return (
    <div className="p-3">
      <h5>Add New Tax</h5>
      <Form onSubmit={handleAddTax}>
        <FormGroup>
          <Label for="name">Tax Name</Label>
          <Input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setname(e.target.value)}
            required
            placeholder="Enter tax name"
          />
        </FormGroup>
       
        <FormGroup>
          <Label for="rate">Rate (%)</Label>
          <Input
            type="number"
            id="tax"
            value={tax}
            onChange={handleTaxChange}
            required
            placeholder="Enter tax rate"
            min="0"
            step="0.01"
          />
       {taxError && <FormText color="danger">{taxError}</FormText>}
        </FormGroup>
       
        <div className="d-flex justify-content-end">
          <Button color="secondary" onClick={toggle} className="me-2">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Add Tax
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default NewTaxModal;
