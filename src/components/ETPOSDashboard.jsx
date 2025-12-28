import React, { useState } from 'react';
import './ETPOSDashboard.css';
import Home from './components/ETPOS/Home';
import UserManagement from './components/UserManagement';
import Contacts from './components/ETPOS/Contacts';
import Products from './components/ETPOS/Products';
import Purchases from './components/ETPOS/Purchases';
import Sell from './components/ETPOS/Sell';
import StockTransfers from './components/ETPOS/StockTransfers';
import StockAdjustment from './components/ETPOS/StockAdjustment';
import Expenses from './components/ETPOS/Expenses';
import PaymentAccounts from './components/ETPOS/PaymentAccounts';
import Accounting from './components/ETPOS/Accounting';
import Reports from './components/ETPOS/Reports';
import NotificationTemplates from './components/ETPOS/NotificationTemplates';
import Settings from './components/ETPOS/Settings';
import CRM from './components/ETPOS/CRM';
import WoocommerceConnector from './components/ETPOS/WoocommerceConnector';

const ETPOSDashboard = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString());

  const menuCategories = [
    {
      title: 'Main',
      items: [
        { id: 'home', label: 'Home', icon: '🏠' },
        { id: 'users', label: 'User Management', icon: '👥' },
        { id: 'contacts', label: 'Contacts', icon: '📇' },
        { id: 'products', label: 'Products', icon: '📦' },
      ]
    },
    {
      title: 'Transactions',
      items: [
        { id: 'purchases', label: 'Purchases', icon: '🛒' },
        { id: 'sell', label: 'Sell', icon: '💰' },
        { id: 'stock-transfers', label: 'Stock Transfers', icon: '🔄' },
        { id: 'stock-adjustment', label: 'Stock Adjustment', icon: '⚖️' },
      ]
    },
    {
      title: 'Financial',
      items: [
        { id: 'expenses', label: 'Expenses', icon: '💸' },
        { id: 'payment-accounts', label: 'Payment Accounts', icon: '💳' },
        { id: 'accounting', label: 'Accounting', icon: '📊' },
        { id: 'reports', label: 'Reports', icon: '📈' },
      ]
    },
    {
      title: 'System',
      items: [
        { id: 'notification-templates', label: 'Notification Templates', icon: '📧' },
        { id: 'settings', label: 'Settings', icon: '⚙️' },
        { id: 'crm', label: 'CRM', icon: '🤝' },
        { id: 'woocommerce', label: 'Woocommerce Connector', icon: '🌐' },
      ]
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <Home />;
      case 'users': return <UserManagement />;
      case 'contacts': return <Contacts />;
      case 'products': return <Products />;
      case 'purchases': return <Purchases />;
      case 'sell': return <Sell />;
      case 'stock-transfers': return <StockTransfers />;
      case 'stock-adjustment': return <StockAdjustment />;
      case 'expenses': return <Expenses />;
      case 'payment-accounts': return <PaymentAccounts />;
      case 'accounting': return <Accounting />;
      case 'reports': return <Reports />;
      case 'notification-templates': return <NotificationTemplates />;
      case 'settings': return <Settings />;
      case 'crm': return <CRM />;
      case 'woocommerce': return <WoocommerceConnector />;
      default: return <Home />;
    }
  };

  return (
    <div className="etpos-dashboard">
      {/* Header */}
      <header className="etpos-header">
        <div className="header-left">
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
          <h1 className="store-title">Lefty's Liquor</h1>
        </div>
        
        <div className="header-center">
          <div className="date-filter">
            <span>Filter by date</span>
            <input type="date" defaultValue={currentDate} />
          </div>
        </div>

        <div className="header-right">
          <button className="header-btn calendar-btn" title="Calendar">
            <span>📅</span>
            <span className="d-none d-md-inline ms-1">Calendar</span>
          </button>
          <button className="header-btn todo-btn" title="Add To Do">
            <span>➕</span>
            <span className="d-none d-md-inline ms-1">Add To Do</span>
          </button>
          <button className="header-btn tour-btn" title="Application Tour">
            <span>🎯</span>
            <span className="d-none d-md-inline ms-1">Application Tour</span>
          </button>
          <button className="header-btn calculator-btn" title="Calculator">
            <span>🧮</span>
            <span className="d-none d-md-inline ms-1">Calculator</span>
          </button>
          <button className="header-btn profit-btn" title="Today's Profit">
            <span>💰</span>
            <span className="d-none d-md-inline ms-1">Today's Profit</span>
          </button>
          <div className="notification-section">
            <button className="notification-btn">
              🔔
              <span className="notification-badge">3</span>
            </button>
            <span className="notification-date d-none d-md-inline">11/11/2025</span>
          </div>
          <div className="user-section">
            <span className="user-name d-none d-md-inline">Ajay Gogia</span>
            <div className="user-avatar">AG</div>
          </div>
        </div>
      </header>

      <div className="etpos-body">
        {/* Sidebar */}
        <aside className={`etpos-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
          <div className="sidebar-content">
            {menuCategories.map((category, index) => (
              <div key={index} className="menu-category">
                <div className="category-title">{category.title}</div>
                {category.items.map((item) => (
                  <button
                    key={item.id}
                    className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                    onClick={() => setActiveTab(item.id)}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    <span className="nav-label">{item.label}</span>
                  </button>
                ))}
              </div>
            ))}
          </div>
          
          <div className="sidebar-footer">
            <button className="sidebar-toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? '◀ Collapse Sidebar' : '▶ Expand'}
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="etpos-main-content">
          <div className="content-wrapper">
            {renderContent()}
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="etpos-footer">
        <span>et-pos - V6.2 | Copyright © 2025 All rights reserved.</span>
      </footer>
    </div>
  );
};

export default ETPOSDashboard;
