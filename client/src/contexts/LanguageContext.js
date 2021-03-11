import React, { createContext, useState } from 'react'

export const LanguageContext = createContext()

export function LanguageProvider (props) {
  const [language, setLang] = useState(localStorage.getItem('language') || 'en')
  const changeLanguage = e => {
    if (e && e.target && e.target.value) {
      localStorage.setItem('language', e.target.value)
      setLang(e.target.value)
    } else {
      localStorage.setItem('language', e)
      setLang(e)
    }
  }

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {props.children}
    </LanguageContext.Provider>
  )
}

export const withLanguageContext = Component => props => (
  <LanguageContext.Consumer>
    {value => <Component languageContext={value} {...props} />}
  </LanguageContext.Consumer>
)
