const fs = require("fs");
const path = require("path");
const AWS = require("aws-sdk");

const bucketName = "spells-cards-wizard-folder";
const s3 = new AWS.S3({ region: "eu-west-3" });

const baseFolder = path.join(__dirname, "spells");

const uploadFolderToS3 = async () => {
  const categories = fs.readdirSync(baseFolder); // liste des sous-dossiers Fire, Ice, Storm, Life, Death, Myth, Balance

  for (const category of categories) {
    const categoryPath = path.join(baseFolder, category);

    // pour vérif que c’est bien un dossier
    if (!fs.statSync(categoryPath).isDirectory()) continue;

    const files = fs.readdirSync(categoryPath);

    for (const file of files) {
      const filePath = path.join(categoryPath, file);
      const fileStream = fs.createReadStream(filePath);

      const s3Key = `spells/${category}/${file}`; // chemin dans le bucket

      const params = {
        Bucket: bucketName,
        Key: s3Key,
        Body: fileStream,
        ContentType: "image/png"
      };

      try {
        await s3.upload(params).promise();
        console.log('uploadé : ' +s3Key);
      } catch (err) {
        console.error('echec pour' + s3Key, err.message);
      }
    }
  }

  console.log("tous les fichiers ont été ajoutés au bucket");
};

uploadFolderToS3();