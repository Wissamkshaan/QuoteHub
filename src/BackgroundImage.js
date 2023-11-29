import React from 'react';
import './BackgroundImage.css';


const FullBackground = ({ children }) => {
  return (
    <div className="content-container">
      {children}
    </div>
  );
};

export default FullBackground;