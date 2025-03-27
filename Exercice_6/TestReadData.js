const AWS = require('aws-sdk'); 
AWS.config.update({
    region: 'eu-west-3'
});
const dynamoDBClient = new AWS.DynamoDB.DocumentClient();
// exports.handler = async (event) => { 
const params = { TableName: "Etudiants"}; 
dynamoDBClient.scan(params, function (err, data) {
    console.log(data.Items);
})
 //.Items;
// }; 