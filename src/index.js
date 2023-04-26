
const state = {
  temperature: 0,
  weather: 'cloudy',
};

const raiseTemp = () => {
  state.temperature += 1;
  const temp = document.getElementById('temp');
  temp.textContent = `${state.temperature}°`;
  changeTempDisplay();
};

const changeTempDisplay = () => {
  const temp = document.getElementById('temp');
  const tempEmoji = document.getElementById('tempEmoji');
  if (state.temperature >= 80) {
    temp.style.color = '#fb392b';
    tempEmoji.textContent = '🥵';
  } else if (state.temperature >= 70) {
    temp.style.color = '#f88800';
    tempEmoji.textContent = '🙂';
  } else if (state.temperature >= 60) {
    temp.style.color = '#fbc200';
    tempEmoji.textContent = '🙂';
  } else if (state.temperature >= 40) {
    temp.style.color = '#10c095';
    tempEmoji.textContent = '😬';
  } else if (state.temperature < 40) {
    temp.style.color = '#0ebede';
    tempEmoji.textContent = '🥶';
  }
};

const changeWeatherDisplay = () => {
  const skySituation = document.getElementById('skySituation').value;
  const skyEmoji = document.getElementById('skyEmoji');
  const body = document.body.style;
  state.weather = skySituation;
  if (state.weather === 'default') {
    skyEmoji.textContent = '🌤';
    body.backgroundImage = "url('../assets/default-sky.jpg')";
  } else if (state.weather === 'clear') {
    skyEmoji.textContent = '☀️';
    body.backgroundImage = "url('../assets/clear-sky.avif')";
  } else if (state.weather === 'cloudy') {
    skyEmoji.textContent = '☁️';
    body.backgroundImage = "url('../assets/cloudy-sky.jpg')";
  } else if (state.weather === 'raining') {
    skyEmoji.textContent = '🌧';
    body.backgroundImage = "url('../assets/raining-sky.jpg')";
  } else if (state.weather === 'snowing') {
    skyEmoji.textContent = '❄️';
    body.backgroundImage = "url('../assets/snowing-sky.jpg')";
  }
};

const lowerTemp = () => {
  state.temperature -= 1;
  const temp = document.getElementById('temp');
  temp.textContent = `${state.temperature}°`;
  changeTempDisplay();
};

const changeCity = () => {
  const searchBar = document.getElementById('searchBar');
  const city = document.getElementById('city');
  city.textContent = searchBar.value;
};

const resetCity = () => {
  const city = document.getElementById('city');
  const searchBar = document.getElementById('searchBar');
  city.textContent = 'City, State';
  searchBar.value = 'Enter a city';
};

const kelvinToFahrenheit = (k) => {
  return Math.floor(1.8 * (k - 273) + 32);
};

const getWeatherByLocation = (lat, lon) => {
  axios
    .get('https://weather-report-proxy-server.onrender.com/weather', {
      params: { lat: `${lat}`, lon: `${lon}` },
    })
    .then((response) => {
      console.log('success', response);
      const tempInKelvin = response.data.main.temp;
      console.log(tempInKelvin);
      const tempInFahrenheit = kelvinToFahrenheit(tempInKelvin);
      state.temperature = tempInFahrenheit;
      const temp = document.getElementById('temp');
      temp.textContent = `${state.temperature}°`;
      changeTempDisplay();
    })
    .catch((error) => {
      console.log('error', error.response);
    });
};

const getWeather = () => {
  const searchBar = document.getElementById('searchBar');
  const location = searchBar.value;
  axios
    .get('https://weather-report-proxy-server.onrender.com/location', {
      params: { q: `${location}` },
    })
    .then((response) => {
      console.log('success');
      const lat = response.data[0].lat;
      const lon = response.data[0].lon;
      console.log({ lat, lon });
      getWeatherByLocation(lat, lon);
    })
    .catch((error) => {
      console.log('error', error.response.data);
    });
};

const registerEventHandlers = () => {
  const hotterButton = document.getElementById('hotterButton');
  hotterButton.addEventListener('click', raiseTemp);
  const colderButton = document.getElementById('colderButton');
  colderButton.addEventListener('click', lowerTemp);
  const searchBar = document.getElementById('searchBar');
  searchBar.addEventListener('input', changeCity);
  const searchButton = document.getElementById('searchButton');
  searchButton.addEventListener('click', getWeather);
  const skyDropdown = document.getElementById('skySituation');
  skyDropdown.addEventListener('click', changeWeatherDisplay);
  const resetButton = document.getElementById('resetButton');
  resetButton.addEventListener('click', resetCity);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
