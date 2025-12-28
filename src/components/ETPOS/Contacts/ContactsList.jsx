import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Contacts.css';

const ContactsList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sample data - replace with actual data from your backend
  const contacts = [
    { id: 1, name: 'John Doe', type: 'Customer', email: 'john@example.com', phone: '+1 234 567 890', address: '123 Main St, City', balance: 0 },
    { id: 2, name: 'Acme Distributors', type: 'Supplier', email: 'info@acme.com', phone: '+1 987 654 321', address: '456 Market St, Town', balance: 0 },
    { id: 3, name: 'Jane Smith', type: 'Customer', email: 'jane@example.com', phone: '+1 555 123 4567', address: '789 Oak Ave, Village', balance: 0 },
  ];

  return (
    <>
      {/* Search and filter bar */}
      <div className="search-bar">
        <div className="search-input">
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>
        <div className="filter-options">
          <select>
            <option>All Types</option>
            <option>Customer</option>
            <option>Supplier</option>
          </select>
          <button className="filter-btn">
            <span>⚙️</span> Filter
          </button>
        </div>
      </div>

      {/* Contacts list */}
      <div className="contacts-list">
        <div className="list-header">
          <div>Name</div>
          <div>Contact Info</div>
          <div>Address</div>
          <div>Balance</div>
          <div>Actions</div>
        </div>
        {contacts.map((contact) => (
          <div key={contact.id} className="contact-item">
            <div className="contact-name">
              <div className="avatar">
                {contact.name.charAt(0)}
              </div>
              <div>
                <div className="contact-name-text">{contact.name}</div>
                <div className="contact-type">{contact.type}</div>
              </div>
            </div>
            <div className="contact-info">
              <div>{contact.email}</div>
              <div>{contact.phone}</div>
            </div>
            <div className="contact-address">{contact.address}</div>
            <div className="contact-balance">${contact.balance.toFixed(2)}</div>
            <div className="contact-actions">
              <button className="action-btn">✏️</button>
              <button className="action-btn">🗑️</button>
              <button className="action-btn">⋮</button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button>❮ Previous</button>
        <div className="page-info">1-{contacts.length} of {contacts.length}</div>
        <button>Next ❯</button>
      </div>
    </>
  );
};

export default ContactsList;
