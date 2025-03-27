const AWS = require('aws-sdk');
const fs = require('fs');
AWS.config.update({
    region: 'us-east-1'
});

// AWS config
const s3 = new AWS.S3();

const fileContent = fs.readFileSync('superparole.txt');
const params = {
    Bucket: 'superbucketanjolapolo',
    Key: 'superparole.txt',
    Body: fileContent,
    Metadata: {
        'custom-meta': 'superparole'
    }
};
s3.putObject(params, (err, data) => {
    if (err) return console.log(err);
    console.log('File uploaded successfully');
});