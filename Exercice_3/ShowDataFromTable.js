const AWS = require('aws-sdk');
AWS.config.update({
    region: 'us-east-1'
});

const dynamoDBClient = new AWS.DynamoDB.DocumentClient();
const dynamoDB = new AWS.DynamoDB();

var params = {
  TableName: "eleve",
};

function waitForTableToBeActive(callback) {

  dynamoDB.describeTable({ TableName: 'eleve' }, (err, data) => {
      if (err) {
          console.log("Error", err);
          return;
      } else {
          if (data.Table.TableStatus === 'ACTIVE') {
              console.log("Table active");
              callback();
          } else {
              console.log("Table non active, attendre 2 seconde");
              setTimeout(() => waitForTableToBeActive(callback), 2000);
          }
      }
  });
}


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

waitForTableToBeActive(insetData);