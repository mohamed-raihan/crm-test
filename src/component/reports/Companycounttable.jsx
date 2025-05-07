import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { CompanyCustomerTableColumn } from "../Common/TableDatas";
import { Nav, NavItem, NavLink, TabContent, TabPane, Button } from "reactstrap";
import * as XLSX from "xlsx"; // Import XLSX for Excel export
import allaxios from "../../api/axios";
import API_URL from "../../api/api_urls";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { DownloadIcon } from "lucide-react";
import { isWithinInterval, parseISO } from "date-fns";

const CompanyTable = () => {
  const [companies, setCompanies] = useState([]); // All companies
  const [companyPolicies, setCompanyPolicies] = useState({}); // Store policies per company
  const [selectedCompanyId, setSelectedCompanyId] = useState(null); // Selected company ID
  const [allCustomers, setAllCustomers] = useState([]); // All customers
  const [filteredCustomers, setFilteredCustomers] = useState({}); // Customers filtered by company policies
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate(); // React Router navigation
  const [policy, setpolicy] = useState([]); // All customers
  const [totalPaid, setTotalPaid] = useState(0);
  const [totalDue, setTotalDue] = useState(0);
  const [dueDate, setDueDate] = useState(null);
  const [filterDate, setFilterDate] = useState({
    startDate: "",
    endDate: "",
  });

  // Fetch all companies
  const fetchCompany = async () => {
    try {
      const response = await allaxios.get(API_URL.COMPANY.GET_COMPANY, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      });

      setCompanies(response.data);

      if (response.data.length > 0) {
        const firstCompanyId = response.data[0].id;
        setSelectedCompanyId(firstCompanyId); // Automatically set the first company
        fetchCompanyCustomers(firstCompanyId); // Fetch customers for the first company
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch all customers
  const fetchCustomer = async () => {
    try {
      const response = await allaxios.get(API_URL.CUSTOMER.GET_CUSTOMER, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      });
      console.log(response);

      setAllCustomers(response.data);
    } catch (error) {
      console.error(error);
      // toast.error("Error fetching customers");
    }
  };

  const fetchpolicy = async () => {
    try {
      const response = await allaxios.get(API_URL.POLICIES.GET_POLICIES, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      });

      setpolicy(response.data);
    } catch (error) {
      console.error(error);
      // toast.error("Error fetching customers");
    }
  };

  const handleProfileNavigate = (user) => {
    setSelectedUser(user);
    // setLoading(true); // Show a full-screen spinner

    setTimeout(() => {
      // setLoading(false);
      console.log("Navigating to profile:", user);
      navigate("/customerprofile", { state: { customerData: user } });
    }, 100); // Simulating a short delay before navigation
  };

  // Fetch policies of a selected company
  // const fetchCompanyCustomer = (companyId) => {
  //   if (!companyId) {
  //     console.error("Company ID is undefined or null");
  //     return;
  //   }

  //   console.log(`Fetching customers for company ID: ${companyId}`);
  // console.log(policy);

  //   // Find policies related to the selected company
  //   const companyRelatedPolicies = policy.filter((p) => p.company === companyId);
  //   // if (!companyRelatedPolicies.length) {
  //   //   console.warn("No policies found for this company.");
  //   //   setFilteredCustomers((prev) => ({ ...prev, [companyId]: [] }));
  //   //   return;
  //   // }
  // console.log(companyRelatedPolicies);

  //   // Get the list of policy IDs for this company
  //   const companyPolicyIds = companyRelatedPolicies.map((p) => p.id);
  //   console.log("Company Policy IDs:", companyPolicyIds);

  //   // Filter customers whose customer_policies contain these policy IDs
  //   const matchedCustomers = allCustomers.filter((customer) =>
  //     customer.customer_policies?.some((policy) => companyPolicyIds.includes(policy.policy_id))
  //   );

  //   console.log("Matched Customers:", matchedCustomers);

  //   setFilteredCustomers((prev) => ({
  //     ...prev,
  //     [companyId]: matchedCustomers,
  //   }));
  // };
  const fetchCompanyCustomers = () => {
    const updatedFilteredCustomers = {};

    companies.forEach((company) => {
      const companyRelatedPolicies = policy.filter(
        (p) => p.company === company.id
      );
      const companyPolicyIds = companyRelatedPolicies.map((p) => p.id);

      const matchedCustomers = allCustomers.filter((customer) =>
        customer.customer_policies?.some((policy) =>
          companyPolicyIds.includes(policy.policy)
        )
      );

      updatedFilteredCustomers[company.id] = matchedCustomers;
    });

    setFilteredCustomers(updatedFilteredCustomers);
  };

  useEffect(() => {
    if (companies.length > 0 && policy.length > 0 && allCustomers.length > 0) {
      fetchCompanyCustomers();
    }
  }, [companies, policy, allCustomers]);

  // Filter customers whose policies match the company's policies
  const filterCustomersByPolicies = (companyId, companyPolicies) => {
    if (!companyPolicies || companyPolicies.length === 0) {
      setFilteredCustomers((prev) => ({ ...prev, [companyId]: [] }));
      return;
    }

    console.log(companyId);
    console.log(companyPolicies);

    const companyPolicyIds = companyPolicies.map((policy) => policy.id);

    console.log(companyPolicyIds);

    const matchedCustomers = allCustomers.filter((customer) =>
      customer.customer_policies.some((policy) =>
        companyPolicyIds.includes(policy.policy_id)
      )
    );

    console.log(matchedCustomers);

    setFilteredCustomers((prev) => ({
      ...prev,
      [companyId]: matchedCustomers,
    }));
  };

  console.log(policy);

  // useEffect(() => {
  //   console.log("Selected Company ID:", selectedCompanyId);
  //   console.log("Company Policies:", companyPolicies);
  //   console.log("All Customers:", allCustomers);
  //   console.log("Filtered Customers:", filteredCustomers);
  // }, [selectedCompanyId, companyPolicies, allCustomers, filteredCustomers]);

  useEffect(() => {
    fetchCompany();
    fetchCustomer();
    fetchpolicy();
  }, []);

  useEffect(() => {
    if (selectedCompanyId && companyPolicies[selectedCompanyId]) {
      filterCustomersByPolicies(
        selectedCompanyId,
        companyPolicies[selectedCompanyId]
      );
    }
  }, [selectedCompanyId, allCustomers]);


  const exportToExcel = (id) => {
    if (!id) return;
  
    console.log(id);
    console.log(companies);
  
    // Find the matching company name
    const matchedCompany = companies.find((item) => item.id === id)?.name || "Unknown Company";
    console.log(matchedCompany);
  
    // Prepare the data
    const sanitizedData = filteredCustomers[id].map((row) => [
      row.id || "",
      matchedCompany,
      row.customer_id || "",
      row.name || "",
      row.contact || "",
      row.email || "",
      row.customer_policies[0]?.policy_name || "No policy",
      row.customer_policies[0]?.coverage_amount || 0,
      row.customer_policies[0]?.total_amount || 0,
      row.payments[0]?.amount_paid || 0,
      row.payments[0]?.balance || 0,
      row.created_date || "",
      row.created_by?.name || "",
      row.occupation || "",
      row.status || "",
    ]);
  
    // Create a new workbook
    const workbook = XLSX.utils.book_new();
  
    // Define headers
    const headers = [
      "ID",
      "Company",
      "Customer ID",
      "Name",
      "Contact",
      "Email",
      "Policy",
      "Sum Insured",
      "Policy Amount",
      "Total Paid Amount",
      "Due Amount",
      "Created Date",
      "Created By",
      "Occupation",
      "Status",
    ];
  
    // Define the sheet title
    const sheetTitle = [[matchedCompany]]; // Title row
  
    // Create an empty worksheet
    const worksheet = XLSX.utils.aoa_to_sheet([]);
  
    // Add the title to the first row
    XLSX.utils.sheet_add_aoa(worksheet, sheetTitle, { origin: "A1" });
  
    // Merge the title across all columns
    worksheet["!merges"] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: headers.length - 1 } } // Merge A1 to last column
    ];
  
    // Add headers to the second row
    XLSX.utils.sheet_add_aoa(worksheet, [headers], { origin: "A2" });
  
    // Add actual data starting from row 3
    XLSX.utils.sheet_add_aoa(worksheet, sanitizedData, { origin: "A3" });
  
    // Set column widths for better readability
    worksheet["!cols"] = headers.map(() => ({ wch: 20 }));
  
    // Add worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
  
    // Generate filename
    const fileName = `users_data_${new Date().getTime()}.xlsx`;
  
    // Write and download the file
    XLSX.writeFile(workbook, fileName);
  };
  

  const handleDateFilter = (event) => {
    const { name, value } = event.target;
    setFilterDate({
      ...filterDate,
      [name]: value,
    });
    console.log(value);
  };

  const applyFilterChange = (id) => {
    if (filterDate.startDate === "") {
      setFilteredCustomers((prev) => ({
        ...prev,
        [id]: allCustomers,
      }));
    } else {
      const datefilteredData = allCustomers.filter((data) => {
        console.log(data);
        console.log(filterDate);

        const createdDate = parseISO(data.created_date);
        console.log(createdDate);

        return isWithinInterval(createdDate, {
          start: new Date(filterDate.startDate),
          end: new Date(filterDate.endDate),
        });
      });
      console.log(datefilteredData);

      setFilteredCustomers(datefilteredData);
      setFilteredCustomers((prev) => ({
        ...prev,
        [id]: datefilteredData,
      }));

      setFilterDate({
        ...filterDate,
        startDate: "",
        endDate: "",
      });
    }
  };

  const ExportButton = ({ id }) => (
    <div className="d-flex">
      <div className="d-flex  me-2">
        <div className="me-3">
          {/* <label htmlFor="filter-date">Date</label> */}
          <div className="d-flex">
            <input
              name="startDate"
              type="date"
              id="filter-date"
              value={filterDate.startDate}
              onChange={handleDateFilter}
              className="form-control"
            />
            <div className="mx-1">
              <h3>-</h3>
            </div>
            <input
              name="endDate"
              type="date"
              id="filter-date"
              value={filterDate.endDate}
              onChange={handleDateFilter}
              className="form-control"
            />
          </div>
        </div>

        <div className="d-flex">
          <Button
            className=""
            onClick={() => applyFilterChange(id)}
            style={{
              width: "90px",
              backgroundColor: "#a3b18a",
              color: "white",
              border: "#a3b18a",
            }}
          >
            Apply
          </Button>
        </div>
      </div>
      <Button
        onClick={() => exportToExcel(id)}
        className="flex items-center gap-2"
      >
        <DownloadIcon className="w-4 me-2 h-4" />
        Export to Excel
      </Button>
    </div>
  );


  useEffect(() => {
    if (companies.length > 0 && policy.length > 0 && allCustomers.length > 0) {
      fetchCompanyCustomers();
    }
  }, [companies, policy, allCustomers]);

  // Calculate total paid and due amounts only for the selected company
  useEffect(() => {
    if (!selectedCompanyId || !filteredCustomers[selectedCompanyId]) return;

    let totalPaidSum = 0;
    let totalDueSum = 0;
    let latestDueDate = null;

    filteredCustomers[selectedCompanyId].forEach((customer) => {
      if (Array.isArray(customer.payments)) {
        customer.payments.forEach((payment) => {
          totalPaidSum += Number(payment.total_paid_amount) || 0;
          totalDueSum += Number(payment.due_amount) || 0;
          if (payment.due_date) {
            latestDueDate = payment.due_date;
          }
        });
      }
    });

    setTotalPaid(totalPaidSum);
    setTotalDue(totalDueSum);
    setDueDate(latestDueDate);
  }, [selectedCompanyId, filteredCustomers]);

  console.log(totalDue);
  console.log(totalPaid);
  console.log(allCustomers);
  const totaldueamount = allCustomers.map((payments) => {
    return payments.payments;
  });

  console.log(totaldueamount);
  console.log(filteredCustomers);
  console.log(companies);
  
  

  return (
    <div className="table-wrapper">
      <div className="d-flex flex-wrap justify-content-between p-3 border my-1 shadow position-relative">
        <h5 className="ms-2">Company</h5>
        {/* <Button color="success" onClick={exportToExcel}>
          {" "}
          Export to Excel
        </Button> */}
      </div>

      <div
        style={{
          display: "flex",
          overflowX: "auto",
          whiteSpace: "nowrap",
          WebkitOverflowScrolling: "touch", // Smooth scrolling on touch devices
          scrollbarWidth: "thin", // Firefox scrollbar
        }}
      >
        <Nav
          tabs
          className="mb-3 d-flex flex-nowrap"
          style={{
            display: "flex",
            flexWrap: "nowrap",
          }}
        >
          {companies.map((company) => (
            <NavItem key={company.id}>
              <NavLink
                className={`d-flex align-items-center ${
                  selectedCompanyId === company.id ? "active" : ""
                }`}
                onClick={() => {
                  setSelectedCompanyId(company.id);
                  fetchCompanyCustomers(company.id);
                }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "10px",
                  minWidth: "200px",
                  cursor: "pointer",
                }}
              >
                <img
                  src={company.logo || "https://via.placeholder.com/40"}
                  alt={company.name}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    marginRight: "10px",
                    objectFit: "cover",
                  }}
                />

                <span>{company.name}</span>

                <span
                  style={{
                    backgroundColor: "green",
                    color: "white",
                    padding: "3px 8px",
                    borderRadius: "10px",
                    fontSize: "12px",
                    marginLeft: "10px",
                    fontWeight: "bold",
                  }}
                >
                  {filteredCustomers[company.id]?.length || 0}
                </span>
              </NavLink>
            </NavItem>
          ))}
        </Nav>
      </div>

      <TabContent activeTab={selectedCompanyId}>
        {companies.map((company) => (
          <TabPane tabId={company.id} key={company.id}>
            <DataTable
              title="Data"
              className="border shadow"
              data={filteredCustomers[company.id] || []} // Show filtered customers
              columns={CompanyCustomerTableColumn(handleProfileNavigate,company.name)}
              striped={true}
              center={true}
              pagination
              fixedHeader
              fixedHeaderScrollHeight="80vh"
              actions={<ExportButton id={company.id} />}
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

export default CompanyTable;
