// DetailsTransaction.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DetailsTransaction.css';
import { useNavigate, useParams } from 'react-router-dom';
import { RiCheckLine, RiCloseLine } from 'react-icons/ri'; // Import success and failure icons

const DetailsTransaction = () => {
  const [transactionData, setTransactionData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate()
  useEffect(() => {
    const isLoggedin =     !!localStorage.getItem('token');
       if(isLoggedin === false){
        navigate('/login')
       }
   }, []);
  useEffect(() => {
    axios.get(`https://club-be.onrender.com/clubpay/getPaymentById/${id}`)
      .then(response => {
        setTransactionData(response.data);
      })
      .catch(error => {
        console.error('Error fetching transaction data:', error);
      });
  }, []);

  if (!transactionData) {
    return <div>Loading...</div>;
  }

  const renderPaymentStatusIcon = () => {
    if (transactionData.paymentstatus === true) {
      return <RiCheckLine className="success-icon" />;
    } else {
      return <RiCloseLine className="failure-icon" />;
    }
  };

  return (
    <div className="details-container">
      <div className="tscard">
        <div className="tsbg">
          <h2>Transaction Details</h2>
          <p className="sub-heading">Payment Status:</p>
          <div className="payment-status">
            {renderPaymentStatusIcon()}
            <span>{transactionData.paymentstatus === true ? "Success" : "Failed"}</span>
          </div>

          <hr className="divider" />

          <h2 className="sub-heading">Customer Information:</h2>
          <p><span style={{color:"#ff00ff"}}>Mobile Number:</span>  {transactionData.mobileNumber}</p>
          <p><span style={{color:"#ff00ff"}}>Transaction Id:</span> {transactionData.transactionId}</p>
          <p><span style={{color:"#ff00ff"}}> Merchant User ID:</span>   {transactionData.MUID}</p>
          <p> <span style={{color:"#ff00ff"}}>DJ ID (Song played by):</span> {transactionData.djId}</p>

          <h3 style={{color:"#ff00ff"}}>Song Request List:</h3>
          <ul>
            {transactionData.SongReqList.map(song => (
              <li key={song._id}>
                <strong>{song.songname}</strong> - 
                <a style={{color:"#ff00ff"}} href={song.songlink} target="_blank" rel="noopener noreferrer"> Listen on Spotify</a>
                <br />
                <strong> Booking Amount ₹{song.bookingPrice}</strong> 
                <strong>{song.optionalurl}</strong> 
                <strong>{song.announcement}</strong> 
              </li>
            ))}
          </ul>

          <hr className="divider" />

          <p className="sub-heading">Date of Transaction:</p>
          <p>{new Date (transactionData.date).toLocaleDateString()}</p>

          <div className="tsblob"></div>
        </div>
      </div>
    </div>
  );
};

export default DetailsTransaction;
