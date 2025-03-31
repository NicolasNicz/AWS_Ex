const readline = require('readline');
const { exec } = require('child_process');

const scripts = [
  { name: 'creation bucket s3', file: 'createBucket.js' },
  { name: 'creation table cards', file: 'createTableCARDS.js' },
  { name: 'creation table categories', file: 'createTableCATEGORIES.js' },
  { name: 'creation table decks', file: 'createTableDECKS.js' },
  { name: 'mettre les images dans le bucket', file: 'putImageIntoBucket.js' },
  { name: 'insert les datas dans cards', file: 'InsertIntoCARDS.js' },
  { name: 'insert les datas dans categories', file: 'InsertIntoCATEGORIES.js' },
];

console.log('Choisir le fichier :');
scripts.forEach((script, index) => {
  console.log(`${index + 1}. ${script.name}`);
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('choix : ', (answer) => {
  const index = parseInt(answer) - 1;
  if (index >= 0 && index < scripts.length) {
    const scriptPath = scripts[index].file;
    console.log(`Exécution de ${scripts[index].name}...\n`);
    exec(`node ${scriptPath}`, (err, stdout, stderr) => {
      if (err) {
        console.error(`Erreur : ${err.message}`);
      }
      if (stderr) {
        console.error(`Stderr : ${stderr}`);
      }
      if (stdout) {
        console.log(`Sortie :\n${stdout}`);
      }
      rl.close();
    });
  } else {
    console.log('Choix invalide.');
    rl.close();
  }
});