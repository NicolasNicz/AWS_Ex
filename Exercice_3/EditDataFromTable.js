const AWS = require('aws-sdk');
const { waitForTableToBeActive } = require('./utils');

AWS.config.update({
    region: 'eu-west-3'
});

const dynamoDBClient = new AWS.DynamoDB.DocumentClient();

var params = {
  TableName: "eleve",
};


function insetData(){

    dynamoDBClient.scan(params, function (err, data) {
    if (err) {
        console.log("Error", err);
    } else {
        console.log("Success", data.Items);

        data.Items.forEach(element => {
            id = parseInt(element["id"]);
            nom = element["nom"];
            age = parseInt(element["age"]);
            classe = element["classe"];
        
            if (id == 3) {
                nom = "Charles";
                classe = "5ème";
            }
        
            if (id == 1) {
                age++;
            }
        
            if (id == 1 || id == 3) {
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
            }
        });
    }
    });
}

waitForTableToBeActive(insetData, 1);