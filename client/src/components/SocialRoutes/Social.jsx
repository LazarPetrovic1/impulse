import React, { useEffect, useState, useContext } from "react";
import { LanguageContext } from "../../contexts/LanguageContext";
import { getCity } from "../../utils/locational";
import SocialSearch from "./SocialMisc/SocialSearch";
import SocialSearchItem from "./SocialMisc/SocialSearchItem";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import sad from "../../assets/sad.svg";
import { socialcomponent } from "../../utils/langObject";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, A11y } from "swiper";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/scrollbar/scrollbar.min.css";

SwiperCore.use([Navigation, A11y]);

const {
  _lookforpeoplenear,
  _fromyourcity,
  _fromyourcountry,
  _noonecity,
  _noonecountry,
} = socialcomponent;

function Social({ auth }) {
  const { user } = auth;
  const { language } = useContext(LanguageContext);
  const [city, setCity] = useState("");
  const [fromCountry, setFromCountry] = useState([]);
  useEffect(() => {
    (async function () {
      try {
        // const x = await getCoordinates()
        navigator.geolocation.getCurrentPosition((pos) => {
          const crd = pos.coords;
          const lat = crd.latitude.toString();
          const lng = crd.longitude.toString();
          return getCity([lat, lng], setCity);
        });
      } catch (e) {
        console.warn("Some error, dude");
      }
    })();
  }, []);

  useEffect(() => {
    (async function () {
      try {
        const res = await axios.get("/api/auth/country", {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        });
        await setFromCountry(res.data);
      } catch (e) {
        console.warn("Another error dude, whoa!!!");
      }
    })();
  }, []);

  return (
    <div className="container">
      {city && (
        <h2>
          {_lookforpeoplenear[language]} {city}
        </h2>
      )}
      <SocialSearch />

      <h2>{_fromyourcity[language]}</h2>
      {fromCountry && (
        <section style={{ pointerEvents: "all" }}>
          <Swiper slidesPerView={3} navigation>
            {fromCountry
              .filter((fs) => fs.city === city && fs._id !== user._id)
              .map((fs) => (
                <SwiperSlide key={fs._id}>
                  <SocialSearchItem
                    fs={fs}
                    src={`https://robohash.org/${fs._id}?set=set4&size=150x150`}
                  />
                </SwiperSlide>
              ))}
          </Swiper>
        </section>
      )}
      {fromCountry &&
        fromCountry.filter((fs) => fs.city === city && fs._id !== user._id)
          .length <= 0 && (
          <h5>
            {_noonecity[language]}.{" "}
            <img src={sad} height={18} width={18} alt="Sad boi" />
            ...
          </h5>
        )}
      <hr />
      <h2>{_fromyourcountry[language]}</h2>
      {fromCountry && (
        <section style={{ pointerEvents: "all" }}>
          <Swiper slidesPerView={3} navigation>
            {fromCountry
              .filter((fs) => fs._id !== user._id)
              .map((fs) => (
                <SwiperSlide key={fs._id}>
                  <SocialSearchItem
                    fs={fs}
                    src={`https://robohash.org/${fs._id}?set=set4&size=150x150`}
                  />
                </SwiperSlide>
              ))}
          </Swiper>
        </section>
      )}
      {fromCountry &&
        fromCountry.filter((fs) => fs._id !== user._id).length <= 0 && (
          <h5>
            {_noonecountry[language]}{" "}
            <img src={sad} height={18} width={18} alt="Sad boi" />
            ...
          </h5>
        )}
    </div>
  );
}

Social.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  image: state.image,
});

export default connect(mapStateToProps, null)(Social);
