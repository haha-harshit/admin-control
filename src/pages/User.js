import React, { useState, useEffect } from 'react';
import { useHistory, useNavigate } from 'react-router-dom'; // Import useHistory from React Router
import { GridComponent, ColumnsDirective, ColumnDirective, Inject } from '@syncfusion/ej2-react-grids';
import { DataManager, WebApiAdaptor, Query } from '@syncfusion/ej2-data';

const User = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');
const navigate = useNavigate()
  useEffect(() => {
    // Fetch data from your API endpoint (replace with actual endpoint)
    fetch('https://club-be.onrender.com/user/users')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const dataManager = new DataManager({
    adaptor: new WebApiAdaptor(),
    url: 'https://club-be.onrender.com/user/users',
  });

  const onSearchChange = (e) => {
    const text = e.target.value;
    setSearchText(text);

    // Filter data based on the entered phone number
    const query = new Query().where('userMobile', 'contains', text);
    dataManager.executeQuery(query).then((result) => setData(result));
  };

  const resetSearch = () => {
    setSearchText('');
    // Reset to the original data
    fetch('https://club-be.onrender.com/user/users')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  };

  const rowSelected = (args) => {
    // Get the selected row data
    // const selectedData = args.data[0];
    // console.log();
    // Navigate to the user-transactions/userMobile route
    navigate(`/user-transactions/${args.data.userMobile}`);
  };
  useEffect(() => {
   const isLoggedin =     !!localStorage.getItem('token');
      if(isLoggedin === false){
       navigate('/login')
      }
  }, []);
  return (
    <div style={{ margin: '10px' }}>
      <h2 style={{ margin: '10px' }}>User List</h2>
      <div style={{ display: 'flex', alignItems: 'center', margin: '10px' }}>
        <input
          type="text"
          placeholder="Search by phone number"
          value={searchText}
          onChange={onSearchChange}
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <button onClick={resetSearch} style={{ padding: '5px', cursor: 'pointer' }}>
          Reset
        </button>
      </div>
      {searchText && (
        <div style={{ margin: '10px' }}>
          Showing results for: {searchText}
        </div>
      )}
      <GridComponent dataSource={data} allowPaging={true} rowSelected={rowSelected}>
        <ColumnsDirective>
          <ColumnDirective field="_id" headerText="ID" width="150" textAlign="Right" />
          <ColumnDirective field="userMobile" headerText="Mobile" width="150" />
          <ColumnDirective field="totalPayments" headerText="Total Payments (₹)" width="150" textAlign="Right" />
          <ColumnDirective field="date" headerText="Date" width="150" format="yMd" />
        </ColumnsDirective>
        <Inject services={[/* Add required services here */]} />
      </GridComponent>
    </div>
  );
};

export default User;
