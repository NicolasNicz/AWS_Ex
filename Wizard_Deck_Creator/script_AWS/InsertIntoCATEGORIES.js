const AWS = require('aws-sdk');
const { waitForTableToBeActive } = require('./utils');

AWS.config.update({
    region: 'eu-west-3'
});

const table = "Categories";

const cardCategories = [ // tous les types de cartes
    {
      "id": 1,
      "eng": "Fire",
      "fr": "Feu"
    },
    {
      "id": 2,
      "eng": "Ice",
      "fr": "Glace"
    },
    {
      "id": 3,
      "eng": "Storm",
      "fr": "Tempête"
    },
    {
      "id": 4,
      "eng": "Life",
      "fr": "Vie"
    },
    {
      "id": 5,
      "eng": "Myth",
      "fr": "Mythe"
    },
    {
      "id": 6,
      "eng": "Death",
      "fr": "Mort"
    },
    {
      "id": 7,
      "eng": "Balance",
      "fr": "Harmonie"
    }
  ];

const dynamoDBClient = new AWS.DynamoDB.DocumentClient();

function insertData(){

    cardCategories.forEach(category => {
        dynamoDBClient.put({
            TableName: table,
            Item: {
                id: category.id,
                eng: category.eng,
                fr: category.fr
            }
        }, (err, data) => {
            if (err) console.error("Erreur ajout :", err);
            else console.log("Categorie ajoutée :", data);
        });
    });
}

waitForTableToBeActive(insertData, table, 1);