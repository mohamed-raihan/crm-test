import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Button, Modal } from "reactstrap";
import { AgentTableColumn } from "../Common/TableDatas";
import NewAgentModal from "./NewAgentModal";
import ViewAgent from "./ViewAgent";
import EditAgentModal from "./EditAgentModal";
import allaxios from "../../api/axios";
import API_URL from "../../api/api_urls";
import { toast } from "react-toastify";

const AgentTable = () => {
  const [modal, setModal] = useState(false);
  const [viewmodal, setviewmodal] = useState(false);
  const [editAgent, setEditAgent] = useState(false);
  const [selectedagent, setSelectedagent] = useState(null);
  const [Agentdata, setAgentdata] = useState([]);
  const [userrole, setuserrole] = useState([]);
  const [userbranch, setuserbranch] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [insentive, setInsentive] = useState([]);

  const toggle = () => setModal(!modal);
  const edittoggle = () => setEditAgent(!editAgent);

  const fetchAgents = async () => {
    try {
      const response = await allaxios.get(API_URL.AGENTS.GET_AGENT, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      });

      console.log("agent data", response.data);
      setAgentdata(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAgentsInsentive = async () => {
    try{
      const response = await allaxios.get(API_URL.AGENTS_INSENTIVE.GET_INSENTIVE);

    console.log("agent insentive", response.data);
    setInsentive(response.data);
    }catch(error){
      console.error(error);
      
    }
  };

  console.log(insentive);
  

  const fetchrole = async () => {
    const response = await allaxios.get(API_URL.USERROLE.GET_ROLE, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
      },
    });

    console.log("users role", response.data);
    setuserrole(response.data);
  };

  const fetchbranch = async () => {
    try{
      const response = await allaxios.get(API_URL.BRANCH.GET_BRANCH, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      });
  
      console.log("users branch", response.data);
      setuserbranch(response.data);
    }catch(error){
      console.error(error);
      
    }
  };

  // console.log("userbranch", setuserbranch);

  useEffect(() => {
    fetchAgents();
    fetchbranch();
    fetchrole();
    fetchAgentsInsentive();
  }, [modal]);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = Agentdata.filter((agent) =>
      agent.full_name.toLowerCase().includes(value)
    );
    setFilteredData(filtered);
  };

  console.log("dataa", selectedagent);
  console.log("filtered", filteredData);
  console.log("seaarch", searchTerm);

  const handleView = (row) => {
    console.log(row);
    setSelectedagent(row);
    setviewmodal(!viewmodal);
  };
  const handleEdit = (user) => {
    setSelectedagent(user);
    setEditAgent(true);
    console.log("inside the edit", user);
  };

  const handledelete = async (id) => {
    try {
      const response = await allaxios.delete(API_URL.AGENTS.DELETE_AGENT(id), {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      });
      console.log("Agent deleted successfully:", response.data);
      toast.success("Agent deleted successfully!");
      fetchAgents(); // Refresh the user list after deletion
    } catch (error) {
      console.error("Error deleting Agent:", error);
      toast.error("Failed to delete Agent. Please try again.");
    }
  };

  return (
    <div className="table-wrapper">
      <div className="d-flex flex-wrap justify-content-between p-3 border mb-2 shadow position-relative">
        <h5 className="ms-2">Agents</h5>
        <div className="d-flex">
          <input
            className="form-control me-2 w-100"
            type="text"
            onChange={handleSearch}
            placeholder="search"
          />
          <Button onClick={toggle} className="btn bg-primary w-50">
            + Add new
          </Button>
        </div>
      </div>
      <DataTable
        className="border shadow"
        data={filteredData}
        columns={AgentTableColumn(
          handleView,
          handleEdit,
          handledelete,
          userbranch,
          userrole,
          insentive
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
        // selectableRows={true}
      ></DataTable>
      <Modal isOpen={modal} toggle={toggle} centered={true}>
        <NewAgentModal toggle={toggle} />
      </Modal>
      {/* {viewmodal && <div>
        <ViewAgent toggle={handleView}/>
      </div>} */}
      <Modal size="lg" isOpen={viewmodal} toggle={handleView} centered={true}>
        <ViewAgent agentData={selectedagent} toggle={handleView} />
      </Modal>
      <Modal isOpen={editAgent} toggle={edittoggle} centered={true}>
        <EditAgentModal
          agentData={selectedagent}
          onAgentUpdated={fetchAgents}
          toggle={edittoggle}
          editAgent={editAgent}
        />
      </Modal>
    </div>
  );
};

export default AgentTable;
