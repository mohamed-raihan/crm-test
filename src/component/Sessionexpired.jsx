// import React from "react";
// import { useHistory } from "react-router-dom";

// const SessionExpiredModal = ({ onClose }) => {
//   const history = useHistory();

//   const handleOkClick = () => {
//     // Redirect to the login page
//     history.push("/");
//   };

//   return (
//     <div style={modalStyles.container}>
//       <div style={modalStyles.modal}>
//         <h3>Session Expired</h3>
//         <p>Your session has expired. Please log in again.</p>
//         <button onClick={handleOkClick}>OK</button>
//       </div>
//     </div>
//   );
// };

// const modalStyles = {
//   container: {
//     position: "fixed",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     zIndex: 1000,
//   },
//   modal: {
//     backgroundColor: "#fff",
//     padding: "20px",
//     borderRadius: "8px",
//     textAlign: "center",
//     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//   },
// };

// export default SessionExpiredModal;
