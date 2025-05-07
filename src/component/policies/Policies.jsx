  // import React, { useState } from 'react'
  // import { policiesTableColumn } from '../Common/TableDatas';
  // import DataTable from 'react-data-table-component';
  // import { Button, Modal } from 'reactstrap';

  // const Policies = () => {

  //   const [modal, setModal] = useState(false);
    
  //     const toggle = () => setModal(!modal);

  //     const data = [
  //         {
  //           policy: "Hospicash",
  //           emi_amount: "875",
  //           tenure: "2 years",
  //         },
  //       ];

  //   return (
  //     <div className="table-wrapper">
  //         <div className='d-flex justify-content-between p-3 border my-3 shadow position-relative'> 
  //             <div className='d-flex'>
  //                 <h5 className='ms-2'>Policies</h5>
  //             </div>
  //             <input className='form-control mx-5 w-25' type="text" placeholder='search'/>
  //             <Button onClick={toggle} className='btn bg-primary'>+ Add new</Button>
  //         </div>
  //       <DataTable
  //         className="border shadow"
  //         data={data}
  //         columns={policiesTableColumn()}
  //         customStyles={{
  //           table: {
  //             style: {
  //               width: "100%",
  //             },
  //           },
  //         }}
  //         striped={true}
  //         center={true}
  //         pagination
  //         selectableRows={true}
  //       ></DataTable>
  //     </div>
  //   )
  // }

  // export default Policies