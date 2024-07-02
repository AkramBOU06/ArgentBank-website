// src/components/Header.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../assets/images/argentBankLogo.png';
import { logout } from '../features/auth/authSlice';

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo" />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {token && user ? (
          <>
            <span className="main-nav-item">
              <i className="fa fa-user-circle"></i>
              {user.userName}
            </span>
            <button className="main-nav-item logout-button" onClick={handleLogout}>
              <i className="fa fa-sign-out"></i>
              Logout
            </button>
          </>
        ) : (
          <Link className="main-nav-item" to="/login">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
