import React from 'react';
import './CommonStyles.css';

const Accounting = () => {
  return (
    <div className="module-container">
      <div className="module-header">
        <h2>Accounting</h2>
        <button className="add-btn">New Transaction</button>
      </div>
      <div className="placeholder-content">
        <h3>📊 Accounting</h3>
        <p>Financial accounting and bookkeeping.</p>
      </div>
    </div>
  );
};

export default Accounting;
