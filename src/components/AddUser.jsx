import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, X } from 'lucide-react';
import './AddUser.css';
import RoleForm from './RoleForm';

const AddUser = () => {
  const navigate = useNavigate();
  const [showAddRole, setShowAddRole] = useState(false);
  const [rolesOptions, setRolesOptions] = useState(['admin','manager','user']);
  
  const [formData, setFormData] = useState({
    // Personal Information
    prefix: 'mr',
    first_name: '',
    last_name: '',
    email: '',
    is_active: true,
    enable_service_staff_pin: false,

    // Roles and Permissions
    allow_login: true,
    username: '',
    password: '',
    confirm_password: '',
    role: 'admin',

    // Sales
    cmmsn_percent: '',
    max_discount_percent: '',
    selected_contacts: false,

    // More Informations
    date_of_birth: '',
    gender: '',
    marital_status: '',
    blood_group: '',
    mobile: '',
    alternate_contact: '',
    family_contact: '',
    facebook: '',
    twitter: '',
    social_media_1: '',
    social_media_2: '',
    custom_field_1: '',
    custom_field_2: '',
    custom_field_3: '',
    custom_field_4: '',
    guardian_name: '',
    id_proof_name: '',
    id_proof_number: '',
    permanent_address: '',
    current_address: '',

    // Bank Details
    account_holder_name: '',
    account_number: '',
    bank_name: '',
    bank_identifier_code: '',
    branch: '',
    tax_payer_id: '',

    // HRM Details
    department: '',
    designation: '',

    // Payroll
    primary_work_location: '',
    basic_salary: '',
    pay_period: 'per_month',
    pay_components: '',

    // Misc
    language: 'en'
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="admin-form-wrapper">
      <div className="add-user-header sticky-top d-flex justify-content-between align-items-center">
        <button
          className="btn btn-light border"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={16} className="me-1" /> Back
        </button>
        <h4 className="add-user-title mb-0 text-primary fw-bold">Add New User</h4>
        <div className="d-flex gap-2">
          <button
            type="button"
            className="btn btn-light border"
            onClick={() => navigate(-1)}
          >
            <X size={16} className="me-1" /> Cancel
          </button>
          <button type="submit" form="userForm" className="btn btn-primary">
            <Save size={16} className="me-1" /> Save User
          </button>
        </div>
      </div>

      <div className="form-content-container">
        <form id="userForm" onSubmit={handleSubmit} className="add-user-form p-3">
          <div className="card shadow-sm w-100 mb-3">
            <div className="card-header bg-light py-2">
              <h5 className="mb-0">
                <i className="bi bi-person me-2"></i>User Information
              </h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-3">
                  <label className="form-label small fw-medium text-muted">Prefix</label>
                  <select
                    className="form-select form-select-sm"
                    name="prefix"
                    value={formData.prefix}
                    onChange={handleChange}
                  >
                    <option value="mr">Mr</option>
                    <option value="mrs">Mrs</option>
                    <option value="miss">Miss</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <label className="form-label small fw-medium text-muted">First Name *</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    required 
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label small fw-medium text-muted">Last Name</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label small fw-medium text-muted">Email</label>
                  <input
                    type="email"
                    className="form-control form-control-sm"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="col-md-3">
                  <div className="form-check mt-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="is_active"
                      name="is_active"
                      checked={!!formData.is_active}
                      onChange={handleChange}
                    />
                    <label className="form-check-label small" htmlFor="is_active">Is active ?</label>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-check mt-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="enable_service_staff_pin"
                      name="enable_service_staff_pin"
                      checked={!!formData.enable_service_staff_pin}
                      onChange={handleChange}
                    />
                    <label className="form-check-label small" htmlFor="enable_service_staff_pin">Enable service staff pin</label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card shadow-sm w-100 mb-3">
            <div className="card-header bg-light py-2">
              <h5 className="mb-0">Roles and Permissions</h5>
            </div>
            <div className="card-body">
              { !showAddRole ? (
                <div className="row g-3">
                  <div className="col-md-3">
                    <div className="form-check mt-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="allow_login"
                        name="allow_login"
                        checked={!!formData.allow_login}
                        onChange={handleChange}
                      />
                      <label className="form-check-label small" htmlFor="allow_login">Allow login</label>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <label className="form-label small fw-medium text-muted">Username</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label small fw-medium text-muted">Password *</label>
                    <input
                      type="password"
                      className="form-control form-control-sm"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label small fw-medium text-muted">Confirm Password *</label>
                    <input
                      type="password"
                      className="form-control form-control-sm"
                      name="confirm_password"
                      value={formData.confirm_password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label small fw-medium text-muted">Role *</label>
                    <select
                      className="form-select form-select-sm"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select</option>
                      {rolesOptions.map(r => (
                        <option key={r} value={r}>{r.charAt(0).toUpperCase() + r.slice(1)}</option>
                      ))}
                    </select>
                    <div className="mt-2">
                      <button type="button" className="btn btn-light btn-sm border" onClick={() => setShowAddRole(true)}>Add new roles</button>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <RoleForm
                    onCancel={() => setShowAddRole(false)}
                    onSubmit={(data) => {
                      const key = data.name.toLowerCase().replace(/\s+/g, '_');
                      setRolesOptions(prev => [...prev, key]);
                      setFormData(prev => ({ ...prev, role: key }));
                      setShowAddRole(false);
                    }}
                  />
                </div>
              ) }
            </div>
          </div>

          <div className="card shadow-sm w-100 mb-3">
            <div className="card-header bg-light py-2">
              <h5 className="mb-0">Sales</h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-3">
                  <label className="form-label small fw-medium text-muted">Sales Commission (%):</label>
                  <div className="input-group input-group-sm">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="cmmsn_percent"
                      value={formData.cmmsn_percent}
                      onChange={handleChange}
                    />
                    <span className="input-group-text">%</span>
                  </div>
                </div>
                <div className="col-md-3">
                  <label className="form-label small fw-medium text-muted">Max discount (%):</label>
                  <div className="input-group input-group-sm">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="max_discount_percent"
                      value={formData.max_discount_percent}
                      onChange={handleChange}
                    />
                    <span className="input-group-text">%</span>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-check mt-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="selected_contacts"
                      name="selected_contacts"
                      checked={!!formData.selected_contacts}
                      onChange={handleChange}
                    />
                    <label className="form-check-label small" htmlFor="selected_contacts">Allow Selected Contacts</label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card shadow-sm w-100 mb-3">
            <div className="card-header bg-light py-2">
              <h5 className="mb-0">More Informations</h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-3">
                  <label className="form-label small fw-medium text-muted">Date of birth:</label>
                  <input
                    type="date"
                    className="form-control form-control-sm"
                    name="date_of_birth"
                    value={formData.date_of_birth}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label small fw-medium text-muted">Gender:</label>
                  <select
                    className="form-select form-select-sm"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="">Please Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <label className="form-label small fw-medium text-muted">Marital Status:</label>
                  <select
                    className="form-select form-select-sm"
                    name="marital_status"
                    value={formData.marital_status}
                    onChange={handleChange}
                  >
                    <option value="">Marital Status</option>
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                    <option value="divorced">Divorced</option>
                    <option value="widowed">Widowed</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <label className="form-label small fw-medium text-muted">Blood Group:</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="blood_group"
                    value={formData.blood_group}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-3">
                  <label className="form-label small fw-medium text-muted">Mobile Number:</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label small fw-medium text-muted">Alternate contact number:</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="alternate_contact"
                    value={formData.alternate_contact}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label small fw-medium text-muted">Family contact number:</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="family_contact"
                    value={formData.family_contact}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label small fw-medium text-muted">Facebook Link:</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="facebook"
                    value={formData.facebook}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-3">
                  <label className="form-label small fw-medium text-muted">Twitter Link:</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="twitter"
                    value={formData.twitter}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label small fw-medium text-muted">Social Media 1:</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="social_media_1"
                    value={formData.social_media_1}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label small fw-medium text-muted">Social Media 2:</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="social_media_2"
                    value={formData.social_media_2}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-3">
                  <label className="form-label small fw-medium text-muted">Custom field 1:</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="custom_field_1"
                    value={formData.custom_field_1}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label small fw-medium text-muted">Custom field 2:</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="custom_field_2"
                    value={formData.custom_field_2}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label small fw-medium text-muted">Custom field 3:</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="custom_field_3"
                    value={formData.custom_field_3}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label small fw-medium text-muted">Custom field 4:</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="custom_field_4"
                    value={formData.custom_field_4}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-3">
                  <label className="form-label small fw-medium text-muted">Guardian Name:</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="guardian_name"
                    value={formData.guardian_name}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label small fw-medium text-muted">ID proof name:</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="id_proof_name"
                    value={formData.id_proof_name}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label small fw-medium text-muted">ID proof number:</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="id_proof_number"
                    value={formData.id_proof_number}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-3">
                  <label className="form-label small fw-medium text-muted">Permanent Address:</label>
                  <textarea
                    className="form-control form-control-sm"
                    name="permanent_address"
                    value={formData.permanent_address}
                    onChange={handleChange}
                    rows="2"
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label small fw-medium text-muted">Current Address:</label>
                  <textarea
                    className="form-control form-control-sm"
                    name="current_address"
                    value={formData.current_address}
                    onChange={handleChange}
                    rows="2"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="card shadow-sm w-100 mb-3">
            <div className="card-header bg-light py-2">
              <h5 className="mb-0">Bank Details:</h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-3">
                  <label className="form-label small fw-medium text-muted">Account Holder's Name:</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="account_holder_name"
                    value={formData.account_holder_name}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label small fw-medium text-muted">Account Number:</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="account_number"
                    value={formData.account_number}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label small fw-medium text-muted">Bank Name:</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="bank_name"
                    value={formData.bank_name}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label small fw-medium text-muted">Bank Identifier Code:</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="bank_identifier_code"
                    value={formData.bank_identifier_code}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label small fw-medium text-muted">Branch:</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="branch"
                    value={formData.branch}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label small fw-medium text-muted">Tax Payer ID:</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="tax_payer_id"
                    value={formData.tax_payer_id}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="card shadow-sm w-100 mb-3">
            <div className="card-header bg-light py-2">
              <h5 className="mb-0">HRM Details</h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-3">
                  <label className="form-label small fw-medium text-muted">Department *</label>
                  <select
                    className="form-select form-select-sm"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Please Select</option>
                    <option value="sales">Sales</option>
                    <option value="purchase">Purchase</option>
                    <option value="accounts">Accounts</option>
                    <option value="hr">HR</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <label className="form-label small fw-medium text-muted">Designation *</label>
                  <select
                    className="form-select form-select-sm"
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Please Select</option>
                    <option value="staff">Staff</option>
                    <option value="supervisor">Supervisor</option>
                    <option value="manager">Manager</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="card shadow-sm w-100 mb-3">
            <div className="card-header bg-light py-2">
              <h5 className="mb-0">Payroll</h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-3">
                  <label className="form-label small fw-medium text-muted">Primary work location:</label>
                  <select
                    className="form-select form-select-sm"
                    name="primary_work_location"
                    value={formData.primary_work_location}
                    onChange={handleChange}
                  >
                    <option value="">Please Select</option>
                    <option value="main">Main</option>
                    <option value="branch">Branch</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <label className="form-label small fw-medium text-muted">Basic salary:</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="basic_salary"
                    value={formData.basic_salary}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label small fw-medium text-muted">Pay Period:</label>
                  <select
                    className="form-select form-select-sm"
                    name="pay_period"
                    value={formData.pay_period}
                    onChange={handleChange}
                  >
                    <option value="per_month">Per Month</option>
                    <option value="per_week">Per Week</option>
                    <option value="per_day">Per Day</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <label className="form-label small fw-medium text-muted">Pay Components:</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="pay_components"
                    value={formData.pay_components}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="add-user-footer card shadow-sm mb-3">
            <div className="card-body d-flex justify-content-between align-items-center py-3">
              <div>
                <small className="text-muted">* indicates required field</small>
              </div>
              <div className="d-flex gap-2">
                <button 
                  type="button" 
                  className="btn btn-light border"
                  onClick={() => navigate(-1)}
                >
                  <X size={16} className="me-1" /> Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <Save size={16} className="me-1" /> Save User
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;