mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v9",
  zoom: 9,
  center: coordinates,
});

const marker = new mapboxgl.Marker({color: "red"})
  .setLngLat(coordinates)
  .addTo(map);