import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import './Contacts.css';

const Contacts = () => {
  const location = useLocation();
  
  // Determine active tab based on current route
  const getActiveTab = () => {
    const path = location.pathname;
    if (path.includes('customer-groups')) return 'customer-groups';
    if (path.includes('import')) return 'import';
    if (path.includes('reports')) return 'reports';
    return 'contacts';
  };
  
  const activeTab = getActiveTab();

  return (
    <div className="contacts-container">
      {/* Header */}
      <div className="contacts-header">
        <div className="breadcrumb">
          <Link to="/">Home</Link> / <span>Contacts</span>
        </div>
        <div className="header-actions">
          <button className="btn btn-primary">
            <span>+</span> Add
          </button>
          <button className="btn btn-secondary">
            <span>⚙️</span> Settings
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="contacts-tabs">
        <Link 
          to="/contacts" 
          className={`tab-btn ${activeTab === 'contacts' ? 'active' : ''}`}
        >
          Contacts
        </Link>
        <Link 
          to="/contacts/customer-groups" 
          className={`tab-btn ${activeTab === 'customer-groups' ? 'active' : ''}`}
        >
          Customer Groups
        </Link>
        <Link 
          to="/contacts/import" 
          className={`tab-btn ${activeTab === 'import' ? 'active' : ''}`}
        >
          Import Contacts
        </Link>
        <Link 
          to="/contacts/reports" 
          className={`tab-btn ${activeTab === 'reports' ? 'active' : ''}`}
        >
          Reports
        </Link>
      </div>

      <Outlet />
    </div>
  );
};

export default Contacts;
