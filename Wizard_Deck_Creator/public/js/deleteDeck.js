$("#delete-deck").on("click", async function () {
    const selectedDeckId = $("#deck-selector").val();
    const selectedDeckName = $("#deck-selector option:selected").text();
  
    if (!selectedDeckId) return;
  
    const confirmDelete = confirm(`Delete this deck : "${selectedDeckName}" ?`); // demande de confirmation
    if (!confirmDelete) return;
  
    
    const deckIndex = allDecks.findIndex(d => d.id === selectedDeckId); // Détection du deck dans allDecks
    const isTempId = selectedDeckId.startsWith("tempID");
  
    try {
      if (!isTempId) { // Si ce n'est pas un ID temporaire (deck qu'on vient de créer), on envoie la requête DELETE au back
        const res = await fetch("/delete-deck", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: selectedDeckId })
        });
  
        if (!res.ok) throw new Error("Échec de la suppression sur le serveur");
        const data = await res.json();
        console.log("Deck Supprimé côté serveur :", data);
      } else {
        console.log("Deck temporaire, pas de requête au serveur");
      }
   
      if (deckIndex !== -1) { // Suppression en local du deck, pour ne pas avoir a actualiser la page (allDecks + <select>)
        allDecks.splice(deckIndex, 1);
      }
  
      $(`#deck-selector option[value='${selectedDeckId}']`).remove(); // Suppression de l'option du <select>
  
      // pour afficher le deck suivant
      if (allDecks.length > 0) {
        $("#deck-selector").val(allDecks[0].id).trigger("change");
      } else { //si il n'y a plus de deck
        $(".deck_title").text("No deck selected");
        $(".deck_card").each(function () {
          $(this).empty().attr("data-empty", "true"); // on vide tous les slots
        });
      }
  
      alert("Deck deleted successfully"); // deck supprimé
    } catch (err) {
      console.error("Erreur suppression :", err);
      alert("Error when deleting deck");
    }
  });