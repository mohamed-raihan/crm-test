import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import "../../css/layout/branch/branchtable.css";
import { toast } from "react-toastify";
import allaxios from "../../api/axios";
import API_URL from "../../api/api_urls";
import { policiesTableColumn } from "../../component/Common/TableDatas";

const UserPolicyTable = () => {
  const [modal, setModal] = useState(false);
  const [viewmodal, setviewmodal] = useState(false);
  const [editmodal, seteditmodal] = useState(false);
  const [data, setData] = useState();
  const [editData, setEditData] = useState();
  const [company, setCompany] = useState([]);
  const [policyCategory, setPolicyCategory] = useState([]);
  const [policyType, setPolicyType] = useState([]);
  const viewtoggle = () => setviewmodal(!viewmodal);
  const edittoggle = (row) => {
    setEditData(row);
    seteditmodal(!editmodal);
  };

  // console.log("editmoda", editmodal);

  const fetchPolicies = async () => {
    console.log("fetch");

    try {
      const response = await allaxios.get(API_URL.POLICIES.GET_POLICIES);
      console.log(response);

      setData(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Error fetching data");
    }
  };

  const fetchCompany = async () => {
    try {
      const response = await allaxios.get(API_URL.COMPANY.GET_COMPANY);
      console.log(response.data);

      setCompany(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Error fetching data");
    }
  };

  const fetchPolicyCategory = async () => {
    try {
      const response = await allaxios.get(API_URL.POLICY_CATEGORY.GET_CATEGORY);
      console.log(response.data);

      setPolicyCategory(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Error fetching data");
    }
  };

  const fetchPolicyType = async () => {
    try {
      const response = await allaxios.get(API_URL.POLICY_TYPE.GET_POLICY_TYPE);
      console.log(response.data);

      setPolicyType(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Error fetching data");
    }
  };

  const handleDelete = async (row) => {
    console.log(row);

    try {
      const response = await allaxios.delete(
        API_URL.POLICIES.DELETE_POLICIES(row.id)
      );
      console.log(response);
      fetchPolicies();
      toast.success("Policy deleted");
    } catch (error) {
      console.error(error);
      toast.error("Error deleting");
    }
  };

  useEffect(() => {
    fetchPolicies();
    fetchCompany();
    fetchPolicyCategory();
    fetchPolicyType();
  }, [modal]);

  return (
    <div className="table-wrapper">
      <div className="d-flex flex-wrap justify-content-between p-3 border mb-2 shadow">
        <h5 className="ms-2">Policy</h5>
        <div className="d-flex">
          <input
            className="searchbar form-control me-2 w-100"
            type="text"
            placeholder="search"
          />
        </div>
      </div>
      <DataTable
        className="border shadow"
        data={data}
        columns={policiesTableColumn(
          viewtoggle,
          edittoggle,
          handleDelete,
          company,
          policyCategory,
          policyType
        )}
        customStyles={{
          table: {
            style: {
              width: "100%", // Remove the extra space
            },
          },
        }}
        striped
        center
        pagination
        fixedHeader
        fixedHeaderScrollHeight="80vh"
        highlightOnHover
      />
    </div>
  );
};

export default UserPolicyTable;
