const AWS = require('aws-sdk');
AWS.config.update({
    region: 'us-east-1'
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();

var params = {
  TableName: "eleve",
};

dynamoDB.scan(params, function (err, data) {
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
