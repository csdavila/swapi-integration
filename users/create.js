'use strict';

const uuid = require('uuid');

const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = (event, context, callback) => {
    const timestamp = new Date().getTime()
    const data = JSON.parse(event.body)
    if (typeof data.textuser !== 'string') {
        console.error('Validation Failed')
        callback(new Error('Couldn\'t create the user.'))
        return
    }

    const params = {
        TableName: 'users',
        Item: {
            id: uuid.v1(),
            user: data.textuser,
            pass: data.textpass,
            checked: false,
            createdAt: timestamp,
            updatedAt: timestamp
        }
    }

    // write the todo to the database
    dynamoDb.put(params, (error, result) => {
        // handle potential errors
        if (error) {
            console.error(error)
            callback(new Error('Couldn\'t create the user.'))
            return
        }

        // create a response
        const response = {
            statusCode: 200,
            body: JSON.stringify(result.Item)
        }
        callback(null, response)
    })
}
