import React, { useEffect, useState } from "react";
import { Button, Modal } from "reactstrap";
import DataTable from "react-data-table-component";
import AgentCommissionForm from "./AgentCommissionForm";
import { toast } from "react-toastify";
import { managerAgentCommissioncolumn } from "../../../component/Common/TableDatas";
import allaxios from "../../../api/axios";
import API_URL from "../../../api/api_urls";

const ManagerAgentCommission = () => {
  const [data, setdata] = useState([]);
  const [editData, setEditData] = useState([]);
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [agent, setAgent] = useState([]);
  const [policy, setPolicy] = useState([]);

  const toggle = () => setModal(!modal);
  const edittoggle = (row) => {
    setEditModal(!editModal);
    setEditData(row);
  };

  const fetchCommission = async () => {
    try {
      const response = await allaxios.get(
        API_URL.AGENT_COMMISSION.GET_COMMISSION
      );
      console.log(response);
      setdata(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAgent = async () => {
    try {
      const response = await allaxios.get(API_URL.AGENTS.GET_AGENT);
      console.log(response);
      setAgent(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPolicy = async () => {
    try {
      const response = await allaxios.get(API_URL.POLICY_TYPE.GET_POLICY_TYPE);
      console.log(response);
      setPolicy(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handledelete = async (id) => {
    try {
      const response = await allaxios.delete(
        API_URL.AGENT_COMMISSION.DELETE_COMMISSION(id)
      );
      console.log("Deleted successfully:", response.data);
      toast.success("Deleted successfully!");
      fetchCommission();
    } catch (error) {
      console.error("Error deleting:", error);
      toast.error("Failed to delete");
    }
  };

  useEffect(() => {
    fetchCommission();
    fetchAgent();
    fetchPolicy();
  }, [modal]);

  return (
    <div className="table-wrapper">
      <div className="d-flex flex-wrap justify-content-between p-3 border mb-2 shadow position-relative">
        <h5 className="ms-2">Agent Commission</h5>
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
        columns={managerAgentCommissioncolumn(edittoggle, agent, policy, handledelete)}
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
      <Modal isOpen={modal} toggle={toggle} centered={true}>
        <AgentCommissionForm toggle={toggle} />
      </Modal>
      <Modal isOpen={editModal} toggle={edittoggle} centered={true}>
        <AgentCommissionForm
          editData={editData}
          fetchCommission={fetchCommission}
          editToggle={edittoggle}
        />
      </Modal>
    </div>
  );
};

export default ManagerAgentCommission;
