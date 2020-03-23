import React, { useState, Fragment } from 'react'
import { createProfile } from '../../actions/profile'
import { setAlert } from '../../actions/alert'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import { Link } from 'react-router-dom'

function CreateSocialProfile ({
  createProfile,
  auth,
  profile: { profile, loading },
  setAlert,
  history
}) {
  const [employment, setEmployment] = useState('')
  const [website, setWebsite] = useState('')
  const [status, setStatus] = useState('')
  const [displaySocial, setDisplaySocial] = useState(false)
  const [isEmployed, setIsEmployed] = useState(true)
  const [hasWebsite, setHasWebsite] = useState(true)
  const [showStatus, setShowStatus] = useState(true)

  const [social, setSocial] = useState({
    youtube: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    instagram: ''
  })

  const onChange = (e) => setSocial({ ...social, [e.target.name]: e.target.value })

  const employmentCheckbox = () => {
    if (isEmployed) {
      setIsEmployed(false)
      setEmployment('None')
    } else {
      setIsEmployed(true)
      setEmployment('')
    }
  }

  const websiteCheckbox = () => {
    if (hasWebsite) {
      setHasWebsite(false)
      setWebsite('None')
    } else {
      setHasWebsite(true)
      setWebsite('')
    }
  }

  const statusCheckbox = () => {
    if (showStatus) {
      setShowStatus(false)
      setStatus('Hide')
    } else {
      setShowStatus(true)
      setStatus('')
    }
  }

  const {
    youtube,
    twitter,
    facebook,
    linkedin,
    instagram
  } = social

  const onSubmit = (e) => {
    e.preventDefault()

    const data = JSON.stringify({
      employment,
      website,
      status,
      youtube,
      twitter,
      facebook,
      linkedin,
      instagram
    })

    createProfile(
      data,
      history,
      false
    )
  }

  return loading ? (
    <Spinner />
  ) : (
    <form onSubmit={onSubmit}>
      <div className='container mb-4'>
        <div className='d-flex justify-content-between my-3'>
          <h1 className='text-primary d-inline-block m-0'>
            Create your profile
          </h1>
          <Link to='/social' className='btn btn-secondary ' title='Go back'>
            Go back
          </Link>
        </div>
        <p className='lead'>
          <i className='fas fa-user' />&nbsp;
          Let's get some information to make your profile stand out
        </p>
        <div className='form-group'>
          <label htmlFor='employment'>Employment</label>
          {
          isEmployed && (
            <Fragment>
              <input
                type='text'
                className={employment ? 'form-control is-valid' : 'form-control is-invalid'}
                id='employment'
                name='employment'
                placeholder='Where do you work?'
                onChange={(e) => setEmployment(e.target.value)}
                value={employment}
              />
            </Fragment>
          )
        }
          <div className='container ml-3 mt-3'>
            <input
              type='checkbox'
              className='custom-control-input'
              id='customCheck1'
              onChange={employmentCheckbox}
            />
            <label
              className='custom-control-label'
              htmlFor='customCheck1'
            >
              I don't have a job
            </label>
          </div>
          {
          employment || !isEmployed ? (
            <div className='valid-feedback'>
              Looks good!
            </div>
          ) : (
            <div className='invalid-feedback'>
              Please enter your place of work (if you are employed)
            </div>
          )
        }
        </div>
        <div className='form-group'>
          <label htmlFor='employment'>Website</label>
          {
          hasWebsite && (
            <Fragment>
              <input
                type='text'
                className={website ? 'form-control is-valid' : 'form-control is-invalid'}
                id='website'
                name='website'
                placeholder='Where do you work?'
                onChange={(e) => setWebsite(e.target.value)}
                value={website}
              />
            </Fragment>
          )
        }
          <div className='container ml-3 mt-3'>
            <input
              type='checkbox'
              className='custom-control-input'
              id='customCheck2'
              onChange={() => websiteCheckbox(setWebsite, 'None')}
          />
            <label
              className='custom-control-label'
              htmlFor='customCheck2'
          >
            I don't have a website
          </label>
          </div>
          {
          website ? (
            <div className='valid-feedback'>
              Looks good!
            </div>
          ) : (
            <div className='invalid-feedback'>
              Please enter your website (if you have one)
            </div>
          )
        }
        </div>
        <div className='form-group'>
          <label htmlFor='status'>Relationship status: </label>
          {
            showStatus && (
              <Fragment>
                <select
                  className={
                    status ?
                    'custom-select is-valid' :
                    'custom-select is-invalid'
                  }
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option disabled value='' selected>-- Choose one --</option>
                  <option value='Single'>Single</option>
                  <option value='In a Relationship'>In a Relationship</option>
                  <option value='Engaged'>Engaged</option>
                  <option value='Married'>Married</option>
                  <option value="It's Complicated">It's Complicated</option>
                  <option value='In an Open Relationship'>In an Open Relationship</option>
                  <option value='Widowed'>Widowed</option>
                  <option value='Separated'>Separated</option>
                  <option value='Divorced'>Divorced</option>
                  <option value='In a Civil Union'>In a Civil Union</option>
                  <option value='In a Domestic Partnership'>In a Domestic Partnership</option>
                </select>
              </Fragment>
            )
          }
          <div className='container ml-3 mt-3'>
            <input
              type='checkbox'
              className='custom-control-input'
              id='customCheck3'
              onChange={statusCheckbox}
            />
            <label
              className='custom-control-label'
              htmlFor='customCheck3'
            >
              Hide this option
            </label>
          </div>
          {status ? (
            <div className='valid-feedback'>
              Looks good!
            </div>
          ) : (
            <div className='invalid-feedback'>
              Example invalid custom select feedback
            </div>
          )}
        </div>
        <button
          className='btn btn-secondary btn-lg btn-block my-3'
          type='button'
          onClick={() => setDisplaySocial(!displaySocial)}
      >
          {
          displaySocial ? (
            <i className='fas fa-toggle-on' />
          ) : (
            <i className='fas fa-toggle-off' />
          )
        }
        &nbsp;Toggle social options
      </button>
        {
        displaySocial && (
          <div className='my-4'>
            <div class='form-group'>
              <label htmlFor='youtube'>YouTube:&nbsp;</label>
              <input
                type='text'
                name='youtube'
                value={youtube}
                onChange={onChange}
                className='form-control'
                placeholder='Your YouTube channel'
              />
            </div>
            <div class='form-group'>
              <label htmlFor='facebook'>Facebook:&nbsp;</label>
              <input
                type='text'
                name='facebook'
                value={facebook}
                onChange={onChange}
                className='form-control'
                placeholder='Your Facebook channel'
              />
            </div>
            <div class='form-group'>
              <label htmlFor='twitter'>Twitter:&nbsp;</label>
              <input
                type='text'
                name='twitter'
                value={twitter}
                onChange={onChange}
                className='form-control'
                placeholder='Your Twitter channel'
              />
            </div>
            <div class='form-group'>
              <label htmlFor='linkedin'>LinkedIn:&nbsp;</label>
              <input
                type='text'
                name='linkedin'
                value={linkedin}
                onChange={onChange}
                className='form-control'
                placeholder='Your LinkedIn channel'
              />
            </div>
            <div class='form-group'>
              <label htmlFor='instagram'>Instagram:&nbsp;</label>
              <input
                type='text'
                name='instagram'
                value={instagram}
                onChange={onChange}
                className='form-control'
                placeholder='Your Instagram channel'
              />
            </div>
          </div>
        )
      }
        <button
          type='submit'
          className='btn btn-primary btn-block btn-lg'
        >
          <i className='fas fa-paper-plane' />&nbsp;
        Submit
      </button>
      </div>
    </form>
  )
}

CreateSocialProfile.propTypes = {
  auth: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})

export default connect(
  mapStateToProps, {
    setAlert,
    createProfile
  })(CreateSocialProfile)
