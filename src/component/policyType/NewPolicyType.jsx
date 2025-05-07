import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
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
import API_URL from "../../api/api_urls";
import allaxios from "../../api/axios";

const NewPolicyType = ({ toggle, editToggle, editData, fetchPolicyType }) => {
  const [policyTypeData, setPolicyTypeData] = useState({
    id: "",
    name: "",
    company: "",
    policy_category: "",
  });
  const [company, setCompany] = useState([]);
  const [category, setCategory] = useState([]);
  const [errors, setErrors] = useState({});

  console.log(policyTypeData);

  const fetchCompany = async () => {
    console.log("fetch");

    try {
      const response = await allaxios.get(API_URL.COMPANY.GET_COMPANY);
      console.log(response);

      setCompany(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Error fetching data");
    }
  };

  const fetchCategory = async () => {
    console.log("fetch");

    try {
      const response = await allaxios.get(API_URL.POLICY_CATEGORY.GET_CATEGORY);
      console.log(response);

      setCategory(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Error fetching data");
    }
  };

  const handleInputChange = (event) => {
    const { name, value, type, files } = event.target;
    console.log(files);

    setPolicyTypeData({
      ...policyTypeData,
      [name]: type === "file" ? files[0] : value, // Handle file inputs
    });
  };

  const validateFields = () => {
    const newErrors = {};
    Object.entries(policyTypeData).forEach(([key, value]) => {
      if (key !== "id") {
        // Skip validation for the `id` field
        if (typeof value === "string") {
          if (!value.trim()) {
            newErrors[key] = true; // String is empty or whitespace
          }
        } else if (value === null || value === undefined) {
          newErrors[key] = true; // Value is null or undefined
        }
      }
    });
    console.log("Validation Errors:", newErrors); // Debugging
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = (event) => {
    console.log(policyTypeData);

    event.preventDefault();
    if (!validateFields()) {
      toast.error("Please fill out all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("name", policyTypeData.name);

    if (policyTypeData.id) {
      console.log("edit");

      allaxios
        .patch(
          API_URL.POLICY_TYPE.PATCH_POLICY_TYPE(policyTypeData.id),
          policyTypeData
        )
        .then((response) => {
          console.log(response);
          editToggle();
          toast.success("Policy Master updated");
          fetchPolicyType();
        })
        .catch((error) => {
          console.error(error);
          toast.error("Error occured");
        });
    } else {
      console.log(formData);

      allaxios
        .post(API_URL.POLICY_TYPE.POST_POLICY_TYPE, policyTypeData)
        .then((response) => {
          toast.success("Policy Master added");
          console.log(response);
          toggle();
        })
        .catch((error) => {
          console.error(error);
          toast.error("Some error occured");
        });
    }
  };

  useEffect(() => {
    if (editData) {
      setPolicyTypeData({
        ...policyTypeData,
        id: editData.id,
        name: editData.name,
        company: editData.company,
        policy_category: editData.policy_category,
      });
    }
    fetchCompany();
    fetchCategory();
  }, []);

  return (
    <div>
      <ModalHeader toggle={toggle ? toggle : editToggle}>
        {toggle ? "New Policy Master" : "Edit Policy Master"}
      </ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSave}>
          <Row>
            <Col md={4} className="d-flex flex-column">
              <div className="w-100">
                <FormGroup>
                  <Label for="company">Company</Label>
                  <Input
                    className="form-control"
                    type="select"
                    name="company"
                    value={policyTypeData.company}
                    onChange={handleInputChange}
                    invalid={errors.company}
                  >
                    <option value="">Select a company</option>
                    {company.map((option, index) => (
                      <option key={index} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </Input>
                  <FormFeedback>Select a company</FormFeedback>
                </FormGroup>
              </div>
            </Col>
            <Col md={4} className="d-flex flex-column">
              <div className="w-100">
                <FormGroup>
                  <Label for="policy_category">Category</Label>
                  <Input
                    className="form-control"
                    type="select"
                    name="policy_category"
                    value={policyTypeData.policy_category}
                    onChange={handleInputChange}
                    invalid={errors.category}
                  >
                    <option value="">Select a category</option>
                    {category.map((option, index) => (
                      <option key={index} value={option.id}>
                        {option.policy_name}
                      </option>
                    ))}
                  </Input>
                  <FormFeedback>Select a company</FormFeedback>
                </FormGroup>
              </div>
            </Col>
            <Col md={4} className="d-flex flex-column">
              <div className="w-100">
                <FormGroup>
                  <Label htmlFor="">Policy master</Label>
                  <Input
                    className="form-control"
                    type="text"
                    name="name"
                    value={policyTypeData.name}
                    onChange={handleInputChange}
                    placeholder="Enter policy master"
                    invalid={errors.name}
                  />
                  <FormFeedback>Policy master is required</FormFeedback>
                </FormGroup>
              </div>
            </Col>
          </Row>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button onClick={handleSave} color="primary">
          {toggle ? "Create" : "Update"}
        </Button>{" "}
        <Button onClick={toggle ? toggle : editToggle} color="secondary">
          Cancel
        </Button>
      </ModalFooter>
    </div>
  );
};

export default NewPolicyType;
