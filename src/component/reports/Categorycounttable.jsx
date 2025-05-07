import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { CategoryCustomerTableColumn } from "../Common/TableDatas";
import { Nav, NavItem, NavLink, TabContent, TabPane, Button } from "reactstrap";
import * as XLSX from "xlsx"; // Import XLSX for Excel export
import allaxios from "../../api/axios";
import API_URL from "../../api/api_urls";
import { toast } from "react-toastify";

const CategoryTable = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [allCustomers, setAllCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState({});
  const [allPolicies, setAllPolicies] = useState([]);
  const [totalPaid, setTotalPaid] = useState(0);
  const [totalDue, setTotalDue] = useState(0);

  const fetchCategories = async () => {
    try {
      const response = await allaxios.get(
        API_URL.POLICY_CATEGORY.GET_CATEGORY,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
          },
        }
      );
      setCategories(response.data);
      if (response.data.length > 0) {
        setSelectedCategoryId(response.data[0].id);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching categories");
    }
  };

  const fetchPolicies = async () => {
    try {
      const response = await allaxios.get(API_URL.POLICIES.GET_POLICIES, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      });
      setAllPolicies(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Error fetching policies");
    }
  };

  const fetchCustomer = async () => {
    try {
      const response = await allaxios.get(API_URL.CUSTOMER.GET_CUSTOMER, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      });
      setAllCustomers(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Error fetching customers");
    }
  };

  const fetchCategoryCustomers = (categoryId) => {
    if (!categoryId || !allPolicies.length || !allCustomers.length) return;

    const categoryPoliciesList = allPolicies.filter(
      (policy) => policy.policy_category === categoryId
    );

    console.log(categoryPoliciesList);
    

    if (!categoryPoliciesList.length) {
      setFilteredCustomers((prev) => ({ ...prev, [categoryId]: [] }));
      return;
    }

    const categoryPolicyIds = categoryPoliciesList.map((policy) => policy.id);
    console.log(categoryPolicyIds);

    console.log(allCustomers);
    
    
    const matchedCustomers = allCustomers.filter((customer) =>
      customer.customer_policies?.some(
        (policy) =>
          policy.policy &&
          categoryPolicyIds.includes(policy.policy)
      )
    );

    console.log(matchedCustomers);
    

    setFilteredCustomers((prev) => {
      if (
        JSON.stringify(prev[categoryId]) !== JSON.stringify(matchedCustomers)
      ) {
        return { ...prev, [categoryId]: matchedCustomers };
      }
      return prev;
    });
  };

  useEffect(() => {
    fetchPolicies();
    fetchCustomer();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategoryId) {
      fetchCategoryCustomers(selectedCategoryId);
    }
  }, [selectedCategoryId, allCustomers, allPolicies]);

  useEffect(() => {
    if (!selectedCategoryId || !filteredCustomers[selectedCategoryId]) return;
    let totalPaidSum = 0;
    let totalDueSum = 0;

    filteredCustomers[selectedCategoryId].forEach((customer) => {
      customer.payments?.forEach((payment) => {
        totalPaidSum += Number(payment.total_paid_amount) || 0;
        totalDueSum += Number(payment.due_amount) || 0;
      });
    });

    setTotalPaid(totalPaidSum);
    setTotalDue(totalDueSum);
  }, [selectedCategoryId, filteredCustomers]);

  const exportToExcel = () => {
    if (!selectedCategoryId || !filteredCustomers[selectedCategoryId]?.length) {
      toast.warning("No customer data to export!");
      return;
    }
    const worksheet = XLSX.utils.json_to_sheet(
      filteredCustomers[selectedCategoryId]
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Customers");
    XLSX.writeFile(workbook, `Category_${selectedCategoryId}_Customers.xlsx`);
    toast.success("Customer data exported successfully!");
  };

  return (
    <div className="table-wrapper">
      <div className="d-flex justify-content-between p-3 border shadow">
        <h5>Categories</h5>
        <Button color="success" onClick={exportToExcel}>
          Export to Excel
        </Button>
      </div>

      <Nav tabs className="mt-2">
        {categories.map((category) => (
          <NavItem key={category.id}>
            <NavLink
              className={selectedCategoryId === category.id ? "active" : ""}
              onClick={() => setSelectedCategoryId(category.id)}
            >
              {category.policy_name}{" "}
              <span className="badge bg-primary ms-2">
                {filteredCustomers[category.id]?.length || 0}
              </span>
            </NavLink>
          </NavItem>
        ))}
      </Nav>

      <TabContent activeTab={selectedCategoryId}>
        {categories.map((category) => (
          <TabPane tabId={category.id} key={category.id}>
            <DataTable
              className="border shadow"
              data={filteredCustomers[category.id] || []}
              columns={CategoryCustomerTableColumn()}
              striped
              center
              pagination
              fixedHeader
              fixedHeaderScrollHeight="80vh"
            />
          </TabPane>
        ))}
      </TabContent>

      <div className="p-3 border shadow my-3 d-flex justify-content-between">
        {/* Right-aligned section for total amounts */}
        <div className="ms-auto d-flex gap-3">
          <div
            style={{
              backgroundColor: "#d4edda",
              padding: "10px",
              borderRadius: "8px",
              textAlign: "center",
              minWidth: "180px",
            }}
          >
            <h5
              style={{
                color: "#155724",
                fontWeight: "bold",
                marginBottom: "5px",
              }}
            >
              Total Amount Paid
            </h5>
            <p style={{ fontSize: "20px", fontWeight: "bold", margin: "0" }}>
              ₹{totalPaid.toFixed(2)}
            </p>
          </div>

          <div
            style={{
              backgroundColor: "#f8d7da",
              padding: "10px",
              borderRadius: "8px",
              textAlign: "center",
              minWidth: "180px",
            }}
          >
            <h5
              style={{
                color: "#721c24",
                fontWeight: "bold",
                marginBottom: "5px",
              }}
            >
              Total Due Amount
            </h5>
            <p style={{ fontSize: "20px", fontWeight: "bold", margin: "0" }}>
              ₹{totalDue.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryTable;
