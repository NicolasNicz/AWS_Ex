let json = require('./eleve.json');

const AWS = require('aws-sdk');
AWS.config.update({
    region: 'us-east-1'
});

json.forEach(element => {
    id = parseInt(element["id"]);
    nom = element["nom"];
    age = parseInt(element["age"]);
    classe = element["classe"];

    const dynamoDB = new AWS.DynamoDB.DocumentClient();
    dynamoDB.put({
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