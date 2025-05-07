import React, { useEffect, useState } from "react";
import "../css/login/login.css";
import Loginlogo from "../images/Loginlogo.png";
import Kannttulogo from "../images/KannattuLogo.png";
import { useNavigate } from "react-router-dom";
import API_URL from "../api/api_urls";
import axios from "axios";
import allaxios from "../api/axios";
import PulseLoader from "react-spinners/PulseLoader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUser } from "../usercomponent/usercontext/Usercontext";

function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, setError] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [loading, setLoading] = useState(false);
  // const [userData, setUserData] = useState(null); // New state to store the response
  const { setUserData } = useUser(); // Get the setUserData function from the context

  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    setAuthToken(token);
    console.log("Global authToken:", token);
  }, []);

  const currentPath = window.location.pathname;

  if (currentPath === "/") {
    const removeauthtoken = sessionStorage.removeItem("authToken");
    console.log("no authtoken", removeauthtoken);
  } else {
    console.log("authtoken");
  }

  const handlelogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await allaxios.post(API_URL.AUTH.LOGIN, {
        email,
        password,
      });

      console.log("response data", response);
      //  navigate("/dashboard");
      //  toast.success("Login successful!", { autoClose: 2000 });

      if (response.data.access) {
        setUserData(response.data);
        setLoading(false);
        // toast.success("Login successful! Redirecting...", { autoClose: 2000 });
        const authtoken = sessionStorage.setItem(
          "authToken",
          response.data.access
        );
        const usertoken = sessionStorage.setItem(
          "userData",
          JSON.stringify(response.data)
        ); // Save the entire response
        // Save the entire response

        //  console.log('login token',usertoken);

        // const currentpath = window.location.pathname ;
        // console.log('currentpath ',currentpath);

        // if(currentpath === "/"){
        // sessionStorage.removeItem("authToken")
        // }
        toast.success("Login successful!", { autoClose: 2000 });
        console.log("userdata token", usertoken);

        // Navigate based on the user's role
        if (response.data.role === "Admin") {
          navigate("/dashboard");
        } else if (response.data.role === "User") {
          setUserData(response.data);
          navigate("/userdashboard");
        }else if(response.data.role === "Branch Manager"){
          setUserData(response.data);
          navigate("/manager-dashboard");
        }
         else {
          toast.error("Role not recognized. Please contact support.", {
            autoClose: 2000,
          });
        }
      } else {
        setLoading(false);

        setError(response.data.message || "Login failed. Please try again.");
        console.log("Error");
        toast.error("Email or password is incorrect", { autoClose: 2000 });
      }
    } catch (err) {
      setLoading(false);
      setError(
        err.response?.data?.message || "An error occurred. Please try again.",
        { autoClose: 2000 }
      );
      console.log("error");
      // alert("error")
      toast.error("Email or password is incorrect", { autoClose: 2000 });
    }
  };

  return (
    <div className="login-container">
      {loading && (
        <div className="full-page-loader">
          <PulseLoader size={15} color="#ffffff" />
        </div>
      )}

      <div className="login-left shadow">
        <h1>
          One step closer to{" "}
          <span style={{ color: "#FF4F5A" }}>
            <br />
            seamless customer <br /> management
          </span>
        </h1>
        <img src={Loginlogo} alt="Login Illustration" className="login-image" />
      </div>

      <div className="kannattulogo">
        <img src={Kannttulogo} alt="" />
      </div>

      <div className="login-right">
        <h2>Login</h2>
        <form onSubmit={handlelogin}>
          <div className="form-group">
            <label htmlFor="email">
              <b>Email</b>
            </label>
            <input
              type="text"
              id="email"
              onChange={(e) => setemail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">
              <b>Password</b>
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setpassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="login-button">
            {" "}
            submit
          </button>
        </form>
        <div className="login-links">
          <a href="/forgot-password">Forgot Password?</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
