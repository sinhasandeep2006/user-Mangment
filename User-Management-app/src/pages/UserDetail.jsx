import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Card, Button, Spinner } from 'react-bootstrap';

const UserDetail= () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(response => {
        setUser(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching user details:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p>Loading user details...</p>
      </div>
    );
  }

  if (!user) {
    return <p className="text-center text-danger mt-5">User not found!</p>;
  }

  return (
    <div className="container mt-5">
      <Card className="p-4 shadow-sm">
        <h2>{user.name}</h2>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Website:</strong> {user.website}</p>
        <p><strong>Address:</strong> {user.address.street}, {user.address.city}</p>
        <p><strong>Company:</strong> {user.company.name}</p>
        <Link to="/" className="btn btn-secondary mt-3">Back to Users</Link>
      </Card>
    </div>
  );
};

export default UserDetail;
