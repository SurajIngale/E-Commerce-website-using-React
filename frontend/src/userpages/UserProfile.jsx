import React, { useContext } from 'react';
import AuthContext from '../authContext';

const UserProfile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="container w-50 mt-5 p-5 text-white bg-dark">
      <h2>User Profile</h2>
      <div className="container">
        <div className="form-group">
          <label className="form-label">Name</label>
          <p>{user?.name}</p>
        </div>
        <div className="form-group">
          <label className="form-label">Email</label>
          <p>{user?.email}</p>
        </div>
        <div className="form-group">
          <label className="form-label">Monile No.</label>
          <p>{user?.mobile}</p>
        </div>
        <div className="form-group">
          <label className="form-label">Address</label>
          <p>{user?.address}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
