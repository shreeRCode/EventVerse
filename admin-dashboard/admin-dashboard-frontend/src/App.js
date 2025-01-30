import React, { useState } from 'react';
import RegistrationTable from './RegistrationTable';
import RegistrationForm from './RegistrationForm';
import './App.css';

function App() {
  const [refreshTable, setRefreshTable] = useState(false);

  const handleRegistrationAdded = () => {
    setRefreshTable(!refreshTable); // Toggle state to trigger refresh
  };

  return (
    <div className="App">
      <h1>Admin Dashboard</h1>
      <RegistrationForm onRegistrationAdded={handleRegistrationAdded} />
      <RegistrationTable refresh={refreshTable} />
    </div>
  );
}

export default App;