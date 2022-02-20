'use strict';

const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();


module.exports.update = (event, context, callback) => {
    const timestamp = new Date().getTime();
    const data = JSON.parse(event.body);

    // validation
    if (typeof data.textuser !== 'string' || typeof data.checked !== 'boolean') {
        console.error('Validation Failed');
        callback(null, {
            statusCode: 400,
            headers: { 'Content-Type': 'text/plain' },
            body: 'Couldn\'t update the user.',
        });
        return;
    }

    const params = {
        TableName: 'users',
        Key: {
            id: event.pathParameters.id,
        },
        ExpressionAttributeNames: {
            '#user': 'user',
        },
        ExpressionAttributeValues: {
            ':user': data.textuser,
            ':pass': data.textpass,
            ':checked': data.checked,
            ':updatedAt': timestamp,
        },
        UpdateExpression: 'SET #user = :user, pass = :pass, checked = :checked, updatedAt = :updatedAt',
        ReturnValues: 'ALL_NEW',
    };

    // update the todo in the database
    dynamoDb.update(params, (error, result) => {
        // handle potential errors
        if (error) {
            console.error(error);
            callback(null, {
                statusCode: error.statusCode || 501,
                headers: { 'Content-Type': 'text/plain' },
                body: 'Couldn\'t fetch the user.',
            });
            return;
        }

        // create a response
        const response = {
            statusCode: 200,
            body: JSON.stringify(result.Attributes),
        };
        callback(null, response);
    });
};