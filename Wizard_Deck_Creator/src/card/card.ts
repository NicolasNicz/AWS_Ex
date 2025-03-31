import fs from "fs";
import path from "path";
import AWS from 'aws-sdk';
import dotenv from "dotenv";
dotenv.config();

AWS.config.update({ region: 'eu-west-3' });
const s3 = new AWS.S3();
const bucket = "spells-cards-wizard-folder";

const baseUrl = process.env.API_URL;


async function getDataAPI(type : string) {
  try {
    const response = await fetch(`${baseUrl}/${type}`);

    if (response.ok) {
        const datas = await response.json();
        return datas;
    } else {
        console.error(`Erreur de l'api: ${response.status} ${response.statusText}`);
    }
  } catch (err) {
      console.error("Erreur de chargement des datas" + type, err);
  }
}

export { getDataAPI }

function listLocalImagePaths(baseFolder: string): string[] { //fonction qui liste les images local
  const result: string[] = [];

  const categories = fs.readdirSync(baseFolder);
  for (const category of categories) {
    const categoryPath = path.join(baseFolder, category);
    if (!fs.statSync(categoryPath).isDirectory()) continue;

    const files = fs.readdirSync(categoryPath);
    for (const file of files) {
      if (file.endsWith(".png")) {
        result.push(`spells/${category}/${file}`);
      }
    }
  }

  return result;
}

export { listLocalImagePaths }

async function listS3Keys(prefix: string): Promise<string[]> { //fonction qui liste les images sur s3
  const params = { Bucket: bucket, Prefix: prefix };
  const listed = await s3.listObjectsV2(params).promise();

  const keys: string[] = [];
  if (listed && listed.Contents && Array.isArray(listed.Contents)) {
    for (const obj of listed.Contents) {
      if (obj && obj.Key && typeof obj.Key === "string") {
        keys.push(obj.Key);
      }
    }
  }

  return keys;
}

export { listS3Keys }


async function downloadS3Object(key: string, localPath: string) { //fonction qui telecharge les images
  const params = {
    Bucket: bucket,
    Key: key
  };

  const data = await s3.getObject(params).promise();

  const dir = path.dirname(localPath); // si le dossier n'existe pas, créer les dossiers
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(localPath, data.Body as Buffer);
  console.log("Téléchargé : " + key);
}

export { downloadS3Object }



function getCategoriesNoAPI(){ //fonction temporaire
  return [
    { id: 7, eng: 'Balance', fr: 'Harmonie' },
    { id: 3, eng: 'Storm', fr: 'Tempête' },
    { id: 2, eng: 'Ice', fr: 'Glace' },
    { id: 4, eng: 'Life', fr: 'Vie' },
    { id: 6, eng: 'Death', fr: 'Mort' },
    { id: 1, eng: 'Fire', fr: 'Feu' },
    { id: 5, eng: 'Myth', fr: 'Mythe' }
  ]
}

export { getCategoriesNoAPI }

function getDeckNoAPI(){ //fonction temporaire
  return [
    {
      id: 'b65d5cde-801d-4c5b-981f-261be9101604',
      deck_name: 'JADOREESTIAM',
      cards: [
        28, 28, 28, 22, 22, 13,
        14, 15, 13, 13, 13, 13,
        13,  9,  9,  9
      ]
    },
    {
      id: 'f7058392-e959-4592-a93b-601c4f7ab137',
      deck_name: 'superdeck',
      cards: [
        5, 5, 5, 5,
        6, 6, 6
      ]
    }
  ]
}

export { getDeckNoAPI }

function getCardNoAPI(){ //fonction temporaire
  return [
    { category: 1, id: 7, eng: 'Fire_Sunbird' },
    { category: 1, id: 8, eng: 'Fire_Wyldfire' },
    { category: 2, id: 10, eng: 'Ice_Colossus' },
    { category: 7, id: 31, eng: 'Balance_Supernova' },
    { category: 1, id: 3, eng: 'Fire_Fire_Trap' },
    { category: 1, id: 2, eng: 'Fire_Fire_Dragon' },
    { category: 3, id: 21, eng: 'Storm_Storm_Shark' },
    { category: 2, id: 14, eng: 'Ice_Tower_Shield' },
    { category: 3, id: 18, eng: 'Storm_Kraken' },
    { category: 4, id: 25, eng: 'Life_Unicorn' },
    { category: 2, id: 12, eng: 'Ice_Frostbite' },
    { category: 2, id: 9, eng: 'Ice_Blizzard' },
    { category: 5, id: 27, eng: 'Myth_Humongofrog' },
    { category: 1, id: 4, eng: 'Fire_Glacial_Shield' },
    { category: 5, id: 26, eng: 'Myth_Cyclops' },
    { category: 2, id: 13, eng: 'Ice_Iceblade' },
    { category: 2, id: 16, eng: 'Ice_Woolly_Mammoth' },
    { category: 3, id: 17, eng: 'Storm_Astraphobia' },
    { category: 1, id: 6, eng: 'Fire_Sun_Serpent' },
    { category: 3, id: 20, eng: 'Storm_Storm_Owl' },
    { category: 3, id: 19, eng: 'Storm_Storm_Lord' },
    { category: 1, id: 1, eng: 'Fire_Efreet' },
    { category: 1, id: 5, eng: 'Fire_Meteor_Strike' },
    { category: 3, id: 22, eng: 'Storm_Tempest' },
    { category: 6, id: 29, eng: 'Death_Poison' },
    { category: 3, id: 24, eng: 'Storm_Windstorm' },
    { category: 3, id: 23, eng: 'Storm_Thermic_Shield' },
    { category: 7, id: 30, eng: 'Balance_Hydra' },
    { category: 2, id: 15, eng: 'Ice_Volcanic_Shield' },
    { category: 6, id: 28, eng: 'Death_Plague' },
    { category: 2, id: 11, eng: 'Ice_Evil_Snowman' }
  ];
}

export { getCardNoAPI }