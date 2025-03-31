const AWS = require('aws-sdk');
AWS.config.update({
    region: 'eu-west-3'
});

// AWS config
const s3 = new AWS.S3();

const bucketName = 'spells-cards-wizard-folder';
s3.listBuckets((err, data) => { //liste des buckets pour voir si il existe déja
    if (err) return res.send(err);
    if (data.Buckets.find(b => b.Name === bucketName)) { //si il est existe deja
        return console.log('Bucket already exists');
    }
    s3.createBucket({ Bucket: bucketName }, (err, data) => { //sinon on cree le bucket
        if (err) return console.log(err)
            else console.log("Bucket created successfully");
    });
});