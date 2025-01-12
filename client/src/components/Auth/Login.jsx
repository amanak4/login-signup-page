import React, { useContext, useState } from 'react';
import './style.css'; 
import { Link, Navigate, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Context } from '../..';
import { BASE_URL } from '../../Base_url';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useEffect } from 'react';
import Mode from '../ThemeMode/Mode';
function Login() {


  const {isAuthorized,setIsAuthorized,user,setUser}=useContext(Context);

/* --------Mode ---------------*/

const [theme, setTheme] = useState(() => {
  const savedTheme = localStorage.getItem('theme');
  return savedTheme ? savedTheme : 'light';
});

useEffect(() => {
  localStorage.setItem('theme', theme);
}, [theme]);

const toggleTheme = () => {
  setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
};
 



  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [formData2, setFormData2] = useState({
    email: '',
    password: ''
  });
const navigateTo = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChange2 = (e) => {
    setFormData2({ ...formData2, [e.target.name]: e.target.value });
  };

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/user/register`, formData,{
        withCredentials:true,
        headers: {
          "Content-Type": "application/json",
        },});
      console.log("response kdj",response);
      setUser(response.data.user);
      setIsAuthorized(true);
      toast.success(response.data.message);
      navigateTo('/')
    } catch (error) {
      console.error(error.response.data);
      toast.error(error.response.data.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("fxn started")
      const {data} = await axios.post(`${BASE_URL}/user/login`, formData2,{
        withCredentials:true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if(data.message){
      console.log(data);
      setUser(data.user);
      setIsAuthorized(true);
      toast.success(data.message);
      navigateTo('/');
      }
      else if(data.error){
        toast.error(data.error);
      }
    } catch (error) {
      console.error(error.response.data);
      toast.error(error.response.message);
    }
  };
  return (
    <>
    
    <div className={`main-container ${theme}`}>
    <div className='absolute top-4 right-4'>
    <button onClick={toggleTheme} className="toggle-theme">
        {theme !== 'light' ?  <FaMoon /> : <FaSun />}
      </button>
      </div>
      <div className={`container ${isSignUp ? 'active' : ''}`}>
        <div className="form-container sign-up">
          <form onSubmit={handleSubmit2}>
            <h1>Create Account</h1>
            <span>or use your email for registration</span>
            <input type="text" placeholder="Name" name="name" onChange={handleChange} />
            <input type="email" placeholder="Email" name="email" onChange={handleChange} />
            <input type="password" placeholder="Password" name="password" onChange={handleChange} />
            <button type='submit'>Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in">
          <form onSubmit={handleSubmit}>
            <h1>Sign In</h1>
            <span>or use your email password</span>
            <input type="email" placeholder="Email" name="email" onChange={handleChange2} />
            <input type="password" placeholder="Password" name="password" onChange={handleChange2} />
            <button type='submit'>Sign In</button>
          </form>
        </div>
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
            <h1>Hello, Friend!</h1>
              <p>Register with your personal details to use all site features</p>
              <button className="bg-blue-600" onClick={toggleForm}>Sign In</button>
            </div>
            <div className="toggle-panel toggle-right">
            <h1>Welcome Back!</h1>
              <p>Enter your personal details to use all site features</p>
              
              <button className="bg-blue-600" onClick={toggleForm}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Login;
