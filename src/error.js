// src/pages/OfflinePage.js
import React from 'react';
import illustration from 'assets/img/avatars/LogoAtlantis.png';

const Error = () => {
  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center', textAlign: 'center', padding: '2rem' }}>
       <img src={illustration} style={{width:'250px',height:'auto'}}/>
      <h1>Something Went Wrong</h1>
      <p>You lost the connection. Please refresh the page or try again later.</p>
    </div>
  );
};

export default Error;
