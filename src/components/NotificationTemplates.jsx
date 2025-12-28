import React from 'react';
import './CommonStyles.css';

const NotificationTemplates = () => {
  return (
    <div className="module-container">
      <div className="module-header">
        <h2>Notification Templates</h2>
        <button className="add-btn">Create Template</button>
      </div>
      <div className="placeholder-content">
        <h3>📧 Notification Templates</h3>
        <p>Manage email and SMS notification templates.</p>
      </div>
    </div>
  );
};

export default NotificationTemplates;
