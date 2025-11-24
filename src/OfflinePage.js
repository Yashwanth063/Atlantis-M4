// src/pages/OfflinePage.js
import React from 'react';
import illustration from 'assets/img/avatars/LogoAtlantis.png';

const OfflinePage = () => {
  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center', textAlign: 'center', padding: '2rem' }}>
       <img src={illustration} style={{width:'250px',height:'auto'}}/>
      <h1>You are Offline</h1>
      <p>Please check your internet connection.</p>
    </div>
  );
};

export default OfflinePage;
