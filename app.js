const btn = document.getElementById("btn");
const country_container = document.getElementById("country-container");
const map = document.getElementById("map");
const weatherBtn = document.getElementById("weather");

function geo() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;
      map.innerHTML = `<iframe src="https://maps.google.com/maps?q=${lat},${long}&z=15&output=embed" 
      width="100%" height="100%" frameborder="0" style="border:0" allowfullscreen></iframe>`;

      getLocation(lat, long);
    });
  }
}

const getLocation = async (lat, long) => {
  try {
    const response = await fetch(
      "https://api.opencagedata.com/geocode/v1/json?q=" + encodeURIComponent(`${lat},${long} `) + "&key=3fe92b9f00b14d39bf99549e41d99b44"
    );
    const weatherfetch = await fetch(
      "https://api.weatherapi.com/v1/current.json?key=ad7e3d06474842f3a6a62020241205&q=" + encodeURIComponent("India") + "&aqi"
    );
    const weather = await weatherfetch.json();
    console.log(weather);
    const data = await response.json();
    console.log(data);
    const geodata = data.results[0].components;
    const country = geodata.country;
    const continent = geodata.continent;
    const region = geodata.state;
    const street = geodata.road;
    const code = geodata.country_code;
    const statecode = geodata.state_code;
    const district = geodata.state_district;
    const address = geodata.university;
    const county = geodata.county;
    const latitude = lat; // Add latitude value
    const longitude = long; // Add longitude value
    

    country_container.innerHTML = `
    <div class="content">
    <h2>Continent</h2>
    <p>${continent}</p>
    <h2>Country</h2>
    <p>${country}</p>
    <h2>country-code</h2>
    <p>${code}</p>
    <h2>County</h2>
    <p>${county}</p>
  </div>
  </div>

<div>
  <h2>Latitude</h2>
  <p>${latitude}</p>
  <h2>Longitude</h2>
  <p>${longitude}</p>
</div>

   <div class="region">
   <h2>Region</h2>
   <p>${region}</p>
   <h2>state-code</h2>
   <p>${statecode}</p>
  </div>
  <div class="district">
  <h2>District</h2>
  <p>${district}</p>
</div>
  <div class="street">
    <h2>Street</h2>
    <p>${street}</p>
  </div>
  <div class="address">
    <h2>Address</h2>
    <p>${address}</p>
  </div>
  <div class="temp">
  <h2>Temprature</h2>
    <p>${weather.current.temp_c} degree celcius</p>
  </div>
  <div class="wea">
  <h2>weather</h2>
    <p>${weather.current.condition.text}</p>
    <img src="${weather.current.condition.icon}">
  </div>
`;
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

btn.addEventListener("click", geo);

weatherBtn.addEventListener("click", () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;
      getLocation(lat, long);
     });
    }
});
