import React from 'react';
import AdminForm from '../Components/AdminForm';
import { navBarAdmin } from '../utils/navBarinfo';
import Navbar from '../Components/NavBar';

function Admin() {
  return (
    <div>
      <Navbar type={ navBarAdmin } />
      <AdminForm />
    </div>
  );
}

export default Admin;
