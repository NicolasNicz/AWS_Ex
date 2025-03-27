const AWS = require('aws-sdk');
const { waitForTableToBeActive } = require('./utils');

AWS.config.update({
    region: 'eu-west-3'
});

const dynamoDBClient = new AWS.DynamoDB.DocumentClient();

function insetData(){
    dynamoDBClient.put({
        TableName: 'eleve',
        Item: {
            id: 1,
            nom: 'Alice',
            age: 12,
            classe: '6ème'
        }
    }, (err, data) => {
        if (err) console.error("Erreur ajout :", err);
        else console.log("Eleve ajouté :", data);
    });
    
    dynamoDBClient.put({
        TableName: 'eleve',
        Item: {
            id: 2,
            nom: 'Bob',
            age: 13,
            classe: '5ème'
        }
    }, (err, data) => {
        if (err) console.error("Erreur ajout :", err);
        else console.log("Eleve ajouté :", data);
    });
}

waitForTableToBeActive(insetData, 1);

