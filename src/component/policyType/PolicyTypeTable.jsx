import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Button, Modal } from "reactstrap";
import { policyTypeTablecolumn } from "../Common/TableDatas";
import NewPolicyType from "./NewPolicyType";
import allaxios from "../../api/axios";
import API_URL from "../../api/api_urls";

const PolicyTypeTable = () => {
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [data, setData] = useState();
  const [editData, setEditData] = useState();

  const fetchPolicyType = async () => {
    console.log("fetch");

    try {
      const response = await allaxios.get(API_URL.POLICY_TYPE.GET_POLICY_TYPE);
      console.log(response);

      setData(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Error fetching data");
    }
  };

  const toggle = () => setModal(!modal);
  const editToggle = (row) => {
    setEditData(row);
    setEditModal(!editModal);
  };

  const handleDelete = async (row) => {
    console.log(row);

    try {
      const response = await allaxios.delete(
        API_URL.POLICY_TYPE.DELETE_POLICY_TYPE(row.id)
      );
      console.log(response);
      fetchPolicyType();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPolicyType();
  }, [modal]);

  return (
    <div>
      <div className="table-wrapper">
        <div className="d-flex flex-wrap justify-content-between p-3 border mb-1 shadow">
          <h5 className="ms-2">Policy Master</h5>
          <div className="d-flex">
            <input
              className="form-control me-2 w-100"
              type="text"
              placeholder="search"
            />
            <Button onClick={toggle} className="btn bg-primary w-50">
              + Add new
            </Button>
          </div>
        </div>
        <DataTable
          className="border shadow"
          data={data}
          columns={policyTypeTablecolumn(editToggle, handleDelete)}
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
          // selectableRows={true}
        ></DataTable>

        <Modal isOpen={modal} centered={true} toggle={toggle}>
          <NewPolicyType toggle={toggle} />
        </Modal>
        <Modal isOpen={editModal} centered={true} toggle={editToggle}>
          <NewPolicyType
            editData={editData}
            editToggle={editToggle}
            fetchPolicyType={fetchPolicyType}
          />
        </Modal>
      </div>
    </div>
  );
};

export default PolicyTypeTable;
