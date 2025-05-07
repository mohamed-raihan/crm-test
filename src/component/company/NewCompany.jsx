import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import EmptyImage from "../../assets/empty-image.png";
import allaxios from "../../api/axios";
import API_URL from "../../api/api_urls";
import { toast, ToastContainer } from "react-toastify";

const NewCompany = ({ toggle, editToggle, editData,fetchCompany }) => {
  const [data, setData] = useState();
  const [companyData, setCompanyData] = useState({
    id: "",
    name: "",
    logo: "",
  });
  const [errors, setErrors] = useState({});

  console.log(companyData);

  const handleInputChange = (event) => {
    const { name, value, type, files } = event.target;
    console.log(files);
    
    setCompanyData({
      ...companyData,
      [name]: type === "file" ? files[0] : value, // Handle file inputs
    });
  };

  const handleFile = (event)=>{
    const file = event.target.files[0]
    setCompanyData({
      ...companyData,
      logo: file,
    })
  }

  const validateFields = () => {
    const newErrors = {};
    Object.entries(companyData).forEach(([key, value]) => {
      if (key === "logo") {
        if (!value) {
          newErrors[key] = true; // Mark logo as invalid if not provided
        }
      } else if (key !== "id" && (!value || typeof value === "string" && !value.trim())) {
        newErrors[key] = true; // Mark other fields as invalid if empty
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSave = (event) => {
    console.log(companyData);

    event.preventDefault();
        if (!validateFields()) {
          toast.error("Please fill out all required fields.");
          return;
        }
    
    const formData = new FormData();
    formData.append("logo", companyData.logo);
    formData.append("name", companyData.name);

    console.log(formData.get("logo"));

    if (companyData.id) {
      console.log('edit');
      
      allaxios
        .patch(API_URL.COMPANY.PATCH_COMPANY(companyData.id), formData,{
          headers: {
            "Content-Type":"multipart/form-data"
          },
        })
        .then((response) => {
          console.log(response);
          editToggle()
          toast.success('Company updated')
          fetchCompany()
        }).catch((error)=>{
          console.error(error);
          toast.error('Error occured')
        })
    } else {
      allaxios
        .post(API_URL.COMPANY.POST_COMPANY, formData, {
          headers: {
            "Content-Type":"multipart/form-data"
          },
        })
        .then((response) => {
          toast.success("Company added");
          console.log(response);
          toggle();
        })
        .catch((error) => {
          console.error(error);
          toast.error("Some error occured");
        });
    }
  };

  useEffect(()=>{
    if(editData){
      console.log(editData);
      
      setCompanyData({
        ...companyData,
        id:editData.id,
        name:editData.name,
        logo:editData.logo
      })
    }
  },[])

  return (
    <div>
      <ModalHeader toggle={toggle?toggle:editToggle}>{toggle?'New Company':'Edit Company'}</ModalHeader>
      <ModalBody>
        <Row>
          <Col className="d-flex flex-column">
            <div className="w-75">
              <FormGroup>
                <Label for="logo">Logo</Label>
                <Input
                  className="form-control"
                  type="file"
                  id="logo"
                  name="logo"
                  onChange={handleFile}
                  invalid={errors.logo}
                />
                <FormFeedback>Logo is required</FormFeedback>
              </FormGroup>
            </div>
            <div className="w-100 mt-4">
              <FormGroup>
                <Label for="name">Company</Label>
                <Input
                  className="form-control"
                  type="text"
                  id="name"
                  name="name"
                  value={companyData.name}
                  onChange={handleInputChange}
                  placeholder="Enter company name"
                  invalid={errors.name}
                />
                <FormFeedback>Company is required</FormFeedback>
              </FormGroup>
            </div>
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter>
        <Button onClick={handleSave} color="primary">
          Create
        </Button>{" "}
        <Button onClick={toggle?toggle:editToggle} color="secondary">
          Cancel
        </Button>
      </ModalFooter>
    </div>
  );
};

export default NewCompany;
