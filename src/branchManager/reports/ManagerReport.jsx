import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
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
  MdLocalHospital,
} from "react-icons/md";
import {
  TrendingUp,
  Users,
  DollarSign,
  PercentSquare,
  DownloadIcon,
} from "lucide-react";
import { Button } from "reactstrap";
import { BarChart3, BetweenHorizonalEnd } from "lucide-react";
import allaxios from "../../api/axios";
import API_URL from "../../api/api_urls";
import {
  reportAgentTablecolumn,
  reportTablecolumn,
  reportTransactionTablecolumn,
  reportUserTablecolumn,
} from "../../component/Common/TableDatas";
import * as XLSX from "xlsx";
import { Link } from "react-router-dom";

const ManagerReport = () => {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [data, setData] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [premium, setPremium] = useState(0);
  const [paid, setPaid] = useState(0);
  const [agent, setAgent] = useState(0);
  const [user, setUser] = useState(0);
  const [branch, setBranch] = useState([]);
  const [role, setRole] = useState([]);
  const [policy, setPolicy] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [customerPolicy, setCustomerPolicy] = useState("");
  const [transaction, setTransaction] = useState([]);
  const [hospicash, setHospicash] = useState([]);

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
        <Link style={{ textDecoration: "none" }} to="/manager-hospicash">
          <MdLocalHospital className="fs-3" />,
        </Link>
      ),
      title: "Hospicash Customers",
      description: hospicash.length ? hospicash.length : 0,
      color: "blue",
    },
    {
      logo: <MdPeople className="fs-3" />,
      title: "Total Customer Count",
      description: data.length ? data.length : 0,
      color: "blue",
    },
    {
      logo: <MdAssignment className="fs-3" />,
      title: "Total Policy Count",
      description: policy ? policy : 0,
      color: "red",
    },
    {
      logo: <MdWork className="fs-3" />,
      title: "Total Staff Count",
      description: user.length ? user.length : 0,
      color: "yellow",
    },
    {
      logo: <MdSupervisorAccount className="fs-3" />,
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
    console.log(data);
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
    const userDataString = sessionStorage.getItem("userData");

    if (!userDataString) {
      console.log("No user data found in session storage.");
      return;
    }

    try {
      const userData = JSON.parse(userDataString);
      console.log("Logged-in User ID:", userData);

      const response = await allaxios(API_URL.CUSTOMER.GET_CUSTOMER);
      console.log(response);

      const branchCustomer = response.data.filter(
        (customer) => customer.branch_name === userData.user.branch_name
      );

      const hospicashData = branchCustomer.filter((data) =>
        data.customer_policies.some(
          (policy) => policy.policy_name?.toLowerCase() === "hospicash"
        )
      );

      console.log(branchCustomer);

      setHospicash(hospicashData);
      setData(branchCustomer);
      setFilteredReports(branchCustomer);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAgent = async () => {
    const userDataString = sessionStorage.getItem("userData");

    if (!userDataString) {
      console.log("No user data found in session storage.");
      return;
    }

    try {
      const userData = JSON.parse(userDataString);
      console.log("Logged-in User ID:", userData.login_id);

      const response = await allaxios(API_URL.AGENTS.GET_AGENT);
      console.log(response.data);

      // const branchAgent = response.data.filter(
      //   (agent) => agent.created_by === userData.login_id
      // );

      const branchAgent = response.data.filter(
        (agent) => agent.branch === userData.user.branch
      );

      console.log(branchAgent);

      setAgent(branchAgent);
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
    const userDataString = sessionStorage.getItem("userData");

    if (!userDataString) {
      console.log("No user data found in session storage.");
      return;
    }

    try {
      const userData = JSON.parse(userDataString);
      console.log("Logged-in User ID:", userData.login_id);

      const response = await allaxios(API_URL.USERS.GET_USERS);
      console.log(response);
      const branchStaff = response.data.users.filter(
        (staff) => staff.created_by.id === userData.login_id
      );

      console.log(branchStaff);

      setUser(branchStaff);
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

  const fetchTransaction = async () => {
    const userDataString = sessionStorage.getItem("userData");

    if (!userDataString) {
      console.log("No user data found in session storage.");
      return;
    }

    try {
      const userData = JSON.parse(userDataString);
      const response = await allaxios(API_URL.PAYMENT.GET_PAYMENT);
      console.log(response);

      const filteredData = response.data.filter(
        (data) => data.created_by === userData.login_id
      );

      setTransaction(filteredData);
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

  console.log(filterDate);
  console.log(filteredReports);

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

  //new Export

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

    if (newValue === 0) {
      console.log(true);

      setFilteredReports(data);
    } else if (newValue === 1) {
      console.log(newValue);
      setFilteredReports(user);
    } else if (newValue === 2) {
      console.log(newValue);
      console.log(agent);

      setFilteredReports(agent);
    } else if (newValue === 3) {
      console.log(newValue);
      setFilteredReports(transaction);
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

  console.log(searchQuery);

  const isPositive = true;

  return (
    <div>
      <div className="d-flex justify-content-between px-2">
        <div className="mt-4">
          <h3>Reports</h3>
        </div>
        <div className="d-flex justify-content-end w-50">
          <div className="me-3">
            <label htmlFor="filter-date">Date</label>
            <input
              type="date"
              id="filter-date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="d-flex">
            <Button
              className="mt-4 border-light"
              onClick={handleFilterChange}
              style={{
                width: "90px",
                height: "37px",
                backgroundColor: "#a3b18a",
                color: "white",
              }}
            >
              Apply
            </Button>
          </div>
        </div>
      </div>

      <div>
        {/* First Row */}
        {/* <Grid2 container spacing={3} sx={{ my: 5 }}>
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
        </Grid2> */}

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

        {/* Second Row */}
        {/* <Grid2 container spacing={3}>
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
        </Grid2> */}
      </div>

      <div className="">
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          style={{ marginTop: "32px" }}
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
              <div className="d-flex align-items-center ms-2">
                {/* <CSVLink filename="Customers" data={getCsvData}> */}
                <Button onClick={exportToCSV}>Export</Button>
                {/* </CSVLink> */}
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
              <div className="d-flex align-items-center ms-2">
                <Button onClick={exportToCSV}>Export</Button>
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
              <div className="d-flex align-items-center ms-2">
                <Button onClick={exportToCSV}>Export</Button>
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
              <div className="mb-2 d-flex justify-content-end w-100 mt-2">
                <input
                  type="text"
                  className="form-control w-25"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleAgentFilter}
                />
              </div>
              <div className="d-flex align-items-center ms-2">
                <Button onClick={exportToCSV}>Export</Button>
              </div>
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

export default ManagerReport;
