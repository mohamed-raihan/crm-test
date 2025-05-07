import React, { useEffect, useState } from 'react';
import { taxTableColumn } from '../Common/TableDatas';
import DataTable from 'react-data-table-component';
import { Button, Modal } from 'reactstrap';
import NewTaxModal from './Newtax.jsx';
// import ViewTaxModal from './ViewTax.jsx';
import EditTaxModal from './Edittax.jsx';
import API_URL from '../../api/api_urls';
import allaxios from '../../api/axios';
import { ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap';
import { toast } from 'react-toastify';

const TaxTable = () => {
  const [modal, setModal] = useState(false);
  const [viewmodal, setviewmodal] = useState(false);
  const [editmodal, seteditModal] = useState(false);
  const [taxData, setTaxData] = useState([]);
  const [taxTypes, setTaxTypes] = useState([]);
  const [branches, setBranches] = useState([]);
  const [selectedTax, setSelectedTax] = useState(null);
  const [filteredData, setFilteredData] = useState([]); 
 const [searchTerm, setSearchTerm] = useState(''); 


  const toggle = () => setModal(!modal);
  const edittoggle = () => seteditModal(!editmodal);

  

  const handleEditTax = (tax) => {
    setSelectedTax(tax);
    seteditModal(true);
  };

  const fetchTaxes = async () => {
    try {
      const response = await allaxios.get(API_URL.TAX.GET_TAX, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
        },
      });
      console.log('Tax data:', response.data);
      setTaxData(response.data);
      setFilteredData(response.data)
    } catch (error) {
      console.error('Error fetching tax data:', error);
    }
  };

  
 

  const handleDeleteTax = async (id) => {
    try {
      const response = await allaxios.delete(API_URL.TAX.DELETE_TAX(id), {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
        },
      });
      console.log('Tax deleted successfully:', response.data);
      toast.success('Tax deleted successfully!');
      // fetchTaxes(); 
    } catch (error) {
      console.error('Error deleting tax:', error);
      toast.error('Failed to delete tax. Please try again.');
    }
  };

  useEffect(() => {
    // fetchTaxes();
   
  }, [modal]);

  
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = taxData.filter((tax) =>
      tax.name.toLowerCase().includes(value)
    );
    setFilteredData(filtered);
  };

  console.log('Taxdata',taxData);
  

  return (
    <div className="table-wrapper">
      <div className='d-flex flex-wrap justify-content-between p-3 border mb-1 shadow position-relative'>
        <div className='d-flex'>
          <h5 className='ms-2'>Taxes</h5>
        </div>
        <div className='d-flex'>
          <input
            className='form-control me-2 w-50'
            type="text"
            placeholder='Search tax details'
            onChange={handleSearch}
          />
          <Button onClick={toggle} className='btn bg-primary'>+ Add New Tax</Button>
        </div>
      </div>
      <DataTable
        className="border shadow"
        data={filteredData}
        columns={taxTableColumn( handleEditTax, handleDeleteTax)}
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
      ></DataTable>

      <Modal isOpen={modal} toggle={toggle} centered={true}>
        <NewTaxModal toggle={toggle} />
      </Modal>

      <Modal isOpen={viewmodal} toggle={() => setviewmodal(false)} centered={true}>
        <ModalHeader toggle={() => setviewmodal(false)}>Tax Details</ModalHeader>
        <ModalBody>
          {selectedTax ? (
            <div>
              <p><strong>Tax Name:</strong> {selectedTax.tax_name}</p>
              <p><strong>Tax Type:</strong> {selectedTax.tax_type}</p>
              <p><strong>Rate:</strong> {selectedTax.rate}%</p>
              <p><strong>Branch:</strong> {selectedTax.branch}</p>
            </div>
          ) : (
            <p>No tax data available</p>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => setviewmodal(false)}>Close</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={editmodal} toggle={() => seteditModal(false)} centered={true}>
        <EditTaxModal
          toggle={() => seteditModal(false)}
          taxData={selectedTax}
          onTaxUpdated={fetchTaxes}
        />
      </Modal>
    </div>
  );
};

export default TaxTable;
