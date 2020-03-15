import React from 'react'
import { Link } from 'react-router-dom'

const SideMenu = () => (
  <nav className="navbar navbar-light d-block custom-sidenav rel">
    <ul className='navbar-nav mr-auto abs-sidenav'>
      <li className='nav-item bg-light m-1 px-5 text-center'>
        <Link
          className='nav-link text-dark lead'
          to='/forum'
        >
          <i className="fas fa-comment-dots"></i>{" "}Forum
        </Link>
      </li>
      <li className='nav-item bg-light m-1 px-5 text-center'>
        <Link
          className='nav-link text-dark lead'
          to='/social'
        >
          <i className="fas fa-users"></i>{" "}Social
        </Link>
      </li>
      <li className='nav-item bg-light m-1 px-5 text-center'>
        <Link
          className='nav-link text-dark lead'
          to='/videos'
        >
          <i className="fas fa-video"></i>{" "}Videos
        </Link>
      </li>
    </ul>
  </nav>
)

export default SideMenu
