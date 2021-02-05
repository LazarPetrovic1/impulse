import React, { useEffect, useState } from 'react';
import { getCity } from '../../utils/locational';
import SocialSearch from './SocialMisc/SocialSearch';
import SocialSearchItem from './SocialMisc/SocialSearchItem';
import axios from 'axios'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import sad from '../../assets/sad.svg';

function Social({ auth }) {
  const { user } = auth
  const [city, setCity] = useState("")
  const [search, setSearch] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [fromCountry, setFromCountry] = useState([])
  useEffect(() => {
    (async function() {
      try {
        // const x = await getCoordinates()
        navigator.geolocation.getCurrentPosition((pos) => {
          const crd = pos.coords
          const lat = crd.latitude.toString()
          const lng = crd.longitude.toString()
          return getCity([lat, lng], setCity)
        });
      } catch(e) {
        console.warn("Some error, dude");
      }
    }())
  }, [])

  useEffect(() => {
    (async function() {
      try {
        const res = await axios.get("/api/auth/country", {
          headers: {
            "x-auth-token": localStorage.getItem("token")
          }
        })
        await setFromCountry(res.data)
      } catch(e) {
        console.warn("Another error dude, whoa!!!");
      }
    }());
  }, [])

  const onInputChange = async (e) => {
    setSearch(e.target.value)
    if (search.length >= 2) {
      const res = await axios.post("/api/users/search", { search })
      await setSearchResults(res.data);
    }
  }

  return (
    <div className="container">
      {city && <h2>Look for people near {city}</h2>}
      <SocialSearch
        search={search}
        onInputChange={onInputChange}
        searchResults={searchResults}
      />
      <h2>From your city</h2>
      {fromCountry && fromCountry.length > 0 && fromCountry.filter(fs => fs.city === city && fs._id !== user._id).map(fs => (
        <SocialSearchItem fs={fs} key={fs._id} src="https://randomuser.me/api/portraits/men/3.jpg" />
      ))}
      {fromCountry && fromCountry.filter(fs => fs.city === city && fs._id !== user._id).length <= 0 && (
        <h5>
          No one from your city seems to be on Impulse <img src={sad} height={18} width={18} alt="Sad boi" />...
        </h5>
      )}
      <hr/>
      <h2>From your country</h2>
      {fromCountry && fromCountry.filter(fs => fs._id !== user._id).map(fs => (
        <SocialSearchItem fs={fs} key={fs._id} src="https://randomuser.me/api/portraits/men/5.jpg" />
      ))}
      {fromCountry && fromCountry.filter(fs => fs._id !== user._id).length <= 0 && (
        <h5>
          No one from your country seems to be on Impulse <img src={sad} height={18} width={18} alt="Sad boi" />...
        </h5>
      )}
    </div>
  )
}

Social.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
  image: state.image
})

export default connect(mapStateToProps, null)(Social);
