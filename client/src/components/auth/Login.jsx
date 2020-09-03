import React, { useState, useContext } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { login } from '../../actions/auth'
import { LanguageContext } from '../../contexts/LanguageContext'
import { logincomponent, registercomponent } from '../../utils/langObject'
import logo from '../../assets/IMPULSE_LOGOS/photoshop-logos/long.png'
import validateEmail from '../../utils/mail'

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
    _email,
    welcome,
    loginall,
    alltypes
  } = logincomponent

  const onChange = e => {
    const firstChar = e.target.value[0]

    if (firstChar === '+' || firstChar === '0') {
      setLoginType('phone')
    } else if (validateEmail(e.target.value)) {
      setLoginType('email')
    } else if (
      firstChar !== '+' &&
      firstChar !== '0' &&
      !validateEmail(e.target.value)
    ) {
      setLoginType('username')
    }

    setData({ ...data, [e.target.name]: e.target.value })
  }

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
    return <Redirect to='/' />
  }

  return (
    <div className='d-flex justify-content-between calced-height'>
      <div className='w-50 d-flex justify-content-center align-items-center'>
        <div
          style={{ zIndex: 2, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
          className='position-relative'
        >
          <img src={logo} alt='Impulse Logo' style={{ userSelect: 'none' }} />
        </div>
      </div>
      <form
        onSubmit={onSubmit}
        className='w-50 flex-column d-flex justify-content-center align-items-center'
      >
        <div className='w-100 darkbackground mr-5 p-5'>
          <h3 className='display-4 text-primary text-center mb-2'>
            {welcome[language]}
          </h3>
          <div className='form-group'>
            <label htmlFor='email' className='white'>
              {loginall[language]}
            </label>
            <input
              type='email'
              className={
                email ? 'form-control is-valid' : 'form-control is-invalid'
              }
              value={email}
              name='email'
              placeholder={alltypes[language]}
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
              <i className='fas fa-eye abs' onClick={() => setViewPass(true)} />
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
          <button
            type='submit'
            className=' mt-3 btn btn-primary btn-block btn-lg'
          >
            <i className='fas fa-door-open' />
            &nbsp;&nbsp;Log me in!
          </button>
          <p className='mt-3'>
            To use the theme, toggle the switch on the right side of the
            navigation bar.
          </p>
        </div>
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

export default connect(mapStateToProps, { login })(Login)
