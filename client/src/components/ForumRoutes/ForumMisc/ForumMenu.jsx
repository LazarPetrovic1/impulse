import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ThemeContext } from '../../../contexts/ThemeContext';
import LeftSideNavigation from '../../../styled/Forum/ForumLeftSideNavigation';

function ForumMenu (props) {
  const { isDarkTheme } = useContext(ThemeContext)

  return (
    <LeftSideNavigation isDarkTheme={isDarkTheme}>
      <ul>
        <li><Link to='/forum/forum-add-post'><i className='fas fa-plus' /> New post</Link></li>
        <li><Link to='/forum/forum-favourite-1'>Forum 1</Link></li>
        <li><Link to='/forum/forum-favourite-2'>Forum 2</Link></li>
        <li><Link to='/forum/forum-favourite-3'>Forum 3</Link></li>
        <li><Link to='/forum/forum-favourite-4'>Forum 4</Link></li>
      </ul>
    </LeftSideNavigation>
  )
}

export default ForumMenu
