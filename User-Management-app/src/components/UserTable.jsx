import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
const UserTable = ({ users, setUsers, handleShowForm }) => {
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>
              <Link to={`/user/${user.id}`} className="btn btn-primary mr-2">Details</Link>
              <Button variant="warning" onClick={() => handleShowForm(user)}>Edit</Button>
              <Button variant="danger" onClick={() => handleDelete(user.id)}>Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

};
UserTable.propTypes = {
    users: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
      })
    ).isRequired, // Validate the users array
    setUsers: PropTypes.func.isRequired, // Validate setUsers function
    handleShowForm: PropTypes.func.isRequired, // Validate handleShowForm function
  };
export default UserTable;


