import React, { useState, Fragment, useContext } from 'react'
import { connect } from 'react-redux'
import { register } from '../../actions/auth'
import { Redirect } from 'react-router-dom'
import { ThemeContext } from '../../contexts/ThemeContext'
import RegisterSteps from '../layout/RegisterSteps';
import StepOne from './registersteps/StepOne';
import StepTwo from './registersteps/StepTwo';
import StepThree from './registersteps/StepThree';
import StepFour from './registersteps/StepFour';
import StepFive from './registersteps/StepFive';
import StepSix from './registersteps/StepSix';
import StepSeven from './registersteps/StepSeven';
import StepEight from './registersteps/StepEight';
import PropTypes from 'prop-types'

function NewRegister(props) {
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    username: '',
    city: '',
    country: '',
    zip: '',
    email: '',
    security: '',
    password: '',
    password2: '',
    phone: '',
    callcode: '',
    question: '',
    sex: '',
    bio: '',
    questions: [
      'Where were you when the funniest thing happened to you?',
      'What is/was the full name of one of your parents?',
      "What was your first pet's name?",
      'Who was your teacher in 1st grade?',
      'How many siblings do you have?',
      'What is your most interesting memory?'
    ]
  })

  const [viewPass, setViewPass] = useState(false)
  const [viewPass2, setViewPass2] = useState(false)
  const [check, setcheck] = useState(false)
  const [progress, setProgress] = useState(0)
  const [image, setImage] = useState(null)
  const { isDarkTheme } = useContext(ThemeContext)

  const {
    firstName,
    lastName,
    email,
    dob,
    bio,
    username,
    password,
    city,
    country,
    zip,
    security,
    password2,
    phone,
    callcode,
    question,
    questions,
    sex
  } = data

  const {
    register,
    isAuthenticated
  } = props

  const onChange = e => {
    e.persist()
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const onSubmit = e => {
    e.preventDefault()

    const phoneNr = `${callcode}${phone}`
    const imageTaken = image ? true : false

    register({
      firstName,
      lastName,
      email,
      sex,
      bio,
      dob,
      username,
      password,
      city,
      country,
      zip,
      phone: phoneNr,
      question,
      security,
      imageTaken
    })
  }

  const setDate = date => {
    setData({
      ...data,
      dob: date
    })
  }

  if (isAuthenticated) {
    return <Redirect to='/' />
  }

  const onProgressChange = (arr) => {
    let newValue = progress + 1
    const check = arr.some(x => x.length <= 0 || !x);
    if (check) {
      return
    }
    setProgress(newValue)
  }

  return (
    <Fragment>
      <RegisterSteps progress={progress} />
      <div className="container-lg my-5" style={{ pointerEvents: "all" }}>
        <form onSubmit={onSubmit}>
          <div className={`p-5  border rounded m-auto ${isDarkTheme && 'bg-overlay'}`}>
            {
              progress === 0 && (
                <StepOne
                  onChange={onChange}
                  firstName={firstName}
                  lastName={lastName}
                  email={email}
                  sex={sex}
                  onProgressChange={onProgressChange}
                />
              )
            }
            {
              progress === 1 && (
                <StepTwo
                  username={username}
                  password={password}
                  password2={password2}
                  onChange={onChange}
                  viewPass2={viewPass2}
                  setViewPass2={setViewPass2}
                  onProgressChange={onProgressChange}
                  viewPass={viewPass}
                  setViewPass={setViewPass}
                />
              )
            }
            {
              progress === 2 && (
                <StepThree
                  bio={bio}
                  onChange={onChange}
                  onProgressChange={onProgressChange}
                />
              )
            }
            {
              progress === 3 && (
                <StepFour
                  onProgressChange={onProgressChange}
                  dob={dob}
                  city={city}
                  country={country}
                  zip={zip}
                  phone={phone}
                  setDate={setDate}
                  onChange={onChange}
                  setData={setData}
                  data={data}
                  callcode={callcode}
                />
              )
            }
            {
              progress === 4 && (
                <StepFive
                  check={check}
                  setcheck={setcheck}
                  onProgressChange={onProgressChange}
                />
              )
            }
            {
              progress === 5 && (
                <StepSix
                  setData={setData}
                  data={data}
                  questions={questions}
                  question={question}
                  onChange={onChange}
                  security={security}
                  onProgressChange={onProgressChange}
                />
              )
            }
            {
              progress === 6 && (
                <StepSeven setImage={setImage} onProgressChange={onProgressChange} />
              )
            }
            {
              progress === 7 && (
                <StepEight
                  firstName={firstName}
                  lastName={lastName}
                  username={username}
                  bio={bio}
                  sex={sex}
                  city={city}
                  country={country}
                  zip={zip}
                  email={email}
                  security={security}
                  password={password}
                  password2={password2}
                  phone={phone}
                  dob={dob}
                  image={image}
                  callcode={callcode}
                />
              )
            }
          </div>
        </form>
      </div>
    </Fragment>
  )
}

NewRegister.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(
  mapStateToProps,
  { register }
)(NewRegister)
