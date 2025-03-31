$("#create-deck").on("click", function () {
    const newName = prompt("Deck Name :");
  
    if (!newName || newName.trim() === "") {
      alert("Chose a name first.");
      return;
    }
  
    const id = "tempID" + tempDeckId; // ID temporaire
    tempDeckId++; // On augmente le compteur si on reclique sur le bouton
    const newDeck = {
      id: id,
      deck_name: newName.trim(),
      cards: []
    };
  
    allDecks.push(newDeck); // Ajout dans le tableau JS
  
    
    $("#deck-selector").append( // Ajout du nom dans la liste <select>
      `<option value="${id}">${newDeck.deck_name}</option>`
    );
    
    $("#deck-selector").val(id).trigger("change"); // pour que ça Sélectionner automatiquement le nouveau deck
  
    $(".deck_title").text(newDeck.deck_name); //et aussi dans le titre en haut
  });