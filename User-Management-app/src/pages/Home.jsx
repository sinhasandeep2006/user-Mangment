import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserTable from '../components/UserTable';
import LoadingSpinner from '../components/LoadingSpinner';
import UserForm from '../components/UserForm';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        setLoading(false);
      });
  }, []);

  const handleShowForm = (user = null) => {
    setCurrentUser(user);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setCurrentUser(null);
  };

  return (
    <div className="container mt-5">
      <h1>User Management</h1>
      <button className="btn btn-primary mb-3" onClick={() => handleShowForm()}>
        Create User
      </button>
      {loading ? <LoadingSpinner /> : <UserTable users={users} setUsers={setUsers} handleShowForm={handleShowForm} />}
      <UserForm show={showForm} handleClose={handleCloseForm} user={currentUser} setUsers={setUsers} />
    </div>
  );
};

export default Home;
