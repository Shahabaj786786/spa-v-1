import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  Users, 
  Settings, 
  PlusCircle, 
  Edit, 
  Menu, 
  X, 
  Calendar, 
  CheckSquare, 
  Calculator, 
  Bell, 
  User, 
  Search,
  TrendingUp,
  DollarSign,
  AlertCircle,
  Eye,
  ChevronRight,
  Home,
  CreditCard,
  FileText,
  Database,
  Mail,
  Globe
} from 'lucide-react';
import './WinsurfDashboard.css';

// Import components
import WinsurfHome from './components/WinsurfHome';
import AddProductFull from './components/AddProductFull';
import EditProductFull from './components/EditProductFull';

const WinsurfDashboard = () => {
  const [activePage, setActivePage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('today');

  const menuCategories = [
    {
      title: 'Main',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'add-product', label: 'Add Product', icon: PlusCircle },
        { id: 'edit-product', label: 'Edit Product', icon: Edit },
      ]
    },
    {
      title: 'Transactions',
      items: [
        { id: 'sales', label: 'Sales', icon: ShoppingCart },
        { id: 'purchases', label: 'Purchases', icon: Package },
        { id: 'payment-accounts', label: 'Payment Accounts', icon: CreditCard },
      ]
    },
    {
      title: 'Financial',
      items: [
        { id: 'accounting', label: 'Accounting', icon: Calculator },
        { id: 'expenses', label: 'Expenses', icon: DollarSign },
        { id: 'reports', label: 'Reports', icon: FileText },
      ]
    },
    {
      title: 'System',
      items: [
        { id: 'users', label: 'User Management', icon: Users },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'settings', label: 'Settings', icon: Settings },
      ]
    }
  ];

  const quickActions = [
    { icon: Calendar, label: 'Calendar', color: 'blue' },
    { icon: CheckSquare, label: 'To-Do', color: 'green' },
    { icon: Calculator, label: 'Profit', color: 'purple' },
    { icon: Bell, label: 'Notifications', color: 'orange' },
  ];

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <WinsurfHome />;
      case 'add-product':
        return <AddProductFull />;
      case 'edit-product':
        return <EditProductFull />;
      default:
        return <WinsurfHome />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const sidebarVariants = {
    open: {
      x: 0,
      width: '280px',
      transition: {
        duration: 0.3,
        ease: [0.04, 0.62, 0.23, 0.98]
      }
    },
    closed: {
      x: -20,
      width: '80px',
      transition: {
        duration: 0.3,
        ease: [0.04, 0.62, 0.23, 0.98]
      }
    }
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.04, 0.62, 0.23, 0.98]
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <motion.div 
      className="winsurf-dashboard"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Top Navbar */}
      <motion.nav 
        className="top-navbar"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="navbar-left">
          <motion.button 
            className="menu-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
          <div className="brand-section">
            <h1 className="brand-title">Winsurf Admin</h1>
            <span className="brand-subtitle">Premium Management Panel</span>
          </div>
        </div>
        
        <div className="navbar-center">
          <div className="date-filter">
            <select 
              value={dateFilter} 
              onChange={(e) => setDateFilter(e.target.value)}
              className="date-select"
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
          </div>
        </div>

        <div className="navbar-right">
          {/* Quick Actions */}
          <div className="quick-actions">
            {quickActions.map((action, index) => (
              <motion.button
                key={action.label}
                className={`quick-action-btn ${action.color}`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <action.icon size={16} />
                <span>{action.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Search */}
          <div className="search-container">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          
          {/* Notifications */}
          <motion.button 
            className="notification-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bell size={20} />
            {notifications > 0 && (
              <motion.span 
                className="notification-badge"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500 }}
              >
                {notifications}
              </motion.span>
            )}
          </motion.button>
          
          {/* User Profile */}
          <motion.div 
            className="user-profile"
            whileHover={{ scale: 1.02 }}
          >
            <div className="user-avatar">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" alt="User" />
            </div>
            <div className="user-info">
              <span className="user-name">John Doe</span>
              <span className="user-role">Administrator</span>
            </div>
            <ChevronRight size={16} className="dropdown-icon" />
          </motion.div>
        </div>
      </motion.nav>

      <div className="dashboard-body">
        {/* Sidebar */}
        <motion.aside 
          className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}
          variants={sidebarVariants}
          animate={sidebarOpen ? 'open' : 'closed'}
        >
          <div className="sidebar-content">
            <nav className="sidebar-nav">
              {menuCategories.map((category, categoryIndex) => (
                <motion.div 
                  key={category.title}
                  className="nav-category"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: categoryIndex * 0.1 }}
                >
                  {sidebarOpen && (
                    <motion.h3 
                      className="category-title"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: categoryIndex * 0.1 + 0.1 }}
                    >
                      {category.title}
                    </motion.h3>
                  )}
                  {category.items.map((item, itemIndex) => {
                    const Icon = item.icon;
                    return (
                      <motion.button
                        key={item.id}
                        className={`nav-item ${activePage === item.id ? 'active' : ''}`}
                        onClick={() => setActivePage(item.id)}
                        whileHover={{ scale: 1.02, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: categoryIndex * 0.1 + itemIndex * 0.05 }}
                      >
                        <Icon size={20} className="nav-icon" />
                        <AnimatePresence>
                          {sidebarOpen && (
                            <motion.span 
                              className="nav-label"
                              initial={{ opacity: 0, width: 0 }}
                              animate={{ opacity: 1, width: 'auto' }}
                              exit={{ opacity: 0, width: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              {item.label}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </motion.button>
                    );
                  })}
                </motion.div>
              ))}
            </nav>
          </div>
        </motion.aside>

        {/* Main Content */}
        <main className="main-content">
          <motion.div 
            className="content-wrapper"
            variants={pageVariants}
            key={activePage}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {renderPage()}
          </motion.div>
        </main>
      </div>
    </motion.div>
  );
};

export default WinsurfDashboard;
