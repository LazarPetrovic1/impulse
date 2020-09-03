// React
import React, { useState, Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import DatePicker from 'react-datepicker'
// Redux
import { connect } from 'react-redux'
import { createProfile } from '../../actions/profile'
// CSS
import 'react-datepicker/dist/react-datepicker.css'
// PropTypes
import PropTypes from 'prop-types'
// Other
// import moment from "moment"

function CreateProfile (props) {
  // const today = moment().format("YYYY/MM/DD")
  const inputFont = { fontFamily: 'inherit' }
  const { createProfile, history } = props
  const [data, setData] = useState({
    status: '',
    dateofbirth: '',
    bio: '',
    friends: '',
    youtube: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    instagram: ''
  })
  const [seeSocial, setSeeSocial] = useState(false)

  const {
    status,
    dateofbirth,
    bio,
    friends,
    youtube,
    twitter,
    facebook,
    linkedin,
    instagram
  } = data

  const onChange = e => setData({ ...data, [e.target.name]: e.target.value })

  const onSubmit = e => {
    e.preventDefault()
    createProfile(data, history)
  }

  return (
    <>
      <h1 className='fw6 blue tc'>Create your profile</h1>
      <p className='f4 mb3 tc'>
        <i className='fas fa-user' /> Let's get some information to make your
        profile stand out
      </p>
      <form onSubmit={onSubmit} className='measure center'>
        <div className='mt3'>
          <label htmlFor='dateofbirth' className='db fw6 lh-copy f6'>
            Date of birth
          </label>
          <input
            className='pa1'
            type='date'
            name='dateofbirth'
            value={dateofbirth}
            onChange={onChange}
          />
          {/* <DatePicker
            name="dateofbirth"
            value={dateofbirth}
            onChange={onChange}
          /> */}
        </div>
        <div className='mv3'>
          <label htmlFor='bio' className='db fw6 lh-copy f6'>
            Write something about yourself
          </label>
          <textarea
            name='bio'
            cols='30'
            rows='10'
            onChange={onChange}
            value={bio}
            placeholder='Bio'
            className='pa2'
            style={inputFont}
          />
        </div>
        <div className='mv3'>
          <select value={status} onChange={onChange} name='status'>
            <option value='0'>-- Select One --</option>
            <option value='Single'>Single</option>
            <option value='In a relationship'>In a relationship</option>
            <option value='Engaged'>Engaged</option>
            <option value='Married'>Married</option>
            <option value='Widowed'>Widowed</option>
          </select>
        </div>
        <div className='ma2'>
          <button
            type='button'
            onClick={() => setSeeSocial(!seeSocial)}
            className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib'
          >
            Add social network links
          </button>
        </div>
        {seeSocial && (
          <>
            <div className='mv3'>
              <i className='fab fa-twitter fa-2x mr2' />
              <input
                type='text'
                name='twitter'
                value={twitter}
                onChange={onChange}
                placeholder='Twitter URL'
                className=' pa1'
              />
            </div>
            <div className='mv3'>
              <i className='fab fa-youtube fa-2x mr2' />
              <input
                type='text'
                name='youtube'
                value={youtube}
                onChange={onChange}
                placeholder='YouTube URL'
                className=' pa1'
              />
            </div>
            <div className='mv3'>
              <i className='fab fa-instagram fa-2x mr2' />
              <input
                type='text'
                name='instagram'
                value={instagram}
                onChange={onChange}
                placeholder='Instagram URL'
                className=' pa1'
              />
            </div>
            <div className='mv3'>
              <i className='fab fa-facebook fa-2x mr2' />
              <input
                type='text'
                name='facebook'
                value={facebook}
                onChange={onChange}
                placeholder='Facebook URL'
                className=' pa1'
              />
            </div>
            <div className='mv3'>
              <i className='fab fa-linkedin fa-2x mr2' />
              <input
                type='text'
                name='linkedin'
                value={linkedin}
                onChange={onChange}
                placeholder='LinkedIn URL'
                className=' pa1'
              />
            </div>
          </>
        )}

        <div className='mv4 flex justify-between'>
          <input
            type='submit'
            className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib'
          />
          <Link
            className='b ph3 pv2 ba b--black bg-transparent grow pointer f6 dib link dim dark-gray'
            to='/dashboard'
          >
            Go Back
          </Link>
        </div>
      </form>
    </>
  )
}

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired
}

export default connect(null, { createProfile })(withRouter(CreateProfile))
