import React, { useState } from 'react';
import './AdminDashboard.css';
import DashboardHome from './components/DashboardHome';
import AddProduct from './AddProduct';
import EditProduct from './components/EditProduct';
import ViewProducts from './components/ViewProducts';
import Settings from './components/Settings';

const AdminDashboard = () => {
  const [activePage, setActivePage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifications] = useState(3);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
    { id: 'add-product', label: 'Add Product', icon: 'PlusCircle' },
    { id: 'edit-product', label: 'Edit Product', icon: 'Edit' },
    { id: 'view-products', label: 'View Products', icon: 'Package' },
    { id: 'settings', label: 'Settings', icon: 'Settings' },
  ];

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <DashboardHome />;
      case 'add-product':
        return <AddProduct />;
      case 'edit-product':
        return <EditProduct />;
      case 'view-products':
        return <ViewProducts />;
      case 'settings':
        return <Settings />;
      default:
        return <DashboardHome />;
    }
  };

  const renderIcon = (iconName) => {
    const icons = {
      LayoutDashboard: (
        <svg className="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7"></rect>
          <rect x="14" y="3" width="7" height="7"></rect>
          <rect x="14" y="14" width="7" height="7"></rect>
          <rect x="3" y="14" width="7" height="7"></rect>
        </svg>
      ),
      PlusCircle: (
        <svg className="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="16"></line>
          <line x1="8" y1="12" x2="16" y2="12"></line>
        </svg>
      ),
      Edit: (
        <svg className="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
        </svg>
      ),
      Package: (
        <svg className="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line>
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
        </svg>
      ),
      Settings: (
        <svg className="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M12 1v6m0 6v6m4.22-13.22l4.24 4.24M1.54 9.96l4.24 4.24M1 12h6m6 0h6m-13.22 4.22l4.24-4.24M18.46 14.04l4.24-4.24"></path>
        </svg>
      ),
    };
    return icons[iconName] || null;
  };

  return (
    <div className="admin-dashboard">
      {/* Top Navbar */}
      <nav className="top-navbar">
        <div className="navbar-left">
          <button 
            className="menu-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
          <h1 className="brand-title">Product Admin</h1>
        </div>
        
        <div className="navbar-right">
          {/* Search */}
          <div className="search-box">
            <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input type="text" placeholder="Search products..." />
          </div>
          
          {/* Notifications */}
          <button className="notification-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
            {notifications > 0 && (
              <span className="notification-badge">{notifications}</span>
            )}
          </button>
          
          {/* User Profile */}
          <div className="user-profile">
            <div className="user-avatar">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" alt="User" />
            </div>
            <div className="user-info">
              <span className="user-name">John Doe</span>
              <span className="user-role">Administrator</span>
            </div>
            <button className="profile-dropdown">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6,9 12,15 18,9"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <div className="dashboard-body">
        {/* Sidebar */}
        <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
          <div className="sidebar-content">
            <div className="sidebar-header">
              <h2>Navigation</h2>
            </div>
            <nav className="sidebar-nav">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  className={`nav-item ${activePage === item.id ? 'active' : ''}`}
                  onClick={() => setActivePage(item.id)}
                >
                  {renderIcon(item.icon)}
                  <span className="nav-label">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          <div className="content-wrapper">
            {renderPage()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
