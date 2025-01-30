import React, { useState } from 'react';
import axios from 'axios';

const RegistrationForm = ({ onRegistrationAdded }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [event, setEvent] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [eventError, setEventError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;

    if (!name) {
      setNameError('Name is required');
      isValid = false;
    } else {
      setNameError('');
    }

    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Invalid email format');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!event) {
      setEventError('Event is required');
      isValid = false;
    } else {
      setEventError('');
    }

    if (isValid) {
      try {
        await axios.post('http://localhost:5000/api/registrations', {
          name,
          email,
          event,
        });
        setName('');
        setEmail('');
        setEvent('');
        onRegistrationAdded(); // Notify parent component to refresh the list
      } catch (error) {
        console.error('Error adding registration:', error);
      }
    }
  };

  return (
    <div>
      <h2>Add New Registration</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          {nameError && <div style={{ color: 'red' }}>{nameError}</div>}
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          {emailError && <div style={{ color: 'red' }}>{emailError}</div>}
        </div>
        <div>
          <label>Event:</label>
          <input type="text" value={event} onChange={(e) => setEvent(e.target.value)} />
          {eventError && <div style={{ color: 'red' }}>{eventError}</div>}
        </div>
        <button type="submit">Add Registration</button>
      </form>
    </div>
  );
};

export default RegistrationForm;