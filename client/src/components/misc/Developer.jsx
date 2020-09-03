import React, { useState } from 'react'
import Terminal from 'terminal-in-react'
import PageContent from '../layout/PageContent'
import axios from 'axios'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

function Developer (props) {
  const [show, setShow] = useState(true)
  const [content, setContent] = useState(null)

  const {
    auth: { user },
    profile
  } = props

  const showMsg = () => 'Hello World'
  const google = () => window.open('https://www.google.com/', '_blank')
  const api = () => `
    This is the whole list of APIs:
    1. <URL>/api/users - (POST) - Create a user.
    2. <URL>/api/auth - (GET | POST) - Log in or get the user.
    3. <URL>/api/profile - (GET | POST) - Create or get a profile.
    4. <URL>/api/profile/me - (GET) - Get own profile info.
    5. <URL>/api/forumpost - (GET | POST) - Get all posts or make a post of your own.
    6. <URL>/api/forumpost/:id - (GET | PUT | DELETE) - Get, update or delete a post based on ID.
    Please use Postman or back-end technologies to make requests.
  `
  const exit = () => setShow(false)

  const getme = () => {
    setContent(JSON.stringify(user))
    return JSON.stringify(user)
  }

  const getmyprof = () => {
    setContent(JSON.stringify(profile))
    return JSON.stringify(profile)
  }

  return (
    <PageContent>
      <div className='d-flex justify-content-between'>
        <div>
          {show ? (
            <Terminal
              color='green'
              backgroundColor='black'
              barColor='blue'
              style={{ fontWeight: 'bold', fontSize: '1em', minWidth: '50%' }}
              commands={{
                google,
                showMsg,
                api,
                exit,
                getme,
                getmyprof
              }}
              descriptions={{
                google: 'opens google.com',
                showMsg: 'shows a message',
                api: 'lists APIs for developers',
                exit: 'kill the process',
                getme: 'get your own data - user object',
                getmyprof: 'get your own data - profile object'
              }}
              msg='Welcome to hands-on developer APIs. Type "help" (without quotes) to list all commands.'
            />
          ) : (
            <button
              className='btn btn-lg btn-success perfect-center'
              onClick={() => setShow(true)}
            >
              Re-open Terminal
            </button>
          )}
        </div>
        <div className='w-50'>
          <h3 className='text-primary text-center'>Output is shown here.</h3>
          <code>{content && content}</code>
        </div>
      </div>
    </PageContent>
  )
}

Developer.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})

export default connect(mapStateToProps, null)(Developer)
