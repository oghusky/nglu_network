const express = require("express"),
  app = express(),
  PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./routes/indexRoutes")(app);

app.listen(PORT, () => {
  console.log("SERVER STARTED ON PORT: ", PORT);
})