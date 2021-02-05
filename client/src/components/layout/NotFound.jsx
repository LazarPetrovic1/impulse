import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { ThemeContext } from '../../contexts/ThemeContext';
import NotFoundContainer from '../../styled/NotFoundContainer';
import LongLogo from '../../styled/Logo/LongLogo';

function NotFound ({auth: {isAuthenticated}}) {
  const { isDarkTheme } = useContext(ThemeContext)

  return (
    <div className={`py-5 ${isDarkTheme && 'bg-overlay'}`}>
      <NotFoundContainer isDarkTheme={isDarkTheme} className='container'>
        <div className='not-found-border'>
          <div className='text-center'><LongLogo /></div>
          <h1 className='display-3 text-primary text-center'>Oops! Your search came out empty-handed...</h1>
          <p className='display-4 text-secondary text-center'>Well, isn't this embarrassing...</p>
          <p className='display-4 text-info text-center'>What were you searching for again?</p>
          <Link to={isAuthenticated ? '/' : '/login'} className='btn btn-block btn-lg btn-outline-primary'>Go back</Link>
        </div>
      </NotFoundContainer>
    </div>
  )
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})

export default connect(mapStateToProps, null)(NotFound)
