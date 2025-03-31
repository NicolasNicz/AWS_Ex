const AWS = require('aws-sdk');
AWS.config.update({
    region: 'eu-west-3'
});

const dynamoDB = new AWS.DynamoDB();

function waitForTableToBeActive(callback, table, attempt = 1) {

    dynamoDB.describeTable({ TableName: table }, (err, data) => {
        if (err) {
            console.log("Error", err);
            return;
        } else {
            if (data.Table.TableStatus === 'ACTIVE') {
                console.log("Table active");
                callback(); // pour exécuter la fonction qui insert les datas dès que c'est ok
            } else if (attempt < 10) {
                console.log("Table non active, attendre 2 seconde, (attemps : " + attempt + ")");
                setTimeout(() => waitForTableToBeActive(callback, attempt + 1), 2000); //on retourne sur la meme fonction apres les 2 secondes comme ça pas de boucle while true
            } else{
                console.error("Probleme dans la table ou sur AWS, limite dépassée");
            }
        }
    });
}

module.exports = { waitForTableToBeActive };