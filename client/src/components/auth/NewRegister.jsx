import React, { useState, Fragment, useEffect, useContext } from 'react'
import countries from '../../utils/countries.js'
import Camera from '../misc/Camera'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { register } from '../../actions/auth'
import { Redirect } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import { LanguageContext } from '../../contexts/LanguageContext'
import { ThemeContext } from '../../contexts/ThemeContext'
import Moment from 'react-moment'
import { registercomponent } from "../../utils/langObject"
import RegisterSteps from '../layout/RegisterSteps';
import BioTextArea from '../../styled/BioTextArea';
import AuthPassword from '../../styled/AuthPassword';
import TermsConditions from '../../styled/TermsConditions';

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
  const { language } = useContext(LanguageContext)
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

  useEffect(() => {
    (function () {
      if (country) {
        const callcode = countries.filter(ctry => ctry.name === country)
        setData({ ...data, callcode: callcode[0].callcode })
      }
    })()
    // eslint-disable-next-line
  }, [country]);

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

  const {
    looksgood,
    yourbasic,
    _firstname,
    _lastname,
    _email,
    pleaseenter,
    yoursex,
    male,
    female,
    nospecify,
    basicprofileinfo,
    _username,
    _password,
    passwordnotconfirmed,
    tellusalittlebit,
    yourbio,
    advancedpersonalinfo,
    dateofbirth,
    _city,
    _country,
    zipcode,
    yourphonenumber,
    agreewithterms,
    securityanswer,
    _answer,
    picturetext,
    // snapbutton,
    pleasenote,
    overview,
    signmeup,
    fullname,
    notgiven,
    _name,
    confirmpass,
    chooseone,
    addsecurity,
    compeletelyoptional,
    _from,
    location,
    securityquestion,
    imagetaken,
    yes,
    no,
    agreement
  } = registercomponent

  return (
    <Fragment>
      <RegisterSteps progress={progress} />
      <div className="container-lg my-5" style={{ pointerEvents: "all" }}>
        <form onSubmit={onSubmit}>
          <div className={`p-5  border rounded m-auto ${isDarkTheme && 'bg-overlay'}`}>
            {
              progress === 0 && (
                <Fragment>
                  <h2 className='mb-2'>{yourbasic[language]}</h2>
                  <label htmlFor='firstName'>{_firstname[language]}</label>
                  <input
                    type='text'
                    onChange={onChange}
                    name='firstName'
                    value={firstName}
                    className={
                      firstName
                      ? `form-control is-valid`
                      : 'form-control is-invalid'
                    }
                    placeholder={_firstname[language]}
                    required
                  />
                  {firstName ? (
                    <div className='valid-feedback'>{looksgood[language]}</div>
                  ) : (
                    <div className='invalid-feedback'>{pleaseenter[language]}{" "}{_name[language]}</div>
                  )}
                  <label htmlFor='lastName'>{_lastname[language]}</label>
                  <input
                    type='text'
                    className={
                      lastName
                      ? `form-control is-valid`
                      : 'form-control is-invalid'
                    }
                    value={lastName}
                    name='lastName'
                    onChange={onChange}
                    placeholder={_lastname[language]}
                    required
                  />
                  {lastName ? (
                    <div className='valid-feedback'>{looksgood[language]}</div>
                  ) : (
                    <div className='invalid-feedback'>{pleaseenter[language]}{" "}{_name[language]}</div>
                  )}
                  <label htmlFor='email'>{_email[language]}</label>
                  <input
                    type='email'
                    className={
                      email
                      ? `form-control is-valid`
                      : 'form-control is-invalid'
                    }
                    value={email}
                    name='email'
                    onChange={onChange}
                    required
                    placeholder={_email[language]}
                  />
                  {email ? (
                    <div className='valid-feedback'>{looksgood[language]}</div>
                  ) : (
                    <div className='invalid-feedback'>{pleaseenter[language]}{" "}{_email[language]}</div>
                  )}
                  <label htmlFor='sex' className='mt-4'>{yoursex[language]}</label>
                  <div className='custom-control custom-radio'>
                    <input
                      type='radio'
                      id='male'
                      name='sex'
                      className={
                        sex === 'm'
                        ? 'custom-control-input is-valid'
                        : 'custom-control-input is-invalid'
                      }
                      value='m'
                      onChange={onChange}
                    />
                    <label className='custom-control-label' htmlFor='male'>{male[language]}</label>
                  </div>
                  <div className='custom-control custom-radio'>
                    <input
                      type='radio'
                      id='female'
                      name='sex'
                      className={
                        sex === 'f'
                        ? 'custom-control-input is-valid'
                        : 'custom-control-input is-invalid'
                      }
                      value='f'
                      onChange={onChange}
                    />
                    <label className='custom-control-label' htmlFor='female'>{female[language]}</label>
                  </div>
                  <div className='custom-control custom-radio'>
                    <input
                      type='radio'
                      id='unknown'
                      name='sex'
                      className={
                        sex === 'n/a'
                        ? 'custom-control-input is-valid'
                        : 'custom-control-input is-invalid'
                      }
                      value='n/a'
                      onChange={onChange}
                    />
                    <label className='custom-control-label' htmlFor='unknown'>{nospecify[language]}</label>
                  </div>
                  {sex ? (
                    <div className='d-block valid-feedback'>{looksgood[language]}</div>
                  ) : (
                    <div className='d-block invalid-feedback'>{pleaseenter[language]}{" "}{yoursex[language]}</div>
                  )}
                  <div className="d-flex justify-content-end">
                    <button className="btn btn-secondary" onClick={() => onProgressChange([firstName, lastName, email, sex])}>
                      Proceed&nbsp;&nbsp;<i className="fas fa-arrow-right"></i>
                    </button>
                  </div>
                </Fragment>
              )
            }
            {
              progress === 1 && (
                <Fragment>
                  <h2 className='mb-2 '>{basicprofileinfo[language]}</h2>
                  <label htmlFor='username'>{_username[language]}</label>
                  <div className='input-group'>
                    <div className='input-group-prepend'>
                      <span className='input-group-text' id='inputGroupPrepend3'>@</span>
                    </div>
                    <input
                      type='text'
                      className={
                        username.length > 2
                          ? `form-control is-valid`
                          : 'form-control is-invalid'
                      }
                      name='username'
                      onChange={onChange}
                      value={username}
                      placeholder={_username[language]}
                      required
                    />
                    {username.length > 2 ? (
                      <div className='valid-feedback'>{looksgood[language]}</div>
                    ) : (
                      <div className='invalid-feedback'>{pleaseenter[language]}{" "}{_username[language]}</div>
                    )}
                  </div>
                  <div className='form-group position-relative'>
                    <label htmlFor='password'>{_password[language]}</label>
                    <input
                      type={viewPass ? 'text' : 'password'}
                      name='password'
                      className={
                        password.length > 5
                          ? `form-control is-valid`
                          : 'form-control is-invalid'
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
                    {password.length > 2 ? (
                      <div className='valid-feedback'>{looksgood[language]}</div>
                        ) : (
                      <div className='invalid-feedback'>{pleaseenter[language]}{" "}{_password[language]}</div>
                    )}
                  </div>
                  <div className='form-group position-relative'>
                    <label htmlFor='password2'>{confirmpass[language]}</label>
                    <input
                      type={viewPass2 ? 'text' : 'password'}
                      name='password2'
                      className={
                        password2.length >= 5 &&
                        password2.toString() === password.toString()
                          ? `form-control is-valid`
                          : 'form-control is-invalid'
                      }
                      value={password2}
                      onChange={onChange}
                      placeholder='Please enter your password.'
                    />
                    {viewPass2 ? (
                      <AuthPassword
                        className='fas fa-eye-slash'
                        onClick={() => setViewPass2(false)}
                      />
                    ) : (
                      <AuthPassword
                        className='fas fa-eye'
                        onClick={() => setViewPass2(true)}
                      />
                    )}
                    {
                      password2.length >= 5 &&
                      password2 === password ? (
                        <div className='valid-feedback'>{looksgood[language]}</div>
                      ) : (
                      <div className='invalid-feedback'>{passwordnotconfirmed[language]}</div>
                    )}
                  </div>
                  <div className="d-flex justify-content-end">
                    <button className="btn btn-secondary" onClick={() => onProgressChange([username, password, password2])}>
                      Proceed&nbsp;&nbsp;<i className="fas fa-arrow-right"></i>
                    </button>
                  </div>
                </Fragment>
              )
            }
            {
              progress === 2 && (
                <Fragment>
                  <h2 className='mb-2'>{tellusalittlebit[language]}</h2>
                  <label htmlFor='bio'>{yourbio[language]}:{' '}</label>
                  <BioTextArea
                    className={
                      bio
                        ? 'form-control is-valid'
                        : 'form-control is-invalid'
                    }
                    placeholder={tellusalittlebit[language]}
                    name='bio'
                    value={bio}
                    required
                    onChange={onChange}
                  />
                  {bio ? (
                    <div className='valid-feedback mt-5'>{looksgood[language]}</div>
                  ) : (
                    <div className='invalid-feedback mt-5'>{tellusalittlebit[language]}</div>
                  )}
                  <div className="d-flex justify-content-end">
                    <button className="btn btn-secondary" onClick={() => onProgressChange([bio])}>
                      Proceed&nbsp;&nbsp;<i className="fas fa-arrow-right"></i>
                    </button>
                  </div>
                </Fragment>
              )
            }
            {
              progress === 3 && (
                <Fragment>
                  <h2 className='mb-2'>{advancedpersonalinfo[language]}</h2>
                  <label htmlFor='dob'>{dateofbirth[language]}</label>
                  <br />
                  <DatePicker
                    required
                    name='dob'
                    id='dob'
                    showYearDropdown
                    yearDropdownItemNumber={150}
                    scrollableYearDropdown
                    className={dob ? 'form-control is-valid' : 'form-control is-invalid'}
                    value={dob}
                    selected={dob}
                    onChange={setDate}
                  />
                  <br />
                  {dob ? (
                    <div className='valid-feedback d-block'>{looksgood[language]}</div>
                  ) : (
                    <div className='invalid-feedback d-block'>{pleaseenter[language]}{" "}{dateofbirth[language]}</div>
                  )}
                  <label htmlFor='city' className=' mt-2'>{_city[language]}</label>
                  <input
                    type='text'
                    className={
                      city
                        ? `form-control is-valid`
                        : 'form-control is-invalid'
                    }
                    value={city}
                    name='city'
                    onChange={onChange}
                    placeholder={_city[language]}
                    required
                  />
                  {city ? (
                    <div className='valid-feedback'>{looksgood[language]}</div>
                  ) : (
                    <div className='invalid-feedback'>{pleaseenter[language]}{" "}{_city[language]}</div>
                  )}
                  <label htmlFor='country'>{_country[language]}</label>
                  <select
                    onChange={e =>
                      setData({ ...data, country: e.target.value })
                    }
                    name='country'
                    className={
                      country
                        ? 'form-control is-valid'
                        : 'form-control is-invalid'
                    }
                    required
                  >
                    <option value=''>{chooseone[language]}</option>
                    {
                      countries.map(country => (
                        <option value={country.name} key={country.capital}>{country.name} (pop.{' '}{(country.population / 1000000).toFixed(2)}M)</option>
                      ))
                    }
                  </select>
                  {
                    country ? (
                      <div className='valid-feedback'>{looksgood[language]}</div>
                    ) : (
                      <div className='invalid-feedback'>{pleaseenter[language]}{" "}{_country[language]}</div>
                  )}
                  <label htmlFor='zip'>{zipcode[language]}</label>
                  <input
                    type='text'
                    name='zip'
                    onChange={onChange}
                    className={
                      zip
                        ? `form-control is-valid`
                        : 'form-control is-invalid'
                    }
                    value={zip}
                    placeholder={zipcode[language]}
                    required
                  />
                  {
                    zip ? (
                      <div className='valid-feedback'>{looksgood[language]}</div>
                    ) : (
                      <div className='invalid-feedback'>{pleaseenter[language]}{" "}{zipcode[language]}</div>
                  )}
                  <label htmlFor='phone' className="">{yourphonenumber[language]}</label>
                  <div className='input-group'>
                    <div className='input-group-prepend'>
                      <span className='input-group-text' id='inputGroupPrepend4'>{callcode ? callcode : ':/'}</span>
                    </div>
                    <input
                      type='text'
                      className={
                        phone
                          ? `form-control is-valid`
                          : 'form-control is-invalid'
                      }
                      name='phone'
                      onChange={onChange}
                      value={phone}
                      placeholder={yourphonenumber[language]}
                      required
                    />
                    {
                      phone ? (
                        <div className='valid-feedback'>{looksgood[language]}</div>
                      ) : (
                        <div className='invalid-feedback'>{pleaseenter[language]}{" "}{yourphonenumber[language]}</div>
                    )}
                  </div>
                  <div className="d-flex justify-content-end">
                    <button className="btn btn-secondary" onClick={() => onProgressChange([dob, city, country, zip, phone])}>
                      Proceed&nbsp;&nbsp;<i className="fas fa-arrow-right"></i>
                    </button>
                  </div>
                </Fragment>
              )
            }
            {
              progress === 4 && (
                <Fragment>
                  <TermsConditions className='container-md'>
                    <h2>License, terms and conditions</h2>
                    <p className='lead '>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus architecto ipsum eaque sit, consectetur a laborum quod autem deserunt amet qui accusamus facilis nam nesciunt beatae quas esse officiis officia, maxime natus harum unde ullam. Ducimus aliquam iusto laboriosam deserunt similique voluptate expedita inventore, voluptas impedit, aut rem deleniti molestias! Maiores recusandae consectetur magni libero amet saepe hic alias! Eligendi iste fugiat similique, dolorem reiciendis assumenda rem modi, quas ab veniam eveniet laboriosam voluptatem culpa vero impedit! Nobis eligendi magni, animi neque autem perferendis pariatur saepe ad rerum possimus ea asperiores aut, distinctio maxime illo provident est ut eum, fugiat ipsam itaque eveniet. Reiciendis incidunt, ea dolore molestias, quia tempore ab neque fugiat voluptas quas alias iure ipsum asperiores. Ab amet optio aliquid! Iste odit debitis at quod velit, corporis facilis maxime, temporibus earum similique delectus inventore deserunt ipsum hic. Maxime porro minima, molestiae optio hic eum quidem saepe reiciendis necessitatibus quia ducimus quibusdam iure itaque rerum dolores ipsum vitae pariatur eligendi, repellat culpa laudantium delectus nesciunt fugit maiores. Quo tenetur, dicta vero voluptate rerum ratione doloribus veniam dolor autem quis aliquid mollitia, laborum blanditiis molestias. Incidunt voluptatem, esse veniam voluptas aliquam officiis beatae provident? Enim architecto, natus corporis doloremque non doloribus veniam illo minima. Iste aliquid facere dolorum adipisci, quis nisi ullam veniam ipsa expedita animi atque quae quibusdam doloremque, eaque corporis quam veritatis assumenda voluptatem. Cum tenetur dolorum unde nemo, soluta obcaecati laborum repellendus nobis quasi aut harum consequatur, quas! Harum eveniet tempora numquam natus ab tempore ducimus.</p>
                  </TermsConditions>
                  <div className='custom-control custom-checkbox'>
                    <input
                      value={check}
                      onChange={() => setcheck(!check)}
                      type='checkbox'
                      className={
                        check
                          ? 'custom-control-input is-valid'
                          : 'custom-control-input is-invalid'
                      }
                      name='check'
                      id='check'
                      required
                    />
                    <label className='custom-control-label' htmlFor='check'>{agreewithterms[language]}</label>
                  </div>
                  {
                    check ? (
                      <div className="valid-feedback d-block">{looksgood[language]}</div>
                    ) : (
                      <div className="invalid-feedback">{agreement[language]}</div>
                  )}
                  <div className="d-flex justify-content-end">
                    <button className="btn btn-secondary" onClick={() => onProgressChange([check])}>
                      Proceed&nbsp;&nbsp;<i className="fas fa-arrow-right"></i>
                    </button>
                  </div>
                </Fragment>
              )
            }
            {
              progress === 5 && (
                <Fragment>
                  <h2>{addsecurity[language]}</h2>
                  <label htmlFor='question' className='mt-2'>{securityanswer[language]}</label>
                  <select
                    onChange={e =>
                      setData({ ...data, question: e.target.value })
                    }
                    name='questions'
                    className={
                      question
                        ? 'form-control is-valid'
                        : 'form-control is-invalid'
                    }
                    required
                  >
                    <option value=''>{chooseone[language]}</option>
                    {
                      questions.map(
                        quest => (
                          <option value={quest} key={quest}>{quest}</option>
                    ))}
                  </select>
                  <label htmlFor='security' className=' mt-2'>{_answer[language]}</label>
                  <input
                    type='text'
                    name='security'
                    disabled={!question}
                    onChange={onChange}
                    className={
                      security
                        ? `form-control is-valid`
                        : 'form-control is-invalid'
                    }
                    placeholder={_answer[language]}
                    value={security}
                    required
                  />
                  {
                    security ? (
                      <div className='valid-feedback'>{looksgood[language]}</div>
                    ) : (
                      <div className='invalid-feedback'>{pleaseenter[language]}{" "}{_answer[language]}</div>
                  )}
                  <div className="d-flex justify-content-end">
                    <button className="btn btn-secondary" onClick={() => onProgressChange([security])}>
                      Proceed&nbsp;&nbsp;<i className="fas fa-arrow-right"></i>
                    </button>
                  </div>
                </Fragment>
              )
            }
            {
              progress === 6 && (
                <Fragment>
                  <article>
                    <h5 className="mb-3">{picturetext[language]}{" "}<b>{compeletelyoptional[language]}</b></h5>
                    <Camera
                      onCapture={blob => setImage(blob)}
                      onClear={() => setImage(null)}
                    />
                    <p className='mt-3'>{pleasenote[language]}</p>
                  </article>
                  <div className="d-flex justify-content-end">
                    <button className="btn btn-secondary" onClick={() => onProgressChange([true])}>
                      Proceed&nbsp;&nbsp;<i className="fas fa-arrow-right"></i>
                    </button>
                  </div>
                </Fragment>
              )
            }
            {
              progress === 7 && (
                <Fragment>
                  <h2>{overview[language]}:</h2>
                  <ul className='list-group mt-3'>
                    <li className='overview-items list-group-item list-group-item-action'>
                      {fullname[language]}:{' '}
                      {firstName &&
                        lastName ? (
                          <span className='text-success'>
                            {firstName} {lastName}
                          </span>
                        ) : (
                          <span className='text-danger'>{notgiven[language]}{" "}{fullname[language]}</span>
                      )}
                    </li>
                    <li className='overview-items list-group-item list-group-item-action'>
                      {yoursex[language]}:{' '}
                      {sex === 'm' ? (
                        <span className='text-success'>{male[language]}</span>
                      ) : sex === 'f' ? (
                        <span className='text-success'>{female[language]}</span>
                      ) : sex === 'n/a' ? (
                        <span className='text-success'>{nospecify[language]}</span>
                      ) : (
                        <span className='text-danger'>{notgiven[language]}{" "}{yoursex[language]}</span>
                      )}
                    </li>
                    <li className='overview-items list-group-item list-group-item-action'>
                      {_email[language]}:{' '}
                      {email ? (
                        <span className='text-success'>{email}</span>
                      ) : (
                        <span className='text-danger'>{notgiven[language]}{" "}{_email[language]}</span>
                      )}
                    </li>
                    <li className='overview-items list-group-item list-group-item-action'>
                      {_username[language]}:{' '}
                      {username ? (
                        <span className='text-success'>@{username}</span>
                      ) : (
                        <span className='text-danger'>{notgiven[language]}{" "}{_username[language]}</span>
                      )}
                    </li>
                    <li className='overview-items list-group-item list-group-item-action'>
                      {dateofbirth[language]}:{' '}
                      {dob ? (
                        <span className='text-success'><Moment format='DD.MM.YYYY.'>{dob}</Moment></span>
                      ) : (
                        <span className='text-danger'>{notgiven[language]}{" "}{dateofbirth[language]}</span>
                      )}
                    </li>
                    <li className='overview-items list-group-item list-group-item-action'>
                      {_from[language]}:{' '}
                      {zip &&
                        city &&
                        country ? (
                          <span className='text-success'>{zip} - {city}, {country}</span>
                        ) : (
                          <span className='text-danger'>{notgiven[language]}{" "}{location[language]}</span>
                      )}
                    </li>
                    <li className='overview-items list-group-item list-group-item-action'>
                      {securityquestion[language]}:{' '}
                      {security ? (
                        <span className='text-success'>{security}</span>
                      ) : (
                        <span className='text-danger'>{notgiven[language]}{" "}{securityanswer[language]}</span>
                      )}
                    </li>
                    <li className='overview-items list-group-item list-group-item-action'>
                      {imagetaken[language]}&nbsp;&nbsp;
                      {image ? (
                        <span className='text-success'>{yes[language]}</span>
                      ) : (
                        <span className='text-danger'>{no[language]}</span>
                      )}
                    </li>
                    <li className='overview-items list-group-item list-group-item-action'>
                      {yourphonenumber[language]}:{' '}
                      {phone ? (
                        <span className='text-success'>{callcode}{phone}</span>
                      ) : (
                        <span className='text-danger'>{notgiven[language]}{" "}{yourphonenumber[language]}</span>
                      )}
                    </li>
                  </ul>
                  <button
                    type='submit'
                    disabled={
                      !firstName ||
                      !lastName ||
                      !username ||
                      !bio ||
                      !sex ||
                      !city ||
                      !country ||
                      !zip ||
                      !email ||
                      !security ||
                      !password ||
                      !password2 ||
                      !phone
                    }
                    className='mt-2 btn btn-lg btn-primary btn-block'
                  >
                    <i className='fas fa-paper-plane' />
                    &nbsp;&nbsp;{signmeup[language]}
                  </button>
                </Fragment>
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
