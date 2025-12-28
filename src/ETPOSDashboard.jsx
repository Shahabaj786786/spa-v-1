import React, { useState, useEffect, useRef } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
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

// Icons as emojis to avoid external dependencies
const Icons = {
  Calendar: () => '📅',
  Plus: () => '➕',
  Compass: () => '🧭',
  Calculator: () => '🧮',
  DollarSign: () => '💲',
  Bell: () => '🔔',
  QuestionCircle: () => '❓'
};

const ETPOSDashboard = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString());
  const [openMenus, setOpenMenus] = useState({});

  const menuCategories = [
    {
      title: 'Main',
      items: [
        { id: 'home', label: 'Home', icon: '🏠' },
        {
          id: 'user-management',
          label: 'User Management',
          icon: '👥',
          isOpen: false,
          subItems: [
            { id: 'users', label: 'Users', icon: '👤', route: '/users' },
            { id: 'roles', label: 'Roles', icon: '🔐', route: '/users/roles' },            { id: 'sales-commission', label: 'Sales Commission Agents', icon: '➕', route: '/users/sales-commission-agents' },          ],
        },
        {
          id: 'contacts',
          label: 'Contacts',
          icon: '📇',
          isOpen: false,
          subItems: [
            { id: 'customers', label: 'Customers', icon: '👥', route: '/contacts/customers' },
            { id: 'suppliers', label: 'Suppliers', icon: '🏢', route: '/contacts/suppliers' },
            { id: 'customer-groups', label: 'Customer Groups', icon: '👥', route: '/contacts/customer-groups' },
            { id: 'import-contacts', label: 'Import Contacts', icon: '📥', route: '/contacts/import' }
          ]
        },
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

    const location = useLocation();
  const navigate = useNavigate();

  // Toggle submenu
  const toggleMenu = (menuId) => {
    setOpenMenus(prev => ({
      ...prev,
      [menuId]: !prev[menuId]
    }));
  };

  // Update active tab based on URL
  useEffect(() => {
    const pathname = location.pathname;

    if (pathname === '/' || pathname === '/home') {
      setActiveTab('home');
      return;
    }

    // Handle User Management routes
    if (pathname.startsWith('/users')) {
      // Open the user management menu when on users/roles/sales pages
      if (!openMenus['user-management']) {
        setOpenMenus(prev => ({ ...prev, 'user-management': true }));
      }

      // Map the path's last segment to submenu ids (roles, sales-commission, users)
      const parts = pathname.split('/').filter(Boolean);
      const last = parts[parts.length - 1];

      if (last === 'roles') {
        setActiveTab('roles');
      } else if (last === 'sales-commission-agents') {
        setActiveTab('sales-commission');
      } else if (last === 'add' || last === 'users') {
        setActiveTab('users');
      } else {
        // Fallback: try to match by exact route on subItems
        const userMenu = menuCategories.find(c => c.items.some(i => i.id === 'user-management'));
        const sub = userMenu?.items.find(i => i.subItems)?.subItems?.find(s => s.route === pathname);
        if (sub) setActiveTab(sub.id);
        else setActiveTab('users');
      }
      return;
    }

    // Handle Contacts routes
    if (pathname.startsWith('/contacts')) {
      // Open the contacts menu when on any contacts subpage
      if (!openMenus['contacts']) {
        setOpenMenus(prev => ({ ...prev, 'contacts': true }));
      }

      // Map the path to the appropriate submenu item
      const parts = pathname.split('/').filter(Boolean);
      const last = parts[parts.length - 1];

      if (last === 'customer-groups') {
        setActiveTab('customer-groups');
      } else if (last === 'import') {
        setActiveTab('import-contacts');
      } else if (last === 'reports') {
        setActiveTab('contacts-reports');
      } else if (last === 'contacts') {
        setActiveTab('contacts-list');
      } else {
        // Fallback: try to match by exact route on subItems
        const contactsMenu = menuCategories.find(c => c.items.some(i => i.id === 'contacts'));
        const sub = contactsMenu?.items.find(i => i.subItems)?.subItems?.find(s => s.route === pathname);
        if (sub) setActiveTab(sub.id);
        else setActiveTab('contacts-list');
      }
      return;
    }

    const path = pathname.split('/').filter(Boolean).pop();
    if (path) {
      setActiveTab(path);
    }
  }, [location]);

  const handleTabChange = (tabId, route, parentId = null) => {
    setActiveTab(tabId);
    
    // If there's a parent menu (like 'contacts' or 'user-management'), open it
    if (parentId && !openMenus[parentId]) {
      setOpenMenus(prev => ({ ...prev, [parentId]: true }));
    }
    
    if (route) {
      navigate(route);
    } else {
      navigate(`/${tabId}`);
    }
  };

  const handleSubTabChange = (parentTabId, route) => {
    setActiveTab(parentTabId);
    navigate(route);
  };

  const renderContent = () => {
    // If we're on a nested route, render the outlet
    if (
      location.pathname.startsWith('/users') ||
      location.pathname.startsWith('/contacts')
    ) {
      return <Outlet />;
    }

    // Otherwise render the tab content as before
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

  // Tooltip component
  const Tooltip = ({ text, children }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const buttonRef = useRef(null);

    const showTooltip = () => {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setPosition({
          top: rect.bottom + window.scrollY + 5,
          left: rect.left + rect.width / 2 + window.scrollX
        });
      }
      setIsVisible(true);
    };

    const hideTooltip = () => setIsVisible(false);

    return (
      <div className="tooltip-container">
        <div
          ref={buttonRef}
          onMouseEnter={showTooltip}
          onMouseLeave={hideTooltip}
          onFocus={showTooltip}
          onBlur={hideTooltip}
        >
          {children}
        </div>
        {isVisible && (
          <div 
            className="tooltip"
            style={{
              top: `${position.top}px`,
              left: `${position.left}px`,
              transform: 'translateX(-50%)'
            }}
          >
            {text}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="etpos-dashboard">
      {/* Header */}
      <header className="etpos-header">
        <div className="header-left">
          <button 
            className="menu-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle menu"
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
          <div className="quick-actions">
            <Tooltip text="Calendar">
              <button className="action-btn">
                <span style={{fontSize: '20px'}}><Icons.Calendar /></span>
              </button>
            </Tooltip>
            <Tooltip text="Add To Do">
              <button className="action-btn">
                <span style={{fontSize: '20px'}}><Icons.Plus /></span>
              </button>
            </Tooltip>
            <Tooltip text="Application Tour">
              <button className="action-btn">
                <span style={{fontSize: '20px'}}><Icons.Compass /></span>
              </button>
            </Tooltip>
            <Tooltip text="Calculator">
              <button className="action-btn">
                <span style={{fontSize: '20px'}}><Icons.Calculator /></span>
              </button>
            </Tooltip>
            <Tooltip text="Today's Profit">
              <button className="action-btn profit">
                <span style={{fontSize: '20px'}}><Icons.DollarSign /></span>
              </button>
            </Tooltip>
          </div>
        </div>

        <div className="header-right">
          <div className="notification-section">
            <Tooltip text="Notifications">
              <button className="notification-btn">
                <span style={{fontSize: '20px'}}><Icons.Bell /></span>
                <span className="notification-badge">3</span>
              </button>
            </Tooltip>
            <span className="notification-date">Today</span>
          </div>
          
          <div className="user-section">
            <Tooltip text="Help">
              <button className="help-btn">
                <span style={{fontSize: '20px'}}><Icons.QuestionCircle /></span>
              </button>
            </Tooltip>
            <div className="user-avatar">
              AG
            </div>
            <span className="user-name">Ajay Gogia</span>
          </div>
        </div>
      </header>

      <div className={`etpos-body ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        {/* Sidebar */}
        <aside className={`etpos-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
          <div className="sidebar-content">
            {menuCategories.map((category) => (
              <div key={category.title} className="sidebar-category">
                <h3 className="category-title">{category.title}</h3>
                <ul className="menu-items">
                  {category.items.map((item) => (
                    <React.Fragment key={item.id}>
                      <li 
                        className={`menu-item ${activeTab === item.id ? 'active' : ''} ${item.subItems ? 'has-submenu' : ''}`}
                        onClick={() => {
                          if (item.subItems) {
                            toggleMenu(item.id);
                          } else {
                            handleTabChange(item.id, item.route);
                          }
                        }}
                      >
                        <span className="menu-icon">{item.icon}</span>
                        <span className="menu-label">{item.label}</span>
                        {item.subItems && (
                          <span className={`menu-arrow ${openMenus[item.id] ? 'open' : ''}`}>›</span>
                        )}
                      </li>
                      {item.subItems && openMenus[item.id] && (
                        <div className="submenu">
                          {item.subItems.map(subItem => (
                            <li 
                              key={subItem.id}
                              className={`submenu-item ${activeTab === subItem.id ? 'active' : ''}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleTabChange(subItem.id, subItem.route);
                              }}
                            >
                              <span className="submenu-icon">{subItem.icon}</span>
                              <span className="submenu-label">{subItem.label}</span>
                            </li>
                          ))}
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="sidebar-footer">
            <button className="sidebar-toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? '◀ Collapse Sidebar' : '▶ Expand'}
            </button>
          </div>
        </aside>

        <div
          className={`sidebar-overlay ${sidebarOpen ? 'open' : ''}`}
          onClick={() => setSidebarOpen(false)}
        />

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
