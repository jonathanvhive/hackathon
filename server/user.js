const TABLE_NAME = `vhive-${process.env.DYNAMODB_NAMESPACE}-users`;

if (!process.env.AWS_REGION) {
    process.env.AWS_REGION = 'us-east-1';
}
  
if (!process.env.DYNAMODB_NAMESPACE) {
    process.env.DYNAMODB_NAMESPACE = 'dev';
}

const AWS = require('aws-sdk');

let DocumentClient = null;
DocumentClient = new AWS.DynamoDB.DocumentClient();

function envelop(res, statusCode = 200) {
    let body;
    if (statusCode == 200) {
      body = JSON.stringify(res, null, 2);
    } else {
      body = JSON.stringify({ errors: { body: [res] } }, null, 2);
    }
    return {
      statusCode,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body,
    };
  }  


/**
 * @module User
 */
module.exports = {

  /** Create user */
  async get(event) {
    const user = await DocumentClient.get({
        TableName: TABLE_NAME,
        Key: {
          username: 'test',
        }
      }).promise();

    return envelop({
      user: user.Item
    });
  },

  async create(event) {
    const body = JSON.parse(event.body);

    await DocumentClient.put({
        TableName: TABLE_NAME,
        Item: {
          username: 'test',
          email: 'test@test.com',
          password: 'xxxxx',
        },
      }).promise();  

    return envelop({
        user: {
            email: 'test'
        }
    });
  },

  async update(event) {
    return envelop({
      warning: 'not implemented'
    });
  }
};
