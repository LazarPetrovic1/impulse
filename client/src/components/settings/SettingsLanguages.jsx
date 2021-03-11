import React, { useContext } from 'react';
import eng from '../../assets/flags/eng.svg';
import fdl from '../../assets/flags/fdl.svg';
import semp from '../../assets/flags/semp.svg';
import gemp from '../../assets/flags/gemp.svg';
import { LanguageContext } from '../../contexts/LanguageContext'
import SettingsLanguagesUl from '../../styled/Settings/SettingsLanguagesUl';

function SettingsLanguages() {
  const { changeLanguage, language } = useContext(LanguageContext)
  return (
    <SettingsLanguagesUl>
      <li>
        {/* eslint-disable-next-line */}
        <img
          src={
            language === 'en' ? eng :
            language === 'sr' ? semp :
            language === 'de' ? gemp :
            language === 'fr' ? fdl : null
          }
          alt={
            language === 'en' ? "English flag" :
            language === 'sr' ? "Zastava Srpskog Carstva" :
            language === 'de' ? "Flagge des ersten deutschen Reich" :
            language === 'fr' ? "Fleur de lys" : null
          }
          height="22"
          width="35"
        />
        <p
          title={
            language === 'en' ? "English language / English flag" :
            language === 'sr' ? "Srpski jezik / Zastava Srpskog Carstva" :
            language === 'de' ? "Deutsche Sprache / Flagge des ersten deutschen Reich" :
            language === 'fr' ? "Langue française / Fleur de lys" : ""
          }
        >
          {
            language === 'en' ? "English" :
            language === 'sr' ? "Srpski" :
            language === 'de' ? "Deutsch" :
            language === 'fr' ? "Française" : ""
          }
        </p>
      </li>
      {language !== "en" && (
        <li onClick={() => changeLanguage("en")}>
          <img src={eng} alt="English" height="22" width="35" />
          <p>English</p>
        </li>
      )}
      {language !== "sr" && (
        <li onClick={() => changeLanguage("sr")}>
          <img src={semp} alt="Srpski" height="22" width="35" />
          <p>Srpski</p>
        </li>
      )}
      {language !== "de" && (
        <li onClick={() => changeLanguage("de")}>
          <img src={gemp} alt="Deutsch" height="22" width="35" />
          <p>Deutsch</p>
        </li>
      )}
      {language !== "fr" && (
        <li onClick={() => changeLanguage("fr")}>
          <img src={fdl} alt="Française" height="22" width="35" />
          <p>Française</p>
        </li>
      )}
    </SettingsLanguagesUl>
  )
}

export default SettingsLanguages;
