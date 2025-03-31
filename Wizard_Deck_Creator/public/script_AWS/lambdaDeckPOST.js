const AWS = require('aws-sdk');
AWS.config.update({
    region: 'eu-west-3'
});

const dynamoDBClient = new AWS.DynamoDB.DocumentClient();
const tableName = "Decks";

exports.handler = async (event) => {

    try {

        const body = JSON.parse(event.body);

        const { id, deck_name, cards } = body;
        if (!id || !deck_name || !cards ) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "Champs : id, deck_name, cards" }),
                headers: { "Content-Type": "application/json" }
            };
        }

        const params = {
            TableName: tableName,
            Item: {
                id,
                deck_name,
                cards,
            }
        };

        await dynamoDBClient.put(params).promise();

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Deck Ajouté", deck: params.Item }),
            headers: { "Content-Type": "application/json" }
        };

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: error.message }),
            headers: { "Content-Type": "application/json" }
        };
    }
}