import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './components/Auth/Login.jsx';
import Home from './components/Home/Home.jsx';
import NotFound from './components/NotFound/NotFound.jsx';
import Mode from './components/ThemeMode/Mode.jsx';
import { useContext, useEffect } from 'react';
import { Context } from './index.js';
import { BASE_URL } from './Base_url.js';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
function App() {
  const {isAuthorized,setIsAuthorized,user,setUser}=useContext(Context);
 console.log(isAuthorized);
  const getuser=async()=>{
    const {data}=await axios.get(`${BASE_URL}/user/getuser`,{
      withCredentials:true,
    });
    if(data.message){
    setUser(data.user);
    setIsAuthorized(true);
    console.log(data.user);
    toast.success(data.message);
    }
    else if(data.error){
      setIsAuthorized(false);
      setUser({});
      console.log("jshshjsjh");
      toast.error(data.error);
      
    }
  }
 useEffect(()=>{
  getuser();
 },[]);

  return (
    <div className="App">
      <Router>
      {/* <Mode /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Toaster />
    </div>
  );
}

export default App;
