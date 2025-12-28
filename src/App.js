import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import ETPOSDashboard from "./ETPOSDashboard";
import AddUser from "./components/AddUser";
import UserManagement from "./components/UserManagement";
import Roles from "./components/Roles";
import SalesCommissionAgents from "./components/SalesCommissionAgents";
import Contacts from "./components/ETPOS/Contacts";
import ContactsList from "./components/ETPOS/Contacts/ContactsList";
import CustomerGroups from "./components/ETPOS/Contacts/CustomerGroups";
import ImportContacts from "./components/ETPOS/Contacts/ImportContacts";
import Reports from "./components/ETPOS/Contacts/Reports";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ETPOSDashboard />}>
          <Route index element={<Navigate to="/home" replace />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="users/add" element={<AddUser />} />
          <Route path="users/roles" element={<Roles />} />
          <Route path="users/sales-commission-agents" element={<SalesCommissionAgents />} />
          
          {/* Contacts Routes */}
          <Route path="contacts" element={<Contacts />}>
            <Route index element={<ContactsList />} />
            <Route path="customer-groups" element={<CustomerGroups />} />
            <Route path="import" element={<ImportContacts />} />
            <Route path="reports" element={<Reports />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
