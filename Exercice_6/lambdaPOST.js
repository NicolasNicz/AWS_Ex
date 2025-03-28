const AWS = require('aws-sdk');
AWS.config.update({
    region: 'eu-west-3'
});

const dynamoDBClient = new AWS.DynamoDB.DocumentClient();
const tableName = "Etudiants";

exports.handler = async (event) => {

    try {

        const body = JSON.parse(event.body);

        const { id, nom, age, classe } = body;
        if (!id || !nom || !age || !classe) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "Champs : id, nom, age, classe" }),
                headers: { "Content-Type": "application/json" }
            };
        }

        const params = {
            TableName: tableName,
            Item: {
                id,
                nom,
                age,
                classe
            }
        };

        await dynamoDBClient.put(params).promise();

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Etudiant ajouté", etudiant: params.Item }),
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