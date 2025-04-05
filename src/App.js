import React, { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    dob: '',
  });

  const modalRef = useRef();

  const resetForm = () => {
    setFormData({
      username: '',
      email: '',
      phone: '',
      dob: '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { username, email, phone, dob } = formData;

    // Empty field validation
    if (!username) {
      alert('Please fill out the Username field.');
      return;
    }
    if (!email) {
      alert('Please fill out the Email field.');
      return;
    }
    if (!phone) {
      alert('Please fill out the Phone Number field.');
      return;
    }
    if (!dob) {
      alert('Please fill out the Date of Birth field.');
      return;
    }

    // Email validation
    if (!email.includes('@')) {
      alert('Invalid email. Please check your email address.');
      return;
    }

    // Phone number validation
    if (!/^\d{10}$/.test(phone)) {
      alert('Invalid phone number');
      return;
    }

    // DOB validation (must not be a future date)
    const selectedDate = new Date(dob);
    const today = new Date();
    if (selectedDate > today) {
      alert('Invalid date of birth');
      return;
    }

    // All valid
    setShowModal(false);
    resetForm();
  };

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setShowModal(false);
      resetForm();
    }
  };

  useEffect(() => {
    if (showModal) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [showModal]);

  return (
    <div className="modal">
      <button onClick={() => setShowModal(true)}>Open Form</button>

      {showModal && (
        <div className="modal-content" ref={modalRef}>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
            <br />

            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <br />

            <label htmlFor="phone">Phone Number:</label>
            <input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
            <br />

            <label htmlFor="dob">Date of Birth:</label>
            <input
              id="dob"
              type="date"
              value={formData.dob}
              onChange={(e) =>
                setFormData({ ...formData, dob: e.target.value })
              }
            />
            <br />

            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
