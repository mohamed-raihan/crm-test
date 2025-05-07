import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import allaxios from "../../api/axios";
import API_URL from "../../api/api_urls";
import { toast } from "react-toastify";

const EditTaxModal = ({ toggle, taxData, onTaxUpdated }) => {
  const [formData, setFormData] = useState({
    name: taxData?.name || "",
    tax: taxData?.tax || "",
    
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async () => {
    try {
      const response = await allaxios.patch(
        API_URL.TAX.PATCH_TAX(taxData?.id), 
        formData,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
          },
        }
      );
      toast.success("Tax updated successfully");
      console.log("Tax updated successfully:", response.data);
      toggle();
      if (onTaxUpdated) onTaxUpdated();
    } catch (error) {
      console.error("Error updating tax:", error);
      toast.error("Failed to update tax");
    }
  };

  useEffect(() => {
    if (taxData) {
      setFormData({
        name: taxData.name || "",
        tax: taxData.tax || "",
       
      });
    }
  }, [taxData]);

  return (
    <div>
      <ModalHeader toggle={toggle}>Edit Tax</ModalHeader>
      <ModalBody>
        <Form>
          <Row>
            <Col md={12}>
              <FormGroup>
                <Label for="name">Tax Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter tax name"
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            {/* <Col md={6}> */}
              <FormGroup>
                <Label for="percentage">Tax(%)</Label>
                <Input
                  id="tax"
                  name="tax"
                  type="number"
                  value={formData.tax}
                  onChange={handleInputChange}
                  placeholder="Enter percentage"
                />
              </FormGroup>
            {/* </Col> */}
           
          </Row>
          
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
        <Button color="primary" onClick={handleFormSubmit}>
          Update Tax
        </Button>{" "}
      </ModalFooter>
    </div>
  );
};

export default EditTaxModal;
