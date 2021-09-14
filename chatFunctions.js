const tmi = require('tmi.js');
const { rockPaper } = require('./games/rps')
const { blackJack } = require('./games/blackjack')
const { slots } = require('./games/slots')


require('dotenv').config()


function connectChat(channelName, prevChannel) {
    
    
    const options = {
        options: {
            debug: true,
        },
        connection: {
            cluster: 'aws',
            reconnect: true,
        },
        identity: {
            username: process.env.USERNAME,
            password: process.env.OAUTH_TOKEN
        },
        channels:[channelName]
    };
    
    const client = new tmi.client(options);
    
    
    client.connect();
    
    // client.on('connected', (address, port) => {
    //     client.action(channelName, `@jengopockets sent you a Luvbot! Type !rps <r,p,or s> to play Rock,Paper,Scissors!`)
    // });

    client.on('message', (channel, userState, message, self) => {
        const cmd = message.split(" ")
        switch(cmd[0]){
            case "!rps":
                if(message === `!rps r` || message === '!rps s' || message === '!rps p'){
                    const [result, cpu] = rockPaper(message[5]);
                    let entry = null
                    if (message[5] === 'r'){
                        entry = 'Rock'
                    }else if(message[5] === 's'){
                        entry = 'Scissors'
                    }else{
                        entry = 'Paper'
                    }
             
                    client.action(process.env.CHANNEL, `You Chose ${entry} , Your Opponent Chose ${cpu}! (${result})` );
                 }
                break;

            case "!bkj":
                switch (cmd[1]) {
                    case "bet":
                        let player = userState.username
                        console.log("The game is starting", userState.username);
                        blackJack(player, cmd[2], channel, client)
                        
                        
                        break;
                
                    default:
                        break;
                }
                break;
            case "!777":
                client.action(process.env.CHANNEL, `@${userState.username} you pull the slot lever and the slots spin!`);

                const [one, two, three] = slots();

                setTimeout(function () {
                    client.action(process.env.CHANNEL, `[ ${one} ]`)
                    
                }, 5000);
                setTimeout(function () {
                    client.action(process.env.CHANNEL, `[ ${one} ][ ${two} ]`)
                    
                }, 10000);
                setTimeout(function () {
                    client.action(process.env.CHANNEL, `[ ${one} ][ ${two} ][ ${three} ]`)
                    
                }, 15000);
                break;
            default:
                break;

        }
    })

    


}
module.exports = {connectChat};