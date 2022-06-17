const AWS = require("aws-sdk");

const sqs = new AWS.SQS({
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
  });

module.exports = { sqs };