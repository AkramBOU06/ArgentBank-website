// src/pages/ErrorPage.jsx
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ErrorPage = () => {
  return (
    <>
      <Header />
      <main className="main bg-dark">
        <section className="error-content">
          <h1>404</h1>
          <p>Page not found</p>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ErrorPage;
