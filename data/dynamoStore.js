const AWS = require('aws-sdk')

// update the region that you are using
AWS.config.update({ region: 'us-east-1'})

const dynamoDB = new AWS.DynamoDB.DocumentClient()

async function putItem(table, item) {
    return new  Promise((resolve, reject) => {
        const params = {
            TableName: table,
            Item: item
        }

        dynamoDB.put(params, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

async function getAllItems(table) {
    return new Promise((resolve, reject) => {
        const params = {
            TableName: table
        }

        dynamoDB.scan(params, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data.Items)
            }
        })
    })
}

async function getItem(table, idKey, id) {
    return new Promise((resolve, reject) => {
        const params = {
            TableName: table,
            Key: {
                [idKey]: id
            },
        }

        dynamoDB.get(params, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data.Item)
            }
        })
    })
}

module.exports = {
    putItem,
    getAllItems,
    getItem
}
