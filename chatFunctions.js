const tmi = require('tmi.js');
const { rockPaper } = require('./rps')
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
    
    client.on('connected', (address, port) => {
        client.action(channelName, `@jengopockets sent you a Luvbot! Type !rps <r,p,or s> to play Rock,Paper,Scissors!`)
    });

    client.on('message', (channel, userState, message, self) => {
        const cmd = message.split(" ")
        // if (cmd[0] === '!luv'){
        //     let passName = cmd[1]
        //     // console.log("first", passName, passName[0])
        //     if (passName[0] === '@'){
        //         passName = passName.slice(1)
        //         // console.log("Change?", passName)
        //     }
        //     client.say (channelName, `I will go send love to ${cmd[1]}! Bye!`)
        //     client.disconnect()
        //     connectChat(passName, channelName)
        // }
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
    })

    


}
module.exports = {connectChat};