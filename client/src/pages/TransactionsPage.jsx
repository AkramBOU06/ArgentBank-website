// client/src/pages/TransactionsPage.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchTransactions } from '../features/auth/transactionsSlice';
import Header from '../components/Header';
import Footer from '../components/Footer';

const TransactionsPage = () => {
  const { accountId } = useParams();
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transactions.items);
  const status = useSelector((state) => state.transactions.status);

  useEffect(() => {
    if (accountId) {
      dispatch(fetchTransactions(accountId));
    }
  }, [dispatch, accountId]);

  return (
    <>
      <Header />
      <main className="main bg-dark">
        <h2>Transactions</h2>
        {status === 'loading' ? (
          <p>Loading...</p>
        )          : (
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Balance</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>{transaction.date}</td>
                    <td>{transaction.description}</td>
                    <td>{transaction.amount}</td>
                    <td>{transaction.balance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </main>
        <Footer />
      </>
    );
  };
  
  export default TransactionsPage;
  
