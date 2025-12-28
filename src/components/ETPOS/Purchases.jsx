import React from 'react';
import './CommonStyles.css';

const Purchases = () => {
  return (
    <div className="module-container">
      <div className="module-header">
        <h2>Purchase Management</h2>
        <button className="add-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          New Purchase
        </button>
      </div>
      
      <div className="module-tabs">
        <button className="tab-btn active">Purchase Orders</button>
        <button className="tab-btn">Purchase Requisition</button>
        <button className="tab-btn">Purchase Returns</button>
        <button className="tab-btn">Supplier Payments</button>
      </div>

      <div className="module-content">
        <div className="placeholder-content">
          <h3>🛒 Purchase Management</h3>
          <p>Manage all your purchase operations and supplier relationships.</p>
          <div className="feature-list">
            <div className="feature-item">📋 Purchase order creation and tracking</div>
            <div className="feature-item">📦 Purchase requisition workflow</div>
            <div className="feature-item">🔄 Purchase returns and refunds</div>
            <div className="feature-item">💳 Supplier payment management</div>
            <div className="feature-item">📊 Purchase analytics and reporting</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Purchases;
