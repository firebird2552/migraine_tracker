const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("recieved a GET HTTP method");
});

app.listen(8080, function () {
  console.info("server is running on 8080");
});
