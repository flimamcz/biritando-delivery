import React from 'react';
import AdminForm from '../Components/AdminForm';
import { navBarAdmin } from '../utils/navBarinfo';
import Navbar from '../Components/NavBar';
import UsersTable from '../Components/UsersTable';
import '../styles/adminHeader.css';

function Admin() {
  return (
    <div className="admin-container">
      <Navbar type={ navBarAdmin } />
      <AdminForm />
      <UsersTable />
    </div>
  );
}

export default Admin;
