//*ir al sitio, registrarse, copiar la key
// api: https://openweathermap.org/
//https://openweathermap.org/current
//*ejemplo de current: https://api.openweathermap.org/data/2.5/weather?q=catamarca&appid=ce78936306fa561f61f580f1978e254b

//*podría hacerlo así, pero expondría mis datos! mejor dejarlos en un archivo config que excluímos de git:
// const apiKey = 'ce78936306fa561f61f580f1978e254b'
// const getWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

const axios = require("axios");

//*el callback se puede extraer (a mí suele no gustarme esa sintaxis, pero se puede)
//*el place vamos a encodearlo para asegurarnos que siempre es data válida: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
//*si no paso el callback la app se vuelve loooooca
const weatherData = (place, callback) => {
  const API_url = `${process.env.weather_URL}${encodeURIComponent(
    place
  )}&units=metric&appid=${process.env.secret_key}`;
  // console.log(API_url);
  //*hago el request a esa api y pido que sea en formato json. Ese body viene de la API
  axios(API_url)
    .then((response) => {
      // console.log(response)
      callback(undefined, {
        temp: response.data.main.temp,
        description: response.data.weather[0].description,
        main: response.data.weather[0].main,
        city: response.data.name,
      });
    })
    .catch((err) => {
      callback("hubo un error", err);
      console.log(err);
    });
};

//*logueemos para ver cómo el encode traduce lo que pongamos: el JSON llega perfecto!
// weatherData('Buenos Aires')

module.exports = weatherData;
