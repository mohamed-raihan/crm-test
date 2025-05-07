import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { companyTableColumn } from '../Common/TableDatas'
import { Button, Modal } from 'reactstrap'
import NewCompany from './NewCompany'
import allaxios from '../../api/axios'
import API_URL from '../../api/api_urls'
import { toast } from 'react-toastify'

const CompanyTable = () => {
    const [modal,setModal] = useState(false)
    const [editModal,setEditModal] = useState(false)
    const [data,setData] = useState()
    const [editData,setEditData] = useState()

    const toggle = ()=> {
      console.log('inside toggle');
      
      setModal(!modal)}
    const editToggle = (row) => {
      setEditData(row)
      setEditModal(!editModal)
    }

      const fetchCompany = async()=>{
        console.log('fetch');
        
        try{
          const response = await allaxios.get(API_URL.COMPANY.GET_COMPANY,{
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
            }
          })
          console.log(response);
          
          setData(response.data)
        }catch(error){
          console.error(error);        
          toast.error('Error fetching data')  
        }
      }
      const handleDelete = async(row) => {
        console.log(row);
        
        try{
          const response = await allaxios.delete(API_URL.COMPANY.DELETE_COMPANY(row.id))
          console.log(response);
          toast.success("Company deleted")
          fetchCompany()
        }catch(error){
          console.error(error);
          toast.error("Failed to delete")
        }
      }

      useEffect(()=>{
        fetchCompany()
      },[modal])

      

  return (
    <div className="table-wrapper">
        <div className='d-flex flex-wrap justify-content-between p-3 border my-1 shadow position-relative'> 
            <div className='d-flex'>
                <h5 className='ms-2'>Company</h5>
            </div>
            <div className='d-flex'>
              <input className='form-control me-2 w-100' type="text" placeholder='search'/>
              <Button  className='btn bg-primary w-50' onClick={toggle}>+ Add new</Button>
            </div>
        </div>
      <DataTable
        className="border shadow"
        data={data}
        columns={companyTableColumn(editToggle,handleDelete)}
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
        fixedHeader
        fixedHeaderScrollHeight="80vh"
        // selectableRows={true}
      ></DataTable>
      <Modal isOpen={modal} centered={true} toggle={toggle}>
        <NewCompany toggle={toggle}/>
      </Modal>
      <Modal isOpen={editModal} centered={true} toggle={editToggle}>
        <NewCompany editData={editData} editToggle={editToggle} fetchCompany={fetchCompany}/>
      </Modal>
      
    </div>
  )
}

export default CompanyTable