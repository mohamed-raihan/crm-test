import React, { useState, useEffect, useRef } from "react";
// import "./reportstable.css";
import DataTable from "react-data-table-component";
import allaxios from "../../api/axios";
import API_URL from "../../api/api_urls";
import {
  reportAgentTablecolumn,
  reportTablecolumn,
  reportTransactionTablecolumn,
  reportUserTablecolumn,
} from "../Common/TableDatas";
import {
  Card,
  CardContent,
  Grid,
  Grid2,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import {
  MdPolicy,
  MdPayments,
  MdAccountBalance,
  MdPeople,
  MdAssignment,
  MdWork,
  MdSupervisorAccount,
  MdCategory,
  MdBusiness,
  MdLocalHospital,
} from "react-icons/md";
import { Button } from "reactstrap";
import { BetweenHorizonalEnd, DownloadIcon } from "lucide-react";
import { CSVLink } from "react-csv";
import { Link } from "react-router-dom";
import { FaBuilding } from "react-icons/fa";
import { FaNetworkWired } from "react-icons/fa"; // Correct import
import * as XLSX from "xlsx";
import { useDownloadExcel } from "react-export-table-to-excel";
import { isWithinInterval, parseISO } from "date-fns";

const ReportsPage = () => {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [filterDate, setFilterDate] = useState({
    startDate: "",
    endDate: "",
  });
  const [sortOrder, setSortOrder] = useState("asc");
  const [data, setData] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [premium, setPremium] = useState(0);
  const [paid, setPaid] = useState(0);
  const [agent, setAgent] = useState(0);
  const [user, setUser] = useState(0);
  const [transaction, setTransaction] = useState([]);
  const [branch, setBranch] = useState([]);
  const [role, setRole] = useState([]);
  const [companycount, setcompanycount] = useState([]);
  const [categorycount, setcategorycount] = useState([]);
  const [company, setcompany] = useState([]);

  const [policy, setPolicy] = useState([]);
  const [customerPolicy, setCustomerPolicy] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [hospicash,setHospicash] = useState([])

  // export to excel

  const tableRef = useRef(null);
  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "Export data",
    sheet: "User data",
  });

  // const cardData = [
  //   { title: "Total Policy Amount", description: premium ? premium : 0 },
  //   { title: "Total Paid Amount", description: paid ? paid : 0 },
  //   {
  //     title: "Total Due Amount",
  //     description: premium && paid ? (premium - paid).toFixed(2) : 0,
  //   },
  //   { title: "Total Customer Count", description: data ? data.length : 0 },
  //   { title: "Total Policy Count", description: policy ? policy : 0 },
  //   { title: "Total Staff Count", description: user ? user.length : 0 },
  //   { title: "Total Agent Count", description: agent ? agent.length : 0 },
  // ];

  // const cardData = [
  //   {
  //     logo: <MdPolicy className="fs-3" />,
  //     title: "Total Policy Amount",
  //     description: premium ? `₹${premium}` : 0,
  //     color: "red",
  //   },
  //   {
  //     logo: <MdPayments className="fs-3" />,
  //     title: "Total Paid Amount",
  //     description: paid ? `₹${paid}` : 0,
  //     color: "orange",
  //   },
  //   {
  //     logo: <MdAccountBalance className="fs-3" />,
  //     title: "Total Due Amount",
  //     description: premium - paid ? `₹${(premium - paid).toFixed(2)}` : 0,
  //     color: "yellow",
  //   },
  //   {
  //     logo: <MdSupervisorAccount className="fs" />,
  //     title: "Company Count",
  //     description: agent.length ? agent.length : 0,
  //     color: "blue",
  //   },

  //   {
  //     logo: <MdPeople className="fs-3" />,
  //     title: "Total Customer Count",
  //     description: data.length ? data.length : 0,
  //     color: "blue",
  //   },
  //   {
  //     logo: <MdAssignment className="fs-3" />,
  //     title: "Total Policy Count",
  //     description: policy ? policy : 0,
  //     color: "red",
  //   },
  //   {
  //     logo: <MdWork className="fs-3" />,
  //     title: "Total Staff Count",
  //     description: user.length ? user.length : 0,
  //     color: "yellow",
  //   },
  //   {
  //     logo: <MdSupervisorAccount className="fs-3" />,
  //     title: "Total Agent Count",
  //     description: agent.length ? agent.length : 0,
  //     color: "blue",
  //   },

  // ];

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
    {
      logo: (
        <Link to="/companycustomer">
          {" "}
          {/* Replace with your target path */}
          <FaBuilding
            className="fs-3 cursor-pointer"
            style={{ color: "black" }}
          />
        </Link>
      ),
      title: "Company Count",
      description: company.length ? company.length : 0,
      color: "blue",
    },
    {
      logo: (
        <Link to="/categorycustomer">
          {" "}
          {/* Replace with your target path */}
          <MdCategory
            className="fs-3 cursor-pointer"
            style={{ color: "black" }}
          />
        </Link>
      ),
      title: "Total Category Count",
      description: categorycount.length ? categorycount.length : 0,
      color: "blue",
    },
    {
      logo: (
        <Link to="/branchcustomer">
          <FaNetworkWired
            className="fs-3 cursor-pointer"
            style={{ color: "black" }}
          />
        </Link>
      ),
      title: "Total Branch Count",
      description: branch.length ? branch.length : 0,
      color: "blue",
    },
    {
      logo: (
        <Link to="/customercount">
          <MdPeople className="fs-3" />,
        </Link>
      ),
      title: "Total Customer Count",
      description: data.length ? data.length : 0,
      color: "blue",
    },
    {
      logo: (
        <Link style={{ textDecoration: "none" }} to="/hospicash-customer">
          <MdLocalHospital className="fs-3" />,
        </Link>
      ),
      title: "Hospicash Customers",
      description: hospicash.length ? hospicash.length : 0,
      color: "blue",
    },
    {
      logo: <MdAssignment className="fs-3" />,
      title: "Total customer Policy",
      description: policy ? policy : 0,
      color: "red",
    },
    {
      logo: (
        <Link to="/usercount">
          <MdWork className="fs-3" />
        </Link>
      ),
      title: "Total Staff Count",
      description: user.length ? user.length : 0,
      color: "yellow",
    },
    {
      logo: (
        <Link to="/agentcount">
          <MdSupervisorAccount className="fs-3" />
        </Link>
      ),
      title: "Total Agent Count",
      description: agent.length ? agent.length : 0,
      color: "blue",
    },
  ];

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

  useEffect(() => {
    fetchCustomer();
    fetchUser();
    fetchRole();
    fetchcategory();
    fetchcompany();
    fetchCompanycount();
    fetchTransaction();
    setFilteredReports(data);
  }, []);

  console.log(filteredReports);

  useEffect(() => {
    if (data.length) {
      calculatePremium(data);
      calculateAmountpaid(data);
    }
    policyCount();
    fetchAgent();
    fetchBranch();
  }, [data]);

  const fetchCustomer = async () => {
    try {
      const response = await allaxios(API_URL.CUSTOMER.GET_CUSTOMER);
      console.log(response);

      const hospicashData = response.data.filter((data) =>
        data.customer_policies.some(
          (policy) => policy.policy_name?.toLowerCase() === "hospicash"
        )
      );

      setHospicash(hospicashData)
      setData(response.data);
      setFilteredReports(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchcategory = async () => {
    try {
      const response = await allaxios(API_URL.POLICY_CATEGORY.GET_CATEGORY);
      console.log(response);

      setcategorycount(response.data);
      // setFilteredReports(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchcompany = async () => {
    try {
      const response = await allaxios(API_URL.COMPANY.GET_COMPANY);
      console.log(response);

      setcompany(response.data);
      // setFilteredReports(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCompanycount = async () => {
    try {
      const response = await allaxios(API_URL.POLICY_COUNT);
      console.log(response);

      setcompanycount(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(companycount);

  const fetchAgent = async () => {
    try {
      const response = await allaxios(API_URL.AGENTS.GET_AGENT);
      console.log(response.data);
      setAgent(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBranch = async () => {
    try {
      const response = await allaxios(API_URL.BRANCH.GET_BRANCH);
      console.log(response);
      setBranch(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUser = async () => {
    try {
      const response = await allaxios(API_URL.USERS.GET_USERS);
      console.log(response);
      setUser(response.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTransaction = async () => {
    try {
      const response = await allaxios(API_URL.PAYMENT.GET_PAYMENT);
      console.log(response);
      setTransaction(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRole = async () => {
    try {
      const response = await allaxios(API_URL.USERROLE.GET_ROLE);
      console.log(response);
      setRole(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const policyCount = async () => {
    try {
      const response = await allaxios(API_URL.POLICY_COUNT);
      console.log(response);
      setPolicy(response.data.total_customer_policy_count);
    } catch (error) {
      console.log(error);
    }
  };

  //export
  const exportToCSV = () => {
    const headers = Object.keys(filteredReports[0]);
    const csvContent = [
      headers.join(","),
      ...filteredReports.map((row) =>
        headers
          .map((header) =>
            typeof row[header] === "string" && row[header].includes(",")
              ? `"${row[header]}"`
              : row[header]
          )
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute("download", "exported_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToExcel = (customer, user, agent, transaction) => {
    console.log(customer, user, agent, transaction);

    try {
      // Sanitize data to prevent corruption
      if (customer) {
        const sanitizedData = filteredReports.map((row) => ({
          ID: row.id || "",
          Customer_ID: row.customer_id || "",
          Name: row.name || "",
          Contact: row.contact || "",
          Email: row.email || "",

          Policy: customerPolicy
            ? row.customer_policies?.find(
                (policy) => policy.policy_name === customerPolicy
              )
            : row.customer_policies[0]?.policy_name || "No policy",

          Sum_insured: customerPolicy
            ? row.customer_policies?.find(
                (policy) => policy.policy_name === customerPolicy
              ).coverage_amount
            : row.customer_policies[0]?.coverage_amount || 0,

          Policy_amount: customerPolicy
            ? row.customer_policies?.find(
                (policy) => policy.policy_name === customerPolicy
              ).total_amount
            : row.customer_policies[0]?.total_amount || 0,

          Total_paid_amount: customerPolicy
            ? row.payments?.find(
                (payment) => payment.policy_name === customerPolicy
              ).amount_paid
            : row.customer_policies[0]?.amount_paid || 0,

          Due_amount: customerPolicy
            ? row.payments?.find(
                (payment) => payment.policy_name === customerPolicy
              ).balance
            : row.customer_policies[0]?.balance || "",

          Created_date: row.created_date || "",
          Created_by: row.created_by?.name || "",
          Occupation: row.occupation || "",
          Status: row.status || "",
        }));

        // Create a new workbook
        const workbook = XLSX.utils.book_new();

        // Convert data to worksheet with proper type handling
        const worksheet = XLSX.utils.json_to_sheet(sanitizedData, {
          header: [
            "ID",
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
          ],
          skipHeader: false,
        });

        // Set safe column widths
        const columnWidths = [
          { wch: 10 }, // 1
          { wch: 20 }, // 2
          { wch: 15 }, // 3
          { wch: 12 }, // 4
          { wch: 18 }, // 5
          { wch: 15 }, // 6
          { wch: 12 }, // 7
          { wch: 13 }, // 8
          { wch: 17 }, // 9
          { wch: 12 }, // 10
          { wch: 12 }, // 11
          { wch: 10 }, // 12
          { wch: 10 }, // 13
          { wch: 10 }, // 14
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

      if (user) {
        console.log("user");
        console.log(role);

        const sanitizedData = filteredReports.map((row) => ({
          ID: row.id || "",
          Name: row.name || "",
          Contact: row.contact || "",
          Email: row.email || "",
          Created_date: row.created_date || "",
          Created_by: row.created_by?.name || "",
          Branch: row.branch_name || "",
          Role: role.find((roles) => roles.id == row.role).name || "",
          Status: row.status || "",
        }));

        // Create a new workbook
        const workbook = XLSX.utils.book_new();

        // Convert data to worksheet with proper type handling
        const worksheet = XLSX.utils.json_to_sheet(sanitizedData, {
          header: [
            "ID",
            "Name",
            "Contact",
            "Email",
            "Created_date",
            "Created_by",
            "Branch",
            "Role",
            "Status",
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
          { wch: 10 }, // 7
          { wch: 15 }, // 8
          { wch: 10 }, // 9
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

      if (agent) {
        const sanitizedData = filteredReports.map((row) => ({
          ID: row.id || "",
          Name: row.full_name || "",
          Contact: row.contact_number || "",
          Email: row.email || "",
          Created_date: new Date(row.join_date).toLocaleDateString() || "",
          Created_by: row.created_by?.name || "",
          Branch: row.branch_name || "",
          Role: "Agent",
          Gender: row.gender || "",
        }));

        // Create a new workbook
        const workbook = XLSX.utils.book_new();

        // Convert data to worksheet with proper type handling
        const worksheet = XLSX.utils.json_to_sheet(sanitizedData, {
          header: [
            "ID",
            "Name",
            "Contact",
            "Email",
            "Created_date",
            "Created_by",
            "Branch",
            "Role",
            "Gender",
          ],
          skipHeader: false,
        });

        // Set safe column widths
        const columnWidths = [
          { wch: 10 }, // 1
          { wch: 20 }, // 2
          { wch: 15 }, // 3
          { wch: 12 }, // 4
          { wch: 18 }, // 5
          { wch: 15 }, // 6
          { wch: 10 }, // 7
          { wch: 10 }, // 8
          { wch: 10 }, // 9
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

      if (transaction) {
        const sanitizedData = filteredReports.map((row) => ({
          ID: row.id || "",
          Customer:
            data.find((customer) => customer.id === row.customer).name || "",
          Amount_paid: row.amount_paid || "",
          Balance: row.balance || "",
          Total_paid_amount: row.total_paid_amount || "",
          Date: row.date || "",
          Payment_method: row.payment_method || "",
          Policy_name: row.policy_name || "",
          Transaction_id: row.transaction_id || "",
          Payment_status: row.payment_status || "",
        }));

        // Create a new workbook
        const workbook = XLSX.utils.book_new();

        // Convert data to worksheet with proper type handling
        const worksheet = XLSX.utils.json_to_sheet(sanitizedData, {
          header: [
            "ID",
            "Customer",
            "Amount_paid",
            "Balance",
            "Total_paid_amount",
            "Date",
            "Payment_method",
            "Policy_name",
            "Transaction_id",
            "Payment_status",
          ],
          skipHeader: false,
        });

        // Set safe column widths
        const columnWidths = [
          { wch: 10 }, // 1
          { wch: 20 }, // 2
          { wch: 15 }, // 3
          { wch: 12 }, // 4
          { wch: 18 }, // 5
          { wch: 15 }, // 6
          { wch: 15 }, // 7
          { wch: 15 }, // 8
          { wch: 15 }, // 9
          { wch: 15 }, // 10
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
    } catch (error) {
      console.error("Export failed:", error);
      alert("Failed to export data. Please try again.");
    }
  };

  //export
  const ExportButton = ({ customer, user, agent, transaction }) => (
    <Button
      onClick={() => exportToExcel(customer, user, agent, transaction)}
      className="flex items-center gap-2"
    >
      <DownloadIcon className="w-4 me-2 h-4" />
      Export to Excel
    </Button>
  );

  const calculations = (data) => {
    const customerPayments = data.map((customer) => {
      const totalPaid = customer.payments.reduce((sum, payment) => {
        return sum + payment.amount_paid;
      }, 0);
      return {
        name: customer.name,
        amount_paid: totalPaid,
        status: customer.status,
      };
    });

    return customerPayments;
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

    setPremium(Number(grandTotalPremium));
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setSearchQuery("");
    console.log(newValue);
    console.log(filterDate);

    if (newValue === 0) {
      console.log(true);

      if (filterDate.startDate === "") {
        setFilteredReports(data);
      } else {
        const datefilteredData = data.filter((data) => {
          console.log(data);
          console.log(filterDate);

          const createdDate = parseISO(data.created_date);
          console.log(createdDate);

          return isWithinInterval(createdDate, {
            start: new Date(filterDate.startDate),
            end: new Date(filterDate.endDate),
          });
        });

        setFilteredReports(datefilteredData);
      }
    } else if (newValue === 1) {
      console.log(newValue);
      if (filterDate.startDate === "") {
        setFilteredReports(user);
      } else {
        const datefilteredData = user.filter((data) => {
          console.log(data);
          console.log(filterDate);

          const createdDate = parseISO(data.created_date);
          console.log(createdDate);

          return isWithinInterval(createdDate, {
            start: new Date(filterDate.startDate),
            end: new Date(filterDate.endDate),
          });
        });

        setFilteredReports(datefilteredData);
      }
    } else if (newValue === 2) {
      console.log(newValue);
      if (filterDate.startDate === "") {
        setFilteredReports(agent);
      } else {
        const dateFiltered = user.filter(
          (user) => new Date(user.join_date).toLocaleDateString() === filterDate
        );

        setFilteredReports(dateFiltered);
      }
    } else if (newValue === 3) {
      console.log(newValue);
      if (filterDate.startDate === "") {
        setFilteredReports(transaction);
      } else {
        const datefilteredData = transaction.filter((data) => {
          console.log(data);
          console.log(filterDate);

          const createdDate = parseISO(data.date);
          console.log(createdDate);

          return isWithinInterval(createdDate, {
            start: new Date(filterDate.startDate),
            end: new Date(filterDate.endDate),
          });
        });

        setFilteredReports(datefilteredData);
      }
    }
  };

  const handleFilterChange = (e) => {
    const { value } = e.target;
    setSearchQuery(value);

    if (value.trim() === "") {
      setFilteredReports(data);
    } else {
      const filtered = data.filter((customer) =>
        customer.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredReports(filtered);
    }
  };

  const handlePolicyFilter = (event) => {
    const { value } = event.target;
    console.log(value);

    setCustomerPolicy(value);

    console.log(
      data[0].customer_policies.some((policy) => policy.policy_name === value)
    );

    if (value.trim() === "") {
      setFilteredReports(data);
    } else {
      const filteredCustomers = data.filter((customer) =>
        customer.customer_policies?.some(
          (policy) => policy.policy_name === value
        )
      );

      console.log("Filtered Customers:", filteredCustomers);
      setFilteredReports(filteredCustomers);
    }
  };

  const handleDateFilter = (event) => {
    const { name, value } = event.target;
    setFilterDate({
      ...filterDate,
      [name]: value,
    });
    console.log(value);
  };
  console.log(filterDate);

  const applyFilterChange = () => {
    const datefilteredData = data.filter((data) => {
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

    setFilteredReports(datefilteredData);
  };

  const handleUserFilter = (e) => {
    const { value } = e.target;
    setSearchQuery(value);

    if (value.trim() === "") {
      setFilteredReports(user);
    } else {
      const filtered = user.filter((user) =>
        user.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredReports(filtered);
    }
  };

  const handleAgentFilter = (e) => {
    const { value } = e.target;
    setSearchQuery(value);

    if (value.trim() === "") {
      setFilteredReports(agent);
    } else {
      const filtered = agent.filter((customer) =>
        customer.full_name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredReports(filtered);
    }
  };
  const handleTransactionFilter = (e) => {
    const { value } = e.target;
    setSearchQuery(value);

    if (value.trim() === "") {
      setFilteredReports(transaction);
    } else {
      const filtered = transaction.filter((customer) =>
        customer.full_name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredReports(filtered);
    }
  };

  // const handleFilterChange = () => {
  //   // Apply both date and type filters
  //   const filteredData = data.filter(item => {
  //     const matchesType = !filterType || item.type === filterType;
  //     const matchesDate = !filterDate || item.date === filterDate;
  //     return matchesType && matchesDate;
  //   });

  //   return filteredData;
  // };

  const handleSort = () => {
    const sorted = [...filteredReports].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.date > b.date ? 1 : -1;
      } else {
        return a.date < b.date ? 1 : -1;
      }
    });
    setFilteredReports(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  console.log(filterDate);
  console.log(searchQuery);
  console.log(customerPolicy);

  return (
    <div className="">
      <div className="d-flex justify-content-between px-2">
        <div className="mt-4">
          <h3>Reports</h3>
        </div>
      </div>

      {/* <div>
        <Grid2 container spacing={3} sx={{ my: 5 }}>
          {cardData.slice(0, 3).map((card, index) => (
            <Grid2 item xs={12} sm={6} md={4} key={index}>
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


        <Grid2 container spacing={3}>
          {cardData.slice(3).map((card, index) => (
            <Grid2 item xs={12} sm={6} md={4} key={index}>
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
      </div> */}

      <div>
        {/* First Row - 5 Cards */}
        <Grid2 container spacing={2} sx={{ my: 3 }}>
          {cardData.slice(0, 11).map((card, index) => (
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

        {/* Second Row - 5 Cards */}
        {/* <Grid2 container spacing={2} sx={{ my: 3 }}>
    {cardData.slice(5, 10).map((card, index) => (
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
  </Grid2> */}
      </div>

      <div className="d-flex justify-content-start mt-5 w-100">
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
            onClick={applyFilterChange}
            style={{
              width: "90px",
              height: "37px",
              backgroundColor: "#a3b18a",
              color: "white",
              border: "#a3b18a",
            }}
          >
            Apply
          </Button>
        </div>
      </div>

      <div className="">
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          style={{ marginTop: "10px" }}
        >
          <Tab label="Customers" />
          <Tab label="Users" />
          <Tab label="Agents" />
          <Tab label="Transaction history" />
        </Tabs>

        {tabValue === 0 && (
          <div>
            <div className="d-flex">
              <div className="mb-2 d-flex justify-content-end w-100 mt-2">
                <input
                  type="text"
                  className="form-control w-25 me-2"
                  placeholder="Search by policy"
                  value={customerPolicy}
                  onChange={handlePolicyFilter}
                />
                <input
                  type="text"
                  className="form-control w-25"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleFilterChange}
                />
              </div>
            </div>
            <DataTable
              data={filteredReports}
              columns={reportTablecolumn(customerPolicy)}
              pagination
              actions={<ExportButton customer={true} />}
            ></DataTable>
          </div>
        )}
        {tabValue === 1 && (
          <>
            <div className="d-flex">
              <div className="mb-2 d-flex justify-content-end w-100 mt-2">
                <input
                  type="text"
                  className="form-control w-25"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleUserFilter}
                />
              </div>
            </div>
            <DataTable
              data={filteredReports}
              columns={reportUserTablecolumn(branch, role)}
              pagination
              actions={<ExportButton user={true} />}
            ></DataTable>
          </>
        )}
        {tabValue === 2 && (
          <div>
            <div className="d-flex">
              <div className="mb-2 d-flex justify-content-end w-100 mt-2">
                <input
                  type="text"
                  className="form-control w-25"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleAgentFilter}
                />
              </div>
            </div>
            <DataTable
              data={filteredReports}
              columns={reportAgentTablecolumn(branch)}
              pagination
              actions={<ExportButton agent={true} />}
            ></DataTable>
          </div>
        )}
        {tabValue === 3 && (
          <div>
            <div className="d-flex">
              {/* <div className="mb-2 d-flex justify-content-end w-100 mt-2">
                <input
                  type="text"
                  className="form-control w-25"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleAgentFilter}
                />
              </div> */}
            </div>
            <DataTable
              data={filteredReports}
              columns={reportTransactionTablecolumn(data)}
              pagination
              actions={<ExportButton transaction={true} />}
            ></DataTable>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportsPage;
