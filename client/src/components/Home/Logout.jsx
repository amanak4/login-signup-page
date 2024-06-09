import axios from 'axios'
import React from 'react'
import { useContext } from 'react';
import { Context } from '../..';
import { BASE_URL } from '../../Base_url';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import {motion, spring} from "framer-motion";
function Logout() {
    const {isAuthorized,setIsAuthorized,setUser}=useContext(Context);
    const navigateTo=useNavigate();
   const handleLogout= async()=>{
       try{
        const {data}=await axios.get(`${BASE_URL}/user/logout`,{
          withCredentials:true,
        });
         if(data.message){
           toast.success(data.message);
           setIsAuthorized(false);
           setUser({});
        //    navigateTo('/auth');
         }
         else if(data.error){
           toast.error(data.error);
         }
       }
       catch(err){

       }
    }
  return (
    <motion.div initial={{opacity:0,
    x:-400}} animate={{opacity:1,x:0,
    
    transition:{duration:0.5,type:"spring",stiffness:100}}}
    
     >
    {!isAuthorized?<Link to='/auth' className='btn btn-primary bg-blue-500 hover:bg-blue-700 p-2 py-1 mt-4 rounded-full  hover:scale-105 '>Get Started</Link>:<button className="btn btn-primary bg-blue-500 hover:bg-blue-700 hover:scale-105 p-2 py-1 mt-4 rounded-full" onClick={handleLogout}>Logout</button>}
      
    </motion.div>
  )
}

export default Logout
