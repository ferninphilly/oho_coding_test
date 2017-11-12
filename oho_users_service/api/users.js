'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk'); 

AWS.config.setPromisesDependency(require('bluebird'));

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.submit = (event, context, callback) => {
  const requestBody = JSON.parse(event.body);
  const forename = requestBody.forename;
  const surname = requestBody.surname;
  const email = requestBody.email;

  if (typeof forename !== 'string' || typeof surname !== 'string' || typeof email !== 'string') {
    console.error('Validation Failed');
    callback(new Error('Couldn\'t submit user because of validation errors. Did you submit all as strings?'));
    return;
  }

  submitUserP(userInfo(forename, surname, email))
    .then(res => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          message: `Sucessfully submitted user with email ${email}`,
          userId: res.id
        })
      });
    })
    .catch(err => {
      console.log(err);
      callback(null, {
        statusCode: 500,
        body: JSON.stringify({
          message: `Unable to submit user with email ${email}`, 
          error: err
        })
      })
    });

const submitUserP = user => {
  console.log('Submitting user');
  const userInfo = {
    TableName: process.env.USERS_TABLE,
    Item: user,
  };
  return dynamoDb.put(userInfo).promise()
    .then(res => user);
};

const userInfo = (forename, surname, email) => {
  const timestamp = new Date().getTime();
  return {
    id: uuid.v1(),
    forename: forename,
    surname: surname,
    email: email,
    submittedAt: timestamp,
    updatedAt: timestamp,
  };
  };
};

module.exports.list = (event, context, callback) => {
  var params = {
      TableName: process.env.USERS_TABLE,
      ProjectionExpression: "id, forename, surname, email"
  };

  console.log("Scanning Users table.");
  const onScan = (err, data) => {
      if (err) {
          console.log('Scan failed to load data. Error JSON:', JSON.stringify(err, null, 2));
          return callback(JSON.stringify({
              error: err
            }));
      } else {
          console.log("Scan succeeded.");
          return callback(null, {
              statusCode: 200,
              body: JSON.stringify({
                  users: data.Items
              })
          });
      }

  };

  dynamoDb.scan(params, onScan);

};

module.exports.delete = (event, context, callback) => {
  const params = {
    TableName: process.env.USERS_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
  };

dynamoDb.delete(params).promise()
    .then(result => {
      const response = {
        statusCode: 200,
        body: "Deleted user " + event.pathParameters.id,
      };
      callback(null, response);
    })
    .catch(error => {
      console.error(error);
      callback(new Error('Couldn\'t delete user.'));
      return;
    });
};

module.exports.get = (event, context, callback) => {
  const params = {
    TableName: process.env.USERS_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
  };

dynamoDb.get(params).promise()
    .then(result => {
      const response = {
        statusCode: 200,
        body: JSON.stringify(result.Item),
      };
      callback(null, response);
    })
    .catch(error => {
      console.error(error);
      callback(new Error('Couldn\'t fetch user.'));
      return JSON.stringify(error);
    });
};

module.exports.update = (event, context, callback) => {
  const requestBody = JSON.parse(event.body);
  const forename = requestBody.forename;
  const surname = requestBody.surname;
  const email = requestBody.email;

  if (typeof forename !== 'string' || typeof surname !== 'string' || typeof email !== 'string') {
    console.error('Validation Failed');
    callback(new Error('Couldn\'t submit user because of validation errors. Did you submit all as strings?'));
    return;
  }

  updateUserP(userInfo(forename, surname, email))
    .then(res => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          message: `Sucessfully updated user with email ${email}`,
          userId: res.id
        })
      });
    })
    .catch(err => {
      console.log(err);
      callback(null, {
        statusCode: 500,
        body: JSON.stringify({
          message: `Unable to update user with email ${email}`, 
          error: err
        })
      })
    });

const updateUserP = user => {
  console.log('Submitting user');
  const userInfo = {
    TableName: process.env.USERS_TABLE,
    Item: user,
  };
  return dynamoDb.update(userInfo).promise()
    .then(res => user);
};

const userInfo = (forename, surname, email) => {
  const timestamp = new Date().getTime();
  return {
    id: uuid.v1(),
    forename: forename,
    surname: surname,
    email: email,
    updatedAt: timestamp,
    };
  };
};

module.exports.update = (event, context, callback) => {
  const requestBody = JSON.parse(event.body);
  const forename = requestBody.forename;
  const surname = requestBody.surname;
  const email = requestBody.email;

  if (typeof forename !== 'string' || typeof surname !== 'string' || typeof email !== 'string') {
    console.error('Validation Failed');
    callback(new Error('Couldn\'t submit user because of validation errors. Did you submit all as strings?'));
    return;
  }

  updateUserP(userInfo(forename, surname, email))
    .then(res => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          message: `Sucessfully updated user with email ${email}`,
          userId: res.id
        })
      });
    })
    .catch(err => {
      console.log(err);
      callback(null, {
        statusCode: 500,
        body: JSON.stringify({
          message: `Unable to update user with email ${email}`, 
          error: err
        })
      })
    });

const updateUserP = user => {
  console.log('Submitting user');
  const userInfo = {
    TableName: process.env.USERS_TABLE,
    Item: user,
  };
  return dynamoDb.update(userInfo).promise()
    .then(res => user);
};

const userInfo = (forename, surname, email) => {
  const timestamp = new Date().getTime();
  return {
    id: uuid.v1(),
    forename: forename,
    surname: surname,
    email: email,
    updatedAt: timestamp,
    };
  };
};
  

