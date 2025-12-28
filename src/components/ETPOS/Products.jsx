import React, { useState } from 'react';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([
    { id: 1, name: '20 LBS ICE BAG (TNKXMEBD)', sku: 'TNKXMEBD', category: 'Ice', location: 'Lefty\'s Liquor', currentStock: -193.00, unit: 'Single', price: 15.99, cost: 12.50, status: 'Active' },
    { id: 2, name: '7 LBS ICE BAG (850484000108)', sku: '850484000108', category: 'Ice', location: 'Lefty\'s Liquor', currentStock: -149.00, unit: 'Single', price: 8.99, cost: 6.75, status: 'Active' },
    { id: 3, name: 'TITO\'S 50ML (619947000068)', sku: '619947000068', category: 'Vodka', location: 'Lefty\'s Liquor', currentStock: -144.00, unit: 'Single', price: 3.99, cost: 2.85, status: 'Active' },
    { id: 4, name: 'NEW AMSTERDAM PINK WHITNEY VODKA 50 ML (08567507)', sku: '08567507', category: 'Vodka', location: 'Lefty\'s Liquor', currentStock: -105.00, unit: 'Single', price: 4.99, cost: 3.65, status: 'Active' },
    { id: 5, name: '99 WATERMELON 50 ML (089000991044)', sku: '089000991044', category: 'Vodka', location: 'Lefty\'s Liquor', currentStock: -100.00, unit: 'Single', price: 2.99, cost: 2.15, status: 'Active' },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: '',
    location: 'Lefty\'s Liquor',
    currentStock: 0,
    unit: 'Single',
    price: 0,
    cost: 0,
    status: 'Active',
  });

  const categories = ['All', 'Ice', 'Vodka', 'Whiskey', 'Rum', 'Beer', 'Wine', 'Other'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || product.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleAddProduct = () => {
    if (formData.name && formData.sku) {
      const newProduct = {
        id: products.length + 1,
        ...formData,
        currentStock: parseFloat(formData.currentStock),
        price: parseFloat(formData.price),
        cost: parseFloat(formData.cost)
      };
      setProducts([...products, newProduct]);
      setFormData({ name: '', sku: '', category: '', location: 'Lefty\'s Liquor', currentStock: 0, unit: 'Single', price: 0, cost: 0, status: 'Active' });
      setShowAddModal(false);
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      sku: product.sku,
      category: product.category,
      location: product.location,
      currentStock: product.currentStock,
      unit: product.unit,
      price: product.price,
      cost: product.cost,
      status: product.status
    });
  };

  const handleUpdateProduct = () => {
    setProducts(products.map(product => 
      product.id === editingProduct.id 
        ? { ...product, ...formData, currentStock: parseFloat(formData.currentStock), price: parseFloat(formData.price), cost: parseFloat(formData.cost) }
        : product
    ));
    setEditingProduct(null);
    setFormData({ name: '', sku: '', category: '', location: 'Lefty\'s Liquor', currentStock: 0, unit: 'Single', price: 0, cost: 0, status: 'Active' });
  };

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter(product => product.id !== productId));
  };

  const getStockStatus = (stock) => {
    if (stock < 0) return { class: 'critical', text: 'Critical' };
    if (stock < 10) return { class: 'low', text: 'Low' };
    if (stock < 50) return { class: 'medium', text: 'Medium' };
    return { class: 'good', text: 'Good' };
  };

  return (
    <div className="products-container">
      <div className="page-header">
        <h2>Products Management</h2>
        <button 
          className="add-product-btn"
          onClick={() => setShowAddModal(true)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Add New Product
        </button>
      </div>

      {/* Stats Cards */}
      <div className="stats-row">
        <div className="stat-card">
          <h3>Total Products</h3>
          <span className="stat-value">{products.length}</span>
        </div>
        <div className="stat-card critical">
          <h3>Critical Stock</h3>
          <span className="stat-value">{products.filter(p => p.currentStock < 0).length}</span>
        </div>
        <div className="stat-card low">
          <h3>Low Stock</h3>
          <span className="stat-value">{products.filter(p => p.currentStock >= 0 && p.currentStock < 10).length}</span>
        </div>
        <div className="stat-card good">
          <h3>In Stock</h3>
          <span className="stat-value">{products.filter(p => p.currentStock >= 10).length}</span>
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
          className="filter-select"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          {categories.map(cat => (
            <option key={cat} value={cat.toLowerCase()}>{cat}</option>
          ))}
        </select>
        <select 
          className="filter-select"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      {/* Products Table */}
      <div className="products-table-container">
        <table className="products-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>SKU</th>
              <th>Category</th>
              <th>Location</th>
              <th>Current Stock</th>
              <th>Unit</th>
              <th>Price</th>
              <th>Cost</th>
              <th>Stock Status</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => {
              const stockStatus = getStockStatus(product.currentStock);
              return (
                <tr key={product.id}>
                  <td className="product-name">
                    <div className="product-info">
                      <strong>{product.name}</strong>
                    </div>
                  </td>
                  <td className="sku">{product.sku}</td>
                  <td>{product.category}</td>
                  <td>{product.location}</td>
                  <td className={`stock-value ${stockStatus.class}`}>
                    {product.currentStock.toFixed(2)}
                  </td>
                  <td>{product.unit}</td>
                  <td className="price">${product.price.toFixed(2)}</td>
                  <td className="cost">${product.cost.toFixed(2)}</td>
                  <td>
                    <span className={`stock-status-badge ${stockStatus.class}`}>
                      {stockStatus.text}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${product.status.toLowerCase()}`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="actions-cell">
                    <button 
                      className="action-btn edit-btn"
                      onClick={() => handleEditProduct(product)}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                      </svg>
                    </button>
                    <button 
                      className="action-btn delete-btn"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3,6 5,6 21,6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Product Modal */}
      {(showAddModal || editingProduct) && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
              <button 
                className="close-btn"
                onClick={() => {
                  setShowAddModal(false);
                  setEditingProduct(null);
                  setFormData({ name: '', sku: '', category: '', location: 'Lefty\'s Liquor', currentStock: 0, unit: 'Single', price: 0, cost: 0, status: 'Active' });
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-row">
                <div className="form-group">
                  <label>Product Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter product name"
                  />
                </div>
                <div className="form-group">
                  <label>SKU</label>
                  <input
                    type="text"
                    value={formData.sku}
                    onChange={(e) => setFormData({...formData, sku: e.target.value})}
                    placeholder="Enter SKU"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    <option value="">Select Category</option>
                    {categories.slice(1).map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    placeholder="Enter location"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Current Stock</label>
                  <input
                    type="number"
                    value={formData.currentStock}
                    onChange={(e) => setFormData({...formData, currentStock: e.target.value})}
                    placeholder="Enter stock quantity"
                  />
                </div>
                <div className="form-group">
                  <label>Unit</label>
                  <select
                    value={formData.unit}
                    onChange={(e) => setFormData({...formData, unit: e.target.value})}
                  >
                    <option value="Single">Single</option>
                    <option value="Case">Case</option>
                    <option value="Box">Box</option>
                    <option value="Pack">Pack</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    placeholder="Enter selling price"
                  />
                </div>
                <div className="form-group">
                  <label>Cost ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.cost}
                    onChange={(e) => setFormData({...formData, cost: e.target.value})}
                    placeholder="Enter cost price"
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="cancel-btn"
                onClick={() => {
                  setShowAddModal(false);
                  setEditingProduct(null);
                  setFormData({ name: '', sku: '', category: '', location: 'Lefty\'s Liquor', currentStock: 0, unit: 'Single', price: 0, cost: 0, status: 'Active' });
                }}
              >
                Cancel
              </button>
              <button 
                className="submit-btn"
                onClick={editingProduct ? handleUpdateProduct : handleAddProduct}
              >
                {editingProduct ? 'Update Product' : 'Add Product'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
