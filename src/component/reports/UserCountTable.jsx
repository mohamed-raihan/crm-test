import React, { useEffect, useState } from "react";
import { reportUserTablecolumn } from "../Common/TableDatas";
import DataTable from "react-data-table-component";
import { DownloadIcon } from "lucide-react";
import { Button } from "reactstrap";
import allaxios from "../../api/axios";
import API_URL from "../../api/api_urls";
import * as XLSX from "xlsx";
import { isWithinInterval, parseISO } from "date-fns";

const UserCountTable = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [branch, setBranch] = useState([]);
  const [role, setRole] = useState([]);
  const [user, setUser] = useState([]);
  const [filteredUser, setFilteredUser] = useState([]);
  const [filterDate, setFilterDate] = useState({
      startDate: "",
      endDate: "",
    });

  const fetchUser = async () => {
    try {
      const response = await allaxios(API_URL.USERS.GET_USERS);
      console.log(response);
      setUser(response.data.users);
      setFilteredUser(response.data.users);
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

  const fetchRole = async () => {
    try {
      const response = await allaxios(API_URL.USERROLE.GET_ROLE);
      console.log(response);
      setRole(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUserFilter = (e) => {
    const { value } = e.target;
    setSearchQuery(value);

    if (value.trim() === "") {
      setFilteredUser(user);
    } else {
      const filtered = user.filter((user) =>
        user.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredUser(filtered);
    }
  };

  useEffect(() => {
    fetchBranch();
    fetchRole();
    fetchUser();
  }, []);

  const handleDateFilter = (event) => {
    const { name, value } = event.target;
    setFilterDate({
      ...filterDate,
      [name]: value,
    });
    console.log(value);
  };

  const applyFilterChange = () => {
      if (filterDate.startDate === "") {
        setFilteredUser(user);
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
        console.log(datefilteredData);
  
        setFilteredUser(datefilteredData);
  
        setFilterDate({
          ...filterDate,
          startDate: "",
          endDate: "",
        });
      }
    };

  //export

  const exportToExcel = () => {
    console.log("user");
    console.log(role);

    const sanitizedData = filteredUser.map((row) => ({
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
  };

  const ExportButton = () => (
    <div className="d-flex">
      <div className="d-flex  me-3">
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
        <Button onClick={exportToExcel} className="flex items-center gap-2">
          <DownloadIcon className="w-4 me-2 h-4" />
          Export to Excel
        </Button>
      </div>
    </div>
  );

  return (
    <div className="pe-2">
      <div className="d-flex px-2">
        <div>
          <h4 className="mt-2">Users</h4>
        </div>
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
        data={filteredUser}
        columns={reportUserTablecolumn(branch, role)}
        pagination
        actions={<ExportButton user={true} />}
      ></DataTable>
    </div>
  );
};

export default UserCountTable;
