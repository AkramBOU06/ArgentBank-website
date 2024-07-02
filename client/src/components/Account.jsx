// src/components/Account.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Account = ({ title, amount, description, accountId }) => {
  const navigate = useNavigate();

  const handleViewTransactions = () => {
    navigate(`/transactions/${accountId}`);
  };

  return (
    <section className="account">
      <div className="account-content-wrapper">
        <h3 className="account-title">{title}</h3>
        <p className="account-amount">{amount}</p>
        <p className="account-amount-description">{description}</p>
      </div>
      <div className="account-content-wrapper cta">
        <button className="transaction-button" onClick={handleViewTransactions}>
          View transactions
        </button>
      </div>
    </section>
  );
};

export default Account;
