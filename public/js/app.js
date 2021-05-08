//*traigo la ruta de la que va a venir la data:
const fetchWeather = "/weather";

//*traigo del documento todo lo que necesite!!
const weatherForm = document.querySelector("form");
const searchInput = document.querySelector("input");
//*traigo el ícono porque va a variar de acuerdo al clima
const weatherIcon = document.querySelector(".weatherIcon i");
const weatherCondition = document.querySelector(".weatherCondition");
const tempBox = document.querySelector(".temperature span");
const locationBox = document.querySelector(".place");
const dateBox = document.querySelector(".date");

//*por qué lo paso así? porque sino me devolvería un número en vez del mes
const monthNames = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

//*genero el texto de fecha
dateBox.textContent = `${new Date().getDate()} de ${
  monthNames[new Date().getMonth()]
} de ${new Date().getUTCFullYear()}`;

//*hacer este paso apenas traigo los primeros dos elementos del document
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  //*me trae la ciudad! pero solo con esto si miran la consola de code, no pega a la api
  //   console.log(searchInput.value)
  //*loading text:
  locationBox.textContent = "Loading...";
  //*con esto las limpiamos del texto:
  tempBox.textContent = "";
  weatherCondition.textContent = "";

  //*una vez que limpiamos la cajita, construimos el query, con el valor que capturamos arriba
  const locationApi = fetchWeather + "?place=" + searchInput.value;
  fetch(locationApi).then((response) => {
    //*me va a traer el objeto que corresponda a la ciudad que busque. Ojo! a esta altura todavía no hay manejo de errores
    console.log(response);
    response.json().then((data) => {
      //*con el console.log, veo que la data me trae solo las cosas que estipulé desde el back para que vengan
      // console.log(data);
      //*hacemos el catch de errores:

      if (data.error) {
        locationBox.textContent = data.error;
        tempBox.textContent = "";
        weatherCondition.textContent = "";
      } else {
        //* salen de acá: https://openweathermap.org/weather-conditions
        //* y de acá los íconos: https://erikflowers.github.io/weather-icons/
        // console.log(data.main);
        switch (data.main) {
          case "Thunderstorm":
            weatherIcon.className = "wi wi-thunderstorm";
            break;
          case "Drizzle":
            weatherIcon.className = "wi wi-showers";
            break;
          case "Rain":
            weatherIcon.className = "wi wi-rain";
            break;
          case "Snow":
            weatherIcon.className = "wi wi-snow";
            break;
          case "Mist":
            weatherIcon.className = "wi wi-fog";
            break;
          case "Smoke":
            weatherIcon.className = "wi wi-smoke";
            break;
          case "Haze":
            weatherIcon.className = "wi wi-day-haze";
            break;
          case "Dust":
            weatherIcon.className = "wi wi-dust";
            break;
          case "Sand":
            weatherIcon.className = "wi wi-sandstorm";
            break;
          case "Ash":
            weatherIcon.className = "wi wi-sleet";
            break;
          case "Squall":
            weatherIcon.className = "wi wi-rain-wind";
            break;
          case "Tornado":
            weatherIcon.className = "wi wi-hurricane";
            break;
          case "Clear":
            weatherIcon.className = "wi wi-day-sunny";
            break;
          case "Clouds":
            weatherIcon.className = "wi wi-cloud";
            break;
          default:
            weatherIcon.className = "wi wi-alien";
            break;
        }

        //*y ahora completamos las cajitas con las respuestas. Podríamos traer muchos más datos del backend y mostrarlos!
        locationBox.textContent = data.city;
        tempBox.textContent = data.temp + " º";
        weatherCondition.textContent = data.description;
      }
    });
  });
});
