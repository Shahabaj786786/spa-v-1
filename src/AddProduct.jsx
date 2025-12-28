import React, { useState } from 'react';
import './addproduct.css';
import { Editor } from '@tinymce/tinymce-react';
import 'react-datepicker/dist/react-datepicker.css';

const barcodeTypes = [
  'Code 128 (C128)',
  'Code 39 (C39)',
  'EAN-13',
  'EAN-8',
  'UPC-A',
  'UPC-E'
];

const units = [
  'Pieces (Pc(s))',
  'Single (Single)',
  '12 Bottle Case (12 Bottle)',
  '24 PK Case (24 Pk Case)',
  '2 Pk Case (2 Pk Case)',
  '6pk Bottle (6pk Bottle)',
  'Beer Case (Case)'
];

const categories = [
  'All Lotto', 'BEER-41', 'BOURBON-20', 'BOURBONS', 'BRANDY-2', 'CANADIAN-35',
  'CANDY (SUGAR)', 'CANNABIS-83', 'CIGARETTES-5', 'CIGARS-4', 'COGNAC-44',
  'CORDIALS & LIQUEURS-48', 'CRAFT beer 8.5%', 'CRAFT BEER-43', 'CREME DE CACAO-60',
  'DRINKS-51', 'GIN-51', 'GROCERY-73', 'IMPORTED WINE-3', 'IRISH WHISKEY-22',
  'JUICE, WATER, NON-SUGAR, POWDERED MIXES-93', 'LIQUEUR-11', 'LIQUEURES & CORDIALS-33',
  'LIQUOR-23', 'Lotto Payout-106', 'Lotto Sale-105', 'Lotto-109', 'MALT BASED COOLERS-47',
  'MINIATURES-28', 'MISC', 'MIXERS-8', 'Online Lottery', 'Online Payout', 'PHILLIPS & KING-98',
  'PREMIUM SPIRITS-103', 'PREMIXED DRINKS-26', 'RTD COCKTAILS-42', 'RUM-34', 'SCHNAPPS-17',
  'SCOTCH-29', 'SINGLE BEER-30', 'SNACKS-69', 'SNACKS, FOOD, SPICES-94', 'SPARKLING WINE-37',
  'SPIRITS CENTRAL-75', 'SPIRITS GLAZERS-76', 'SPIRITS MOON-81', 'SPIRITS-91', 'STRAIGHT BOURBON-59',
  'STRAIGHT RYE-62', 'SUGAR DRINKS-95', 'TEQUILA-12', 'TOBACCO-53', 'US WINE-6', 'VERMOUTH-49',
  'VODKA-46', 'WHISKEY', 'WHISKY-70', 'WINE CENTRAL-99', 'WINE MOON-80', 'WINE-36'
];

const taxOptions = [
  'None', 'beer Tax', 'food', 'Wine and Liquor 10.5%', 'NoTax', 'Sales Tax', 'CIGARETTES'
];

export default function AddProduct() {
  const [formData, setFormData] = useState({
    productName: '',
    sku: '',
    barcodeType: 'Code 128 (C128)',
    unit: '',
    brand: '',
    category: '',
    subcategory: '',
    businessLocation: "Lefty'S Liquor (BL0001)",
    alertQuantity: '',
    manageStock: false,
    enableDescription: false,
    notForSelling: false,
    weight: '',
    preparationTime: '',
    disableWoocommerceSync: false,
    applicableTax: '',
    sellingPriceTaxType: 'Inclusive',
    productType: 'Single',
    defaultPurchasePrice: '',
    margin: '',
    defaultSellingPrice: '',
    description: '',
    image: null,
    brochure: null,
    enableDescription: false,
    notForSelling: false,
    weight: '',
    serviceTime: '',
    applicableTax: 'None',
    sellingPriceTaxType: 'inclusive',
    productType: 'Single',
    purchasePriceEx: '',
    purchasePriceIn: '',
    margin: '',
    sellingPrice: '',
    disableWoocommerceSync: false,
  });

  const [activeSection, setActiveSection] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [brochureName, setBrochureName] = useState('');
  const editorRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Get the content from TinyMCE editor
      if (editorRef.current) {
        const content = await editorRef.current.save();
        setFormData(prev => ({
          ...prev,
          description: content
        }));
      }

      // Create FormData for file uploads
      const formDataToSend = new FormData();
      
      // Append all form data
      Object.keys(formData).forEach(key => {
        if (key === 'image' || key === 'brochure') {
          if (formData[key]) {
            formDataToSend.append(key, formData[key]);
          }
        } else if (key === 'description') {
          // Handle description separately as it's from TinyMCE
          if (formData[key]) {
            formDataToSend.append(key, JSON.stringify(formData[key]));
          }
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      // Simulate API call
      console.log('Form data to send:', Object.fromEntries(formDataToSend.entries()));
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        // Reset form after successful submission
        setFormData({
          productName: '',
          sku: '',
          barcodeType: 'Code 128 (C128)',
          unit: '',
          brand: '',
          category: '',
          subcategory: '',
          businessLocation: "Lefty'S Liquor (BL0001)",
          alertQuantity: '',
          manageStock: false,
          description: '',
          image: null,
          brochure: null,
          enableDescription: false,
          notForSelling: false,
          weight: '',
          serviceTime: '',
          applicableTax: 'None',
          sellingPriceTaxType: 'inclusive',
          productType: 'Single',
          purchasePriceEx: '',
          purchasePriceIn: '',
          margin: '',
          sellingPrice: '',
          disableWoocommerceSync: false,
        });
        setImagePreview(null);
        setBrochureName('');
        if (editorRef.current) {
          editorRef.current.setContent('');
        }
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const barcodeTypes = [
    'Code 128 (C128)',
    'Code 39 (C39)',
    'EAN-13',
    'EAN-8',
    'UPC-A',
    'UPC-E'
  ];

  const units = [
    'Pieces (Pc(s))',
    'Single (Single)',
    '12 Bottle Case (12 Bottle)',
    '24 PK Case (24 Pk Case)',
    '2 Pk Case (2 Pk Case)',
    '6pk Bottle (6pk Bottle)',
    'Beer Case (Case)'
  ];

  const categories = [
    'All Lotto', 'BEER-41', 'BOURBON-20', 'BOURBONS', 'BRANDY-2', 'CANADIAN-35', 
    'CANDY (SUGAR)', 'CANNABIS-83', 'CIGARETTES-5', 'CIGARS-4', 'COGNAC-44', 
    'CORDIALS & LIQUEURS-48', 'CRAFT beer 8.5%', 'CRAFT BEER-43', 'CREME DE CACAO-60', 
    'DRINKS-51', 'GIN-51', 'GROCERY-73', 'IMPORTED WINE-3', 'IRISH WHISKEY-22', 
    'JUICE, WATER, NON-SUGAR, POWDERED MIXES-93', 'LIQUEUR-11', 'LIQUEURES & CORDIALS-33', 
    'LIQUOR-23', 'Lotto Payout-106', 'Lotto Sale-105', 'Lotto-109', 'MALT BASED COOLERS-47', 
    'MINIATURES-28', 'MISC', 'MIXERS-8', 'Online Lottery', 'Online Payout', 'PHILLIPS & KING-98', 
    'PREMIUM SPIRITS-103', 'PREMIXED DRINKS-26', 'RTD COCKTAILS-42', 'RUM-34', 'SCHNAPPS-17', 
    'SCOTCH-29', 'SINGLE BEER-30', 'SNACKS-69', 'SNACKS, FOOD, SPICES-94', 'SPARKLING WINE-37', 
    'SPIRITS CENTRAL-75', 'SPIRITS GLAZERS-76', 'SPIRITS MOON-81', 'SPIRITS-91', 'STRAIGHT BOURBON-59', 
    'STRAIGHT RYE-62', 'SUGAR DRINKS-95', 'TEQUILA-12', 'TOBACCO-53', 'US WINE-6', 'VERMOUTH-49', 
    'VODKA-46', 'WHISKEY', 'WHISKY-70', 'WINE CENTRAL-99', 'WINE MOON-80', 'WINE-36'
  ];

  const taxes = [
    'None', 'beer Tax', 'food', 'Wine and Liquor 10.5%', 'NoTax', 'Sales Tax', 'CIGARETTES'
  ];

  const handleSectionClick = (sectionNumber) => {
    setActiveSection(sectionNumber);
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    
    if (name === 'image' && file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else if (name === 'brochure' && file) {
      setBrochureName(file.name);
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: file || null
    }));
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({
      ...prev,
      image: null
    }));
    setImagePreview(null);
    // Reset file input
    document.getElementById('image-upload').value = '';
  };

  const handleRemoveBrochure = () => {
    setFormData(prev => ({
      ...prev,
      brochure: null
    }));
    setBrochureName('');
    // Reset file input
    document.getElementById('brochure-upload').value = '';
  };

  const handleDescriptionChange = (content) => {
    setFormData(prev => ({
      ...prev,
      description: content
    }));
  };

  const calculateSellingPrice = (price, margin) => {
    if (price && margin) {
      const calculatedPrice = parseFloat(price) * (1 + (parseFloat(margin) / 100));
      return calculatedPrice.toFixed(2);
    }
    return '';
  };

  useEffect(() => {
    if (formData.purchasePriceEx && formData.margin) {
      const sellingPrice = calculateSellingPrice(formData.purchasePriceEx, formData.margin);
      setFormData(prev => ({
        ...prev,
        sellingPrice: sellingPrice
      }));
    }
  }, [formData.purchasePriceEx, formData.margin]);

  const handleNextSection = () => {
    if (activeSection < 3) {
      setActiveSection(prev => prev + 1);
    }
  };

  const handlePrevSection = () => {
    if (activeSection > 1) {
      setActiveSection(prev => prev - 1);
    }
  };

  return (
    <div className="add-product-container">
      {/* Success Message */}
      {showSuccess && (
        <div className="success-message">
          <div className="success-icon">✓</div>
          <div className="success-text">Product added successfully!</div>
        </div>
      )}

      {/* Header */}
      <div className="form-header">
        <h2>Add New Product</h2>
      </div>

      <form onSubmit={handleSubmit} className="product-form">
        {/* Basic Information Section */}
        <div className="form-section">
          <h3>Basic Information</h3>
          <div className="form-row">
            <div className="form-group required">
              <label>Product Name *</label>
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                required
                placeholder="Enter product name"
              />
            </div>

            <div className="form-group">
              <label>SKU</label>
              <input
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                placeholder="Enter SKU"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group required">
              <label>Barcode Type *</label>
              <select
                name="barcodeType"
                value={formData.barcodeType}
                onChange={handleChange}
                required
              >
                {barcodeTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="form-group required">
              <label>Unit *</label>
              <select
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                required
              >
                <option value="">Please Select</option>
                {units.map(unit => (
                  <option key={unit} value={unit}>{unit}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Brand</label>
              <select
                name="brand"
                value={formData.brand}
                onChange={handleChange}
              >
                <option value="">Please Select</option>
                {/* Add brand options here */}
              </select>
            </div>

            <div className="form-group">
              <label>Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Please Select</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Sub category</label>
              <select
                name="subcategory"
                value={formData.subcategory}
                onChange={handleChange}
              >
                <option value="">Please Select</option>
                {/* Add subcategory options here */}
              </select>
            </div>

            <div className="form-group">
              <label>Business Locations</label>
              <input
                type="text"
                name="businessLocation"
                value={formData.businessLocation}
                onChange={handleChange}
                disabled
              />
            </div>
          </div>
        </div>

        {/* Stock Management Section */}
        <div className="form-section">
          <h3>Stock Management</h3>
          <div className="form-row">
            <div className="form-group checkbox-group">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  name="manageStock"
                  checked={formData.manageStock}
                  onChange={handleChange}
                />
                <span className="checkmark"></span>
                <span className="checkbox-label">Manage Stock?</span>
              </label>
              <p className="help-text">Enable stock management at product level</p>
            </div>

            {formData.manageStock && (
              <div className="form-group">
                <label>Alert quantity</label>
                <input
                  type="number"
                  name="alertQuantity"
                  value={formData.alertQuantity}
                  onChange={handleChange}
                  placeholder="Enter alert quantity"
                />
              </div>
            )}
          </div>
        </div>

        {/* Product Description */}
        <div className="form-section">
          <h3>Product Description</h3>
          <div className="form-group">
            <Editor
              apiKey='your-tinymce-api-key'
              value={formData.description}
              onEditorChange={handleDescriptionChange}
              init={{
                height: 300,
                menubar: false,
                plugins: [
                  'advlist autolink lists link image charmap print preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media table paste code help wordcount'
                ],
                toolbar:
                  'undo redo | formatselect | bold italic backcolor | \
                  alignleft aligncenter alignright alignjustify | \
                  bullist numlist outdent indent | removeformat | help'
              }}
            />
            <p className="word-count">
              {formData.description ? formData.description.split(/\s+/).filter(word => word.length > 0).length : 0} words
              <span>Powered by Tiny</span>
            </p>
          </div>
        </div>

        {/* Product Images */}
        <div className="form-section">
          <h3>Product Images</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Product image:</label>
              <div className="file-upload">
                <input
                  type="file"
                  name="image"
                  onChange={handleChange}
                  accept="image/*"
                />
                <p className="help-text">Max File size: 5MB</p>
                <p className="help-text">Aspect ratio should be 1:1</p>
              </div>
            </div>

            <div className="form-group">
              <label>Product brochure:</label>
              <div className="file-upload">
                <input
                  type="file"
                  name="brochure"
                  onChange={handleChange}
                  accept=".pdf,.csv,.zip,.doc,.docx,.jpeg,.jpg,.png"
                />
                <p className="help-text">Max File size: 5MB</p>
                <p className="help-text">Allowed File: .pdf, .csv, .zip, .doc, .docx, .jpeg, .jpg, .png</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="form-section">
          <h3>Additional Information</h3>
          <div className="form-row">
            <div className="form-group checkbox-group">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  name="enableDescription"
                  checked={formData.enableDescription}
                  onChange={handleChange}
                />
                <span className="checkmark"></span>
                <span className="checkbox-label">Enable Product description, IMEI or Serial Number</span>
              </label>
            </div>

            <div className="form-group checkbox-group">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  name="notForSelling"
                  checked={formData.notForSelling}
                  onChange={handleChange}
                />
                <span className="checkmark"></span>
                <span className="checkbox-label">Not for selling</span>
              </label>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Weight:</label>
              <input
                type="text"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                placeholder="Enter weight"
              />
            </div>

            <div className="form-group">
              <label>Service staff timer/Preparation time (In minutes):</label>
              <input
                type="number"
                name="preparationTime"
                value={formData.preparationTime}
                onChange={handleChange}
                placeholder="Enter preparation time"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group checkbox-group">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  name="disableWoocommerceSync"
                  checked={formData.disableWoocommerceSync}
                  onChange={handleChange}
                />
                <span className="checkmark"></span>
                <span className="checkbox-label">Disable Woocommerce Sync</span>
              </label>
            </div>
          </div>
        </div>

        {/* Pricing & Tax */}
        <div className="form-section">
          <h3>Pricing & Tax</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Applicable Tax:</label>
              <select
                name="applicableTax"
                value={formData.applicableTax}
                onChange={handleChange}
              >
                <option value="">Please Select</option>
                {taxOptions.map(tax => (
                  <option key={tax} value={tax}>{tax}</option>
                ))}
              </select>
            </div>

            <div className="form-group required">
              <label>Selling Price Tax Type: *</label>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="sellingPriceTaxType"
                    value="Inclusive"
                    checked={formData.sellingPriceTaxType === 'Inclusive'}
                    onChange={handleChange}
                  />
                  Inclusive
                </label>
                <label>
                  <input
                    type="radio"
                    name="sellingPriceTaxType"
                    value="Exclusive"
                    checked={formData.sellingPriceTaxType === 'Exclusive'}
                    onChange={handleChange}
                  />
                  Exclusive
                </label>
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group required">
              <label>Product Type: *</label>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="productType"
                    value="Single"
                    checked={formData.productType === 'Single'}
                    onChange={handleChange}
                  />
                  Single
                </label>
                <label>
                  <input
                    type="radio"
                    name="productType"
                    value="Variable"
                    checked={formData.productType === 'Variable'}
                    onChange={handleChange}
                  />
                  Variable
                </label>
                <label>
                  <input
                    type="radio"
                    name="productType"
                    value="Combo"
                    checked={formData.productType === 'Combo'}
                    onChange={handleChange}
                  />
                  Combo
                </label>
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Default Purchase Price</label>
              <input
                type="number"
                name="defaultPurchasePrice"
                value={formData.defaultPurchasePrice}
                onChange={handleChange}
                placeholder="0.00"
                step="0.01"
              />
            </div>

            <div className="form-group">
              <label>Margin (%)</label>
              <input
                type="number"
                name="margin"
                value={formData.margin}
                onChange={handleChange}
                placeholder="0"
                step="0.01"
              />
            </div>

            <div className="form-group required">
              <label>Default Selling Price *</label>
              <input
                type="number"
                name="defaultSellingPrice"
                value={formData.defaultSellingPrice}
                onChange={handleChange}
                placeholder="0.00"
                step="0.01"
                required
              />
              <p className="tax-indicator">
                {formData.sellingPriceTaxType === 'Inclusive' ? 'Inc.' : 'Exc.'} tax: ${formData.defaultSellingPrice || '0.00'}
              </p>
            </div>
          </div>
        </div>
          </div>
        </div>
          {/* Barcode Type and Unit */}
          <div className="form-row">
            <div className="form-group required">
              <label>Barcode Type *</label>
              <select
                name="barcodeType"
                value={formData.barcodeType}
                onChange={handleChange}
                required
              >
                {barcodeTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group required">
              <label>Unit *</label>
              <select
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                required
              >
                <option value="">Please Select</option>
                {units.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Brand and Category */}
          <div className="form-row">
            <div className="form-group">
              <label>Brand</label>
              <div className="select-wrapper">
                <select
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                >
                  <option value="">Please Select</option>
                  <option value="Brand 1">Brand 1</option>
                  <option value="Brand 2">Brand 2</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Please Select</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Subcategory and Business Location */}
          <div className="form-row">
            <div className="form-group">
              <label>Sub Category</label>
              <div className="select-wrapper">
                <select
                  name="subcategory"
                  value={formData.subcategory}
                  onChange={handleChange}
                >
                  <option value="">Please Select</option>
                  <option value="Subcategory 1">Subcategory 1</option>
                  <option value="Subcategory 2">Subcategory 2</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Business Location</label>
              <input
                type="text"
                name="businessLocation"
                value={formData.businessLocation}
                onChange={handleChange}
                disabled
              />
            </div>
          </div>

          {/* Manage Stock and Alert Quantity */}
          <div className="form-row">
            <div className="form-group checkbox-group">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  name="manageStock"
                  checked={formData.manageStock}
                  onChange={handleChange}
                />
                <span className="checkmark"></span>
                <span className="checkbox-label">Manage Stock?</span>
                <span className="help-text">Enable stock management at product level</span>
              </label>
            </div>

            {formData.manageStock && (
              <div className="form-group">
                <label>Alert Quantity</label>
                <input
                  type="number"
                  name="alertQuantity"
                  value={formData.alertQuantity}
                  onChange={handleChange}
                  placeholder="Enter alert quantity"
                  min="0"
                />
              </div>
            )}
          </div>

          {/* Product Description */}
          <div className="form-group">
            <label>Product Description:</label>
            <div className="editor-container">
              <Editor
                apiKey="your-tinymce-api-key"
                onInit={(evt, editor) => (editorRef.current = editor)}
                initialValue={formData.description}
                init={{
                  height: 300,
                  menubar: false,
                  plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount'
                  ],
                  toolbar:
                    'undo redo | formatselect | bold italic backcolor | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | removeformat | help | wordcount'
                }}
                onEditorChange={handleDescriptionChange}
              />
              <div className="word-count">
                {formData.description ? formData.description.split(/\s+/).filter(Boolean).length : 0} words
                <span>Powered by Tiny</span>
              </div>
            </div>
          </div>

          {/* Product Image and Brochure */}
          <div className="form-row">
            <div className="form-group">
              <label>Product Image:</label>
              <div className="file-upload">
                {imagePreview ? (
                  <div className="image-preview">
                    <img src={imagePreview} alt="Preview" />
                    <button type="button" className="remove-image" onClick={handleRemoveImage}>
                      ×
                    </button>
                  </div>
                ) : (
                  <>
                    <input
                      type="file"
                      id="image-upload"
                      name="image"
                      onChange={handleFileChange}
                      accept="image/*"
                    />
                    <label htmlFor="image-upload" className="file-upload-label">
                      <span className="file-upload-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="17 8 12 3 7 8"></polyline>
                          <line x1="12" y1="3" x2="12" y2="15"></line>
                        </svg>
                      </span>
                      <span className="file-upload-text">
                        {formData.image ? formData.image.name : 'Click to upload product image'}
                      </span>
                    </label>
                  </>
                )}
                <div className="file-upload-hint">
                  Max File size: 5MB<br />
                  Aspect ratio should be 1:1
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>Product Brochure:</label>
              <div className="file-upload">
                {brochureName ? (
                  <div className="file-preview">
                    <span>{brochureName}</span>
                    <button type="button" className="remove-file" onClick={handleRemoveBrochure}>
                      ×
                    </button>
                  </div>
                ) : (
                  <>
                    <input
                      type="file"
                      id="brochure-upload"
                      name="brochure"
                      onChange={handleFileChange}
                      accept=".pdf,.csv,.zip,.doc,.docx,.jpeg,.jpg,.png"
                    />
                    <label htmlFor="brochure-upload" className="file-upload-label">
                      <span className="file-upload-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="17 8 12 3 7 8"></polyline>
                          <line x1="12" y1="3" x2="12" y2="15"></line>
                        </svg>
                      </span>
                      <span className="file-upload-text">
                        Click to upload brochure
                      </span>
                    </label>
                  </>
                )}
                <div className="file-upload-hint">
                  Max File size: 5MB<br />
                  Allowed File: .pdf, .csv, .zip, .doc, .docx, .jpeg, .jpg, .png
                </div>
              </div>
            </div>
          </div>

          {/* Checkbox Options */}
          <div className="form-row">
            <div className="form-group checkbox-group">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  name="enableDescription"
                  checked={formData.enableDescription}
                  onChange={handleChange}
                />
                <span className="checkmark"></span>
                <span className="checkbox-label">Enable Product description, IMEI or Serial Number</span>
              </label>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group checkbox-group">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  name="notForSelling"
                  checked={formData.notForSelling}
                  onChange={handleChange}
                />
                <span className="checkmark"></span>
                <span className="checkbox-label">Not for selling</span>
              </label>
            </div>
          </div>

          {/* Weight and Service Time */}
          <div className="form-row">
            <div className="form-group">
              <label>Weight (kg)</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                placeholder="0.00"
                step="0.01"
                min="0"
              />
            </div>

            <div className="form-group">
              <label>Service staff timer/Preparation time (In minutes):</label>
              <input
                type="number"
                name="serviceTime"
                value={formData.serviceTime}
                onChange={handleChange}
                placeholder="0"
                min="0"
              />
            </div>
          </div>

          {/* Woocommerce Sync */}
          <div className="form-row">
            <div className="form-group checkbox-group">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  name="disableWoocommerceSync"
                  checked={formData.disableWoocommerceSync}
                  onChange={handleChange}
                />
                <span className="checkmark"></span>
                <span className="checkbox-label">Disable Woocommerce Sync</span>
              </label>
            </div>
          </div>

          {/* Tax Information */}
          <div className="form-row">
            <div className="form-group">
              <label>Applicable Tax:</label>
              <select
                name="applicableTax"
                value={formData.applicableTax}
                onChange={handleChange}
              >
                <option value="">Please Select</option>
                {taxes.map((tax) => (
                  <option key={tax} value={tax}>
                    {tax}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Selling Price Tax Type: *</label>
              <div className="radio-group">
                <label className="radio-container">
                  <input
                    type="radio"
                    name="sellingPriceTaxType"
                    value="inclusive"
                    checked={formData.sellingPriceTaxType === 'inclusive'}
                    onChange={handleChange}
                  />
                  <span className="radio-checkmark"></span>
                  <span className="radio-label">Inclusive</span>
                </label>
                <label className="radio-container">
                  <input
                    type="radio"
                    name="sellingPriceTaxType"
                    value="exclusive"
                    checked={formData.sellingPriceTaxType === 'exclusive'}
                    onChange={handleChange}
                  />
                  <span className="radio-checkmark"></span>
                  <span className="radio-label">Exclusive</span>
                </label>
              </div>
            </div>
          </div>

          {/* Product Type */}
          <div className="form-row">
            <div className="form-group">
              <label>Product Type: *</label>
              <div className="radio-group">
                <label className="radio-container">
                  <input
                    type="radio"
                    name="productType"
                    value="Single"
                    checked={formData.productType === 'Single'}
                    onChange={handleChange}
                    required
                  />
                  <span className="radio-checkmark"></span>
                  <span className="radio-label">Single</span>
                </label>
                <label className="radio-container">
                  <input
                    type="radio"
                    name="productType"
                    value="Variable"
                    checked={formData.productType === 'Variable'}
                    onChange={handleChange}
                  />
                  <span className="radio-checkmark"></span>
                  <span className="radio-label">Variable</span>
                </label>
                <label className="radio-container">
                  <input
                    type="radio"
                    name="productType"
                    value="Combo"
                    checked={formData.productType === 'Combo'}
                    onChange={handleChange}
                  />
                  <span className="radio-checkmark"></span>
                  <span className="radio-label">Combo</span>
                </label>
              </div>
            </div>
          </div>

          {/* Pricing Section */}
          <div className="pricing-section">
            <h4>Default Purchase Price x Margin(%) = Default Selling Price</h4>
            
            <div className="form-row">
              <div className="form-group">
                <label>Exc. tax: *</label>
                <div className="input-with-prefix">
                  <span className="prefix">$</span>
                  <input
                    type="number"
                    name="purchasePriceEx"
                    value={formData.purchasePriceEx}
                    onChange={handleChange}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Margin (%)</label>
                <div className="input-with-suffix">
                  <input
                    type="number"
                    name="margin"
                    value={formData.margin}
                    onChange={handleChange}
                    placeholder="0"
                    step="0.01"
                    min="0"
                  />
                  <span className="suffix">%</span>
                </div>
              </div>

              <div className="form-group">
                <label>Inc. tax: *</label>
                <div className="input-with-prefix">
                  <span className="prefix">$</span>
                  <input
                    type="number"
                    name="purchasePriceIn"
                    value={formData.purchasePriceIn}
                    onChange={handleChange}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Selling Price: *</label>
                <div className="input-with-prefix">
                  <span className="prefix">$</span>
                  <input
                    type="number"
                    name="sellingPrice"
                    value={formData.sellingPrice}
                    onChange={handleChange}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    required
                  />
                </div>
              </div>
            </div>
          </div>


        {/* Form Actions */}
        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Save'}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              // Reset form
              setFormData({
                productName: '',
                sku: '',
                barcodeType: 'Code 128 (C128)',
                unit: '',
                brand: '',
                category: '',
                subcategory: '',
                businessLocation: "Lefty'S Liquor (BL0001)",
                alertQuantity: '',
                manageStock: false,
                description: '',
                image: null,
                brochure: null,
                enableDescription: false,
                notForSelling: false,
                weight: '',
                serviceTime: '',
                applicableTax: 'None',
                sellingPriceTaxType: 'inclusive',
                productType: 'Single',
                purchasePriceEx: '',
                purchasePriceIn: '',
                margin: '',
                sellingPrice: '',
                disableWoocommerceSync: false,
              });
              setImagePreview(null);
              setBrochureName('');
              if (editorRef.current) {
                editorRef.current.setContent('');
              }
            }}
          >
            Cancel
          </button>
        </div>
        
        {/* Core Product Details */}
        <div className={`form-section-card ${activeSection === 1 ? 'section-active' : ''}`} onClick={() => handleSectionClick(1)}>
          <div className="section-header">
            <div className="section-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
              </svg>
            </div>
            <div className="section-title">
              <h3>1. Core Product Details</h3>
              <p>Essential information about your product</p>
            </div>
            <div className="section-toggle">
              <svg className={`chevron ${activeSection === 1 ? 'expanded' : ''}`} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6,9 12,15 18,9"></polyline>
              </svg>
            </div>
          </div>
          
          {activeSection === 1 && (
            <div className="section-content">
            <div className="form-grid">
              <div className="form-field">
                <label>Product Name *</label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    name="productName"
                    value={formData.productName}
                    onChange={handleChange}
                    placeholder="Enter product name"
                    required
                    className={formData.productName ? 'has-value' : ''}
                  />
                  <div className="input-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="form-field">
                <label>SKU</label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    name="sku"
                    value={formData.sku}
                    onChange={handleChange}
                    placeholder="Enter SKU code"
                    className={formData.sku ? 'has-value' : ''}
                  />
                  <div className="input-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="form-field">
                <label>Barcode Type</label>
                <div className="select-wrapper">
                  <select
                    name="barcodeType"
                    value={formData.barcodeType}
                    onChange={handleChange}
                  >
                    <option>Code 128 (C128)</option>
                    <option>EAN-13</option>
                    <option>UPC-A</option>
                  </select>
                  <div className="select-arrow">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6,9 12,15 18,9"></polyline>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="form-field">
                <label>Unit</label>
                <div className="select-wrapper">
                  <select
                    name="unit"
                    value={formData.unit}
                    onChange={handleChange}
                  >
                    <option>Single (Single)</option>
                    <option>Kg</option>
                    <option>Litre</option>
                  </select>
                  <div className="select-arrow">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6,9 12,15 18,9"></polyline>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="form-field">
                <label>Brand</label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    placeholder="Enter brand name"
                    className={formData.brand ? 'has-value' : ''}
                  />
                  <div className="input-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                      <polyline points="9,22 9,12 15,12 15,22"></polyline>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="form-field">
                <label>Category</label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="Enter category"
                    className={formData.category ? 'has-value' : ''}
                  />
                  <div className="input-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="7" height="7"></rect>
                      <rect x="14" y="3" width="7" height="7"></rect>
                      <rect x="14" y="14" width="7" height="7"></rect>
                      <rect x="3" y="14" width="7" height="7"></rect>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="form-field">
                <label>Subcategory</label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    name="subcategory"
                    value={formData.subcategory}
                    onChange={handleChange}
                    placeholder="Enter subcategory"
                    className={formData.subcategory ? 'has-value' : ''}
                  />
                  <div className="input-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="form-field">
                <label>Business Location</label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    name="businessLocation"
                    value={formData.businessLocation}
                    onChange={handleChange}
                    placeholder="Enter business location"
                    className={formData.businessLocation ? 'has-value' : ''}
                  />
                  <div className="input-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="form-field">
                <label>Alert Quantity</label>
                <div className="input-wrapper">
                  <input
                    type="number"
                    name="alertQuantity"
                    value={formData.alertQuantity}
                    onChange={handleChange}
                    placeholder="Set alert quantity"
                    className={formData.alertQuantity ? 'has-value' : ''}
                  />
                  <div className="input-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                      <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="form-field checkbox-field">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="manageStock"
                    checked={formData.manageStock}
                    onChange={handleChange}
                  />
                  <span className="checkbox-custom"></span>
                  <span className="checkbox-text">Manage Stock?</span>
                </label>
              </div>
            </div>
            </div>
          )}
        </div>

        {/* Description & Media */}
        <div className={`form-section-card ${activeSection === 2 ? 'section-active' : ''}`} onClick={() => handleSectionClick(2)}>
          <div className="section-header">
            <div className="section-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14,2 14,8 20,8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10,9 9,9 8,9"></polyline>
              </svg>
            </div>
            <div className="section-title">
              <h3>2. Description and Media</h3>
              <p>Product details, images, and documentation</p>
            </div>
            <div className="section-toggle">
              <svg className={`chevron ${activeSection === 2 ? 'expanded' : ''}`} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6,9 12,15 18,9"></polyline>
              </svg>
            </div>
          </div>
          
          {activeSection === 2 && (
            <div className="section-content">
              <div className="description-media-layout">
                <div className="textarea-section">
                  <label>Product Description</label>
                  <div className="textarea-wrapper">
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Enter detailed product description..."
                      className={formData.description ? 'has-value' : ''}
                    />
                    <div className="char-count">{formData.description.length} characters</div>
                  </div>
                </div>

                <div className="upload-section">
                  <div className="upload-field">
                    <label>Product Image</label>
                    <div className="file-upload-wrapper">
                      <input 
                        type="file" 
                        name="image" 
                        onChange={handleFileChange}
                        accept="image/*"
                        id="image-upload"
                      />
                      <label htmlFor="image-upload" className="file-upload-label">
                        <div className="upload-icon">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                            <circle cx="8.5" cy="8.5" r="1.5"></circle>
                            <polyline points="21,15 16,10 5,21"></polyline>
                          </svg>
                        </div>
                        <div className="upload-text">
                          <span className="upload-main">{formData.image ? formData.image.name : 'Choose image'}</span>
                          <span className="upload-sub">PNG, JPG up to 10MB</span>
                        </div>
                      </label>
                    </div>
                  </div>
                  
                  <div className="upload-field">
                    <label>Product Brochure</label>
                    <div className="file-upload-wrapper">
                      <input 
                        type="file" 
                        name="brochure" 
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx"
                        id="brochure-upload"
                      />
                      <label htmlFor="brochure-upload" className="file-upload-label">
                        <div className="upload-icon">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14,2 14,8 20,8"></polyline>
                            <line x1="16" y1="13" x2="8" y2="13"></line>
                            <line x1="16" y1="17" x2="8" y2="17"></line>
                          </svg>
                        </div>
                        <div className="upload-text">
                          <span className="upload-main">{formData.brochure ? formData.brochure.name : 'Choose brochure'}</span>
                          <span className="upload-sub">PDF, DOC up to 5MB</span>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="enableDescription"
                    checked={formData.enableDescription}
                    onChange={handleChange}
                  />
                  <span className="checkbox-custom"></span>
                  <span className="checkbox-text">Enable Product description / IMEI</span>
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="notForSelling"
                    checked={formData.notForSelling}
                    onChange={handleChange}
                  />
                  <span className="checkbox-custom"></span>
                  <span className="checkbox-text">Not For Selling</span>
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="disableWooSync"
                    checked={formData.disableWooSync}
                    onChange={handleChange}
                  />
                  <span className="checkbox-custom"></span>
                  <span className="checkbox-text">Disable WooCommerce Sync</span>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Pricing and Stock */}
        <div className={`form-section-card ${activeSection === 3 ? 'section-active' : ''}`} onClick={() => handleSectionClick(3)}>
          <div className="section-header">
            <div className="section-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="1" x2="12" y2="23"></line>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
            </div>
            <div className="section-title">
              <h3>3. Pricing and Stock</h3>
              <p>Set pricing, taxes, and stock management</p>
            </div>
            <div className="section-toggle">
              <svg className={`chevron ${activeSection === 3 ? 'expanded' : ''}`} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6,9 12,15 18,9"></polyline>
              </svg>
            </div>
          </div>
          
          {activeSection === 3 && (
            <div className="section-content">
              <div className="form-grid">
                <div className="form-field">
                  <label>Weight</label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      name="weight"
                      value={formData.weight}
                      onChange={handleChange}
                      placeholder="Enter weight"
                      className={formData.weight ? 'has-value' : ''}
                    />
                    <div className="input-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="form-field">
                  <label>Service Staff Timer (minutes)</label>
                  <div className="input-wrapper">
                    <input
                      type="number"
                      name="serviceTime"
                      value={formData.serviceTime}
                      onChange={handleChange}
                      placeholder="Service time"
                      className={formData.serviceTime ? 'has-value' : ''}
                    />
                    <div className="input-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12,6 12,12 16,14"></polyline>
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="form-field">
                  <label>Applicable Tax</label>
                  <div className="select-wrapper">
                    <select
                      name="applicableTax"
                      value={formData.applicableTax}
                      onChange={handleChange}
                    >
                      <option>None</option>
                      <option>GST 5%</option>
                      <option>GST 12%</option>
                    </select>
                    <div className="select-arrow">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="6,9 12,15 18,9"></polyline>
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="form-field">
                  <label>Product Type</label>
                  <div className="select-wrapper">
                    <select
                      name="productType"
                      value={formData.productType}
                      onChange={handleChange}
                    >
                      <option>Single</option>
                      <option>Variable</option>
                    </select>
                    <div className="select-arrow">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="6,9 12,15 18,9"></polyline>
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="form-field">
                  <label>Purchase Price (Ex. Tax)</label>
                  <div className="input-wrapper">
                    <input
                      type="number"
                      name="purchasePriceEx"
                      value={formData.purchasePriceEx}
                      onChange={handleChange}
                      placeholder="0.00"
                      step="0.01"
                      className={formData.purchasePriceEx ? 'has-value' : ''}
                    />
                    <div className="input-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="12" y1="1" x2="12" y2="23"></line>
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="form-field">
                  <label>Purchase Price (Inc. Tax)</label>
                  <div className="input-wrapper">
                    <input
                      type="number"
                      name="purchasePriceIn"
                      value={formData.purchasePriceIn}
                      onChange={handleChange}
                      placeholder="0.00"
                      step="0.01"
                      className={formData.purchasePriceIn ? 'has-value' : ''}
                    />
                    <div className="input-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="12" y1="1" x2="12" y2="23"></line>
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="form-field">
                  <label>Margin (%)</label>
                  <div className="input-wrapper">
                    <input
                      type="number"
                      name="margin"
                      value={formData.margin}
                      onChange={handleChange}
                      placeholder="0.00"
                      step="0.01"
                      className={formData.margin ? 'has-value' : ''}
                    />
                    <div className="input-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="23,6 13.5,15.5 8.5,10.5 1,18"></polyline>
                        <polyline points="17,6 23,6 23,12"></polyline>
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="form-field">
                  <label>Selling Price (Ex. Tax)</label>
                  <div className="input-wrapper">
                    <input
                      type="number"
                      name="sellingPrice"
                      value={formData.sellingPrice}
                      onChange={handleChange}
                      placeholder="0.00"
                      step="0.01"
                      className={formData.sellingPrice ? 'has-value' : ''}
                    />
                    <div className="input-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="12" y1="1" x2="12" y2="23"></line>
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="button-section">
          <button type="button" className="btn btn-secondary">Cancel</button>
          <button type="button" className="btn btn-outline">Save Draft</button>
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? (
              <span className="btn-content">
                <svg className="spinner" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12a9 9 0 11-6.219-8.56"/>
                </svg>
                Saving...
              </span>
            ) : (
              <span className="btn-content">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                  <polyline points="17,21 17,13 7,13 7,21"></polyline>
                  <polyline points="7,3 7,8 15,8"></polyline>
                </svg>
                Save Product
              </span>
            )}
          </button>
          <button type="button" className="btn btn-success">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Save & Add Another
          </button>
          <button type="button" className="btn btn-info">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            </svg>
            Save & Add Stock
          </button>
        {/* Form Actions */}
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            <i className="fas fa-save"></i> Save
          </button>
          <button type="button" className="btn btn-secondary">
            <i className="fas fa-sync-alt"></i> Save & Add Another
          </button>
          <button type="button" className="btn btn-info">
            <i className="fas fa-box"></i> Save & Add Stock
          </button>
        </div>
      </form>
      
      <footer className="footer">
        <p>et-pos - V6.2 | Copyright 2025 All rights reserved.</p>
      </footer>
    </div>
  );
