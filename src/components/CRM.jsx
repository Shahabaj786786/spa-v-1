import React from 'react';
import './CommonStyles.css';

const CRM = () => {
  return (
    <div className="module-container">
      <div className="module-header">
        <h2>Customer Relationship Management</h2>
        <button className="add-btn">Add Campaign</button>
      </div>
      <div className="placeholder-content">
        <h3>🤝 CRM System</h3>
        <p>Manage customer relationships and marketing campaigns.</p>
      </div>
    </div>
  );
};

export default CRM;
