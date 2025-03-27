const AWS = require('aws-sdk'); 
AWS.config.update({
    region: 'eu-west-3'
});
const dynamoDBClient = new AWS.DynamoDB.DocumentClient();
exports.handler = async (event) => { 
    const id = event.queryStringParameters?.id;

    if (id) {
        const params = { TableName: "Etudiants", Key: { id: id } }; 
        const data = await dynamoDBClient.scan(params).promise(); 
        return JSON.stringify(data.Items)
    } else {
        const params = { TableName: "Etudiants" };
        const data = await dynamoDBClient.scan(params).promise(); 
        return JSON.stringify(data.Items);
    }
    
};