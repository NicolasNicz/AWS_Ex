const AWS = require('aws-sdk');
AWS.config.update({
    region: 'us-east-1'
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();

dynamoDB.put({
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

dynamoDB.put({
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