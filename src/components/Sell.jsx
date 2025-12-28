import React from 'react';
import './CommonStyles.css';

const Sell = () => {
  return (
    <div className="module-container">
      <div className="module-header">
        <h2>Sales Management</h2>
        <button className="add-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          New Sale
        </button>
      </div>
      
      <div className="module-tabs">
        <button className="tab-btn active">POS Sales</button>
        <button className="tab-btn">Sales Orders</button>
        <button className="tab-btn">Sales Returns</button>
        <button className="tab-btn">Customer Payments</button>
      </div>

      <div className="module-content">
        <div className="placeholder-content">
          <h3>💰 Sales Management</h3>
          <p>Complete point of sale system for your liquor store.</p>
          <div className="feature-list">
            <div className="feature-item">🖥️ Point of Sale interface</div>
            <div className="feature-item">🧾 Invoice generation and management</div>
            <div className="feature-item">💳 Multiple payment methods</div>
            <div className="feature-item">📱 Mobile and API integration</div>
            <div className="feature-item">📊 Sales analytics and reporting</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sell;
