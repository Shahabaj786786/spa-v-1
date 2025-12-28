import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Package, 
  DollarSign, 
  Archive, 
  Image, 
  Save, 
  Eye, 
  Upload,
  X,
  ChevronRight,
  Plus,
  Minus,
  Star,
  TrendingUp,
  AlertCircle,
  Edit3,
  Trash2,
  ArrowLeft
} from 'lucide-react';
import './EditProductFull.css';

const EditProductFull = () => {
  const [activeSection, setActiveSection] = useState('details');
  const [formData, setFormData] = useState({
    // Product Details
    productName: 'Premium Wireless Headphones',
    category: 'electronics',
    subcategory: 'Audio',
    brand: 'TechBrand',
    description: 'Experience premium sound quality with our latest wireless headphones. Featuring advanced noise cancellation, 30-hour battery life, and superior comfort for all-day wear.',
    shortDescription: 'Premium wireless headphones with noise cancellation',
    tags: 'wireless, headphones, premium, noise-cancellation',
    
    // Pricing
    price: '299.99',
    comparePrice: '399.99',
    costPerItem: '199.99',
    taxRate: '8.5',
    taxClass: 'standard',
    
    // Inventory
    sku: 'ELC-AUD-001',
    barcode: '1234567890123',
    trackQuantity: true,
    quantity: '150',
    allowBackorder: true,
    lowStockThreshold: '10',
    
    // Media
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop',
    ],
    videoUrl: 'https://youtube.com/watch?v=example',
    
    // Status
    status: 'active',
    featured: true,
    trending: false,
  });

  const [previewImage, setPreviewImage] = useState(formData.images[0]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');
  const [hasChanges, setHasChanges] = useState(false);

  const categories = [
    { id: 'electronics', name: 'Electronics', icon: '💻' },
    { id: 'clothing', name: 'Clothing', icon: '👕' },
    { id: 'food', name: 'Food & Beverages', icon: '🍔' },
    { id: 'books', name: 'Books', icon: '📚' },
    { id: 'home', name: 'Home & Garden', icon: '🏠' },
    { id: 'sports', name: 'Sports & Outdoors', icon: '⚽' },
    { id: 'toys', name: 'Toys & Games', icon: '🎮' },
    { id: 'health', name: 'Health & Beauty', icon: '💄' },
  ];

  const sections = [
    { id: 'details', label: 'Product Details', icon: Package },
    { id: 'pricing', label: 'Pricing', icon: DollarSign },
    { id: 'inventory', label: 'Inventory', icon: Archive },
    { id: 'media', label: 'Media', icon: Image },
  ];

  useEffect(() => {
    // Check if form has changes
    const originalData = {
      productName: 'Premium Wireless Headphones',
      price: '299.99',
      // ... other original values
    };
    
    const hasFormChanges = Object.keys(formData).some(key => {
      if (Array.isArray(formData[key])) {
        return formData[key].length !== originalData[key]?.length;
      }
      return formData[key] !== originalData[key];
    });
    
    setHasChanges(hasFormChanges);
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, reader.result],
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
    if (formData.images.length === 1) {
      setPreviewImage(null);
    }
  };

  const saveChanges = async () => {
    setIsSaving(true);
    setSaveStatus('saving');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSaving(false);
    setSaveStatus('saved');
    setHasChanges(false);
    
    setTimeout(() => setSaveStatus(''), 3000);
  };

  const deleteProduct = async () => {
    if (window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      // Handle delete
      alert('Product deleted successfully');
    }
  };

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
    if (!value) return '$0.00';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(parseFloat(value) || 0);
  };

  const calculateProfit = () => {
    const price = parseFloat(formData.price) || 0;
    const cost = parseFloat(formData.costPerItem) || 0;
    return price - cost;
  };

  const calculateProfitMargin = () => {
    const price = parseFloat(formData.price) || 0;
    const cost = parseFloat(formData.costPerItem) || 0;
    if (price === 0) return 0;
    return ((price - cost) / price * 100).toFixed(1);
  };

  return (
    <motion.div 
      className="edit-product-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div 
        className="edit-header"
        variants={itemVariants}
      >
        <div className="header-left">
          <motion.button 
            className="back-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft size={16} />
            Back to Products
          </motion.button>
          <div className="header-title">
            <h1>Edit Product</h1>
            <p>Modify product information and settings</p>
          </div>
        </div>
        
        <div className="header-actions">
          <motion.button
            onClick={deleteProduct}
            className="btn-danger"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Trash2 size={16} />
            Delete Product
          </motion.button>
        </div>
      </motion.div>

      <div className="edit-product-layout">
        {/* Main Form */}
        <motion.div 
          className="form-section"
          variants={itemVariants}
        >
          {/* Section Navigation */}
          <div className="section-nav">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <motion.button
                  key={section.id}
                  className={`section-tab ${activeSection === section.id ? 'active' : ''}`}
                  onClick={() => setActiveSection(section.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon size={18} />
                  <span>{section.label}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Form Content */}
          <div className="form-content">
            <AnimatePresence mode="wait">
              {activeSection === 'details' && (
                <motion.div
                  key="details"
                  className="form-panel"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="panel-title">Product Details</h3>
                  
                  <div className="form-grid">
                    <div className="form-group full-width">
                      <label>Product Name *</label>
                      <input
                        type="text"
                        name="productName"
                        value={formData.productName}
                        onChange={handleInputChange}
                        className="form-input"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Category *</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="form-select"
                      >
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.icon} {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="form-group">
                      <label>Subcategory</label>
                      <input
                        type="text"
                        name="subcategory"
                        value={formData.subcategory}
                        onChange={handleInputChange}
                        className="form-input"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Brand</label>
                      <input
                        type="text"
                        name="brand"
                        value={formData.brand}
                        onChange={handleInputChange}
                        className="form-input"
                      />
                    </div>
                    
                    <div className="form-group full-width">
                      <label>Description</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={6}
                        className="form-textarea"
                      />
                    </div>
                    
                    <div className="form-group full-width">
                      <label>Short Description</label>
                      <textarea
                        name="shortDescription"
                        value={formData.shortDescription}
                        onChange={handleInputChange}
                        rows={3}
                        className="form-textarea"
                      />
                    </div>
                    
                    <div className="form-group full-width">
                      <label>Tags</label>
                      <input
                        type="text"
                        name="tags"
                        value={formData.tags}
                        onChange={handleInputChange}
                        className="form-input"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {activeSection === 'pricing' && (
                <motion.div
                  key="pricing"
                  className="form-panel"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="panel-title">Pricing</h3>
                  
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Selling Price *</label>
                      <div className="input-with-prefix">
                        <span className="input-prefix">$</span>
                        <input
                          type="number"
                          name="price"
                          value={formData.price}
                          onChange={handleInputChange}
                          step="0.01"
                          min="0"
                          className="form-input"
                        />
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label>Compare at Price</label>
                      <div className="input-with-prefix">
                        <span className="input-prefix">$</span>
                        <input
                          type="number"
                          name="comparePrice"
                          value={formData.comparePrice}
                          onChange={handleInputChange}
                          step="0.01"
                          min="0"
                          className="form-input"
                        />
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label>Cost per Item</label>
                      <div className="input-with-prefix">
                        <span className="input-prefix">$</span>
                        <input
                          type="number"
                          name="costPerItem"
                          value={formData.costPerItem}
                          onChange={handleInputChange}
                          step="0.01"
                          min="0"
                          className="form-input"
                        />
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label>Tax Rate</label>
                      <div className="input-with-suffix">
                        <input
                          type="number"
                          name="taxRate"
                          value={formData.taxRate}
                          onChange={handleInputChange}
                          step="0.1"
                          min="0"
                          max="100"
                          className="form-input"
                        />
                        <span className="input-suffix">%</span>
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label>Tax Class</label>
                      <select
                        name="taxClass"
                        value={formData.taxClass}
                        onChange={handleInputChange}
                        className="form-select"
                      >
                        <option value="standard">Standard</option>
                        <option value="reduced">Reduced</option>
                        <option value="zero">Zero Rate</option>
                        <option value="exempt">Tax Exempt</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeSection === 'inventory' && (
                <motion.div
                  key="inventory"
                  className="form-panel"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="panel-title">Inventory</h3>
                  
                  <div className="form-grid">
                    <div className="form-group">
                      <label>SKU (Stock Keeping Unit)</label>
                      <input
                        type="text"
                        name="sku"
                        value={formData.sku}
                        onChange={handleInputChange}
                        className="form-input"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Barcode</label>
                      <input
                        type="text"
                        name="barcode"
                        value={formData.barcode}
                        onChange={handleInputChange}
                        className="form-input"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          name="trackQuantity"
                          checked={formData.trackQuantity}
                          onChange={handleInputChange}
                        />
                        <span className="checkbox-custom"></span>
                        Track quantity
                      </label>
                    </div>
                    
                    {formData.trackQuantity && (
                      <>
                        <div className="form-group">
                          <label>Quantity</label>
                          <input
                            type="number"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleInputChange}
                            min="0"
                            className="form-input"
                          />
                        </div>
                        
                        <div className="form-group">
                          <label>Low Stock Threshold</label>
                          <input
                            type="number"
                            name="lowStockThreshold"
                            value={formData.lowStockThreshold}
                            onChange={handleInputChange}
                            min="0"
                            className="form-input"
                          />
                        </div>
                        
                        <div className="form-group">
                          <label className="checkbox-label">
                            <input
                              type="checkbox"
                              name="allowBackorder"
                              checked={formData.allowBackorder}
                              onChange={handleInputChange}
                            />
                            <span className="checkbox-custom"></span>
                            Allow backorder
                          </label>
                        </div>
                      </>
                    )}
                  </div>
                </motion.div>
              )}

              {activeSection === 'media' && (
                <motion.div
                  key="media"
                  className="form-panel"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="panel-title">Media</h3>
                  
                  <div className="form-grid">
                    <div className="form-group full-width">
                      <label>Product Images</label>
                      <div className="image-upload-area">
                        <input
                          type="file"
                          id="image-upload"
                          multiple
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="image-input"
                        />
                        <label htmlFor="image-upload" className="upload-label">
                          <div className="upload-content">
                            <Upload size={24} />
                            <span>Add more images</span>
                          </div>
                        </label>
                      </div>
                      
                      {formData.images.length > 0 && (
                        <div className="uploaded-images">
                          {formData.images.map((image, index) => (
                            <motion.div
                              key={index}
                              className="image-preview"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              whileHover={{ scale: 1.05 }}
                            >
                              <img src={image} alt="Preview" />
                              <motion.button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="remove-image"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <X size={16} />
                              </motion.button>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="form-group full-width">
                      <label>Video URL</label>
                      <input
                        type="url"
                        name="videoUrl"
                        value={formData.videoUrl}
                        onChange={handleInputChange}
                        className="form-input"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          name="featured"
                          checked={formData.featured}
                          onChange={handleInputChange}
                        />
                        <span className="checkbox-custom"></span>
                        Featured product
                      </label>
                    </div>
                    
                    <div className="form-group">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          name="trending"
                          checked={formData.trending}
                          onChange={handleInputChange}
                        />
                        <span className="checkbox-custom"></span>
                        Trending product
                      </label>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Form Actions */}
          <motion.div 
            className="form-actions"
            variants={itemVariants}
          >
            <motion.button
              type="button"
              className="btn-secondary"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Cancel
            </motion.button>
            
            <motion.button
              type="button"
              onClick={saveChanges}
              disabled={!hasChanges || isSaving}
              className={`btn-primary ${!hasChanges ? 'disabled' : ''}`}
              whileHover={hasChanges ? { scale: 1.02 } : {}}
              whileTap={hasChanges ? { scale: 0.98 } : {}}
            >
              <Save size={16} />
              {isSaving && saveStatus === 'saving' ? 'Saving...' : 'Save Changes'}
            </motion.button>
          </motion.div>

          {/* Save Status */}
          <AnimatePresence>
            {saveStatus && (
              <motion.div
                className={`save-status ${saveStatus}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
              >
                {saveStatus === 'saved' && (
                  <>
                    <AlertCircle size={16} />
                    Changes saved successfully
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Live Preview Panel */}
        <motion.div 
          className="preview-section"
          variants={itemVariants}
        >
          <div className="preview-header">
            <h3 className="preview-title">
              <Eye size={18} />
              Live Preview
            </h3>
            {hasChanges && (
              <span className="changes-indicator">
                <Edit3 size={14} />
                Unsaved changes
              </span>
            )}
          </div>
          
          <div className="preview-content">
            {/* Product Preview Card */}
            <motion.div 
              className="product-preview-card"
              whileHover={{ y: -4 }}
            >
              <div className="preview-image">
                {previewImage ? (
                  <img src={previewImage} alt="Product preview" />
                ) : (
                  <div className="image-placeholder">
                    <Image size={48} />
                    <span>No image</span>
                  </div>
                )}
                
                {formData.featured && (
                  <div className="preview-badge featured">
                    <Star size={12} />
                    Featured
                  </div>
                )}
                
                {formData.trending && (
                  <div className="preview-badge trending">
                    <TrendingUp size={12} />
                    Trending
                  </div>
                )}
              </div>
              
              <div className="preview-details">
                <h4 className="preview-name">
                  {formData.productName}
                </h4>
                
                <div className="preview-meta">
                  {formData.brand && <span className="preview-brand">{formData.brand}</span>}
                  {formData.category && (
                    <span className="preview-category">
                      {categories.find(c => c.id === formData.category)?.icon} {categories.find(c => c.id === formData.category)?.name}
                    </span>
                  )}
                </div>
                
                <p className="preview-description">
                  {formData.shortDescription}
                </p>
                
                <div className="preview-pricing">
                  <div className="price-row">
                    <span className="current-price">
                      {formatCurrency(formData.price)}
                    </span>
                    {formData.comparePrice && (
                      <span className="compare-price">
                        {formatCurrency(formData.comparePrice)}
                      </span>
                    )}
                  </div>
                  
                  {formData.costPerItem && (
                    <div className="profit-info">
                      <span className="profit-amount">
                        Profit: {formatCurrency(calculateProfit())}
                      </span>
                      <span className="profit-margin">
                        ({calculateProfitMargin()}% margin)
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="preview-inventory">
                  {formData.trackQuantity && (
                    <div className="inventory-info">
                      <span className="stock-label">Stock:</span>
                      <span className={`stock-quantity ${parseInt(formData.quantity) <= parseInt(formData.lowStockThreshold) ? 'low' : ''}`}>
                        {formData.quantity} units
                      </span>
                    </div>
                  )}
                  
                  {formData.sku && (
                    <div className="sku-info">
                      <span className="sku-label">SKU:</span>
                      <span className="sku-value">{formData.sku}</span>
                    </div>
                  )}
                </div>
                
                {formData.tags && (
                  <div className="preview-tags">
                    {formData.tags.split(',').map((tag, index) => (
                      <span key={index} className="preview-tag">
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
            
            {/* Quick Stats */}
            <div className="preview-stats">
              <h4>Product Information</h4>
              <div className="stats-grid">
                <div className="stat-item">
                  <span className="stat-label">Status</span>
                  <span className={`stat-value ${formData.status}`}>
                    {formData.status}
                  </span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Tax Rate</span>
                  <span className="stat-value">{formData.taxRate}%</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Images</span>
                  <span className="stat-value">{formData.images.length}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Video</span>
                  <span className="stat-value">{formData.videoUrl ? 'Yes' : 'No'}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Barcode</span>
                  <span className="stat-value">{formData.barcode || 'None'}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Backorder</span>
                  <span className="stat-value">{formData.allowBackorder ? 'Allowed' : 'Not allowed'}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EditProductFull;
