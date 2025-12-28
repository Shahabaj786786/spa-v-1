import React, { useState } from 'react';
import './Home.css';

const Home = () => {
  const [selectedLocation, setSelectedLocation] = useState('Lefty\'s Liquor (BL0001)');
  
  const salesMetrics = [
    { title: 'Total Sales', value: '$ 0.00', icon: '💰', color: 'blue' },
    { title: 'Net', value: '$ 0.00', icon: '📊', color: 'green' },
    { title: 'Invoice due', value: '$ 0.00', icon: '📄', color: 'orange' },
    { title: 'Total Sell Return', value: '$ 0.00', icon: '↩️', color: 'red' },
    { title: 'Total purchase', value: '$ 0.00', icon: '🛒', color: 'purple' },
    { title: 'Purchase due', value: '$ 0.00', icon: '⏰', color: 'yellow' },
    { title: 'Total Purchase Return', value: '$ 0.00', icon: '🔄', color: 'pink' },
    { title: 'Expense', value: '$ 0.00', icon: '💸', color: 'gray' },
  ];

  const salesData = {
    last30Days: [],
    currentYear: [],
    paymentDue: []
  };

  const purchaseData = {
    paymentDue: []
  };

  const checkPayments = [
    { customer: 'Walk-In Customer', invoiceNo: 'rgrdgertger mobile api', checkNumber: '', expiryDate: '', submissionDate: '', status: 'Pending' },
    { customer: 'Walk-In Customer', invoiceNo: '6656', checkNumber: '2323', expiryDate: '', submissionDate: '', status: 'Pending' },
    { customer: 'Shahabaj', invoiceNo: '965632', checkNumber: '695632', expiryDate: '', submissionDate: '', status: 'Pending' },
    { customer: 'Shahabaj', invoiceNo: '965632', checkNumber: '698565', expiryDate: '', submissionDate: '', status: 'Pending' },
    { customer: 'Shahabaj', invoiceNo: '965632', checkNumber: '9658654', expiryDate: '', submissionDate: '', status: 'Pending' },
  ];

  const stockAlerts = [
    { product: '20 LBS ICE BAG (TNKXMEBD)', location: 'Lefty\'s Liquor', currentStock: -193.00, unit: 'Single' },
    { product: '7 LBS ICE BAG (850484000108)', location: 'Lefty\'s Liquor', currentStock: -149.00, unit: 'Single' },
    { product: 'TITO\'S 50ML (619947000068)', location: 'Lefty\'s Liquor', currentStock: -144.00, unit: 'Single' },
    { product: 'NEW AMSTERDAM PINK WHITNEY VODKA 50 ML (08567507)', location: 'Lefty\'s Liquor', currentStock: -105.00, unit: 'Single' },
    { product: '99 WATERMELON 50 ML (089000991044)', location: 'Lefty\'s Liquor', currentStock: -100.00, unit: 'Single' },
  ];

  const recentSales = [
    { date: '09/02/2025 10:50 PM', orderNo: 'mobile api add test 2', customer: 'Walk-In Customer', contact: 'Walk-In Customer', location: 'Lefty\'s Liquor', status: 'Ordered', shippingStatus: 'lang_v1.' },
    { date: '09/02/2025 06:48 PM', orderNo: 'mobile add sells test', customer: 'Walk-In Customer', contact: 'Walk-In Customer', location: 'Lefty\'s Liquor', status: 'Ordered', shippingStatus: 'lang_v1.' },
    { date: '08/25/2025 06:55 PM', orderNo: 'add sales api testing from android device', customer: 'Walk-In Customer', contact: 'Walk-In Customer', location: 'Lefty\'s Liquor', status: 'Ordered', shippingStatus: 'lang_v1.' },
  ];

  return (
    <div className="etpos-home">
      {/* Welcome Section */}
      <div className="welcome-section">
        <h2>Welcome Ajay, 👋</h2>
        <div className="location-selector">
          <label>Select location</label>
          <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
            <option value="Lefty's Liquor (BL0001)">Lefty's Liquor (BL0001)</option>
          </select>
        </div>
      </div>

      {/* Sales Metrics */}
      <div className="metrics-grid">
        {salesMetrics.map((metric, index) => (
          <div key={index} className={`metric-card metric-${metric.color}`}>
            <div className="metric-icon">{metric.icon}</div>
            <div className="metric-content">
              <h3 className="metric-value">{metric.value}</h3>
              <p className="metric-title">{metric.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        <div className="chart-card">
          <h3>Sales Last 30 Days</h3>
          <div className="chart-placeholder">
            <p>📊 Chart will be displayed here</p>
          </div>
        </div>
        <div className="chart-card">
          <h3>Sales Current Financial Year</h3>
          <div className="chart-placeholder">
            <p>📈 Chart will be displayed here</p>
          </div>
        </div>
        <div className="chart-card">
          <h3>Sales Payment Due</h3>
          <div className="chart-placeholder">
            <p>💳 Chart will be displayed here</p>
          </div>
        </div>
      </div>

      {/* Tables Section */}
      <div className="tables-section">
        {/* Sales Payment Due Table */}
        <div className="table-card">
          <div className="table-header">
            <h3>Sales Payment Due</h3>
            <div className="table-controls">
              <select className="entries-selector">
                <option>10</option>
                <option>25</option>
                <option>50</option>
                <option>100</option>
              </select>
              <span>entries</span>
            </div>
          </div>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Invoice No</th>
                  <th>Due Amount</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="4" className="no-data">No data available in table</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="table-footer">
            <span>Showing 0 to 0 of 0 entries</span>
            <div className="pagination">
              <button disabled>Previous</button>
              <button disabled>Next</button>
            </div>
          </div>
        </div>

        {/* Purchase Payment Due Table */}
        <div className="table-card">
          <div className="table-header">
            <h3>Purchase Payment Due</h3>
            <div className="table-controls">
              <select className="entries-selector">
                <option>10</option>
                <option>25</option>
                <option>50</option>
                <option>100</option>
              </select>
              <span>entries</span>
            </div>
          </div>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Supplier</th>
                  <th>Reference No</th>
                  <th>Due Amount</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="4" className="no-data">No data available in table</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="table-footer">
            <span>Showing 0 to 0 of 0 entries</span>
            <div className="pagination">
              <button disabled>Previous</button>
              <button disabled>Next</button>
            </div>
          </div>
        </div>
      </div>

      {/* Check Payments Table */}
      <div className="table-card">
        <div className="table-header">
          <h3>Check Payment Dues</h3>
          <div className="location-filter">
            <span>{selectedLocation}</span>
          </div>
        </div>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Invoice No</th>
                <th>Check Number</th>
                <th>Check Expiry Date</th>
                <th>Bank Submittion Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {checkPayments.map((payment, index) => (
                <tr key={index}>
                  <td>{payment.customer}</td>
                  <td>{payment.invoiceNo}</td>
                  <td>{payment.checkNumber}</td>
                  <td>{payment.expiryDate}</td>
                  <td>{payment.submissionDate}</td>
                  <td>
                    <span className="status-badge pending">Pending</span>
                    <span className="status-badge completed">Completed</span>
                  </td>
                  <td>
                    <button className="action-btn">Action</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="table-footer">
          <span>Showing 1 to 25 of 89 entries</span>
          <div className="pagination">
            <button disabled>Previous</button>
            <button>1</button>
            <button>2</button>
            <button>3</button>
            <button>4</button>
            <button>Next</button>
          </div>
        </div>
      </div>

      {/* Product Stock Alert */}
      <div className="table-card">
        <div className="table-header">
          <h3>Product Stock Alert</h3>
        </div>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Location</th>
                <th>Current stock</th>
              </tr>
            </thead>
            <tbody>
              {stockAlerts.map((alert, index) => (
                <tr key={index}>
                  <td className="product-name">{alert.product}</td>
                  <td>{alert.location}</td>
                  <td className={`stock-value ${alert.currentStock < 0 ? 'negative' : ''}`}>
                    {alert.currentStock.toFixed(2)} {alert.unit}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="table-footer">
          <span>Showing 1 to 25 of 488 entries</span>
          <div className="pagination">
            <button disabled>Previous</button>
            <button>1</button>
            <button>2</button>
            <button>3</button>
            <button>4</button>
            <button>5</button>
            <button>…</button>
            <button>20</button>
            <button>Next</button>
          </div>
        </div>
      </div>

      {/* Sales Order Table */}
      <div className="table-card">
        <div className="table-header">
          <h3>Sales Order</h3>
          <div className="table-controls">
            <span>Show</span>
            <select className="entries-selector">
              <option>25</option>
              <option>50</option>
              <option>100</option>
              <option>200</option>
              <option>500</option>
              <option>1000</option>
              <option>All</option>
            </select>
            <span>entries</span>
          </div>
        </div>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Action</th>
                <th>Date</th>
                <th>Order No</th>
                <th>Customer name</th>
                <th>Contact Number</th>
                <th>Location</th>
                <th>Status</th>
                <th>Shipping Status</th>
                <th>Quantity Remaining</th>
                <th>Added By</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="10" className="no-data">No data available in table</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="table-footer">
          <span>Showing 0 to 0 of 0 entries</span>
          <div className="pagination">
            <button disabled>Previous</button>
            <button disabled>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
