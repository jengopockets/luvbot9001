function shuffleDeck(deck){
    for(let i = 0; i<10000; i++){
        let loc1 = Math.floor((Math.random() * deck.length));
        let loc2 = Math.floor((Math.random() * deck.length));
        let tmp = deck[loc1];

        deck[loc1] = deck[loc2]
        deck[loc2] = tmp
    }
    return deck
}
exports.shuffleDeck = shuffleDeck