const AWS = require('aws-sdk'); 
AWS.config.update({
    region: 'eu-west-3'
});
const dynamoDBClient = new AWS.DynamoDB.DocumentClient();
exports.handler = async (event) => { 

    try {
        if (event.httpMethod == "DELETE") {

            const id = event.queryStringParameters.id;
            if (!id) {
                return {
                    statusCode: 400,
                    body: JSON.stringify({ message: "Champs : id" }),
                    headers: { "Content-Type": "application/json" }
                };
            }
            const Table = "Decks";
            const params = { TableName: Table, Key: { id: id } }; 
            const data = await dynamoDBClient.delete(params).promise(); 
            return {
                statusCode: 200,
                body: JSON.stringify({ message: "Deck Supprimé", deck: data}),
                headers: { "Content-Type": "application/json" }
            }
        }
        else {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "Methode non autorisée" }),
                headers: { "Content-Type": "application/json" }
            }
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: error.message }),
            headers: { "Content-Type": "application/json" }
        }
    }
};