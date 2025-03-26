const express = require('express');
const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

//pour charger les trucs dans public
app.use(express.static('public'));

// Route fallback vers le fihier html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// AWS config
const s3 = new AWS.S3();



app.get('/create-bucket', (req, res) => {
    const bucketName = 'superbucketanjolapolo';
    s3.listBuckets((err, data) => { //liste des buckets pour voir si il existe déja
        if (err) return res.send(err);
        if (data.Buckets.find(b => b.Name === bucketName)) { //si il est existe deja
            return res.send('Bucket already exists');
        }
        s3.createBucket({ Bucket: bucketName }, (err, data) => { //sinon on cree le bucket
            if (err) return res.send(err);
            res.send('Bucket created successfully');
        });
    });
});

app.get('/put-file', (req, res) => {
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
        if (err) return res.send(err);
        res.send('File uploaded successfully');
    });
});

app.get('/read-file', (req, res) => {
    const params = {
        Bucket: 'superbucketanjolapolo',
        Key: 'superparole.txt'
    };
    s3.getObject(params, (err, data) => {
        if (err) return res.send(err);
        res.send(data.Body.toString());
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
