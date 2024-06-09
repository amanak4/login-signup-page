import React, { useState, useEffect } from 'react';

function Mode() {
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

  return (
    <div className={`main-container ${theme}`}>
     
      {/* <div className="container">
      
      </div> */}
    </div>
  );
}

export default Mode;
