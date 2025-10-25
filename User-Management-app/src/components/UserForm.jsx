import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

const UserForm = ({ show, handleClose, user, setUsers }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    username: '',
    address: { street: '', city: '' },
    website: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        ...user,
        address: { street: user.address.street, city: user.address.city } 
      });
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        username: `USER-${Math.random().toString(36).substring(2, 7)}`,
        address: { street: '', city: '' },
        website: ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('address.')) {
      const fieldName = name.split('.')[1]; 
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [fieldName]: value } 
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value 
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 

    const apiCall = user
      ? axios.put(`https://jsonplaceholder.typicode.com/users/${user.id}`, formData)
      : axios.post('https://jsonplaceholder.typicode.com/users', formData);

    apiCall
      .then((response) => {
        if (user) {
          
          setUsers((prev) => prev.map((u) => (u.id === user.id ? response.data : u)));
        } else {
         
          setUsers((prev) => [...prev, response.data]);
        }
        handleClose(); 
      })
      .catch((error) => console.error('Error saving user:', error));
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{user ? 'Edit User' : 'Create User'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}> 
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              readOnly 
            />
          </Form.Group>
          <Form.Group controlId="formStreet">
            <Form.Label>Street</Form.Label>
            <Form.Control
              type="text"
              name="address.street" 
              value={formData.address.street}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formCity">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              name="address.city" 
              value={formData.address.city}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formWebsite">
            <Form.Label>Website</Form.Label>
            <Form.Control
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit"> 
            {user ? 'Update' : 'Create'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

UserForm.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  user: PropTypes.object,
  setUsers: PropTypes.func.isRequired
};

export default UserForm;
