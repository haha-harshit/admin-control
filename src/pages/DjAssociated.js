// DJAssociated.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dj.css'; // Import the CSS file
import { MdSpeakerGroup } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const 
DJAssociated = ({clubId}) => {
  const [djData, setDjData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://club-be.onrender.com/dj/getdjbyclub/${clubId}`);
        setDjData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  const navigate = useNavigate()
  useEffect(() => {
   const isLoggedin =     !!localStorage.getItem('token');
      if(isLoggedin === false){
       navigate('/login')
      }
  }, []);

  return (
    <>

    <div className="dj-container">

      {djData.map((dj) => (
        <div key={dj._id} className="dj-card">
          <div className="card-header">
            <h2>{dj.DjName}</h2>
            <div className={`status-icon ${dj.statusLive ? 'online' : 'offline'}`}></div>
          </div>
          <p style={{marginLeft:10}}>Club ID: {dj.ClubID}</p>
          <p style={{marginLeft:10}}>DJ Number: {dj.DjNumber}</p>
          <div style={{marginLeft:10}} className="additional-info">
            <div>
              <i className="fas fa-calendar-alt"></i> {new Date(dj.date).toLocaleDateString()}
            </div>
            {/* Add more icons and information as needed */}
          </div>
        </div>
      ))}

      {djData.length === 0 ? <h1>No DJ's Found!</h1> :""}
    </div>
    </>

  );
};

export default DJAssociated;
