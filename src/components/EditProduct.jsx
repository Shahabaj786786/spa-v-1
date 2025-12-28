import React, { useState } from 'react';
import './EditProduct.css';

const EditProduct = () => {
  const [activeSection, setActiveSection] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    productName: 'Premium Wireless Headphones',
    sku: 'PWH-2024-001',
    barcode: '1234567890123',
    category: 'Electronics',
    subcategory: 'Audio',
    brand: 'TechBrand',
    unit: 'Pieces',
    sellingPrice: '299.99',
    mrp: '349.99',
    purchasePrice: '199.99',
    wholesalePrice: '249.99',
    description: 'High-quality wireless headphones with noise cancellation and premium sound quality.',
    shortDescription: 'Premium wireless headphones',
    images: [],
    video: '',
    warranty: '2 Years',
    guarantee: '1 Year',
    weight: '0.5',
    length: '20',
    width: '15',
    height: '8',
    hsnCode: '85183000',
    tax: '18',
    taxType: 'Inclusive',
    enableStock: true,
    currentStock: '150',
    minimumStock: '10',
    maximumStock: '500',
    trackQuantity: true,
    allowNegativeStock: false,
    isService: false,
    manageStock: true,
    featured: true,
    trending: false,
    newLaunch: true,
    bestSeller: false,
    tags: 'wireless, headphones, premium, noise-cancellation',
    metaTitle: 'Premium Wireless Headphones - TechBrand',
    metaDescription: 'Buy premium wireless headphones with advanced noise cancellation technology.',
    metaKeywords: 'wireless headphones, premium audio, techbrand',
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 2000);
  };

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? 0 : section);
  };

  return (
    <div className="edit-product-page">
      {/* Success Message */}
      {showSuccess && (
        <div className="success-message">
          <div className="success-icon">✓</div>
          <div className="success-text">Product updated successfully!</div>
        </div>
      )}
      
      {/* Header */}
      <div className="form-header">
        <div className="header-content">
          <h2>Edit Product</h2>
          <p>Update product information and settings</p>
        </div>
        <div className="progress-indicator">
          <div className={`progress-step ${activeSection >= 1 ? 'active' : ''}`} onClick={() => toggleSection(1)}>
            <span className="step-number">1</span>
            <span className="step-label">Basic Info</span>
          </div>
          <div className={`progress-step ${activeSection >= 2 ? 'active' : ''}`} onClick={() => toggleSection(2)}>
            <span className="step-number">2</span>
            <span className="step-label">Details</span>
          </div>
          <div className={`progress-step ${activeSection >= 3 ? 'active' : ''}`} onClick={() => toggleSection(3)}>
            <span className="step-number">3</span>
            <span className="step-label">Pricing</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="product-form">
        {/* Section 1: Basic Information */}
        <div className={`form-section ${activeSection === 1 ? 'active' : ''}`}>
          <div className="section-header" onClick={() => toggleSection(1)}>
            <h3>Basic Information</h3>
            <span className="section-toggle">{activeSection === 1 ? '−' : '+'}</span>
          </div>
          
          {activeSection === 1 && (
            <div className="section-content">
              <div className="form-grid">
                <div className="form-group">
                  <label>Product Name *</label>
                  <input
                    type="text"
                    name="productName"
                    value={formData.productName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>SKU *</label>
                  <input
                    type="text"
                    name="sku"
                    value={formData.sku}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Barcode</label>
                  <input
                    type="text"
                    name="barcode"
                    value={formData.barcode}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-group">
                  <label>Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Food">Food & Beverages</option>
                    <option value="Books">Books</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Subcategory</label>
                  <input
                    type="text"
                    name="subcategory"
                    value={formData.subcategory}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-group">
                  <label>Brand</label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-group">
                  <label>Unit</label>
                  <select
                    name="unit"
                    value={formData.unit}
                    onChange={handleInputChange}
                  >
                    <option value="Pieces">Pieces</option>
                    <option value="Kg">Kilograms</option>
                    <option value="Liters">Liters</option>
                    <option value="Meters">Meters</option>
                    <option value="Box">Box</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Section 2: Product Details */}
        <div className={`form-section ${activeSection === 2 ? 'active' : ''}`}>
          <div className="section-header" onClick={() => toggleSection(2)}>
            <h3>Product Details</h3>
            <span className="section-toggle">{activeSection === 2 ? '−' : '+'}</span>
          </div>
          
          {activeSection === 2 && (
            <div className="section-content">
              <div className="form-grid">
                <div className="form-group full-width">
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="4"
                  ></textarea>
                </div>
                
                <div className="form-group full-width">
                  <label>Short Description</label>
                  <textarea
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={handleInputChange}
                    rows="2"
                  ></textarea>
                </div>
                
                <div className="form-group">
                  <label>Product Images</label>
                  <div className="file-upload">
                    <input
                      type="file"
                      name="images"
                      onChange={handleFileChange}
                      accept="image/*"
                      multiple
                    />
                    <div className="file-upload-label">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="17,8 12,3 7,8"></polyline>
                        <line x1="12" y1="3" x2="12" y2="15"></line>
                      </svg>
                      <span>Click to upload images</span>
                    </div>
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Video URL</label>
                  <input
                    type="url"
                    name="video"
                    value={formData.video}
                    onChange={handleInputChange}
                    placeholder="https://example.com/video"
                  />
                </div>
                
                <div className="form-group">
                  <label>Warranty</label>
                  <input
                    type="text"
                    name="warranty"
                    value={formData.warranty}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-group">
                  <label>Guarantee</label>
                  <input
                    type="text"
                    name="guarantee"
                    value={formData.guarantee}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Section 3: Pricing */}
        <div className={`form-section ${activeSection === 3 ? 'active' : ''}`}>
          <div className="section-header" onClick={() => toggleSection(3)}>
            <h3>Pricing</h3>
            <span className="section-toggle">{activeSection === 3 ? '−' : '+'}</span>
          </div>
          
          {activeSection === 3 && (
            <div className="section-content">
              <div className="form-grid">
                <div className="form-group">
                  <label>Selling Price *</label>
                  <input
                    type="number"
                    name="sellingPrice"
                    value={formData.sellingPrice}
                    onChange={handleInputChange}
                    step="0.01"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>MRP</label>
                  <input
                    type="number"
                    name="mrp"
                    value={formData.mrp}
                    onChange={handleInputChange}
                    step="0.01"
                  />
                </div>
                
                <div className="form-group">
                  <label>Purchase Price</label>
                  <input
                    type="number"
                    name="purchasePrice"
                    value={formData.purchasePrice}
                    onChange={handleInputChange}
                    step="0.01"
                  />
                </div>
                
                <div className="form-group">
                  <label>Wholesale Price</label>
                  <input
                    type="number"
                    name="wholesalePrice"
                    value={formData.wholesalePrice}
                    onChange={handleInputChange}
                    step="0.01"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <button type="button" className="btn-secondary">
            Cancel
          </button>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Updating...' : 'Update Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
