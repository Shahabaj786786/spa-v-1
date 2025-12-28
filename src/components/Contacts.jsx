import React from 'react';
import './CommonStyles.css';

const Contacts = () => {
  return (
    <div className="module-container">
      <div className="module-header">
        <h2>Contacts Management</h2>
        <button className="add-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Add Contact
        </button>
      </div>
      
      <div className="module-tabs">
        <button className="tab-btn active">Customers</button>
        <button className="tab-btn">Suppliers</button>
        <button className="tab-btn">All Contacts</button>
      </div>

      <div className="module-content">
        <div className="placeholder-content">
          <h3>📇 Contacts Management</h3>
          <p>Manage customers and suppliers for your liquor store.</p>
          <div className="feature-list">
            <div className="feature-item">👥 Customer database with purchase history</div>
            <div className="feature-item">🏭 Supplier management and contact details</div>
            <div className="feature-item">📞 Contact information and communication logs</div>
            <div className="feature-item">🏷️ Customer categorization and tagging</div>
            <div className="feature-item">📊 Customer analytics and reporting</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
