import React, { useState, useContext } from 'react';
import SettingsSideNav from '../../styled/Settings/SettingsSideNav';
import SettingsListItem from '../../styled/Settings/SettingsListItem';
import { LanguageContext } from '../../contexts/LanguageContext'
import { ThemeContext } from '../../contexts/ThemeContext'
import { FontContext } from '../../contexts/FontContext'
import SettingsTheme from './SettingsTheme';
import { settingscomponent } from '../../utils/langObject';
import ContentPolicy from './ContentPolicy';
import SettingsLanguages from './SettingsLanguages';

const settingsBarWidth = "250px"
const {
  _basicsettings,
  _item,
  _selectlanguage,
  _changetheme,
  _some,
  _contentpolicy,
  _uselegacyfont
} = settingscomponent

function Settings() {
  const [selectedSetting, setSelectedSetting] = useState(1)
  const { isDarkTheme } = useContext(ThemeContext)
  const { language } = useContext(LanguageContext)
  const { isLegacyFont, toggleLegacyFont } = useContext(FontContext)

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
            {_contentpolicy[language]}
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
              <SettingsListItem className="list-group-item d-flex align-items-center" isDarkTheme={isDarkTheme} getCenter>
                {_selectlanguage[language]}:
                <SettingsLanguages />
              </SettingsListItem>
              <SettingsListItem className="list-group-item" isDarkTheme={isDarkTheme}>
                <span style={{ whiteSpace: "nowrap" }}>{_changetheme[language]}:</span>
                <SettingsTheme />
              </SettingsListItem>
              <SettingsListItem isDarkTheme={isDarkTheme} className="list-group-item">
                <div className="d-flex mr-2 justify-content-center align-items-center">
                  <input
                    type="checkbox"
                    name="useLegacyFont"
                    id="useLegacyFont"
                    value={isLegacyFont}
                    checked={isLegacyFont}
                    onChange={toggleLegacyFont}
                  />
                </div>
                <span style={{ whiteSpace: "nowrap" }}>{_uselegacyfont[language]}</span>
              </SettingsListItem>
              <SettingsListItem isDarkTheme={isDarkTheme} className="list-group-item">{_some[language]} {_item[language]}</SettingsListItem>
              <SettingsListItem isLast isDarkTheme={isDarkTheme} className="list-group-item">{_some[language]} {_item[language]}</SettingsListItem>
            </ul>
          </div>
        )
      }
      {
        selectedSetting === 2 && <ContentPolicy settingsBarWidth={settingsBarWidth} />
      }
    </div>
  )
}

export default Settings;
