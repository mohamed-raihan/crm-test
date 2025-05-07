import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  FormFeedback,
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
import { toast, ToastContainer } from "react-toastify";

const NewCategory = ({ toggle, editData, fetchCategory, editToggle }) => {
  const [categoryData, setCategorydata] = useState({
    id: "",
    policy_name: "",
    // company: "",
  });

  const [company, setCompany] = useState([]);
  const [errors, setErrors] = useState({});

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

  console.log(company);

  const handleInputChange = (event) => {
    const { name, value, type, files } = event.target;
    console.log(files);

    setCategorydata({
      ...categoryData,
      [name]: type === "file" ? files[0] : value, // Handle file inputs
    });
  };

  console.log(categoryData);

  const validateFields = () => {
    const newErrors = {};
    Object.entries(categoryData).forEach(([key, value]) => {
      if (key !== "id") { // Skip validation for the `id` field
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
    console.log(categoryData);

    event.preventDefault();
    if (!validateFields()) {
      toast.error("Please fill out all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("policy_name", categoryData.policy_name);
    formData.append("company", categoryData.company);

    if (categoryData.id) {
      console.log("edit");

      allaxios
        .patch(
          API_URL.POLICY_CATEGORY.PATCH_CATEGORY(categoryData.id),
          formData
        )
        .then((response) => {
          console.log(response);
          toast.success("Category updated");
          editToggle();
          fetchCategory();
        })
        .catch((error) => {
          console.error(error);
          toast.error("Error occured");
        });
    } else {
      console.log("add");

      allaxios
        .post(API_URL.POLICY_CATEGORY.POST_CATEGORY, formData)
        .then((response) => {
          console.log(response);
          toggle();
          toast.success("Policy category added");
        })
        .catch((error) => {
          console.error(error);
          toast.error("Error occured");
        });
    }
  };

  useEffect(() => {
    if (editData) {
      setCategorydata({
        ...categoryData,
        id: editData.id,
        policy_name: editData.policy_name,
        company: editData.company,
      });
    }
    fetchCompany();
  }, []);

  return (
    <div>
      <ModalHeader toggle={toggle ? toggle : editToggle}>
        {toggle ? "New Category" : "Edit Category"}
      </ModalHeader>
      <ModalBody>
        <Row>
          {/* <Col md={6}>
                <h6 className="mb-3">Logo</h6>
                <div className="d-flex flex-column border align-items-center justify-content-center p-3">
                    <div className="d-flex">
                        <img src={EmptyImage} width={'70px'} alt="" />
                        <p className="text-center">Drop your image here</p>
                    </div>
                </div>
            </Col> */}
          {/* <Col md={6} className="d-flex flex-column">
            <div className="w-100">
              <FormGroup>
                <Label>Company</Label>
                <Input
                  className="form-control"
                  type="select"
                  name="company"
                  value={categoryData.company}
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
            </Col> */}
            <Col md={12}>
            <div className="w-100">
              <FormGroup>
                <Label htmlFor="">Category</Label>
                <Input
                  className="form-control"
                  type="text"
                  name="policy_name"
                  value={categoryData.policy_name}
                  onChange={handleInputChange}
                  placeholder="Enter category name"
                  invalid={errors.policy_name}
                />
                <FormFeedback>Category is required</FormFeedback>
              </FormGroup>
            </div>
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter>
        <Button onClick={handleSave} color="primary">
          Create
        </Button>{" "}
        <Button onClick={toggle ? toggle : editToggle} color="secondary">
          Cancel
        </Button>
      </ModalFooter>
    </div>
  );
};

export default NewCategory;
