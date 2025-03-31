const AWS = require('aws-sdk');
AWS.config.update({
    region: 'eu-west-3'
});
const dynamoDB = new AWS.DynamoDB();

const params = {
    TableName: 'Decks',
    KeySchema: [
        { AttributeName: 'id', KeyType: 'HASH' }
    ],
    AttributeDefinitions: [
        { AttributeName: 'id', AttributeType: 'S' }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    }
};

dynamoDB.createTable(params, function (err, data) {
    if (err) {
        console.log("Error", err);
    } else {
        console.log("Table Created", data);
    }
});