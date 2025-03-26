const AWS = require('aws-sdk');
AWS.config.update({
    region: 'us-east-1'
});
const dynamoDB = new AWS.DynamoDB();

//create a table eleve with id, nom, age, classe
const params = {
    TableName: 'eleve',
    KeySchema: [
        { AttributeName: 'id', KeyType: 'HASH' }
    ],
    AttributeDefinitions: [
        { AttributeName: 'id', AttributeType: 'N' }
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