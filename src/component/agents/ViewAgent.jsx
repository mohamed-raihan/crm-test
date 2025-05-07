import React, { useEffect, useState } from "react";
import { FaEdit, FaTimes } from "react-icons/fa";
// import "../../css/layout/branch/viewbranch.css";
import { Button, Col, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
import allaxios from "../../api/axios";
import API_URL from "../../api/api_urls";

const ViewAgent = ({ toggle , agentData }) => {


const [userrole, setuserrole] = useState([]);
const [userbranch, setuserbranch] = useState([]);


  const fetchrole = async()=> {
    const response = await allaxios.get(API_URL.USERROLE.GET_ROLE,{
     headers:{
     Authorization:`Bearer ${sessionStorage.getItem('authToken')}`
     }
})

        console.log('users role',response.data);
        setuserrole(response.data)
  }

   

  const fetchbranch = async()=>{
    const response = await allaxios.get(API_URL.BRANCH.GET_BRANCH,{
     headers:{
     Authorization:`Bearer ${sessionStorage.getItem('authToken')}`
     }
})

        console.log('users branch',response.data);
        setuserbranch(response.data)
  }

 
  const getBranchName = (branchId) => {
    const branch = userbranch.find((branch) => branch.id === branchId);
    return branch ? branch.name : "Unknown Branch";
  };

  const getRoleName = (roleId) => {
    const role = userrole.find((role) => role.id === roleId);
    return role ? role.name : "Unknown Role";
  };

    useEffect(()=>{
      fetchbranch();
      fetchrole();
    },[])
  


console.log('getbranchname',userrole);


  console.log('agentdata',agentData);
  
  return (
    <div className="viewbranch-overlay w-100">
      <ModalHeader toggle={toggle} className="branch-header d-flex btn-close-danger">
        <div className="d-flex align-items-center">
          <div
            className="user-initial"
            style={{
              height: "60px",
              width: "60px",
              borderRadius: "50%",
              background: "red",
              padding: "18px",
              marginRight: "20px",
            }}
          >
            SM
          </div>
          <div>
            <h4 className="mb-0">{agentData.full_name}</h4>
            <p style={{ fontSize: "15px" }} className="mb-0 text-muted">
            {getRoleName(agentData.role)}  • {getBranchName(agentData.branch)}
            </p>
          </div>
        </div>
        {/* <FaTimes className="icon-close" onClick={toggle} /> */}
      </ModalHeader>

      {/* Modal Body */}
      <ModalBody>
        <div className="branch-info-section d-flex">
          <Row>
            <Col md={4} className="info-column">
              <h6>Address</h6>
              <p>
                <b>{agentData.address}</b>
              </p>
            </Col>
            <Col md={7} className="d-flex flex-column">
              <div className="info-row d-flex flex-column flex-md-row justify-content-between w-100">
                <div className="info-column">
                  <h6>Contact Number</h6>
                  <p>
                    <b>{agentData.contact_number}</b>
                  </p>
                </div>
                <div className="info-column">
                  <h6>Email Address</h6>
                  <p>
                    <b>{agentData.email}</b>
                  </p>
                </div>
              </div>
              <div className="info-row d-flex flex-column flex-sm-row justify-content-between">
                <div className="info-column">
                  <h6>Gender</h6>
                  <p>
                    <b>{agentData.gender}</b>
                  </p>
                </div>
                <div className="info-column">
                  <h6>Join Date</h6>
                  <p>
                    <b>{agentData.join_date}</b>
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </ModalBody>

      {/* Modal Footer */}
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Close
        </Button>
      </ModalFooter>
    </div>
  );
};

export default ViewAgent;
