import express from "express";
import { getDataAPI, downloadS3Object, listS3Keys, listLocalImagePaths, getDeckNoAPI, getCategoriesNoAPI, getCardNoAPI } from "../src/card/card";
import { error, log } from "console";
import { get } from "http";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

export function createApp() {
  const app = express();

  app.use(express.static("public"));
  app.set("views", "./views")
  app.set("view engine","ejs")
  app.use(express.urlencoded({ extended: true }));

  app.get("/", async (req, res) => {

    const folder = "spells/";
    const s3Files = await listS3Keys(folder);
    const localFiles = listLocalImagePaths(path.join(__dirname, "../public/img/spells"));

    const s3FileSet = new Set(s3Files);
    const localFileSet = new Set(localFiles);


    const missingLocally = [...s3FileSet].filter(key => !localFileSet.has(key));

    if (missingLocally.length > 0) {
      console.log("Images manquantes localement:", missingLocally);

      for (const key of missingLocally){
        const relativeKey = key.replace(/^spells\//, ""); //supprimer le prefixe pour éviter de créer un dossier spells/spells
        const localPath = path.join(__dirname, "../public/img/spells", relativeKey);

        try {
          await downloadS3Object(key, localPath);
        } catch (err) {
          console.error('echec pour' + key);
        }
        console.log("image telechargée : " + key);
        
      }
    } else {
      console.log("Toutes les images sont en local");
    }


    
    const categories = await getDataAPI("categories");
    //const categories = getCategoriesNoAPI().sort((a, b) => a.id - b.id);
    //console.log("les categories :");
    //console.log(categories);

    const decks = await getDataAPI("decks");
    //const decks = getDeckNoAPI();
    //console.log("les decks :");
    //console.log(decks);

    const cards = await getDataAPI("cards");
    //const cards = getCardNoAPI().sort((a, b) => a.id - b.id);
    //console.log("les cartes :");
    //console.log(cards);

    const enrichedCards = cards.map((card: { category: any; }) => {
      const category = categories.find((cat: { id: any; }) => cat.id === card.category);
      return {
        ...card,
        categoryEng: category?.eng || "unknown"
      };
    });

    // console.log("les cartes avec les categories eng en plus :");
    // console.log(enrichedCards);

    res.render("index", {
      deckMaxSize: 50,
      categories: categories,
      decks: decks,
      cards: enrichedCards

    });
  });

  app.post("/save-deck", express.json(), async (req, res) => {
    const baseUrl = process.env.API_URL;

    let { id, deck_name, cards } = req.body;

    const isTempId = id.startsWith("tempID");
    if (isTempId) {
      id = uuidv4(); // Generer un id UUID (ex: "4a3d5e6f-7a8b-9c0d-1e2f-3a4b5c6d7e8f")
    }

    // enlever les null (slots vides)
    cards = cards.filter((cardId: number) => cardId !== null);

    const data_deck = {
      id,
      deck_name,
      cards
    }  

    try {
      const apiResponse = await fetch(`${baseUrl}/decks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data_deck)
      });
  
      const result = await apiResponse.json();
      console.log("Deck : " + deck_name + " le " + new Date().toLocaleString() + " enregistré sur le serveur", result);
      
  
      res.status(apiResponse.status).json(result);
    } catch (error) {
      console.error("Erreur API AWS :", error);
      res.status(500).json({ error: "Erreur de l'API pour save le deck" });
    }
  });


  app.delete("/delete-deck", express.json(), async (req, res) => {
    const baseUrl = process.env.API_URL;
    const { id } = req.body;
  
    if (!id) {
      return res.status(400).json({ error: "L'identifiant du deck est requis" });
    }
  
    // Ne pas appeler l'API si c'est un ID temporaire (deck non sauvegardé)
    if (typeof id === "string" && id.startsWith("tempID")) {
      return res.status(200).json({ message: "Deck temporaire non enregistré : rien à supprimer" });
    }
  
    try {
      const apiResponse = await fetch(
        `${baseUrl}/decks?id=${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
  
      const result = await apiResponse.json();

      console.log("Deck : " + id + " le : "  + new Date().toLocaleString() + " supprimé sur le serveur", result);
      
  
      res.status(apiResponse.status).json(result);
    } catch (error) {
      console.error("Erreur API AWS (DELETE) :", error);
      res.status(500).json({ error: "Erreur de l'API pour supprimer le deck" });
    }
  });


  return app;
}
