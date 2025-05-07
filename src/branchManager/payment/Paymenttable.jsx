import React, { useEffect, useState } from "react";
import { BranchPaymentTableColumn } from "../../component/Common/TableDatas.jsx";
import DataTable from "react-data-table-component";
import { Button, Modal } from "reactstrap";
import NewPaymentModal from "./Newpayment.jsx"; // Adjusted import for payment modal
import EditPaymentModal from "./Editpaymentmodal.jsx";
import API_URL from "../../api/api_urls";
import allaxios from "../../api/axios";
import { toast } from "react-toastify";

const PaymentTable = () => {
  const [modal, setModal] = useState(false);
  const [editmodal, seteditModal] = useState(false);
  const [paymentData, setPaymentData] = useState([]); // Renamed to paymentData
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [Customerdata, setCustomerdata] = useState([]);
  const [Policydata, setPolicydata] = useState([]);

  const toggle = () => setModal(!modal);
  const edittoggle = () => seteditModal(!editmodal);

  const handleEditPayment = (payment) => {
    setSelectedPayment(payment);
    seteditModal(true);
  };

  // const fetchPayments = async () => {
  //   try {
  //     const response = await allaxios.get(API_URL.PAYMENT.GET_PAYMENT, {
  //       headers: {
  //         Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
  //       },
  //     });
  //     console.log('Payment data:', response.data);
  //     setPaymentData(response.data);
  //     // setFilteredData(response.data);
  //   } catch (error) {
  //     console.error('Error fetching payment data:', error);
  //   }
  // };

  const fetchPayments = async () => {
    const userDataString = sessionStorage.getItem("userData");

    if (!userDataString) {
      console.log("No user data found in session storage.");
      return;
    }

    try {
      const userData = JSON.parse(userDataString);
      console.log("Logged-in User ID:", userData.login_id);

      const response = await allaxios.get(API_URL.PAYMENT.GET_PAYMENT, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      });

      console.log("API Response:", response.data);

      const filteredPayments = response.data.filter(
        (payment) => payment.created_by === userData.login_id
      );

      console.log("Filtered Payments:", filteredPayments);
      setPaymentData(filteredPayments);
      
      console.log(searchTerm);
      
      if(searchTerm === "" ){
        setFilteredData(filteredPayments);
      }else{
        const filtered = paymentData.filter((payment) => payment.customer_name.toLowerCase() === searchTerm)
        setFilteredData(filtered)
      }
    } catch (error) {
      console.error(
        "Error occurred while fetching or processing payment data:",
        error
      );
    }
  };
  console.log("payementdata", paymentData);

  const fetchcustomer = async () => {
    try {
      const response = await allaxios.get(API_URL.CUSTOMER.GET_CUSTOMER, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      });
      setCustomerdata(response.data);

      console.log("customer data:", response.data);
    } catch (error) {
      console.error("Error fetching payment data:", error);
    }
  };

  const fetchpolicy = async () => {
    try {
      const response = await allaxios.get(API_URL.POLICIES.GET_POLICIES, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      });
      setPolicydata(response.data);

      console.log("policy data:", response.data);
    } catch (error) {
      console.error("Error fetching payment data:", error);
    }
  };

  const customer = Customerdata.map((i) => {
    return i;
  });

  const handleDeletePayment = async (id) => {
    try {
      const response = await allaxios.delete(
        API_URL.PAYMENT.DELETE_PAYMENT(id),
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
          },
        }
      );
      console.log("Payment deleted successfully:", response.data);
      toast.success("Payment deleted successfully!");
      fetchPayments();
    } catch (error) {
      console.error("Error deleting payment:", error);
      toast.error("Failed to delete payment. Please try again.");
    }
  };

  useEffect(() => {
    fetchPayments();
    fetchcustomer();
    fetchpolicy();
  }, [modal]);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    console.log(value);

    const filtered = paymentData.filter(
      (payment) =>
        payment.policy_name.toLowerCase().includes(value) ||
        payment.customer_name.toLowerCase().includes(value)
    );
    console.log(filtered);
    
    setFilteredData(filtered);
  };

  return (
    <div className="table-wrapper">
      <div className="d-flex flex-wrap justify-content-between p-3 border mb-1 shadow position-relative">
        <div className="d-flex">
          <h5 className="ms-2">Payments</h5>
        </div>
        <div className="d-flex">
          <input
            className="form-control me-2 w-50"
            type="text"
            placeholder="Search "
            onChange={handleSearch}
          />
          <Button onClick={toggle} className="btn bg-primary">
            + Add New Payment
          </Button>
        </div>
      </div>
      <DataTable
        className="border shadow"
        data={filteredData}
        columns={BranchPaymentTableColumn(
          handleEditPayment,
          handleDeletePayment,
          Customerdata,
          Policydata
        )} // Adjusted to handle payment data
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
      />

      <Modal isOpen={modal} toggle={toggle} centered={true} size="lg">
        <NewPaymentModal toggle={toggle} /> {/* Payment Modal */}
      </Modal>

      <Modal isOpen={editmodal} toggle={edittoggle} centered={true} size="lg">
        <EditPaymentModal
          toggle={edittoggle}
          paymentData={selectedPayment}
          onPaymentUpdated={fetchPayments}
        />
      </Modal>
    </div>
  );
};

export default PaymentTable;
