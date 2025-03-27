const AWS = require('aws-sdk');
const { waitForTableToBeActive } = require('./utils');
AWS.config.update({
    region: 'eu-west-3'
});

const dynamoDBClient = new AWS.DynamoDB.DocumentClient();

var params = {
  TableName: "eleve",
};



function insetData(){

  dynamoDBClient.scan(params, function (err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      data.Items.forEach(element => {
          id = parseInt(element["id"]);
          nom = element["nom"];
          age = parseInt(element["age"]);
          classe = element["classe"];
      
          console.log(id + " " + nom + " " + age + " " + classe);
      });
    }
  });
}

waitForTableToBeActive(insetData, 1);