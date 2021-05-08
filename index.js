const express = require("express");
const path = require("path");
const hbs = require("hbs");
const morgan = require("morgan");

require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 8080;

//*una vez que terminé de hacer el api Data, lo importo
const weatherData = require("./utils/weatherApiData");

//*carpeta de estáticos
app.use(express.static(path.join(__dirname, "public")));

//*esto una vez que tenhgamos las vistas vamos a ver cómo busca perfectamente!
const viewsRoute = path.join(__dirname, "public", "views");
const partialsRoute = path.join(__dirname, "public", "partials");

//*seteamos la view engine para usar hbs:
app.set("view engine", "hbs");
app.set("views", viewsRoute);
hbs.registerPartials(partialsRoute);

app.get("/", (req, res) => {
  //*arrancamos con esto para ver que funcione
  // res.send("esta es la home");
  //*ahora linkeamos al hbs:
  res.render('index', {
    title: 'Buscador de clima'
})
});

app.get("/weather", (req, res) => {
  // res.send('acá va a ir el clima')
  //*vamos a traer el lugar desde el req. El query es lo que viene después del ?
  const place = req.query.place;
  if(!place) {
    return res.send({message: 'ingrese una ciudad válida'})
  } else {
  weatherData(place, (error, response) => {
    //* levanto server y paso por la ruta en el navegador: http://localhost:5050/weather?place=tucuman
    if (error) {
      return res.send({error})
      }
    else(
      res.status(200).send(response)
      )
      console.log(response)
  });}
});

app.get("*", (req, res) => {
  //*este va a ser el render temporal, después una vez que seteemos los hbs vamos a cambiarlo:
  // res.send("rajá de acá");
  //*con hbs:
  res.render('error', {
    title: "page not found"
})
});

app.listen(PORT, () => {
  console.log(`Server en http://localhost:${PORT}`);
});
