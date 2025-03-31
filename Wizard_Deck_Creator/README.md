
# 🧙‍♂️ Wizard Deck Creator

Application complète pour créer, sauvegarder et gérer des decks de cartes magiques (basé sur le jeu Wizard101).  
Technos : Node.js + AWS DynamoDB + S3 + Lambda + API Gateway.

---

## 🚀 Installation & mise en place

### 1️⃣ Préparer les ressources AWS

🔹 Se rendre dans le dossier `script_AWS` :

```bash
cd script_AWS
```

🔹 Exécuter le script principal :

```bash
node main.js
```

📜 Suivre les instructions dans le terminal et exécuter les scripts un par un :

1. 🪣 `createBucket.js` – Crée le bucket S3
2. 📄 `createTableCARDS.js` – Crée la table "Cards"
3. 📄 `createTableCATEGORIES.js` – Crée la table "Categories"
4. 📄 `createTableDECKS.js` – Crée la table "Decks"
5. 🖼️ `putImageIntoBucket.js` – Upload les images dans le bucket
6. 🧩 `InsertIntoCARDS.js` – Insère les données dans "Cards"
7. 🧠 `InsertIntoCATEGORIES.js` – Insère les données dans "Categories"

---

### 2️⃣ Déployer les fonctions Lambda

Depuis la racine du projet, exécuter les commandes suivantes :

```bash
aws lambda create-function --function-name lambdaCardsGet --runtime nodejs20.x --role arn:aws:iam::905943725811:role/lambdacien --handler index.handler --zip-file fileb://lambdaCardsGET.zip

aws lambda create-function --function-name lambdaCategoriesGet --runtime nodejs20.x --role arn:aws:iam::905943725811:role/lambdacien --handler index.handler --zip-file fileb://lambdaCategoriesGET.zip

aws lambda create-function --function-name lambdaDeckGet --runtime nodejs20.x --role arn:aws:iam::905943725811:role/lambdacien --handler index.handler --zip-file fileb://lambdaDeckGET.zip

aws lambda create-function --function-name lambdaDeckDelete --runtime nodejs20.x --role arn:aws:iam::905943725811:role/lambdacien --handler index.handler --zip-file fileb://lambdaDeckDELETE.zip

aws lambda create-function --function-name lambdaDeckPost --runtime nodejs20.x --role arn:aws:iam::905943725811:role/lambdacien --handler index.handler --zip-file fileb://lambdaDeckPOST.zip
```

✅ Vérifier que le rôle IAM existe et possède les permissions nécessaires. (AmazonDynamoDBFullAccess, AmazonS3FullAccess, AWSLambda_FullAccess)

---

### 3️⃣ Créer l'API REST sur AWS API Gateway

Créer une API nommée `wizarddeckcreator`, et configurer les routes suivantes :

| Endpoint       | Méthode | Fonction Lambda associée     |
|----------------|---------|------------------------------|
| `/cards`       | `GET`   | `lambdaCardsGet`             |
| `/categories`  | `GET`   | `lambdaCategoriesGet`        |
| `/decks`       | `GET`   | `lambdaDeckGet`              |
| `/decks`       | `POST`  | `lambdaDeckPost`             |
| `/decks`       | `DELETE`| `lambdaDeckDelete`           |

⚠️ Activer **l’intégration proxy Lambda** sur chaque méthode pour transmettre correctement les paramètres (`queryStringParameters`, `body`, etc.)

---

### 4️⃣ Créer le fichier .env

Créer le fichier .env a la racine avec :
API_URL=https://[ClefAPI].execute-api.eu-west-3.amazonaws.com/wizarddeckcreator/

---

## 🎮 Lancer l'application

Installer les dépendances et démarrer le serveur :

```bash
npm install
npm run dev
```

ou directement :

```bash
npx ts-node src/index.ts
```

Le serveur sera disponible par défaut sur :  
👉 [http://localhost:3000](http://localhost:3000)

---

## 📂 Structure attendue pour les images

Au lancement de l'application les dossiers des images et les images dans les dossiers sont créer automatiquement
donc aucune modification a faire pour le dossier public : 

```
public/
└── img/
    └── spells/
        ├── Fire/ [téléchargé automatiquement]
        ├── Ice/ [téléchargé automatiquement]
        ├── Balance/ [téléchargé automatiquement]
        └── ...
```

---

## 🧠 Technologies utilisées

- Node.js (Express + TypeScript)
- AWS Lambda
- AWS API Gateway
- AWS DynamoDB
- AWS S3
- EJS + jQuery pour le front

---

## ✨ Auteur

Projet développé dans un cadre pédagogique / personnel.  
Toutes les fonctionnalités ont été implémentées avec passion et rigueur.
