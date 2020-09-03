import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ThemeContext } from '../../../contexts/ThemeContext'

const block = { display: 'block', width: '100%' }

function ForumMenu (props) {
  const { isDarkTheme } = useContext(ThemeContext)
  return (
    <nav className='navbar-light bg-transparent span-col-2'>
      <ul
        style={{
          // backgroundColor: 'rgba(255, 255, 255, 0.4)',
          listStyleType: 'none',
          padding: 0,
          margin: 0,
          width: '100%'
        }}
        className='forum-side-navigation-list left-side-navigation'
      >
        <li style={block} className='py-3 rel forum-side-navigation-list-item'>
          <Link
            to='/forum/forum-add-post'
            style={{ color: isDarkTheme ? '#fff' : '#222' }}
            className='forum-side-navigation-links'
          >
            <i className='fas fa-plus' /> New post
          </Link>
        </li>
        <li style={block} className='py-3 rel forum-side-navigation-list-item'>
          <Link
            to='/forum/forum-favourite-1'
            style={{ color: isDarkTheme ? '#fff' : '#222' }}
            className='forum-side-navigation-links'
          >
            Forum 1
          </Link>
        </li>
        <li style={block} className='py-3 rel forum-side-navigation-list-item'>
          <Link
            to='/forum/forum-favourite-2'
            style={{ color: isDarkTheme ? '#fff' : '#222' }}
            className='forum-side-navigation-links'
          >
            Forum 2
          </Link>
        </li>
        <li style={block} className='py-3 rel forum-side-navigation-list-item'>
          <Link
            to='/forum/forum-favourite-3'
            style={{ color: isDarkTheme ? '#fff' : '#222' }}
            className='forum-side-navigation-links'
          >
            Forum 3
          </Link>
        </li>
        <li style={block} className='py-3 rel forum-side-navigation-list-item'>
          <Link
            to='/forum/forum-favourite-4'
            style={{ color: isDarkTheme ? '#fff' : '#222' }}
            className='forum-side-navigation-links'
          >
            Forum 4
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default ForumMenu
