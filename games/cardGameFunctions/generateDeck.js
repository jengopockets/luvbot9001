const cardArray =["2","3","4","5","6","7","8","9","10","J","Q","K","A"]
const suits = ["Spades", "Hearts", "Clubs", "Diamonds"];
let deck = new Array();

function generateDeck() {
            
    for (i of cardArray){
         // console.log(i);
         for (x of suits){
            let weight = parseInt(i)
            if (i == "J" ||i == "Q" ||i == "K"){
                weight = 10
                // console.log(i,weight);
            }
            if (i == "A"){
                 weight = 11
            }
            let card = {Value: i, Suit: x, Weight: weight}
            // console.log(card);
            deck.push(card)
        }
    
    }
    return deck
}

exports.generateDeck = generateDeck