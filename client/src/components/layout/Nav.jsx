import React, { Fragment, useContext } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logout } from '../../actions/auth'
import { ThemeContext } from '../../contexts/ThemeContext'
import { LanguageContext } from '../../contexts/LanguageContext'
import logo from '../../assets/IMPULSE_LOGOS/photoshop-logos/medium.png'

function Nav (props) {
  const {
    logout,
    auth: { isAuthenticated, loading }
  } = props

  const { toggleTheme, isDarkTheme } = useContext(ThemeContext)
  const { language, changeLanguage } = useContext(LanguageContext)

  const { pathname } = props.location

  const authLinks = (
    <ul className='navbar-nav ml-auto'>
      <li className='nav-item active px-1'>
        <select
          onChange={changeLanguage}
          className='custom-select bg-light '
          style={{ border: 'none', outline: 'none' }}
          defaultValue={localStorage.getItem('language')}
        >
          <option value='en'>English</option>
          <option value='sr'>Srpski</option>
          <option value='de'>Deutsch</option>
        </select>
      </li>
      <li className='nav-item px-1'>
        <Link className='nav-link ' to='/dashboard'><i className='fas fa-user' /> <span className='hide-sm'>Profile</span> </Link>
      </li>
      <li className='nav-item px-1'>
        <a
          className='nav-link '
          href='#!'
          onClick={logout}
        >
          {' '}
          <i className='fas fa-sign-out-alt' />{' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
      <li className='nav-item px-1'>
        <div className='custom-control custom-switch alignment mt-2'>
          <input
            onChange={toggleTheme}
            type='checkbox'
            className='custom-control-input'
            id='theme'
            checked={JSON.parse(localStorage.getItem('isDarkTheme'))}
            />
          <label className='custom-control-label' htmlFor='theme' />
        </div>
      </li>
    </ul>
  )

  const guestLinks = (
    <ul className='navbar-nav ml-auto'>
      <li className='nav-item active px-1'>
        <select
          onChange={changeLanguage}
          className='custom-select bg-light '
          style={{ border: 'none', outline: 'none' }}
          defaultValue={localStorage.getItem('language')}
        >
          <option value='en'>English</option>
          <option value='sr'>Srpski</option>
          <option value='de'>Deutsch</option>
        </select>
      </li>
      <li className='nav-item px-1'>
        <Link className={pathname === 'register' ? `nav-link active` : `nav-link`} to='/register'>Register</Link>
      </li>
      <li className='nav-item px-1'>
        <Link className={pathname === 'login' ? 'nav-link active' : 'nav-link'} to='/login'>Login</Link>
      </li>
      <li className='nav-item px-1'>
        <Link className={pathname === 'asd' ? 'nav-link active' : 'nav-link'} to='/asd'>NotFound</Link>
      </li>
      <li className='nav-item px-1'>
        <div className='custom-control custom-switch alignment mt-2'>
          <input
            onChange={toggleTheme}
            type='checkbox'
            className='custom-control-input'
            id='theme'
            checked={JSON.parse(localStorage.getItem('isDarkTheme'))}
            />
          <label className='custom-control-label' htmlFor='theme' />
        </div>
      </li>
    </ul>
  )

  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <Link className='navbar-brand' to='/'>
        <img src={logo} alt='Impulse: Make an impact. Change lives.' className='impulse-medium-logo' />
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
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { logout }
)(withRouter(Nav))
