import React, { Fragment, useContext, useEffect } from "react";
import { registercomponent } from "../../../utils/langObject";
import { LanguageContext } from "../../../contexts/LanguageContext";
import DatePicker from "react-datepicker";
import countries from "../../../utils/countries.js";
import { autoSetCoords, autoGetCity, getZip } from "../../../utils/locational";

const {
  advancedpersonalinfo,
  dateofbirth,
  looksgood,
  pleaseenter,
  _city,
  _country,
  chooseone,
  zipcode,
  yourphonenumber,
} = registercomponent;

function StepFour({
  onProgressChange,
  dob,
  city,
  country,
  zip,
  phone,
  setDate,
  onChange,
  setData,
  data,
  callcode,
}) {
  const { language } = useContext(LanguageContext);
  useEffect(() => {
    (function () {
      if (country) {
        const callcode = countries.filter((ctry) => ctry.name === country);
        setData({ ...data, callcode: callcode[0].callcode });
      }
    })();
    // eslint-disable-next-line
  }, [country]);

  const autoLocate = async () => {
    let coords = [];
    await autoSetCoords(coords);
    if (coords) {
      const geo = await autoGetCity(coords);
      const zip = await getZip(geo.countryCode, geo.city, coords);
      await setData({
        ...data,
        city: geo.city,
        country: geo.countryName,
        callcode: countries.filter((ctry) => ctry.name === geo.countryName)
          .callcode,
        zip: zip.postalCodes[0].postalCode,
      });
    } else {
      await autoSetCoords(coords);
      const geo = await autoGetCity(coords);
      const zip = await getZip(geo.countryCode, geo.city, coords);
      await setData({
        ...data,
        city: geo.city,
        country: geo.countryName,
        callcode: countries.filter((ctry) => ctry.name === geo.countryName)
          .callcode,
        zip: zip.postalCodes[0].postalCode,
      });
    }
  };

  return (
    <Fragment>
      <h2 className="mb-2">{advancedpersonalinfo[language]}</h2>
      <label htmlFor="dob">{dateofbirth[language]}</label>
      {/*<br />*/}
      <div className="d-flex justify-content-between">
        <DatePicker
          name="dob"
          id="dob"
          showYearDropdown
          yearDropdownItemNumber={150}
          scrollableYearDropdown
          className={dob ? "form-control is-valid" : "form-control is-invalid"}
          value={dob}
          selected={dob}
          onChange={setDate}
        />
        <button
          title="Warning: May not be completely accurate"
          className="btn btn-primary"
          type="button"
          onClick={autoLocate}
        >
          <i className="fas fa-search-location pr-2" /> Auto-locate
        </button>
      </div>
      <br />
      {dob ? (
        <div className="valid-feedback d-block">{looksgood[language]}</div>
      ) : (
        <div className="invalid-feedback d-block">
          {pleaseenter[language]} {dateofbirth[language]}
        </div>
      )}
      <label htmlFor="city" className=" mt-2">
        {_city[language]}
      </label>
      <input
        type="text"
        className={city ? `form-control is-valid` : "form-control is-invalid"}
        value={city}
        name="city"
        onChange={onChange}
        placeholder={_city[language]}
      />
      {city ? (
        <div className="valid-feedback">{looksgood[language]}</div>
      ) : (
        <div className="invalid-feedback">
          {pleaseenter[language]} {_city[language]}
        </div>
      )}
      <label htmlFor="country">{_country[language]}</label>
      <select
        onChange={(e) => setData({ ...data, country: e.target.value })}
        name="country"
        className={
          country ? "form-control is-valid" : "form-control is-invalid"
        }
        value={country}
      >
        <option value="">{chooseone[language]}</option>
        {countries.map((country) => (
          <option value={country.name} key={country.capital}>
            {country.name} (pop. {(country.population / 1000000).toFixed(2)}M)
          </option>
        ))}
      </select>
      {country ? (
        <div className="valid-feedback">{looksgood[language]}</div>
      ) : (
        <div className="invalid-feedback">
          {pleaseenter[language]} {_country[language]}
        </div>
      )}
      <label htmlFor="zip">{zipcode[language]}</label>
      <input
        type="text"
        name="zip"
        onChange={onChange}
        className={zip ? `form-control is-valid` : "form-control is-invalid"}
        value={zip}
        placeholder={zipcode[language]}
      />
      {zip ? (
        <div className="valid-feedback">{looksgood[language]}</div>
      ) : (
        <div className="invalid-feedback">
          {pleaseenter[language]} {zipcode[language]}
        </div>
      )}
      <label htmlFor="phone" className="">
        {yourphonenumber[language]}
      </label>
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text" id="inputGroupPrepend4">
            {callcode ? callcode : ":/"}
          </span>
        </div>
        <input
          type="text"
          className={
            phone ? `form-control is-valid` : "form-control is-invalid"
          }
          name="phone"
          onChange={onChange}
          value={phone}
          placeholder={yourphonenumber[language]}
        />
        {phone ? (
          <div className="valid-feedback">{looksgood[language]}</div>
        ) : (
          <div className="invalid-feedback">
            {pleaseenter[language]} {yourphonenumber[language]}
          </div>
        )}
      </div>
      <div className="d-flex justify-content-end">
        <button
          className="btn btn-secondary"
          onClick={() => onProgressChange([])}
        >
          Proceed&nbsp;&nbsp;<i className="fas fa-arrow-right"></i>
        </button>
      </div>
    </Fragment>
  );
}

export default StepFour;
