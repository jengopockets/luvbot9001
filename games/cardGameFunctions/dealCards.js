function dealCards(deck, playerCards, num) {
    while (num !== 0) {
        playerCards.push(deck.pop())
        num -= 1        
    }
    
}

exports.dealCards = dealCards