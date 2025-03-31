const AWS = require('aws-sdk'); 
AWS.config.update({
    region: 'eu-west-3'
});
const dynamoDBClient = new AWS.DynamoDB.DocumentClient();
exports.handler = async (event) => { 

    try {
        const Table = "Cards";

        if (event.queryStringParameters && event.queryStringParameters.id) {
            const id = parseInt(event.queryStringParameters.id, 10);

            if (isNaN(id)) {
                return {
                    statusCode: 400,
                    body: JSON.stringify({ message: "L'id doit être un entier." }),
                };
            } else{
                const params = { TableName: Table, Key: { id: id } }; 
                const data = await dynamoDBClient.get(params).promise(); 
                return {
                    statusCode: 200,
                    body: JSON.stringify(data.Item),
                    headers: { "Content-Type": "application/json" }
                };
            }
        }
        else {
            const params = { TableName: Table };
            const data = await dynamoDBClient.scan(params).promise(); 
            return {
                statusCode: 200,
                body: JSON.stringify(data.Items),
                headers: { "Content-Type": "application/json" }
            };
        }

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: error.message }),
            headers: { "Content-Type": "application/json" }
        };
    }
    
};