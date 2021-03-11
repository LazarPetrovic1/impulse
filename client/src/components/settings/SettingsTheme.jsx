import React, { useContext, Fragment } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext'
import { LanguageContext } from '../../contexts/LanguageContext'
import { settingsthemecomponent } from '../../utils/langObject';

const {
  _impulse,
  _impulseplus,
  _impulseplusplus,
  _neuralcore,
  _fireworks,
  _interstellar,
  _painter,
  _photons,
  _rainbow,
  _space,
  _light,
  _rain,
  _inferno,
  _snakes,
  _matrix,
  _fountain,
  _snow,
  _network,
  _wave
} = settingsthemecomponent

const style = {
  label: {
    whiteSpace: 'nowrap'
  }
}

function SettingsTheme() {
  const { language } = useContext(LanguageContext)
  const { toggleTheme } = useContext(ThemeContext)
  const onClick = (e) => {
    e.persist()
    if (e.target.defaultValue === 'false') {
      toggleTheme('false')
    } else {
      toggleTheme(JSON.stringify(e.target.defaultValue))
    }
    window.location.reload()
  }
  return (
    <Fragment>
      <div className="form-check form-check-inline ml-4">
        <input
          className="form-check-input"
          type="radio"
          value="impulse"
          onClick={onClick}
          checked={JSON.parse(localStorage.getItem('isDarkTheme')) === 'impulse'}
        />
        <label className="form-check-label" style={style.label} htmlFor="impulse">
          {_impulse[language]}
        </label>
      </div>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          value="impulseplus"
          onClick={onClick}
          checked={JSON.parse(localStorage.getItem('isDarkTheme')) === 'impulseplus'}
        />
        <label className="form-check-label" style={style.label} htmlFor="impulseplus">
          {_impulseplus[language]}
        </label>
      </div>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          value="impulseplusplus"
          onClick={onClick}
          checked={JSON.parse(localStorage.getItem('isDarkTheme')) === 'impulseplusplus'}
        />
        <label className="form-check-label" htmlFor="impulseplusplus" style={style.label}>
          {_impulseplusplus[language]}
        </label>
      </div>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          value="neuralcore"
          onClick={onClick}
          checked={JSON.parse(localStorage.getItem('isDarkTheme')) === 'neuralcore'}
        />
        <label className="form-check-label" htmlFor="neuralcore" style={style.label}>
          {_neuralcore[language]}
        </label>
      </div>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          value="fireworks"
          onClick={onClick}
          checked={JSON.parse(localStorage.getItem('isDarkTheme')) === 'fireworks'}
        />
        <label className="form-check-label" htmlFor="fireworks" style={style.label}>
          {_fireworks[language]}
        </label>
      </div>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          value="interstellar"
          onClick={onClick}
          checked={JSON.parse(localStorage.getItem('isDarkTheme')) === 'interstellar'}
        />
        <label className="form-check-label" htmlFor="interstellar" style={style.label}>
          {_interstellar[language]}
        </label>
      </div>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          value="painter"
          onClick={onClick}
          checked={JSON.parse(localStorage.getItem('isDarkTheme')) === 'painter'}
        />
        <label className="form-check-label" htmlFor="painter" style={style.label}>
          {_painter[language]}
        </label>
      </div>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          value="photons"
          onClick={onClick}
          checked={JSON.parse(localStorage.getItem('isDarkTheme')) === 'photons'}
        />
        <label className="form-check-label" htmlFor="photons" style={style.label}>
          {_photons[language]}
        </label>
      </div>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          value="rainbow"
          onClick={onClick}
          checked={JSON.parse(localStorage.getItem('isDarkTheme')) === 'rainbow'}
        />
        <label className="form-check-label" htmlFor="rainbow" style={style.label}>
          {_rainbow[language]}
        </label>
      </div>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          value="space"
          onClick={onClick}
          checked={JSON.parse(localStorage.getItem('isDarkTheme')) === 'space'}
        />
        <label className="form-check-label" htmlFor="space" style={style.label}>
          {_space[language]}
        </label>
      </div>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          value={false}
          checked={JSON.parse(localStorage.getItem('isDarkTheme')) === 'light'}
          onClick={onClick}
        />
        <label className="form-check-label" htmlFor="false" style={style.label}>
          {_light[language]}
        </label>
      </div>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          value="rain"
          checked={JSON.parse(localStorage.getItem('isDarkTheme')) === 'rain'}
          onClick={onClick}
        />
        <label className="form-check-label" htmlFor="rain" style={style.label}>
          {_rain[language]}
        </label>
      </div>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          value="inferno"
          checked={JSON.parse(localStorage.getItem('isDarkTheme')) === 'inferno'}
          onClick={onClick}
        />
        <label className="form-check-label" htmlFor="inferno" style={style.label}>
          {_inferno[language]}
        </label>
      </div>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          value="snakes"
          checked={JSON.parse(localStorage.getItem('isDarkTheme')) === 'snakes'}
          onClick={onClick}
        />
        <label className="form-check-label" htmlFor="snakes" style={style.label}>
          {_snakes[language]}
        </label>
      </div>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          value="matrix"
          checked={JSON.parse(localStorage.getItem('isDarkTheme')) === 'matrix'}
          onClick={onClick}
        />
        <label className="form-check-label" htmlFor="matrix" style={style.label}>
          {_matrix[language]}
        </label>
      </div>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          value="fountain"
          checked={JSON.parse(localStorage.getItem('isDarkTheme')) === 'fountain'}
          onClick={onClick}
        />
        <label className="form-check-label" htmlFor="fountain" style={style.label}>
          {_fountain[language]}
        </label>
      </div>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          value="snow"
          checked={JSON.parse(localStorage.getItem('isDarkTheme')) === 'snow'}
          onClick={onClick}
        />
        <label className="form-check-label" htmlFor="snow" style={style.label}>
          {_snow[language]}
        </label>
      </div>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          value="network"
          checked={JSON.parse(localStorage.getItem('isDarkTheme')) === 'network'}
          onClick={onClick}
        />
        <label className="form-check-label" htmlFor="network" style={style.label}>
          {_network[language]}
        </label>
      </div>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          value="waves"
          checked={JSON.parse(localStorage.getItem('isDarkTheme')) === 'waves'}
          onClick={onClick}
        />
        <label className="form-check-label" htmlFor="waves" style={style.label}>
          {_wave[language]}
        </label>
      </div>
    </Fragment>
  );
}

export default SettingsTheme;
