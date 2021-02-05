import React from 'react';

function CenterListItem({ children }) {
  return (
    <li className='nav-item px-1 d-flex justify-content-center align-items-center'>
      {children}
    </li>
  )
}

export default CenterListItem;
