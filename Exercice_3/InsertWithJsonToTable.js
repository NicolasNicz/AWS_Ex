let json = require('./eleve.json');

const AWS = require('aws-sdk');
AWS.config.update({
    region: 'us-east-1'
});

const dynamoDBClient = new AWS.DynamoDB.DocumentClient();
const dynamoDB = new AWS.DynamoDB();

function waitForTableToBeActive(callback) {

    dynamoDB.describeTable({ TableName: 'eleve' }, (err, data) => {
        if (err) {
            console.log("Error", err);
            return;
        } else {
            if (data.Table.TableStatus === 'ACTIVE') {
                console.log("Table active");
                callback();
            } else {
                console.log("Table non active, attendre 2 seconde");
                setTimeout(() => waitForTableToBeActive(callback), 2000);
            }
        }
    });
}


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

waitForTableToBeActive(insetData);

