import React from 'react'
import Logout from './Logout'
import { useContext } from 'react';
import { Context } from '../..';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import {motion} from 'framer-motion'
function Home() {

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
//   const {isAuthorized,setIsAuthorized,setUser}=useContext(Context);
// const navigateTo=useNavigate();
// if(!isAuthorized){
//   navigateTo('/auth');
// }
  return (
<div className={`flex-col justify-center items-center h-screen w-screen ${theme} main-container`}>
<div className='absolute top-4 right-4'>
    <button onClick={toggleTheme} className="toggle-theme">
        {theme !== 'light' ?  <FaMoon /> : <FaSun />}
      </button>
      </div>
  <motion.div className="text-3xl font-bold underline text-center">Welcome to My Website</motion.div>
  <Logout />
</div>

  )
}

export default Home
