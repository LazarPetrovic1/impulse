import axios from "axios";
// const API_KEY = "pk.5c268224abee429b6f2d3414499c8b56"

export function getCoordinates() {
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  function success(pos) {
    const crd = pos.coords;
    const lat = crd.latitude.toString();
    const lng = crd.longitude.toString();
    const coordinates = [lat, lng];
    getCity(coordinates);
    return;
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  navigator.geolocation.getCurrentPosition(success, error, options);
}

export async function getCity(coordinates, setter) {
  const lat = coordinates[0];
  const lng = coordinates[1];
  const res = await axios.get(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
  );
  setter(res.data.city);
  return res.data.city;
}

export function autoSetCoords(coords) {
  navigator.geolocation.getCurrentPosition(
    function (pos) {
      console.log("POS", pos);
      const crd = pos.coords;
      const lat = crd.latitude.toString();
      const lng = crd.longitude.toString();
      coords.push(lat);
      coords.push(lng);
      return;
    },
    (err) => console.warn(`ERROR(${err.code}): ${err.message}`),
    {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    }
  );
}

export async function autoGetCity(coordinates) {
  console.log("COORDS", coordinates);
  const lat = coordinates[0];
  const lng = coordinates[1];
  const res = await axios.get(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
  );
  return res.data;
}

export const getZip = async (countryCode, city, coords) => {
  try {
    const res = await axios.get(
      `http://api.geonames.org/findNearbyPostalCodesJSON?country=${countryCode}&placename=${city}&lat=${coords[0]}&lng=${coords[1]}&username=ImpulseMakeAnImpact`
    );
    return res.data;
  } catch (e) {
    console.warn(e.message);
  }
};
