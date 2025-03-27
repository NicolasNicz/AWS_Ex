const readline = require('readline');
const { exec } = require('child_process');

const scripts = [
  { name: 'create bucket', file: 'createBucket.js' },
  { name: 'put file', file: 'putFile.js' },
  { name: 'read file', file: 'readFile.js' }
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