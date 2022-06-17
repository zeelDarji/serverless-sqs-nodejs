const serverless = require("serverless-http");
const express = require("express");
const app = express();
const { sqs } = require("./aws");

app.post("/send-message-in-queue", async (req, res, next) => {
  const params = {
    QueueUrl: process.env.MY_TEST_QUEUE_URL,
    MessageBody: 'My message body from queue',
  };
  const responseFromQueue = await sqs.sendMessage(params).promise();
  /* Sample of response from queue
  {
    ResponseMetadata: { RequestId: 'c217653b-57e4-5117-9035-3e1d39fc72c0' },
    MD5OfMessageBody: '4b9b7d95846204da8bd737913c79b60e',
    MessageId: 'a2a2ad31-5a6c-41eb-a6ab-38a9f7de9a74'
  }
  */
  return res.status(200).json({
    message: "API call successfully done & message send in queue",
    messageId: responseFromQueue.MessageId
  });
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
