import React, { Fragment, useContext, useEffect, useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logout } from '../../actions/auth'
import { ThemeContext } from '../../contexts/ThemeContext'
import { LanguageContext } from '../../contexts/LanguageContext'
import SelectContainer from '../../styled/SelectContainer';
import CenterListItem from './CenterListItem';
import MediumLogo from '../../styled/Logo/MediumLogo';
import { navcomponent } from '../../utils/langObject';
import { findNotifs } from '../../actions/notifs';
import Notification from '../notifs/Notif';
import NotifCounter from '../notifs/NotifCounter';

const {
  _settings,
  _logout,
  _register,
  _login,
  _notifs
} = navcomponent

function Nav (props) {
  const {
    logout,
    auth,
    findNotifs,
    notifs: notifications
  } = props
  const { isAuthenticated } = auth
  const [dropdown, setDropdown] = useState(false)
  const { notifs } = notifications
  const { toggleTheme, isDarkTheme } = useContext(ThemeContext)
  const { changeLanguage, language } = useContext(LanguageContext)
  const { pathname } = props.location
  useEffect(() => {
    if (auth && auth.user && auth.user._id) findNotifs(auth.user._id)
    // eslint-disable-next-line
  }, [auth])

  const authLinks = (
    <ul className='navbar-nav ml-auto'>
      <CenterListItem>
        <Link className='nav-link' to='/'>
          <i className='fas fa-user pr-2' />
          <span className='hide-sm'>{auth && auth.user && auth.user.firstName}</span>
        </Link>
      </CenterListItem>
      <CenterListItem>
        <div className='nav-link pointer position-relative'>
          <div onClick={() => setDropdown(!dropdown)}>
            {notifs && <NotifCounter notifs={notifs} />}
            <div>
              <i className="far fa-bell pr-2" />
              <span className='hide-sm pr-1' style={{ userSelect: "none" }}>{_notifs[language]}</span>
              <i className="fas fa-caret-down pl-2" />
            </div>
          </div>
          {dropdown && (
            <div className="position-absolute m-0 p-0" style={{ minWidth: "300px" }}>
              {notifs && notifs.map(not => (
                <Notification not={not} key={not._id} />
              ))}
            </div>
          )}
        </div>
      </CenterListItem>
      <CenterListItem>
        <Link className='nav-link' to='/settings'>
          <i className='fas fa-cog pr-2' />
          <span className='hide-sm'>{_settings[language]}</span>
        </Link>
      </CenterListItem>
      <CenterListItem>
        {/* eslint-disable-next-line */}
        <a
          className='nav-link'
          href='#!'
          onClick={logout}
        >
          {' '}
          <i className='fas fa-sign-out-alt' />{' '}
          <span className='hide-sm'>{_logout[language]}</span>
        </a>
      </CenterListItem>
    </ul>
  )

  const guestLinks = (
    <ul className='navbar-nav ml-auto'>
      <CenterListItem>
        <SelectContainer className="d-flex justify-content-center align-items-center" mrafter="1rem" isDarkTheme={isDarkTheme} padding="0">
          <label className="d-flex justify-content-center align-items-center">
            <select
              onChange={changeLanguage}
              className="d-flex justify-content-center align-items-center"
              style={{ border: 'none', outline: 'none' }}
              value={localStorage.getItem('language')}
            >
              <option value='en'>English</option>
              <option value='sr'>Srpski</option>
              <option value='de'>Deutsch</option>
            </select>
          </label>
        </SelectContainer>
      </CenterListItem>
      <CenterListItem>
        <Link className={pathname === 'register' ? `nav-link active` : `nav-link`} to='/register'>{_register[language]}</Link>
      </CenterListItem>
      <CenterListItem>
        <Link className={pathname === 'login' ? 'nav-link active' : 'nav-link'} to='/login'>{_login[language]}</Link>
      </CenterListItem>
      <CenterListItem>
        <div className='custom-control custom-switch alignment '>
          <input
            onChange={() => toggleTheme(!isDarkTheme)}
            type='checkbox'
            className='custom-control-input'
            id='theme'
            checked={JSON.parse(localStorage.getItem('isDarkTheme'))}
            />
          <label className='custom-control-label' htmlFor='theme' />
        </div>
      </CenterListItem>
    </ul>
  )

  return (
    <nav style={{ pointerEvents: "all" }} className={`navbar navbar-expand-lg navbar-${isDarkTheme ? 'dark' : 'light'}`}>
      <Link className='navbar-brand' to='/'>
        <MediumLogo />
      </Link>
      <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
        <span className='navbar-toggler-icon' />
      </button>

      <div className='collapse navbar-collapse' id='navbarSupportedContent'>
        <Fragment>
          {isAuthenticated ? authLinks : guestLinks}
        </Fragment>
      </div>
    </nav>
  )
}

Nav.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  findNotifs: PropTypes.func.isRequired,
  notifs: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  notifs: state.notifs
})

export default connect(
  mapStateToProps,
  { logout, findNotifs }
)(withRouter(Nav))
