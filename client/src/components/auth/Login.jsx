import React, { useState, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { login } from '../../actions/auth'
import { LanguageContext } from '../../contexts/LanguageContext'
import { logincomponent } from '../../utils/langObject'
import { registercomponent } from '../../utils/langObject'
import LoginOptionsContainer from '../../styled/LoginOptionsContainer';
import AuthPassword from '../../styled/AuthPassword';

const Login = props => {
  const [data, setData] = useState({
    email: '',
    password: '',
    phone: '',
    username: ''
  })
  const [loginType, setLoginType] = useState('email')
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
      <div className='form-group position-relative'>
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
          <AuthPassword
            className='fas fa-eye-slash'
            onClick={() => setViewPass(false)}
            />
          ) : (
            <AuthPassword
              className='fas fa-eye'
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
      <div className='form-group position-relative'>
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
          <AuthPassword
            className='fas fa-eye-slash'
            onClick={() => setViewPass(false)}
            />
          ) : (
            <AuthPassword
              className='fas fa-eye'
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
      <div className='form-group position-relative'>
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
          <AuthPassword
            className='fas fa-eye-slash'
            onClick={() => setViewPass(false)}
            />
          ) : (
            <AuthPassword
              className='fas fa-eye'
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
    <div className='container' style={{ pointerEvents: "all" }}>
      <div className='text-center bg-info'>
        <div className='bg-primary text-light py-2' style={{margin: 0}}>
          <h4 className="d-inline-block">
            <b>
              {choosemethod[language]}:
            </b>
          </h4>
          <LoginOptionsContainer>
            <div className='custom-radio bg' onClick={() => setLoginType('email')}>
              <i className='fas fa-envelope white' title={`${loginusing[language]} ${_email[language]}`} />
            </div>
            <div className='custom-radio bg' onClick={() => setLoginType('username')}>
              <i className='fas fa-user-tag white' title={`${loginusing[language]} ${_username[language]}`} />
            </div>
            <div className='custom-radio bg' onClick={() => setLoginType('phone')}>
              <i className='fas fa-mobile-alt white' title={`${loginusing[language]} ${yourphonenumber[language]}`} />
            </div>
          </LoginOptionsContainer>
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
            <i className='fas fa-door-open' />&nbsp;&nbsp;{logmein[language]}!
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
