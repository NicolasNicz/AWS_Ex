const readline = require('readline');
const { exec } = require('child_process');

const scripts = [
  { name: 'creation table', file: 'createTable.js' },
  { name: 'InsertIntoTable', file: 'InsertIntoTable.js' },
  { name: 'InsertWithJsonToTable', file: 'InsertWithJsonToTable.js' },
  { name: 'EditDataFromTable', file: 'EditDataFromTable.js' },
  { name: 'ShowDataFromTable', file: 'ShowDataFromTable.js' }
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