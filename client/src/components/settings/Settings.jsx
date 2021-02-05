import React, { useState, useContext } from 'react';
import SettingsSideNav from '../../styled/Settings/SettingsSideNav';
import SettingsListItem from '../../styled/Settings/SettingsListItem';
import { LanguageContext } from '../../contexts/LanguageContext'
import SelectContainer from '../../styled/SelectContainer';
import { ThemeContext } from '../../contexts/ThemeContext'
import SettingsTheme from './SettingsTheme';
import { settingscomponent } from '../../utils/langObject';

const settingsBarWidth = "250px"
const {
  _basicsettings,
  _item,
  _selectlanguage,
  _changetheme,
  _some
} = settingscomponent

function Settings() {
  const [selectedSetting, setSelectedSetting] = useState(1)
  const { isDarkTheme } = useContext(ThemeContext)
  const { changeLanguage, language } = useContext(LanguageContext)

  return (
    <div style={{ pointerEvents: "all" }}>
      <SettingsSideNav width={settingsBarWidth} isDarkTheme={isDarkTheme}>
        <ul>
          <li
            className={selectedSetting === 1 ? 'selected' : ''}
            onClick={() => setSelectedSetting(1)}
          >
            {_basicsettings[language]}
          </li>
          <li
            className={selectedSetting === 2 ? 'selected' : ''}
            onClick={() => setSelectedSetting(2)}
          >
            {_item[language]} 2
          </li>
          <li
            className={selectedSetting === 3 ? 'selected' : ''}
            onClick={() => setSelectedSetting(3)}
          >
            {_item[language]} 3
          </li>
          <li
            className={selectedSetting === 4 ? 'selected' : ''}
            onClick={() => setSelectedSetting(4)}
          >
            {_item[language]} 4
          </li>
          <li
            className={selectedSetting === 5 ? 'selected' : ''}
            onClick={() => setSelectedSetting(5)}
          >
            {_item[language]} 5
          </li>
        </ul>
      </SettingsSideNav>
      {
        selectedSetting === 1 && (
          <div style={{ marginLeft: settingsBarWidth }}>
            <ul
              className="list-group"
              style={{
                borderTop: `1px solid ${isDarkTheme ? "#ddd" : "#111"}`,
                borderBottom: `1px solid ${isDarkTheme ? "#ddd" : "#111"}`
              }}
            >
              <SettingsListItem className="list-group-item" isDarkTheme={isDarkTheme} getCenter>
                {_selectlanguage[language]}:
                <SelectContainer mrafter="1rem" className="ml-5" isDarkTheme={isDarkTheme} padding="0">
                  <label>
                    <select
                      onChange={changeLanguage}
                      // className={`custom-select bg-${isDarkTheme ? 'dark' : 'light'} text-${isDarkTheme ? 'light' : 'dark'}`}
                      style={{ border: 'none', outline: 'none' }}
                      value={localStorage.getItem('language')}
                    >
                      <option value='en'>English</option>
                      <option value='sr'>Srpski</option>
                      <option value='de'>Deutsch</option>
                    </select>
                  </label>
                </SelectContainer>
              </SettingsListItem>
              <SettingsListItem className="list-group-item" isDarkTheme={isDarkTheme}>
                {_changetheme[language]}:
                <SettingsTheme />
              </SettingsListItem>
              <SettingsListItem isDarkTheme={isDarkTheme} className="list-group-item">{_some[language]} {_item[language]}</SettingsListItem>
              <SettingsListItem isDarkTheme={isDarkTheme} className="list-group-item">{_some[language]} {_item[language]}</SettingsListItem>
              <SettingsListItem isLast isDarkTheme={isDarkTheme} className="list-group-item">{_some[language]} {_item[language]}</SettingsListItem>
            </ul>
          </div>
        )
      }
    </div>
  )
}

export default Settings;
