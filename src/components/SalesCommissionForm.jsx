import React, { useEffect, useState } from 'react';
import './SalesCommissionAgents.css';
import './RoleList.css'; /* load shared role form styles for consistent card/input spacing */

const SalesCommissionForm = ({ initialData = null, onSubmit, onCancel }) => {
  const [form, setForm] = useState({
    prefix: 'Mr',
    first_name: '',
    last_name: '',
    email: '',
    contact: '',
    address: '',
    commission: ''
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        prefix: initialData.prefix || 'Mr',
        first_name: initialData.first_name || '',
        last_name: initialData.last_name || '',
        email: initialData.email || '',
        contact: initialData.contact || '',
        address: initialData.address || '',
        commission: initialData.commission || ''
      });
    } else {
      setForm({ prefix: 'Mr', first_name: '', last_name: '', email: '', contact: '', address: '', commission: '' });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!form.first_name) return; // minimal validation
    onSubmit && onSubmit({ ...form });
  };

  return (
    <div className="role-form-card sca-form-card">
      <div className="card-header bg-light py-2 d-flex justify-content-between align-items-center">
        <h5 className="mb-0">{initialData ? 'Edit sales commission agent' : 'Add sales commission agent'}</h5>
        <button className="close-btn" onClick={() => onCancel && onCancel()}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <div className="card-body">
        <div className="form-content">
          <div className="row g-0">
            <div className="col-md-2">
              <label className="form-label small fw-medium text-muted">Prefix:</label>
              <select name="prefix" value={form.prefix} onChange={handleChange} className="form-select form-select-sm">
                <option>Mr</option>
                <option>Mrs</option>
                <option>Miss</option>
              </select>
            </div>
            <div className="col-md-5">
              <label className="form-label small fw-medium text-muted">First Name:*</label>
              <input name="first_name" value={form.first_name} onChange={handleChange} className="form-control form-control-sm" />
            </div>
            <div className="col-md-5">
              <label className="form-label small fw-medium text-muted">Last Name:</label>
              <input name="last_name" value={form.last_name} onChange={handleChange} className="form-control form-control-sm" />
            </div>

            <div className="col-md-6 mt-3">
              <label className="form-label small fw-medium text-muted">Email:</label>
              <input name="email" value={form.email} onChange={handleChange} className="form-control form-control-sm" />
            </div>
            <div className="col-md-6 mt-3">
              <label className="form-label small fw-medium text-muted">Contact Number:</label>
              <input name="contact" value={form.contact} onChange={handleChange} className="form-control form-control-sm" />
            </div>

            <div className="col-12 mt-3">
              <label className="form-label small fw-medium text-muted">Address:</label>
              <textarea name="address" value={form.address} onChange={handleChange} className="form-control" rows={3} />
            </div>

            <div className="col-md-6 mt-3">
              <label className="form-label small fw-medium text-muted">Sales Commission Percentage (%):</label>
              <input name="commission" value={form.commission} onChange={handleChange} className="form-control form-control-sm" placeholder="Sales Commission Percentage (%)" />
            </div>
          </div>
        </div>
      </div>

      <div className="form-footer">
        <button className="btn btn-light border cancel-btn" onClick={() => onCancel && onCancel()}>Close</button>
        <button className="btn btn-primary submit-btn" onClick={handleSubmit}>Save</button>
      </div>
    </div>
  );
};

export default SalesCommissionForm;
