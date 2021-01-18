const tmi = require('tmi.js');
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
        client.action(channelName, `${prevChannel} sent you a Luvbot! Luvbot9001 Gives @${channelName} a big hug! Type !luv <channel> to send Luvbot to someone else!`)
    });

    client.on('message', (channel, userState, message, self) => {
        const cmd = message.split(" ")
        if (cmd[0] === '!luv'){
            let passName = cmd[1]
            // console.log("first", passName, passName[0])
            if (passName[0] === '@'){
                passName = passName.slice(1)
                // console.log("Change?", passName)
            }
            client.say (channelName, `I will go send love to ${cmd[1]}! Bye!`)
            client.disconnect()
            connectChat(passName, channelName)
        }
    })

    


}
module.exports = {connectChat};