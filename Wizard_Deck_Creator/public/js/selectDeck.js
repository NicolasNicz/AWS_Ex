
// --- Decks --- ///

const cardMap = {}; //mapage pour avoir toutes les cartes en un seul endroit
allCards.forEach(card => {
    cardMap[card.id] = card;
});

$("#deck-selector").on("change", function () {
const deckId = $(this).val();
const selectedDeck = allDecks.find(deck => deck.id === deckId);

$(".deck_title").text(selectedDeck.deck_name);

const cardSlots = $(".deck_card");

cardSlots.each(function () { // Vider tous les slots
  $(this).empty(); 
  $(this).attr("data-empty", "true");
});


selectedDeck.cards.forEach((cardId, index) => { // Remplir avec les cartes du deck sélectionné
  const card = cardMap[cardId];
  if (!card) return;

  const imagePath = `img/spells/${card.categoryEng}/${card.eng}.png`;

  const img = $("<img>")
    .addClass("img-mini-card")
    .attr("src", imagePath)
    .attr("data-card-id", card.id);

  const slot = $(`#card-${index}`);
  slot.append(img);
  slot.attr("data-empty", "false");
});
});


$(document).ready(function () {
// pour forcer l'appel au change, pour que par défaut le deck 1 soit affiché
$("#deck-selector").trigger("change");
});