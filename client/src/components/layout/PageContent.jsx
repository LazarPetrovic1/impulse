import React, { useContext } from 'react'
import { ThemeContext } from '../../contexts/ThemeContext'

function PageContent (props) {
  const { isDarkTheme } = useContext(ThemeContext)
  const styles = {
    backgroundColor: isDarkTheme ? '#555' : 'white',
    color: isDarkTheme ? 'white' : 'black',
    height: document.body.clientHeight > 1080 ? 'auto' : '100vh',
    // height: 'auto',SREDI HEIGHT
    margin: 0,
    padding: 0
  }
  return <div style={styles}>{props.children}</div>
}

export default PageContent
