$("#save-deck").on("click", function () {
    const selectedDeckId = $("#deck-selector").val();
    const deckName = $(".deck_title").text().trim();
  
    const cardIds = [];
  
    $(".deck_card").each(function () {
      const img = $(this).find("img.img-mini-card");
      const cardId = img.data("card-id");
      if (cardId !== undefined) {
        cardIds.push(cardId);
      }
    });
  
    const datas_deck = {
      id: selectedDeckId,
      deck_name: deckName,
      cards: cardIds
    };
  
    console.log(datas_deck);
    


    fetch("/save-deck", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(datas_deck)
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Deck save avec success");
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
        alert("Erreur de save");
      });
  });