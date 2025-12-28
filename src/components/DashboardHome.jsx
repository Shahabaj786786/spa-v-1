import React, { useState } from 'react';
import './DashboardHome.css';

const DashboardHome = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  
  const metrics = [
    {
      title: 'Total Products',
      value: '2,847',
      change: '+12.5%',
      trend: 'up',
      icon: 'Package',
      color: 'blue'
    },
    {
      title: 'Active Listings',
      value: '1,923',
      change: '+8.2%',
      trend: 'up',
      icon: 'ShoppingCart',
      color: 'green'
    },
    {
      title: 'Total Sales',
      value: '$84,295',
      change: '+23.1%',
      trend: 'up',
      icon: 'DollarSign',
      color: 'purple'
    },
    {
      title: 'Active Users',
      value: '1,429',
      change: '+5.7%',
      trend: 'up',
      icon: 'Users',
      color: 'orange'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      user: 'Sarah Johnson',
      action: 'added new product',
      target: 'Premium Wireless Headphones',
      time: '2 minutes ago',
      avatar: 'SJ',
      color: 'blue'
    },
    {
      id: 2,
      user: 'Mike Chen',
      action: 'updated inventory for',
      target: 'Smart Watch Series 6',
      time: '15 minutes ago',
      avatar: 'MC',
      color: 'green'
    },
    {
      id: 3,
      user: 'Emily Davis',
      action: 'deleted product',
      target: 'Old Model Laptop',
      time: '1 hour ago',
      avatar: 'ED',
      color: 'purple'
    },
    {
      id: 4,
      user: 'Alex Wilson',
      action: 'modified pricing for',
      target: 'Gaming Mouse RGB',
      time: '2 hours ago',
      avatar: 'AW',
      color: 'orange'
    },
    {
      id: 5,
      user: 'Lisa Anderson',
      action: 'added new category',
      target: 'Smart Home Devices',
      time: '3 hours ago',
      avatar: 'LA',
      color: 'pink'
    }
  ];

  const salesData = [
    { month: 'Jan', sales: 45000, target: 40000 },
    { month: 'Feb', sales: 52000, target: 45000 },
    { month: 'Mar', sales: 48000, target: 50000 },
    { month: 'Apr', sales: 61000, target: 55000 },
    { month: 'May', sales: 55000, target: 60000 },
    { month: 'Jun', sales: 67000, target: 65000 },
  ];

  const topProducts = [
    { name: 'Wireless Headphones Pro', sales: 1234, revenue: '$61,700', growth: '+15%' },
    { name: 'Smart Watch Series 6', sales: 987, revenue: '$49,350', growth: '+12%' },
    { name: 'Gaming Laptop Ultra', sales: 756, revenue: '$75,600', growth: '+8%' },
    { name: 'Bluetooth Speaker Max', sales: 645, revenue: '$19,350', growth: '+22%' },
    { name: 'Fitness Tracker Plus', sales: 523, revenue: '$15,690', growth: '+18%' },
  ];

  const renderIcon = (iconName, color = 'currentColor') => {
    const icons = {
      Package: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
          <path d="M16.5 9.4L7.5 4.21"></path>
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
        </svg>
      ),
      ShoppingCart: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
      ),
      DollarSign: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
          <line x1="12" y1="1" x2="12" y2="23"></line>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
        </svg>
      ),
      Users: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
    };
    return icons[iconName] || null;
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

  return (
    <div className="dashboard-home">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard Overview</h1>
          <p className="page-subtitle">Welcome back! Here's what's happening with your products today.</p>
        </div>
        <div className="period-selector">
          <select 
            value={selectedPeriod} 
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="period-select"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="metrics-grid">
        {metrics.map((metric, index) => (
          <div key={index} className={`metric-card metric-${metric.color}`}>
            <div className="metric-header">
              <div className="metric-icon">
                {renderIcon(metric.icon)}
              </div>
              <div className="metric-change">
                <span className="change-value">{metric.change}</span>
                <svg className="trend-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="23,6 13.5,15.5 8.5,10.5 1,18"></polyline>
                  <polyline points="17,6 23,6 23,12"></polyline>
                </svg>
              </div>
            </div>
            <div className="metric-content">
              <h3 className="metric-value">{metric.value}</h3>
              <p className="metric-title">{metric.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Activity Section */}
      <div className="dashboard-grid">
        {/* Sales Chart */}
        <div className="chart-card">
          <div className="card-header">
            <h3 className="card-title">Sales Performance</h3>
            <div className="chart-actions">
              <button className="chart-action-btn">Export</button>
            </div>
          </div>
          <div className="chart-container">
            <div className="chart-placeholder">
              <div className="chart-bars">
                {salesData.map((data, index) => (
                  <div key={index} className="chart-bar-group">
                    <div className="chart-bar sales-bar" style={{ height: `${(data.sales / 70000) * 100}%` }}></div>
                    <div className="chart-bar target-bar" style={{ height: `${(data.target / 70000) * 100}%` }}></div>
                    <div className="chart-label">{data.month}</div>
                  </div>
                ))}
              </div>
              <div className="chart-legend">
                <div className="legend-item">
                  <div className="legend-color sales-color"></div>
                  <span>Actual Sales</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color target-color"></div>
                  <span>Target</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="activity-card">
          <div className="card-header">
            <h3 className="card-title">Recent Activity</h3>
            <button className="view-all-btn">View All</button>
          </div>
          <div className="activity-list">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="activity-item">
                <div className={`activity-avatar ${getAvatarColor(activity.color)}`}>
                  {activity.avatar}
                </div>
                <div className="activity-content">
                  <p className="activity-text">
                    <strong>{activity.user}</strong> {activity.action} <strong>{activity.target}</strong>
                  </p>
                  <span className="activity-time">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Products Table */}
      <div className="products-card">
        <div className="card-header">
          <h3 className="card-title">Top Performing Products</h3>
          <button className="view-all-btn">View All Products</button>
        </div>
        <div className="products-table">
          <div className="table-header">
            <div className="table-cell">Product Name</div>
            <div className="table-cell">Sales</div>
            <div className="table-cell">Revenue</div>
            <div className="table-cell">Growth</div>
          </div>
          <div className="table-body">
            {topProducts.map((product, index) => (
              <div key={index} className="table-row">
                <div className="table-cell product-name">
                  <div className="product-rank">{index + 1}</div>
                  <span>{product.name}</span>
                </div>
                <div className="table-cell">{product.sales}</div>
                <div className="table-cell revenue">{product.revenue}</div>
                <div className="table-cell">
                  <span className="growth-badge positive">{product.growth}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
