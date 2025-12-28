import React from 'react';
import './CommonStyles.css';

const PaymentAccounts = () => {
  return (
    <div className="module-container">
      <div className="module-header">
        <h2>Payment Accounts</h2>
        <button className="add-btn">Add Account</button>
      </div>
      <div className="placeholder-content">
        <h3>💳 Payment Accounts</h3>
        <p>Manage payment methods and accounts.</p>
      </div>
    </div>
  );
};

export default PaymentAccounts;
