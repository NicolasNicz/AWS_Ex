const AWS = require('aws-sdk');

AWS.config.update({
    region: 'eu-west-3'
});

const dynamoDBClient = new AWS.DynamoDB.DocumentClient();

function insetData(){
    dynamoDBClient.put({
        TableName: 'Etudiants',
        Item: {
            id: 1,
            nom: 'Alice',
            age: 19,
            classe: 'bts2'
        }
    }, (err, data) => {
        if (err) console.error("Erreur ajout :", err);
        else console.log("Eleve ajouté :", data);
    });
    
    dynamoDBClient.put({
        TableName: 'Etudiants',
        Item: {
            id: 2,
            nom: 'Bob',
            age: 18,
            classe: 'bts'
        }
    }, (err, data) => {
        if (err) console.error("Erreur ajout :", err);
        else console.log("Eleve ajouté :", data);
    });
}

//waitForTableToBeActive(insetData, 1);


insetData();