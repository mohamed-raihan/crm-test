import React, { useEffect, useState } from "react";
import { policiesTableColumn, policyCategoryTable } from "../Common/TableDatas";
import DataTable from "react-data-table-component";
import { Button, Modal } from "reactstrap";
import NewCategory from "./NewCategory";
import allaxios from "../../api/axios";
import API_URL from "../../api/api_urls";
import { toast } from "react-toastify";

const CategoryTable = () => {
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [data, setData] = useState();
  const [editData, setEditData] = useState();

  const toggle = () => setModal(!modal);

  const fetchCategory = async () => {
    console.log("fetch");

    try {
      const response = await allaxios.get(API_URL.POLICY_CATEGORY.GET_CATEGORY);
      console.log(response);

      setData(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Error fetching data");
    }
  };

  const editCategory = (row) => {
    console.log(row);

    setEditModal(!editModal);
    setEditData(row);
  };

  const handleDelete = async(row) => {
    console.log(row);
    
    try{
      const response = await allaxios.delete(API_URL.POLICY_CATEGORY.DELETE_CATEGORY(row.id))
      console.log(response);
      toast.success("Policy category deleted")
      fetchCategory()
    }catch(error){
      console.error(error);
      toast.error("Failed to delete")
    }
  }

  useEffect(() => {
    fetchCategory();
  }, [modal]);

  return (
    <>
      <div className="table-wrapper">
        <div className="d-flex flex-wrap justify-content-between p-3 border mb-2 shadow">
          <h5 className="ms-2">Policy Category</h5>
          <div className="d-flex">
            <input
              className="form-control me-2 w-100"
              type="text"
              placeholder="search"
            />
            <Button className="btn bg-primary w-50" onClick={toggle}>
              + Add new
            </Button>
          </div>
        </div>
        <DataTable
          className="border shadow"
          data={data}
          columns={policyCategoryTable(editCategory, handleDelete)}
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
          <NewCategory toggle={toggle} editToggle={editCategory} />
        </Modal>
        <Modal isOpen={editModal} centered={true} toggle={editCategory}>
          <NewCategory
            editData={editData}
            editToggle={editCategory}
            fetchCategory={fetchCategory}
          />
        </Modal>
      </div>
    </>
  );
};

export default CategoryTable;
