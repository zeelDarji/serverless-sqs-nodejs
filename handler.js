const serverless = require("serverless-http");
const express = require("express");
const app = express();

app.get("/me", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from me!",
  });
});

app.get("/user-listing", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from user-listing!",
  });
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
