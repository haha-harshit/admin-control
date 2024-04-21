// Clubs.js

import React, { useState, useEffect } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject } from '@syncfusion/ej2-react-grids';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Clubs = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Replace 'https://api.clubnights.fun/club/getclubs' with your actual API endpoint
    axios.get('https://club-be.onrender.com/club/getclubs')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
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
    <div style={{ padding: 10 }}>
      <h2 style={{margin:10}}>Clubs List</h2>
      <GridComponent dataSource={data} allowPaging={true}>
        <ColumnsDirective>
          <ColumnDirective field="clubName" headerText="Club Name" width="150" />
          <ColumnDirective field="ownerName" headerText="Owner Name" width="150" />
          <ColumnDirective field="clubEmail" headerText="Email" width="200" />
          <ColumnDirective field="clubMobile" headerText="Mobile" width="150" />
          <ColumnDirective field="isVerified" headerText="Verified" width="100" template={(props) => {
            return props.isVerified ? <FaCheckCircle color="green" size={20} /> : <FaTimesCircle color="red" size={20} />;
          }} />
          <ColumnDirective headerText="Details" width="100" template={(props) => {
            return <Link style={{color:"red"}} to={`/clubs/${props._id}`}>Details</Link>;
          }} />
          {/* Add more columns as needed */}
        </ColumnsDirective>
        <Inject services={[]} />
      </GridComponent>
    </div>
  );
};

export default Clubs;
