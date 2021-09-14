const { generateDeck } = require('./cardGameFunctions/generateDeck')
const { shuffleDeck } = require('./cardGameFunctions/shuffleDeck')
const { createPlayer } = require('./cardGameFunctions/createPlayer')
const { dealCards } = require('./cardGameFunctions/dealCards')
const { listCards } = require('./cardGameFunctions/listCards')
const { blackWin } = require('./cardGameFunctions/blackWin')
const { scoreCheck } = require('./cardGameFunctions/scoreCheck')


let playing = false

function blackJack(playerName, cmd, channelName, client){
    // const client = new tmi.client(options);
    
    playing = true
    let deck = shuffleDeck(generateDeck());
    let bet = cmd;
    console.log(bet);

    let player = createPlayer(playerName)
    let dealer = createPlayer('House')
    dealCards(deck, player.hand, 2)
    dealCards(deck, dealer.hand, 2)
    let playerCards = listCards(player.hand)
    let dealerCards = listCards(dealer.hand)
    client.action(channelName, `The dealer shuffles the deck and deals, @${playerName} you have 2 cards ${playerCards.Cards} for a total of ${playerCards.Weight}  the dealer has [X] [${dealer.hand[1].Value}]` )
    // console.log("Hand",player.hand);
    // console.log("After",deck);
    scoreCheck(playerCards, dealerCards)
    // let playerScore = scoreCheck(playerCards)
    if (playerCards.Weight === 21){
        blackWin(bet)
        console.log(bet);
        client.action(channelName, `You have a blackjack! You won ${bet}`);

    }

    
    
    client.on('message', (channel, userState, message, self) => {
        const cmd = message.split(" ")
            if(playerName === userState.username){
                switch (cmd[0]) {
                    case '!hit':
                        console.log('hit');
                        dealCards(deck, player.hand, 1)
                        playerCards = listCards(player.hand)
                        scoreCheck(playerCards, dealerCards)
                        console.log(playerCards);
                        
                        
                        break;
                    
                    case '!stay':
                        console.log('stay');
                        break;
                    default:
                        console.log('no cmd');
                        break;
                }
            }
    });
    
}

exports.blackJack = blackJack