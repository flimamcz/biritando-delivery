import React from 'react';
import NavBar from '../Components/NavBar';

function OrderDetail() {
  const typeNav = role === 'seller' ? navBarSeller : navBarCustomer[1];
  return (
    <div>
      <NavBar type={ typeNav } />
    </div>
  );
}

export default OrderDetail;
