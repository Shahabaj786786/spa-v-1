import React from 'react';
import './CommonStyles.css';

const StockTransfers = () => {
  return (
    <div className="module-container">
      <div className="module-header">
        <h2>Stock Transfers</h2>
        <button className="add-btn">New Transfer</button>
      </div>
      <div className="placeholder-content">
        <h3>🔄 Stock Transfers</h3>
        <p>Manage stock transfers between locations.</p>
      </div>
    </div>
  );
};

export default StockTransfers;
