import React, { useState } from 'react';
import { Plus, Users, Shield, Search, Pencil, Trash2 } from 'lucide-react';
import RoleForm from './RoleForm';
import './RoleList.css';

const RoleList = () => {
  const [roles, setRoles] = useState([
    {
      id: 1,
      name: 'Admin',
      description: 'Full system access',
      usersCount: 5,
      permissions: 10,
      permissions_list: ['user.view', 'user.add', 'user.edit']
    },
    {
      id: 2,
      name: 'Manager',
      description: 'Manage operations',
      usersCount: 8,
      permissions: 6,
      permissions_list: ['user.view', 'roles.view']
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="role-management">

      {/* HEADER */}
      <div className="page-header">
        <h2>Role Management</h2>
        <button
          className="btn btn-primary"
          onClick={() => {
            setShowAddForm(true);
            setEditingRole(null);
          }}
        >
          <Plus size={16} /> Add Role
        </button>
      </div>

      {/* SEARCH */}
      {!showAddForm && !editingRole && (
        <div className="filters-section">
          <div className="search-box">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search roles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      )}

      {/* ROLE TABLE */}
      {!showAddForm && !editingRole && (
        <div className="roles-table-container">
          <table className="roles-table">
            <thead>
              <tr>
                <th>Role</th>
                <th>Description</th>
                <th>Users</th>
                <th>Permissions</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRoles.map(role => (
                <tr key={role.id}>
                  <td><Shield size={14} /> {role.name}</td>
                  <td>{role.description}</td>
                  <td><Users size={14} /> {role.usersCount}</td>
                  <td>{role.permissions}</td>
                  <td>
                    <div className="actions-cell">
                      <button
                        type="button"
                        className="action-btn edit-btn"
                        onClick={() => setEditingRole(role)}
                        title="Edit"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        type="button"
                        className="action-btn delete-btn"
                        onClick={() => setRoles(roles.filter(r => r.id !== role.id))}
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ROLE FORM */}
      {(showAddForm || editingRole) && (
        <RoleForm
          initialData={editingRole}
          onCancel={() => {
            setShowAddForm(false);
            setEditingRole(null);
          }}
          onSubmit={(data) => {
            if (editingRole) {
              setRoles(roles.map(role =>
                role.id === editingRole.id
                  ? {
                      ...role,
                      name: data.name,
                      description: data.description,
                      permissions: data.permissions_list.length,
                      permissions_list: data.permissions_list
                    }
                  : role
              ));
              setEditingRole(null);
            } else {
              setRoles([
                ...roles,
                {
                  id: roles.length + 1,
                  name: data.name,
                  description: data.description,
                  usersCount: 0,
                  permissions: data.permissions_list.length,
                  permissions_list: data.permissions_list
                }
              ]);
            }
            setShowAddForm(false);
          }}
        />
      )}

    </div>
  );
};

export default RoleList;
