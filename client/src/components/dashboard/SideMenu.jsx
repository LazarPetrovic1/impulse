import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { LanguageContext } from '../../contexts/LanguageContext'
import { sidemenucomponent } from '../../utils/langObject';
import DashboardSideMenuUl from '../../styled/DashboardSideMenuUl';

const {
  _forum,
  _social,
  _videos
} = sidemenucomponent

function SideMenu() {
  const { language } = useContext(LanguageContext)
  return (
    <nav className='navbar navbar-light d-block custom-sidenav position-relative' style={{ pointerEvents: "all" }}>
      <DashboardSideMenuUl>
        <li className='nav-item bg-light m-1 px-5 text-center'>
          <Link
            className='nav-link lead text-primary'
            to='/forum'
          >
            <i className='fas fa-comment-dots pr-2' />{' '}{_forum[language]}
          </Link>
        </li>
        <li className='nav-item bg-light m-1 px-5 text-center'>
          <Link
            className='nav-link text-primary lead'
            to='/social'
          >
            <i className='fas fa-users pr-2' />{' '}{_social[language]}
          </Link>
        </li>
        <li className='nav-item bg-light m-1 px-5 text-center'>
          <Link
            className='nav-link text-primary lead'
            to='/videos'
          >
            <i className='fas fa-video pr-2' />{' '}{_videos[language]}
          </Link>
        </li>
      </DashboardSideMenuUl>
    </nav>
  )
}

export default SideMenu
