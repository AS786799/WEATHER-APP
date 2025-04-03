document.addEventListener("DOMContentLoaded", () => {
    var API_KEY = "6262b63554e931c245ab2a6642f9dfb5";
  
    // Get weather data based on city name or coordinates (latitude, longitude)
    const getweatherData = (cityOrLatLon) => {
      const url = "https://api.openweathermap.org/data/2.5/weather";
      let full_url = '';
  
      // If city is provided
      if (typeof cityOrLatLon === "string") {
        full_url = `${url}?q=${cityOrLatLon}&appid=${API_KEY}&units=imperial`;
      } else if (typeof cityOrLatLon === "object" && cityOrLatLon.lat && cityOrLatLon.lon) {
        // If latitude and longitude are provided
        full_url = `${url}?lat=${cityOrLatLon.lat}&lon=${cityOrLatLon.lon}&appid=${API_KEY}&units=imperial`;
      }
  
      const weatherpromise = fetch(full_url);
      return weatherpromise.then((response) => {
        return response.json();
      });
    };
  
    // Show the weather data for a given city or location
    const showWeatherData = (response) => {
      console.log(response);
  
      // Update the UI with the weather data
      document.getElementById("city-name").innerText = response.name;
      document.getElementById("weather-type").innerText = response.weather[0].main;
      document.getElementById("tem").innerText = response.main.temp;
      document.getElementById("min-temp").innerText = response.main.temp_min;
      document.getElementById("max-temp").innerText = response.main.temp_max;
  
      // Get the weather icon code and update the image
      var iconCode = response.weather[0].icon;
      var iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
      document.getElementById("weather-icon").src = iconUrl;
    };
  
    // Get weather for the current location
    const getCurrentLocationWeather = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
  
          // Fetch weather for the current location
          getweatherData({ lat: lat, lon: lon }).then((response) => {
            showWeatherData(response);
          }).catch((error) => {
            console.log("Error fetching weather for current location:", error);
          });
        }, (error) => {
          console.log("Error getting geolocation:", error);
        });
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    };
  
    // Event handler for the city search button
    function searchcity() {
      var city = document.getElementById("search").value;
      getweatherData(city)
        .then((response) => {
          showWeatherData(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  
    // Attach event listener for city search button
    document.getElementById("search-btn").addEventListener("click", searchcity);
  
    // Show weather for the current location when the page loads
    getCurrentLocationWeather();
  });
  