const AWS = require('aws-sdk');
const { waitForTableToBeActive } = require('./utils');

AWS.config.update({
    region: 'eu-west-3'
});

const table = "Cards";

const cards = [ // tous les cartes
    {
      "id": 1,
      "eng": "Fire_Efreet",
      "category": 1,
    },
    {
      "id": 2,
      "eng": "Fire_Fire_Dragon",
      "category": 1,
    },
    {
      "id": 3,
      "eng": "Fire_Fire_Trap",
      "category": 1,
    },
    {
      "id": 4,
      "eng": "Fire_Glacial_Shield",
      "category": 1,
    },
    {
      "id": 5,
      "eng": "Fire_Meteor_Strike",
      "category": 1,
    },
    {
      "id": 6,
      "eng": "Fire_Sun_Serpent",
      "category": 1,
    },
    {
      "id": 7,
      "eng": "Fire_Sunbird",
      "category": 1,
    },
    {
      "id": 8,
      "eng": "Fire_Wyldfire",
      "category": 1,
    },
    {
      "id": 9,
      "eng": "Ice_Blizzard",
      "category": 2,
    },
    {
      "id": 10,
      "eng": "Ice_Colossus",
      "category": 2,
    },
    {
      "id": 11,
      "eng": "Ice_Evil_Snowman",
      "category": 2,
    },
    {
      "id": 12,
      "eng": "Ice_Frostbite",
      "category": 2,
    },
    {
      "id": 13,
      "eng": "Ice_Iceblade",
      "category": 2,
    },
    {
      "id": 14,
      "eng": "Ice_Tower_Shield",
      "category": 2,
    },
    {
      "id": 15,
      "eng": "Ice_Volcanic_Shield",
      "category": 2,
    },
    {
      "id": 16,
      "eng": "Ice_Woolly_Mammoth",
      "category": 2,
    },
    {
      "id": 17,
      "eng": "Storm_Astraphobia",
      "category": 3,
    },
    {
      "id": 18,
      "eng": "Storm_Kraken",
      "category": 3,
    },
    {
      "id": 19,
      "eng": "Storm_Storm_Lord",
      "category": 3,
    },
    {
      "id": 20,
      "eng": "Storm_Storm_Owl",
      "category": 3,
    },
    {
      "id": 21,
      "eng": "Storm_Storm_Shark",
      "category": 3,
    },
    {
      "id": 22,
      "eng": "Storm_Tempest",
      "category": 3,
    },
    {
      "id": 23,
      "eng": "Storm_Thermic_Shield",
      "category": 3,
    },
    {
      "id": 24,
      "eng": "Storm_Windstorm",
      "category": 3,
    },
    {
      "id": 25,
      "eng": "Life_Unicorn",
      "category": 4,
    },
    {
      "id": 26,
      "eng": "Myth_Cyclops",
      "category": 5,
    },
    {
      "id": 27,
      "eng": "Myth_Humongofrog",
      "category": 5,
    },
    {
      "id": 28,
      "eng": "Death_Plague",
      "category": 6,
    },
    {
      "id": 29,
      "eng": "Death_Poison",
      "category": 6,
    },
    {
      "id": 30,
      "eng": "Balance_Hydra",
      "category": 7,
    },
    {
      "id": 31,
      "eng": "Balance_Supernova",
      "category": 7,
    }
  ];

const dynamoDBClient = new AWS.DynamoDB.DocumentClient();

function insertData(){

    cards.forEach(card => {
        dynamoDBClient.put({
            TableName: table,
            Item: {
                id: card.id,
                eng: card.eng,
                category: card.category
            }
        }, (err, data) => {
            if (err) console.error("Erreur ajout :", err);
            else console.log("Carte ajoutée :", data);
        });
    });
}

waitForTableToBeActive(insertData, table, 1);