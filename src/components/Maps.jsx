import React from "react";

const Maps = () => {
  function loadMap() {
    const address = "405 E 42nd St, New York, NY 10017, United States";
    const map = L.map("map").setView([40.7535, -73.9681], 17);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    }).addTo(map);

    const marker = L.marker([40.7535, -73.9681]).addTo(map);
    marker.bindPopup(address).openPopup();
  }

  // Call the function to load the map
  loadMap();
  return <div></div>;
};

export default Maps;
