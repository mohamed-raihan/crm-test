import React, { useEffect, useState } from 'react';
import '../css/login/forgotpassword.css'; 
import ForgotPasswordLogo from '../images/Loginlogo.png';
import KannttuLogo from '../images/KannattuLogo.png';
import { useNavigate } from 'react-router-dom';
import API_URL from '../api/api_urls';
import allaxios from '../api/axios';
import { toast } from 'react-toastify';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [new_password, setNewPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [emailEditable, setEmailEditable] = useState(true); // Track if email is editable
  const [passwordError, setPasswordError] = useState(''); // State to hold password validation error

  
  
  console.log('new password',new_password);
  console.log('confirm password',confirmpassword);

  console.log('confirm email',email);

  const navigate = useNavigate()
  const handleforgotpassword = async(e) =>{
    e.preventDefault();

    setPasswordError('');

    // Password validation
    if (new_password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      return;
    }


    try{

        if(new_password === confirmpassword){
            const response = await allaxios.post(API_URL.AUTH.FORGOT_PASSWORD,{
                email,
                new_password,
            })
    
            console.log("Response",response);
            
            if(response.status === 200){
                toast.success("Successfully changed password")
               navigate("/")
            }else{
                console.log('Error Response');
                toast.error('Error email or password')
                
            }
        }else{
       toast.error("Enter Correct password")
        }
       

    }catch(err){
        console.log("Error",err);
        toast.error('Error email or password')
        
    }

} 



const handleEmailBlur = () => {
  if (email) {
    setEmailEditable(false); // Lock email field after it's initially set
  }
};
   
  return (
    <div className="forgotpassword-container">
      <div className="forgotpassword-left shadow">
        <h1>One step closer to  <span style={{ color: "#FF4F5A" }}><br />seamless customer <br /> management</span></h1>
        <img
          src={ForgotPasswordLogo}
          alt="Forgot Password Illustration"
          className="forgotpassword-image"
        />
      </div>

      <div className="kannttulogo" style={{position:"relative",bottom:"30%",left:"10%"}} >
           <img src={KannttuLogo} alt="Kannttu Logo" />
      </div>
        
      <div className="forgotpassword-right">
        <h2>Forgot Password</h2>
        <form  onSubmit={handleforgotpassword} >
          <div className="form-group">
            <label htmlFor="email" ><b>Email</b></label>
            <input type="text" id="email" 
            onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email"     
           onBlur={handleEmailBlur} // Lock email on blur
           disabled={!emailEditable} // Disable input if email is not editable

  />
  

          </div>
          <div className="form-group">
            <label htmlFor="new_password"><b>New Password</b></label>
            <input type="password" id="password" value={new_password} onChange={(e) => setNewPassword(e.target.value)} placeholder="Enter your new password" />
            {/* <button
                type="button"
                className="toggle-password"
                onClick={() => setNewPassword(!new_password)}
              >
                {new_password ? "Hide" : "Show"}
              </button> */}
          </div>
          {passwordError && new_password.length < 8 && (
              <p className="error-message" style={{color:"red"}}>{passwordError}</p>
            )}
          <div className="form-group">
            <label htmlFor="password"><b>Confirm Password</b></label>
            <input type="password" id="password" onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm new password" />
            {/* <button
                type="button"
                className="toggle-password"
                onClick={() => setConfirmPassword(!confirmpassword)}
              >
                {confirmpassword ? "Hide" : "Show"}
              </button> */}
          </div>
          {passwordError && confirmpassword && confirmpassword !== new_password && (
              <p className="error-message" style={{color:"red"}}>Passwords do not match</p>
            )}

          <button type="submit" className="forgotpassword-button">Submit</button>
        </form>
        <div className="forgotpassword-links">
          <a href="/">Back to Login</a>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
