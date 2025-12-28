import React from 'react';
import './CommonStyles.css';

const Expenses = () => {
  return (
    <div className="module-container">
      <div className="module-header">
        <h2>Expense Management</h2>
        <button className="add-btn">Add Expense</button>
      </div>
      <div className="placeholder-content">
        <h3>💸 Expense Management</h3>
        <p>Track and manage business expenses.</p>
      </div>
    </div>
  );
};

export default Expenses;
