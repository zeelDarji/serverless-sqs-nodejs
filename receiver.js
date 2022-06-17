const { sqs } = require("./aws");

module.exports.handler = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'SQS receiver',
      input: event
    })
  }

  event.Records.map((record) => {
    console.log("......body", record.body);
    const deleteParams = {
      QueueUrl: process.env.MY_TEST_QUEUE_URL,
      ReceiptHandle: record.receiptHandle
    };
    sqs.deleteMessage(deleteParams);
  })
  callback(null, response);
};
/* Sample of event object received
 {
  Records: [
    {
      messageId: 'd806f261-598c-4df3-92fe-6d70add71693',
      receiptHandle: 'AQEBwHIvSbyX/BYQHRsCOnycKtTIahQlLZ+yfWqzzCq4+oDQ12vJSFs41VtGRDerb2QQnAZE6J4LDOXUk9ycUtdSejY4zKXyaHPpCLVQfojXMBIuiTay+aHpynr0dNmPQ7yHrGxspiHMW+HRu6jrjSYc7j5LhCuY+rvteT3bShx2eO0KmISiexXV6/u6kvIZoRtj8WHw9JOm09DEVgG1Qz7pnGHmOJqE8Uq0p50qLokFdmu01Fcc7x5UxaTaQ+ik5PNOehs6jfdZj93E/igMW+FVMLJsniAzcWjJbxoJKkinlPyya2vyLL3DPG6HKM5iPvSDwAfBzdPuCXSmypsbMb6z2BpHFtzwqB40e0g6pBMTAhCjAuMp+XWFE1ZqQHPSURs99iA7Rtk3q2HqhlblzwJQbA==',
      body: 'My message body from queue',
      attributes: [Object],
      messageAttributes: {},
      md5OfBody: '4b9b7d95846204da8bd737913c79b60e',
      eventSource: 'aws:sqs',
      eventSourceARN: 'arn:aws:sqs:ap-south-1:802477369468:testQueue-dev',
      awsRegion: 'ap-south-1'
    }
  ]
}
*/

