import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Users, ShoppingCart } from 'lucide-react';
import './UserManagement.css';

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', joinDate: '2023-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Manager', status: 'Active', joinDate: '2023-02-20' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive', joinDate: '2023-03-10' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Manager', status: 'Active', joinDate: '2023-04-05' },
    { id: 5, name: 'Mike Wilson', email: 'mike@example.com', role: 'User', status: 'Active', joinDate: '2023-05-12' },
  ]);

  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  const [activeTab, setActiveTab] = useState('users');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'User',
    status: 'Active',
  });

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const handleAddUser = () => {
    if (formData.name && formData.email) {
      const newUser = {
        id: users.length + 1,
        ...formData,
        joinDate: new Date().toISOString().split('T')[0]
      };
      setUsers([...users, newUser]);
      setFormData({ name: '', email: '', role: 'User', status: 'Active' });
      setShowAddModal(false);
    }
  };

  const handleAddNewUser = () => {
    navigate('/users/add');
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status
    });
  };

  const handleUpdateUser = () => {
    setUsers(users.map(user => 
      user.id === editingUser.id ? { ...user, ...formData } : user
    ));
    setEditingUser(null);
    setFormData({ name: '', email: '', role: 'User', status: 'Active' });
  };

  const handleDeleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const handleStatusToggle = (userId) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' }
        : user
    ));
  };

  return (
    <div className="user-management">
      <div className="page-header">
        <h2>User Management</h2>
        <button 
          className="btn btn-primary"
          onClick={handleAddNewUser}
        >
          <Plus size={16} className="mr-1" /> Add User
        </button>
      </div>
      
      <div className="filters-section">
        <div className="search-box">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select 
          className="role-filter"
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
        >
          <option value="all">All Roles</option>
          <option value="Admin">Admin</option>
          <option value="Manager">Manager</option>
          <option value="User">User</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Role</th>
              <th>Status</th>
              <th>Join Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td className="user-info">
                  <div className="user-avatar">
                    {user.name.charAt(0)}
                  </div>
                  <div className="user-details">
                    <div className="user-name">{user.name}</div>
                    <div className="user-email">{user.email}</div>
                  </div>
                </td>
                <td>
                  <span className={`role-badge role-${user.role.toLowerCase()}`}>
                    {user.role}
                  </span>
                </td>
                <td>
                  <button 
                    className={`status-toggle ${user.status.toLowerCase()}`}
                    onClick={() => handleStatusToggle(user.id)}
                  >
                    {user.status}
                  </button>
                </td>
                <td>{user.joinDate}</td>
                <td className="actions-cell">
                  <button 
                    className="action-btn edit-btn"
                    onClick={() => handleEditUser(user)}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </button>
                  <button 
                    className="action-btn delete-btn"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3,6 5,6 21,6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit User Modal */}
      {(showAddModal || editingUser) && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>{editingUser ? 'Edit User' : 'Add New User'}</h3>
              <button 
                className="close-btn"
                onClick={() => {
                  setShowAddModal(false);
                  setEditingUser(null);
                  setFormData({ name: '', email: '', role: 'User', status: 'Active' });
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Enter user name"
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="Enter email address"
                />
              </div>
              <div className="form-group">
                <label>Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                >
                  <option value="User">User</option>
                  <option value="Manager">Manager</option>
                  <option value="Admin">Admin</option>
                </select>
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
                  setEditingUser(null);
                  setFormData({ name: '', email: '', role: 'User', status: 'Active' });
                }}
              >
                Cancel
              </button>
              <button 
                className="submit-btn"
                onClick={editingUser ? handleUpdateUser : handleAddUser}
              >
                {editingUser ? 'Update User' : 'Add User'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
