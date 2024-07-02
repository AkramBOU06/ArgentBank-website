// client/src/components/EditName.jsx
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import EditNameForm from './EditNameForm';

const EditName = () => {
  const user = useSelector((state) => state.auth.user);
  const [isEditing, setIsEditing] = useState(false);

  if (!user) {
    return null; // Or a loading spinner, or any placeholder component
  }

  return (
    <div className="header">
      <h1>
        Welcome back
        <br />
        {user.firstName} {user.lastName}
        <br />
        User: {user.userName}
      </h1>
      {isEditing ? (
        <EditNameForm setIsEditing={setIsEditing} />
      ) : (
        <button className="edit-button" onClick={() => setIsEditing(true)}>
          Edit Username
        </button>
      )}
    </div>
  );
};

export default EditName;
