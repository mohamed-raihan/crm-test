// import axios from "axios";

// const allaxios = axios.create({
//   baseURL: "http://localhost:8000", 
//   headers: {
//     "Content-Type": "application/json", 
//   },
// });

// export default allaxios;


import axios from "axios";
import { toast } from "react-toastify";
import React from "react";


import { useNavigate } from "react-router-dom";

const allaxios = axios.create({
  baseURL: "https://crm.kannattu.pixelsoft.online",
  headers: {
    "Content-Type": "application/json",
  },
  // timeout: 10000, // Timeout in milliseconds
});

// https://crm.kannattu.pixelsoft.online/
// http://localhost:8000

// Add a request interceptor to include the token
allaxios.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add a response interceptor for global error handling
allaxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const modalRoot = document.createElement("div");
      modalRoot.style.position = "fixed";
      modalRoot.style.top = "0";
      modalRoot.style.left = "0";
      modalRoot.style.width = "100%";
      modalRoot.style.height = "100%";
      modalRoot.style.background = "rgba(0, 0, 0, 0.1)";
      modalRoot.style.display = "flex";
      modalRoot.style.justifyContent = "center";
      modalRoot.style.alignItems = "center";
      modalRoot.style.zIndex = "1000";

      const modalContent = document.createElement("div");
      modalContent.style.background = "#fff";
      modalContent.style.padding = "30px";
      modalContent.style.borderRadius = "10px";
      modalContent.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.1)";
      modalContent.style.textAlign = "center";
      modalContent.style.maxWidth = "400px";
      modalContent.style.width = "90%";

      const iconWrapper = document.createElement("div");
      iconWrapper.style.backgroundColor = "#FF6B6B";
      iconWrapper.style.width = "60px";
      iconWrapper.style.height = "60px";
      iconWrapper.style.borderRadius = "50%";
      iconWrapper.style.margin = "0 auto";
      iconWrapper.style.display = "flex";
      iconWrapper.style.justifyContent = "center";
      iconWrapper.style.alignItems = "center";
      iconWrapper.style.marginBottom = "20px";

      const icon = document.createElement("span");
      icon.style.fontSize = "30px";
      icon.style.color = "#fff";
      icon.innerHTML = "&#9888;"; 

      iconWrapper.appendChild(icon);
      modalContent.appendChild(iconWrapper);

      const title = document.createElement("h2");
      title.textContent = "Ooops";
      title.style.color = "#333";
      title.style.marginBottom = "10px";
      modalContent.appendChild(title);

      const message = document.createElement("p");
      message.textContent = "Your token has expired. Please log in again to continue.";
      message.style.color = "#555";
      message.style.fontSize = "14px";
      message.style.marginBottom = "20px";
      modalContent.appendChild(message);

      const button = document.createElement("button");
      button.textContent = "Done";
      button.style.padding = "10px 20px";
      button.style.backgroundColor = "#FF6B6B";
      button.style.color = "#FFF";
      button.style.border = "none";
      button.style.borderRadius = "5px";
      button.style.cursor = "pointer";
      button.style.fontSize = "14px";
      button.onclick = () => {
        document.body.removeChild(modalRoot);
        window.location.href = "/"; 
      };

      modalContent.appendChild(button);
      modalRoot.appendChild(modalContent);
      document.body.appendChild(modalRoot);
    
    }
    return Promise.reject(error);
  }
);

export default allaxios;
