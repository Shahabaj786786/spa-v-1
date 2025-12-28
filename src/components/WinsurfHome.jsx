import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  DollarSign, 
  ShoppingCart, 
  Package, 
  AlertCircle, 
  Eye,
  Calendar,
  Users,
  CreditCard,
  FileText,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical
} from 'lucide-react';
import './WinsurfHome.css';

const WinsurfHome = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const [animatedMetrics, setAnimatedMetrics] = useState({
    totalSales: 0,
    netSales: 0,
    invoiceDue: 0,
    totalPurchase: 0,
    purchaseDue: 0,
    totalSellReturn: 0,
    totalPurchaseReturn: 0,
    expenses: 0,
  });

  const metrics = [
    {
      title: 'Total Sales',
      value: 125847.50,
      change: 12.5,
      trend: 'up',
      icon: DollarSign,
      gradient: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Net Sales',
      value: 98234.75,
      change: 8.3,
      trend: 'up',
      icon: TrendingUp,
      gradient: 'from-emerald-500 to-teal-500',
      bgColor: 'bg-emerald-50',
    },
    {
      title: 'Invoice Due',
      value: 15420.00,
      change: -3.2,
      trend: 'down',
      icon: FileText,
      gradient: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
    },
    {
      title: 'Total Purchase',
      value: 67890.25,
      change: 15.7,
      trend: 'up',
      icon: ShoppingCart,
      gradient: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Purchase Due',
      value: 8934.50,
      change: -5.1,
      trend: 'down',
      icon: AlertCircle,
      gradient: 'from-red-500 to-rose-500',
      bgColor: 'bg-red-50',
    },
    {
      title: 'Total Sell Return',
      value: 3456.75,
      change: 2.1,
      trend: 'up',
      icon: Package,
      gradient: 'from-indigo-500 to-blue-500',
      bgColor: 'bg-indigo-50',
    },
    {
      title: 'Total Purchase Return',
      value: 2234.25,
      change: -1.8,
      trend: 'down',
      icon: CreditCard,
      gradient: 'from-amber-500 to-orange-500',
      bgColor: 'bg-amber-50',
    },
    {
      title: 'Expenses',
      value: 12456.00,
      change: 6.4,
      trend: 'up',
      icon: TrendingUp,
      gradient: 'from-slate-500 to-gray-600',
      bgColor: 'bg-slate-50',
    },
  ];

  const recentActivity = [
    {
      id: 1,
      user: 'Sarah Johnson',
      action: 'added new product',
      target: 'Premium Wireless Headphones',
      time: '2 minutes ago',
      avatar: 'SJ',
      color: 'blue',
      type: 'success'
    },
    {
      id: 2,
      user: 'Mike Chen',
      action: 'updated inventory for',
      target: 'Smart Watch Series 6',
      time: '15 minutes ago',
      avatar: 'MC',
      color: 'green',
      type: 'info'
    },
    {
      id: 3,
      user: 'Emily Davis',
      action: 'processed payment for',
      target: 'Order #12345',
      time: '1 hour ago',
      avatar: 'ED',
      color: 'purple',
      type: 'success'
    },
    {
      id: 4,
      user: 'Alex Wilson',
      action: 'modified pricing for',
      target: 'Gaming Mouse RGB',
      time: '2 hours ago',
      avatar: 'AW',
      color: 'orange',
      type: 'warning'
    },
    {
      id: 5,
      user: 'Lisa Anderson',
      action: 'generated report',
      target: 'Monthly Sales Summary',
      time: '3 hours ago',
      avatar: 'LA',
      color: 'pink',
      type: 'info'
    }
  ];

  const stockAlerts = [
    { id: 1, name: '20 LBS ICE BAG', sku: 'TNKXMEBD', stock: -193, location: 'Main Store', status: 'critical' },
    { id: 2, name: '7 LBS ICE BAG', sku: '850484000108', stock: -149, location: 'Main Store', status: 'critical' },
    { id: 3, name: 'TITO\'S 50ML', sku: '619947000068', stock: -144, location: 'Main Store', status: 'critical' },
    { id: 4, name: 'NEW AMSTERDAM PINK WHITNEY', sku: '08567507', stock: -105, location: 'Main Store', status: 'critical' },
    { id: 5, name: '99 WATERMELON 50ML', sku: '089000991044', stock: -100, location: 'Main Store', status: 'critical' },
  ];

  const salesOrders = [
    { id: 1, orderNo: 'SO-001', customer: 'Walk-In Customer', date: '2024-01-15', amount: 125.50, status: 'completed' },
    { id: 2, orderNo: 'SO-002', customer: 'John Smith', date: '2024-01-15', amount: 89.99, status: 'pending' },
    { id: 3, orderNo: 'SO-003', customer: 'Sarah Johnson', date: '2024-01-14', amount: 234.75, status: 'completed' },
    { id: 4, orderNo: 'SO-004', customer: 'Mike Chen', date: '2024-01-14', amount: 156.25, status: 'processing' },
    { id: 5, orderNo: 'SO-005', customer: 'Emily Davis', date: '2024-01-13', amount: 78.50, status: 'completed' },
  ];

  // Animate metrics on mount
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setAnimatedMetrics({
        totalSales: metrics[0].value * progress,
        netSales: metrics[1].value * progress,
        invoiceDue: metrics[2].value * progress,
        totalPurchase: metrics[3].value * progress,
        purchaseDue: metrics[4].value * progress,
        totalSellReturn: metrics[5].value * progress,
        totalPurchaseReturn: metrics[6].value * progress,
        expenses: metrics[7].value * progress,
      });

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.04, 0.62, 0.23, 0.98]
      }
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const getAvatarColor = (color) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      orange: 'bg-orange-100 text-orange-600',
      pink: 'bg-pink-100 text-pink-600',
    };
    return colors[color] || colors.blue;
  };

  const getStatusColor = (status) => {
    const colors = {
      critical: 'text-red-600 bg-red-50',
      low: 'text-orange-600 bg-orange-50',
      medium: 'text-yellow-600 bg-yellow-50',
      good: 'text-green-600 bg-green-50',
      completed: 'text-green-600 bg-green-50',
      pending: 'text-orange-600 bg-orange-50',
      processing: 'text-blue-600 bg-blue-50',
    };
    return colors[status] || colors.medium;
  };

  return (
    <motion.div 
      className="winsurf-home"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Welcome Section */}
      <motion.div 
        className="welcome-section"
        variants={itemVariants}
      >
        <div className="welcome-content">
          <h1 className="welcome-title">
            Welcome back, John 👋
          </h1>
          <p className="welcome-subtitle">
            Here's what's happening with your store today
          </p>
        </div>
        <div className="welcome-actions">
          <motion.button 
            className="date-filter-btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Calendar size={16} />
            {selectedPeriod === 'today' && 'Today'}
            {selectedPeriod === 'week' && 'This Week'}
            {selectedPeriod === 'month' && 'This Month'}
            {selectedPeriod === 'year' && 'This Year'}
          </motion.button>
        </div>
      </motion.div>

      {/* Metrics Grid */}
      <motion.div 
        className="metrics-grid"
        variants={itemVariants}
      >
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          const animatedValue = Object.values(animatedMetrics)[index];
          
          return (
            <motion.div
              key={metric.title}
              className={`metric-card ${metric.bgColor}`}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02, 
                y: -4,
                boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="metric-header">
                <div className={`metric-icon bg-gradient-to-r ${metric.gradient}`}>
                  <Icon size={20} className="text-white" />
                </div>
                <div className={`metric-change ${metric.trend === 'up' ? 'positive' : 'negative'}`}>
                  {metric.trend === 'up' ? (
                    <ArrowUpRight size={16} />
                  ) : (
                    <ArrowDownRight size={16} />
                  )}
                  <span>{Math.abs(metric.change)}%</span>
                </div>
              </div>
              <div className="metric-content">
                <h3 className="metric-value">
                  {formatCurrency(animatedValue)}
                </h3>
                <p className="metric-title">{metric.title}</p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Charts and Activity Section */}
      <div className="dashboard-grid">
        {/* Sales Chart */}
        <motion.div 
          className="chart-card"
          variants={itemVariants}
          whileHover={{ y: -2 }}
        >
          <div className="card-header">
            <h3 className="card-title">Sales Performance</h3>
            <motion.button 
              className="card-action"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MoreVertical size={16} />
            </motion.button>
          </div>
          <div className="chart-container">
            <div className="chart-placeholder">
              <div className="chart-bars">
                {[65, 80, 45, 90, 75, 85, 95, 70, 60, 85, 75, 90].map((height, index) => (
                  <motion.div
                    key={index}
                    className="chart-bar"
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ delay: index * 0.05, duration: 0.5 }}
                    whileHover={{ opacity: 0.8 }}
                  />
                ))}
              </div>
              <div className="chart-labels">
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((label) => (
                  <span key={label} className="chart-label">{label}</span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div 
          className="activity-card"
          variants={itemVariants}
          whileHover={{ y: -2 }}
        >
          <div className="card-header">
            <h3 className="card-title">Recent Activity</h3>
            <motion.button 
              className="view-all-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All
            </motion.button>
          </div>
          <div className="activity-list">
            <AnimatePresence>
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  className="activity-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <div className={`activity-avatar ${getAvatarColor(activity.color)}`}>
                    {activity.avatar}
                  </div>
                  <div className="activity-content">
                    <p className="activity-text">
                      <strong>{activity.user}</strong> {activity.action} <strong>{activity.target}</strong>
                    </p>
                    <span className="activity-time">{activity.time}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Tables Section */}
      <div className="tables-grid">
        {/* Stock Alerts */}
        <motion.div 
          className="table-card"
          variants={itemVariants}
          whileHover={{ y: -2 }}
        >
          <div className="card-header">
            <h3 className="card-title">Product Stock Alert</h3>
            <motion.button 
              className="view-all-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All (488)
            </motion.button>
          </div>
          <div className="table-container">
            <div className="data-table">
              <div className="table-header">
                <div>Product</div>
                <div>SKU</div>
                <div>Stock</div>
                <div>Location</div>
                <div>Status</div>
              </div>
              <div className="table-body">
                {stockAlerts.map((alert, index) => (
                  <motion.div
                    key={alert.id}
                    className="table-row"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ x: 5, backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
                  >
                    <div className="product-name">{alert.name}</div>
                    <div className="sku">{alert.sku}</div>
                    <div className={`stock-value ${alert.status}`}>{alert.stock}</div>
                    <div>{alert.location}</div>
                    <div>
                      <span className={`status-badge ${getStatusColor(alert.status)}`}>
                        {alert.status}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Sales Orders */}
        <motion.div 
          className="table-card"
          variants={itemVariants}
          whileHover={{ y: -2 }}
        >
          <div className="card-header">
            <h3 className="card-title">Sales Orders</h3>
            <motion.button 
              className="view-all-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All
            </motion.button>
          </div>
          <div className="table-container">
            <div className="data-table">
              <div className="table-header">
                <div>Order No</div>
                <div>Customer</div>
                <div>Date</div>
                <div>Amount</div>
                <div>Status</div>
              </div>
              <div className="table-body">
                {salesOrders.map((order, index) => (
                  <motion.div
                    key={order.id}
                    className="table-row"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ x: 5, backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
                  >
                    <div className="order-no">{order.orderNo}</div>
                    <div>{order.customer}</div>
                    <div>{order.date}</div>
                    <div className="amount">{formatCurrency(order.amount)}</div>
                    <div>
                      <span className={`status-badge ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WinsurfHome;
