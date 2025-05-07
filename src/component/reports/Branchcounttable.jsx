import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { BranchCustomercountTableColumn } from "../Common/TableDatas";
import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
} from "reactstrap";
import * as XLSX from "xlsx"; // Import XLSX for Excel export
import allaxios from "../../api/axios";
import API_URL from "../../api/api_urls";
import { toast } from "react-toastify";
import { FaFilter } from "react-icons/fa";
import { Grid2 } from "@mui/material";
import { MdAccountBalance, MdPayments, MdPolicy } from "react-icons/md";
import Select from "react-select";
import { IoMdRefresh } from "react-icons/io";
import { DownloadIcon } from "lucide-react";
import { isWithinInterval, parseISO } from "date-fns";

const BranchTable = () => {
  const [branches, setBranches] = useState([]); // All branches
  const [selectedBranchName, setSelectedBranchName] = useState(null); // Selected branch name
  const [allCustomers, setAllCustomers] = useState([]); // All customers
  const [filteredCustomers, setFilteredCustomers] = useState([]); // Customers filtered by branch
  const [branchCustomerCounts, setBranchCustomerCounts] = useState({}); // Store customer count per branch
  const [filters, setFilters] = useState({
    category: "",
    company: "",
  });
  const [premium, setPremium] = useState(0);
  const [paid, setPaid] = useState(0);
  const [categoryList, setCategoryList] = useState([]);
  const [companyList, setCompanyList] = useState([]);
  const [filterDate, setFilterDate] = useState({
    startDate: "",
    endDate: "",
  });

  const cardData = [
    {
      logo: <MdPolicy className="fs-3" />,
      title: "Total Policy Amount",
      description: premium ? `₹${premium}` : 0,
      color: "red",
    },
    {
      logo: <MdPayments className="fs-3" />,
      title: "Total Paid Amount",
      description: paid ? `₹${paid}` : 0,
      color: "orange",
    },
    {
      logo: <MdAccountBalance className="fs-3" />,
      title: "Total Due Amount",
      description: premium - paid ? `₹${(premium - paid).toFixed(2)}` : 0,
      color: "yellow",
    },
  ];

  // Fetch all branches
  const fetchBranches = async () => {
    try {
      const response = await allaxios.get(API_URL.BRANCH.GET_BRANCH, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      });
      console.log(response);

      setBranches(response.data);
      if (response.data.length > 0) {
        setSelectedBranchName(response.data[0].branch_name); // Default to first branch
        filterCustomersByBranch(response.data[0].branch_name);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching branches");
    }
  };

  // Fetch all customers
  const fetchCustomers = async () => {
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
      toast.error("Error fetching customers");
    }
  };

  //category
  const fetchCategory = async () => {
    try {
      const response = await allaxios.get(API_URL.POLICY_CATEGORY.GET_CATEGORY);
      console.log(response);
      setCategoryList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(categoryList);

  const fetchCompany = async () => {
    try {
      const response = await allaxios.get(API_URL.COMPANY.GET_COMPANY);
      console.log(response);
      setCompanyList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Filter customers based on branch name
  // const filterCustomersByBranch = (branchName) => {
  //   if (!branchName) {
  //     console.error("Branch Name is undefined or null");
  //     return;
  //   }

  //   console.log(`Filtering customers for branch: ${branchName}`);

  //   const matchedCustomers = allCustomers.filter(
  //     (customer) => customer.branch_name === branchName
  //   );

  //   console.log(`Filtered Customers for ${branchName}:`, matchedCustomers);

  //   setFilteredCustomers(matchedCustomers);
  // };

  const filterCustomersByBranch = (branchName) => {
    if (!branchName) {
      console.error("Branch Name is undefined or null");
      return;
    }

    console.log(`Filtering customers for branch: ${branchName}`);

    // Count customers for each branch
    const updatedBranchCounts = {};
    branches.forEach((branch) => {
      const matchedCustomers = allCustomers.filter(
        (customer) => customer.branch_name === branch.branch_name
      );
      updatedBranchCounts[branch.branch_name] = matchedCustomers.length; // Store count only
    });

    console.log("Branch Customer Counts:", updatedBranchCounts);
    setBranchCustomerCounts(updatedBranchCounts);

    // Update filtered customers only for active tab
    const matchedCustomers = allCustomers.filter(
      (customer) => customer.branch_name === branchName
    );
    setFilteredCustomers(matchedCustomers);
    if (matchedCustomers.length) {
      calculatePremium(matchedCustomers);
      calculateAmountpaid(matchedCustomers);
    }
  };

  useEffect(() => {
    if (branches.length > 0 && allCustomers.length > 0) {
      filterCustomersByBranch(selectedBranchName || branches[0]?.branch_name);
    }
  }, [branches, allCustomers]); // Run when branches or customers change

  useEffect(() => {
    fetchBranches();
    fetchCustomers();
    fetchCategory();
    fetchCompany();
  }, []);

  useEffect(() => {
    if (selectedBranchName) {
      filterCustomersByBranch(selectedBranchName);
    }
  }, [selectedBranchName, allCustomers]); // Re-filter when branch changes or new customers arrive

  //cards
  const StatsCard = ({ title, value, change, Icon, color }) => (
    <div className={`stats-card`}>
      <div className="stats-card-content">
        <div>
          <p className="stats-title">{title}</p>
          <p className="stats-value">{value}</p>
          <p className={`stats-change ${color}`}>{change}</p>
        </div>
        <div className={`stats-icon ${color}`}>
          <div>{Icon}</div>
        </div>
      </div>
    </div>
  );

  const calculatePremium = (data) => {
    const grandTotalPremium = data.reduce((total, customer) => {
      return (
        total +
        customer.customer_policies.reduce(
          (sum, policy) => sum + policy.total_amount,
          0
        )
      );
    }, 0);

    console.log(grandTotalPremium);

    setPremium(Number(grandTotalPremium));
  };

  const calculateAmountpaid = (data) => {
    const grandTotal = data.reduce((total, customer) => {
      return (
        total +
        customer.payments.reduce(
          (sum, payment) => sum + Number(payment.amount_paid),
          0
        )
      );
    }, 0);

    console.log(Number(grandTotal));

    setPaid(Number(grandTotal));
  };

  const handleFilter = (e) => {
    const { name, value } = e.target;
    console.log(value);

    setFilters((prev) => ({
      ...prev,
      [name]: value.toLowerCase(),
    }));
  };

  console.log(filters);

  const handleFilterSave = () => {
    console.log(filters.category, filters.company);
    console.log(allCustomers);

    const filteredData = allCustomers.filter((customer) =>
      customer.customer_policies?.some(
        (policy) =>
          policy.policy_category?.toLowerCase() ===
            filters.category.toLocaleLowerCase() &&
          policy.company?.toLowerCase() === filters.company.toLocaleLowerCase()
      )
    );

    console.log(filteredData);

    setFilteredCustomers(filteredData);

    if (filteredData.length) {
      calculatePremium(filteredData);
      calculateAmountpaid(filteredData);
    }

    setFilters({
      ...filters,
      category: "",
      company: "",
    });
  };

  const handleRefresh = () => {
    fetchCustomers();
  };

  console.log(filters.category, filters.company);
  console.log(filteredCustomers);

  // // **Export to Excel Function**
  // const exportToExcel = () => {
  //   if (!selectedBranchName || !filteredCustomers.length) {
  //     toast.warning("No customer data to export!");
  //     return;
  //   }

  //   const worksheet = XLSX.utils.json_to_sheet(filteredCustomers);
  //   const workbook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workbook, worksheet, "Customers");

  //   XLSX.writeFile(workbook, `Branch_${selectedBranchName}_Customers.xlsx`);
  //   toast.success("Customer data exported successfully!");
  // };

  const handleDateFilter = (event) => {
    const { name, value } = event.target;
    setFilterDate({
      ...filterDate,
      [name]: value,
    });
    console.log(value);
  };

  const applyFilterChange = () => {
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

    setFilterDate({
      ...filterDate,
      startDate: "",
      endDate: "",
    });
  };

  //export

  const exportToExcel = (branch) => {
    console.log(branch);

    if (branch) {
      const sanitizedData = filteredCustomers.map((row) => ({
        ID: row.id || "",
        Branch: branch || "",
        Customer_ID: row.customer_id || "",
        Name: row.name || "",
        Contact: row.contact || "",
        Email: row.email || "",

        Policy: row.customer_policies[0]?.policy_name || "No policy",

        Sum_insured: row.customer_policies[0]?.plan_coverage.coverage_amount || 0,

        Policy_amount: row.customer_policies[0]?.plan_coverage.premium_amount || 0,

        Total_paid_amount: row.payments[0]?.amount_paid || 0,

        Due_amount: row.payments[0]?.balance || 0,

        Created_date: row.created_date || "",
        Created_by: row.created_by?.name || "",
        Occupation: row.occupation || "",
        Status: row.status || "",

        Total_Premium_amount: premium || 0,
        Total_Paid_amount: paid || 0,
        Total_Due_amount: premium ? (premium - paid).toFixed(2) : 0,
      }));

      // Create a new workbook
      const workbook = XLSX.utils.book_new();

      // Convert data to worksheet with proper type handling
      const worksheet = XLSX.utils.json_to_sheet(sanitizedData, {
        header: [
          "ID",
          "Branch",
          "Customer_ID",
          "Name",
          "Contact",
          "Email",
          "Policy",
          "Sum_insured",
          "Policy_amount",
          "Total_paid_amount",
          "Due_amount",
          "Created_date",
          "Created_by",
          "Occupation",
          "Status",
          "Total_Premium_amount",
          "Total_Paid_amount",
          "Total_Due_amount",
        ],
        skipHeader: false,
      });

      // Set safe column widths
      const columnWidths = [
        { wch: 10 }, // 1
        { wch: 20 }, // 2
        { wch: 15 }, // 3
        { wch: 15 }, // 4
        { wch: 18 }, // 5
        { wch: 15 }, // 6
        { wch: 12 }, // 7
        { wch: 13 }, // 8
        { wch: 17 }, // 9
        { wch: 12 }, // 10
        { wch: 12 }, // 11
        { wch: 15 }, // 12
        { wch: 15 }, // 13
        { wch: 15 }, // 14
        { wch: 18 },
        { wch: 18 },
        { wch: 18 },
        { wch: 18 },
      ];
      worksheet["!cols"] = columnWidths;

      // Add the worksheet to workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

      // Generate a safe filename
      const fileName = `users_data_${new Date().getTime()}.xlsx`;

      // Write the file with proper encoding
      XLSX.writeFile(workbook, fileName, {
        bookType: "xlsx",
        type: "binary",
        cellDates: false,
        cellStyles: true,
        compression: true,
      });
    }
  };

  const ExportButton = ({ branch }) => (
    <div className="d-flex">
      <div className="d-flex me-2">
        <div className="d-flex me-2">
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
        <div className="d-flex">
          <Button
            className=""
            onClick={applyFilterChange}
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
      <div>
        <Button
          onClick={() => exportToExcel(branch)}
          className="flex items-center gap-2"
        >
          <DownloadIcon className="w-4 me-2 h-4" />
          Export to Excel
        </Button>
      </div>
    </div>
  );

  return (
    <div
      className="p-1"
      style={{
        minHeight: "84vh",
      }}
    >
      <div className="d-flex flex-wrap justify-content-between p-3 border my-1 shadow position-relative">
        <h5 className="ms-2">Branches</h5>
      </div>

      {/* Branch Tabs with Name and Customer Count */}
      <Nav tabs className="mb-3">
        {branches.map((branch) => (
          <NavItem key={branch.branch_name}>
            <NavLink
              className={`d-flex align-items-center ${
                selectedBranchName === branch.branch_name ? "active" : ""
              }`}
              onClick={() => {
                setSelectedBranchName(branch.branch_name);

                const filteredData = allCustomers.filter(
                  (data) => data.branch_name === branch.branch_name
                );

                calculatePremium(filteredData);
                calculateAmountpaid(filteredData);
              }}
            >
              {/* Branch Name */}
              <span>{branch.branch_name}</span>

              {/* Correct Customer Count Per Branch */}
              <span
                style={{
                  backgroundColor: "blue",
                  color: "white",
                  padding: "3px 8px",
                  borderRadius: "10px",
                  fontSize: "12px",
                  marginLeft: "10px",
                  fontWeight: "bold",
                }}
              >
                {branchCustomerCounts[branch.branch_name] || 0}
              </span>
            </NavLink>
          </NavItem>
        ))}
      </Nav>

      <TabContent activeTab={selectedBranchName}>
        {branches.map(
          (branch) =>
            selectedBranchName === branch.branch_name && (
              <TabPane tabId={branch.branch_name} key={branch.branch_name}>
                <UncontrolledDropdown className="me-2 d-flex justify-content-end mb-2">
                  <div className="d-flex align-items-center">
                    <IoMdRefresh
                      onClick={handleRefresh}
                      className="fs-3 me-2"
                    />
                  </div>
                  <DropdownToggle color="primary">
                    <FaFilter style={{ marginRight: "5px" }} />
                    Filter
                  </DropdownToggle>
                  <DropdownMenu
                    className="p-2 mt-1"
                    style={{ backgroundColor: "#e0e1dd" }}
                  >
                    <div className="d-flex">
                      <Select
                        id="category"
                        className="mb-1 me-2"
                        name="category"
                        options={categoryList.map((item) => ({
                          value: item.policy_name,
                          label: item.policy_name,
                        }))}
                        value={
                          categoryList
                            .map((item) => ({
                              value: item.policy_name,
                              label: item.policy_name,
                            }))
                            .find(
                              (option) => option.value === filters.category
                            ) || null
                        }
                        onChange={(selectedOption) => {
                          setFilters((prev) => ({
                            ...prev,
                            category: selectedOption
                              ? selectedOption.value
                              : "",
                          }));
                        }}
                        isClearable
                        placeholder="Select Category"
                      />

                      <Select
                        id="company"
                        className="mb-1 z-3"
                        name="company"
                        options={companyList.map((item) => ({
                          value: item.name,
                          label: item.name,
                        }))}
                        value={
                          companyList
                            .map((item) => ({
                              value: item.name,
                              label: item.name,
                            }))
                            .find(
                              (option) => option.value === filters.company
                            ) || null
                        }
                        onChange={(selectedOption) => {
                          setFilters((prev) => ({
                            ...prev,
                            company: selectedOption ? selectedOption.value : "",
                          }));
                        }}
                        isClearable
                        placeholder="Select Company"
                      />
                    </div>
                    <div className="d-flex justify-content-end ">
                      <Button
                        className="mt-2 bg-success z-2"
                        onClick={handleFilterSave}
                      >
                        Save
                      </Button>
                    </div>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <DataTable
                  className="border shadow"
                  data={filteredCustomers} // Show filtered customers
                  columns={BranchCustomercountTableColumn()}
                  striped={true}
                  center={true}
                  pagination
                  fixedHeader
                  fixedHeaderScrollHeight="80vh"
                  actions={<ExportButton branch={branch.branch_name} />}
                />
                <Grid2 container spacing={2} sx={{ my: 3 }}>
                  {cardData.slice(0, 10).map((card, index) => (
                    <Grid2 item xs={12} sm={6} md={2.4} lg={2.4} key={index}>
                      <StatsCard
                        title={card.title}
                        value={card.description}
                        change="↓ 3.48% Since last month"
                        Icon={card.logo}
                        color={card.color}
                      />
                    </Grid2>
                  ))}
                </Grid2>
              </TabPane>
            )
        )}
      </TabContent>
    </div>
  );
};

export default BranchTable;
