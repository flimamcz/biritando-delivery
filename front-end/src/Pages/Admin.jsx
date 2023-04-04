import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import AdminForm from '../Components/AdminForm';
import { navBarAdmin } from '../utils/navBarinfo';
import Navbar from '../Components/NavBar';
import MyContext from '../context/MyContext';

function Admin() {
  const { isLogged } = useContext(MyContext);
  if (!isLogged) {
    return <Redirect to="/login" />;
  }
  return (
    <div>
      <Navbar type={ navBarAdmin } />
      <AdminForm />
    </div>
  );
}

export default Admin;
