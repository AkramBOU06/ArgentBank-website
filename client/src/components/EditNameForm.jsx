// src/components/EditNameForm.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../features/auth/authSlice.jsx';

const EditNameForm = ({ setIsEditing }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [username, setUsername] = useState(user.userName || ''); // Si username est null, initialiser avec une chaîne vide

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser({ userName: username })); // Mettre à jour le username
    setIsEditing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-wrapper">
        <label htmlFor="userName">Username</label>
        <input
          type="text"
          id="userName"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <button type="submit">Save</button>
      <button type="button" onClick={() => setIsEditing(false)}>
        Cancel
      </button>
    </form>
  );
};

export default EditNameForm;
