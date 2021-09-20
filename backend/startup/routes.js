const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const error = require("../middleware/error");

const temperature = require("../route/temperature");

module.exports = function (app) {
  app.use(cors());
  app.use(morgan("common"));
  app.use(express.json());
  //Routes
  app.use("/api/temperature", temperature);
  //Error Handling
  app.use(error);
};
