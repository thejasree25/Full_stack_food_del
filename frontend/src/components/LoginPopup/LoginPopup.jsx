import React, { useState, useContext } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from "axios";
import { toast } from 'react-toastify';

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const [currState, setCurrState] = useState("Sign Up");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const clearForm = () => {
    setData({ name: "", email: "", password: "" });
  };

  const onLogin = async (event) => {
    event.preventDefault();

    const endpoint = currState === "Login" ? "/api/user/login" : "/api/user/register";

    try {
      const response = await axios.post(url + endpoint, data);

      if (response.data.success) {
        toast.success(`${currState} successful!`);
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowLogin(false);
        clearForm();

        // If just registered, next time will open in Login state
        setCurrState("Login");
      } else {
        toast.error(response.data.message || `${currState} failed.`);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className='login-popup-container'>
        {/* Title and Close Button */}
        <div className='login-popup-title'>
          <h2>{currState}</h2>
          <img
            src={assets.cross_icon}
            alt="Close"
            className="close-icon"
            onClick={() => {
              setShowLogin(false);
              clearForm();
              setCurrState("Login");
            }}
          />
        </div>

        {/* Input Fields */}
        <div className="login-popup-inputs">
          {currState === "Sign Up" && (
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Your Name"
              required
            />
          )}
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Your Email"
            required
          />
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Password"
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit">
          {currState === "Sign Up" ? "Create Account" : "Login"}
        </button>

        {/* Terms and Conditions */}
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing I agree to the Terms of Use & Privacy Policy.</p>
        </div>

        {/* Toggle between Login/Signup */}
        {currState === "Login" ? (
          <p>
            Don't have an account?{" "}
            <span onClick={() => {
              clearForm();
              setCurrState("Sign Up");
            }}>
              Click here
            </span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => {
              clearForm();
              setCurrState("Login");
            }}>
              Login here
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
