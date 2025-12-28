import React, { useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import './Contacts.css';

const Reports = () => {
  const [activeReport, setActiveReport] = useState('customer-distribution');
  const [dateRange, setDateRange] = useState('this_month');

  // Sample data for reports
  const reportsData = {
    'customer-distribution': {
      title: 'Customer Distribution',
      type: 'pie',
      data: {
        labels: ['Retail', 'Wholesale', 'VIP', 'Corporate', 'Other'],
        datasets: [{
          data: [45, 25, 15, 10, 5],
          backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0', '#9966FF']
        }]
      }
    },
    'customer-growth': {
      title: 'Customer Growth',
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'New Customers',
          data: [12, 19, 15, 25, 22, 30],
          backgroundColor: '#36A2EB'
        }]
      }
    },
    'contact-types': {
      title: 'Contact Types',
      type: 'bar',
      data: {
        labels: ['Customers', 'Suppliers', 'Both'],
        datasets: [{
          label: 'Count',
          data: [150, 45, 22],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }]
      }
    }
  };

  const renderReport = () => {
    const report = reportsData[activeReport];
    if (!report) return null;

    return (
      <div className="report-content">
        <div className="report-header">
          <h3>{report.title}</h3>
          <div className="report-actions">
            <select 
              className="date-range-select"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="this_week">This Week</option>
              <option value="last_week">Last Week</option>
              <option value="this_month" selected>This Month</option>
              <option value="last_month">Last Month</option>
              <option value="this_year">This Year</option>
              <option value="custom">Custom Range</option>
            </select>
            <button className="btn btn-secondary">
              <span>📥</span> Export
            </button>
            <button className="btn btn-secondary">
              <span>🖨️</span> Print
            </button>
          </div>
        </div>

        <div className="report-chart">
          {report.type === 'pie' ? (
            <Pie 
              data={report.data} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'right'
                  }
                }
              }}
            />
          ) : (
            <Bar 
              data={report.data} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true
                  }
                }
              }}
            />
          )}
        </div>

        <div className="report-summary">
          <div className="summary-card">
            <div className="summary-value">217</div>
            <div className="summary-label">Total Contacts</div>
          </div>
          <div className="summary-card">
            <div className="summary-value">150</div>
            <div className="summary-label">Customers</div>
          </div>
          <div className="summary-card">
            <div className="summary-value">45</div>
            <div className="summary-label">Suppliers</div>
          </div>
          <div className="summary-card">
            <div className="summary-value">22</div>
            <div className="summary-label">Both</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="reports-container">
      <div className="reports-sidebar">
        <h3>Contact Reports</h3>
        <ul className="report-list">
          <li 
            className={`report-item ${activeReport === 'customer-distribution' ? 'active' : ''}`}
            onClick={() => setActiveReport('customer-distribution')}
          >
            Customer Distribution
          </li>
          <li 
            className={`report-item ${activeReport === 'customer-growth' ? 'active' : ''}`}
            onClick={() => setActiveReport('customer-growth')}
          >
            Customer Growth
          </li>
          <li 
            className={`report-item ${activeReport === 'contact-types' ? 'active' : ''}`}
            onClick={() => setActiveReport('contact-types')}
          >
            Contact Types
          </li>
          <li className="report-category">Customer Groups</li>
          <li className="report-item">Group Performance</li>
          <li className="report-item">Group Comparison</li>
          <li className="report-category">Sales</li>
          <li className="report-item">Customer Sales</li>
          <li className="report-item">Sales by Group</li>
          <li className="report-category">Other</li>
          <li className="report-item">Contact Activity</li>
          <li className="report-item">Contact Notes</li>
        </ul>
      </div>
      
      <div className="reports-main">
        {renderReport()}
      </div>
    </div>
  );
};

export default Reports;
