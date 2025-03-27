const AWS = require('aws-sdk');
AWS.config.update({
    region: 'us-east-1'
});

// AWS config
const s3 = new AWS.S3();


const params = {
    Bucket: 'superbucketanjolapolo',
    Key: 'superparole.txt'
};
s3.getObject(params, (err, data) => {
    if (err) return console.log(err);
    
    console.log(data.Body.toString());
});