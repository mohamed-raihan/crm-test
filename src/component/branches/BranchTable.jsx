import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Branchcolumn } from "../Common/TableDatas";
import "../../css/layout/branch/branchtable.css";
import { Button, Modal } from "reactstrap";
import NewBranchModal from "./NewBranchModal";
import Viewbranchmodal from "./Viewbranch";
import Editbranchmodal from "./Editbranch";
import allaxios from "../../api/axios";
import API_URL from "../../api/api_urls";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const BranchTable = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [viewmodal, setviewmodal] = useState(false);
  const [editmodal, seteditmodal] = useState(false);
  const [data, setData] = useState([]);
  const [branchView, setBranchView] = useState();
  const [editbranch, setEditBranch] = useState();
  const [search,setSearch] = useState()

  const viewtoggle = (row) => {
    setBranchView(row);
    setviewmodal(!viewmodal);
  };

  const edittoggle = (row) => {
    console.log(row);
    
    setEditBranch(row);
    seteditmodal(!editmodal);
  };

  const toggle = () => setModal(!modal);

  const fetchBranch = async () => {
    try {
      const response = await allaxios.get(API_URL.BRANCH.GET_BRANCH, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      });
      console.log(response);
      setData(response.data);
    } catch (error) {
      console.error(error);
      alert(error.response.data.detail);
      navigate("/");
    }
  };

  const handleSearch = ()=>{

  }

  const handleDelete = async (row) => {
    console.log(row);

    try {
      const response = await allaxios.delete(
        API_URL.BRANCH.DELETE_BRANCH(row.id),
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
          },
        }
      );
      console.log(response);
      toast.success('Branch Deleted')
      fetchBranch();
    } catch (error) {
      console.error(error);
      toast.error('Error deleting')
    }
  };

  useEffect(() => {
    fetchBranch();
  }, [modal]);

  return (
    <div className="table-wrapper">
      <div className="d-flex flex-wrap justify-content-between p-3 border mb-2 shadow">
        <div className="d-flex">
          <h5 className="ms-2">Branches</h5>
        </div>
        <div className="d-flex">
          <input
            className=" searchbar form-control me-2 w-100 "
            type="text"
            placeholder="search"
            onChange={handleSearch}
          />
          <Button onClick={toggle} className="btn bg-primary w-50">
            + Add new
          </Button>
        </div>
      </div>
      <DataTable
        className="border shadow"
        data={data}
        columns={Branchcolumn(viewtoggle, edittoggle, handleDelete)}
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

      <Modal size="md" isOpen={modal} toggle={toggle} centered={true}>
        <NewBranchModal toggle={toggle} />
      </Modal>

      {/* <Modal isOpen={viewmodal} toggle={viewtoggle} centered={true} style={{width:"700px"}}>
        <Viewbranchmodal toggle={viewtoggle}/>
      </Modal> */}
      {viewmodal && (
        <div className="">
          <Viewbranchmodal view={branchView} toggle={viewtoggle} />
        </div>
      )}

      <Modal size="md" isOpen={editmodal} toggle={edittoggle} centered={true}>
        <NewBranchModal
          fetchBranch={fetchBranch}
          view={branchView}
          data={editbranch}
          editToggle={edittoggle}
        />
      </Modal>
    </div>
  );
};

export default BranchTable;
