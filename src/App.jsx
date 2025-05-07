import React from "react";
import { Routes, Route, Router } from "react-router-dom";
import Home from "./layout/DefaultLayout";
import Login from "./login/Login";
import DefaultLayout from "./layout/DefaultLayout";
import AppRoutes from "./routes/Index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "./usercomponent/usercontext/Usercontext";

const App = () => {
  return (
    <UserProvider>
      <div className="app">
        <ToastContainer position="top-right" autoClose={3000} />

        <AppRoutes />
      </div>
    </UserProvider>
  );
};

export default App;
