import React, { useState, useContext } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { login } from '../../actions/auth'
import { LanguageContext } from '../../contexts/LanguageContext'
import { logincomponent } from '../../utils/langObject'
import { registercomponent } from '../../utils/langObject'

const Login = props => {
  const [data, setData] = useState({
    email: '',
    password: '',
    phone: '',
    username: ''
  })
  const [loginType, setLoginType] = useState('')
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
      login({username, password})
    } else if (phone) {
      login({phone, password})
    } else {
      login({email, password})
    }
  }

  if (isAuthenticated) {
    return <Redirect to='/' />
  }

  const emailLogin = (
    <div className='darkbackground mt-5 p-5'>
      <div className='form-group'>
        <label htmlFor='email' className='white'>
          {secondemail[language]}
        </label>
        <input
          type='email'
          className={
              email ? `form-control is-valid` : 'form-control is-invalid'
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
              password ? `form-control is-valid` : 'form-control is-invalid'
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
  )

  const usernameLogin = (
    <div className='darkbackground mt-5 p-5'>
      <div className='form-group'>
        <label htmlFor='username' className='white'>
          {secondusername[language]}:
        </label>
        <input
          checked={remember}
          type='text'
          className={
              username ? `form-control is-valid` : 'form-control is-invalid'
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
              password ? `form-control is-valid` : 'form-control is-invalid'
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
  )

  const phoneLogin = (
    <div className='darkbackground mt-5 p-5'>
      <div className='form-group'>
        <label htmlFor='phone' className='white'>
          {secondphonenumber[language]}
        </label>
        <input
          type='phone'
          className={
              phone ? `form-control is-valid` : 'form-control is-invalid'
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
              password ? `form-control is-valid` : 'form-control is-invalid'
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
  )

  return (
    <div className='container'>
      <div className='pop-up bg-info'>
        <h2 className='bg-primary text-light py-4' style={{margin: 0}}><b>{choosemethod[language]}:</b></h2>
        <div className='flexer'>
          <div className='custom-control custom-radio bg' onClick={() => setLoginType('email')}>
            <i className='fas fa-envelope fa-5x mb-4 white' />
            <p className='lead white'>{loginusing[language]} {_email[language]}.</p>
          </div>
          <div className='custom-control custom-radio bg' onClick={() => setLoginType('username')}>
            <i className='fas fa-user-tag fa-5x mb-4 white' />
            <p className='lead white'>{loginusing[language]} {_username[language]}.</p>
          </div>
          <div className='custom-control custom-radio bg' onClick={() => setLoginType('phone')}>
            <i className='fas fa-mobile-alt fa-5x mb-4 white' />
            <p className='lead white'>{loginusing[language]} {yourphonenumber[language]}.</p>
          </div>
        </div>
      </div>

      {loginType && (
        <h2 className='darkbackground py-3 text-light text-center mt-4'>
          <b>
            {
              loginusing[language]}{' '}{
              loginType === 'email' ?
              _email[language] :
              loginType === 'username' ?
              _username[language] :
              loginType === 'phone' ?
              yourphonenumber[language] : ''
            }
          </b>
        </h2>
      )}

      <form onSubmit={onSubmit}>
        {loginType === 'email' && emailLogin}
        {loginType === 'username' && usernameLogin}
        {loginType === 'phone' && phoneLogin}
        {loginType && (
          <button
            type='submit'
            className='btn btn-primary btn-block btn-lg'
          >
            <i className='fas fa-door-open' />&nbsp;&nbsp;Log me in!
          </button>
        )}
      </form>
    </div>
  )
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(
  mapStateToProps,
  { login }
)(Login)
