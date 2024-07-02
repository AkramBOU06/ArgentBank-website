// src/pages/ProfilePage.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import EditName from '../components/EditName';
import Account from '../components/Account';

const ProfilePage = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <>
      <Header />
      <main className="main bg-dark">
        <EditName />
        <h2 className="sr-only">Accounts</h2>
        {user && user.accounts && user.accounts.map((account, index) => (
          <Account
            key={index}
            title={`Argent Bank ${account.type} (${account.number})`}
            amount={account.balance}
            description="Available Balance"
          />
        ))}
      </main>
      <Footer />
    </>
  );
};

export default ProfilePage;
