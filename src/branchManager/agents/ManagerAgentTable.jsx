import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Button, Modal } from "reactstrap";
import { managerAgentTablecolumn } from "../../component/Common/TableDatas";
import ManagerAgentForm from "./ManagerAgentForm";
import allaxios from "../../api/axios";
import API_URL from "../../api/api_urls";
import { toast } from "react-toastify";
import EditManagerAgent from "./EditManagerAgent";

const ManagerAgentTable = () => {
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [branch, setBranch] = useState([]);
  const [editModal,setEditModal] = useState(false)
  const [editData,setEditData] = useState([]);
  const [insentive, setInsentive] = useState([]);

  const toggle = () => setModal(!modal);

  // const fetchAgents = async () => {
  //   const userDataString = sessionStorage.getItem("userData");
  //   const response = await allaxios.get(API_URL.AGENTS.GET_AGENT, {
  //     headers: {
  //       Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
  //     },
  //   });

  //   console.log("agent data", response);
  //   setData(response.data);
  //   // setFilteredData(response.data);
  // };

  const fetchAgents = async () => {
    const userDataString = sessionStorage.getItem("userData");

    if (!userDataString) {
      console.log("No user data found in session storage.");
      return;
    }

    try {
      const userData = JSON.parse(userDataString);
      console.log("Logged-in User ID:", userData);

      const response = await allaxios.get(API_URL.AGENTS.GET_AGENT);
      console.log("API Response:", response);

      const branchAgent = response.data.filter(
        (agent) => agent.branch === userData.user.branch
      );

      console.log("Filtered Branch Staff:", branchAgent);
      setData(branchAgent);
    } catch (error) {
      console.error("Error occurred while fetching or processing data:", error);
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

  const fetchBranch = async () => {
    try {
      const response = await allaxios.get(API_URL.BRANCH.GET_BRANCH);
      console.log(response);
      setBranch(response.data);
    } catch (error) {
      console.error(error);
    }
  };


  const editToggle = (row)=>{
    setEditModal(!editModal)
    setEditData(row)
  }

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

  useEffect(() => {
    console.log('useEffect');
    fetchAgentsInsentive();
    fetchAgents();
    fetchBranch();
  }, [modal]);

  return (
    <div className="mx-3">
      <div className="d-flex flex-wrap justify-content-between p-3 border mb-2 shadow">
        <div className="d-flex">
          <h5 className="ms-2">Agents</h5>
        </div>
        <div className="d-flex">
          <input
            className="form-control me-2 w-100"
            type="text"
            placeholder="search"
            // onChange={handleSearch}
          />
          <Button onClick={toggle} className="btn bg-primary w-50">
            + Add new
          </Button>
        </div>
      </div>
      <DataTable
        className="border shadow"
        data={data}
        columns={managerAgentTablecolumn(branch,editToggle,handledelete,insentive)}
        customStyles={{
          table: {
            style: {
              width: "100%",
            },
          },
        }}
        striped={true}
        pagination
        // selectableRows={true}
      ></DataTable>
      <Modal isOpen={modal} toggle={toggle} centered={true}>
        <ManagerAgentForm toggle={toggle} />
      </Modal>
      <Modal isOpen={editModal} toggle={editToggle} centered={true}>
        <EditManagerAgent  toggle={editToggle} agentData={editData} onAgentUpdated={fetchAgents}/>
      </Modal>
    </div>
  );
};
export default ManagerAgentTable;
