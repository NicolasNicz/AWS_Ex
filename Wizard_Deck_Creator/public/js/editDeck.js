// --- Cartes --- ///

    const card_category = $(".card_category");

    card_category.on("click", function() { //boucle qui affiche les cartes par categories
        card_category.removeClass("active");
        $(this).addClass("active");
        $(".list_individual_card").hide(); //cacher toutes les cartes
        $(`.list_individual_card[data-category-id="${$(this).attr("id")}"]`).show();
    })

    //Quand on clique sur une carte, on l'ajoute au deck
    $(".list_individual_card").on("click", function() {
        const thisCardCategoryEng = $(this).attr("data-category-eng");
        const thisCategoryId = $(this).attr("data-category-id");
        const thisCardId = $(this).attr("data-card-id");
        const thisCardEng = $(this).attr("data-card-eng");
        
        // liens de l'image : img/spells/thisCardCategoryEng/thisCardId.png
        //Ajouter la carte au deck au premier div class=deck_card qui est data-empty = true

        const firstEmptyCard = $(".deck_card[data-empty='true']").first();
        if (firstEmptyCard.length === 0) return; // deck plein
      
        const img = `<img class="img-mini-card" data-card-id="${thisCardId}" src="img/spells/${thisCardCategoryEng}/${thisCardEng}.png">`;
        firstEmptyCard.append(img);
        firstEmptyCard.attr("data-empty", "false");

        //ajouter la carte au deck dans le tableau JS, pour que si on change de deck on conserve les cartes
        const currentDeckId = $("#deck-selector").val();
        const deck = allDecks.find(d => d.id == currentDeckId);
        const slotIndex = parseInt(firstEmptyCard.attr("id").split("-")[1]); // id = card-0 , donc pour récuperer 0 on split et on prend le 2eme element
        deck.cards[slotIndex] = parseInt(thisCardId);

    })

    //dans le deck quand on clique sur la carte l'image est retiré et data-empty = true
    //l'écouteur de clique est sur la classe deck_card
    $(".deck_card").on("click", function() {
        const slotIndex = parseInt($(this).attr("id").split("-")[1]);
        $(this).html("");
        $(this).attr("data-empty", "true");

        const deck = allDecks.find(d => d.id == $("#deck-selector").val());
        deck.cards[slotIndex] = null;
    })

