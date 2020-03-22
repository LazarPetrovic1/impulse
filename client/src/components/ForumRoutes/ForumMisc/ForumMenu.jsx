import React from 'react'
import { Link } from 'react-router-dom'

const block = { display: 'block', width: '100%' }

function ForumMenu (props) {
  return (
    <nav className='navbar-light custom-sidenav left-side-navigation span-col-2'>
      <ul style={{ listStyleType: 'none', padding: 0, margin: 0, width: '100%' }} className='forum-side-navigation-list'>
        <li style={block} className='py-3 rel forum-side-navigation-list-item'>
          <Link to='/forum/forum-add-post' className='forum-side-navigation-links'>
            <i className='fas fa-plus' /> New post
          </Link>
        </li>
        <li style={block} className='py-3 rel forum-side-navigation-list-item'>
          <Link to='/forum/forum-favourite-1' className='forum-side-navigation-links'>
            Forum 1
          </Link>
        </li>
        <li style={block} className='py-3 rel forum-side-navigation-list-item'>
          <Link to='/forum/forum-favourite-2' className='forum-side-navigation-links'>
            Forum 2
          </Link>
        </li>
        <li style={block} className='py-3 rel forum-side-navigation-list-item'>
          <Link to='/forum/forum-favourite-3' className='forum-side-navigation-links'>
            Forum 3
          </Link>
        </li>
        <li style={block} className='py-3 rel forum-side-navigation-list-item'>
          <Link to='/forum/forum-favourite-4' className='forum-side-navigation-links'>
            Forum 4
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default ForumMenu
