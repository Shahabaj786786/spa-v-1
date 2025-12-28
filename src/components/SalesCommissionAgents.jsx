import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import './SalesCommissionAgents.css';
import SalesCommissionForm from './SalesCommissionForm';

const SalesCommissionAgents = () => {
  const [agents, setAgents] = useState([
    { id: 1, name: 'mr John Doe', email: 'john@example.com', contact: '4456451535', address: 'ccascsacas', commission: '10.00' }
  ]);
  const [search, setSearch] = useState('');
  const [showAddAgent, setShowAddAgent] = useState(false);
  const [editingAgent, setEditingAgent] = useState(null);

  const filtered = agents.filter(a => a.name.toLowerCase().includes(search.toLowerCase()) || a.email.toLowerCase().includes(search.toLowerCase()));

  // Export/Print helpers
  const generateCSV = (rows, headers) => {
    const all = [headers, ...rows];
    return all.map(r => r.map(cell => '"' + String(cell ?? '').replace(/"/g,'""') + '"').join(',')).join('\n');
  };

  const exportCSV = () => {
    if (!agents.length) return;
    const headers = ['Name','Email','Contact Number','Address','Sales Commission Percentage (%)'];
    const rows = agents.map(a => [a.name, a.email, a.contact, a.address, a.commission]);
    const csv = generateCSV(rows, headers);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'sales_commission_agents.csv');
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const exportExcel = () => {
    if (!agents.length) return;
    // Simple approach: export CSV with Excel-compatible mime & .xls extension
    const headers = ['Name','Email','Contact Number','Address','Sales Commission Percentage (%)'];
    const rows = agents.map(a => [a.name, a.email, a.contact, a.address, a.commission]);
    const csv = generateCSV(rows, headers);
    const blob = new Blob([csv], { type: 'application/vnd.ms-excel' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'sales_commission_agents.xls');
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    if (!agents.length) return;
    const headers = ['Name','Email','Contact Number','Address','Sales Commission Percentage (%)'];
    const rows = agents.map(a => [a.name, a.email, a.contact, a.address, a.commission]);
    const tableRows = rows.map(r => '<tr>' + r.map(c => '<td>' + String(c ?? '') + '</td>').join('') + '</tr>').join('');
    const html = `<!doctype html><html><head><title>Sales Commission Agents</title><style>body{font-family:Arial,Helvetica,sans-serif;padding:20px;color:#111}table{width:100%;border-collapse:collapse}th,td{border:1px solid #ddd;padding:8px;text-align:left}th{background:#f3f4f6;font-weight:700}</style></head><body><h2>Sales Commission Agents</h2><table><thead><tr>${headers.map(h => '<th>'+h+'</th>').join('')}</tr></thead><tbody>${tableRows}</tbody></table></body></html>`;
    const printWin = window.open('', '_blank');
    if (!printWin) return;
    printWin.document.open();
    printWin.document.write(html);
    printWin.document.close();
    // Give it a moment to render then print
    setTimeout(() => { printWin.focus(); printWin.print(); /* printWin.close(); */ }, 300);
  };

  return (
    <div className="sca-container">
      <div className="page-header">
        <h2>Sales Commission Agents</h2>
        <button className="btn btn-primary" onClick={() => { setShowAddAgent(true); setEditingAgent(null); }}>
          <Plus size={16} className="me-1" /> Add
        </button>
      </div>

      {(!showAddAgent && !editingAgent) && (
        <div className="card shadow-sm w-100">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
              <div className="left-controls d-flex align-items-center flex-wrap gap-2">
                <label className="d-flex align-items-center">Show <select className="form-select form-select-sm mx-2 w-auto"><option>25</option></select> entries</label>
                <button className="btn export-btn export-csv" onClick={exportCSV} title="Export CSV" disabled={agents.length === 0}>Export CSV</button>
                <button className="btn export-btn export-excel" onClick={exportExcel} title="Export Excel" disabled={agents.length === 0}>Export Excel</button>
                <button className="btn export-btn export-print" onClick={handlePrint} title="Print list" disabled={agents.length === 0}>Print</button>
              </div>
              <div className="search-area">
                <input className="form-control" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
            </div>

            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Contact Number</th>
                    <th>Address</th>
                    <th>Sales Commission Percentage (%)</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(agent => (
                    <tr key={agent.id}>
                      <td>{agent.name}</td>
                      <td>{agent.email}</td>
                      <td>{agent.contact}</td>
                      <td>{agent.address}</td>
                      <td>{agent.commission}</td>
                      <td>
                        <button className="btn btn-light border btn-sm" onClick={() => { setEditingAgent(agent); setShowAddAgent(false); }}>Edit</button>
                        <button className="btn btn-light border btn-sm ms-2" onClick={() => setAgents(prev => prev.filter(a => a.id !== agent.id))}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {(showAddAgent || editingAgent) && (
        <div className="modal-overlay" onClick={(e) => { if (e.target.classList && e.target.classList.contains('modal-overlay')) { setShowAddAgent(false); setEditingAgent(null); } }}>
          <div className="modal-center">
            <SalesCommissionForm
              initialData={editingAgent}
              onCancel={() => { setShowAddAgent(false); setEditingAgent(null); }}
              onSubmit={(data) => {
                if (editingAgent) {
                  setAgents(prev => prev.map(a => a.id === editingAgent.id ? { ...a, prefix: data.prefix, first_name: data.first_name, last_name: data.last_name, email: data.email, contact: data.contact, address: data.address, commission: data.commission, name: `${data.prefix} ${data.first_name} ${data.last_name}` } : a));
                  setEditingAgent(null);
                } else {
                  const id = agents.length ? Math.max(...agents.map(a => a.id)) + 1 : 1;
                  setAgents(prev => [...prev, { id, prefix: data.prefix, first_name: data.first_name, last_name: data.last_name, email: data.email, contact: data.contact, address: data.address, commission: data.commission, name: `${data.prefix} ${data.first_name} ${data.last_name}` }]);
                  setShowAddAgent(false);
                }
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesCommissionAgents;
