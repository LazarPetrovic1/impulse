import axios from 'axios'
// const API_KEY = "pk.5c268224abee429b6f2d3414499c8b56"

export function getCoordinates() {
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  }

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
  const lat = coordinates[0]
  const lng = coordinates[1]
  const res = await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`)
  setter(res.data.city)
  return res.data.city
}
