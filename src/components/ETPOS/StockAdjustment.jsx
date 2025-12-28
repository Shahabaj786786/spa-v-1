import React from 'react';
import './CommonStyles.css';

const StockAdjustment = () => {
  return (
    <div className="module-container">
      <div className="module-header">
        <h2>Stock Adjustment</h2>
        <button className="add-btn">New Adjustment</button>
      </div>
      <div className="placeholder-content">
        <h3>⚖️ Stock Adjustment</h3>
        <p>Adjust stock levels and manage inventory corrections.</p>
      </div>
    </div>
  );
};

export default StockAdjustment;
