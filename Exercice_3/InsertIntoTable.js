const AWS = require('aws-sdk');
AWS.config.update({
    region: 'us-east-1'
});

const dynamoDBClient = new AWS.DynamoDB.DocumentClient();
const dynamoDB = new AWS.DynamoDB();

function waitForTableToBeActive(callback) {
    //console.log("Attendre que la table est active");

    dynamoDB.describeTable({ TableName: 'eleve' }, (err, data) => {
        if (err) {
            console.log("Error", err);
            return;
        } else {
            if (data.Table.TableStatus === 'ACTIVE') {
                console.log("Table active");
                callback(); // pour exécuter la fonction qui insert les datas dès que c'est ok
            } else {
                console.log("Table non active, attendre 2 seconde");
                setTimeout(() => waitForTableToBeActive(callback), 2000); //on retourne sur la meme fonction apres les 2 secondes comme ça pas de boucle while true eh eh ez
            }
        }
    });
}


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

waitForTableToBeActive(insetData);

