import React, { useEffect, useState } from "react";
import {
  CustomerreportcountColumn,
  CustomerTableColumn,
} from "../../component/Common/TableDatas.jsx";
import DataTable from "react-data-table-component";
import { Button, Input, Modal } from "reactstrap";
// import NewUserModal from "./Newcustomer.jsx";
// import ViewUserModal from "./Viewcustomer.jsx";
// import Editcustomermodal from "./Editcustomer.jsx";
import API_URL from "../../api/api_urls";
import allaxios from "../../api/axios";
import { ModalBody, ModalFooter, ModalHeader } from "react-bootstrap";
import { toast } from "react-toastify";
import { use } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { DownloadIcon } from "lucide-react";
import { DateRangePicker } from "react-date-range";
import { addDays, isWithinInterval, parseISO } from "date-fns";
// import PolicyAssignmentModal from "./Policyassign.jsx";

const Customertable = () => {
  const [modal, setModal] = useState(false);
  const [viewmodal, setviewmodal] = useState(false);
  const [iscustomer, setiscustomer] = useState(false);
  const [showEditAction, setShowEditAction] = useState(true); // Default: Edit button visible

  const [editmodal, seteditModal] = useState(false);
  const [customerdata, setcustomerdata] = useState([]);
  const [userrole, setuserrole] = useState([]);
  const [userbranch, setuserbranch] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [usernominee, setusernominee] = useState([]);
  const [policyModal, setPolicyModal] = useState(false);
  const [suggestions, setSuggestions] = useState([]); // Holds matching suggestions
  const [customerPolicy, setCustomerPolicy] = useState("");
  const [showCalender, setShowCalender] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ]);

  const [filterDate, setFilterDate] = useState({
    startDate: "",
    endDate: "",
  });

  console.log(date);

  const toggle = () => setModal(!modal);

  const edittoggle = () => seteditModal(!editmodal);

  // const viewtoggle =() =>setviewmodal(!viewmodal)
  const navigate = useNavigate();
  const handleViewUser = (user) => {
    setSelectedUser(user);
    setviewmodal(true);
  };

  const togglePolicyModal = (customer) => {
    setSelectedUser(customer);
    setPolicyModal(!policyModal);
    console.log(customer);
  };

  console.log(selectedUser);

  const handleEditUser = (user) => {
    setSelectedUser(user);
    seteditModal(true);
    console.log(editmodal);
  };

  const handleprofilenavigate = (user) => {
    setSelectedUser(user);
    console.log("profile", user);

    navigate("/customerprofile", { state: { customerData: user } });
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    if (value.trim() === "") {
      setSuggestions([]); // Clear suggestions when input is empty
      setFilteredData(customerdata);
      return;
    }

    // Filter suggestions
    const matchedSuggestions = customerdata
      .filter(
        (user) =>
          user.name.toLowerCase().includes(value) ||
          (user.role && user.role.toLowerCase().includes(value))
      )
      .map((user) => ({
        name: user.name,
        role: user.role || "", // Ensure role is not undefined
      }));

    setSuggestions(matchedSuggestions);

    // Filter table data
    const filtered = customerdata.filter(
      (user) =>
        user.name.toLowerCase().includes(value) ||
        (user.role && user.role.toLowerCase().includes(value))
    );

    setFilteredData(filtered);
  };

  const handleSuggestionClick = (text) => {
    setSearchTerm(text);
    setSuggestions([]);

    // Filter based on clicked suggestion
    const filtered = customerdata.filter(
      (user) =>
        user.name.toLowerCase() === text.toLowerCase() ||
        (user.role && user.role.toLowerCase() === text.toLowerCase())
    );

    setFilteredData(filtered);
  };

  console.log(customerdata);

  const fetchCustomers = async () => {
    const userDataString = sessionStorage.getItem("userData");

    if (!userDataString) {
      console.log("No user data found in session storage.");
      return;
    }

    try {
      const userData = JSON.parse(userDataString);
      console.log("Logged-in User ID:", userData.login_id);

      const response = await allaxios.get(API_URL.CUSTOMER.GET_CUSTOMER, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      });

      console.log("API Response:", response.data);

      // const filteredCustomers = response.data.filter(
      //   (customer) => customer.created_by.id === userData.login_id
      // );

      // console.log("Filtered Customers:", filteredCustomers);
      setcustomerdata(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error("Error occurred while fetching or processing data:", error);
    }
  };

  const fetchrole = async () => {
    const response = await allaxios.get(API_URL.USERROLE.GET_ROLE, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
      },
    });

    console.log("users role", response.data);
    setuserrole(response.data);
  };

  const fetchnominees = async () => {
    const response = await allaxios.get(API_URL.BRANCH.GET_BRANCH, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
      },
    });

    console.log("users branch", response.data);
    setusernominee(response.data);
  };
  const fetchbranch = async () => {
    const response = await allaxios.get(API_URL.BRANCH.GET_BRANCH, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
      },
    });

    console.log("users branch", response.data);
    setuserbranch(response.data);
  };
  console.log("View Modal State:", viewmodal);
  console.log("Selected User:", selectedUser);

  useEffect(() => {
    fetchCustomers();
    fetchbranch();
    fetchrole();
    fetchnominees();
  }, [modal]);

  console.log("customerdata", customerdata);

  const handlePolicyFilter = (event) => {
    const { value } = event.target;
    console.log(value);

    setCustomerPolicy(value);

    console.log(
      customerdata[0].customer_policies.some(
        (policy) => policy.policy_name === value
      )
    );

    if (value.trim() === "") {
      setFilteredData(customerdata);
    } else {
      const filteredCustomers = customerdata.filter((customer) =>
        customer.customer_policies?.some(
          (policy) => policy.policy_name.toLowerCase() === value.toLowerCase()
        )
      );

      console.log("Filtered Customers:", filteredCustomers);
      setFilteredData(filteredCustomers);
    }
  };

  const exportToExcel = () => {
    const sanitizedData = filteredData.map((row) => ({
      ID: row.id || "",
      "Customer ID": row.customer_id || "",
      Name: row.name || "",
      Contact: row.contact || "",
      Email: row.email || "",
      "Aadhar Card Number": row.aadhar_card_number || "",
      "Pan Card Number  ": row.pan_card_number || "",
      Policy: customerPolicy
        ? row.customer_policies?.find(
            (policy) => policy.policy_name === customerPolicy
          )?.policy_name || "No policy"
        : row.customer_policies[0]?.policy_name || "No policy",

      Company: customerPolicy
        ? row.customer_policies?.find(
            (policy) => policy.policy_name === customerPolicy
          )?.company || "No policy"
        : row.customer_policies[0]?.company || "No policy",

      "Policy Category": customerPolicy
        ? row.customer_policies?.find(
            (policy) => policy.policy_name === customerPolicy
          )?.policy_category || "No policy"
        : row.customer_policies[0]?.policy_category || "No policy",

      "Policy Master": customerPolicy
        ? row.customer_policies?.find(
            (policy) => policy.policy_name === customerPolicy
          )?.policy_type || "No policy"
        : row.customer_policies[0]?.policy_type || "No policy",

      "Sum Insured": customerPolicy
        ? row.customer_policies?.find(
            (policy) => policy.policy_name === customerPolicy
          )?.coverage_amount || 0
        : row.customer_policies[0]?.coverage_amount || 0,

      "Policy Amount": customerPolicy
        ? row.customer_policies?.find(
            (policy) => policy.policy_name === customerPolicy
          )?.total_amount || 0
        : row.customer_policies[0]?.total_amount || 0,

      "Total Paid Amount": customerPolicy
        ? row.payments?.find(
            (payment) => payment.policy_name === customerPolicy
          )?.amount_paid || 0
        : row.customer_policies[0]?.amount_paid || 0,

      "Due Amount": customerPolicy
        ? row.payments?.find(
            (payment) => payment.policy_name === customerPolicy
          )?.balance || 0
        : row.customer_policies[0]?.balance || "",

      "Nominee Name": row.nominees[0]?.name,
      "Nominee Contact": row.nominees[0]?.phone_number,
      "Nominee Email": row.nominees[0]?.email,
      Relationship: row.nominees[0]?.relationship,
      "Nominee Address": row.nominees[0]?.address,

      "Created Date": row.created_date || "",
      "Created By": row.created_by?.name || "",
      Occupation: row.occupation || "",
      Status: row.status || "",
    }));

    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Convert data to worksheet
    const worksheet = XLSX.utils.json_to_sheet(sanitizedData);

    // Apply bold formatting to the first row (headers)
    const range = XLSX.utils.decode_range(worksheet["!ref"]);
    for (let col = range.s.c; col <= range.e.c; col++) {
      const cell_address = XLSX.utils.encode_cell({ r: 0, c: col });
      if (!worksheet[cell_address]) continue;
      worksheet[cell_address].s = {
        font: { bold: true },
        alignment: { horizontal: "center" },
      };
    }

    // Set safe column widths
    worksheet["!cols"] = new Array(Object.keys(sanitizedData[0]).length).fill({
      wch: 20,
    });

    // Add the worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

    // Generate a safe filename
    const fileName = `users_data_${new Date().getTime()}.xlsx`;

    // Write the file
    XLSX.writeFile(workbook, fileName, {
      bookType: "xlsx",
      type: "binary",
      cellStyles: true,
    });
  };

  const handleSelect = (ranges) => {
    const { startDate, endDate } = ranges.selection;

    setDate((prevState) => {
      const currentSelection = prevState[0];

      if (
        !currentSelection.startDate ||
        (currentSelection.startDate && currentSelection.endDate)
      ) {
        // First click sets the start date, resets the end date
        return [{ startDate, endDate: null, key: "selection" }];
      } else {
        // Second click sets the end date
        return [{ ...currentSelection, endDate }];
      }
    });
  };

  //date filter
  const dateFilter = () => {
    const datefilteredData = customerdata.filter((data) => {
      console.log(data);
      console.log(date[0].startDate);

      const createdDate = parseISO(data.created_date);
      console.log(createdDate);

      return isWithinInterval(createdDate, {
        start: date[0].startDate,
        end: date[0]?.endDate,
      });
    });

    console.log(datefilteredData);
    setFilteredData(datefilteredData);
  };

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
      setFilteredData(customerdata);
    } else {
      const datefilteredData = customerdata.filter((data) => {
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

      setFilteredData(datefilteredData);

      setFilterDate({
        ...filterDate,
        startDate: "",
        endDate: "",
      });
    }
  };

  //export
  const ExportButton = () => (
    <div className="d-flex my-2">
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

  const handledelete = async (id) => {
    try {
      const response = await allaxios.delete(
        API_URL.CUSTOMER.DELETE_CUSTOMER(id),
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
          },
        }
      );
      console.log("User deleted successfully:", response.data);
      toast.success("User deleted successfully!");
      fetchCustomers(); // Refresh the user list after deletion
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user. Please try again.");
    }
  };

  console.log(policyModal);

  return (
    <div className="table-wrapper">
      {/* <div className="d-flex justify-content-between p-3 border mb-2 shadow">
        <h5 className="ms-2">Customers</h5>
        <input
          className="ms-5 w-50 "
          type="text"
          placeholder="search"
          onChange={handleSearch}
          style={{ position: "relative" }}
        />
          <Button onClick={toggle} className="btn bg-primary w-50">
                    + Add new
       </Button>
      </div> */}
      <div className="d-flex flex-wrap justify-content-between p-3 border mb-2 shadow position-relative">
        <h5 className="ms-2">Customer</h5>
        <div className="d-flex">
          <input
            type="text"
            className="form-control  me-2"
            placeholder="Search by policy"
            value={customerPolicy}
            onChange={handlePolicyFilter}
          />
          <input
            className="form-control me-2"
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search..."
          />

          {/* Suggestions Dropdown */}
          {suggestions.length > 0 && (
            <ul
              className="list-group position-absolute  shadow"
              style={{ width: "210px", marginTop: "30px" }}
            >
              {suggestions.map((item, index) => (
                <li
                  key={index}
                  className="list-group-item list-group-item-action"
                  onClick={() => handleSuggestionClick(item.name)}
                  style={{
                    cursor: "pointer",
                    marginTop: "10px",
                    zIndex: "1",
                    width: "215px",
                  }}
                >
                  {item.name} {item.role ? `(${item.role})` : ""}{" "}
                  {/* Fix here */}
                </li>
              ))}
            </ul>
          )}
          {/* <Button onClick={toggle} className="btn bg-primary w-50">
            + Add new
          </Button> */}
        </div>
      </div>

      <DataTable
        className="border shadow"
        data={filteredData}
        columns={CustomerreportcountColumn(
          handleViewUser,
          handleEditUser,
          handledelete,
          handleprofilenavigate,
          togglePolicyModal,
          userrole,
          userbranch,
          showEditAction
        )}
        customStyles={{
          table: {
            style: {
              width: "100%",
            },
          },
        }}
        striped={true}
        center={true}
        pagination
        actions={<ExportButton />}
        // selectableRows={true}
      ></DataTable>
      {/* <Modal isOpen={modal} toggle={toggle} centered={true}>
        <NewUserModal toggle={toggle} />
      </Modal> */}
      {/* <Modal isOpen={viewmodal} toggle={viewtoggle} centered={true}> */}
      {/* { viewmodal && ( */}

      {/* <Modal isOpen={viewmodal} toggle={() => setviewmodal(false)} centered={true}>

      <ViewUserModal  toggle={() => setviewmodal(false)} 
        userData={selectedUser}  />

      </Modal> */}

      {/* <Modal isOpen={policyModal} toggle={() => setPolicyModal(false)} centered={true}>
  <PolicyAssignmentModal 
    toggle={() => setPolicyModal(false)} 
    customer={selectedUser} 
    isOpen={policyModal}
  />
</Modal> */}

      {/* <Modal isOpen={viewmodal} toggle={() => setviewmodal(false)} centered={true}>
    <ViewUserModal toggle={() => setviewmodal(false)} userData={selectedUser} />
    </Modal> */}

      {/* <Modal isOpen={viewmodal} toggle={() => setviewmodal(false)} centered={true}>
        <ModalHeader toggle={() => setviewmodal(false)}>User Details</ModalHeader>
        <ModalBody>
          {selectedUser ? (
            <div>
              <p><strong>Name:</strong> {selectedUser.name}</p>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Contact:</strong> {selectedUser.contact}</p>
              <p><strong>job type:</strong> {selectedUser.job_type}</p>
              <p><strong>Contact:</strong> {selectedUser.contact}</p>

            </div>
          ) : (
            <p>No user data available</p>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => setviewmodal(false)}>Close</Button>
        </ModalFooter>
      </Modal> */}

      {/* <Modal isOpen={editmodal} toggle={() => seteditModal(false)} centered={true} >
        <Editusermodal toggle={() => seteditModal(false)} userData={selectedUser} onUserUpdated={fetchUsers}/>
      </Modal> */}

      {/* <Modal
        isOpen={editmodal}
        toggle={() => seteditModal(false)}
        centered={true}
      >
        <Editcustomermodal
          toggle={() => seteditModal(false)}
          userData={selectedUser}
          onUserUpdated={fetchCustomers}
        />
      </Modal> */}
    </div>
  );
};

export default Customertable;
