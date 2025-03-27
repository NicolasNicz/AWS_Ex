let json = require('./eleve.json');
const { waitForTableToBeActive } = require('./utils');

const AWS = require('aws-sdk');
AWS.config.update({
    region: 'eu-west-3'
});

const dynamoDBClient = new AWS.DynamoDB.DocumentClient();


function insetData(){
    json.forEach(element => {
        id = parseInt(element["id"]);
        nom = element["nom"];
        age = parseInt(element["age"]);
        classe = element["classe"];

        dynamoDBClient.put({
            TableName: 'eleve',
            Item: {
                id: id,
                nom: nom,
                age: age,
                classe: classe
        
            }
        }, (err, data) => {
            if (err) console.error("Erreur ajout :", err);
            else console.log("Eleve ajouté :", data);
        });
    });
}

waitForTableToBeActive(insetData, 1);

