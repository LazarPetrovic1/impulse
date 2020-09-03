import React, { useState, useContext } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { login } from '../../actions/auth'
import { LanguageContext } from '../../contexts/LanguageContext'
import { logincomponent, registercomponent } from '../../utils/langObject'

function AccordionLogin (props) {
  const [data, setData] = useState({
    email: '',
    password: '',
    phone: '',
    username: ''
  })
  const [viewPass, setViewPass] = useState(false)
  const [remember, setRemember] = useState(false)

  const { login, isAuthenticated } = props
  const { username, phone, email, password } = data
  const { language } = useContext(LanguageContext)

  const {
    choosemethod,
    loginusing,
    yourphonenumber,
    _password,
    rememberme,
    logmein,
    _username,
    _email
  } = logincomponent

  const secondphonenumber = registercomponent.yourphonenumber
  const secondemail = registercomponent._email
  const secondusername = registercomponent._username

  const onChange = e => setData({ ...data, [e.target.name]: e.target.value })

  const onSubmit = async e => {
    e.preventDefault()
    if (username) {
      login({ username, password })
    } else if (phone) {
      login({ phone, password })
    } else {
      login({ email, password })
    }
  }

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />
  }

  return (
    <div className='accordion' id='accordionExample'>
      <form onSubmit={onSubmit}>
        <div className='card bg-info'>
          <div className='card-header' id='headingOne'>
            <h2 className='mb-0'>
              <button
                className='btn btn-link collapsed'
                type='button'
                data-toggle='collapse'
                data-target='#collapseOne'
                aria-expanded='false'
                aria-controls='collapseOne'
              >
                <i className='fas fa-envelope fa-2x mb-4 white' />
                &nbsp;&nbsp;
                <span className='login-accordion-fontsize white'>
                  {loginusing[language]} {_email[language]}
                </span>
              </button>
            </h2>
          </div>

          <div
            id='collapseOne'
            className='collapse show'
            aria-labelledby='headingOne'
            data-parent='#accordionExample'
          >
            <div className='card-body'>
              <div className='form-group'>
                <label htmlFor='email' className='white'>
                  {secondemail[language]}
                </label>
                <input
                  type='email'
                  className={
                    email ? 'form-control is-valid' : 'form-control is-invalid'
                  }
                  value={email}
                  name='email'
                  placeholder={secondemail[language]}
                  onChange={onChange}
                  required
                />
              </div>
              <div className='form-group rel'>
                <label htmlFor='password' className='white'>
                  {_password[language]}
                </label>
                <input
                  type={viewPass ? 'text' : 'password'}
                  name='password'
                  className={
                    password
                      ? 'form-control is-valid'
                      : 'form-control is-invalid'
                  }
                  value={password}
                  onChange={onChange}
                  placeholder={_password[language]}
                />
                {viewPass ? (
                  <i
                    className='fas fa-eye-slash abs'
                    onClick={() => setViewPass(false)}
                  />
                ) : (
                  <i
                    className='fas fa-eye abs'
                    onClick={() => setViewPass(true)}
                  />
                )}
              </div>
              <div className='custom-control custom-checkbox'>
                <input
                  value={remember}
                  onChange={() => setRemember(!remember)}
                  type='checkbox'
                  className={
                    remember
                      ? 'custom-control-input is-valid'
                      : 'custom-control-input is-invalid'
                  }
                  name='remember'
                  id='remember'
                />
                <label className='custom-control-label' htmlFor='remember'>
                  {rememberme[language]}
                </label>
              </div>
            </div>
          </div>
        </div>
        <button type='submit' className='btn btn-primary btn-lg btn-block'>
          <i className='fas fa-paper-plane' /> {logmein[language]}
        </button>
      </form>
      <div className='card bg-info'>
        <div className='card-header' id='headingTwo'>
          <h2 className='mb-0'>
            <button
              className='btn btn-link collapsed'
              type='button'
              data-toggle='collapse'
              data-target='#collapseTwo'
              aria-expanded='false'
              aria-controls='collapseTwo'
            >
              <i className='fas fa-user-tag fa-2x mb-4 white' />
              &nbsp;&nbsp;
              <span className='login-accordion-fontsize white'>
                {loginusing[language]} {_username[language]}.
              </span>
            </button>
          </h2>
        </div>
        <div
          id='collapseTwo'
          className='collapse'
          aria-labelledby='headingTwo'
          data-parent='#accordionExample'
        >
          <div className='card-body'>
            <div className='form-group'>
              <label htmlFor='username' className='white'>
                {secondusername[language]}:
              </label>
              <input
                checked={remember}
                type='text'
                className={
                  username ? 'form-control is-valid' : 'form-control is-invalid'
                }
                value={username}
                name='username'
                placeholder={secondusername[language]}
                onChange={onChange}
                required
              />
            </div>
            <div className='form-group rel'>
              <label htmlFor='password' className='white'>
                {_password[language]}
              </label>
              <input
                type={viewPass ? 'text' : 'password'}
                name='password'
                className={
                  password ? 'form-control is-valid' : 'form-control is-invalid'
                }
                value={password}
                onChange={onChange}
                placeholder={_password[language]}
              />
              {viewPass ? (
                <i
                  className='fas fa-eye-slash abs'
                  onClick={() => setViewPass(false)}
                />
              ) : (
                <i
                  className='fas fa-eye abs'
                  onClick={() => setViewPass(true)}
                />
              )}
            </div>
            <div className='custom-control custom-checkbox'>
              <input
                value={remember}
                onChange={() => setRemember(!remember)}
                type='checkbox'
                checked={remember}
                className={
                  remember
                    ? 'custom-control-input is-valid'
                    : 'custom-control-input is-invalid'
                }
                name='remember'
                id='remember'
              />
              <label className='custom-control-label' htmlFor='remember'>
                {rememberme[language]}
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className='card bg-info'>
        <div className='card-header' id='headingThree'>
          <h2 className='mb-0'>
            <button
              className='btn btn-link collapsed'
              type='button'
              data-toggle='collapse'
              data-target='#collapseThree'
              aria-expanded='false'
              aria-controls='collapseThree'
            >
              <i className='fas fa-mobile-alt fa-2x mb-4 white' />
              &nbsp;&nbsp;
              <span className='login-accordion-fontsize white'>
                {loginusing[language]} {yourphonenumber[language]}.
              </span>
            </button>
          </h2>
        </div>
        <div
          id='collapseThree'
          className='collapse'
          aria-labelledby='headingThree'
          data-parent='#accordionExample'
        >
          <div className='card-body'>
            <div className='form-group'>
              <label htmlFor='phone' className='white'>
                {secondphonenumber[language]}
              </label>
              <input
                type='phone'
                className={
                  phone ? 'form-control is-valid' : 'form-control is-invalid'
                }
                value={phone}
                placeholder={secondphonenumber[language]}
                name='phone'
                onChange={onChange}
                required
              />
            </div>
            <div className='form-group rel'>
              <label htmlFor='password' className='white'>
                {_password[language]}
              </label>
              <input
                type={viewPass ? 'text' : 'password'}
                name='password'
                className={
                  password ? 'form-control is-valid' : 'form-control is-invalid'
                }
                value={password}
                onChange={onChange}
                placeholder={_password[language]}
              />
              {viewPass ? (
                <i
                  className='fas fa-eye-slash abs'
                  onClick={() => setViewPass(false)}
                />
              ) : (
                <i
                  className='fas fa-eye abs'
                  onClick={() => setViewPass(true)}
                />
              )}
            </div>
            <div className='custom-control custom-checkbox'>
              <input
                value={remember}
                onChange={() => setRemember(!remember)}
                type='checkbox'
                className={
                  remember
                    ? 'custom-control-input is-valid'
                    : 'custom-control-input is-invalid'
                }
                checked={remember}
                name='remember'
                id='remember'
              />
              <label className='custom-control-label' htmlFor='remember'>
                {rememberme[language]}
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

AccordionLogin.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(AccordionLogin)
