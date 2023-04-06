import React from 'react';
import AdminForm from '../Components/AdminForm';
import { navBarAdmin } from '../utils/navBarinfo';
import Navbar from '../Components/NavBar';
import UsersTable from '../Components/UsersTable';

function Admin() {
  return (
    <div>
      <Navbar type={ navBarAdmin } />
      <AdminForm />
      <UsersTable />
    </div>
  );
}

export default Admin;
