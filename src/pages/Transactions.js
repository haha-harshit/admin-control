import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject } from '@syncfusion/ej2-react-grids';
import { IoMdCheckmark, IoMdClose } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const history = useNavigate();

  useEffect(() => {
    // Make an Axios GET request to fetch the data
    axios.get('https://club-be.onrender.com/clubpay/getAllPayments')
      .then(response => {
        setTransactions(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const getPaymentStatusIcon = (paymentStatus) => {
    return paymentStatus ? <IoMdCheckmark color="green" /> : <IoMdClose color="red" />;
  };

  const getStatusCellStyle = (paymentStatus) => {
    const style = {
      color: paymentStatus ? 'green' : 'red',
      fontWeight: 'bold',
    };
    return style;
  };

  const downloadTransactions = () => {
    const dataToWrite = JSON.stringify(transactions, null, 2);
    const blob = new Blob([dataToWrite], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transactions.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const navigateToDetails = (args) => {
    // Get the selected row data
    const selectedRow = args.data;
    
    // Use the _id property to navigate to the specific route
    history(`/transactions/${selectedRow._id}`);
  };
  useEffect(() => {
    const isLoggedin =     !!localStorage.getItem('token');
       if(isLoggedin === false){
        history('/login')
       }
   }, []);
  const songReqListTemplate = (props) => {
    return (
      <div>
        {props.SongReqList.map((song, index) => (
          <div key={index}>
            <p>Song: {song.songname}</p>
            <p>Link: {song.songlink}</p>
            <p>Booking Price: ₹{song.bookingPrice}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ margin: 5, fontWeight: "500", letterSpacing: 1 }}>Transactions</h2>
      <button style={{margin:10,padding:10,background:"red",borderRadius:10,color:"#fff"}} onClick={downloadTransactions}>Download All Transactions</button>
      <GridComponent
        dataSource={transactions}
        style={{cursor:"pointer"}}
        allowPaging={true}
        pageSettings={{ pageSize: 10 }}
        rowSelected={navigateToDetails}
      >
        <ColumnsDirective >
          <ColumnDirective field="_id" headerText="User ID(_DB)" isPrimaryKey={true} width='150' />
          <ColumnDirective field="MUID" headerText="Merchant User Id" width='150' />
          <ColumnDirective field="transactionId" headerText="Payment" width='150' />

          <ColumnDirective field="mobileNumber" headerText="Mobile Number" width='150' />
          <ColumnDirective field="paymentstatus" headerText="Payment Status" width='150'
            template={(rowData) => getPaymentStatusIcon(rowData.paymentstatus)}
            style={getStatusCellStyle}
          />

          <ColumnDirective headerText="Song Requests" width="250" template={songReqListTemplate} />
        </ColumnsDirective>
        <Inject services={[]} />
      </GridComponent>
    </div>
  );
}

export default Transactions;
