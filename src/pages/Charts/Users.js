import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import './ClubDetails.css'; // Import the custom CSS file
import { MdSpeakerGroup } from "react-icons/md";
import DJ from './DJ';
import DJAssociated from './DjAssociated';

const Users = () => {
  const { id } = useParams();
  const [clubData, setClubData] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);

    // Replace 'https://api.clubnights.fun/club/getoneclubs/:id' with your actual API endpoint
    axios.get(`https://club-be.onrender.com/club/getoneclubs/${id}`)
      .then(response => {
        setClubData(response.data);
      })
      .catch(error => {
        console.error('Error fetching club details:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);
 
  const handleVerification = (isVerified) => {


    setLoading(true);

    // Replace 'https://api.clubnights.fun/club/verify/:id' with your actual API endpoint
    axios.put(`https://club-be.onrender.com/club/verify/${id}`, { isVerified })
      .then(response => {
        // Update the local state or perform any additional actions
        setClubData(response.data);
      })
      .catch(error => {
        console.error('Error updating verification status:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
console.log(clubData && clubData.clubId) ;


  return (
    <div className="club-details-container">
      <h2>Club Details</h2>

      <div className={`card basic-card`}>
        <div className="card-headers1">
          <h3>Basic Information</h3>
        </div>
        <div className="card-content">
          <p><strong>Owner Name:</strong> {clubData.ownerName}</p>
          <p><strong>Email:</strong> {clubData.clubEmail}</p>
          <p><strong>Mobile:</strong> {clubData.clubMobile}</p>
          <p><strong>Total Earnings:</strong> ₹{clubData.totalEarnings}</p>
        </div>
      </div>
     
     <div style={{width:"100%", display:"flex",justifyContent:"space-between",alignItems:"center"}}>
      <div className="card-container" >
        <div className={`card atm-card`} style={{minWidth:300}}>
          <div className="card-headers2">
            <h3>Bank Details</h3>
          </div>
          <div className="card-content">
            <p><strong>Club Account Number:</strong> {clubData.clubAccountNumber}</p>
            <p><strong>IFSC Code:</strong> {clubData.clubAccountIFSC}</p>
            <p><strong>UPI ID's:</strong> {clubData.clubUPIID}</p>
          </div>
        </div>

      </div>
      <div className="verification-button" >
        <span className="date-corner">Club Created on: {clubData.date && new Date(clubData.date).toLocaleDateString()}</span>

        {/* Verification button */}
        {loading ? (
 <button className="loading-btn" disabled>
 <div className="loader"></div>
</button>        ) : (
          <>
            {clubData.isVerified ? (
              <button className="unverify-btn" onClick={() => handleVerification(false)}>Unverify</button>
            ) : (
              <button className="verify-btn" onClick={() => handleVerification(true)}>Verify</button>
            )}
          </>
        )}



      </div>
      </div>
    

          
          {/* <DJAssociated clubId={}/> */}

          {
            clubData && clubData.clubId  ? 
            <>
                      <h1 style={{display:"flex",justifyContent:"center",alignItems:"center",margin:20,fontSize:25}}><MdSpeakerGroup style={{color:"#fc035e"}} /> Dj Associated with this Club</h1>
                      <DJAssociated clubId={clubData.clubId}/>

            </>
             : console.log("Not find")
          }
    </div>
  );
};

export default Users;
