const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const PORT = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", { title: "Weather", name: "Rishabh Tatia", helperText: "Use this site to get your weather!" });
});

app.get("/help", (req, res) => {
  res.render("help", { title: "Help", name: "Rishabh Tatia", helperText: "This some help text." });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About Me", name: "Rishabh Tatia" });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "You must provide an address." });
  }
  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(latitude, longitude, (error, foreCastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({ forecast: foreCastData, location, address: req.query.address });
    });
  });
  // res.send({ forecast: "It is snowing", location: "Boston", address: req.query.address });
});

app.get("/*", (req, res) => {
  res.render("404", { title: "404", name: "Rishabh Tatia", message: "Page not found" });
});

app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});
