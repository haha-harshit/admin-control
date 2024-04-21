import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import { AccessTime, CheckCircle, Cancel } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';

const RecentTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const {id} = useParams();
    useEffect(() => {
    // Make an API request using Axios to fetch the transaction data
    axios.get(`https://club-be.onrender.com/clubpay/paymentsbyuser/${id}`)
      .then(response => {
        setTransactions(response.data.reverse());
      })
      .catch(error => {
        console.error('Error fetching transaction data:', error);
      });
  }, []);
const navigate = useNavigate()
useEffect(() => {
    const isLoggedin =     !!localStorage.getItem('token');
       if(isLoggedin === false){
        navigate('/login')
       }
   }, []);
  return (
    <div style={{margin:20}}>

<h1 style={{textAlign:"center",marginTop:50,fontWeight:"700",fontSize:22}}>Club <span style={{color:"#ff82bf"}}>Nights</span> - User Transactions  <i class="fas fa-exchange-alt"></i></h1>       
<div style={{padding:20}}>

    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Amount(INR)</TableCell>

            <TableCell>Mobile Number</TableCell>
            <TableCell>Transaction ID</TableCell>
            <TableCell>Song Name</TableCell>
            <TableCell>Announcement</TableCell>
            <TableCell>Optional Url</TableCell>
              
                
            <TableCell>Payment Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map(transaction => (
            <TableRow key={transaction._id}>
              <TableCell>{new Date(transaction.date).toLocaleString()}</TableCell>
              <TableCell>₹{transaction.SongReqList[0].bookingPrice}</TableCell>

             
              <TableCell>{transaction.mobileNumber}</TableCell>
              <TableCell>{transaction.transactionId}</TableCell>
              <TableCell>{transaction.SongReqList[0].songname === '' ? "N/A" :transaction.SongReqList[0].songname  }</TableCell>
              <TableCell>{transaction.SongReqList[0].announcement === '' ? "N/A" :transaction.SongReqList[0].announcement  }</TableCell>
              <TableCell>{transaction.SongReqList[0].optionalurl === '' ? "N/A" :transaction.SongReqList[0].optionalurl  }</TableCell>

              <TableCell>
                {transaction.paymentstatus ? (
                  <CheckCircle style={{ color: 'green' }} />
                ) : (
                  <Cancel style={{ color: 'red' }} />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    </div>
  );
};

export default RecentTransactions;
