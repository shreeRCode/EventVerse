import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RegistrationTable = ({ refresh }) => {
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    fetchRegistrations();
  }, [refresh]); // Add refresh as a dependency

  const fetchRegistrations = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/registrations');
      setRegistrations(response.data);
    } catch (error) {
      console.error('Error fetching registrations:', error);
    }
  };

    const handleDelete = async (id) => {
        try {
          await axios.delete(`http://localhost:5000/api/registrations/${id}`);
          fetchRegistrations(); // Refresh the list after deletion
        } catch (error) {
          console.error('Error deleting registration:', error);
        }
      };

      const handleUpdateStatus = async (id, currentStatus) => {
        const newStatus = currentStatus === 'Pending' ? 'Approved' : 'Pending';
        try {
          await axios.put(`http://localhost:5000/api/registrations/${id}`, { status: newStatus });
          fetchRegistrations(); // Refresh the list after update
        } catch (error) {
          console.error('Error updating registration status:', error);
        }
      };

  return (
    <div>
      <h2>Registrations</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Event</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {registrations.map((registration) => (
            <tr key={registration._id}>
              <td>{registration.name}</td>
              <td>{registration.email}</td>
              <td>{registration.event}</td>
              <td>{registration.status}</td>
              <td>
                <button onClick={() => handleUpdateStatus(registration._id, registration.status)}>
                    {registration.status === 'Pending' ? 'Approve' : 'Set Pending'}
                </button>
                <button onClick={() => handleDelete(registration._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RegistrationTable;