const path = require("path");
const express = require("express");
const app = express();

app.use(express.static(path.join(__dirname, "../public")));

app.get("", (req, res) => {
  res.send("Hello!!");
});
app.get("/weather", (req, res) => {
  res.send({ forecast: "It is snowing", location: "Boston" });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
