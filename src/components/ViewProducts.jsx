import React, { useState } from 'react';
import './ViewProducts.css';

const ViewProducts = () => {
  const [products] = useState([
    {
      id: 1,
      name: 'Premium Wireless Headphones',
      sku: 'PWH-2024-001',
      category: 'Electronics',
      price: 299.99,
      stock: 150,
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=50&h=50&fit=crop',
      featured: true,
      trending: false,
    },
    {
      id: 2,
      name: 'Smart Watch Series 6',
      sku: 'SWS-2024-002',
      category: 'Electronics',
      price: 399.99,
      stock: 75,
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=50&h=50&fit=crop',
      featured: false,
      trending: true,
    },
    {
      id: 3,
      name: 'Gaming Laptop Ultra',
      sku: 'GLU-2024-003',
      category: 'Electronics',
      price: 1299.99,
      stock: 25,
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=50&h=50&fit=crop',
      featured: true,
      trending: true,
    },
    {
      id: 4,
      name: 'Bluetooth Speaker Max',
      sku: 'BSM-2024-004',
      category: 'Electronics',
      price: 89.99,
      stock: 200,
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=50&h=50&fit=crop',
      featured: false,
      trending: false,
    },
    {
      id: 5,
      name: 'Fitness Tracker Plus',
      sku: 'FTP-2024-005',
      category: 'Electronics',
      price: 149.99,
      stock: 0,
      status: 'Out of Stock',
      image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=50&h=50&fit=crop',
      featured: false,
      trending: false,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const categories = ['all', 'Electronics', 'Clothing', 'Food', 'Books', 'Other'];
  const statuses = ['all', 'Active', 'Inactive', 'Out of Stock'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || product.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedProducts(filteredProducts.map(p => p.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleSelectProduct = (productId) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleDeleteSelected = () => {
    // Handle delete action
    alert(`Delete ${selectedProducts.length} products`);
    setSelectedProducts([]);
  };

  const handleExport = () => {
    // Handle export action
    alert('Export products to CSV');
  };

  const getStatusColor = (status) => {
    const colors = {
      'Active': 'green',
      'Inactive': 'gray',
      'Out of Stock': 'red',
    };
    return colors[status] || 'gray';
  };

  const getStockColor = (stock) => {
    if (stock === 0) return 'red';
    if (stock < 20) return 'orange';
    return 'green';
  };

  return (
    <div className="view-products">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Products</h1>
          <p className="page-subtitle">Manage your product inventory</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary" onClick={handleExport}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7,10 12,15 17,10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Export
          </button>
          <button className="btn-primary">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add Product
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            </svg>
          </div>
          <div className="stat-content">
            <h3>{products.length}</h3>
            <p>Total Products</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 11l3 3L22 4"></path>
              <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"></path>
            </svg>
          </div>
          <div className="stat-content">
            <h3>{products.filter(p => p.status === 'Active').length}</h3>
            <p>Active Products</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon orange">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
            </svg>
          </div>
          <div className="stat-content">
            <h3>{products.filter(p => p.featured || p.trending).length}</h3>
            <p>Featured/Trending</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon red">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="15" y1="9" x2="9" y2="15"></line>
              <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
          </div>
          <div className="stat-content">
            <h3>{products.filter(p => p.stock < 20).length}</h3>
            <p>Low Stock Items</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="search-box">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select 
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="filter-select"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat === 'all' ? 'All Categories' : cat}
            </option>
          ))}
        </select>
        <select 
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="filter-select"
        >
          {statuses.map(status => (
            <option key={status} value={status}>
              {status === 'all' ? 'All Statuses' : status}
            </option>
          ))}
        </select>
        {selectedProducts.length > 0 && (
          <button className="btn-danger" onClick={handleDeleteSelected}>
            Delete Selected ({selectedProducts.length})
          </button>
        )}
      </div>

      {/* Products Table */}
      <div className="products-table-container">
        <table className="products-table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
              </th>
              <th>Product</th>
              <th>SKU</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Tags</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => handleSelectProduct(product.id)}
                  />
                </td>
                <td>
                  <div className="product-info">
                    <img src={product.image} alt={product.name} className="product-image" />
                    <div className="product-details">
                      <div className="product-name">{product.name}</div>
                    </div>
                  </div>
                </td>
                <td className="sku">{product.sku}</td>
                <td>{product.category}</td>
                <td className="price">${product.price.toFixed(2)}</td>
                <td>
                  <span className={`stock-badge ${getStockColor(product.stock)}`}>
                    {product.stock} units
                  </span>
                </td>
                <td>
                  <span className={`status-badge ${getStatusColor(product.status)}`}>
                    {product.status}
                  </span>
                </td>
                <td>
                  <div className="product-tags">
                    {product.featured && <span className="tag featured">Featured</span>}
                    {product.trending && <span className="tag trending">Trending</span>}
                  </div>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="action-btn edit-btn" title="Edit">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                      </svg>
                    </button>
                    <button className="action-btn view-btn" title="View">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    </button>
                    <button className="action-btn delete-btn" title="Delete">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3,6 5,6 21,6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination">
        <div className="pagination-info">
          Showing {filteredProducts.length} of {products.length} products
        </div>
        <div className="pagination-controls">
          <button 
            className="pagination-btn" 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
          >
            Previous
          </button>
          <button className="pagination-btn active">1</button>
          <button className="pagination-btn">2</button>
          <button className="pagination-btn">3</button>
          <button 
            className="pagination-btn"
            onClick={() => setCurrentPage(prev => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewProducts;
